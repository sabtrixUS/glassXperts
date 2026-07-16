"use client";

import { FormEvent, useEffect, useState } from "react";
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
].map(([image, title, location]) => [asset(`/assets/commercial/${image}`), title, location]);

const services = [
  ["01", "Emergency board-up & glass replacement", "Rapid response for broken storefronts, entry doors and damaged commercial glass."],
  ["02", "Storefront windows & entrances", "Professional aluminum framing, glass doors and storefront systems for active businesses."],
  ["03", "Office glass & partitions", "Interior glass walls, conference rooms and doors that create bright, modern workspaces."],
  ["04", "Commercial windows & curtain walls", "Installation and replacement for multi-story buildings, retail centers and commercial properties."],
];

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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setProject(null);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const submitQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("service_type", "Commercial glass only");
    fetch("https://services.leadconnectorhq.com/hooks/FjfyTuO1vncfCoNQiCIM/webhook-trigger/d892b50d-d6a2-4b72-beb5-5965e400fa24", {
      method: "POST",
      mode: "no-cors",
      body: data,
    }).finally(() => setSubmitted(true));
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
          <small>Built for active businesses</small>
          <strong>Secure the property.<br/>Protect the operation.</strong>
          <p>We coordinate around business hours, tenant access and operational priorities.</p>
          <button onClick={() => setVideo((video + 1) % heroVideos.length)}>View next emergency scene ↗</button>
        </div>
      </section>

      <section className="commercial-intro" id="services">
        <div><p className="commercial-kicker dark"><span /> Commercial services only</p><h2>Glass solutions designed around your business.</h2></div>
        <p>We work with business owners, property managers, contractors and facility teams. This page is dedicated exclusively to commercial projects—no residential service requests.</p>
      </section>

      <section className="commercial-service-grid">
        {services.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p><a href="#commercial-quote">Request service →</a></article>)}
      </section>

      <section className="industries-band" id="industries">
        <div><p className="commercial-kicker"><span /> Who we serve</p><h2>Local businesses to large commercial properties.</h2></div>
        <div className="industry-list">
          {[["STORE", "Corner stores & retail"], ["FUEL", "Gas stations"], ["DINE", "Restaurants"], ["WORK", "Offices & small businesses"], ["BUILD", "Commercial properties"], ["MANAGE", "Property managers"]].map(([tag, name]) => <div key={tag}><b>{tag}</b><span>{name}</span></div>)}
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
        {submitted ? <div className="commercial-success"><span>✓</span><h3>Request received.</h3><p>Our commercial team will review your project and contact you shortly. If the property is exposed or unsafe, please call (678) 501-7753 now.</p></div> :
        <form onSubmit={submitQuote}>
          <div className="field-row"><label>Contact name<input name="name" required placeholder="Your name" /></label><label>Business name<input name="business_name" required placeholder="Company or property" /></label></div>
          <div className="field-row"><label>Business phone<input name="phone" type="tel" required placeholder="(404) 000-0000" /></label><label>Work email<input name="email" type="email" required placeholder="name@company.com" /></label></div>
          <label>Commercial service needed<select name="service" required defaultValue=""><option value="" disabled>Select a service</option><option>Emergency broken glass</option><option>Storefront glass or entrance</option><option>Commercial windows</option><option>Office glass or partitions</option><option>Commercial doors</option><option>New construction / renovation</option></select></label>
          <label>Project address<input name="project_address" placeholder="Commercial property address" /></label>
          <label>Project details<textarea name="message" rows={4} required placeholder="Tell us what happened, the business type and how urgently you need service." /></label>
          <label className="emergency-check"><input type="checkbox" name="is_emergency" value="yes" /> This is an active commercial glass emergency</label>
          <button className="commercial-button form-submit" type="submit">Send Commercial Request <span>→</span></button>
          <small>Commercial inquiries only. By submitting, you agree to be contacted by GlassXperts via phone, SMS or email.</small>
        </form>}
      </section>

      <footer className="commercial-footer"><div><img src={logo} alt="GlassXperts"/><p>Commercial glass installation, replacement and emergency response across Metro Atlanta.</p></div><div><b>Commercial Services</b><a href="#services">Services</a><a href="#projects">Projects</a><a href="#commercial-quote">Request Service</a></div><div><b>Emergency</b><a href={`tel:${phone}`}>(678) 501-7753</a><span>Commercial glass emergencies</span><span>Metro Atlanta</span></div><div className="footer-residential"><b>Looking for residential shower glass?</b><a href={`${basePath}/`}>Visit our residential website →</a></div></footer>

      {project !== null && <div className="commercial-lightbox" role="dialog" aria-modal="true" aria-label="Commercial project image" onClick={() => setProject(null)}><button aria-label="Close project">×</button><img src={projects[project][0]} alt={projects[project][1]} /><div><b>{projects[project][1]}</b><span>{projects[project][2]}</span></div></div>}
      <div className="commercial-mobile-actions"><a href={`tel:${phone}`}>Emergency Call</a><a href="#commercial-quote">Request Service</a></div>
    </main>
  );
}
