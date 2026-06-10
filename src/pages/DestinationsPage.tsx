import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import AttractionCard from "../components/AttractionCard";
import {
  DESTINATIONS,
  COUNTRIES,
  getCitiesByCountry,
  CITY_COORDINATES,
} from "../data/destinations";
import type { City, Attraction } from "../data/destinations";
import EventsSection     from "../components/EventsSection";
import RestaurantsSection from "../components/RestaurantsSection";

/* ─────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────── */
interface DestinationsPageProps {
  isAuthenticated: boolean;
  onLoginRequest: () => void;
  initialCountry?: string;
}

type Theme    = "ace" | "queen" | "king";
type SortOrder = "default" | "rating-desc" | "alpha-asc" | "alpha-desc";
type MinRating = "any" | "3" | "4" | "4.5";

const THEMES: Theme[] = ["ace", "queen", "king"];

const ATTRACTION_CATEGORIES = [
  "Nature", "Culture", "Architecture", "Food",
  "History", "Adventure", "Art", "Wellness",
] as const;
type AttractionCategory = typeof ATTRACTION_CATEGORIES[number];

const CATEGORY_COLOURS: Record<AttractionCategory, { bg: string; text: string }> = {
  Nature:       { bg: "#e8f5e9", text: "#2e7d32" },
  Culture:      { bg: "#fff3e0", text: "#e65100" },
  Architecture: { bg: "#e3f2fd", text: "#1565c0" },
  Food:         { bg: "#fce4ec", text: "#c62828" },
  History:      { bg: "#f3e5f5", text: "#6a1b9a" },
  Adventure:    { bg: "#e0f2f1", text: "#00695c" },
  Art:          { bg: "#fff8e1", text: "#f57f17" },
  Wellness:     { bg: "#e8eaf6", text: "#283593" },
};

/* ─────────────────────────────────────────────────────────
   Theme metadata
───────────────────────────────────────────────────────── */
const THEME_META: Record<Theme, {
  label: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  bg: string;
  headingColor: string;
  accentColor: string;
  selectBorder: string;
  pillActiveBg: string;
  pillActiveText: string;
  chipBg: string;
  chipText: string;
}> = {
  ace: {
    label: "Selective Ace",
    eyebrow: "CRYSTAL DESTINATIONS",
    headline: "Where Precision Meets Wonder",
    subheadline: "Discover the world's most extraordinary places, curated for the discerning traveller.",
    bg: "linear-gradient(160deg, #0d1b2e 0%, #142540 60%, #0a1628 100%)",
    headingColor: "#e8f0ff",
    accentColor: "#a8c4e8",
    selectBorder: "rgba(168,196,232,0.35)",
    pillActiveBg: "#1a3060",
    pillActiveText: "#e8f0ff",
    chipBg: "rgba(26,48,96,0.12)",
    chipText: "#1a3060",
  },
  queen: {
    label: "Refined Queen",
    eyebrow: "ROSE GOLD JOURNEYS",
    headline: "Travel with Grace & Intention",
    subheadline: "Handpicked destinations woven in elegance, for those who seek beauty in every detail.",
    bg: "linear-gradient(160deg, #f5e6d8 0%, #ecdac8 60%, #e4cdb8 100%)",
    headingColor: "#3a1a08",
    accentColor: "#8a5a35",
    selectBorder: "rgba(138,90,53,0.3)",
    pillActiveBg: "#8a5a35",
    pillActiveText: "#fff",
    chipBg: "rgba(138,90,53,0.12)",
    chipText: "#8a5a35",
  },
  king: {
    label: "Authoritative King",
    eyebrow: "SOVEREIGN EXPEDITIONS",
    headline: "Command Every Horizon",
    subheadline: "The world's most commanding destinations — for those who conquer every room they enter.",
    bg: "linear-gradient(160deg, #141008 0%, #1e180a 60%, #141008 100%)",
    headingColor: "#f0e6c8",
    accentColor: "#c8a84b",
    selectBorder: "rgba(200,168,75,0.35)",
    pillActiveBg: "#c8a84b",
    pillActiveText: "#141008",
    chipBg: "rgba(200,168,75,0.15)",
    chipText: "#8a6a20",
  },
};

/* ─────────────────────────────────────────────────────────
   Active filter chip component
───────────────────────────────────────────────────────── */
function FilterChip({
  label,
  onRemove,
  bg,
  color,
}: {
  label: string;
  onRemove: () => void;
  bg: string;
  color: string;
}) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: bg, color, fontSize: 12, fontWeight: 500,
      borderRadius: 20, padding: "4px 10px 4px 12px",
      fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.02em",
    }}>
      {label}
      <button
        onClick={onRemove}
        style={{
          background: "none", border: "none", cursor: "pointer",
          color, fontSize: 14, lineHeight: 1, padding: 0,
          display: "flex", alignItems: "center",
        }}
        aria-label={`Remove ${label} filter`}
      >×</button>
    </span>
  );
}

/* ─────────────────────────────────────────────────────────
   Main page
───────────────────────────────────────────────────────── */
export default function DestinationsPage({
  isAuthenticated,
  onLoginRequest,
  initialCountry,
}: DestinationsPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  /* ── Read initial state from URL params ── */
  const [activeTheme,      setActiveTheme]      = useState<Theme>(
    (searchParams.get("tier") as Theme) ?? "ace"
  );
  const [selectedCountry,  setSelectedCountry]  = useState(
    searchParams.get("country") ?? initialCountry ?? "All"
  );
  const [selectedCity,     setSelectedCity]     = useState(
    searchParams.get("city") ?? "All"
  );
  const [selectedCategories, setSelectedCategories] = useState<AttractionCategory[]>(
    () => {
      const raw = searchParams.get("categories");
      return raw ? (raw.split(",") as AttractionCategory[]) : [];
    }
  );
  const [minRating,  setMinRating]  = useState<MinRating>(
    (searchParams.get("minRating") as MinRating) ?? "any"
  );
  const [sortOrder,  setSortOrder]  = useState<SortOrder>(
    (searchParams.get("sort") as SortOrder) ?? "default"
  );
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const meta = THEME_META[activeTheme];

  /* ── Sync state changes back to URL ── */
  const syncParams = useCallback((updates: Record<string, string>) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      Object.entries(updates).forEach(([k, v]) => {
        if (v && v !== "All" && v !== "any" && v !== "default") {
          next.set(k, v);
        } else {
          next.delete(k);
        }
      });
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  /* ── City options derived from country ── */
  const cityOptions: City[] = useMemo(() => {
    if (selectedCountry === "All") return [];
    return getCitiesByCountry(selectedCountry);
  }, [selectedCountry]);

  /* ── All attractions flat list for filtering ── */
  const allAttractions: Array<Attraction & { cityName: string; country: string; cityId: string }> =
    useMemo(() => {
      const citiesInScope =
        selectedCountry === "All"
          ? DESTINATIONS
          : DESTINATIONS.filter((d) => d.country === selectedCountry);

      const citiesFiltered =
        selectedCity === "All"
          ? citiesInScope
          : citiesInScope.filter((d) => d.id === selectedCity);

      return citiesFiltered.flatMap((city) =>
        city.attractions.map((a) => ({
          ...a,
          cityName: city.name,
          country: city.country,
          cityId: city.id,
        }))
      );
    }, [selectedCountry, selectedCity]);

  /* ── Apply category, rating and sort filters ── */
  const filteredAttractions = useMemo(() => {
    let results = [...allAttractions];

    if (selectedCategories.length > 0) {
      results = results.filter((a) =>
        selectedCategories.includes(a.category as AttractionCategory)
      );
    }

    if (minRating !== "any") {
      const threshold = parseFloat(minRating);
      results = results.filter((a) => a.rating >= threshold);
    }

    switch (sortOrder) {
      case "rating-desc":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "alpha-asc":
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "alpha-desc":
        results.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return results;
  }, [allAttractions, selectedCategories, minRating, sortOrder]);

  /* ── Group filtered attractions back by city for display ── */
  const groupedByCityId = useMemo(() => {
    const map = new Map<string, {
      cityName: string;
      country: string;
      attractions: typeof filteredAttractions;
    }>();
    filteredAttractions.forEach((a) => {
      if (!map.has(a.cityId)) {
        map.set(a.cityId, { cityName: a.cityName, country: a.country, attractions: [] });
      }
      map.get(a.cityId)!.attractions.push(a);
    });
    return Array.from(map.entries());
  }, [filteredAttractions]);

  const totalShowing  = filteredAttractions.length;

  /* Derive city name + country code + coords for Events & Restaurants sections */
  const activeCityObj = selectedCity !== "All"
    ? DESTINATIONS.find((d) => d.id === selectedCity)
    : groupedByCityId.length === 1
      ? DESTINATIONS.find((d) => d.id === groupedByCityId[0][0]) ?? null
      : null;

  const activeCityName    = activeCityObj?.name ?? "";
  const activeCountryCode = activeCityObj?.countryCode ?? "";
  const activeCoords      = activeCityObj
    ? (CITY_COORDINATES[activeCityObj.id] ?? null)
    : null;
  const totalPossible = allAttractions.length;
  const hasActiveFilters =
    selectedCountry !== "All" ||
    selectedCity !== "All" ||
    selectedCategories.length > 0 ||
    minRating !== "any" ||
    sortOrder !== "default";

  /* ── Handlers ── */
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setSelectedCity("All");
    syncParams({ country, city: "All" });
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    syncParams({ city });
  };

  const toggleCategory = (cat: AttractionCategory) => {
    const next = selectedCategories.includes(cat)
      ? selectedCategories.filter((c) => c !== cat)
      : [...selectedCategories, cat];
    setSelectedCategories(next);
    syncParams({ categories: next.join(",") });
  };

  const handleMinRating = (val: MinRating) => {
    setMinRating(val);
    syncParams({ minRating: val });
  };

  const handleSort = (val: SortOrder) => {
    setSortOrder(val);
    syncParams({ sort: val });
  };

  const handleThemeChange = (t: Theme) => {
    setActiveTheme(t);
    syncParams({ tier: t });
  };

  const clearAll = () => {
    setSelectedCountry("All");
    setSelectedCity("All");
    setSelectedCategories([]);
    setMinRating("any");
    setSortOrder("default");
    setSearchParams({}, { replace: true });
  };

  /* ── Active chips for display ── */
  const activeChips: Array<{ label: string; onRemove: () => void }> = [
    ...(selectedCountry !== "All"
      ? [{ label: selectedCountry, onRemove: () => handleCountryChange("All") }]
      : []),
    ...(selectedCity !== "All"
      ? [{
          label: cityOptions.find((c) => c.id === selectedCity)?.name ?? selectedCity,
          onRemove: () => handleCityChange("All"),
        }]
      : []),
    ...selectedCategories.map((cat) => ({
      label: cat,
      onRemove: () => toggleCategory(cat),
    })),
    ...(minRating !== "any"
      ? [{ label: `${minRating}★+`, onRemove: () => handleMinRating("any") }]
      : []),
  ];

  /* ── Select styles shared ── */
  const selectStyle: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13, fontWeight: 500, color: "#333",
    background: "#fff",
    border: `1.5px solid ${meta.selectBorder}`,
    borderRadius: 10, padding: "8px 36px 8px 14px",
    appearance: "none" as const, cursor: "pointer", outline: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23666' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
    minWidth: 150,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .dp-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #eaeaea;
        }

        /* ── Centred container ── */
        .dp-centre {
          max-width: 960px;
          margin: 0 auto;
          padding: 0 40px;
        }

        /* ── Theme tabs — full width strip, centred inner ── */
        .dp-tabs-strip {
          background: #eaeaea;
          border-bottom: 1px solid rgba(0,0,0,0.08);
          position: sticky;
          top: 60px;
          z-index: 90;
        }
        .dp-tabs-inner {
          max-width: 960px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          gap: 0;
        }
        .dp-tab {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 600; letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 14px 24px;
          border: none; background: none; cursor: pointer;
          color: #888; border-bottom: 2px solid transparent;
          transition: color 0.18s, border-color 0.18s;
          white-space: nowrap;
        }
        .dp-tab.active-ace   { color: #1a3060; border-color: #1a3060; }
        .dp-tab.active-queen { color: #8a5a35; border-color: #8a5a35; }
        .dp-tab.active-king  { color: #c8a84b; border-color: #c8a84b; }

        /* ── Hero banner ── */
        .dp-hero-wrap { width: 100%; }
        .dp-hero {
          max-width: 960px;
          margin: 0 auto;
          padding: 56px 40px 44px;
        }
        .dp-eyebrow {
          font-size: 11px; font-weight: 600; letter-spacing: 0.22em;
          text-transform: uppercase; margin-bottom: 12px;
        }
        .dp-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 46px; font-weight: 500; line-height: 1.15;
          margin: 0 0 14px;
        }
        .dp-subheadline {
          font-size: 15px; font-weight: 300; line-height: 1.65;
          margin: 0; max-width: 560px;
        }

        /* ── Filter panel ── */
        .dp-filter-panel {
          background: rgba(255,255,255,0.55);
          border-top: 1px solid rgba(0,0,0,0.06);
          border-bottom: 1px solid rgba(0,0,0,0.06);
          padding: 20px 0;
        }
        .dp-filter-row {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          flex-wrap: wrap;
        }
        .dp-filter-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .dp-filter-group-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: #999;
        }
        .dp-filter-group-row {
          display: flex; gap: 6px; flex-wrap: wrap; align-items: center;
        }

        /* Category pills */
        .dp-cat-pill {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 600; letter-spacing: 0.04em;
          border-radius: 20px; padding: 5px 12px;
          cursor: pointer; border: 1.5px solid transparent;
          transition: all 0.18s ease;
          white-space: nowrap;
        }
        .dp-cat-pill:hover { opacity: 0.85; transform: translateY(-1px); }

        /* Rating segments */
        .dp-rating-seg {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 600;
          padding: 5px 12px; border-radius: 20px;
          cursor: pointer; border: 1.5px solid rgba(0,0,0,0.12);
          background: #fff; color: #555; transition: all 0.18s;
          white-space: nowrap;
        }
        .dp-rating-seg:hover { border-color: rgba(0,0,0,0.25); }
        .dp-rating-seg.active {
          border-color: transparent; color: #fff;
        }

        /* Mobile filter button */
        .dp-filter-mobile-btn {
          display: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 600;
          background: #fff; border: 1.5px solid rgba(0,0,0,0.14);
          border-radius: 10px; padding: 9px 18px;
          cursor: pointer; align-items: center; gap: 8px;
        }
        .dp-filter-badge {
          background: #1a1a1a; color: #fff;
          font-size: 10px; font-weight: 700;
          border-radius: 10px; padding: 1px 6px;
        }

        /* Slide-up drawer */
        .dp-drawer-overlay {
          display: none;
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.35);
          z-index: 300;
        }
        .dp-drawer {
          position: fixed; bottom: 0; left: 0; right: 0;
          background: #fff; border-radius: 20px 20px 0 0;
          padding: 28px 24px 40px;
          z-index: 301;
          max-height: 85vh; overflow-y: auto;
          animation: drawerUp 0.28s ease;
        }
        @keyframes drawerUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        .dp-drawer-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 500; margin-bottom: 20px;
        }
        .dp-drawer-close {
          position: absolute; top: 20px; right: 20px;
          background: none; border: none; font-size: 20px;
          cursor: pointer; color: #888;
        }

        /* Active filter chips */
        .dp-chips-row {
          display: flex; gap: 8px; flex-wrap: wrap;
          margin-top: 12px; align-items: center;
        }
        .dp-clear-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 600; color: #888;
          background: none; border: none; cursor: pointer;
          text-decoration: underline; padding: 0;
          transition: color 0.15s;
        }
        .dp-clear-btn:hover { color: #333; }

        /* ── Results bar ── */
        .dp-results-bar {
          display: flex; align-items: center;
          justify-content: space-between;
          padding: 16px 0 4px;
        }
        .dp-results-count {
          font-size: 12px; color: #888; font-weight: 400;
        }
        .dp-results-count strong { color: #333; font-weight: 600; }

        /* ── Content area ── */
        .dp-content { padding: 32px 0 60px; }

        /* City section */
        .dp-city-section { margin-bottom: 52px; }
        .dp-city-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px; font-weight: 500;
          margin: 0 0 4px; color: #1a1a1a;
        }
        .dp-city-country {
          font-size: 11px; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; color: #aaa;
        }
        .dp-city-divider {
          height: 1px; background: rgba(0,0,0,0.07);
          margin: 12px 0 24px;
        }

        /* Cards grid — fixed 280px cards, max 3 columns */
        .dp-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 280px);
          gap: 20px;
          justify-content: start;
        }

        /* Empty state */
        .dp-empty {
          text-align: center; padding: 80px 0;
          color: #aaa; font-size: 15px;
        }
        .dp-empty-icon { font-size: 48px; margin-bottom: 16px; display: block; }

        .dp-city-section + .dp-city-section {
          border-top: 1px solid rgba(0,0,0,0.06);
          padding-top: 44px;
        }

        /* ── Responsive ── */
        @media (max-width: 960px) {
          .dp-cards-grid { grid-template-columns: repeat(2, 280px); }
        }
        @media (max-width: 768px) {
          .dp-centre        { padding: 0 20px; }
          .dp-tabs-inner    { padding: 0 20px; }
          .dp-hero          { padding: 36px 20px 28px; }
          .dp-headline      { font-size: 32px; }
          .dp-filter-panel  { padding: 14px 0; }
          .dp-filter-row    { display: none; }
          .dp-filter-mobile-btn { display: flex; }
          .dp-drawer-overlay.open { display: block; }
          .dp-cards-grid    { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .dp-cards-grid { grid-template-columns: 1fr; }
          .dp-tab { padding: 12px 14px; font-size: 10px; }
        }
      `}</style>

      <div className="dp-root">

        {/* ── Theme tabs — full width ── */}
        <div className="dp-tabs-strip">
          <div className="dp-tabs-inner">
            {THEMES.map((t) => (
              <button
                key={t}
                className={`dp-tab${activeTheme === t ? ` active-${t}` : ""}`}
                onClick={() => handleThemeChange(t)}
              >
                {THEME_META[t].label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Hero banner — full width background, centred content ── */}
        <div className="dp-hero-wrap" style={{ background: meta.bg }}>
          <div className="dp-hero">
            <div className="dp-eyebrow" style={{ color: meta.accentColor }}>
              {meta.eyebrow}
            </div>
            <h1 className="dp-headline" style={{ color: meta.headingColor }}>
              {meta.headline}
            </h1>
            <p className="dp-subheadline" style={{ color: `${meta.headingColor}99` }}>
              {meta.subheadline}
            </p>
          </div>
        </div>

        {/* ── Filter panel ── */}
        <div className="dp-filter-panel">
          <div className="dp-centre">

            {/* Mobile filter button */}
            <button
              className="dp-filter-mobile-btn"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span>Filters</span>
              {(selectedCategories.length + (minRating !== "any" ? 1 : 0) + (selectedCountry !== "All" ? 1 : 0)) > 0 && (
                <span className="dp-filter-badge">
                  {selectedCategories.length + (minRating !== "any" ? 1 : 0) + (selectedCountry !== "All" ? 1 : 0)}
                </span>
              )}
            </button>

            {/* Desktop filter rows */}
            <div className="dp-filter-row">

              {/* Country + City */}
              <div className="dp-filter-group">
                <span className="dp-filter-group-label">Location</span>
                <div className="dp-filter-group-row">
                  <select
                    value={selectedCountry}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    style={selectStyle}
                    aria-label="Select country"
                  >
                    <option value="All">All Countries</option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <select
                    value={selectedCity}
                    onChange={(e) => handleCityChange(e.target.value)}
                    disabled={selectedCountry === "All"}
                    style={{
                      ...selectStyle,
                      opacity: selectedCountry === "All" ? 0.4 : 1,
                    }}
                    aria-label="Select city"
                  >
                    <option value="All">All Cities</option>
                    {cityOptions.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Category pills */}
              <div className="dp-filter-group">
                <span className="dp-filter-group-label">Category</span>
                <div className="dp-filter-group-row">
                  {ATTRACTION_CATEGORIES.map((cat) => {
                    const isActive = selectedCategories.includes(cat);
                    const colours  = CATEGORY_COLOURS[cat];
                    return (
                      <button
                        key={cat}
                        className="dp-cat-pill"
                        onClick={() => toggleCategory(cat)}
                        style={isActive
                          ? { background: colours.text, color: "#fff", borderColor: colours.text }
                          : { background: colours.bg, color: colours.text, borderColor: colours.bg }
                        }
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Min rating */}
              <div className="dp-filter-group">
                <span className="dp-filter-group-label">Min Rating</span>
                <div className="dp-filter-group-row">
                  {(["any", "3", "4", "4.5"] as MinRating[]).map((val) => (
                    <button
                      key={val}
                      className={`dp-rating-seg${minRating === val ? " active" : ""}`}
                      onClick={() => handleMinRating(val)}
                      style={minRating === val
                        ? { background: meta.pillActiveBg, color: meta.pillActiveText, borderColor: "transparent" }
                        : {}
                      }
                    >
                      {val === "any" ? "Any" : `${val}★+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="dp-filter-group" style={{ marginLeft: "auto" }}>
                <span className="dp-filter-group-label">Sort by</span>
                <div className="dp-filter-group-row">
                  <select
                    value={sortOrder}
                    onChange={(e) => handleSort(e.target.value as SortOrder)}
                    style={{ ...selectStyle, minWidth: 160 }}
                    aria-label="Sort order"
                  >
                    <option value="default">Default</option>
                    <option value="rating-desc">Highest Rated</option>
                    <option value="alpha-asc">A → Z</option>
                    <option value="alpha-desc">Z → A</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active filter chips */}
            {activeChips.length > 0 && (
              <div className="dp-chips-row">
                {activeChips.map((chip) => (
                  <FilterChip
                    key={chip.label}
                    label={chip.label}
                    onRemove={chip.onRemove}
                    bg={meta.chipBg}
                    color={meta.chipText}
                  />
                ))}
                {hasActiveFilters && (
                  <button className="dp-clear-btn" onClick={clearAll}>
                    Clear all
                  </button>
                )}
              </div>
            )}

          </div>
        </div>

        {/* ── Main content ── */}
        <div className="dp-centre">
          {/* Results count bar */}
          <div className="dp-results-bar">
            <span className="dp-results-count">
              Showing <strong>{totalShowing}</strong> of{" "}
              <strong>{totalPossible}</strong> attraction
              {totalPossible !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="dp-content">
            {groupedByCityId.length === 0 ? (
              <div className="dp-empty">
                <span className="dp-empty-icon">🗺️</span>
                No attractions match your filters.
                {hasActiveFilters && (
                  <div style={{ marginTop: 12 }}>
                    <button
                      onClick={clearAll}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 13, fontWeight: 600,
                        color: "#fff", background: "#1a1814",
                        border: "none", borderRadius: 20,
                        padding: "9px 22px", cursor: "pointer",
                      }}
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
            ) : (
              groupedByCityId.map(([cityId, group]) => (
                <div key={cityId} className="dp-city-section">
                  <h2 className="dp-city-name">{group.cityName}</h2>
                  <span className="dp-city-country">{group.country}</span>
                  <div className="dp-city-divider" />
                  <div className="dp-cards-grid">
                    {group.attractions.map((attraction) => (
                      <AttractionCard
                        key={attraction.id}
                        attraction={attraction}
                        isAuthenticated={isAuthenticated}
                        onLoginRequest={onLoginRequest}
                        theme={activeTheme}
                      />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ── Events section (shown when a city is selected) ── */}
        {activeCityName && (
          <EventsSection
            cityName={activeCityName}
            countryCode={activeCountryCode}
            theme={activeTheme}
          />
        )}

        {/* ── Restaurants section ── */}
        <RestaurantsSection
          cityId={activeCityObj?.id ?? "default"}
          cityName={activeCityName}
          coords={activeCoords}
          theme={activeTheme}
        />

      </div>

      {/* ── Mobile filter drawer ── */}
      <div
        className={`dp-drawer-overlay${mobileFiltersOpen ? " open" : ""}`}
        onClick={() => setMobileFiltersOpen(false)}
      />
      {mobileFiltersOpen && (
        <div className="dp-drawer">
          <button
            className="dp-drawer-close"
            onClick={() => setMobileFiltersOpen(false)}
          >✕</button>
          <h3 className="dp-drawer-heading">Filters</h3>

          {/* Location */}
          <div style={{ marginBottom: 20 }}>
            <div className="dp-filter-group-label" style={{ marginBottom: 8 }}>Location</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <select
                value={selectedCountry}
                onChange={(e) => handleCountryChange(e.target.value)}
                style={{ ...selectStyle, width: "100%" }}
              >
                <option value="All">All Countries</option>
                {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <select
                value={selectedCity}
                onChange={(e) => handleCityChange(e.target.value)}
                disabled={selectedCountry === "All"}
                style={{ ...selectStyle, width: "100%", opacity: selectedCountry === "All" ? 0.4 : 1 }}
              >
                <option value="All">All Cities</option>
                {cityOptions.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>

          {/* Categories */}
          <div style={{ marginBottom: 20 }}>
            <div className="dp-filter-group-label" style={{ marginBottom: 8 }}>Category</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {ATTRACTION_CATEGORIES.map((cat) => {
                const isActive = selectedCategories.includes(cat);
                const colours  = CATEGORY_COLOURS[cat];
                return (
                  <button
                    key={cat}
                    className="dp-cat-pill"
                    onClick={() => toggleCategory(cat)}
                    style={isActive
                      ? { background: colours.text, color: "#fff", borderColor: colours.text }
                      : { background: colours.bg, color: colours.text, borderColor: colours.bg }
                    }
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Min Rating */}
          <div style={{ marginBottom: 20 }}>
            <div className="dp-filter-group-label" style={{ marginBottom: 8 }}>Minimum Rating</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {(["any", "3", "4", "4.5"] as MinRating[]).map((val) => (
                <button
                  key={val}
                  className={`dp-rating-seg${minRating === val ? " active" : ""}`}
                  onClick={() => handleMinRating(val)}
                  style={minRating === val
                    ? { background: meta.pillActiveBg, color: meta.pillActiveText, borderColor: "transparent" }
                    : {}
                  }
                >
                  {val === "any" ? "Any" : `${val}★+`}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div style={{ marginBottom: 28 }}>
            <div className="dp-filter-group-label" style={{ marginBottom: 8 }}>Sort By</div>
            <select
              value={sortOrder}
              onChange={(e) => handleSort(e.target.value as SortOrder)}
              style={{ ...selectStyle, width: "100%" }}
            >
              <option value="default">Default</option>
              <option value="rating-desc">Highest Rated</option>
              <option value="alpha-asc">A → Z</option>
              <option value="alpha-desc">Z → A</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            {hasActiveFilters && (
              <button
                onClick={() => { clearAll(); setMobileFiltersOpen(false); }}
                style={{
                  flex: 1, fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13, fontWeight: 600, color: "#555",
                  background: "none", border: "1.5px solid rgba(0,0,0,0.15)",
                  borderRadius: 10, padding: "11px 0", cursor: "pointer",
                }}
              >
                Clear all
              </button>
            )}
            <button
              onClick={() => setMobileFiltersOpen(false)}
              style={{
                flex: 2, fontFamily: "'DM Sans', sans-serif",
                fontSize: 13, fontWeight: 600, color: "#fff",
                background: "#1a1814", border: "none",
                borderRadius: 10, padding: "11px 0", cursor: "pointer",
              }}
            >
              Show {totalShowing} result{totalShowing !== 1 ? "s" : ""}
            </button>
          </div>
        </div>
      )}
    </>
  );
}