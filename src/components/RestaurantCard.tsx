import { useState } from "react";
import type { GooglePlace } from "../types/restaurants";
import { PRICE_LEVEL_MAP } from "../types/restaurants";

type Theme = "ace" | "queen" | "king";

const THEME_CTA: Record<Theme, { bg: string; shadow: string }> = {
  ace:   { bg: "#c0392b", shadow: "rgba(192,57,43,0.35)"  },
  queen: { bg: "#a07050", shadow: "rgba(138,90,53,0.4)"   },
  king:  { bg: "#1a1814", shadow: "rgba(0,0,0,0.3)"       },
};

interface RestaurantCardProps {
  place: GooglePlace;
  theme: Theme;
  apiKey?: string;
}

function StarDisplay({ rating }: { rating: number }) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <span style={{ color: "#f5a623", fontSize: 13, letterSpacing: 1 }}>
      {"★".repeat(full)}
      {half ? "½" : ""}
      {"☆".repeat(empty)}
    </span>
  );
}

export default function RestaurantCard({ place, theme, apiKey }: RestaurantCardProps) {
  const [imgError, setImgError] = useState(false);
  const cta = THEME_CTA[theme];

  /* Build photo URL from Places API photo reference */
  const photoUrl =
    !imgError && apiKey && place.photos?.[0]
      ? `https://places.googleapis.com/v1/${place.photos[0].name}/media?maxWidthPx=600&key=${apiKey}`
      : null;

  const isOpen    = place.currentOpeningHours?.openNow;
  const price     = place.priceLevel ? PRICE_LEVEL_MAP[place.priceLevel] : null;
  const cuisine   = place.cuisineType ?? place.primaryTypeDisplayName?.text ?? "Restaurant";
  const summary   = place.editorialSummary?.text;

  return (
    <>
      <style>{`
        .rc-card {
          font-family: 'DM Sans', sans-serif;
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          transition: transform 0.28s ease, box-shadow 0.28s ease;
          display: flex; flex-direction: column;
          width: 280px;
        }
        .rc-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.14);
        }
        .rc-photo-wrap {
          position: relative; width: 100%; aspect-ratio: 4/3;
          overflow: hidden; background: #e8e8e8; flex-shrink: 0;
        }
        .rc-photo {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.5s ease; display: block;
        }
        .rc-card:hover .rc-photo { transform: scale(1.05); }
        .rc-photo-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          font-size: 48px; background: #f0ece8;
        }
        .rc-badge {
          position: absolute; top: 12px; left: 12px;
          font-size: 10px; font-weight: 600; letter-spacing: 0.08em;
          padding: 4px 10px; border-radius: 12px; text-transform: uppercase;
          background: #fff3e0; color: #e65100;
        }
        .rc-open-badge {
          position: absolute; top: 12px; right: 12px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.06em;
          padding: 4px 10px; border-radius: 12px;
        }
        .rc-body { padding: 16px 18px 0; flex: 1; display: flex; flex-direction: column; }
        .rc-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px; font-weight: 600; color: #1a1a1a;
          margin: 0 0 8px; line-height: 1.25;
          display: -webkit-box;
          -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .rc-rating-row {
          display: flex; align-items: center; gap: 6px; margin-bottom: 6px;
          flex-wrap: wrap;
        }
        .rc-rating-num { font-size: 13px; font-weight: 600; color: #333; }
        .rc-review-count { font-size: 11px; color: #aaa; }
        .rc-price { font-size: 13px; font-weight: 600; color: #555; }
        .rc-summary {
          font-size: 12px; color: #777; line-height: 1.55; margin-top: 6px;
          display: -webkit-box;
          -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
        }
        .rc-actions {
          padding: 12px 18px 18px; margin-top: auto;
          display: flex; gap: 8px;
        }
        .rc-maps-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
          color: #fff; text-decoration: none;
          border-radius: 20px; padding: 8px 0; text-align: center;
          transition: transform 0.18s, box-shadow 0.18s;
          flex: 1; display: block;
        }
        .rc-maps-btn:hover { transform: translateY(-2px); }
        .rc-dir-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
          color: #555; background: rgba(0,0,0,0.05);
          border: none; border-radius: 20px; padding: 8px 14px;
          cursor: pointer; transition: background 0.18s; white-space: nowrap;
          text-decoration: none; display: flex; align-items: center;
        }
        .rc-dir-btn:hover { background: rgba(0,0,0,0.09); }

        /* Skeleton */
        .rc-skeleton {
          background: #fff; border-radius: 16px; overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06); width: 280px;
        }
        .rc-skel-photo {
          width: 100%; aspect-ratio: 4/3;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%; animation: rcSkelShimmer 1.4s infinite;
        }
        .rc-skel-body { padding: 16px 18px 18px; }
        .rc-skel-line {
          height: 12px; border-radius: 6px; margin-bottom: 10px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%; animation: rcSkelShimmer 1.4s infinite;
        }
        @keyframes rcSkelShimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="rc-card">
        <div className="rc-photo-wrap">
          {photoUrl && !imgError ? (
            <img
              className="rc-photo"
              src={photoUrl}
              alt={place.displayName.text}
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="rc-photo-placeholder">🍽️</div>
          )}
          <span className="rc-badge">{cuisine}</span>
          {isOpen !== undefined && (
            <span
              className="rc-open-badge"
              style={{
                background: isOpen ? "rgba(46,125,50,0.9)" : "rgba(198,40,40,0.85)",
                color: "#fff",
              }}
            >
              {isOpen ? "Open Now" : "Closed"}
            </span>
          )}
        </div>

        <div className="rc-body">
          <h3 className="rc-name">{place.displayName.text}</h3>

          <div className="rc-rating-row">
            {place.rating != null && (
              <>
                <span className="rc-rating-num">{place.rating.toFixed(1)}</span>
                <StarDisplay rating={place.rating} />
              </>
            )}
            {place.userRatingCount != null && (
              <span className="rc-review-count">
                · {place.userRatingCount.toLocaleString()} reviews
              </span>
            )}
            {price && <span className="rc-price">{price}</span>}
          </div>

          {summary && <p className="rc-summary">{summary}</p>}
        </div>

        <div className="rc-actions">
          {place.googleMapsUri && (
            <a
              className="rc-maps-btn"
              href={place.googleMapsUri}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: cta.bg,
                boxShadow: `0 4px 16px ${cta.shadow}`,
              }}
            >
              VIEW ON MAPS
            </a>
          )}
          {place.googleMapsUri && (
            <a
              className="rc-dir-btn"
              href={`${place.googleMapsUri}&dirflg=d`}
              target="_blank"
              rel="noopener noreferrer"
            >
              ↗ Directions
            </a>
          )}
        </div>
      </div>
    </>
  );
}

export function RestaurantCardSkeleton() {
  return (
    <div className="rc-skeleton">
      <div className="rc-skel-photo" />
      <div className="rc-skel-body">
        <div className="rc-skel-line" style={{ width: "75%" }} />
        <div className="rc-skel-line" style={{ width: "55%" }} />
        <div className="rc-skel-line" style={{ width: "90%" }} />
      </div>
    </div>
  );
}