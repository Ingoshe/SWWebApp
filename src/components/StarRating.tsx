import { useState } from "react";

interface StarRatingProps {
  value: number;          // current rating (0–5)
  max?: number;           // default 5
  interactive?: boolean;  // if true, user can click stars
  size?: number;          // px size of each star
  onChange?: (rating: number) => void;
}

export default function StarRating({
  value,
  max = 5,
  interactive = false,
  size = 16,
  onChange,
}: StarRatingProps) {
  const [hovered, setHovered] = useState(0);

  const display = interactive && hovered > 0 ? hovered : value;

  return (
    <div
      className="star-rating"
      style={{ display: "flex", alignItems: "center", gap: 2 }}
      role={interactive ? "radiogroup" : undefined}
      aria-label={`Rating: ${value} out of ${max} stars`}
    >
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const filled    = display >= starValue;
        const half      = !filled && display >= starValue - 0.5;

        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={filled ? "#f5a623" : half ? "url(#half)" : "none"}
            stroke={filled || half ? "#f5a623" : "#ccc"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              cursor: interactive ? "pointer" : "default",
              transition: "transform 0.1s ease",
              transform: interactive && hovered === starValue ? "scale(1.2)" : "scale(1)",
            }}
            onClick={() => interactive && onChange?.(starValue)}
            onMouseEnter={() => interactive && setHovered(starValue)}
            onMouseLeave={() => interactive && setHovered(0)}
            role={interactive ? "radio" : undefined}
            aria-checked={interactive ? value === starValue : undefined}
            tabIndex={interactive ? 0 : undefined}
            onKeyDown={(e) => {
              if (interactive && (e.key === "Enter" || e.key === " ")) {
                onChange?.(starValue);
              }
            }}
          >
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="#f5a623" />
                <stop offset="50%" stopColor="none" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      })}
      {!interactive && (
        <span style={{ fontSize: size * 0.75, color: "#888", marginLeft: 4, fontFamily: "'DM Sans', sans-serif" }}>
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}