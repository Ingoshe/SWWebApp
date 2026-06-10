import type { TicketmasterEvent } from "../types/events";

type Theme = "ace" | "queen" | "king";

const GENRE_COLOURS: Record<string, { bg: string; text: string }> = {
  Music:    { bg: "#e8eaf6", text: "#283593" },
  Sports:   { bg: "#e8f5e9", text: "#2e7d32" },
  Arts:     { bg: "#fff8e1", text: "#f57f17" },
  Theatre:  { bg: "#f3e5f5", text: "#6a1b9a" },
  Family:   { bg: "#e0f2f1", text: "#00695c" },
  Comedy:   { bg: "#fff3e0", text: "#e65100" },
  Default:  { bg: "#f5f5f5", text: "#555"    },
};

interface EventCardProps {
  event: TicketmasterEvent;
  theme: Theme;
}

function formatEventDate(dateStr: string, timeStr?: string): string {
  try {
    const date = new Date(dateStr + (timeStr ? `T${timeStr}` : ""));
    const datePart = date.toLocaleDateString("en-GB", {
      weekday: "short", day: "numeric", month: "short", year: "numeric",
    });
    if (!timeStr) return datePart;
    const timePart = date.toLocaleTimeString("en-GB", {
      hour: "numeric", minute: "2-digit", hour12: true,
    }).toUpperCase();
    return `${datePart} · ${timePart}`;
  } catch {
    return dateStr;
  }
}

const THEME_CTA: Record<Theme, { bg: string; shadow: string; color: string }> = {
  ace:   { bg: "#c0392b", shadow: "rgba(192,57,43,0.35)",  color: "#fff" },
  queen: { bg: "#a07050", shadow: "rgba(138,90,53,0.4)",   color: "#fff" },
  king:  { bg: "#1a1814", shadow: "rgba(0,0,0,0.3)",       color: "#fff" },
};

export default function EventCard({ event, theme }: EventCardProps) {
  const cta    = THEME_CTA[theme];
  const genre  = event.classifications?.[0]?.segment?.name ?? "Default";
  const colours = GENRE_COLOURS[genre] ?? GENRE_COLOURS.Default;

  const imageUrl =
    event.images?.find((img) => img.ratio === "4_3" && img.width >= 400)?.url ??
    event.images?.[0]?.url;

  const venue   = event._embedded?.venues?.[0];
  const dateObj = event.dates?.start;
  const minPrice = event.priceRanges?.[0]?.min;
  const currency = event.priceRanges?.[0]?.currency ?? "USD";

  return (
    <>
      <style>{`
        .ec-card {
          font-family: 'DM Sans', sans-serif;
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          transition: transform 0.28s ease, box-shadow 0.28s ease;
          display: flex;
          flex-direction: column;
          width: 280px;
        }
        .ec-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.14);
        }
        .ec-photo-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
          background: #e8e8e8;
          flex-shrink: 0;
        }
        .ec-photo {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
          display: block;
        }
        .ec-card:hover .ec-photo { transform: scale(1.05); }
        .ec-photo-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          font-size: 48px; background: #e8e8e8;
        }
        .ec-badge {
          position: absolute; top: 12px; left: 12px;
          font-size: 10px; font-weight: 600; letter-spacing: 0.08em;
          padding: 4px 10px; border-radius: 12px; text-transform: uppercase;
        }
        .ec-body {
          padding: 16px 18px 0;
          flex: 1; display: flex; flex-direction: column;
        }
        .ec-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px; font-weight: 600; color: #1a1a1a;
          margin: 0 0 8px; line-height: 1.25;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .ec-date {
          font-size: 12px; font-weight: 500; color: #555;
          margin-bottom: 6px; display: flex; align-items: center; gap: 5px;
        }
        .ec-venue {
          font-size: 12px; color: #888; margin-bottom: 8px;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .ec-price {
          font-size: 12px; font-weight: 600; color: #2e7d32;
          margin-bottom: 4px;
        }
        .ec-actions {
          padding: 12px 18px 18px;
          margin-top: auto;
        }
        .ec-ticket-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 600; letter-spacing: 0.1em;
          color: #fff; text-decoration: none; display: block;
          border-radius: 20px; padding: 9px 0; text-align: center;
          transition: transform 0.18s, box-shadow 0.18s;
        }
        .ec-ticket-btn:hover { transform: translateY(-2px); }

        /* Skeleton */
        .ec-skeleton {
          background: #fff; border-radius: 16px; overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          width: 280px;
        }
        .ec-skel-photo {
          width: 100%; aspect-ratio: 4/3;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: skelShimmer 1.4s infinite;
        }
        .ec-skel-body { padding: 16px 18px 18px; }
        .ec-skel-line {
          height: 12px; border-radius: 6px; margin-bottom: 10px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: skelShimmer 1.4s infinite;
        }
        @keyframes skelShimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="ec-card">
        <div className="ec-photo-wrap">
          {imageUrl ? (
            <img
              className="ec-photo"
              src={imageUrl}
              alt={event.name}
              loading="lazy"
            />
          ) : (
            <div className="ec-photo-placeholder">🎟️</div>
          )}
          <span
            className="ec-badge"
            style={{ background: colours.bg, color: colours.text }}
          >
            {genre}
          </span>
        </div>

        <div className="ec-body">
          <h3 className="ec-name">{event.name}</h3>

          {dateObj && (
            <div className="ec-date">
              <span>📅</span>
              {formatEventDate(dateObj.localDate, dateObj.localTime)}
            </div>
          )}

          {venue && (
            <div className="ec-venue">
              📍 {venue.name}{venue.city?.name ? `, ${venue.city.name}` : ""}
            </div>
          )}

          {minPrice != null && (
            <div className="ec-price">
              From {new Intl.NumberFormat("en-US", {
                style: "currency", currency,
              }).format(minPrice)}
            </div>
          )}
        </div>

        <div className="ec-actions">
          <a
            className="ec-ticket-btn"
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: cta.bg,
              boxShadow: `0 4px 16px ${cta.shadow}`,
            }}
          >
            GET TICKETS →
          </a>
        </div>
      </div>
    </>
  );
}

/* ── Skeleton loader ── */
export function EventCardSkeleton() {
  return (
    <div className="ec-skeleton">
      <div className="ec-skel-photo" />
      <div className="ec-skel-body">
        <div className="ec-skel-line" style={{ width: "80%" }} />
        <div className="ec-skel-line" style={{ width: "60%" }} />
        <div className="ec-skel-line" style={{ width: "40%" }} />
      </div>
    </div>
  );
}