import { useState } from "react";
import StarRating from "./StarRating";
import RatingForm from "./RatingForm";
import type { Attraction } from "../data/destinations";

const CATEGORY_COLOURS: Record<string, { bg: string; text: string }> = {
  Nature:       { bg: "#e8f5e9", text: "#2e7d32" },
  Culture:      { bg: "#fff3e0", text: "#e65100" },
  Architecture: { bg: "#e3f2fd", text: "#1565c0" },
  Food:         { bg: "#fce4ec", text: "#c62828" },
  History:      { bg: "#f3e5f5", text: "#6a1b9a" },
  Adventure:    { bg: "#e0f2f1", text: "#00695c" },
  Art:          { bg: "#fff8e1", text: "#f57f17" },
  Wellness:     { bg: "#e8eaf6", text: "#283593" },
};

interface AttractionCardProps {
  attraction: Attraction;
  isAuthenticated: boolean;
  onLoginRequest: () => void;
  theme?: "ace" | "queen" | "king";
}

export default function AttractionCard({
  attraction,
  isAuthenticated,
  onLoginRequest,
  theme = "ace",
}: AttractionCardProps) {
  const [showReviews, setShowReviews] = useState(false);
  const [imgError,    setImgError]    = useState(false);

  const cat     = CATEGORY_COLOURS[attraction.category] ?? { bg: "#f5f5f5", text: "#555" };
  const themeBtn = {
    ace:   { bg: "#c0392b",  shadow: "rgba(192,57,43,0.35)"  },
    queen: { bg: "#a07050",  shadow: "rgba(138,90,53,0.4)"   },
    king:  { bg: "#1a1814",  shadow: "rgba(0,0,0,0.3)"       },
  }[theme];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .ac-card {
          font-family: 'DM Sans', sans-serif;
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          transition: transform 0.28s ease, box-shadow 0.28s ease;
          display: flex;
          flex-direction: column;
        }
        .ac-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.14);
        }

        .ac-photo-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
          background: #e8e8e8;
          flex-shrink: 0;
        }
        .ac-photo {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
          display: block;
        }
        .ac-card:hover .ac-photo { transform: scale(1.05); }

        .ac-photo-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          font-size: 48px; background: #e8e8e8; color: #bbb;
        }

        .ac-badge {
          position: absolute; top: 12px; left: 12px;
          font-size: 10px; font-weight: 600; letter-spacing: 0.08em;
          padding: 4px 10px; border-radius: 12px;
          text-transform: uppercase;
        }

        .ac-body {
          padding: 18px 18px 0;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .ac-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px; font-weight: 600; color: #1a1a1a;
          margin: 0 0 8px; line-height: 1.25;
        }

        .ac-stars { margin-bottom: 10px; }

        .ac-desc {
          font-size: 13px; color: #555; line-height: 1.65;
          margin: 0 0 16px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .ac-actions {
          display: flex; gap: 8px; flex-wrap: wrap;
          padding: 0 18px 18px;
          margin-top: auto;
        }

        .ac-discover {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 600; letter-spacing: 0.1em;
          color: #fff; text-decoration: none;
          border-radius: 20px; padding: 8px 18px;
          transition: transform 0.18s, box-shadow 0.18s;
          display: inline-block;
        }
        .ac-discover:hover { transform: translateY(-2px); }

        .ac-review-toggle {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
          color: #555; background: rgba(0,0,0,0.05);
          border: none; border-radius: 20px; padding: 8px 18px;
          cursor: pointer; transition: background 0.18s;
        }
        .ac-review-toggle:hover { background: rgba(0,0,0,0.09); }

        .ac-reviews-panel {
          padding: 0 18px 18px;
          border-top: 1px solid rgba(0,0,0,0.06);
          margin-top: 4px;
          animation: rfSlideDown 0.22s ease;
        }
        @keyframes rfSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="ac-card">
        {/* Photo */}
        <div className="ac-photo-wrap">
          {imgError ? (
            <div className="ac-photo-placeholder">🏛️</div>
          ) : (
            <img
              className="ac-photo"
              src={attraction.photo}
              alt={attraction.name}
              loading="lazy"
              onError={() => setImgError(true)}
            />
          )}
          <span
            className="ac-badge"
            style={{ background: cat.bg, color: cat.text }}
          >
            {attraction.category}
          </span>
        </div>

        {/* Body */}
        <div className="ac-body">
          <h3 className="ac-name">{attraction.name}</h3>
          <div className="ac-stars">
            <StarRating value={attraction.rating} size={14} />
          </div>
          <p className="ac-desc">{attraction.description}</p>
        </div>

        {/* Actions */}
        <div className="ac-actions">
          <a
            className="ac-discover"
            href={attraction.discoverUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: themeBtn.bg,
              boxShadow: `0 4px 16px ${themeBtn.shadow}`,
            }}
          >
            DISCOVER MORE →
          </a>
          <button
            className="ac-review-toggle"
            onClick={() => setShowReviews((v) => !v)}
          >
            {showReviews ? "Hide Reviews" : "Reviews ★"}
          </button>
        </div>

        {/* Expandable reviews panel */}
        {showReviews && (
          <div className="ac-reviews-panel">
            <RatingForm
              attractionId={attraction.id}
              isAuthenticated={isAuthenticated}
              onLoginRequest={onLoginRequest}
            />
          </div>
        )}
      </div>
    </>
  );
}