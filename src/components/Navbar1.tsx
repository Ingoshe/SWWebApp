import { useRef, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

/* ─────────────────────────────────────────────────────────
   Navigation links — edit label and href here only
───────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home",        href: "/"             },
  { label: "Destinations",href: "/destinations" },
  { label: "Articles",    href: "#"             },
  { label: "Contact",     href: "#"             },
];

/* ─────────────────────────────────────────────────────────
   Language data — no i18n library required
───────────────────────────────────────────────────────── */
const LANGUAGES = [
  { code: "en", label: "English",   flag: "🇬🇧" },
  { code: "fr", label: "Français",  flag: "🇫🇷" },
  { code: "es", label: "Español",   flag: "🇪🇸" },
  { code: "zh", label: "中文",       flag: "🇨🇳" },
  { code: "ar", label: "العربية",   flag: "🇸🇦" },
  { code: "ja", label: "日本語",     flag: "🇯🇵" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
];

/* ─────────────────────────────────────────────────────────
   Navbar
───────────────────────────────────────────────────────── */
export default function Navbar() {
  /* Auth */
  const { user, signOut } = useAuth();

  /* UI state */
  const rootRef             = useRef<HTMLDivElement>(null);
  const searchRef           = useRef<HTMLInputElement>(null);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeHref,  setActiveHref]  = useState("/");
  const [scrolled,    setScrolled]    = useState(false);
  const [langOpen,    setLangOpen]    = useState(false);
  const [activeLang,  setActiveLang]  = useState(
    () => localStorage.getItem("i18nLang") ?? "en"
  );
  const [showAuthModal, setShowAuthModal] = useState(false);

  const currentLang = LANGUAGES.find((l) => l.code === activeLang) ?? LANGUAGES[0];

  /* Close lang dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* Scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Focus search input when opened */
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  /* Language change — persists to localStorage,
     sets html dir for RTL (Arabic) */
  const handleLangChange = (code: string) => {
    setActiveLang(code);
    setLangOpen(false);
    localStorage.setItem("i18nLang", code);
    document.documentElement.setAttribute("lang", code);
    document.documentElement.setAttribute(
      "dir",
      code === "ar" ? "rtl" : "ltr"
    );
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .nav-root {
          font-family: 'DM Sans', sans-serif;
          position: sticky; top: 0; z-index: 100; width: 100%;
          background: rgba(236,236,236,0.88);
          backdrop-filter: blur(18px) saturate(1.4);
          -webkit-backdrop-filter: blur(18px) saturate(1.4);
          border-bottom: 1px solid rgba(0,0,0,0.07);
          transition: box-shadow 0.3s ease;
        }
        .nav-root.scrolled { box-shadow: 0 4px 32px rgba(0,0,0,0.08); }

        .nav-inner {
          max-width: 1280px; margin: 0 auto;
          display: flex; align-items: center;
          height: 60px; padding: 0 28px;
        }

        /* Logo */
        .nav-logo {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, #c8c8c8, #a0a0a0);
          flex-shrink: 0; cursor: pointer;
          transition: transform 0.2s ease;
          box-shadow: inset 0 2px 4px rgba(255,255,255,0.5);
        }
        .nav-logo:hover { transform: scale(1.07); }

        /* Search */
        .nav-search {
          display: flex; align-items: center; gap: 6px;
          margin-left: 14px; cursor: pointer; padding: 6px 12px;
          border-radius: 20px; transition: background 0.18s;
          color: #555; flex-shrink: 0;
        }
        .nav-search:hover { background: rgba(0,0,0,0.06); }
        .search-icon { width: 15px; height: 15px; stroke: #666; flex-shrink: 0; }
        .search-label { font-size: 13.5px; color: #888; white-space: nowrap; }

        .search-input-wrap {
          display: flex; align-items: center; gap: 8px;
          margin-left: 14px; background: rgba(0,0,0,0.06);
          border-radius: 20px; padding: 6px 14px; width: 200px;
        }
        .search-input {
          border: none; background: transparent; outline: none;
          font-family: 'DM Sans', sans-serif; font-size: 13.5px;
          color: #333; width: 100%;
        }
        .search-input::placeholder { color: #aaa; }
        .search-close {
          border: none; background: none; cursor: pointer;
          color: #999; font-size: 15px; padding: 0; transition: color 0.15s;
        }
        .search-close:hover { color: #444; }

        .nav-spacer { flex: 1; }

        /* Nav links */
        .nav-links { display: flex; align-items: center; gap: 4px; list-style: none; }
        .nav-link {
          position: relative; font-size: 14px; font-weight: 400; color: #555;
          text-decoration: none; padding: 6px 13px; border-radius: 20px;
          transition: color 0.18s, background 0.18s; cursor: pointer;
        }
        .nav-link:hover  { color: #111; background: rgba(0,0,0,0.05); }
        .nav-link.active { color: #111; font-weight: 500; }
        .nav-link.active::after {
          content: ''; position: absolute; bottom: 2px; left: 50%;
          transform: translateX(-50%);
          width: 18px; height: 2px; border-radius: 2px; background: #333;
        }

        /* Auth */
        .nav-auth { display: flex; align-items: center; gap: 8px; margin-left: 16px; flex-shrink: 0; }
        .nav-user-email {
          font-size: 12px; color: #555; max-width: 140px;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .btn-login {
          font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 400;
          color: #555; background: none; border: none; cursor: pointer;
          padding: 6px 12px; border-radius: 20px; transition: background 0.18s, color 0.18s;
        }
        .btn-login:hover { background: rgba(0,0,0,0.05); color: #111; }
        .btn-signup {
          font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 500;
          color: #fff; background: #3a3a3a; border: none; cursor: pointer;
          padding: 7px 20px; border-radius: 20px;
          transition: background 0.2s, transform 0.15s;
        }
        .btn-signup:hover { background: #111; transform: translateY(-1px); }

        /* Language selector */
        .lang-wrap { position: relative; margin-left: 12px; flex-shrink: 0; }
        .lang-trigger {
          display: flex; align-items: center; gap: 6px;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
          color: #444; background: rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.08); border-radius: 20px;
          padding: 5px 12px; cursor: pointer; transition: background 0.18s;
          white-space: nowrap;
        }
        .lang-trigger:hover { background: rgba(0,0,0,0.09); }
        .lang-flag { font-size: 16px; line-height: 1; }
        .lang-code { font-size: 12px; letter-spacing: 0.04em; text-transform: uppercase; }
        .lang-chevron {
          width: 10px; height: 6px; fill: none; stroke: #666;
          stroke-width: 1.5; stroke-linecap: round;
          transition: transform 0.2s ease;
        }
        .lang-chevron.open { transform: rotate(180deg); }
        .lang-dropdown {
          position: absolute; top: calc(100% + 8px); right: 0;
          background: #fff; border: 1px solid rgba(0,0,0,0.1);
          border-radius: 14px; box-shadow: 0 12px 40px rgba(0,0,0,0.12);
          padding: 6px; min-width: 170px; z-index: 200;
          animation: langFadeIn 0.15s ease;
        }
        @keyframes langFadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .lang-option {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 12px; border-radius: 9px; cursor: pointer;
          transition: background 0.15s; font-size: 13.5px; color: #333;
        }
        .lang-option:hover    { background: rgba(0,0,0,0.05); }
        .lang-option.selected { background: rgba(0,0,0,0.06); font-weight: 600; }
        .lang-option-flag  { font-size: 18px; line-height: 1; }
        .lang-option-label { flex: 1; }
        .lang-option-check { font-size: 12px; color: #3a3a3a; }

        /* RTL support */
        [dir="rtl"] .nav-inner       { flex-direction: row-reverse; }
        [dir="rtl"] .nav-search      { margin-left: 0; margin-right: 14px; }
        [dir="rtl"] .search-input-wrap{ margin-left: 0; margin-right: 14px; }
        [dir="rtl"] .nav-auth        { margin-left: 0; margin-right: 16px; }
        [dir="rtl"] .lang-wrap       { margin-left: 0; margin-right: 12px; }
        [dir="rtl"] .lang-dropdown   { right: auto; left: 0; }

        /* Mobile */
        @media (max-width: 768px) {
          .nav-links  { display: none; }
          .search-label { display: none; }
          .nav-auth   { margin-left: 8px; }
          .lang-code  { display: none; }
        }
      `}</style>

      <nav
        ref={rootRef}
        className={`nav-root${scrolled ? " scrolled" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="nav-inner">

          {/* Logo */}
          <div className="nav-logo" aria-label="Brand logo" />

          {/* Search */}
          {searchOpen ? (
            <div className="search-input-wrap">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                ref={searchRef}
                className="search-input"
                type="text"
                placeholder="Search…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
              />
              <button
                className="search-close"
                onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
              >✕</button>
            </div>
          ) : (
            <div
              className="nav-search"
              onClick={() => setSearchOpen(true)}
              role="button"
              aria-label="Open search"
            >
              <svg className="search-icon" viewBox="0 0 24 24" fill="none"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <span className="search-label">Search UI</span>
            </div>
          )}

          <div className="nav-spacer" />

          {/* Nav links */}
          <ul className="nav-links">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`nav-link${activeHref === href ? " active" : ""}`}
                  onClick={(e) => {
                    if (href === "#") e.preventDefault();
                    setActiveHref(href);
                  }}
                  aria-current={activeHref === href ? "page" : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Auth buttons */}
          <div className="nav-auth">
            {user ? (
              <>
                <span className="nav-user-email">{user.email}</span>
                <button className="btn-login" onClick={signOut}>Log out</button>
              </>
            ) : (
              <>
                <button
                  className="btn-login"
                  onClick={() => setShowAuthModal(true)}
                >
                  Log in
                </button>
                <button
                  className="btn-signup"
                  onClick={() => setShowAuthModal(true)}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Language selector */}
          <div className="lang-wrap">
            <button
              className="lang-trigger"
              onClick={() => setLangOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label="Select language"
            >
              <span className="lang-flag">{currentLang.flag}</span>
              <span className="lang-code">{currentLang.code}</span>
              <svg
                className={`lang-chevron${langOpen ? " open" : ""}`}
                viewBox="0 0 10 6"
              >
                <path d="M1 1l4 4 4-4"/>
              </svg>
            </button>

            {langOpen && (
              <div className="lang-dropdown" role="listbox">
                {LANGUAGES.map((lang) => (
                  <div
                    key={lang.code}
                    className={`lang-option${activeLang === lang.code ? " selected" : ""}`}
                    role="option"
                    aria-selected={activeLang === lang.code}
                    onClick={() => handleLangChange(lang.code)}
                  >
                    <span className="lang-option-flag">{lang.flag}</span>
                    <span className="lang-option-label">{lang.label}</span>
                    {activeLang === lang.code && (
                      <span className="lang-option-check">✓</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </nav>

      {/* Auth modal — rendered inline, no lazy import needed */}
      {showAuthModal && (
        <AuthModalInline onClose={() => setShowAuthModal(false)} />
      )}
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   Inline auth modal — self-contained, no external deps
   Replace this with your real AuthModal component once
   Supabase is confirmed working
───────────────────────────────────────────────────────── */
function AuthModalInline({ onClose }: { onClose: () => void }) {
  const [mode,     setMode]     = useState<"login" | "signup">("login");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState<string | null>(null);
  const [message,  setMessage]  = useState<string | null>(null);
  const [busy,     setBusy]     = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setMessage(null);
    setBusy(true);

    try {
      const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
      const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

      if (!url || !key) {
        setError("Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.");
        setBusy(false);
        return;
      }

      const { createClient } = await import("@supabase/supabase-js");
      const client = createClient(url, key);

      if (mode === "signup") {
        const { error } = await client.auth.signUp({ email, password });
        if (error) setError(error.message);
        else setMessage("Check your email for a confirmation link.");
      } else {
        const { error } = await client.auth.signInWithPassword({ email, password });
        if (error) setError(error.message);
        else onClose();
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "An unexpected error occurred.");
    }

    setBusy(false);
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 999, padding: 20,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff", borderRadius: 18, padding: "40px 36px",
          width: "100%", maxWidth: 400, position: "relative",
          boxShadow: "0 24px 80px rgba(0,0,0,0.18)",
          fontFamily: "'DM Sans', sans-serif",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 16,
            background: "none", border: "none", cursor: "pointer",
            fontSize: 18, color: "#888", lineHeight: 1,
          }}
        >✕</button>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, marginBottom: 28,
          borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(null); setMessage(null); }}
              style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                fontWeight: mode === m ? 600 : 400,
                color: mode === m ? "#1a1a1a" : "#888",
                background: "none", border: "none",
                borderBottom: mode === m ? "2px solid #1a1a1a" : "2px solid transparent",
                padding: "0 4px 12px", marginRight: 20, cursor: "pointer",
                transition: "color 0.15s",
              }}
            >
              {m === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Inputs */}
        {["email", "password"].map((field) => (
          <input
            key={field}
            type={field}
            placeholder={field === "email" ? "Email address" : "Password"}
            value={field === "email" ? email : password}
            onChange={(e) =>
              field === "email"
                ? setEmail(e.target.value)
                : setPassword(e.target.value)
            }
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            style={{
              display: "block", width: "100%", marginBottom: 12,
              padding: "11px 14px", fontFamily: "'DM Sans', sans-serif",
              fontSize: 14, border: "1.5px solid rgba(0,0,0,0.12)",
              borderRadius: 10, outline: "none", color: "#333",
              boxSizing: "border-box",
            }}
          />
        ))}

        {error   && <p style={{ fontSize: 12, color: "#c0392b", margin: "8px 0" }}>{error}</p>}
        {message && <p style={{ fontSize: 12, color: "#27ae60", margin: "8px 0" }}>{message}</p>}

        <button
          onClick={handleSubmit}
          disabled={busy}
          style={{
            width: "100%", marginTop: 8,
            fontFamily: "'DM Sans', sans-serif", fontSize: 13,
            fontWeight: 600, letterSpacing: "0.08em",
            color: "#fff", background: busy ? "#aaa" : "#1a1814",
            border: "none", borderRadius: 10, padding: "12px 0",
            cursor: busy ? "not-allowed" : "pointer",
            transition: "background 0.18s",
          }}
        >
          {busy ? "Please wait…" : mode === "login" ? "Log In" : "Create Account"}
        </button>
      </div>
    </div>
  );
}