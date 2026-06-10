import { useState, useEffect, useRef } from "react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Discover", href: "#" },
  { label: "Rewards", href: "#" },
  { label: "Favorites", href: "#" },
  { label: "Legal Support", href: "#" },
];

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeLink, setActiveLink] = useState<string>("Home");
  const [scrolled, setScrolled] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .nav-root {
          font-family: 'DM Sans', sans-serif;
          position: sticky;
          top: 0;
          z-index: 100;
          width: 100%;
          transition: box-shadow 0.3s ease, background 0.3s ease;
          background: rgba(236, 236, 236, 0.82);
          backdrop-filter: blur(18px) saturate(1.4);
          -webkit-backdrop-filter: blur(18px) saturate(1.4);
          border-bottom: 1px solid rgba(0,0,0,0.07);
        }

        .nav-root.scrolled {
          box-shadow: 0 4px 32px rgba(0,0,0,0.08);
        }

        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          height: 60px;
          padding: 0 28px;
          gap: 0;
        }

        /* Logo / Avatar */
        .nav-logo {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c8c8c8, #a0a0a0);
          flex-shrink: 0;
          cursor: pointer;
          transition: transform 0.2s ease;
          box-shadow: inset 0 2px 4px rgba(255,255,255,0.5);
        }
        .nav-logo:hover { transform: scale(1.07); }

        /* Search */
        .nav-search {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-left: 14px;
          cursor: pointer;
          padding: 6px 12px;
          border-radius: 20px;
          transition: background 0.18s ease;
          color: #555;
          flex-shrink: 0;
        }
        .nav-search:hover { background: rgba(0,0,0,0.06); }

        .search-icon {
          width: 15px;
          height: 15px;
          stroke: #666;
          flex-shrink: 0;
        }

        .search-label {
          font-size: 13.5px;
          font-weight: 400;
          color: #888;
          white-space: nowrap;
          letter-spacing: 0.01em;
        }

        .search-input-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-left: 14px;
          background: rgba(0,0,0,0.06);
          border-radius: 20px;
          padding: 6px 14px;
          transition: width 0.25s ease;
          width: 200px;
        }

        .search-input {
          border: none;
          background: transparent;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          color: #333;
          width: 100%;
        }
        .search-input::placeholder { color: #aaa; }

        .search-close {
          border: none;
          background: none;
          cursor: pointer;
          color: #999;
          font-size: 15px;
          line-height: 1;
          padding: 0;
          transition: color 0.15s;
        }
        .search-close:hover { color: #444; }

        /* Spacer */
        .nav-spacer { flex: 1; }

        /* Links */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
        }

        .nav-link {
          position: relative;
          font-size: 14px;
          font-weight: 400;
          color: #555;
          text-decoration: none;
          padding: 6px 13px;
          border-radius: 20px;
          transition: color 0.18s ease, background 0.18s ease;
          letter-spacing: 0.01em;
          cursor: pointer;
        }
        .nav-link:hover {
          color: #111;
          background: rgba(0,0,0,0.05);
        }
        .nav-link.active {
          color: #111;
          font-weight: 500;
        }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 18px;
          height: 2px;
          border-radius: 2px;
          background: #333;
        }

        /* Auth buttons */
        .nav-auth {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-left: 28px;
          flex-shrink: 0;
        }

        .btn-login {
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 400;
          color: #555;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px 12px;
          border-radius: 20px;
          transition: background 0.18s, color 0.18s;
          letter-spacing: 0.01em;
        }
        .btn-login:hover { background: rgba(0,0,0,0.05); color: #111; }

        .btn-signup {
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          color: #fff;
          background: #3a3a3a;
          border: none;
          cursor: pointer;
          padding: 7px 20px;
          border-radius: 20px;
          transition: background 0.2s ease, transform 0.15s ease;
          letter-spacing: 0.02em;
        }
        .btn-signup:hover { background: #111; transform: translateY(-1px); }
        .btn-signup:active { transform: translateY(0); }

        /* Mobile */
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .search-label { display: none; }
          .nav-auth { margin-left: 12px; }
        }
      `}</style>

      <nav className={`nav-root${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          {/* Logo */}
          <div className="nav-logo" aria-label="Brand logo" />

          {/* Search */}
          {searchOpen ? (
            <div className="search-input-wrap">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={searchRef}
                className="search-input"
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
              />
              <button className="search-close" onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>✕</button>
            </div>
          ) : (
            <div className="nav-search" onClick={() => setSearchOpen(true)} role="button" aria-label="Open search">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span className="search-label">Where are you going?</span>
            </div>
          )}

          <div className="nav-spacer" />

          {/* Navigation links */}
          <ul className="nav-links" role="navigation" aria-label="Main navigation">
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className={`nav-link${activeLink === label ? " active" : ""}`}
                  onClick={(e) => { e.preventDefault(); setActiveLink(label); }}
                  aria-current={activeLink === label ? "page" : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Auth */}
          <div className="nav-auth">
            <button className="btn-login">Log in</button>
            <button className="btn-signup">Sign Up</button>
          </div>
        </div>
      </nav>
    </>
  );
}
