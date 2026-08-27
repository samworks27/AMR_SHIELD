import React, { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const timer = requestAnimationFrame(step);
    return () => cancelAnimationFrame(timer);
  }, [target, duration]);
  return count;
}

function CountUp({ target, suffix = "" }) {
  const count = useCountUp(target);
  return <strong>{count}{suffix}</strong>;
}

/* =====================================================
   LOGO
===================================================== */

function Logo() {
  return (
    <div className="brand">
      <div className="brand-shield">✚</div>

      <div>
        <div className="brand-name">AMR SHIELD</div>
        <div className="brand-subtitle">
          RESISTANCE INTELLIGENCE
        </div>
      </div>
    </div>
  );
}

/* =====================================================
   LANDING PAGE
===================================================== */

function LandingPage({ onEnter }) {
  useReveal();
  const microbes = ["🦠", "💊", "🧬", "🩺", "🔬", "🧫", "🦠", "💊", "🧬", "🩺", "🔬", "🧫", "🦠", "💊", "🧬"];
  const particles = microbes.map((emoji, i) => (
    <div
      key={i}
      className="microbe"
      aria-hidden="true"
      style={{
        left: `${Math.random() * 94}%`,
        animationDuration: `${18 + Math.random() * 22}s`,
        animationDelay: `${Math.random() * 15}s`,
        fontSize: `${16 + Math.random() * 22}px`,
      }}
    >
      {emoji}
    </div>
  ));

  return (
    <div className="landing-page">
      <div className="landing-particles" aria-hidden="true">{particles}</div>

      <header className="navbar">
        <Logo />

        <div className="header-actions">
          <a className="helpline-link" href="mailto:support@amrshield.org">Help: support@amrshield.org</a>
          <div className="system-status">
            <span className="status-dot"></span>
            SYSTEM OPERATIONAL
          </div>
        </div>
      </header>

      <main>

        {/* HERO */}

        <section className="hero reveal">

          <div className="hero-content">

            <div className="eyebrow">
              ANTIMICROBIAL RESISTANCE • HEALTHCARE INTELLIGENCE
            </div>

            <h1>
              Fight resistance
              <br />
              with <span>better intelligence.</span>
            </h1>

            <p>
              AMR SHIELD helps healthcare professionals and
              institutions understand antimicrobial resistance
              patterns and transform complex resistance data
              into clear, actionable insights.
            </p>

            <div className="hero-buttons">

              <button
                className="primary-button"
                onClick={onEnter}
              >
                Enter AMR SHIELD
                <span>→</span>
              </button>

              <button
                className="text-button"
                onClick={() =>
                  document
                    .getElementById("mission")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >
                Explore the mission
              </button>

            </div>

            <div className="hero-stats">
              <div className="stat">
                <CountUp target={10} suffix="K+" />
                <span>Patients</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <CountUp target={50} suffix="+" />
                <span>Hospitals</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <CountUp target={200} suffix="+" />
                <span>Drugs monitored</span>
              </div>
            </div>

          </div>

          <div className="hero-visual">

            <div className="visual-glow"></div>

            <div className="shield-card">

              <div className="big-shield">
                ✚
              </div>

              <div className="visual-title">
                AMR SHIELD
              </div>

              <div className="visual-description">
                Resistance intelligence platform
              </div>

              <div className="mini-status">
                <span className="status-dot"></span>
                SYSTEM OPERATIONAL
              </div>

              <div className="mini-chart">

                <div className="mini-heading">
                  Resistance profile
                  <span>LIVE</span>
                </div>

                <div className="mini-row">
                  <span>Drug A</span>

                  <div className="mini-bar">
                    <i style={{ width: "32%" }}></i>
                  </div>

                  <b>Low</b>
                </div>

                <div className="mini-row">
                  <span>Drug B</span>

                  <div className="mini-bar">
                    <i style={{ width: "76%" }}></i>
                  </div>

                  <b>High</b>
                </div>

                <div className="mini-row">
                  <span>Drug C</span>

                  <div className="mini-bar">
                    <i style={{ width: "49%" }}></i>
                  </div>

                  <b>Mid</b>
                </div>

              </div>

            </div>

            <div className="floating-icon icon-1" aria-hidden="true">🦠</div>
            <div className="floating-icon icon-2" aria-hidden="true">💊</div>
            <div className="floating-icon icon-3" aria-hidden="true">🧬</div>
            <div className="floating-icon icon-4" aria-hidden="true">🩺</div>

          </div>

        </section>

        {/* MISSION */}

        <section className="mission reveal" id="mission">

          <div className="section-label">
            WHY AMR SHIELD
          </div>

          <h2>
            When every dose matters,
            <br />
            <span>clarity matters too.</span>
          </h2>

          <p>
            Antimicrobial resistance is a growing challenge.
            AMR SHIELD is designed to make resistance
            information easier to understand, compare and monitor.
          </p>

          <div className="mission-cards">
            <div className="mission-card">
              <div className="mission-icon" aria-hidden="true">🔍</div>
              <h3>Explainable</h3>
              <p>Transparent reasoning behind every resistance signal and recommendation.</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon" aria-hidden="true">🤝</div>
              <h3>Collaborative</h3>
              <p>Connects patients, doctors and hospitals in one secure workflow.</p>
            </div>
            <div className="mission-card">
              <div className="mission-icon" aria-hidden="true">📊</div>
              <h3>Data-driven</h3>
              <p>Live surveillance, heatmaps and antibiograms updated from real observations.</p>
            </div>
          </div>

        </section>

        {/* QUOTE */}

        <section className="quote-section reveal">

          <div className="quote-mark">
            “
          </div>

          <blockquote>
            Make resistance visible.
            <br />
            <span>Make every decision smarter.</span>
          </blockquote>

          <div className="quote-line"></div>

          <p>
            AMR SHIELD
          </p>

        </section>

        {/* IMPACT NUMBERS */}

        <section className="impact-section reveal">

          <div className="section-label">
            IMPACT
          </div>

          <h2>
            Built for real-world <span>antimicrobial stewardship</span>
          </h2>

          <div className="impact-grid">
            <div className="impact-card">
              <div className="impact-icon" aria-hidden="true">🏥</div>
              <strong>Hospitals</strong>
              <p>Monitor resistance trends, antibiograms and surveillance indicators across wards.</p>
            </div>
            <div className="impact-card">
              <div className="impact-icon" aria-hidden="true">👨‍⚕️</div>
              <strong>Doctors</strong>
              <p>Review patient history, investigations and explainable AI signals before prescribing.</p>
            </div>
            <div className="impact-card">
              <div className="impact-icon" aria-hidden="true">🧑</div>
              <strong>Patients</strong>
              <p>Share symptoms securely, understand reports and access trusted drug information.</p>
            </div>
            <div className="impact-card">
              <div className="impact-icon" aria-hidden="true">🧪</div>
              <strong>Laboratories</strong>
              <p>Culture and AST results linked to organism-level resistance intelligence.</p>
            </div>
          </div>

        </section>

        {/* HOW IT WORKS */}

        <section className="steps-section reveal">

          <div className="section-label">
            HOW IT WORKS
          </div>

          <h2>
            From data to <span>decision</span> in minutes
          </h2>

          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-icon" aria-hidden="true">📋</div>
              <h3>Share context</h3>
              <p>Patients submit symptoms, temperature, antibiotics and allergy history.</p>
            </div>
            <div className="step-connector" aria-hidden="true"></div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-icon" aria-hidden="true">🧬</div>
              <h3>Analyze resistance</h3>
              <p>Doctors review organism-level heatmaps, antibiograms and culture results.</p>
            </div>
            <div className="step-connector" aria-hidden="true"></div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-icon" aria-hidden="true">💡</div>
              <h3>Review signals</h3>
              <p>Transparent phenotype scoring supports — but does not replace — clinical judgement.</p>
            </div>
            <div className="step-connector" aria-hidden="true"></div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-icon" aria-hidden="true">✅</div>
              <h3>Act safely</h3>
              <p>Save assessments, track outcomes and improve antimicrobial stewardship.</p>
            </div>
          </div>

        </section>

        {/* TESTIMONIALS */}

        <section className="testimonials-section reveal">

          <div className="section-label">
            VOICES
          </div>

          <h2>
            Trusted by <span>healthcare teams</span>
          </h2>

          <div className="testimonials">
            <div className="testimonial">
              <div className="testimonial-avatar" aria-hidden="true">👨‍⚕️</div>
              <blockquote>
                “AMR SHIELD makes resistance patterns easier to explain to patients and supports safer prescribing decisions.”
              </blockquote>
              <p className="testimonial-author">— Dr. Arjun Mehta, Infectious Disease Specialist</p>
            </div>
            <div className="testimonial">
              <div className="testimonial-avatar" aria-hidden="true">👩</div>
              <blockquote>
                “I can share my symptoms and previous antibiotics with my doctor in one place. It feels organised and private.”
              </blockquote>
              <p className="testimonial-author">— Priya S., Patient</p>
            </div>
            <div className="testimonial">
              <div className="testimonial-avatar" aria-hidden="true">🏥</div>
              <blockquote>
                “The hospital dashboard helps us monitor quarterly resistance trends and coordinate care across departments.”
              </blockquote>
              <p className="testimonial-author">— City General Hospital, Microbiology Dept.</p>
            </div>
          </div>

        </section>

        {/* CTA */}

        <section className="cta-section reveal">
          <h2>Ready to explore?</h2>
          <p>Join the network using AMR SHIELD for smarter antimicrobial decisions.</p>
          <button className="primary-button large" onClick={onEnter}>
            Enter AMR SHIELD <span>→</span>
          </button>
        </section>

      </main>

    </div>
  );
}

/* =====================================================
   ACCESS PORTAL
===================================================== */

function PortalPage({ onBack, onSelect }) {

  return (
    <div className="dashboard-page">

      <header className="dashboard-nav">

        <div
          className="clickable-logo"
          onClick={onBack}
        >
          <Logo />
        </div>

        <div className="header-actions">
          <a className="helpline-link" href="tel:14001234">Helpline: 1400 1234</a>
          <div className="system-status">
            <span className="status-dot"></span>
            SYSTEM OPERATIONAL
          </div>
        </div>

      </header>

      <main className="portal-container">

        <div className="portal-heading">

          <div className="eyebrow">
            WELCOME TO AMR SHIELD
          </div>

          <h1>
            Choose your access
          </h1>

          <p>
            Select your role to continue to the
            AMR SHIELD platform.
          </p>

        </div>

        <div className="portal-cards">

          {/* DOCTOR */}

          <div
            className="portal-card"
            onClick={() => onSelect("doctor")}
          >

            <div className="portal-icon">
              ✚
            </div>

            <div className="portal-type">
              HEALTHCARE PROFESSIONAL
            </div>

            <h2>
              Doctor
            </h2>

            <p>
              Access resistance intelligence,
              patient reports and clinical insights.
            </p>

            <button>
              Continue <span>→</span>
            </button>

          </div>

          {/* PATIENT */}

          <div
            className="portal-card"
            onClick={() => onSelect("patient")}
          >

            <div className="portal-icon">
              ♡
            </div>

            <div className="portal-type">
              INDIVIDUAL
            </div>

            <h2>
              Patient
            </h2>

            <p>
              View your reports and understand
              antimicrobial resistance information.
            </p>

            <button>
              Continue <span>→</span>
            </button>

          </div>

          {/* HOSPITAL */}

          <div
            className="portal-card"
            onClick={() => onSelect("hospital")}
          >

            <div className="portal-icon">
              +
            </div>

            <div className="portal-type">
              HEALTHCARE INSTITUTION
            </div>

            <h2>
              Hospital
            </h2>

            <p>
              Monitor hospital resistance trends,
              antibiograms and surveillance indicators.
            </p>

            <button>
              Continue <span>→</span>
            </button>

          </div>

        </div>

        <button
          className="portal-back"
          onClick={onBack}
        >
          ← Back to introduction
        </button>

      </main>

    </div>
  );
}

/* =====================================================
   AUTHENTICATION PAGE
===================================================== */

async function hashAadhaar(aadhaar) {
  const encoded = new TextEncoder().encode(aadhaar);
  let digest;
  try {
    digest = await crypto.subtle.digest("SHA-256", encoded);
  } catch {
    let hash = 0;
    for (let i = 0; i < encoded.length; i++) {
      const chr = encoded[i];
      hash = ((hash << 5) - hash) + chr;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(64, "0").slice(0, 64);
  }
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function AuthPage({
  role,
  onBack,
  onContinue,
}) {

  const [mode, setMode] = useState("signin");
  const [formData, setFormData] = useState({
    name: "",
    institution: "",
    email: "",
    password: "",
    confirmPassword: "",
    aadhaar: "",
    dateOfBirth: "",
    contactNumber: "",
    allergies: "",
    comorbidities: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roleName =
    role.charAt(0).toUpperCase() +
    role.slice(1);

  function updateField(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setError("");
  }

  async function submitAuth(event) {
    event.preventDefault();
    if (mode === "signup" && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (mode === "signup" && !/^\d{12}$/.test(formData.aadhaar)) {
      setError("Aadhaar number must contain exactly 12 digits.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    try {
      const result = mode === "signup"
        ? await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: { data: {
            name: formData.name,
            institution: formData.institution,
            role,
            date_of_birth: formData.dateOfBirth,
            contact_number: formData.contactNumber,
            aadhaar_last4: formData.aadhaar.slice(-4),
            aadhaar_hash: await hashAadhaar(formData.aadhaar),
            allergies: formData.allergies,
            comorbidities: formData.comorbidities,
          } },
        })
        : await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

      if (result.error) throw result.error;
      if (!result.data.session) {
        setError("Account created. Check your email to confirm your account, then sign in.");
        setMode("signin");
        return;
      }
      const accountRole = result.data.user.user_metadata?.role;
      if (mode === "signin" && accountRole && accountRole !== role) {
        await supabase.auth.signOut();
        throw new Error(`This account is registered as ${accountRole}, not ${role}.`);
      }
      onContinue(result.data.user);
    } catch (authError) {
      setError(authError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="dashboard-page">

      <header className="dashboard-nav">

        <div
          className="clickable-logo"
          onClick={onBack}
        >
          <Logo />
        </div>

        <div className="header-actions">
          <a className="helpline-link" href="tel:14001234">Helpline: 1400 1234</a>
          <div className="system-status">
            <span className="status-dot"></span>
            SYSTEM OPERATIONAL
          </div>
        </div>

      </header>

      <main className="auth-container">

        <div className="auth-card">

          <div className="auth-icon">

            {role === "doctor" && "✚"}
            {role === "patient" && "♡"}
            {role === "hospital" && "+"}

          </div>

          <div className="auth-heading">

            <div className="eyebrow">
              AMR SHIELD • {roleName.toUpperCase()} PORTAL
            </div>

            <h1>
              {mode === "signin"
                ? "Welcome back"
                : "Create your account"}
            </h1>

            <p>
              {mode === "signin"
                ? `Sign in to continue to your ${roleName.toLowerCase()} dashboard.`
                : `Create your AMR SHIELD ${roleName.toLowerCase()} account.`}
            </p>

          </div>

          <div className="auth-tabs">

            <button
              className={
                mode === "signin"
                  ? "auth-tab active"
                  : "auth-tab"
              }
              onClick={() => setMode("signin")}
            >
              Sign In
            </button>

            <button
              className={
                mode === "signup"
                  ? "auth-tab active"
                  : "auth-tab"
              }
              onClick={() => setMode("signup")}
            >
              Create Account
            </button>

          </div>

          <div className="auth-form">

            {mode === "signup" && (

              <div className="form-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={updateField}
                  placeholder={
                    role === "hospital"
                      ? "Hospital administrator name"
                      : "Enter your full name"
                  }
                />

              </div>

            )}

            {mode === "signup" &&
              role === "hospital" && (

                <div className="form-group">

                  <label>
                    Hospital / Institution Name
                  </label>

                  <input
                    name="institution"
                    value={formData.institution}
                    onChange={updateField}
                    type="text"
                    placeholder="Enter hospital name"
                  />

                </div>

              )}

            {mode === "signup" && (
              <>
                <div className="form-group">
                  <label>Aadhaar Number</label>
                  <input required name="aadhaar" value={formData.aadhaar} onChange={updateField} inputMode="numeric" maxLength="12" pattern="[0-9]{12}" placeholder="12-digit Aadhaar number" />
                  <small className="field-note">Only the last 4 digits and a secure hash are retained.</small>
                </div>
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input required name="dateOfBirth" value={formData.dateOfBirth} onChange={updateField} type="date" />
                </div>
                <div className="form-group">
                  <label>Contact Number</label>
                  <input required name="contactNumber" value={formData.contactNumber} onChange={updateField} type="tel" placeholder="10-digit contact number" />
                </div>
                <div className="form-group">
                  <label>Existing Allergies</label>
                  <textarea name="allergies" value={formData.allergies} onChange={updateField} placeholder="List allergies, or write None" />
                </div>
                <div className="form-group">
                  <label>Comorbidities</label>
                  <textarea name="comorbidities" value={formData.comorbidities} onChange={updateField} placeholder="List relevant conditions, or write None" />
                </div>
              </>
            )}

            <div className="form-group">

              <label>
                Email Address
              </label>

              <input
                name="email"
                value={formData.email}
                onChange={updateField}
                type="email"
                placeholder="you@example.com"
              />

            </div>

            <div className="form-group">

              <label>
                Password
              </label>

              <input
                name="password"
                value={formData.password}
                onChange={updateField}
                type="password"
                placeholder="Enter your password"
              />

            </div>

            {mode === "signup" && (

              <div className="form-group">

                <label>
                  Confirm Password
                </label>

                <input
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={updateField}
                  type="password"
                  placeholder="Confirm your password"
                />

              </div>

            )}

            {mode === "signin" && (

              <div className="forgot-password">
                Forgot password?
              </div>

            )}

            {error && <div className="auth-error">{error}</div>}

            <button
              className="auth-submit"
              onClick={submitAuth}
              disabled={isSubmitting}
            >

              {mode === "signin"
                ? "Sign In"
                : "Create Account"}

              <span>
                →
              </span>

            </button>

          </div>

          <div className="auth-security">

            <span>🔒</span>

            <div>

              <strong>
                Secure access
              </strong>

              <p>
                Your authentication details are protected.
                Authentication is secured by Supabase.
              </p>

            </div>

          </div>

        </div>

        <button
          className="portal-back"
          onClick={onBack}
        >
          ← Back to access selection
        </button>

      </main>

    </div>
  );
}

/* =====================================================
   RESISTANCE DASHBOARD
===================================================== */

function PatientInquiryPanel({ onPredict }) {
  const [form, setForm] = useState({ site: "Urinary", symptoms: "", temperature: "", antibiotics: "", allergies: "", comorbidities: "" });
  const [message, setMessage] = useState("");

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function submitInquiry(event) {
    event.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    const payload = { ...form, patient_id: user?.id || "demo-patient", created_at: new Date().toISOString() };
    localStorage.setItem("amr-latest-patient-inquiry", JSON.stringify(payload));
    if (user) {
      const { error } = await supabase.from("patient_inquiries").insert({
        patient_id: user.id, illness_site: form.site, symptoms: form.symptoms,
        temperature: form.temperature ? Number(form.temperature) : null,
        previous_antibiotics: form.antibiotics, allergies: form.allergies, comorbidities: form.comorbidities,
      });
      setMessage(error ? "Saved locally only; cloud delivery failed. Check console for details." : "Inquiry shared with your care team.");
    } else {
      setMessage("Not signed in. Inquiry saved on this device only — your doctor will not see it until you log in.");
    }
  }

  return <section className="patient-inquiry-panel"><div className="section-header"><div><div className="card-label">SHARE WITH YOUR CARE TEAM</div><h2>Describe your current problem</h2></div><div className="report-count">PRIVATE INQUIRY</div></div><form className="patient-inquiry-form" onSubmit={submitInquiry}><label>Problem / symptoms<textarea required name="symptoms" value={form.symptoms} onChange={updateField} placeholder="Describe symptoms, duration and severity" /></label><label>Site of illness<select name="site" value={form.site} onChange={updateField}><option>Urinary</option><option>Respiratory</option><option>Bloodstream</option><option>Skin and soft tissue</option><option>Gastrointestinal</option></select></label><label>Temperature (°C)<input name="temperature" type="number" min="30" max="45" step="0.1" value={form.temperature} onChange={updateField} placeholder="Optional" /></label><label>Previous antibiotics<input name="antibiotics" value={form.antibiotics} onChange={updateField} placeholder="Drug and approximate date" /></label><label>Allergies<input name="allergies" value={form.allergies} onChange={updateField} placeholder="Known allergies or None" /></label><label>Comorbidities<input name="comorbidities" value={form.comorbidities} onChange={updateField} placeholder="Relevant conditions or None" /></label><div className="inquiry-actions"><button className="primary-button" type="submit">Share inquiry <span>→</span></button><button className="text-button" type="button" onClick={onPredict}>Open resistance review</button>{message && <strong>{message}</strong>}</div></form></section>;
}

function PatientAIAgent({ role = "patient" }) {
  const [question, setQuestion] = useState("");
  const openingMessage = role === "doctor"
    ? "Hi, I am Careva. I can help organise patient context, explain AMR reports and prepare questions for clinical review."
    : role === "hospital"
      ? "Hi, I am Careva. I can help explain AMR trends, resistance reports and surveillance concepts."
      : "Hi, I am Careva. I can help you prepare for your doctor visit, understand your reports, and identify symptoms that need urgent attention.";
  const [messages, setMessages] = useState([{ from: "agent", text: openingMessage }]);

  async function askAgent(event) {
    event.preventDefault();
    const prompt = question.trim();
    if (!prompt) return;
    const lowerPrompt = prompt.toLowerCase();
    let answer = "Please share this concern with your doctor through the patient inquiry form. I can organise symptoms and explain what information your care team may need, but I cannot diagnose or prescribe.";
    if (/(emergency|urgent|severe|breathless|unconscious|confusion|blue|chest pain)/.test(lowerPrompt)) answer = "These may be urgent warning signs. Please contact local emergency services or go to the nearest emergency department now. Do not wait for an online prediction.";
    else if (/(culture|test|report|ast|sensitivity)/.test(lowerPrompt)) answer = "Culture and antibiotic sensitivity testing help the doctor choose an effective antibiotic. Upload or share the report when available, and do not start, stop or change antibiotics without medical advice.";
    else if (/(antibiotic|medicine|drug|dose)/.test(lowerPrompt)) answer = "I cannot recommend a medicine or dose. Add your previous antibiotic use, allergies and current symptoms to your inquiry so the doctor can review them safely.";
    else if (/(what should|prepare|doctor|visit)/.test(lowerPrompt)) answer = "Before your visit, note when symptoms started, your temperature, current medicines, allergies, previous antibiotics and any blood or urine reports.";
    const localAnswer = answer;
    setMessages([...messages, { from: "patient", text: prompt }, { from: "agent", text: answer }]);
    setQuestion("");
    try {
      const context = JSON.parse(localStorage.getItem("amr-latest-patient-inquiry") || "{}");
      const response = await fetch("http://localhost:4000/api/ai/ask", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question: prompt, context }) });
      if (!response.ok) throw new Error("AI unavailable");
      const result = await response.json();
      setMessages((current) => [...current.slice(0, -1), { from: "agent", text: result.answer || localAnswer }]);
    } catch {
      setMessages((current) => [...current.slice(0, -1), { from: "agent", text: localAnswer + " (Showing general guidance; AI backend is unavailable.)" }]);
    }
  }

  return <section className="ai-agent-panel"><div className="careva-heading"><div className="careva-mascot" aria-label="Careva healthcare mascot" role="img"><div className="careva-antenna" /><div className="careva-head"><span>+</span><i /></div><div className="careva-body"><b>♡</b></div><div className="careva-arm careva-arm-left" /><div className="careva-arm careva-arm-right" /><div className="careva-foot careva-foot-left" /><div className="careva-foot careva-foot-right" /></div><div><div className="card-label">{role === "patient" ? "PATIENT SUPPORT AGENT" : "AMR INTELLIGENCE ASSISTANT"}</div><h2>Careva</h2><p className="careva-tagline">Your intelligent healthcare companion</p></div><span className="ai-status"><i /> Available</span></div><div className="ai-disclaimer">Information support only. Careva does not diagnose, prescribe or replace a clinician.</div><div className="ai-messages" aria-live="polite">{messages.map((message, index) => <div className={`ai-message ${message.from}`} key={`${message.from}-${index}`}>{message.text}</div>)}</div><form className="ai-form" onSubmit={askAgent}><input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder={role === "doctor" ? "Ask Careva about reports, AST or patient review" : role === "hospital" ? "Ask Careva about AMR surveillance" : "Ask Careva about your symptoms, reports or visit"} aria-label="Ask Careva" /><button type="submit">Ask Careva <span>→</span></button></form></section>;
}

const defaultDrugMetadata = {
  contraindications: "Check the current product label; do not use with a known serious allergy.",
  interactions: "Do not combine with another medicine unless a clinician or pharmacist confirms compatibility.",
  side_effects: "Possible nausea, diarrhea or rash; seek medical advice for severe or persistent symptoms.",
};

function normalizeDrugMetadata(drug) {
  return {
    ...drug,
    contraindications: drug.contraindications || defaultDrugMetadata.contraindications,
    interactions: drug.interactions || defaultDrugMetadata.interactions,
    side_effects: drug.side_effects || defaultDrugMetadata.side_effects,
  };
}

function ResistanceDashboard({ role, onBack, onPredict, onViewProfile }) {

  const [apiData, setApiData] = useState(null);
  const [apiError, setApiError] = useState(false);
  const [profile, setProfile] = useState(null);
  const [reports, setReports] = useState([]);
  const [reportForm, setReportForm] = useState({
    title: "",
    organism: "E. coli",
    drug: "Amikacin",
    resistanceRate: "",
  });
  const [reportMessage, setReportMessage] = useState("");
  const [drugSearch, setDrugSearch] = useState("");
  const [drugResults, setDrugResults] = useState([]);
  const [drugMessage, setDrugMessage] = useState("");
  const [isSearchingDrugs, setIsSearchingDrugs] = useState(false);

  useEffect(() => {
    let cancelled = false;

    supabase.auth.getUser()
      .then(async ({ data: { user }, error }) => {
        if (error || !user) throw error || new Error("Authentication required");
        const [reportsResult, observationsResult, profileResult] = await Promise.all([
          supabase.from("reports").select("*").order("created_at", { ascending: false }),
          supabase
            .from("resistance_observations")
            .select("organism, resistance_rate, drugs(name)")
            .order("updated_at", { ascending: false }),
          supabase.from("profiles").select("amr_id, full_name").eq("id", user.id).maybeSingle(),
        ]);
        if (reportsResult.error) throw reportsResult.error;
        if (observationsResult.error) throw observationsResult.error;
        if (profileResult.error) throw profileResult.error;

        const heatmapByOrganism = {};
        observationsResult.data?.forEach((observation) => {
          const drugName = observation.drugs?.name;
          const rate = Number(observation.resistance_rate);
          if (!drugName || !Number.isFinite(rate)) return;
          if (!heatmapByOrganism[observation.organism]) {
            heatmapByOrganism[observation.organism] = { organism: observation.organism, drugs: {} };
          }
          heatmapByOrganism[observation.organism].drugs[drugName] = rate;
        });
        const liveHeatmapData = Object.values(heatmapByOrganism);

        if (!cancelled) {
          setReports(reportsResult.data || []);
          setProfile(profileResult.data);
          setApiData({
            reportCount: reportsResult.data?.length || 0,
            heatmapData: liveHeatmapData,
          drugs: [...new Set(liveHeatmapData.flatMap((row) => Object.keys(row.drugs)))],
          isLive: liveHeatmapData.length > 0,
          });
        }
      })
      .catch(() => {
        if (!cancelled) setApiError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [role]);

  async function saveReport(event) {
    event.preventDefault();
    setReportMessage("");
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setReportMessage("Please sign in again before saving a report.");
      return;
    }
    const resistanceRate = reportForm.resistanceRate !== "" ? Number(reportForm.resistanceRate) : getReportResistanceRate(reportForm.organism, reportForm.drug);
    if (resistanceRate === null || !Number.isFinite(Number(resistanceRate))) {
      setReportMessage("Enter or select a valid resistance rate between 0 and 100.");
      return;
    }

    const { data, error } = await supabase
      .from("reports")
      .insert({
        user_id: user.id,
        role,
        title: reportForm.title,
        organism: reportForm.organism,
        drug: reportForm.drug,
        resistance_rate: resistanceRate,
      })
      .select()
      .single();

    if (error) {
      setReportMessage(error.message);
      return;
    }
    setReports([data, ...reports]);
    setApiData((current) => ({ ...current, reportCount: reports.length + 1 }));
    setReportForm({ ...reportForm, title: "", resistanceRate: "" });
    setReportMessage("Report saved to Supabase.");
  }

  async function deleteReport(reportId) {
    const { error } = await supabase.from("reports").delete().eq("id", reportId);
    if (error) {
      setReportMessage(error.message);
      return;
    }
    setReports(reports.filter((report) => report.id !== reportId));
    setApiData((current) => ({ ...current, reportCount: Math.max(0, reports.length - 1) }));
    setReportMessage("Report deleted.");
  }

  async function searchDrugs(event) {
    event.preventDefault();
    setIsSearchingDrugs(true);
    setDrugMessage("");
    const runSearch = (fields) => {
      const query = supabase.from("drugs").select(fields).order("name").limit(20);
      return drugSearch.trim()
        ? query.ilike("name", `%${drugSearch.trim()}%`)
        : query;
    };
    let result = await runSearch("id, name, generic_name, drug_class, description, contraindications, interactions, side_effects, source, source_url, updated_at");
    if (result.error) {
      // Existing projects may have the original drugs table without the optional metadata columns.
      result = await runSearch("id, name, generic_name, drug_class, description, source, source_url, updated_at");
    }

    if (result.error) {
      const fallbackResults = fallbackDrugRecords.filter((drug) => !drugSearch.trim() || drug.name.toLowerCase().includes(drugSearch.trim().toLowerCase()));
      setDrugResults(fallbackResults);
      setDrugMessage(fallbackResults.length ? "Showing reference metadata while the drug database is unavailable." : "No matching drugs found.");
    } else if (!result.data?.length) {
      setDrugMessage("No matching drugs found.");
      setDrugResults([]);
    } else {
      setDrugResults(result.data.map(normalizeDrugMetadata));
    }
    setIsSearchingDrugs(false);
  }

  const roleName =
    role.charAt(0).toUpperCase() +
    role.slice(1);

  /* =====================================================
     DEMO DATA
  ===================================================== */

  const fallbackHeatmapData = [
    {
      organism: "E. coli",
      drugs: {
        "Ceftriaxone": 68,
        "Ciprofloxacin": 54,
        "Amikacin": 12,
        "Meropenem": 7,
        "Piperacillin": 31,
      },
    },
    {
      organism: "K. pneumoniae",
      drugs: {
        "Ceftriaxone": 72,
        "Ciprofloxacin": 61,
        "Amikacin": 24,
        "Meropenem": 16,
        "Piperacillin": 48,
      },
    },
    {
      organism: "P. aeruginosa",
      drugs: {
        "Ceftriaxone": 45,
        "Ciprofloxacin": 38,
        "Amikacin": 18,
        "Meropenem": 29,
        "Piperacillin": 42,
      },
    },
    {
      organism: "A. baumannii",
      drugs: {
        "Ceftriaxone": 81,
        "Ciprofloxacin": 74,
        "Amikacin": 43,
        "Meropenem": 57,
        "Piperacillin": 69,
      },
    },
    {
      organism: "S. aureus",
      drugs: {
        "Ceftriaxone": 36,
        "Ciprofloxacin": 28,
        "Amikacin": 9,
        "Meropenem": 11,
        "Piperacillin": 22,
      },
    },
  ];

  const fallbackDrugs = [
    "Ceftriaxone",
    "Ciprofloxacin",
    "Amikacin",
    "Meropenem",
    "Piperacillin",
  ];

  const fallbackDrugSafety = {
    Ceftriaxone: {
      contraindications: "Serious cephalosporin or beta-lactam allergy",
      interactions: "Check calcium-containing IV products and duplicate beta-lactams",
      side_effects: "Diarrhea; rash; injection reactions",
    },
    Ciprofloxacin: {
      contraindications: "Fluoroquinolone allergy; tendon or rhythm risks need review",
      interactions: "Separate from antacids, iron or calcium; check QT-prolonging drugs",
      side_effects: "Nausea; tendon pain; nervous-system effects",
    },
    Amikacin: {
      contraindications: "Serious aminoglycoside allergy; renal or hearing risk needs review",
      interactions: "Avoid other nephrotoxic or ototoxic drugs unless monitored",
      side_effects: "Kidney injury; hearing or balance changes",
    },
    Meropenem: {
      contraindications: "Serious beta-lactam allergy; seizure risk needs review",
      interactions: "Check valproate because levels may fall; review other beta-lactams",
      side_effects: "Diarrhea; nausea; rash",
    },
    Piperacillin: {
      contraindications: "Serious penicillin or beta-lactam allergy; renal dosing needs review",
      interactions: "Check anticoagulants, kidney-toxic drugs and duplicate beta-lactams",
      side_effects: "Diarrhea; rash; electrolyte changes",
    },
  };

  const fallbackDrugRecords = fallbackDrugs.map((name) => normalizeDrugMetadata({
    id: `fallback-${name}`,
    name,
    generic_name: name,
    drug_class: "Antibacterial medicine",
    description: "Reference information only; use follows culture results and qualified clinical review.",
    ...fallbackDrugSafety[name],
    source: "DailyMed",
    source_url: "https://dailymed.nlm.nih.gov/dailymed/",
  }));

  const fallbackResistanceChart = [
    {
      name: "Ceftriaxone",
      rate: 68,
    },
    {
      name: "Ciprofloxacin",
      rate: 54,
    },
    {
      name: "Piperacillin",
      rate: 42,
    },
    {
      name: "Amikacin",
      rate: 18,
    },
    {
      name: "Meropenem",
      rate: 16,
    },
  ];

  const fallbackFirstLineAgents = [
    {
      drug: "Amikacin",
      organism: "E. coli",
      rate: 12,
    },
    {
      drug: "Meropenem",
      organism: "K. pneumoniae",
      rate: 16,
    },
    {
      drug: "Amikacin",
      organism: "P. aeruginosa",
      rate: 18,
    },
    {
      drug: "Meropenem",
      organism: "S. aureus",
      rate: 11,
    },
  ];

  const heatmapData = apiData?.heatmapData?.length ? apiData.heatmapData : fallbackHeatmapData;
  const drugs = apiData?.drugs?.length ? apiData.drugs : fallbackDrugs;
  const resistanceChart = apiData?.resistanceChart || fallbackResistanceChart;
  const firstLineAgents = apiData?.firstLineAgents || fallbackFirstLineAgents;

  function getReportResistanceRate(organism, drug) {
    const row = heatmapData.find((item) => item.organism === organism);
    const exactRate = row?.drugs?.[drug];
    if (Number.isFinite(Number(exactRate))) return Number(exactRate);
    const chartRate = resistanceChart.find((item) => item.name === drug)?.rate;
    return Number.isFinite(Number(chartRate)) ? Number(chartRate) : null;
  }

  const computedResistanceRate = getReportResistanceRate(reportForm.organism, reportForm.drug);

  useEffect(() => {
    setReportForm((current) => ({
      ...current,
      resistanceRate: computedResistanceRate === null ? "" : String(computedResistanceRate),
    }));
  }, [reportForm.organism, reportForm.drug, computedResistanceRate]);

  /* =====================================================
     RESISTANCE CLASSIFICATION
  ===================================================== */

  function getResistanceClass(rate) {

    if (rate > 50) {
      return "high";
    }

    if (rate >= 20) {
      return "moderate";
    }

    return "low";
  }

  function getResistanceLabel(rate) {

    if (rate > 50) {
      return "HIGH RESISTANCE";
    }

    if (rate >= 20) {
      return "MODERATE";
    }

    return "SUSCEPTIBLE";
  }

  return (

    <div className="dashboard-page">

      {/* =================================================
          NAVIGATION
      ================================================= */}

      <header className="dashboard-nav">

        <div
          className="clickable-logo"
          onClick={onBack}
        >
          <Logo />
        </div>

        <div className="dashboard-nav-right">

          <div className="data-source">
            <span className="source-dot"></span>
            {apiData?.isLive && !apiError ? "SUPABASE CONNECTED" : "DEMO DATA"}
          </div>

          {profile?.amr_id && <div className="amr-id-badge" onClick={onViewProfile} title="View profile">{profile.amr_id}</div>}

          <button
            className="back-button"
            onClick={onViewProfile}
          >
            My Profile
          </button>

          <button
            className="back-button"
            onClick={onPredict}
          >
            Predict profile
          </button>

          <button
            className="back-button"
            onClick={onBack}
          >
            ← Back
          </button>

        </div>

      </header>

      {/* =================================================
          DASHBOARD CONTENT
      ================================================= */}

      <main className="dashboard-content">

        {/* HEADER */}

        <div className="dashboard-heading">

          <div>

            <div className="eyebrow">
              AMR SHIELD • {roleName.toUpperCase()} PORTAL
            </div>

            <h1>
              Resistance Intelligence
            </h1>

            <p>
              Hospital antimicrobial resistance surveillance
              and current-quarter resistance patterns.
            </p>

          </div>

          <div className="data-badge">
            <span>●</span>
            CURRENT QUARTER
          </div>

        </div>

        <section className="drug-database-panel">
          <div className="section-header">
            <div>
              <div className="card-label">PUBLIC AMR REFERENCE</div>
              <h2>Search the drug database</h2>
            </div>
            <div className="report-count">LIVE SUPABASE SEARCH</div>
          </div>

          <form className="drug-search-form" onSubmit={searchDrugs}>
            <input
              value={drugSearch}
              onChange={(event) => setDrugSearch(event.target.value)}
              placeholder="Search by drug name, e.g. Amikacin"
              aria-label="Search drug database"
            />
            <button type="submit" disabled={isSearchingDrugs}>
              {isSearchingDrugs ? "Searching..." : "Search drugs"}
            </button>
          </form>

          {drugMessage && <p className="report-message">{drugMessage}</p>}

          {drugResults.length > 0 && (
            <div className="drug-results">
              {drugResults.map((drug) => (
                <article className="drug-result" key={drug.id}>
                  <div>
                    <strong>{drug.name}</strong>
                    <span>{drug.generic_name || "Generic name unavailable"} · {drug.drug_class || "Class unavailable"}</span>
                    <p>{drug.description || "No description available."}</p>
                    <dl className="drug-safety-details">
                      <div><dt>Contraindications</dt><dd>{drug.contraindications || defaultDrugMetadata.contraindications}</dd></div>
                      <div><dt>Interactions</dt><dd>{drug.interactions || defaultDrugMetadata.interactions}</dd></div>
                      <div><dt>Common side effects</dt><dd>{drug.side_effects || defaultDrugMetadata.side_effects}</dd></div>
                    </dl>
                  </div>
                  {drug.source_url && <a href={drug.source_url} target="_blank" rel="noreferrer">Source: {drug.source || "DailyMed"}</a>}
                </article>
              ))}
            </div>
          )}
        </section>

        {role === "patient" && <PatientInquiryPanel onPredict={onPredict} />}
        <PatientAIAgent role={role} />

        <section className="reports-panel">

          <div className="section-header">
            <div>
              <div className="card-label">CLOUD REPORT STORAGE</div>
              <h2>Save a resistance report</h2>
            </div>
            <div className="report-count">{reports.length} SAVED</div>
          </div>

          <form className="report-form" onSubmit={saveReport}>
            <input
              required
              value={reportForm.title}
              onChange={(event) => setReportForm({ ...reportForm, title: event.target.value })}
              placeholder="Report title"
            />
            <select
              value={reportForm.organism}
              onChange={(event) => setReportForm({ ...reportForm, organism: event.target.value })}
            >
              {heatmapData.map((row) => <option key={row.organism}>{row.organism}</option>)}
            </select>
            <select
              value={reportForm.drug}
              onChange={(event) => setReportForm({ ...reportForm, drug: event.target.value })}
            >
              {drugs.map((drug) => <option key={drug}>{drug}</option>)}
            </select>
            <div className="computed-rate" aria-live="polite">
              Resistance rate:
              <input
                type="number"
                min="0"
                max="100"
                value={reportForm.resistanceRate}
                onChange={(event) => setReportForm({ ...reportForm, resistanceRate: event.target.value })}
                placeholder="Auto-filled from data"
                aria-label="Resistance rate percentage"
              />
            </div>
            <button type="submit">Save report <span>→</span></button>
          </form>

          {reportMessage && <p className="report-message">{reportMessage}</p>}

          {reports.length > 0 && (
            <div className="saved-reports">
              {reports.map((report) => (
                <div className="saved-report" key={report.id}>
                  <div>
                    <strong>{report.title}</strong>
                    <span>{report.organism} · {report.drug} · {report.resistance_rate}%</span>
                  </div>
                  <button type="button" onClick={() => deleteReport(report.id)}>Delete</button>
                </div>
              ))}
            </div>
          )}

        </section>

        {/* =================================================
            TOP CARDS
        ================================================= */}

        <div className="top-cards">

          {/* MOST RESISTANT STRAIN */}

          <div className="resistant-card">

            <div className="card-label">
              MOST RESISTANT STRAIN IDENTIFIED
            </div>

            <div className="organism-icon">
              🦠
            </div>

            <h2>
              Acinetobacter baumannii
            </h2>

            <p>
              Highest overall resistance observed
              across monitored antimicrobial agents.
            </p>

            <div className="big-number">
              81%
            </div>

            <div className="resistance-tag high-tag">
              HIGH RESISTANCE
            </div>

          </div>

          {/* HOSPITAL RESISTANCE INDEX */}

          <div className="index-card">

            <div className="card-label">
              OVERALL HOSPITAL RESISTANCE INDEX
            </div>

            <div className="index-number">
              62.4
            </div>

            <p className="index-description">
              Composite resistance indicator based on
              monitored isolates and antimicrobial agents.
            </p>

            <div className="index-scale">

              <div className="scale-track">

                <div
                  className="scale-marker"
                  style={{ left: "62%" }}
                ></div>

              </div>

              <div className="scale-labels">

                <span>
                  LOW
                </span>

                <span>
                  MODERATE
                </span>

                <span>
                  HIGH
                </span>

              </div>

            </div>

            <div className="index-note">

              <span>i</span>

              Index calculated from current-quarter
              surveillance data.

            </div>

          </div>

        </div>

        {/* =================================================
            DRUG × ORGANISM HEATMAP
        ================================================= */}

        <section className="dashboard-section">

          <div className="section-header">

            <div>

              <div className="card-label">
                RESISTANCE MATRIX
              </div>

              <h2>
                Drug × Organism Resistance
              </h2>

              <p className="section-description">
                Resistance rate (%) by bacterial organism
                and antimicrobial agent.
              </p>

            </div>

            <div className="legend">

              <span>
                <i className="legend-dot green"></i>
                &lt;20% Susceptible
              </span>

              <span>
                <i className="legend-dot yellow"></i>
                20–50% Moderate
              </span>

              <span>
                <i className="legend-dot red"></i>
                &gt;50% High
              </span>

            </div>

          </div>

          <div className="heatmap-wrapper">

            <div className="heatmap" style={{ gridTemplateColumns: `1.6fr repeat(${drugs.length}, 1fr)` }}>

              {/* HEADER */}

              <div className="heat-header organism-header">
                BACTERIA
              </div>

              {drugs.map((drug) => (

                <div
                  className="heat-header"
                  key={drug}
                >
                  {drug}
                </div>

              ))}

              {/* ROWS */}

              {heatmapData.map((row) => (

                <React.Fragment key={row.organism}>

                  <div className="organism-name">
                    {row.organism}
                  </div>

                  {drugs.map((drug) => {

                    const rate = row.drugs[drug];

                    const resistanceClass =
                      getResistanceClass(rate);

                    return (

                      <div
                        key={`${row.organism}-${drug}`}
                        className={`heat-cell ${resistanceClass}`}
                      >

                        {Number.isFinite(Number(rate)) ? `${Number(rate)}%` : "—"}

                        <div className="tooltip">

                          <strong>
                            {row.organism}
                          </strong>

                          <span>
                            {drug}
                          </span>

                          <small>
                            Resistance rate: {Number.isFinite(Number(rate)) ? `${Number(rate)}%` : "No data"}
                            <br />
                            Status: {Number.isFinite(Number(rate)) ? getResistanceLabel(Number(rate)) : "Unavailable"}
                          </small>

                        </div>

                      </div>

                    );

                  })}

                </React.Fragment>

              ))}

            </div>

          </div>

          <div className="heatmap-helper">
            Hover over any cell to view the exact resistance
            rate and susceptibility classification.
          </div>

        </section>

        {/* =================================================
            BACTERIA VS DRUG CHART
        ================================================= */}

        <section className="dashboard-section">

          <div className="section-header">

            <div>

              <div className="card-label">
                ANTIMICROBIAL PERFORMANCE
              </div>

              <h2>
                Bacteria vs Drug Resistance Rate
              </h2>

              <p className="section-description">
                Overall resistance observed for selected
                antimicrobial agents.
              </p>

            </div>

          </div>

          <div className="chart-card">

            <div className="chart-y-label">
              RESISTANCE RATE (%)
            </div>

            <div className="bar-chart">

              <div
                className="chart-grid-line"
                style={{ top: "0%" }}
              >
                <span>100</span>
              </div>

              <div
                className="chart-grid-line"
                style={{ top: "25%" }}
              >
                <span>75</span>
              </div>

              <div
                className="chart-grid-line"
                style={{ top: "50%" }}
              >
                <span>50</span>
              </div>

              <div
                className="chart-grid-line"
                style={{ top: "75%" }}
              >
                <span>25</span>
              </div>

              <div
                className="chart-grid-line"
                style={{ top: "100%" }}
              >
                <span>0</span>
              </div>

              <div className="bars">

                {resistanceChart.map((item) => {

                  const barClass =
                    getResistanceClass(item.rate);

                  return (

                    <div
                      className="bar-group"
                      key={item.name}
                    >

                      <div className="bar-value">
                        {item.rate}%
                      </div>

                      <div
                        className={`bar ${barClass}`}
                        style={{
                          height: `${item.rate}%`,
                        }}
                      ></div>

                      <div className="bar-label">
                        {item.name}
                      </div>

                    </div>

                  );

                })}

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            FIRST-LINE AGENTS
        ================================================= */}

        <section className="dashboard-section">

          <div className="section-header">

            <div>

              <div className="card-label">
                CLINICAL SURVEILLANCE
              </div>

              <h2>
                Resistance in First-Line Agents
              </h2>

              <p className="section-description">
                Isolate resistance rate (%) from the
                current-quarter antibiogram.
              </p>

            </div>

            <div className="quarter-badge">

              DATA PERIOD

              <strong>
                Q3 2026
              </strong>

            </div>

          </div>

          <div className="antibiogram">

            <div className="table-row table-head">

              <div>
                FIRST-LINE AGENT
              </div>

              <div>
                ORGANISM
              </div>

              <div>
                RESISTANCE RATE
              </div>

              <div>
                CLASSIFICATION
              </div>

            </div>

            {firstLineAgents.map((item) => {

              const status =
                getResistanceClass(item.rate);

              return (

                <div
                  className="table-row"
                  key={`${item.drug}-${item.organism}`}
                >

                  <div className="drug-name">
                    {item.drug}
                  </div>

                  <div>
                    {item.organism}
                  </div>

                  <div className="rate">
                    {item.rate}%
                  </div>

                  <div>

                    <span
                      className={`table-status ${status}`}
                    >
                      {getResistanceLabel(item.rate)}
                    </span>

                  </div>

                </div>

              );

            })}

          </div>

        </section>

        {/* =================================================
            FOOTER
        ================================================= */}

        <footer className="dashboard-footer">

          <div>

            <strong>
              AMR SHIELD
            </strong>

            Resistance Intelligence Platform

          </div>

          <div className="footer-warning">

            DEMONSTRATION DATA ONLY
            <br />

            Not intended for clinical decision-making.

          </div>

        </footer>

      </main>

    </div>
  );
}

function PredictionPage({ onBack }) {
  const [inputs, setInputs] = useState({
    illnessSite: "Respiratory",
    temperature: "",
    whiteBloodCells: "",
    onsetTimeline: "",
    symptoms: [],
    symptomNotes: "",
  });
  const [prediction, setPrediction] = useState(null);
  const [predictionMessage, setPredictionMessage] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("amr-prediction-inputs") || "null");
    if (saved) setInputs((current) => ({ ...current, ...saved }));
  }, []);

  const symptomOptions = [
    "Fever or chills",
    "Cough or shortness of breath",
    "Pain or burning while urinating",
    "Wound discharge",
    "Rapid clinical worsening",
    "Recent antibiotic exposure",
  ];

  function updateInput(event) {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  }

  function toggleSymptom(symptom) {
    const symptoms = inputs.symptoms.includes(symptom)
      ? inputs.symptoms.filter((item) => item !== symptom)
      : [...inputs.symptoms, symptom];
    setInputs({ ...inputs, symptoms });
  }

  async function predictProfile(event) {
    event.preventDefault();
    setPredictionMessage("");
    const temperature = Number(inputs.temperature);
    const whiteBloodCells = Number(inputs.whiteBloodCells);
    const rapidOnset = Number(inputs.onsetTimeline) <= 3;
    const highInflammation = temperature >= 39 || whiteBloodCells >= 15000;
    const symptomCount = inputs.symptoms.length;
    const score = highInflammation ? 24 : 10;
    const candidates = [
      { name: "ESBL-producing Enterobacterales phenotype", score: score + (inputs.illnessSite === "Urinary" ? 20 : 6) + (inputs.symptoms.includes("Recent antibiotic exposure") ? 12 : 0) },
      { name: "Carbapenem-resistant Gram-negative phenotype", score: score + (inputs.illnessSite === "Bloodstream" ? 18 : 4) + (rapidOnset ? 10 : 0) },
      { name: "MRSA-compatible resistance phenotype", score: score + (inputs.illnessSite === "Skin and soft tissue" ? 20 : 5) + (inputs.symptoms.includes("Wound discharge") ? 12 : 0) },
    ]
      .map((candidate) => ({ ...candidate, score: Math.min(95, candidate.score + symptomCount * 3) }))
      .sort((first, second) => second.score - first.score);
    const topScore = candidates[0].score;
    const ranked = candidates.map((candidate) => ({ ...candidate, confidence: Math.round((candidate.score / topScore) * Math.min(92, 55 + symptomCount * 4)) }));
    setPrediction({ candidates: ranked, inputs: { ...inputs, temperature, whiteBloodCells } });

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase.from("prediction_runs").insert({
        user_id: user.id,
        illness_site: inputs.illnessSite,
        temperature,
        white_blood_cells: whiteBloodCells,
        onset_days: Number(inputs.onsetTimeline),
        symptoms: inputs.symptoms,
        symptom_notes: inputs.symptomNotes,
        top_candidate: ranked[0].name,
        confidence: ranked[0].confidence,
      });
      if (error) setPredictionMessage("Prediction generated, but cloud audit storage is not ready yet.");
    }
  }

  return (
    <div className="dashboard-page prediction-page">
      <header className="dashboard-nav">
        <div className="clickable-logo" onClick={onBack}><Logo /></div>
        <button className="back-button" onClick={onBack}>← Dashboard</button>
      </header>

      <main className="prediction-container">
        <div className="eyebrow">AMR SHIELD • PROVISIONAL SCREENING</div>
        <h1>Resistance profile preview</h1>
        <p className="prediction-intro">
          Enter immediate symptoms and basic parameters to generate a research prototype estimate before laboratory confirmation.
        </p>

        <form className="prediction-form" onSubmit={predictProfile}>
          <label>Site of illness
            <select name="illnessSite" value={inputs.illnessSite} onChange={updateInput}>
              <option>Respiratory</option>
              <option>Urinary</option>
              <option>Bloodstream</option>
              <option>Skin and soft tissue</option>
              <option>Gastrointestinal</option>
            </select>
          </label>
          <label>Body temperature (°C)
            <input required name="temperature" type="number" min="30" max="45" step="0.1" value={inputs.temperature} onChange={updateInput} placeholder="37.0" />
          </label>
          <label>White blood cells (cells/µL)
            <input required name="whiteBloodCells" type="number" min="0" value={inputs.whiteBloodCells} onChange={updateInput} placeholder="9000" />
          </label>
          <label>Onset timeline (days)
            <input required name="onsetTimeline" type="number" min="0" value={inputs.onsetTimeline} onChange={updateInput} placeholder="3" />
          </label>
          <fieldset className="symptoms-field">
            <legend>Immediate symptoms</legend>
            <div className="symptom-options">
              {symptomOptions.map((symptom) => (
                <label className="symptom-option" key={symptom}>
                  <input type="checkbox" checked={inputs.symptoms.includes(symptom)} onChange={() => toggleSymptom(symptom)} />
                  {symptom}
                </label>
              ))}
            </div>
            <textarea name="symptomNotes" value={inputs.symptomNotes} onChange={updateInput} placeholder="Additional observations (optional)" />
          </fieldset>
          <button className="prediction-submit" type="submit">Generate provisional profile <span>→</span></button>
        </form>

        {prediction && (
          <section className="prediction-result">
            <div className="card-label">RANKED RESISTANCE PHENOTYPE CANDIDATES</div>
            <div className="prediction-chart-layout">
              <div className="candidate-bars" role="list" aria-label="Candidate confidence percentages">
                {prediction.candidates.map((candidate, index) => (
                  <div className="candidate-bar-row" role="listitem" key={candidate.name}>
                    <div className="candidate-bar-heading">
                      <strong>{index + 1}. {candidate.name}</strong>
                      <span>{candidate.confidence}%</span>
                    </div>
                    <div className="candidate-bar-track">
                      <div className={`candidate-bar candidate-bar-${index}`} style={{ width: `${candidate.confidence}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="candidate-chart" aria-label="Candidate confidence bar chart">
                {prediction.candidates.map((candidate, index) => (
                  <div className="candidate-chart-column" key={candidate.name}>
                    <div className="candidate-chart-bar-wrap">
                      <div className={`candidate-chart-bar candidate-chart-bar-${index}`} style={{ height: `${candidate.confidence}%` }}>
                        <span className="candidate-chart-value">{candidate.confidence}%</span>
                      </div>
                    </div>
                    <div className="candidate-chart-label">{candidate.name.split(" ").slice(0, 3).join(" ")}</div>
                  </div>
                ))}
              </div>
            </div>
            <p>Laboratory culture, susceptibility testing, and qualified clinical review are required before any treatment decision.</p>
          </section>
        )}
        {predictionMessage && <p className="prediction-disclaimer">{predictionMessage}</p>}
        <p className="prediction-disclaimer">This is a transparent phenotype scoring aid, not a validated diagnostic model. It does not identify an exact mutation, diagnose infection, or replace laboratory results.</p>
      </main>
    </div>
  );
}

function DoctorWorkspace({ onBack, onViewProfile }) {
  const [patients, setPatients] = useState([
    {
      id: "AMR-7K4P2X91QF", name: "Aarav Mehta", age: 42, sex: "Male", bloodGroup: "B+", phone: "+91 98XXXX2410",
      symptoms: "Fever, dysuria, flank pain", allergies: "Penicillin", comorbidities: "Type 2 diabetes",
      antibiotics: "Ceftriaxone (Jan 2026), Ciprofloxacin (Oct 2025)", hospitalized: "Admitted for UTI sepsis, Jan 2026 · 4 days",
      blood: "WBC 14,200 /uL · CRP 86 mg/L", urine: "Leukocytes 3+ · Nitrite positive", culture: "E. coli · 10⁵ CFU/mL",
      sensitivity: "Sensitive: Amikacin, Meropenem · Resistant: Ciprofloxacin", prescription: "Amikacin 15 mg/kg IV · review in 48h",
    },
    {
      id: "AMR-2M8D5R17LA", name: "Nisha Sharma", age: 29, sex: "Female", bloodGroup: "O+", phone: "+91 97XXXX8821",
      symptoms: "Productive cough, breathlessness", allergies: "No known allergies", comorbidities: "Asthma",
      antibiotics: "Azithromycin (May 2026)", hospitalized: "No previous hospitalization recorded",
      blood: "WBC 11,100 /uL · CRP 42 mg/L", urine: "Within normal limits", culture: "Pending sample",
      sensitivity: "Awaiting culture and AST", prescription: "Hold antibiotic pending culture review",
    },
  ]);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(patients[0].id);
  const [activeTab, setActiveTab] = useState("overview");
  const [plan, setPlan] = useState("");
  const [assessment, setAssessment] = useState({ diagnosis: "", differential: "", rationale: "", certainty: "Moderate", disposition: "Outpatient follow-up" });
  const [saveMessage, setSaveMessage] = useState("");
  const [evidenceReviewed, setEvidenceReviewed] = useState(false);
  const [inquiries, setInquiries] = useState([]);
  const [inquiryError, setInquiryError] = useState("");
  const [refreshingInquiries, setRefreshingInquiries] = useState(false);
  const [addingPatient, setAddingPatient] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: "", age: "", sex: "Male", bloodGroup: "", phone: "", symptoms: "", allergies: "", comorbidities: "" });

  async function loadInquiries() {
    setRefreshingInquiries(true);
    setInquiryError("");
    try {
      const { data, error } = await supabase.from("patient_inquiries").select("*").order("created_at", { ascending: false }).limit(10);
      if (error) throw error;
      setInquiries(data || []);
    } catch (err) {
      setInquiryError(err.message || "Failed to load inquiries.");
      setInquiries([]);
    } finally {
      setRefreshingInquiries(false);
    }
  }

  useEffect(() => {
    loadInquiries();
  }, []);

  function generateAmrId() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let id = "AMR-";
    for (let i = 0; i < 10; i++) id += chars[Math.floor(Math.random() * chars.length)];
    return id;
  }

  function startAddPatient() {
    setNewPatient({ name: "", age: "", sex: "Male", bloodGroup: "", phone: "", symptoms: "", allergies: "", comorbidities: "" });
    setAddingPatient(true);
  }

  function cancelAddPatient() {
    setAddingPatient(false);
    setNewPatient({ name: "", age: "", sex: "Male", bloodGroup: "", phone: "", symptoms: "", allergies: "", comorbidities: "" });
  }

  function submitNewPatient(event) {
    event.preventDefault();
    const created = {
      id: generateAmrId(),
      name: newPatient.name || "Unnamed patient",
      age: Number(newPatient.age) || 0,
      sex: newPatient.sex,
      bloodGroup: newPatient.bloodGroup || "Unknown",
      phone: newPatient.phone || "Not provided",
      symptoms: newPatient.symptoms || "Not documented",
      allergies: newPatient.allergies || "No known allergies",
      comorbidities: newPatient.comorbidities || "None",
      antibiotics: "Not documented",
      hospitalized: "No previous hospitalization recorded",
      blood: "Pending",
      urine: "Pending",
      culture: "Pending sample",
      sensitivity: "Awaiting culture and AST",
      prescription: "Hold antibiotic pending culture review",
    };
    setPatients((current) => [...current, created]);
    setSelectedId(created.id);
    setAddingPatient(false);
    setNewPatient({ name: "", age: "", sex: "Male", bloodGroup: "", phone: "", symptoms: "", allergies: "", comorbidities: "" });
  }

  function openInquiry(inquiry) {
    const inquiryPatientId = `INQ-${inquiry.id}`;
    const inquiryPatient = {
      id: inquiryPatientId,
      name: `Patient inquiry ${String(inquiry.id).slice(0, 8)}`,
      age: 0,
      sex: "Not provided",
      bloodGroup: "Unknown",
      phone: "Not provided",
      symptoms: inquiry.symptoms || "Not documented",
      allergies: inquiry.allergies || "No known allergies",
      comorbidities: inquiry.comorbidities || "None",
      antibiotics: inquiry.previous_antibiotics || "Not documented",
      hospitalized: "Not documented",
      blood: inquiry.temperature ? `Temperature ${inquiry.temperature} °C` : "Not documented",
      urine: "Not documented",
      culture: "Pending sample",
      sensitivity: "Awaiting culture and AST",
      prescription: "Hold antibiotic pending clinical review",
    };

    setPatients((current) => current.some((item) => item.id === inquiryPatientId)
      ? current
      : [...current, inquiryPatient]);
    setSelectedId(inquiryPatientId);
    setActiveTab("overview");
  }

  const patient = patients.find((item) => item.id === selectedId) || patients[0];
  const filteredPatients = patients.filter((item) => `${item.name} ${item.id}`.toLowerCase().includes(query.toLowerCase()));
  const predictionScore = patient.name === "Aarav Mehta" ? 78 : 41;
  const recommendation = patient.name === "Aarav Mehta" ? "Amikacin" : "Await culture and AST";
  const recommendationReasons = patient.name === "Aarav Mehta"
    ? ["Urine culture identifies E. coli", "AST reports Amikacin sensitive", "Ciprofloxacin resistance recorded", "Penicillin allergy documented"]
    : ["Culture result is still pending", "No sensitivity evidence available", "Avoid empiric escalation without review"];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(`amr-clinical-${selectedId}`) || "null");
    setAssessment(saved?.assessment || { diagnosis: "", differential: "", rationale: "", certainty: "Moderate", disposition: "Outpatient follow-up" });
    setPlan(saved?.plan || "");
    setSaveMessage(saved ? "Saved assessment loaded" : "");
    setEvidenceReviewed(false);
  }, [selectedId]);

  useEffect(() => {
    supabase.from("patient_inquiries").select("*").order("created_at", { ascending: false }).limit(10)
      .then(({ data }) => setInquiries(data || []))
      .catch(() => setInquiries([]));
  }, []);

  async function saveClinicalRecord() {
    localStorage.setItem(`amr-clinical-${patient.id}`, JSON.stringify({ assessment, plan, savedAt: new Date().toISOString() }));
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setSaveMessage(`Saved locally at ${new Date().toLocaleTimeString()}`);
      return;
    }
    const { error } = await supabase.from("clinical_assessments").upsert({
      doctor_id: user.id,
      patient_key: patient.id,
      patient_name: patient.name,
      diagnosis: assessment.diagnosis,
      differential: assessment.differential,
      rationale: assessment.rationale,
      certainty: assessment.certainty,
      disposition: assessment.disposition,
      treatment_plan: plan,
    }, { onConflict: "doctor_id,patient_key" });
    setSaveMessage(error ? "Saved locally; cloud table needs setup" : `Saved to Supabase at ${new Date().toLocaleTimeString()}`);
  }

  const detailSections = {
    overview: [
      ["Current symptoms", patient.symptoms], ["Allergies", patient.allergies], ["Comorbidities", patient.comorbidities],
      ["Recent / previous antibiotics", patient.antibiotics], ["Hospitalization history", patient.hospitalized],
    ],
    investigations: [["Blood report", patient.blood], ["Urine report", patient.urine], ["Blood culture", patient.culture], ["Urine culture", patient.culture], ["Antibiotic sensitivity test", patient.sensitivity]],
    treatment: [["Prescription", patient.prescription], ["Clinical plan", plan || "Add a plan and review it with the care team."], ["Safety check", "Verify renal function, allergy status, dose and culture results before prescribing."]],
    assessment: [["ML differential", patient.name === "Aarav Mehta" ? "Complicated UTI / pyelonephritis · resistant Gram-negative phenotype" : "Community-acquired respiratory infection · phenotype uncertain"], ["Doctor's diagnosis", assessment.diagnosis || "Not recorded yet"], ["Clinical rationale", assessment.rationale || "Record the findings that support your assessment."], ["Certainty", assessment.certainty], ["Disposition", assessment.disposition]],
  };

  return <div className="dashboard-page doctor-workspace">
    <header className="dashboard-nav"><div className="clickable-logo" onClick={onBack}><Logo /></div><div className="dashboard-nav-right"><span className="data-source"><span className="source-dot" /> CLINICAL WORKSPACE</span><button className="back-button" onClick={onViewProfile}>My Profile</button><button className="back-button" onClick={onBack}>← Back</button></div></header>
    <main className="doctor-content">
      <div className="dashboard-heading"><div><div className="eyebrow">AMR SHIELD • DOCTOR PORTAL</div><h1>Patient clinical record</h1><p>Review the patient's longitudinal antimicrobial history before creating a treatment plan.</p></div><div className="data-badge"><span>●</span> {patients.length} ACTIVE RECORDS</div></div>
      {inquiryError && <p className="report-message" style="color:#b85c49;">{inquiryError}</p>}
      <section className="patient-inquiry-feed">
        <div className="section-header">
          <div>
            <div className="card-label">PATIENT-SHARED DATA</div>
            <h2>New patient inquiries</h2>
          </div>
          <div className="report-count">
            {inquiries.length} RECEIVED
            <button className="text-button" onClick={loadInquiries} disabled={refreshingInquiries} style={{ marginLeft: 10 }}>
              {refreshingInquiries ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>
        {inquiries.length === 0 && !inquiryError && <p className="report-message">No inquiries received yet. Ask patients to submit from their dashboard while signed in.</p>}
        {inquiries.map((inquiry) => <article className="inquiry-item" key={inquiry.id}><div><strong>{inquiry.illness_site} concern</strong><span>{inquiry.symptoms}</span><small>Submitted {new Date(inquiry.created_at).toLocaleString()}</small></div><div className="inquiry-actions"><button className="back-button" onClick={() => openInquiry(inquiry)}>Open patient record</button><button className="back-button" onClick={() => setPlan(`Patient inquiry: ${inquiry.symptoms}. Previous antibiotics: ${inquiry.previous_antibiotics || "Not provided"}. Allergies: ${inquiry.allergies || "Not provided"}.`)}>Review in plan</button></div></article>)}
      </section>
        <div className="doctor-layout">
          <aside className="patient-sidebar">
            <div className="card-label">PATIENT DIRECTORY</div>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name or unique ID" aria-label="Search patients" />
            {filteredPatients.map((item) => <button className={`patient-row ${item.id === patient.id ? "selected" : ""}`} key={item.id} onClick={() => setSelectedId(item.id)}><strong>{item.name}</strong><span>{item.id}</span><small>{item.symptoms}</small></button>)}
            {addingPatient ? (
              <form className="add-patient-form" onSubmit={submitNewPatient}>
                <input required value={newPatient.name} onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })} placeholder="Full name" />
                <input required type="number" min="0" max="150" value={newPatient.age} onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })} placeholder="Age" />
                <select value={newPatient.sex} onChange={(e) => setNewPatient({ ...newPatient, sex: e.target.value })}><option>Male</option><option>Female</option><option>Other</option></select>
                <input value={newPatient.bloodGroup} onChange={(e) => setNewPatient({ ...newPatient, bloodGroup: e.target.value })} placeholder="Blood group" />
                <input value={newPatient.phone} onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })} placeholder="Phone" />
                <input value={newPatient.symptoms} onChange={(e) => setNewPatient({ ...newPatient, symptoms: e.target.value })} placeholder="Symptoms" />
                <input value={newPatient.allergies} onChange={(e) => setNewPatient({ ...newPatient, allergies: e.target.value })} placeholder="Allergies" />
                <input value={newPatient.comorbidities} onChange={(e) => setNewPatient({ ...newPatient, comorbidities: e.target.value })} placeholder="Comorbidities" />
                <div className="add-patient-actions">
                  <button className="primary-button" type="submit">Save <span>→</span></button>
                  <button className="text-button" type="button" onClick={cancelAddPatient}>Cancel</button>
                </div>
              </form>
            ) : (
              <button className="add-patient-button" onClick={startAddPatient}>+ Add patient</button>
            )}
          </aside>
        <section className="patient-record"><div className="patient-identity"><div className="patient-avatar">{patient.name.split(" ").map((part) => part[0]).join("")}</div><div><div className="card-label">UNIQUE PATIENT ID</div><h2>{patient.name}</h2><p>{patient.id} · {patient.age} years · {patient.sex} · Blood group {patient.bloodGroup}</p><span className="record-phone">{patient.phone}</span></div><div className="patient-alert"><strong>{patient.allergies === "Penicillin" ? "ALLERGY ALERT" : "NO ALLERGY ALERT"}</strong><span>{patient.allergies}</span></div></div>
          <nav className="record-tabs">{[["overview", "Patient history"], ["investigations", "Reports & cultures"], ["treatment", "Symptoms & treatment plan"], ["assessment", "Doctor assessment"]].map(([value, label]) => <button className={activeTab === value ? "active" : ""} key={value} onClick={() => setActiveTab(value)}>{label}</button>)}</nav>
          <div className="clinical-grid">{detailSections[activeTab].map(([label, value]) => <article className="clinical-item" key={label}><div className="card-label">{label}</div><p>{value}</p></article>)}</div>
          {activeTab === "treatment" && <textarea className="plan-input" value={plan} onChange={(event) => setPlan(event.target.value)} placeholder="Add treatment plan notes, follow-up timing or escalation criteria" />}
          {activeTab === "assessment" && <div className="assessment-form"><label>Working diagnosis<input value={assessment.diagnosis} onChange={(event) => setAssessment({ ...assessment, diagnosis: event.target.value })} placeholder="e.g. Complicated urinary tract infection" /></label><label>Differential diagnoses<input value={assessment.differential} onChange={(event) => setAssessment({ ...assessment, differential: event.target.value })} placeholder="Other diagnoses being considered" /></label><label>Clinical rationale<textarea value={assessment.rationale} onChange={(event) => setAssessment({ ...assessment, rationale: event.target.value })} placeholder="Explain symptoms, examination and laboratory evidence" /></label><label>Diagnostic certainty<select value={assessment.certainty} onChange={(event) => setAssessment({ ...assessment, certainty: event.target.value })}><option>High</option><option>Moderate</option><option>Low</option><option>Awaiting investigations</option></select></label><label>Disposition<select value={assessment.disposition} onChange={(event) => setAssessment({ ...assessment, disposition: event.target.value })}><option>Outpatient follow-up</option><option>Admit for monitoring</option><option>Urgent referral</option><option>Review after culture and AST</option></select></label></div>}
          <div className="prediction-signal"><div><div className="card-label">PROTOTYPE ML PRESCRIPTION SIGNAL</div><h3>{predictionScore}% pattern match</h3><p>Suggested pathway: <strong>{recommendation}</strong>. This signal supports review; it does not prescribe.</p><div className="recommendation-reasons">{recommendationReasons.map((reason) => <span key={reason}>✓ {reason}</span>)}</div></div><div className="signal-meter"><i style={{ width: `${predictionScore}%` }} /><span>{predictionScore >= 70 ? "Review urgently" : "Await evidence"}</span></div></div>
          <div className="clinical-safety"><strong>Clinical safety gate</strong><span>Confirm allergy status, renal function, culture and AST before final prescription.</span><label><input type="checkbox" checked={evidenceReviewed} onChange={(event) => setEvidenceReviewed(event.target.checked)} /> I reviewed the evidence and will apply clinical judgement</label></div>
          <div className="record-actions"><button className="primary-button" disabled={!evidenceReviewed} onClick={saveClinicalRecord}>Save clinical assessment <span>→</span></button><span>ML suggestions inform review; the doctor owns the final clinical assessment.</span>{saveMessage && <strong className="save-message">{saveMessage}</strong>}</div>
        </section>
      </div>
    </main>
  </div>;
}

function ProfilePage({ role, onBack }) {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ full_name: "", date_of_birth: "", contact_number: "", allergies: "", comorbidities: "" });
  const [message, setMessage] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [uploadingPicture, setUploadingPicture] = useState(false);
  const [picturePreview, setPicturePreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState("");
  const [loadAttempt, setLoadAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function loadProfile() {
      setLoading(true);
      setProfileError("");
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (!user) throw new Error("Your session has expired. Please sign in again.");

        const { data, error: profileQueryError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();
        if (profileQueryError) throw profileQueryError;

        let loadedProfile = data;
        if (!loadedProfile) {
          const meta = user.user_metadata || {};
          const { data: created, error: profileInsertError } = await supabase
            .from("profiles")
            .insert({
              id: user.id,
              full_name: meta.name || user.email || "AMR SHIELD User",
              date_of_birth: meta.date_of_birth || "1970-01-01",
              contact_number: meta.contact_number || "Not provided",
              aadhaar_last4: /^\d{4}$/.test(meta.aadhaar_last4 || "") ? meta.aadhaar_last4 : "0000",
              aadhaar_hash: meta.aadhaar_hash || await hashAadhaar(`${user.id}:${user.email || ""}`),
              allergies: meta.allergies || "",
              comorbidities: meta.comorbidities || "",
              role: meta.role || role || "patient",
            })
            .select("*")
            .single();
          if (profileInsertError) throw profileInsertError;
          loadedProfile = created;
        }

        if (!cancelled) {
          setProfile(loadedProfile);
          setPicturePreview(loadedProfile.profile_picture_url || "");
          setForm({
            full_name: loadedProfile.full_name || "",
            date_of_birth: loadedProfile.date_of_birth || "",
            contact_number: loadedProfile.contact_number || "",
            allergies: loadedProfile.allergies || "",
            comorbidities: loadedProfile.comorbidities || "",
          });
        }
      } catch (error) {
        if (!cancelled) setProfileError(error.message || "Unable to load your profile.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProfile();
    return () => { cancelled = true; };
  }, [loadAttempt, role]);

  useEffect(() => () => {
    if (picturePreview.startsWith("blob:")) URL.revokeObjectURL(picturePreview);
  }, [picturePreview]);

  async function uploadProfilePicture(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setUploadError("");
    if (!file.type.startsWith("image/")) {
      setUploadError("Upload failed: please choose an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Upload failed: profile pictures must be 5 MB or smaller.");
      return;
    }

    const localPreview = URL.createObjectURL(file);
    setPicturePreview(localPreview);
    setUploadingPicture(true);
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error("Your session has expired. Please sign in again.");
      const extension = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
      const objectPath = `${user.id}/profile-picture.${extension}`;
      const { error: storageError } = await supabase.storage
        .from("profile-pictures")
        .upload(objectPath, file, { upsert: true, contentType: file.type, cacheControl: "3600" });
      if (storageError) throw storageError;

      const { data: { publicUrl } } = supabase.storage.from("profile-pictures").getPublicUrl(objectPath);
      const pictureUrl = `${publicUrl}?v=${Date.now()}`;
      const { error: profilePictureError } = await supabase
        .from("profiles")
        .update({ profile_picture_url: pictureUrl })
        .eq("id", user.id);
      if (profilePictureError) throw profilePictureError;

      setProfile((current) => ({ ...current, profile_picture_url: pictureUrl }));
      setPicturePreview(pictureUrl);
      setMessage("Profile picture uploaded successfully.");
    } catch (error) {
      setPicturePreview(profile?.profile_picture_url || "");
      setUploadError(`Profile picture upload failed: ${error.message || "Storage is unavailable."}`);
    } finally {
      setUploadingPicture(false);
    }
  }

  async function updateProfile(event) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setMessage("You must be signed in to update your profile.");
      setSaving(false);
      return;
    }
    const { error } = await supabase.from("profiles").update({
      full_name: form.full_name,
      date_of_birth: form.date_of_birth || null,
      contact_number: form.contact_number,
      allergies: form.allergies,
      comorbidities: form.comorbidities,
    }).eq("id", user.id);
    setMessage(error ? "Update failed. Please try again." : "Profile updated successfully.");
    setSaving(false);
    if (!error) {
      supabase.from("profiles").select("*").eq("id", user.id).maybeSingle().then(({ data }) => {
        if (data) setProfile(data);
      });
    }
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-nav">
        <div className="clickable-logo" onClick={onBack}><Logo /></div>
        <div className="header-actions">
          <span className="system-status"><span className="status-dot"></span> MY PROFILE</span>
        </div>
      </header>
      <main className="dashboard-content">
        <div className="dashboard-heading">
          <div>
            <div className="eyebrow">AMR SHIELD • {role ? role.toUpperCase() : "USER"} PORTAL</div>
            <h1>My Profile</h1>
            <p>View and update your personal and clinical information.</p>
          </div>
        </div>

        {loading && <p>Loading profile...</p>}
        {profileError && (
          <div className="profile-error">
            <p>{profileError}</p>
            <button className="primary-button" type="button" onClick={() => setLoadAttempt((attempt) => attempt + 1)}>Retry</button>
          </div>
        )}
        {profile && !loading && !profileError && (
          <section className="profile-section">
            <div className="profile-card">
              <div className="profile-header">
                <div className="profile-id">
                  <div className="card-label">UNIQUE AMR ID</div>
                  <h2>{profile.amr_id}</h2>
                </div>
                <div className="profile-role">
                  <div className="card-label">ROLE</div>
                  <h2>{profile.role}</h2>
                </div>
              </div>

              <div className="profile-picture-panel">
                <div className="profile-picture-preview">
                  {picturePreview ? <img src={picturePreview} alt={`${profile.full_name} profile`} /> : <span>{profile.full_name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()}</span>}
                </div>
                <div>
                  <div className="card-label">PROFILE PICTURE</div>
                  <p>Use a clear image for your patient or doctor profile.</p>
                  <label className="picture-upload-button">
                    {uploadingPicture ? "Uploading..." : "Choose image"}
                    <input type="file" accept="image/png,image/jpeg,image/webp" onChange={uploadProfilePicture} disabled={uploadingPicture} />
                  </label>
                  <small>PNG, JPG or WebP · maximum 5 MB</small>
                  {uploadError && <strong className="profile-upload-error">{uploadError}</strong>}
                </div>
              </div>

              <form className="profile-form" onSubmit={updateProfile}>
                <label>Full name
                  <input required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
                </label>
                <label>Date of birth
                  <input type="date" value={form.date_of_birth} onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })} />
                </label>
                <label>Contact number
                  <input required value={form.contact_number} onChange={(e) => setForm({ ...form, contact_number: e.target.value })} />
                </label>
                <label>Allergies
                  <input value={form.allergies} onChange={(e) => setForm({ ...form, allergies: e.target.value })} placeholder="e.g. Penicillin, None" />
                </label>
                <label>Comorbidities
                  <input value={form.comorbidities} onChange={(e) => setForm({ ...form, comorbidities: e.target.value })} placeholder="e.g. Diabetes, Asthma, None" />
                </label>

                <div className="profile-actions">
                  <button className="primary-button" type="submit" disabled={saving}>
                    {saving ? "Saving..." : <>Save changes <span>→</span></>}
                  </button>
                  <button className="text-button" type="button" onClick={onBack}>Cancel</button>
                  {message && <strong className="save-message">{message}</strong>}
                </div>
              </form>
            </div>
          </section>
        )}

      </main>
    </div>
  );
}

/* =====================================================
   MAIN APP
===================================================== */

function App() {

  const [page, setPage] = useState("landing");

  const [role, setRole] = useState(null);

  const [restoring, setRestoring] = useState(true);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      if (session?.user) {
        supabase.from("profiles").select("role").eq("id", session.user.id).single()
          .then(({ data }) => {
            if (!mounted) return;
            if (data?.role) {
              setRole(data.role);
              setPage("dashboard");
            }
            setRestoring(false);
          })
          .catch(() => {
            if (!mounted) return;
            setRestoring(false);
          });
      } else {
        setRestoring(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      if (session?.user) {
        supabase.from("profiles").select("role").eq("id", session.user.id).single()
          .then(({ data }) => {
            if (!mounted) return;
            if (data?.role) {
              setRole(data.role);
              setPage("dashboard");
            }
          })
          .catch(() => {
            if (!mounted) return;
            setRole(null);
            setPage("landing");
          });
      } else {
        setRole(null);
        setPage("landing");
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  function selectRole(selectedRole) {

    setRole(selectedRole);

    setPage("auth");
  }

  function goToDashboard() {

    setPage("dashboard");
  }

  function goBackToPortal() {

    setRole(null);

    setPage("portal");
  }

  function goToProfile() {

    setPage("profile");
  }

  return (
    <>
      {!restoring && (
        <>
          {/* PAGE 1 — LANDING */}

          {page === "landing" && (
            <div className="page-enter" key="landing">
              <LandingPage
                onEnter={() =>
                  setPage("portal")
                }
              />
            </div>
          )}

          {/* PAGE 2 — PORTAL */}

          {page === "portal" && (
            <div className="page-enter" key="portal">
              <PortalPage
                onBack={() =>
                  setPage("landing")
                }
                onSelect={selectRole}
              />
            </div>

          )}

          {/* PAGE 3 — AUTH */}

          {page === "auth" && role && (
            <div className="page-enter" key="auth">
              <AuthPage
                role={role}
                onBack={goBackToPortal}
                onContinue={goToDashboard}
              />
            </div>

          )}

          {/* PAGE 4 — RESISTANCE DASHBOARD */}

          {page === "dashboard" && role && (
            <div className="page-enter" key={role}>
              {role === "doctor" ? <DoctorWorkspace onBack={() => setPage("auth")} onViewProfile={goToProfile} /> : <ResistanceDashboard role={role} onPredict={() => setPage("prediction")} onBack={() => setPage("auth")} onViewProfile={goToProfile} />}
            </div>

          )}

          {page === "profile" && role && (
            <div className="page-enter" key="profile">
              <ProfilePage
                role={role}
                onBack={() => setPage("dashboard")}
              />
            </div>

          )}

          {page === "prediction" && role && (
            <div className="page-enter" key="prediction">
              <PredictionPage
                onBack={() => setPage("dashboard")}
              />
            </div>

          )}
        </>
      )}
    </>
  );
}

export default App;