import { useState } from "react";

const FOOTER_LINKS = {
  "About Us Site": [
    { label: "About Us", href: "#" },
    { label: "Press", href: "#" },
    { label: "Resources and Policies", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Investor Relations", href: "#" },
    { label: "Trust & Safety", href: "#" },
    { label: "Contact us", href: "#" },
    { label: "Bug Bounty Program", href: "#" },
    { label: "Site Technology Blog", href: "#" },
  ],
  "Explore": [
    { label: "Write a review", href: "#" },
    { label: "Add a Place", href: "#" },
    { label: "Join", href: "#" },
    { label: "Travelers' Choice", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Travel Stories", href: "#" },
  ],
  "Do Business With Us": [
    { label: "Owners", href: "#" },
    { label: "Business Advantage", href: "#" },
    { label: "Sponsored Placements", href: "#" },
    { label: "Advertise with Us", href: "#" },
    { label: "Access our Content API", href: "#" },
    { label: "Become an Affiliate", href: "#" },
  ],
  "Get The App": [
    { label: "iPhone App", href: "#" },
    { label: "Android App", href: "#" },
  ],
};

const SITE_LINKS = [
  {
    text: "Book the best restaurants with",
    linkLabel: "TheFork",
    href: "#",
  },
  {
    text: "Book tours and attraction tickets on",
    linkLabel: "Viator",
    href: "#",
  },
  {
    text: "Read cruise reviews on",
    linkLabel: "Cruise Critic",
    href: "#",
  },
];

const CURRENCIES = ["$ USD", "€ EUR", "£ GBP", "¥ JPY", "A$ AUD", "C$ CAD"];
const COUNTRIES = [
  "United States", "United Kingdom", "Australia", "Canada",
  "Germany", "France", "Japan", "India", "Brazil", "Spain",
];

const LEGAL_LINKS = [
  { label: "Terms of Use", href: "#" },
  { label: "Privacy and Cookies Statement", href: "#" },
  { label: "Cookie consent", href: "#" },
  { label: "How the site works", href: "#" },
  { label: "Contact us", href: "#" },
  { label: "Accessibility Statement", href: "#" },
];

// Social icons as inline SVGs
const SocialIcons = {
  Facebook: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Pinterest: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  ),
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="17.5" cy="6.5" r="1" />
    </svg>
  ),
  YouTube: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
    </svg>
  ),
  TikTok: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
    </svg>
  ),
};

export default function Footer() {
  const [currency, setCurrency] = useState("$ USD");
  const [country, setCountry] = useState("United States");
  const [expanded, setExpanded] = useState(false);

  const blurb =
    "This is the version of our website addressed to speakers of English. If you are a resident of another country or region, please select the appropriate version of the site for your country or region in the drop-down menu.";
  const SHORT = 160;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');

        .ft-root {
          font-family: 'DM Sans', sans-serif;
          background: #f2f2f0;
          border-top: 1px solid rgba(0,0,0,0.08);
          padding: 48px 40px 0;
          color: #222;
        }

        /* ── Top columns ── */
        .ft-columns {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1.2fr 0.8fr 1fr;
          gap: 32px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }

        .ft-col-heading {
          font-size: 14px;
          font-weight: 600;
          color: #1a2e1a;
          margin: 0 0 14px;
          letter-spacing: 0.01em;
        }

        .ft-col ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .ft-col ul li a {
          font-size: 13px;
          font-weight: 400;
          color: #444;
          text-decoration: none;
          transition: color 0.15s;
          line-height: 1.4;
        }
        .ft-col ul li a:hover { color: #111; text-decoration: underline; }

        /* Sites column */
        .ft-sites-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ft-sites-list li {
          font-size: 13px;
          color: #444;
          line-height: 1.5;
        }
        .ft-sites-list li a {
          color: #1a2e1a;
          font-weight: 500;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.15s;
        }
        .ft-sites-list li a:hover { color: #000; }

        /* ── Bottom bar ── */
        .ft-bottom {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 32px;
          padding: 28px 0 32px;
          flex-wrap: wrap;
        }

        .ft-bottom-left { flex: 1; min-width: 280px; }

        .ft-brand-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 12px;
        }

        /* Logo circle */
        .ft-logo {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #1a2e1a;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .ft-logo svg { color: #fff; }

        .ft-copyright {
          font-size: 12.5px;
          color: #666;
        }

        .ft-legal {
          display: flex;
          flex-wrap: wrap;
          gap: 4px 0;
          margin-bottom: 14px;
        }
        .ft-legal a {
          font-size: 12.5px;
          font-weight: 500;
          color: #222;
          text-decoration: underline;
          text-underline-offset: 2px;
          white-space: nowrap;
          transition: color 0.15s;
        }
        .ft-legal a:hover { color: #000; }
        .ft-legal-sep {
          font-size: 12.5px;
          color: #aaa;
          margin: 0 8px;
        }

        .ft-blurb {
          font-size: 12px;
          color: #666;
          line-height: 1.6;
          max-width: 680px;
        }
        .ft-read-more {
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #222;
          padding: 0;
          margin-left: 4px;
          text-decoration: underline;
          text-underline-offset: 2px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .ft-read-more svg {
          transition: transform 0.2s ease;
        }
        .ft-read-more.open svg { transform: rotate(180deg); }

        /* Right controls */
        .ft-bottom-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 16px;
          flex-shrink: 0;
        }

        .ft-selects {
          display: flex;
          gap: 10px;
        }

        .ft-select-wrap {
          position: relative;
        }
        .ft-select-wrap select {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #222;
          background: #fff;
          border: 1.5px solid rgba(0,0,0,0.18);
          border-radius: 8px;
          padding: 8px 36px 8px 14px;
          appearance: none;
          cursor: pointer;
          outline: none;
          transition: border-color 0.18s;
          min-width: 120px;
        }
        .ft-select-wrap select:hover { border-color: rgba(0,0,0,0.4); }
        .ft-select-wrap::after {
          content: '';
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 5px solid #555;
          pointer-events: none;
        }

        /* Social icons */
        .ft-social {
          display: flex;
          gap: 14px;
          align-items: center;
        }
        .ft-social a {
          color: #444;
          transition: color 0.18s, transform 0.18s;
          display: flex;
          align-items: center;
        }
        .ft-social a:hover { color: #111; transform: translateY(-2px); }

        /* Responsive */
        @media (max-width: 900px) {
          .ft-columns {
            grid-template-columns: 1fr 1fr;
            gap: 28px;
          }
        }
        @media (max-width: 580px) {
          .ft-root { padding: 36px 20px 0; }
          .ft-columns { grid-template-columns: 1fr; }
          .ft-bottom { flex-direction: column; }
          .ft-bottom-right { align-items: flex-start; }
        }
      `}</style>

      <footer className="ft-root">
        {/* ── Column links ── */}
        <div className="ft-columns">
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div className="ft-col" key={heading}>
              <h4 className="ft-col-heading">{heading}</h4>
              <ul>
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Sites column */}
          <div className="ft-col">
            <h4 className="ft-col-heading">Our Sites</h4>
            <ul className="ft-sites-list">
              {SITE_LINKS.map((s) => (
                <li key={s.linkLabel}>
                  {s.text} <a href={s.href}>{s.linkLabel}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="ft-bottom">
          <div className="ft-bottom-left">
            {/* Brand + copyright */}
            <div className="ft-brand-row">
              <div className="ft-logo">
                <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
                  <circle cx="12" cy="12" r="3" fill="white"/>
                  <path d="M2 12a10 10 0 1 0 20 0A10 10 0 0 0 2 12z" stroke="white" strokeWidth="2" fill="none"/>
                  <path d="M7 12a5 5 0 0 1 10 0" stroke="white" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>
              <span className="ft-copyright">© 2026 Site LLC All rights reserved.</span>
            </div>

            {/* Legal links — row 1 */}
            <div className="ft-legal">
              {LEGAL_LINKS.slice(0, 4).map((l, i) => (
                <span key={l.label}>
                  {i > 0 && <span className="ft-legal-sep">·</span>}
                  <a href={l.href}>{l.label}</a>
                </span>
              ))}
            </div>
            {/* Legal links — row 2 */}
            <div className="ft-legal" style={{ marginBottom: 14 }}>
              {LEGAL_LINKS.slice(4).map((l, i) => (
                <span key={l.label}>
                  {i > 0 && <span className="ft-legal-sep">·</span>}
                  <a href={l.href}>{l.label}</a>
                </span>
              ))}
            </div>

            {/* Blurb */}
            <p className="ft-blurb">
              {expanded ? blurb : blurb.slice(0, SHORT) + "…"}
              <button
                className={`ft-read-more${expanded ? " open" : ""}`}
                onClick={() => setExpanded((e) => !e)}
                aria-expanded={expanded}
              >
                {expanded ? "Show less" : "Read more"}
                <svg viewBox="0 0 12 8" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 1l5 5 5-5" />
                </svg>
              </button>
            </p>
          </div>

          {/* Right — selects + social */}
          <div className="ft-bottom-right">
            <div className="ft-selects">
              <div className="ft-select-wrap">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  aria-label="Select currency"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="ft-select-wrap">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  aria-label="Select country"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Social */}
            <div className="ft-social">
              <a href="#" aria-label="Facebook"><SocialIcons.Facebook /></a>
              <a href="#" aria-label="X / Twitter"><SocialIcons.X /></a>
              <a href="#" aria-label="Pinterest"><SocialIcons.Pinterest /></a>
              <a href="#" aria-label="Instagram"><SocialIcons.Instagram /></a>
              <a href="#" aria-label="YouTube"><SocialIcons.YouTube /></a>
              <a href="#" aria-label="TikTok"><SocialIcons.TikTok /></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}