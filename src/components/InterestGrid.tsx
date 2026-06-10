import { useState } from "react";

interface Tile {
  label: string;
  emoji: string;
  accent: string; // overlay gradient
}

interface GridConfig {
  heading: string;
  subheading: string;
  tiles: Tile[];
  theme: "ace" | "queen" | "king";
}

/* ══════════════════════════════════════════════════════════
   DATA — four tiles per tier, themed to the card aesthetic
══════════════════════════════════════════════════════════ */
const ACE_GRID: GridConfig = {
  heading: "Discover by clarity",
  subheading: "Precision-curated for the selective few.",
  theme: "ace",
  tiles: [
    {
      label: "Crystal Spaces",
      emoji: "🏔️",
      accent: "linear-gradient(160deg, rgba(10,22,40,0.18) 0%, rgba(30,58,95,0.72) 100%)",
    },
    {
      label: "Precision Craft",
      emoji: "💎",
      accent: "linear-gradient(160deg, rgba(8,18,34,0.1) 0%, rgba(20,40,80,0.78) 100%)",
    },
    {
      label: "Aether & Sky",
      emoji: "🌌",
      accent: "linear-gradient(160deg, rgba(10,22,50,0.08) 0%, rgba(14,30,65,0.8) 100%)",
    },
    {
      label: "Arctic Edge",
      emoji: "❄️",
      accent: "linear-gradient(160deg, rgba(12,24,48,0.1) 0%, rgba(20,44,90,0.75) 100%)",
    },
  ],
};

const QUEEN_GRID: GridConfig = {
  heading: "Explore by grace",
  subheading: "Handpicked for the refined and the bold.",
  theme: "queen",
  tiles: [
    {
      label: "Botanical Trails",
      emoji: "🌸",
      accent: "linear-gradient(160deg, rgba(80,30,10,0.08) 0%, rgba(140,70,30,0.72) 100%)",
    },
    {
      label: "Velvet Dining",
      emoji: "🍷",
      accent: "linear-gradient(160deg, rgba(90,30,10,0.1) 0%, rgba(150,60,20,0.78) 100%)",
    },
    {
      label: "Arts & Salons",
      emoji: "🎨",
      accent: "linear-gradient(160deg, rgba(70,25,5,0.08) 0%, rgba(130,55,20,0.76) 100%)",
    },
    {
      label: "Spa & Retreat",
      emoji: "🌿",
      accent: "linear-gradient(160deg, rgba(60,20,5,0.1) 0%, rgba(120,50,15,0.8) 100%)",
    },
  ],
};

const KING_GRID: GridConfig = {
  heading: "Command your world",
  subheading: "Authority in every direction you choose.",
  theme: "king",
  tiles: [
    {
      label: "Power & Sport",
      emoji: "⚔️",
      accent: "linear-gradient(160deg, rgba(10,8,2,0.12) 0%, rgba(26,20,8,0.82) 100%)",
    },
    {
      label: "Private Aviation",
      emoji: "✈️",
      accent: "linear-gradient(160deg, rgba(8,6,2,0.1) 0%, rgba(20,15,5,0.85) 100%)",
    },
    {
      label: "Estate & Land",
      emoji: "🏰",
      accent: "linear-gradient(160deg, rgba(12,8,2,0.08) 0%, rgba(24,18,6,0.82) 100%)",
    },
    {
      label: "Naval & Sea",
      emoji: "⚓",
      accent: "linear-gradient(160deg, rgba(10,7,1,0.1) 0%, rgba(22,16,4,0.84) 100%)",
    },
  ],
};

export const INTEREST_GRIDS: Record<string, GridConfig> = {
  ace: ACE_GRID,
  queen: QUEEN_GRID,
  king: KING_GRID,
};

/* ══════════════════════════════════════════════════════════
   Tile backgrounds — rich photographic-feel gradients
   since we can't use real photos, we simulate depth with
   layered CSS gradients + emoji at large scale
══════════════════════════════════════════════════════════ */
const TILE_BACKGROUNDS: Record<string, string[]> = {
  ace: [
    "radial-gradient(ellipse at 30% 40%, #1a3a6e 0%, #0d1b35 50%, #060e1f 100%)",
    "radial-gradient(ellipse at 60% 30%, #0e2244 0%, #081628 55%, #040c18 100%)",
    "radial-gradient(ellipse at 40% 50%, #0a1830 0%, #060f22 55%, #030810 100%)",
    "radial-gradient(ellipse at 50% 35%, #122848 0%, #0a1c36 55%, #050e1c 100%)",
  ],
  queen: [
    "radial-gradient(ellipse at 40% 40%, #c47840 0%, #8a4820 55%, #4a200a 100%)",
    "radial-gradient(ellipse at 55% 30%, #b06030 0%, #783820 55%, #3e1808 100%)",
    "radial-gradient(ellipse at 35% 50%, #bc7038 0%, #864028 55%, #44180c 100%)",
    "radial-gradient(ellipse at 50% 40%, #b06838 0%, #7c4020 55%, #401808 100%)",
  ],
  king: [
    "radial-gradient(ellipse at 40% 35%, #2a2010 0%, #181008 55%, #0c0804 100%)",
    "radial-gradient(ellipse at 55% 40%, #221a08 0%, #140e04 55%, #080602 100%)",
    "radial-gradient(ellipse at 35% 45%, #281e0c 0%, #160e06 55%, #0a0602 100%)",
    "radial-gradient(ellipse at 50% 35%, #241c0a 0%, #160e04 55%, #0a0602 100%)",
  ],
};

/* ── Single tile ─────────────────────────────────────── */
function InterestTile({
  tile,
  bg,
  theme,
}: {
  tile: Tile;
  bg: string;
  theme: "ace" | "queen" | "king";
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`ig-tile ig-tile-${theme}${hovered ? " ig-hovered" : ""}`}
      style={{ background: bg }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={tile.label}
    >
      {/* Decorative large emoji as texture */}
      <div className="ig-tile-emoji" aria-hidden="true">
        {tile.emoji}
      </div>

      {/* Overlay gradient for depth */}
      <div className="ig-tile-overlay" style={{ background: tile.accent }} />

      {/* Shine on hover */}
      <div className={`ig-tile-shine ig-shine-${theme}`} />

      {/* Label */}
      <div className="ig-tile-footer">
        <span className={`ig-tile-label ig-label-${theme}`}>{tile.label}</span>
        <span className={`ig-tile-arrow ig-arrow-${theme}`}>→</span>
      </div>
    </div>
  );
}

/* ── One full grid section ───────────────────────────── */
function InterestGridSection({ config }: { config: GridConfig }) {
  const bgs = TILE_BACKGROUNDS[config.theme];

  return (
    <div className={`ig-section ig-section-${config.theme}`}>
      <div className="ig-header">
        <h3 className={`ig-heading ig-heading-${config.theme}`}>{config.heading}</h3>
        <p className={`ig-subheading ig-subheading-${config.theme}`}>{config.subheading}</p>
      </div>
      <div className="ig-grid">
        {config.tiles.map((tile, i) => (
          <InterestTile key={tile.label} tile={tile} bg={bgs[i]} theme={config.theme} />
        ))}
      </div>
    </div>
  );
}

/* ── Styles ──────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@300;400;500;600&display=swap');

  .ig-section {
    max-width: 872px;
    margin: 48px auto 0;
    font-family: 'DM Sans', sans-serif;
  }

  .ig-header {
    margin-bottom: 18px;
  }

  .ig-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px;
    font-weight: 600;
    letter-spacing: 0.03em;
    margin: 0 0 4px;
  }
  .ig-heading-ace  { color: #1a3060; }
  .ig-heading-queen { color: #5a2c10; }
  .ig-heading-king  { color: #2a2010; }

  .ig-subheading {
    font-size: 13px;
    font-weight: 300;
    margin: 0;
    letter-spacing: 0.02em;
  }
  .ig-subheading-ace   { color: #6a8ab8; }
  .ig-subheading-queen { color: #9a6040; }
  .ig-subheading-king  { color: #8a7050; }

  /* Grid */
  .ig-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }

  /* Tile */
  .ig-tile {
    position: relative;
    border-radius: 14px;
    overflow: hidden;
    cursor: pointer;
    aspect-ratio: 3 / 4;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    outline: none;
    transition: transform 0.28s cubic-bezier(0.23, 1, 0.32, 1),
                box-shadow 0.28s ease;
  }
  .ig-tile:hover,
  .ig-tile:focus-visible {
    transform: translateY(-5px) scale(1.02);
  }

  .ig-tile-ace:hover   { box-shadow: 0 20px 48px rgba(10,30,80,0.38); }
  .ig-tile-queen:hover { box-shadow: 0 20px 48px rgba(140,60,20,0.35); }
  .ig-tile-king:hover  { box-shadow: 0 20px 48px rgba(0,0,0,0.55); }

  /* Big emoji as visual texture */
  .ig-tile-emoji {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -58%);
    font-size: 96px;
    line-height: 1;
    opacity: 0.22;
    pointer-events: none;
    transition: transform 0.4s ease, opacity 0.4s ease;
    filter: blur(1px);
  }
  .ig-tile:hover .ig-tile-emoji {
    transform: translate(-50%, -62%) scale(1.12);
    opacity: 0.32;
    filter: blur(0px);
  }

  /* Depth overlay */
  .ig-tile-overlay {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  /* Shine sweep on hover */
  .ig-tile-shine {
    position: absolute;
    inset: 0;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.35s ease;
    background: linear-gradient(
      135deg,
      transparent 0%,
      rgba(255,255,255,0.06) 45%,
      rgba(255,255,255,0.12) 50%,
      rgba(255,255,255,0.06) 55%,
      transparent 100%
    );
  }
  .ig-tile:hover .ig-tile-shine { opacity: 1; }

  /* Footer bar */
  .ig-tile-footer {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
  }

  .ig-tile-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.02em;
  }
  .ig-label-ace   { color: #e8f0ff; }
  .ig-label-queen { color: #fff0e8; }
  .ig-label-king  {
    background: linear-gradient(90deg, #e8cc70, #c8a84b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .ig-tile-arrow {
    font-size: 16px;
    opacity: 0;
    transform: translateX(-6px);
    transition: opacity 0.22s ease, transform 0.22s ease;
  }
  .ig-tile:hover .ig-tile-arrow {
    opacity: 1;
    transform: translateX(0);
  }
  .ig-arrow-ace   { color: #a8c4e8; }
  .ig-arrow-queen { color: #e8c4a0; }
  .ig-arrow-king  { color: #c8a84b; }

  /* Tier-specific border accents */
  .ig-tile-ace   { border: 1px solid rgba(100,160,240,0.15); }
  .ig-tile-queen { border: 1px solid rgba(200,140,80,0.2); }
  .ig-tile-king  { border: 1px solid rgba(200,168,75,0.18); }

  @media (max-width: 680px) {
    .ig-grid { grid-template-columns: repeat(2, 1fr); }
    .ig-tile-emoji { font-size: 64px; }
  }
`;

/* ── Named exports so CardSection can import per tier ── */
export function AceInterestGrid() {
  return (
    <>
      <style>{STYLES}</style>
      <InterestGridSection config={ACE_GRID} />
    </>
  );
}

export function QueenInterestGrid() {
  return (
    <>
      <style>{STYLES}</style>
      <InterestGridSection config={QUEEN_GRID} />
    </>
  );
}

export function KingInterestGrid() {
  return (
    <>
      <style>{STYLES}</style>
      <InterestGridSection config={KING_GRID} />
    </>
  );
}

/* ── Default export renders all three (standalone use) ── */
export default function InterestGrid() {
  return (
    <>
      <style>{STYLES}</style>
      <InterestGridSection config={ACE_GRID} />
      <InterestGridSection config={QUEEN_GRID} />
      <InterestGridSection config={KING_GRID} />
    </>
  );
}
