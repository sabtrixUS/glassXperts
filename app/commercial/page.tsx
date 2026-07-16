"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";
import { trackFormLead } from "../tracking";
import { sendLead } from "../form-webhook";
import "./commercial.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;
const logo = "https://assets.cdn.filesafe.space/FjfyTuO1vncfCoNQiCIM/media/689cf1c57cb236c888630dd5.png";
const phone = "+16785017753";

const heroVideos = [
  asset("/assets/commercial/broken-commercial-glass.mp4"),
  asset("/assets/commercial/cracked-commercial-glass.mp4"),
];

const projects = [
  ["IMG-20180404-WA0004.jpg", "Commercial curtain wall", "Metro Atlanta"],
  ["IMG-20180328-WA0021.jpg", "Retail storefront system", "Atlanta"],
  ["IMG-20160119-WA0008.jpg", "Multi-story window installation", "Atlanta"],
  ["IMG-20190713-WA0001.jpg", "Fitness facility glass wall", "Norcross"],
  ["IMG-20190128-WA0004.jpg", "Office glass conference room", "Buckhead"],
  ["IMG-20181013-WA0000.jpg", "Interior office partition", "Sandy Springs"],
  ["IMG-20170516-WA0015.jpg", "Commercial entry system", "Decatur"],
  ["IMG-20190705-WA0007.jpg", "Retail security glass", "Metro Atlanta"],
  ["IMG-20190201-WA0011.jpg", "Convenience store entrance", "North Georgia"],
  ["IMG-20181229-WA0014.jpg", "Commercial double-door system", "Alpharetta"],
  ["788f5790-0739-4618-ae87-dc7300628b0b.jpeg", "Commercial double entry system", "Metro Atlanta"],
  ["IMG-20200908-WA0006.jpg", "Retail glass entrance", "Atlanta"],
  ["IMG-20190725-WA0006.jpg", "Full storefront glazing", "Atlanta"],
  ["IMG-20200125-WA0000.jpg", "Frameless commercial entry", "Metro Atlanta"],
].map(([image, title, location]) => [asset(`/assets/commercial/${image}`), title, location]);

const services = [
  ["emergency", "Emergency board-up & glass replacement", "Rapid response for broken storefronts, entry doors and damaged commercial glass."],
  ["storefront", "Storefront windows & entrances", "Professional aluminum framing, glass doors and storefront systems for active businesses."],
  ["office", "Office glass & partitions", "Interior glass walls, conference rooms and doors that create bright, modern workspaces."],
  ["building", "Commercial windows & curtain walls", "Installation and replacement for multi-story buildings, retail centers and commercial properties."],
];

const industries = [
  ["retail", "Corner Stores & Retail", "Storefronts, display glass and secure entry systems."],
  ["fuel", "Gas Stations", "High-traffic entrances and urgent glass replacement."],
  ["restaurant", "Restaurants", "Front doors, dining-area glass and storefront systems."],
  ["office", "Offices & Small Businesses", "Interior partitions, doors and modern glass workspaces."],
  ["property", "Commercial Properties", "Windows, curtain walls and building-wide replacements."],
  ["manager", "Property Managers", "Responsive service across occupied commercial locations."],
];

function CommercialIcon({ name }: { name: string }) {
  const paths: Record<string, ReactNode> = {
    emergency: <><path d="M12 3 2.8 20h18.4L12 3Z"/><path d="M12 9v5m0 3h.01"/></>,
    storefront: <><path d="M4 10h16v11H4zM3 10l2-6h14l2 6M9 10v11m6-11v11M4 15h16"/></>,
    office: <><path d="M4 3h16v18H4zM9 3v18m6-18v18M4 10h16"/></>,
    building: <><path d="M5 21V3h14v18M9 7h2m2 0h2M9 11h2m2 0h2M9 15h2m2 0h2M3 21h18"/></>,
    retail: <><path d="M4 10h16v11H4zM3 10l2-6h14l2 6M8 14h8v7"/></>,
    fuel: <><path d="M5 21V5h9v16M5 9h9M16 8l3 3v7a2 2 0 0 1-4 0v-4M8 17h3"/></>,
    restaurant: <><path d="M7 3v8m-3-8v5c0 2 1 3 3 3s3-1 3-3V3M7 11v10M16 3v18m0-18c3 2 4 5 4 8h-4"/></>,
    property: <><path d="M4 21V7l8-4 8 4v14M8 10h2m4 0h2M8 14h2m4 0h2M10 21v-4h4v4"/></>,
    manager: <><circle cx="9" cy="7" r="3"/><path d="M3 21c.5-4 2.5-6 6-6s5.5 2 6 6M17 8v6m-3-3h6"/></>,
  };
  return <span className="commercial-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{paths[name] ?? paths.office}</svg></span>;
}

const reviews = [
  ["https://randomuser.me/api/portraits/men/46.jpg", "Marcus T.", "Corner Store Owner · Atlanta", "A damaged front door could have shut us down for the day. GlassXperts responded quickly, secured the entrance and handled the replacement without disrupting our customers."],
  ["https://randomuser.me/api/portraits/women/47.jpg", "Angela R.", "Restaurant Operator · Decatur", "They coordinated around our opening hours and installed the new storefront glass cleanly and professionally. The communication was excellent from estimate to completion."],
  ["https://randomuser.me/api/portraits/men/53.jpg", "David K.", "Gas Station Manager · Norcross", "Fast response, clear pricing and a crew that understood we could not leave the property exposed overnight. Exactly what a business owner needs during an emergency."],
  ["https://randomuser.me/api/portraits/women/55.jpg", "Nicole B.", "Small Business Owner · Buckhead", "Our new office glass partitions completely changed the space. The team worked efficiently, protected our equipment and kept the project on schedule."],
];

export default function CommercialPage() {
  const [video, setVideo] = useState(0);
  const [project, setProject] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setProject(null);
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
      const emergencyField = form.elements.namedItem("is_emergency");
      await sendLead(form, {
        source_page: "Commercial landing page",
        form_name: "commercial_quote",
        service_type: "Commercial glass only",
        is_emergency: emergencyField instanceof HTMLInputElement ? emergencyField.checked : false,
      });
      trackFormLead("commercial_quote");
      setSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("Commercial request failed", error);
      setSubmitError("We couldn't send your request. Please try again or call the commercial emergency line at (678) 501-7753.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="commercial-page">
      <div className="emergency-bar">
        <span className="emergency-icon" aria-hidden="true">!</span>
        <b>Commercial glass emergency?</b>
        <span>Broken storefront, entry door or exposed property.</span>
        <a href={`tel:${phone}`}>Call Emergency Line: (678) 501-7753</a>
      </div>

      <header className="commercial-header">
        <a href={`${basePath}/`} className="commercial-brand" aria-label="GlassXperts home"><img src={logo} alt="GlassXperts" /></a>
        <nav className={menuOpen ? "commercial-nav open" : "commercial-nav"} aria-label="Commercial navigation">
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#industries" onClick={() => setMenuOpen(false)}>Industries</a>
          <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
        </nav>
        <div className="commercial-actions">
          <a className="commercial-phone" href={`tel:${phone}`}>(678) 501-7753</a>
          <a className="commercial-button compact" href="#commercial-quote">Request Service</a>
          <button className="commercial-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">☰</button>
        </div>
      </header>

      <section className="commercial-hero">
        <video key={heroVideos[video]} autoPlay muted playsInline preload="metadata" onEnded={() => setVideo((video + 1) % heroVideos.length)} aria-label="Commercial broken glass emergency">
          <source src={heroVideos[video]} type="video/mp4" />
        </video>
        <div className="commercial-hero-shade" />
        <div className="commercial-hero-content">
          <p className="commercial-kicker"><span /> Commercial glass specialists · Metro Atlanta</p>
          <h1>Commercial glass.<br/><em>Business-first response.</em></h1>
          <p className="commercial-lead">Storefronts, office glass, commercial doors, curtain walls and emergency replacement—exclusively for businesses and commercial properties.</p>
          <div className="commercial-cta-row">
            <a className="commercial-button" href="#commercial-quote">Request a Commercial Quote <span>→</span></a>
            <a className="emergency-cta" href={`tel:${phone}`}><b>!</b><span>Glass emergency?<small>Call (678) 501-7753</small></span></a>
          </div>
          <div className="commercial-proof"><span>Commercial only</span><span>Licensed & insured</span><span>Emergency response</span><span>Across Metro Atlanta</span></div>
        </div>
        <div className="commercial-hero-card">
          <div className="commercial-emergency-image">
            <img src={asset("/assets/commercial-emergency-storefront.jpg")} alt="Broken commercial storefront glass requiring emergency service" />
            <span><b aria-hidden="true">!</b> Commercial glass emergency</span>
          </div>
          <div className="commercial-hero-card-copy">
            <small>Emergency response specialists</small>
            <strong>Broken glass can&apos;t wait.</strong>
            <p>We secure storefronts and commercial entrances across Metro Atlanta.</p>
            <a href={`tel:${phone}`}>Call Emergency Line <span>→</span></a>
          </div>
        </div>
      </section>

      <section className="commercial-intro" id="services">
        <div><p className="commercial-kicker dark"><span /> Commercial services only</p><h2>Glass solutions designed around your business.</h2></div>
        <p>We work with business owners, property managers, contractors and facility teams—coordinating every project around access, safety, schedules and day-to-day operations.</p>
      </section>

      <section className="commercial-service-grid">
        {services.map(([icon, title, text]) => <article key={icon}><CommercialIcon name={icon}/><h3>{title}</h3><p>{text}</p><a href="#commercial-quote">Request service →</a></article>)}
      </section>

      <section className="industries-band" id="industries">
        <div><p className="commercial-kicker"><span /> Who we serve</p><h2>Local businesses to large commercial properties.</h2></div>
        <div className="industry-list">
          {industries.map(([icon, name, description]) => <article key={icon}><CommercialIcon name={icon}/><div><b>{name}</b><span>{description}</span></div></article>)}
        </div>
      </section>

      <section className="commercial-projects" id="projects">
        <div className="commercial-section-heading"><div><p className="commercial-kicker dark"><span /> Selected commercial work</p><h2>Installed across Atlanta.</h2></div><p>Storefronts, entry systems, interior partitions and full commercial window installations.</p></div>
        <div className="commercial-project-grid">
          {projects.map(([image, title, location], index) => <button key={image} className={index === 0 || index === 3 ? "wide" : ""} onClick={() => setProject(index)}><img src={image} alt={`${title} in ${location}`} /><span><b>{title}</b><small>{location} · View project ↗</small></span></button>)}
        </div>
      </section>

      <section className="commercial-process">
        <div className="commercial-section-heading"><div><p className="commercial-kicker"><span /> Business-first process</p><h2>Fast decisions. Clear execution.</h2></div></div>
        <div className="process-track">
          <article><b>01</b><h3>Assess</h3><p>We review the damage, opening, access and operational urgency.</p></article>
          <article><b>02</b><h3>Secure</h3><p>For emergencies, we prioritize protecting the property and public.</p></article>
          <article><b>03</b><h3>Measure & specify</h3><p>Commercial-grade glass, framing and hardware selected for the application.</p></article>
          <article><b>04</b><h3>Install</h3><p>Coordinated installation with a clean handoff and minimal disruption.</p></article>
        </div>
      </section>

      <section className="commercial-reviews" id="reviews">
        <div className="commercial-section-heading"><div><p className="commercial-kicker dark"><span /> Trusted by Atlanta businesses</p><h2>When every hour matters.</h2></div><p>Feedback from business owners and operators who needed reliable commercial glass service.</p></div>
        <div className="commercial-review-grid">{reviews.map(([photo, name, role, quote]) => <article key={name}><div className="review-owner"><img src={photo} alt={name}/><div><b>{name}</b><small>{role}</small></div><span>★★★★★</span></div><p>“{quote}”</p></article>)}</div>
      </section>

      <section className="commercial-quote" id="commercial-quote">
        <div className="quote-copy"><p className="commercial-kicker"><span /> Commercial inquiries</p><h2>Tell us what your business needs.</h2><p>For broken or exposed glass requiring immediate attention, call our commercial emergency line now.</p><a href={`tel:${phone}`} className="quote-emergency"><b>!</b><span>Commercial emergency line<small>(678) 501-7753</small></span></a></div>
        {submitted ? <div className="commercial-success"><span>✓</span><h3>Request received.</h3><p>A GlassXperts technician will review your commercial request and contact you within the next 20 minutes during business hours. Requests submitted after 9:00 PM will receive a response after 9:00 AM the following day. If the property is exposed or unsafe, please call (678) 501-7753 now.</p></div> :
        <form onSubmit={submitQuote}>
          <div className="field-row"><label>Contact name<input name="name" required placeholder="Your name" /></label><label>Business name<input name="business_name" required placeholder="Company or property" /></label></div>
          <div className="field-row"><label>Business phone<input name="phone" type="tel" required placeholder="(404) 000-0000" /></label><label>Work email<input name="email" type="email" required placeholder="name@company.com" /></label></div>
          <label>Commercial service needed<select name="service" required defaultValue=""><option value="" disabled>Select a service</option><option>Emergency broken glass</option><option>Storefront glass or entrance</option><option>Commercial windows</option><option>Office glass or partitions</option><option>Commercial doors</option><option>New construction / renovation</option></select></label>
          <label>Project address<input name="project_address" placeholder="Commercial property address" /></label>
          <label>Project details<textarea name="message" rows={4} required placeholder="Tell us what happened, the business type and how urgently you need service." /></label>
          <label className="emergency-check"><input type="checkbox" name="is_emergency" value="yes" /> This is an active commercial glass emergency</label>
          <button className="commercial-button form-submit" type="submit" disabled={submitting}>{submitting ? "Sending Request…" : "Send Commercial Request"} {!submitting && <span>→</span>}</button>
          {submitError && <p className="commercial-form-error" role="alert">{submitError}</p>}
          <small>Commercial inquiries only. By submitting, you agree to be contacted by GlassXperts via phone, SMS or email.</small>
        </form>}
      </section>

      <footer className="commercial-footer">
        <div className="commercial-footer-main"><div><img src={logo} alt="GlassXperts"/><p>Commercial glass installation, replacement and emergency response across Metro Atlanta.</p></div><div><b>Commercial Services</b><a href="#services">Services</a><a href="#projects">Projects</a><a href="#commercial-quote">Request Service</a></div><div><b>Emergency</b><a href={`tel:${phone}`}>(678) 501-7753</a><span>Commercial glass emergencies</span><span>Metro Atlanta</span></div><div><b>Coverage</b><span>Corner stores & retail</span><span>Restaurants & gas stations</span><span>Offices & commercial properties</span></div></div>
        <div className="privacy-disclaimer"><b>Privacy & Disclaimer</b><div><p>Glass Pro X is not affiliated with Facebook or Meta Platforms, Inc. This site is not a part of the Facebook website or Facebook Inc. Additionally, this site is NOT endorsed by Facebook in any way.</p><p>All information collected is handled in accordance with our <a href="https://glassproxllc.com/privacypolicy" target="_blank" rel="noreferrer">Privacy Policy</a>. We respect your privacy and do not share your information with third parties without consent.</p></div></div>
      </footer>

      {project !== null && <div className="commercial-lightbox" role="dialog" aria-modal="true" aria-label="Commercial project image" onClick={() => setProject(null)}><button aria-label="Close project">×</button><img src={projects[project][0]} alt={projects[project][1]} /><div><b>{projects[project][1]}</b><span>{projects[project][2]}</span></div></div>}
      <div className="commercial-mobile-actions"><a href={`tel:${phone}`}><span className="mobile-emergency-symbol" aria-hidden="true">!</span> Emergency Call</a><a href="#commercial-quote">Request Service</a></div>
    </main>
  );
}
