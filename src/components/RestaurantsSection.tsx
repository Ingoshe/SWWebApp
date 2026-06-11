import { useState, useEffect, useCallback, useMemo,} from "react";

/* ── Resolve API key once at module level so it is stable across renders ── */
const _rawKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY as string | undefined;
const GOOGLE_API_KEY: string | null =
  _rawKey && _rawKey !== "undefined" && _rawKey.trim() !== ""
    ? _rawKey.trim()
    : null;
import RestaurantCard, { RestaurantCardSkeleton } from "./RestaurantCard";
import type {
  GooglePlace,
  GooglePlacesResponse,
  CuisineFilter,
  PriceFilter,
  RatingFilter,
  SortRestaurants,
} from "../types/restaurants";
import { PRICE_LEVEL_MAP } from "../types/restaurants";

type Theme = "ace" | "queen" | "king";

interface CityCoords {
  lat: number;
  lng: number;
}

interface RestaurantsSectionProps {
  cityId:    string;
  cityName:  string;
  coords:    CityCoords | null;
  theme:     Theme;
}

/* ─────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────── */
const CUISINE_FILTERS: CuisineFilter[] = [
  "All", "Asian", "Japanese", "Chinese", "Korean", "Thai",
  "Indian", "Middle Eastern", "Mediterranean", "Greek",
  "Italian", "French", "Mexican", "American", "African",
  "Caribbean", "Fusion", "Vegetarian/Vegan", "Seafood",
];

const CUISINE_KEYWORDS: Partial<Record<CuisineFilter, string[]>> = {
  Asian:              ["asian", "pan asian"],
  Japanese:           ["japanese", "sushi", "ramen"],
  Chinese:            ["chinese", "dim sum", "cantonese"],
  Korean:             ["korean", "bbq"],
  Thai:               ["thai"],
  Indian:             ["indian", "curry"],
  "Middle Eastern":   ["middle eastern", "lebanese", "turkish", "persian", "arabic"],
  Mediterranean:      ["mediterranean"],
  Greek:              ["greek"],
  Italian:            ["italian", "pizza", "pasta"],
  French:             ["french", "bistro", "brasserie"],
  Mexican:            ["mexican", "tacos", "tex-mex"],
  American:           ["american", "burger", "diner"],
  African:            ["african"],
  Caribbean:          ["caribbean"],
  Fusion:             ["fusion"],
  "Vegetarian/Vegan": ["vegetarian", "vegan", "plant"],
  Seafood:            ["seafood", "fish"],
};

const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

const THEME_ACCENT: Record<Theme, { pill: string; pillText: string }> = {
  ace:   { pill: "#1a3060", pillText: "#e8f0ff" },
  queen: { pill: "#8a5a35", pillText: "#fff"    },
  king:  { pill: "#c8a84b", pillText: "#141008" },
};

/* ─────────────────────────────────────────────────────────
   Static fallback restaurants (shown when no API key)
───────────────────────────────────────────────────────── */
const FALLBACK_RESTAURANTS: GooglePlace[] = [
  {
    id: "fallback-1",
    displayName: { text: "Le Petit Bistro", languageCode: "en" },
    rating: 4.6,
    userRatingCount: 892,
    priceLevel: "PRICE_LEVEL_MODERATE",
    currentOpeningHours: { openNow: true },
    primaryTypeDisplayName: { text: "French Restaurant", languageCode: "en" },
    googleMapsUri: "https://maps.google.com",
    cuisineType: "French",
    editorialSummary: {
      text: "A charming neighbourhood bistro serving classic French cuisine with a modern twist. Known for their exceptional duck confit and crème brûlée.",
      languageCode: "en",
    },
  },
  {
    id: "fallback-2",
    displayName: { text: "Sakura Japanese Kitchen", languageCode: "en" },
    rating: 4.8,
    userRatingCount: 1240,
    priceLevel: "PRICE_LEVEL_EXPENSIVE",
    currentOpeningHours: { openNow: false },
    primaryTypeDisplayName: { text: "Japanese Restaurant", languageCode: "en" },
    googleMapsUri: "https://maps.google.com",
    cuisineType: "Japanese",
    editorialSummary: {
      text: "Authentic omakase experience with the freshest imported Japanese ingredients. The tasting menu changes daily based on seasonal availability.",
      languageCode: "en",
    },
  },
  {
    id: "fallback-3",
    displayName: { text: "Spice Route", languageCode: "en" },
    rating: 4.5,
    userRatingCount: 654,
    priceLevel: "PRICE_LEVEL_INEXPENSIVE",
    currentOpeningHours: { openNow: true },
    primaryTypeDisplayName: { text: "Indian Restaurant", languageCode: "en" },
    googleMapsUri: "https://maps.google.com",
    cuisineType: "Indian",
    editorialSummary: {
      text: "Vibrant curries and tandoor specialities from across the Indian subcontinent. The butter chicken and garlic naan have a devoted local following.",
      languageCode: "en",
    },
  },
  {
    id: "fallback-4",
    displayName: { text: "Trattoria della Nonna", languageCode: "en" },
    rating: 4.7,
    userRatingCount: 1108,
    priceLevel: "PRICE_LEVEL_MODERATE",
    currentOpeningHours: { openNow: true },
    primaryTypeDisplayName: { text: "Italian Restaurant", languageCode: "en" },
    googleMapsUri: "https://maps.google.com",
    cuisineType: "Italian",
    editorialSummary: {
      text: "Family-run trattoria with handmade pasta and wood-fired pizza. The tiramisu recipe has been passed down through three generations.",
      languageCode: "en",
    },
  },
  {
    id: "fallback-5",
    displayName: { text: "El Fuego Cantina", languageCode: "en" },
    rating: 4.3,
    userRatingCount: 478,
    priceLevel: "PRICE_LEVEL_INEXPENSIVE",
    currentOpeningHours: { openNow: false },
    primaryTypeDisplayName: { text: "Mexican Restaurant", languageCode: "en" },
    googleMapsUri: "https://maps.google.com",
    cuisineType: "Mexican",
    editorialSummary: {
      text: "Street-food inspired Mexican with fresh tortillas pressed to order and slow-cooked birria tacos that attract queues every weekend.",
      languageCode: "en",
    },
  },
  {
    id: "fallback-6",
    displayName: { text: "The Green Bowl", languageCode: "en" },
    rating: 4.4,
    userRatingCount: 392,
    priceLevel: "PRICE_LEVEL_MODERATE",
    currentOpeningHours: { openNow: true },
    primaryTypeDisplayName: { text: "Vegan Restaurant", languageCode: "en" },
    googleMapsUri: "https://maps.google.com",
    cuisineType: "Vegetarian/Vegan",
    editorialSummary: {
      text: "Creative plant-based cuisine that proves vegan food can be indulgent and exciting. The jackfruit tacos and cashew cheesecake are unmissable.",
      languageCode: "en",
    },
  },
];

/* ─────────────────────────────────────────────────────────
   Cache helpers
───────────────────────────────────────────────────────── */
function getCacheKey(cityId: string, cuisine: CuisineFilter): string {
  return `gplaces__${cityId}__${cuisine}`;
}
function readCache(key: string): GooglePlace[] | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw) as { data: GooglePlace[]; ts: number };
    if (Date.now() - ts > CACHE_TTL_MS) { sessionStorage.removeItem(key); return null; }
    return data;
  } catch { return null; }
}
function writeCache(key: string, data: GooglePlace[]): void {
  try { sessionStorage.setItem(key, JSON.stringify({ data, ts: Date.now() })); }
  catch { /* quota exceeded */ }
}

/* ─────────────────────────────────────────────────────────
   Cuisine matching
───────────────────────────────────────────────────────── */
function matchesCuisine(place: GooglePlace, filter: CuisineFilter): boolean {
  if (filter === "All") return true;
  const keywords = CUISINE_KEYWORDS[filter] ?? [];
  const searchIn = [
    place.cuisineType ?? "",
    place.primaryTypeDisplayName?.text ?? "",
    place.displayName.text,
  ].join(" ").toLowerCase();
  return keywords.some((kw) => searchIn.includes(kw));
}

/* ─────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────── */
export default function RestaurantsSection({
  cityId, cityName, coords, theme,
}: RestaurantsSectionProps) {
  const [allPlaces,    setAllPlaces]    = useState<GooglePlace[]>([]);
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState<string | null>(null);
  const [,   setIsFallback]   = useState(false);

  /* Filter state */
  const [cuisine,    setCuisine]    = useState<CuisineFilter>("All");
  const [minRating,  setMinRating]  = useState<RatingFilter>("any");
  const [priceFilter,setPriceFilter]= useState<PriceFilter>("Any");
  const [openNow,    setOpenNow]    = useState(false);
  const [sortBy,     setSortBy]     = useState<SortRestaurants>("relevance");

  const apiKey = GOOGLE_API_KEY;
  const accent  = THEME_ACCENT[theme];

  /* ── Fetch from Google Places API ── */
  const fetchRestaurants = useCallback(async () => {
    // No API key — show fallback immediately regardless of coords
    if (!apiKey) {
      setAllPlaces(FALLBACK_RESTAURANTS);
      setIsFallback(true);
      setLoading(false);
      return;
    }
    // API key present but no coords yet — show fallback until city selected
    if (!coords) {
      setAllPlaces(FALLBACK_RESTAURANTS);
      setIsFallback(true);
      setLoading(false);
      return;
    }

    const cacheKey = getCacheKey(cityId, "All"); // cache full set, filter client-side
    const cached   = readCache(cacheKey);
    if (cached) { setAllPlaces(cached); return; }

    setLoading(true);
    setError(null);
    setIsFallback(false);

    try {
      const res = await fetch(
        "https://places.googleapis.com/v1/places:searchNearby",
        {
          method: "POST",
          headers: {
            "Content-Type":    "application/json",
            "X-Goog-Api-Key":  apiKey,
            "X-Goog-FieldMask": [
              "places.id",
              "places.displayName",
              "places.rating",
              "places.userRatingCount",
              "places.priceLevel",
              "places.currentOpeningHours",
              "places.photos",
              "places.editorialSummary",
              "places.primaryTypeDisplayName",
              "places.googleMapsUri",
              "places.internationalPhoneNumber",
            ].join(","),
          },
          body: JSON.stringify({
            includedTypes: ["restaurant"],
            maxResultCount: 20,
            locationRestriction: {
              circle: {
                center: { latitude: coords.lat, longitude: coords.lng },
                radius: 5000,
              },
            },
          }),
        }
      );

      if (!res.ok) throw new Error(`Google Places API error: ${res.status} ${res.statusText}`);

      const json: GooglePlacesResponse = await res.json();
      const places = (json.places ?? []).map((p) => ({
        ...p,
        cuisineType: p.primaryTypeDisplayName?.text,
      }));

      writeCache(cacheKey, places);
      setAllPlaces(places);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load restaurants.");
    } finally {
      setLoading(false);
    }
  }, [apiKey, coords, cityId]);

  useEffect(() => { fetchRestaurants(); }, [fetchRestaurants]);

  /* ── Client-side filtering ── */
  const filtered = useMemo(() => {
    let results = allPlaces.filter((p) => matchesCuisine(p, cuisine));

    if (minRating !== "any") {
      const threshold = parseFloat(minRating);
      results = results.filter((p) => (p.rating ?? 0) >= threshold);
    }

    if (priceFilter !== "Any") {
      results = results.filter((p) => {
        const sym = p.priceLevel ? PRICE_LEVEL_MAP[p.priceLevel] : null;
        return sym === priceFilter;
      });
    }

    if (openNow) {
      results = results.filter((p) => p.currentOpeningHours?.openNow === true);
    }

    if (sortBy === "rating") {
      results.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    } else if (sortBy === "reviews") {
      results.sort((a, b) => (b.userRatingCount ?? 0) - (a.userRatingCount ?? 0));
    }

    return results;
  }, [allPlaces, cuisine, minRating, priceFilter, openNow, sortBy]);

  /* ── Pill style helper ── */
  const pill = (active: boolean): React.CSSProperties => ({
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 11, fontWeight: 600, letterSpacing: "0.04em",
    borderRadius: 20, padding: "5px 13px", cursor: "pointer",
    border: "1.5px solid transparent",
    transition: "all 0.18s",
    background:  active ? accent.pill : "rgba(0,0,0,0.05)",
    color:       active ? accent.pillText : "#555",
    borderColor: active ? "transparent" : "rgba(0,0,0,0.08)",
    whiteSpace:  "nowrap" as const,
  });

  const selectStyle: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 12, fontWeight: 500, color: "#333",
    background: "#fff", border: "1.5px solid rgba(0,0,0,0.12)",
    borderRadius: 10, padding: "7px 32px 7px 12px",
    appearance: "none", cursor: "pointer", outline: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23666' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .rs-root { margin-top: 56px; }
        .rs-divider { height: 1px; background: rgba(0,0,0,0.07); margin-bottom: 24px; }

        .rs-centre {
          max-width: 960px;
          margin: 0 auto;
          padding: 0 40px 80px;
        }

        .rs-heading-row {
          display: flex; align-items: baseline;
          justify-content: space-between; gap: 16px;
          flex-wrap: wrap; margin-bottom: 18px;
        }
        .rs-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px; font-weight: 500; color: #1a1a1a; margin: 0;
        }
        .rs-meta { font-size: 12px; color: #aaa; }



        .rs-filter-bar {
          display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px;
        }
        .rs-filter-row { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
        .rs-filter-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: #999; margin-right: 2px; white-space: nowrap;
        }
        .rs-toggle {
          display: flex; align-items: center; gap: 7px;
          font-family: 'DM Sans', sans-serif; font-size: 12px;
          font-weight: 500; color: #555; cursor: pointer;
          padding: 5px 14px;
          border: 1.5px solid rgba(0,0,0,0.1); border-radius: 20px;
          background: #fff; transition: all 0.18s; user-select: none;
        }
        .rs-toggle.active {
          background: rgba(46,125,50,0.1); border-color: #2e7d32; color: #2e7d32;
        }
        .rs-toggle-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: currentColor;
        }

        .rs-grid {
          display: grid;
          grid-template-columns: repeat(3, 280px);
          gap: 20px;
          justify-content: center;
        }

        .rs-empty {
          text-align: center; padding: 60px 0; color: #aaa; font-size: 14px;
        }
        .rs-empty-icon { font-size: 40px; display: block; margin-bottom: 12px; }

        .rs-error {
          background: #fff5f5; border: 1px solid rgba(192,57,43,0.2);
          border-radius: 12px; padding: 16px 20px;
          display: flex; align-items: center; gap: 12px;
          font-size: 13px; color: #c0392b;
        }
        .rs-retry {
          font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600;
          color: #fff; background: #c0392b; border: none;
          border-radius: 20px; padding: 6px 16px; cursor: pointer; margin-left: auto;
          white-space: nowrap;
        }

        @media (max-width: 960px) {
          .rs-grid { grid-template-columns: repeat(2, 280px); }
        }
        @media (max-width: 768px) {
          .rs-centre { padding: 0 20px; }
        }
        @media (max-width: 480px) {
          .rs-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="rs-root">
        <div className="rs-centre">
        <div className="rs-divider" />

        <div className="rs-heading-row">
          <h2 className="rs-heading">
            Restaurants {cityName ? `in ${cityName}` : ""}
          </h2>
          {!loading && !error && (
            <span className="rs-meta">
              {filtered.length} of {allPlaces.length} restaurant
              {allPlaces.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>



        {/* Filter bar */}
        <div className="rs-filter-bar">

          {/* Cuisine */}
          <div className="rs-filter-row">
            <span className="rs-filter-label">Cuisine</span>
            {CUISINE_FILTERS.map((c) => (
              <button key={c} style={pill(cuisine === c)} onClick={() => setCuisine(c)}>
                {c}
              </button>
            ))}
          </div>

          {/* Rating + Price + Open + Sort */}
          <div className="rs-filter-row">
            <span className="rs-filter-label">Rating</span>
            {(["any", "3.5", "4.0", "4.5"] as RatingFilter[]).map((r) => (
              <button key={r} style={pill(minRating === r)} onClick={() => setMinRating(r)}>
                {r === "any" ? "Any" : `${r}★+`}
              </button>
            ))}

            <span className="rs-filter-label" style={{ marginLeft: 8 }}>Price</span>
            {(["Any", "$", "$$", "$$$", "$$$$"] as PriceFilter[]).map((p) => (
              <button key={p} style={pill(priceFilter === p)} onClick={() => setPriceFilter(p)}>
                {p}
              </button>
            ))}

            <div
              className={`rs-toggle${openNow ? " active" : ""}`}
              onClick={() => setOpenNow((v) => !v)}
            >
              <span className="rs-toggle-dot" />
              Open Now
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortRestaurants)}
              style={{ ...selectStyle, marginLeft: "auto" }}
            >
              <option value="relevance">Sort: Relevance</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
            </select>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="rs-error">
            <span>⚠️ {error}</span>
            <button className="rs-retry" onClick={fetchRestaurants}>Retry</button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="rs-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <RestaurantCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div className="rs-empty">
            <span className="rs-empty-icon">🍽️</span>
            No restaurants match your current filters.
            <br />
            Try adjusting cuisine type, rating, or price range.
          </div>
        )}

        {/* Results */}
        {!loading && !error && filtered.length > 0 && (
          <div className="rs-grid">
            {filtered.map((place) => (
              <RestaurantCard
                key={place.id}
                place={place}
                theme={theme}
                apiKey={apiKey}
              />
            ))}
          </div>
        )}
        </div>{/* end rs-centre */}
      </div>
    </>
  );
}
