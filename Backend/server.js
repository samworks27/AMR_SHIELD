import http from "node:http";
import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const PORT = Number(process.env.PORT) || 4000;
const AI_API_URL = process.env.AI_API_URL || "https://api.openai.com/v1/chat/completions";
const AI_MODEL = process.env.AI_MODEL || "gpt-4o-mini";
const dataPath = join(dirname(fileURLToPath(import.meta.url)), "data.json");
const allowedRoles = ["doctor", "patient", "hospital"];

const dashboardData = {
  heatmapData: [
    { organism: "E. coli", drugs: { Ceftriaxone: 68, Ciprofloxacin: 54, Amikacin: 12, Meropenem: 7, Piperacillin: 31 } },
    { organism: "K. pneumoniae", drugs: { Ceftriaxone: 72, Ciprofloxacin: 61, Amikacin: 24, Meropenem: 16, Piperacillin: 48 } },
    { organism: "P. aeruginosa", drugs: { Ceftriaxone: 45, Ciprofloxacin: 38, Amikacin: 18, Meropenem: 29, Piperacillin: 42 } },
    { organism: "A. baumannii", drugs: { Ceftriaxone: 81, Ciprofloxacin: 74, Amikacin: 43, Meropenem: 57, Piperacillin: 69 } },
    { organism: "S. aureus", drugs: { Ceftriaxone: 36, Ciprofloxacin: 28, Amikacin: 9, Meropenem: 11, Piperacillin: 22 } },
  ],
  drugs: ["Ceftriaxone", "Ciprofloxacin", "Amikacin", "Meropenem", "Piperacillin"],
  resistanceChart: [
    { name: "Ceftriaxone", rate: 68 },
    { name: "Ciprofloxacin", rate: 54 },
    { name: "Piperacillin", rate: 42 },
    { name: "Amikacin", rate: 18 },
    { name: "Meropenem", rate: 16 },
  ],
  firstLineAgents: [
    { drug: "Amikacin", organism: "E. coli", rate: 12 },
    { drug: "Meropenem", organism: "K. pneumoniae", rate: 16 },
    { drug: "Amikacin", organism: "P. aeruginosa", rate: 18 },
    { drug: "Meropenem", organism: "S. aureus", rate: 11 },
  ],
  source: "AMR SURVEILLANCE API",
  period: "CURRENT QUARTER",
};

const sessions = new Map();

async function readStore() { return JSON.parse(await readFile(dataPath, "utf8")); }
async function writeStore(store) { await writeFile(dataPath, `${JSON.stringify(store, null, 2)}\n`); }

function sendJson(response, status, body) {
  response.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  });
  response.end(JSON.stringify(body));
}

function publicUser(user) { return { id: user.id, name: user.name, email: user.email, role: user.role }; }
function hashPassword(password, salt = randomBytes(16).toString("hex")) {
  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}
function passwordsMatch(password, storedHash) {
  const [salt, key] = storedHash.split(":");
  return timingSafeEqual(scryptSync(password, salt, 64), Buffer.from(key, "hex"));
}
function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => { body += chunk; });
    request.on("end", () => {
      try { resolve(body ? JSON.parse(body) : {}); } catch { reject(new Error("Invalid JSON body")); }
    });
    request.on("error", reject);
  });
}
function authenticatedUser(request, store) {
  const token = request.headers.authorization?.replace("Bearer ", "");
  return store.users.find((user) => user.id === sessions.get(token));
}

async function askCareNavigator(body) {
  if (!process.env.AI_API_KEY) return null;
  const response = await fetch(AI_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.AI_API_KEY}` },
    body: JSON.stringify({
      model: AI_MODEL,
      temperature: 0.2,
      messages: [
        { role: "system", content: "You are AMR Care Navigator, a patient education assistant. Provide general health information and help patients prepare an inquiry for a qualified clinician. Never diagnose, prescribe, recommend antibiotic names or doses, interpret a result as definitive, or replace emergency care. If the user mentions severe breathing difficulty, chest pain, fainting, confusion, blue lips, uncontrolled bleeding, or rapidly worsening symptoms, tell them to contact local emergency services or go to the nearest emergency department immediately. Ask concise clarifying questions when useful. Explain that culture and antibiotic susceptibility testing guide clinician decisions. Use plain, empathetic language. Keep replies under 120 words." },
        { role: "user", content: `Patient context: ${JSON.stringify(body.context || {})}\nPatient question: ${String(body.question || "").slice(0, 1000)}` },
      ],
    }),
  });
  if (!response.ok) throw new Error(`AI provider returned ${response.status}`);
  const result = await response.json();
  return result.choices?.[0]?.message?.content?.trim() || null;
}

const server = http.createServer(async (request, response) => {
  try {
    if (request.method === "OPTIONS") { sendJson(response, 204, {}); return; }
    const url = new URL(request.url, `http://${request.headers.host}`);
    const store = await readStore();

    if (request.method === "GET" && url.pathname === "/api/health") {
      sendJson(response, 200, { status: "ok", service: "amr-shield-api" }); return;
    }
    if (request.method === "GET" && url.pathname === "/") {
      sendJson(response, 200, {
        service: "AMR SHIELD API",
        status: "running",
        frontend: "Open the Vite URL, usually http://localhost:5173 or http://localhost:5174",
        health: "/api/health",
      }); return;
    }
    if (request.method === "GET" && url.pathname === "/api/dashboard") {
      const role = url.searchParams.get("role");
      if (!allowedRoles.includes(role)) { sendJson(response, 400, { error: "A valid role is required." }); return; }
      const reports = store.reports.filter((report) => report.role === role || report.role === "hospital");
      sendJson(response, 200, { role, reportCount: reports.length, ...dashboardData }); return;
    }

    if (request.method === "POST" && url.pathname === "/api/ai/ask") {
      const body = await readBody(request);
      if (!String(body.question || "").trim()) { sendJson(response, 400, { error: "A question is required." }); return; }
      try {
        const answer = await askCareNavigator(body);
        if (!answer) { sendJson(response, 503, { error: "AI provider is not configured." }); return; }
        sendJson(response, 200, { answer, model: AI_MODEL });
      } catch (error) { sendJson(response, 502, { error: "The AI service is temporarily unavailable." }); }
      return;
    }

    if (request.method === "POST" && ["/api/auth/register", "/api/auth/login"].includes(url.pathname)) {
      const body = await readBody(request);
      const email = String(body.email || "").trim().toLowerCase();
      const password = String(body.password || "");
      if (!email || password.length < 6 || !allowedRoles.includes(body.role)) {
        sendJson(response, 400, { error: "Email, role, and a password of at least 6 characters are required." }); return;
      }
      let user = store.users.find((candidate) => candidate.email === email && candidate.role === body.role);
      if (url.pathname.endsWith("register")) {
        if (user) { sendJson(response, 409, { error: "An account already exists for this role and email." }); return; }
        user = { id: randomUUID(), name: String(body.name || email.split("@")[0]), email, role: body.role, passwordHash: hashPassword(password), createdAt: new Date().toISOString() };
        store.users.push(user); await writeStore(store);
      } else if (!user || !passwordsMatch(password, user.passwordHash)) {
        sendJson(response, 401, { error: "Invalid email, password, or role." }); return;
      }
      const token = randomBytes(32).toString("hex");
      sessions.set(token, user.id);
      sendJson(response, 200, { token, user: publicUser(user) }); return;
    }

    if (url.pathname === "/api/reports" && ["GET", "POST"].includes(request.method)) {
      const user = authenticatedUser(request, store);
      if (!user) { sendJson(response, 401, { error: "Authentication required." }); return; }
      if (request.method === "GET") {
        const role = url.searchParams.get("role");
        sendJson(response, 200, store.reports.filter((report) => !role || report.role === role || user.role === "hospital")); return;
      }
      const body = await readBody(request);
      if (!body.title || !body.organism || !body.drug || !Number.isFinite(Number(body.resistanceRate))) {
        sendJson(response, 400, { error: "title, organism, drug, and resistanceRate are required." }); return;
      }
      const report = { id: randomUUID(), ownerId: user.id, role: user.role, title: String(body.title), organism: String(body.organism), drug: String(body.drug), resistanceRate: Number(body.resistanceRate), createdAt: new Date().toISOString() };
      store.reports.push(report); await writeStore(store); sendJson(response, 201, report); return;
    }

    const reportMatch = url.pathname.match(/^\/api\/reports\/([^/]+)$/);
    if (reportMatch && ["PUT", "DELETE"].includes(request.method)) {
      const user = authenticatedUser(request, store);
      const report = store.reports.find((item) => item.id === reportMatch[1]);
      if (!user) { sendJson(response, 401, { error: "Authentication required." }); return; }
      if (!report || (report.ownerId !== user.id && user.role !== "hospital")) { sendJson(response, 404, { error: "Report not found." }); return; }
      if (request.method === "DELETE") store.reports = store.reports.filter((item) => item.id !== report.id);
      else Object.assign(report, await readBody(request), { id: report.id, ownerId: report.ownerId, role: report.role });
      await writeStore(store); sendJson(response, 200, request.method === "DELETE" ? { deleted: true } : report); return;
    }
    sendJson(response, 404, { error: "Route not found." });
  } catch (error) {
    sendJson(response, error.message === "Invalid JSON body" ? 400 : 500, { error: error.message });
  }
});

server.listen(PORT, () => console.log(`AMR SHIELD API listening on http://localhost:${PORT}`));
