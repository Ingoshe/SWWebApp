import { useState, useEffect, useCallback } from "react";
import EventCard, { EventCardSkeleton } from "./EventCard";
import type {
  TicketmasterEvent,
  TicketmasterResponse,
  EventGenre,
  EventDateRange,
} from "../types/events";

type Theme = "ace" | "queen" | "king";

interface EventsSectionProps {
  cityName: string;     // e.g. "Paris"
  countryCode: string;  // e.g. "FR"
  theme: Theme;
}

const GENRES: EventGenre[] = ["All", "Music", "Sports", "Arts", "Theatre", "Family", "Comedy"];

const THEME_ACCENT: Record<Theme, { pill: string; pillText: string; border: string }> = {
  ace:   { pill: "#1a3060",  pillText: "#e8f0ff", border: "rgba(168,196,232,0.3)"  },
  queen: { pill: "#8a5a35",  pillText: "#fff",    border: "rgba(138,90,53,0.25)"   },
  king:  { pill: "#c8a84b",  pillText: "#141008", border: "rgba(200,168,75,0.3)"   },
};

const TM_SEGMENT_IDS: Partial<Record<EventGenre, string>> = {
  Music:   "KZFzniwnSyZfZ7v7nJ",
  Sports:  "KZFzniwnSyZfZ7v7nE",
  Arts:    "KZFzniwnSyZfZ7v7na",
  Theatre: "KZFzniwnSyZfZ7v7nn",
  Family:  "KZFzniwnSyZfZ7v7n1",
  Comedy:  "KZFzniwnSyZfZ7v7nl",
};

const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

function getCacheKey(city: string, genre: EventGenre, dateRange: EventDateRange): string {
  return `tm_events__${city}__${genre}__${dateRange}`;
}

function readCache(key: string): TicketmasterEvent[] | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw) as { data: TicketmasterEvent[]; ts: number };
    if (Date.now() - ts > CACHE_TTL_MS) {
      sessionStorage.removeItem(key);
      return null;
    }
    return data;
  } catch { return null; }
}

function writeCache(key: string, data: TicketmasterEvent[]): void {
  try {
    sessionStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
  } catch { /* quota exceeded — silently skip */ }
}

function getDateRange(range: EventDateRange): { startDateTime: string; endDateTime: string } | null {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const fmt = (d: Date) =>
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T00:00:00Z`;

  if (range === "any") return null;

  const end = new Date(now);
  if (range === "weekend") {
    const day = now.getDay();
    const daysUntilFri = (5 - day + 7) % 7 || 7;
    const friday = new Date(now);
    friday.setDate(now.getDate() + daysUntilFri);
    const sunday = new Date(friday);
    sunday.setDate(friday.getDate() + 2);
    return { startDateTime: fmt(friday), endDateTime: fmt(sunday) };
  }
  if (range === "month")   end.setMonth(now.getMonth() + 1);
  if (range === "3months") end.setMonth(now.getMonth() + 3);

  return { startDateTime: fmt(now), endDateTime: fmt(end) };
}

export default function EventsSection({ cityName, countryCode, theme }: EventsSectionProps) {
  const [events,    setEvents]    = useState<TicketmasterEvent[]>([]);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState<string | null>(null);
  const [genre,     setGenre]     = useState<EventGenre>("All");
  const [dateRange, setDateRange] = useState<EventDateRange>("any");

  const accent = THEME_ACCENT[theme];
  const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY as string | undefined;

  const fetchEvents = useCallback(async () => {
    if (!cityName) return;

    const cacheKey = getCacheKey(cityName, genre, dateRange);
    const cached   = readCache(cacheKey);
    if (cached) { setEvents(cached); return; }

    if (!apiKey) {
      setError("Ticketmaster API key not configured. Add VITE_TICKETMASTER_API_KEY to your .env file.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        apikey:          apiKey,
        city:            cityName,
        countryCode:     countryCode,
        size:            "16",
        sort:            "date,asc",
      });

      if (genre !== "All" && TM_SEGMENT_IDS[genre]) {
        params.set("segmentId", TM_SEGMENT_IDS[genre]!);
      }

      const dateParams = getDateRange(dateRange);
      if (dateParams) {
        params.set("startDateTime", dateParams.startDateTime);
        params.set("endDateTime",   dateParams.endDateTime);
      }

      const res = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?${params.toString()}`
      );

      if (!res.ok) throw new Error(`Ticketmaster API error: ${res.status}`);

      const json: TicketmasterResponse = await res.json();
      const fetched = json._embedded?.events ?? [];
      writeCache(cacheKey, fetched);
      setEvents(fetched);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load events.");
    } finally {
      setLoading(false);
    }
  }, [cityName, countryCode, genre, dateRange, apiKey]);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  const pillStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 11, fontWeight: 600, letterSpacing: "0.04em",
    border: "1.5px solid transparent",
    borderRadius: 20, padding: "5px 14px", cursor: "pointer",
    transition: "all 0.18s",
    background:   active ? accent.pill  : "rgba(0,0,0,0.05)",
    color:        active ? accent.pillText : "#555",
    borderColor:  active ? "transparent"  : "rgba(0,0,0,0.08)",
  });

  const dateLabels: Record<EventDateRange, string> = {
    any:      "Any Time",
    weekend:  "This Weekend",
    month:    "This Month",
    "3months":"Next 3 Months",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .es-root { margin-top: 56px; }

        .es-heading-row {
          display: flex; align-items: baseline;
          justify-content: space-between;
          margin-bottom: 20px; gap: 16px; flex-wrap: wrap;
        }
        .es-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: 30px; font-weight: 500; color: #1a1a1a; margin: 0;
        }
        .es-count { font-size: 12px; color: #aaa; }

        .es-filters {
          display: flex; gap: 8px; flex-wrap: wrap;
          margin-bottom: 24px; align-items: center;
        }
        .es-filter-sep {
          width: 1px; height: 20px;
          background: rgba(0,0,0,0.1); margin: 0 4px;
        }

        .es-grid {
          display: grid;
          grid-template-columns: repeat(3, 280px);
          gap: 20px;
          justify-content: start;
        }

        .es-empty {
          text-align: center; padding: 60px 0; color: #aaa; font-size: 14px;
        }
        .es-empty-icon { font-size: 40px; display: block; margin-bottom: 12px; }

        .es-error {
          background: #fff5f5; border: 1px solid rgba(192,57,43,0.2);
          border-radius: 12px; padding: 16px 20px;
          display: flex; align-items: center; gap: 12px;
          font-size: 13px; color: #c0392b;
        }
        .es-retry-btn {
          font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600;
          color: #fff; background: #c0392b; border: none;
          border-radius: 20px; padding: 6px 16px; cursor: pointer; margin-left: auto;
          white-space: nowrap;
        }

        .es-divider {
          height: 1px; background: rgba(0,0,0,0.07);
          margin: 0 0 24px;
        }

        @media (max-width: 960px) {
          .es-grid { grid-template-columns: repeat(2, 280px); }
        }
        @media (max-width: 480px) {
          .es-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="es-root">
        <div className="es-divider" />

        <div className="es-heading-row">
          <h2 className="es-heading">Events in {cityName || "Selected City"}</h2>
          {!loading && !error && (
            <span className="es-count">
              {events.length} event{events.length !== 1 ? "s" : ""} found
            </span>
          )}
        </div>

        {/* Filters */}
        <div className="es-filters">
          {GENRES.map((g) => (
            <button
              key={g}
              style={pillStyle(genre === g)}
              onClick={() => setGenre(g)}
            >
              {g}
            </button>
          ))}

          <div className="es-filter-sep" />

          {(["any", "weekend", "month", "3months"] as EventDateRange[]).map((dr) => (
            <button
              key={dr}
              style={pillStyle(dateRange === dr)}
              onClick={() => setDateRange(dr)}
            >
              {dateLabels[dr]}
            </button>
          ))}
        </div>

        {/* Error state */}
        {error && (
          <div className="es-error">
            <span>⚠️ {error}</span>
            <button className="es-retry-btn" onClick={fetchEvents}>Retry</button>
          </div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="es-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && events.length === 0 && (
          <div className="es-empty">
            <span className="es-empty-icon">🎟️</span>
            No events found for{" "}
            {genre !== "All" ? `${genre} in ` : ""}
            {cityName || "this location"}.
            <br />
            Try changing the genre or date range.
          </div>
        )}

        {/* Events grid */}
        {!loading && !error && events.length > 0 && (
          <div className="es-grid">
            {events.map((event) => (
              <EventCard key={event.id} event={event} theme={theme} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}