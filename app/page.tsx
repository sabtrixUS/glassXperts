"use client";

import { FormEvent, useEffect, useState } from "react";
import { trackFormLead } from "./tracking";
import { sendLead } from "./form-webhook";

const logo = "https://assets.cdn.filesafe.space/FjfyTuO1vncfCoNQiCIM/media/689cf1c57cb236c888630dd5.png";
const homeUrl = "https://myglassxperts.com/";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

const heroVideos = [
  asset("/assets/hero-bathroom.mp4"),
  asset("/assets/hero-installation.mp4"),
];

const projects = [
  [asset("/assets/les-dillard-buckhead-shower.jpg"), "Frameless Shower Door", "Buckhead"],
  ["https://assets.cdn.filesafe.space/FjfyTuO1vncfCoNQiCIM/media/6a04814560b8c350d3cd7e48.png", "Custom Glass Enclosure", "Alpharetta"],
  ["https://assets.cdn.filesafe.space/FjfyTuO1vncfCoNQiCIM/media/6a048145fa8afa3be0b816a1.png", "Walk-In Shower Glass", "Dunwoody"],
  ["https://assets.cdn.filesafe.space/FjfyTuO1vncfCoNQiCIM/media/6962d731f8a93b439c9fca79.png", "Premium Glass Upgrade", "Sandy Springs"],
  ["https://assets.cdn.filesafe.space/FjfyTuO1vncfCoNQiCIM/media/68a4f3e1784279cd1af26439.jpeg", "Custom Enclosure", "Atlanta"],
  ["https://assets.cdn.filesafe.space/FjfyTuO1vncfCoNQiCIM/media/6962d731f8a93b70709fca78.png", "Frameless Installation", "Marietta"],
  ["https://assets.cdn.filesafe.space/FjfyTuO1vncfCoNQiCIM/media/6962d73198efbd6c75c51872.png", "Glass Replacement", "Smyrna"],
  ["https://assets.cdn.filesafe.space/FjfyTuO1vncfCoNQiCIM/media/6a0890812e98e28fa13828cd.jpg", "Premium Frameless Glass", "Roswell"],
];

const transformations = [
  { before: asset("/assets/before-shower.jpeg"), after: asset("/assets/after-shower.jpeg"), title: "Sliding glass enclosure", detail: "A compact shower upgraded with clean glass panels and brushed metal hardware." },
  { before: asset("/assets/before-double-shower.jpg"), after: asset("/assets/after-double-shower.jpg"), title: "Custom double shower", detail: "A dramatic full-width enclosure designed around a vaulted window and dual shower system." },
  { before: asset("/assets/before-alcove-shower.jpg"), after: asset("/assets/after-alcove-shower.jpg"), title: "Frameless alcove door", detail: "A simple open alcove transformed into a polished, functional glass shower." },
  { before: asset("/assets/before-green-shower.jpg"), after: asset("/assets/after-green-shower.jpg"), title: "Sliding shower upgrade", detail: "A custom sliding enclosure that protects the space without hiding the stonework." },
];

const reviews = [
  ["https://randomuser.me/api/portraits/women/44.jpg", "Jennifer M.", "Buckhead", "Frameless Door", "From measurement to install, everything was flawless. The frameless door looks like it came out of a luxury hotel. They measured Tuesday and installed Friday."],
  ["https://randomuser.me/api/portraits/men/32.jpg", "Marcus T.", "Alpharetta", "Glass Enclosure", "Got three quotes before choosing GlassXperts. The quality difference is obvious, and the same professional who measured the shower completed the installation."],
  ["https://randomuser.me/api/portraits/women/65.jpg", "Sarah K.", "Marietta", "Tub-to-Shower", "We converted our old tub to a walk-in shower with frameless glass. The transformation is unbelievable—our bathroom went from basic to breathtaking."],
  ["https://randomuser.me/api/portraits/men/52.jpg", "David R.", "Sandy Springs", "Frameless Door", "Cordial, trustworthy and extremely precise. The crew answered every question, protected our home and left the glass absolutely perfect."],
  ["https://randomuser.me/api/portraits/women/28.jpg", "Emily & Josh P.", "Roswell", "Sliding Door", "Fast, clean and professional. They protected our floors, cleaned after the install, and the sliding glass door works beautifully."],
];

const faqs = [
  ["How much does a frameless shower door cost?", "Every shower is custom, so pricing depends on glass size, thickness and hardware. Our free in-home measurement gives you an exact, transparent price with no commitment."],
  ["How long does installation take?", "Custom fabrication takes 1–5 days after measurement, and most installations are completed in a single visit."],
  ["Do you use subcontractors?", "Never. Measurements and installations are completed by our own certified, licensed and insured technicians."],
  ["What warranty do you offer?", "Residential installations are backed by a 5-year warranty, and our glass is fade and crack-free."],
  ["What areas do you serve?", "We serve Metro Atlanta, including Alpharetta, Marietta, Sandy Springs, Roswell, Norcross and surrounding communities."],
];

function ServiceIcon({ name }: { name: "measure" | "team" | "speed" | "warranty" }) {
  const paths = {
    measure: <><path d="M4 7V4h3M17 4h3v3M20 17v3h-3M7 20H4v-3"/><path d="M7 12h10M9 9v6m3-6v3m3-3v6"/></>,
    team: <><circle cx="9" cy="8" r="3"/><path d="M3.5 19c.5-3.4 2.3-5 5.5-5s5 1.6 5.5 5M16 7.5a2.5 2.5 0 0 1 0 5M16 14c2.7.2 4.1 1.8 4.5 4.5"/></>,
    speed: <><path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z"/></>,
    warranty: <><path d="m12 3 7 3v5c0 4.7-2.6 8-7 10-4.4-2-7-5.3-7-10V6l7-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></>,
  };
  return <div className="service-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg></div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [activeTransformation, setActiveTransformation] = useState(0);
  const [comparisonPosition, setComparisonPosition] = useState(50);
  const [activeHeroVideo, setActiveHeroVideo] = useState(0);

  const showTransformation = (index: number) => {
    setActiveTransformation((index + transformations.length) % transformations.length);
    setComparisonPosition(50);
  };

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const submitQuote = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (submitting) return;
    setSubmitting(true);
    setSubmitError("");

    try {
      await sendLead(form, {
        source_page: "Residential landing page",
        form_name: "residential_quote",
      });
      trackFormLead("residential_quote");
      setSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("Quote request failed", error);
      setSubmitError("We couldn't send your request. Please try again or call (678) 501-7753.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      <header className="site-header">
        <a href={homeUrl} className="brand" aria-label="GlassXperts home"><img src={logo} alt="GlassXperts" /></a>
        <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation">
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
          <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>Process</a>
          <a href={`${basePath}/commercial/`} onClick={() => setMenuOpen(false)}>Commercial</a>
        </nav>
        <div className="header-actions">
          <a className="phone-link" href="tel:+16785017753">(678) 501-7753</a>
          <a className="button small" href="#quote">Free Quote</a>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>☰</button>
        </div>
      </header>

      <section className="hero" id="top">
        <video
          key={heroVideos[activeHeroVideo]}
          className="hero-image hero-video"
          autoPlay
          muted
          playsInline
          preload="metadata"
          poster={projects[0][0]}
          onEnded={() => setActiveHeroVideo((current) => (current + 1) % heroVideos.length)}
          aria-label="GlassXperts shower installation showcase"
        >
          <source src={heroVideos[activeHeroVideo]} type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-layout">
          <div className="hero-content">
            <p className="eyebrow"><span /> Atlanta&apos;s frameless glass specialists</p>
            <h1><span>Frameless</span><em>Shower Glass</em><small>Crafted for Atlanta homes.</small></h1>
            <div className="button-row">
              <a className="button" href="#quote">Get a Free Quote <span>→</span></a>
              <a className="hero-phone" href="tel:+16785017753">Call (678) 501-7753</a>
            </div>
          </div>
          <aside className="hero-proof">
            <div className="proof-rating">
              <img className="proof-avatar" src="https://randomuser.me/api/portraits/women/44.jpg" alt="Les Dillard" />
              <div><b>Les Dillard</b><small>Buckhead · Verified customer</small><span className="proof-stars">★★★★★ <i>Google review</i></span></div>
            </div>
            <p>“From measurement to installation, everything was flawless. The finished glass transformed the entire shower.”</p>
            <button className="hero-project" onClick={() => setLightbox(0)} aria-label="View featured Buckhead installation">
              <img src={projects[0][0]} alt="Featured frameless shower installation in Buckhead" />
              <span><b>Featured installation</b><small>Buckhead, Atlanta</small></span>
              <i>↗</i>
            </button>
            <div className="proof-meta"><span><b>10+</b> Years serving Atlanta</span><span><b>5-Year</b> Residential warranty</span></div>
          </aside>
        </div>
        <div className="hero-bottom"><span>Licensed &amp; insured</span><span>No subcontractors</span><span>1–5 day turnaround</span><a href="#gallery">Explore our work ↓</a></div>
      </section>

      <section className="section intro" id="services">
        <div className="section-heading split">
          <div><p className="eyebrow dark"><span /> The GlassXperts standard</p><h2>Precision you can see.<br />Quality you can feel.</h2></div>
          <p>For over a decade, our own certified team has measured, fabricated and installed premium shower glass throughout Metro Atlanta.</p>
        </div>
        <div className="service-grid">
          {[
            ["measure", "Precision measurement", "Laser-measured in your home for a clean, gap-free custom fit."],
            ["team", "Our certified team", "No subcontractors. Dedicated professionals from measurement to installation."],
            ["speed", "Same-week turnaround", "Custom fabrication in 1–5 days, with most installs completed in one visit."],
            ["warranty", "5-year warranty", "Licensed and insured craftsmanship, backed by our residential warranty."],
          ].map(([icon, title, copy]) => <article className="service-card" key={icon}><ServiceIcon name={icon as "measure" | "team" | "speed" | "warranty"} /><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="section gallery-section" id="gallery">
        <div className="section-heading">
          <p className="eyebrow"><span /> Selected installations</p>
          <h2>Real work. Remarkable clarity.</h2>
          <p>Explore frameless shower projects completed by our team across Metro Atlanta.</p>
        </div>
        <div className="project-grid" aria-label="GlassXperts project gallery">
          {projects.map((project, index) => (
            <button className="project-card" key={project[0]} onClick={() => setLightbox(index)} aria-label={`View ${project[1]} in ${project[2]}`}>
              <span className="project-image"><img src={project[0]} alt={`${project[1]} in ${project[2]}`} loading={index < 4 ? "eager" : "lazy"} /></span>
              <span className="project-info"><span><b>{project[1]}</b><small>{project[2]}, Georgia</small></span><i>↗</i></span>
            </button>
          ))}
        </div>
      </section>

      <section className="section transformation-section" id="before-after">
        <div className="section-heading split">
          <div><p className="eyebrow dark"><span /> Before &amp; after</p><h2>Real spaces.<br />Remarkable transformations.</h2></div>
          <p>Select a project, then drag the comparison control to reveal the space before installation and the finished GlassXperts result.</p>
        </div>
        <div className="transformation-tabs" role="tablist" aria-label="Before and after projects">
          {transformations.map((item, index) => <button key={item.title} className={activeTransformation === index ? "active" : ""} onClick={() => showTransformation(index)} role="tab" aria-selected={activeTransformation === index}><img src={item.after} alt="" /><span><small>Project {String(index + 1).padStart(2, "0")}</small><b>{item.title}</b></span></button>)}
        </div>
        <div className="comparison-wrap">
          <div className="comparison-stage">
            <img className="comparison-image comparison-before-image" src={transformations[activeTransformation].before} alt={`${transformations[activeTransformation].title} before glass installation`} />
            <div className="comparison-after" style={{ clipPath: `inset(0 0 0 ${comparisonPosition}%)` }} aria-hidden="true"><img className="comparison-image" src={transformations[activeTransformation].after} alt="" /></div>
            <span className="comparison-label before-label">Before</span>
            <span className="comparison-label after-label">After</span>
            <div className="comparison-line" style={{ left: `${comparisonPosition}%` }} aria-hidden="true"><span>↔</span></div>
            <input className="comparison-range" type="range" min="0" max="100" value={comparisonPosition} onChange={(event) => setComparisonPosition(Number(event.target.value))} aria-label={`Compare before and after for ${transformations[activeTransformation].title}`} />
            <span className="comparison-hint" aria-hidden="true">Drag to compare</span>
          </div>
          <aside className="transformation-copy"><div className="transformation-counter"><span>{String(activeTransformation + 1).padStart(2, "0")} / {String(transformations.length).padStart(2, "0")}</span><div><button onClick={() => showTransformation(activeTransformation - 1)} aria-label="Previous transformation">←</button><button onClick={() => showTransformation(activeTransformation + 1)} aria-label="Next transformation">→</button></div></div><span>Completed GlassXperts project</span><h3>{transformations[activeTransformation].title}</h3><p>{transformations[activeTransformation].detail}</p><ul><li>Custom measured glass</li><li>Premium hardware</li><li>Professional installation</li></ul><a className="button" href="#quote">Transform My Shower →</a></aside>
        </div>
      </section>

      <section className="section process" id="process">
        <div className="section-heading split">
          <div><p className="eyebrow dark"><span /> A simpler experience</p><h2>From first visit to flawless installation.</h2></div>
          <p>A transparent three-step process designed to respect your time, your budget and your home.</p>
        </div>
        <div className="process-grid">
          {[
            ["01", "Free in-home measurement", "A specialist measures your space and prepares a clear, no-pressure quote.", "Scheduled within 24–48 hours"],
            ["02", "Custom glass fabrication", "Your enclosure is cut to the millimeter using premium materials and hardware.", "1–5 day turnaround"],
            ["03", "Professional installation", "Our certified team installs, tests and cleans the complete space before leaving.", "Most installs in one visit"],
          ].map(([n, title, copy, time]) => <article key={n}><span className="step-number">{n}</span><h3>{title}</h3><p>{copy}</p><small>{time}</small></article>)}
        </div>
      </section>

      <section className="section review-section" id="reviews">
        <div className="review-summary">
          <p className="eyebrow"><span /> Homeowner reviews</p>
          <h2>Trusted across<br />Metro Atlanta.</h2>
          <div className="rating"><b>4.9</b><div><span>★★★★★</span><small>Google customer rating</small></div></div>
          <p>Feedback presented with project type and neighborhood so visitors can understand the experience behind each installation.</p>
        </div>
        <div className="reviews-list">
          {reviews.map(([photo, name, area, tag, copy]) => (
            <article className="review-card" key={name}>
              <div className="review-top"><img className="avatar" src={photo} alt={`${name} review profile`} loading="lazy" /><div><h3>{name}</h3><span>{area} · Verified customer</span></div><b className="google-g">G</b></div>
              <div className="review-stars">★★★★★ <span>{tag}</span></div>
              <blockquote>“{copy}”</blockquote>
            </article>
          ))}
        </div>
      </section>

      <section className="section quote-section" id="quote">
        <div className="quote-copy">
          <p className="eyebrow"><span /> Complimentary consultation</p>
          <h2>Let&apos;s create your ideal shower.</h2>
          <p>Tell us a little about your project. A GlassXperts specialist will contact you within two business hours to arrange your free in-home measurement.</p>
          <ul><li>Free in-home measurement</li><li>Transparent custom quote</li><li>Same-week availability</li><li>5-year residential warranty</li></ul>
        </div>
        <div className="quote-card">
          {submitted ? <div className="success"><span>✓</span><h3>Request received.</h3><p>A GlassXperts technician will review your request and contact you within the next 20 minutes during business hours. Requests submitted after 9:00 PM will receive a response after 9:00 AM the following day.</p><a className="button" href="tel:+16785017753">Call us now</a></div> :
          <form onSubmit={submitQuote}>
            <div className="form-head"><div><small>Free quote request</small><h3>Tell us about your project</h3></div><span>Usually replies in 2 hours</span></div>
            <label>Project type<select name="project_type" required defaultValue=""><option value="" disabled>Select your project</option><option>Frameless Shower Door</option><option>Sliding Shower Door</option><option>Tub Glass Enclosure</option><option>Replacement / Repair</option></select></label>
            <div className="form-row"><label>Full name<input name="name" required autoComplete="name" placeholder="Your name" /></label><label>Phone<input name="phone" type="tel" required autoComplete="tel" placeholder="(678) 555-0000" /></label></div>
            <div className="form-row"><label>Email<input name="email" type="email" required autoComplete="email" placeholder="you@email.com" /></label><label>ZIP code<input name="zip" inputMode="numeric" required placeholder="30071" maxLength={5} /></label></div>
            <label>Timeline<select name="timeline" required defaultValue=""><option value="" disabled>When would you like to begin?</option><option>As soon as possible</option><option>Within 1–2 weeks</option><option>Within a month</option><option>Just getting quotes</option></select></label>
            <button className="button form-button" type="submit" disabled={submitting}>{submitting ? "Sending Request…" : "Request My Free Quote"} {!submitting && <span>→</span>}</button>
            {submitError && <p className="form-error" role="alert">{submitError}</p>}
            <small className="form-note">By submitting, you agree to be contacted by GlassXperts via phone, SMS or email. Reply STOP to opt out.</small>
          </form>}
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="section-heading split"><div><p className="eyebrow dark"><span /> Frequently asked</p><h2>Clear answers before you begin.</h2></div><a href="tel:+16785017753">Still have questions? Call us →</a></div>
        <div className="faq-list">{faqs.map(([question, answer], index) => <article className={faqOpen === index ? "open" : ""} key={question}><button onClick={() => setFaqOpen(faqOpen === index ? null : index)} aria-expanded={faqOpen === index}><span>{question}</span><b>{faqOpen === index ? "−" : "+"}</b></button><div><p>{answer}</p></div></article>)}</div>
      </section>

      <section className="final-cta"><p className="eyebrow"><span /> Your bathroom, elevated</p><h2>Ready to see what clear<br />craftsmanship looks like?</h2><div className="button-row"><a className="button" href="#quote">Get a Free Quote</a><a className="button outline" href="tel:+16785017753">Call (678) 501-7753</a></div></section>

      <footer>
        <div className="footer-main"><div className="footer-brand"><a href={homeUrl} aria-label="GlassXperts home"><img src={logo} alt="GlassXperts" /></a><p>Premium frameless shower glass and professional installation throughout Metro Atlanta.</p></div><div><h3>Explore</h3><a href={homeUrl}>Home</a><a href="#gallery">Our Work</a><a href="#reviews">Reviews</a><a href="#process">Process</a><a href="#faq">FAQ</a><a href={`${basePath}/commercial/`}>Commercial Glass</a></div><div><h3>Contact</h3><a href="tel:+16785017753">(678) 501-7753</a><a href={homeUrl}>myglassxperts.com</a><span>Mon–Sat · 8 AM–6 PM</span></div><div><h3>Follow</h3><a href="https://www.instagram.com/glass_xperts" target="_blank">Instagram</a><a href="https://facebook.com/myglassxperts" target="_blank">Facebook</a><a href="https://www.youtube.com/@MyGlassxperts" target="_blank">YouTube</a></div></div>
        <div className="footer-bottom"><span>© 2026 GlassXperts · Atlanta, Georgia</span><span>Licensed &amp; Insured · 5-Year Warranty</span></div>
      </footer>

      <div className="mobile-actions"><a href="tel:+16785017753">Call Now</a><a href="#quote">Free Quote</a></div>

      {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Project image viewer" onClick={() => setLightbox(null)}><button onClick={() => setLightbox(null)} aria-label="Close image">×</button><img src={projects[lightbox][0]} alt={`${projects[lightbox][1]} in ${projects[lightbox][2]}`} /><div><b>{projects[lightbox][1]}</b><span>{projects[lightbox][2]}, Georgia</span></div></div>}
    </main>
  );
}
