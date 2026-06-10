import { useState } from "react";
import { AceInterestGrid, QueenInterestGrid, KingInterestGrid } from "./InterestGrid";

/* ─── Types ─────────────────────────────────────────────── */
interface CardData {
  id: string;
  front: React.ReactNode;
  back: React.ReactNode;
}

interface RowData {
  banner: React.ReactNode;
  tier: string;
  subtitle: string;
  cards: CardData[];
  interestGrid: React.ReactNode;
}

/* ─── Shared flip wrapper ────────────────────────────────── */
function FlipCard({ front, back }: { front: React.ReactNode; back: React.ReactNode }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="flip-scene"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setFlipped((f) => !f)}
      aria-pressed={flipped}
    >
      <div className={`flip-card${flipped ? " flipped" : ""}`}>
        <div className="flip-front">{front}</div>
        <div className="flip-back">{back}</div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   ROW 1 – SELECTIVE ACE  (most premium, top row)
   Glassmorphic · icy blue-white · diamond motif
══════════════════════════════════════════════════════════ */
const aceCards: CardData[] = [
  {
    id: "ace-1",
    front: (
      <div className="ace-front">
        <div className="ace-corner tl"><span className="ace-rank">A</span><span className="ace-suit">♥</span></div>
        <div className="ace-diamond-gem">💎</div>
        <div className="ace-label">EXCLUSIVE ACCESS</div>
        <div className="ace-tag">Playful Interaction</div>
        <button className="ace-btn">EXPLORE NOW</button>
        <div className="ace-corner br rot"><span className="ace-rank">A</span><span className="ace-suit">♥</span></div>
      </div>
    ),
    back: (
      <div className="ace-back">
        <div className="ace-corner tl"><span className="ace-rank">A</span><span className="ace-suit">♥</span></div>
        <div className="ace-big-a">A</div>
        <div className="ace-back-label">ACE'S CLARITY</div>
        <div className="ace-corner br rot"><span className="ace-rank">A</span><span className="ace-suit">♥</span></div>
      </div>
    ),
  },
  {
    id: "ace-2",
    front: (
      <div className="ace-front">
        <div className="ace-corner tl"><span className="ace-rank">A</span><span className="ace-suit">♠</span></div>
        <div className="ace-diamond-gem">💠</div>
        <div className="ace-label">DIAMOND TIER</div>
        <div className="ace-tag">Crystal Clarity</div>
        <button className="ace-btn">DISCOVER</button>
        <div className="ace-corner br rot"><span className="ace-rank">A</span><span className="ace-suit">♠</span></div>
      </div>
    ),
    back: (
      <div className="ace-back">
        <div className="ace-corner tl"><span className="ace-rank">A</span><span className="ace-suit">♠</span></div>
        <div className="ace-big-a ace-spade">A</div>
        <div className="ace-back-label">ACE'S CLARITY</div>
        <div className="ace-corner br rot"><span className="ace-rank">A</span><span className="ace-suit">♠</span></div>
      </div>
    ),
  },
  {
    id: "ace-3",
    front: (
      <div className="ace-front">
        <div className="ace-corner tl"><span className="ace-rank">A</span><span className="ace-suit">♦</span></div>
        <div className="ace-diamond-gem">🔷</div>
        <div className="ace-label">APEX MEMBER</div>
        <div className="ace-tag">Limitless Access</div>
        <button className="ace-btn">JOIN NOW</button>
        <div className="ace-corner br rot"><span className="ace-rank">A</span><span className="ace-suit">♦</span></div>
      </div>
    ),
    back: (
      <div className="ace-back">
        <div className="ace-corner tl"><span className="ace-rank">A</span><span className="ace-suit">♦</span></div>
        <div className="ace-big-a ace-diamond">A</div>
        <div className="ace-back-label">ACE'S CLARITY</div>
        <div className="ace-corner br rot"><span className="ace-rank">A</span><span className="ace-suit">♦</span></div>
      </div>
    ),
  },
  {
    id: "ace-4",
    front: (
      <div className="ace-front">
        <div className="ace-corner tl"><span className="ace-rank">A</span><span className="ace-suit">♣</span></div>
        <div className="ace-diamond-gem">⬡</div>
        <div className="ace-label">ULTRA SELECT</div>
        <div className="ace-tag">Sovereign Access</div>
        <button className="ace-btn">ACTIVATE</button>
        <div className="ace-corner br rot"><span className="ace-rank">A</span><span className="ace-suit">♣</span></div>
      </div>
    ),
    back: (
      <div className="ace-back">
        <div className="ace-corner tl"><span className="ace-rank">A</span><span className="ace-suit">♣</span></div>
        <div className="ace-big-a ace-club">A</div>
        <div className="ace-back-label">ACE'S CLARITY</div>
        <div className="ace-corner br rot"><span className="ace-rank">A</span><span className="ace-suit">♣</span></div>
      </div>
    ),
  },
];

/* ══════════════════════════════════════════════════════════
   ROW 2 – REFINED QUEEN
   Rose-gold metallic sheen · modular geometry
══════════════════════════════════════════════════════════ */
const queenCards: CardData[] = [
  {
    id: "queen-1",
    front: (
      <div className="queen-front">
        <div className="queen-corner tl"><span>Q</span><span>♠</span></div>
        <div className="queen-icon">✿</div>
        <div className="queen-label">PREMIER MEMBERSHIP</div>
        <div className="queen-tag">Modular Geometry</div>
        <button className="queen-btn">LEARN MORE</button>
        <div className="queen-corner br rot"><span>Q</span><span>♠</span></div>
      </div>
    ),
    back: (
      <div className="queen-back">
        <div className="queen-corner tl"><span>Q</span><span>♠</span></div>
        <div className="queen-big-q">Q</div>
        <div className="queen-back-label">QUEEN'S GRACE</div>
        <div className="queen-corner br rot"><span>Q̃</span><span>♥</span></div>
      </div>
    ),
  },
  {
    id: "queen-2",
    front: (
      <div className="queen-front">
        <div className="queen-corner tl"><span>Q</span><span>♥</span></div>
        <div className="queen-icon">❋</div>
        <div className="queen-label">ROSE ELITE</div>
        <div className="queen-tag">Gold Refinement</div>
        <button className="queen-btn">EXPLORE</button>
        <div className="queen-corner br rot"><span>Q</span><span>♥</span></div>
      </div>
    ),
    back: (
      <div className="queen-back">
        <div className="queen-corner tl"><span>Q</span><span>♥</span></div>
        <div className="queen-big-q">Q</div>
        <div className="queen-back-label">QUEEN'S GRACE</div>
        <div className="queen-corner br rot"><span>Q̃</span><span>♠</span></div>
      </div>
    ),
  },
  {
    id: "queen-3",
    front: (
      <div className="queen-front">
        <div className="queen-corner tl"><span>Q</span><span>♦</span></div>
        <div className="queen-icon">❊</div>
        <div className="queen-label">GOLDEN CIRCLE</div>
        <div className="queen-tag">Prestige Collection</div>
        <button className="queen-btn">VIEW MORE</button>
        <div className="queen-corner br rot"><span>Q</span><span>♦</span></div>
      </div>
    ),
    back: (
      <div className="queen-back">
        <div className="queen-corner tl"><span>Q</span><span>♦</span></div>
        <div className="queen-big-q">Q</div>
        <div className="queen-back-label">QUEEN'S GRACE</div>
        <div className="queen-corner br rot"><span>Q̃</span><span>♦</span></div>
      </div>
    ),
  },
  {
    id: "queen-4",
    front: (
      <div className="queen-front">
        <div className="queen-corner tl"><span>Q</span><span>♣</span></div>
        <div className="queen-icon">✾</div>
        <div className="queen-label">CURATED ACCESS</div>
        <div className="queen-tag">Artisan Tier</div>
        <button className="queen-btn">GET ACCESS</button>
        <div className="queen-corner br rot"><span>Q</span><span>♣</span></div>
      </div>
    ),
    back: (
      <div className="queen-back">
        <div className="queen-corner tl"><span>Q</span><span>♣</span></div>
        <div className="queen-big-q">Q</div>
        <div className="queen-back-label">QUEEN'S GRACE</div>
        <div className="queen-corner br rot"><span>Q̃</span><span>♣</span></div>
      </div>
    ),
  },
];

/* ══════════════════════════════════════════════════════════
   ROW 3 – AUTHORITATIVE KING
   Onyx black + gold · commanding minimalism
══════════════════════════════════════════════════════════ */
const kingCards: CardData[] = [
  {
    id: "king-1",
    front: (
      <div className="king-front">
        <div className="king-icon">♛</div>
        <div className="king-label">PROFESSIONAL SOLUTION</div>
        <div className="king-tag">Elevated Minimalism</div>
        <button className="king-btn">VIEW DETAILS</button>
      </div>
    ),
    back: (
      <div className="king-back">
        <div className="king-corner tl"><span>K</span><span>♣</span></div>
        <div className="king-big-k">K</div>
        <div className="king-back-label">KING'S COMMAND</div>
        <div className="king-corner br rot"><span>K</span><span>♣</span></div>
      </div>
    ),
  },
  {
    id: "king-2",
    front: (
      <div className="king-front">
        <div className="king-icon">♚</div>
        <div className="king-label">EXECUTIVE SUITE</div>
        <div className="king-tag">Command & Control</div>
        <button className="king-btn">CLAIM ACCESS</button>
      </div>
    ),
    back: (
      <div className="king-back">
        <div className="king-corner tl"><span>K</span><span>♠</span></div>
        <div className="king-big-k">K</div>
        <div className="king-back-label">KING'S COMMAND</div>
        <div className="king-corner br rot"><span>K</span><span>♠</span></div>
      </div>
    ),
  },
  {
    id: "king-3",
    front: (
      <div className="king-front">
        <div className="king-icon">👑</div>
        <div className="king-label">SOVEREIGN PLAN</div>
        <div className="king-tag">Total Authority</div>
        <button className="king-btn">ASCEND</button>
      </div>
    ),
    back: (
      <div className="king-back">
        <div className="king-corner tl"><span>K</span><span>♥</span></div>
        <div className="king-big-k">K</div>
        <div className="king-back-label">KING'S COMMAND</div>
        <div className="king-corner br rot"><span>K</span><span>♥</span></div>
      </div>
    ),
  },
  {
    id: "king-4",
    front: (
      <div className="king-front">
        <div className="king-icon">⚜️</div>
        <div className="king-label">GRAND AUTHORITY</div>
        <div className="king-tag">Prestige Power</div>
        <button className="king-btn">ENTER</button>
      </div>
    ),
    back: (
      <div className="king-back">
        <div className="king-corner tl"><span>K</span><span>♦</span></div>
        <div className="king-big-k">K</div>
        <div className="king-back-label">KING'S COMMAND</div>
        <div className="king-corner br rot"><span>K</span><span>♦</span></div>
      </div>
    ),
  },
];

/* ══════════════════════════════════════════════════════════
   HERO BANNERS — one per tier
══════════════════════════════════════════════════════════ */

// ACE banner — icy crystalline, midnight blue-black, diamond motif
const AceBanner = () => (
  <div className="hb-root hb-ace">
    <div className="hb-left">
      <div className="hb-eyebrow">The pinnacle of exclusivity</div>
      <h2 className="hb-headline">Only the select<br/>few hold this card.</h2>
      <p className="hb-body">The 2026 Selective Ace collection is here — every tier backed by crystal-clear standards and absolute precision.</p>
      <button className="hb-btn hb-btn-ace">Discover the Ace ✦</button>
    </div>
    <div className="hb-right">
      <div className="hb-illustration hb-ill-ace">
        <div className="hb-arch-ace">
          <div className="hb-arch-inner-ace">
            <span className="hb-big-letter-ace">A</span>
          </div>
        </div>
        <div className="hb-laurel hb-laurel-ace">
          <svg viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="38" cy="60" rx="10" ry="18" transform="rotate(-40 38 60)" stroke="#a8c4e8" strokeWidth="1.5"/>
            <ellipse cx="22" cy="90" rx="10" ry="18" transform="rotate(-20 22 90)" stroke="#a8c4e8" strokeWidth="1.5"/>
            <ellipse cx="18" cy="122" rx="10" ry="18" transform="rotate(0 18 122)" stroke="#a8c4e8" strokeWidth="1.5"/>
            <ellipse cx="30" cy="152" rx="10" ry="18" transform="rotate(20 30 152)" stroke="#a8c4e8" strokeWidth="1.5"/>
            <ellipse cx="55" cy="172" rx="10" ry="18" transform="rotate(40 55 172)" stroke="#a8c4e8" strokeWidth="1.5"/>
            <ellipse cx="182" cy="60" rx="10" ry="18" transform="rotate(40 182 60)" stroke="#a8c4e8" strokeWidth="1.5"/>
            <ellipse cx="198" cy="90" rx="10" ry="18" transform="rotate(20 198 90)" stroke="#a8c4e8" strokeWidth="1.5"/>
            <ellipse cx="202" cy="122" rx="10" ry="18" transform="rotate(0 202 122)" stroke="#a8c4e8" strokeWidth="1.5"/>
            <ellipse cx="190" cy="152" rx="10" ry="18" transform="rotate(-20 190 152)" stroke="#a8c4e8" strokeWidth="1.5"/>
            <ellipse cx="165" cy="172" rx="10" ry="18" transform="rotate(-40 165 172)" stroke="#a8c4e8" strokeWidth="1.5"/>
            <circle cx="110" cy="192" r="7" stroke="#a8c4e8" strokeWidth="1.5"/>
          </svg>
        </div>
        <div className="hb-badge hb-badge-ace">
          <span className="hb-badge-icon">💎</span>
          <span className="hb-badge-year">2026</span>
        </div>
      </div>
    </div>
  </div>
);

// QUEEN banner — rose-gold warm, botanical, velvet richness
const QueenBanner = () => (
  <div className="hb-root hb-queen">
    <div className="hb-left">
      <div className="hb-eyebrow hb-eyebrow-queen">Crafted for the refined</div>
      <h2 className="hb-headline hb-headline-queen">Grace is not given.<br/>It is earned.</h2>
      <p className="hb-body hb-body-queen">The Queen's Grace collection celebrates those who lead with elegance — every detail woven in rose gold and quiet confidence.</p>
      <button className="hb-btn hb-btn-queen">Enter the Court ❧</button>
    </div>
    <div className="hb-right">
      <div className="hb-illustration hb-ill-queen">
        <div className="hb-arch-queen">
          <div className="hb-arch-inner-queen">
            <span className="hb-big-letter-queen">Q</span>
          </div>
        </div>
        <div className="hb-laurel hb-laurel-queen">
          <svg viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="38" cy="60" rx="10" ry="18" transform="rotate(-40 38 60)" stroke="#c8906a" strokeWidth="1.5"/>
            <ellipse cx="22" cy="90" rx="10" ry="18" transform="rotate(-20 22 90)" stroke="#c8906a" strokeWidth="1.5"/>
            <ellipse cx="18" cy="122" rx="10" ry="18" transform="rotate(0 18 122)" stroke="#c8906a" strokeWidth="1.5"/>
            <ellipse cx="30" cy="152" rx="10" ry="18" transform="rotate(20 30 152)" stroke="#c8906a" strokeWidth="1.5"/>
            <ellipse cx="55" cy="172" rx="10" ry="18" transform="rotate(40 55 172)" stroke="#c8906a" strokeWidth="1.5"/>
            <ellipse cx="182" cy="60" rx="10" ry="18" transform="rotate(40 182 60)" stroke="#c8906a" strokeWidth="1.5"/>
            <ellipse cx="198" cy="90" rx="10" ry="18" transform="rotate(20 198 90)" stroke="#c8906a" strokeWidth="1.5"/>
            <ellipse cx="202" cy="122" rx="10" ry="18" transform="rotate(0 202 122)" stroke="#c8906a" strokeWidth="1.5"/>
            <ellipse cx="190" cy="152" rx="10" ry="18" transform="rotate(-20 190 152)" stroke="#c8906a" strokeWidth="1.5"/>
            <ellipse cx="165" cy="172" rx="10" ry="18" transform="rotate(-40 165 172)" stroke="#c8906a" strokeWidth="1.5"/>
            <circle cx="110" cy="192" r="7" stroke="#c8906a" strokeWidth="1.5"/>
          </svg>
        </div>
        <div className="hb-badge hb-badge-queen">
          <span className="hb-badge-icon">✿</span>
          <span className="hb-badge-year">2026</span>
        </div>
      </div>
    </div>
  </div>
);

// KING banner — onyx black, gold foil, commanding authority
const KingBanner = () => (
  <div className="hb-root hb-king">
    <div className="hb-left">
      <div className="hb-eyebrow hb-eyebrow-king">Command without question</div>
      <h2 className="hb-headline hb-headline-king">Rule the room.<br/>Own the moment.</h2>
      <p className="hb-body hb-body-king">The King's Command collection stands apart — authoritative, minimal, and built for those who need no introduction.</p>
      <button className="hb-btn hb-btn-king">Claim the Throne ♛</button>
    </div>
    <div className="hb-right">
      <div className="hb-illustration hb-ill-king">
        <div className="hb-arch-king">
          <div className="hb-arch-inner-king">
            <span className="hb-big-letter-king">K</span>
          </div>
        </div>
        <div className="hb-laurel hb-laurel-king">
          <svg viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="38" cy="60" rx="10" ry="18" transform="rotate(-40 38 60)" stroke="#c8a84b" strokeWidth="1.5"/>
            <ellipse cx="22" cy="90" rx="10" ry="18" transform="rotate(-20 22 90)" stroke="#c8a84b" strokeWidth="1.5"/>
            <ellipse cx="18" cy="122" rx="10" ry="18" transform="rotate(0 18 122)" stroke="#c8a84b" strokeWidth="1.5"/>
            <ellipse cx="30" cy="152" rx="10" ry="18" transform="rotate(20 30 152)" stroke="#c8a84b" strokeWidth="1.5"/>
            <ellipse cx="55" cy="172" rx="10" ry="18" transform="rotate(40 55 172)" stroke="#c8a84b" strokeWidth="1.5"/>
            <ellipse cx="182" cy="60" rx="10" ry="18" transform="rotate(40 182 60)" stroke="#c8a84b" strokeWidth="1.5"/>
            <ellipse cx="198" cy="90" rx="10" ry="18" transform="rotate(20 198 90)" stroke="#c8a84b" strokeWidth="1.5"/>
            <ellipse cx="202" cy="122" rx="10" ry="18" transform="rotate(0 202 122)" stroke="#c8a84b" strokeWidth="1.5"/>
            <ellipse cx="190" cy="152" rx="10" ry="18" transform="rotate(-20 190 152)" stroke="#c8a84b" strokeWidth="1.5"/>
            <ellipse cx="165" cy="172" rx="10" ry="18" transform="rotate(-40 165 172)" stroke="#c8a84b" strokeWidth="1.5"/>
            <circle cx="110" cy="192" r="7" stroke="#c8a84b" strokeWidth="1.5"/>
          </svg>
        </div>
        <div className="hb-badge hb-badge-king">
          <span className="hb-badge-icon">♛</span>
          <span className="hb-badge-year">2026</span>
        </div>
      </div>
    </div>
  </div>
);

const ROWS: RowData[] = [
  { tier: "CONCEPT 3", subtitle: "SELECTIVE ACE", banner: <AceBanner />, interestGrid: <AceInterestGrid />, cards: aceCards },
  { tier: "CONCEPT 2", subtitle: "REFINED QUEEN", banner: <QueenBanner />, interestGrid: <QueenInterestGrid />, cards: queenCards },
  { tier: "CONCEPT 1", subtitle: "AUTHORITATIVE KING", banner: <KingBanner />, interestGrid: <KingInterestGrid />, cards: kingCards },
];

/* ─── Main export ────────────────────────────────────────── */
export default function CardSection() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .cs-root {
          font-family: 'DM Sans', sans-serif;
          background: #eaeaea;
          padding: 60px 40px 80px;
          min-height: 100vh;
        }

        /* ── Row wrapper ── */
        .cs-row { margin-bottom: 72px; }
        .cs-row-header {
          text-align: center;
          margin-bottom: 32px;
        }
        .cs-tier {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          color: #999;
          text-transform: uppercase;
          margin-bottom: 4px;
        }
        .cs-row-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 400;
          letter-spacing: 0.08em;
          color: #222;
          text-transform: uppercase;
        }

        .cs-cards {
          display: flex;
          justify-content: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        /* ── Flip mechanics ── */
        .flip-scene {
          perspective: 1000px;
          cursor: pointer;
          outline: none;
        }
        .flip-card {
          width: 200px;
          height: 280px;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.65s cubic-bezier(0.23, 1, 0.32, 1);
          border-radius: 14px;
        }
        .flip-card.flipped { transform: rotateY(180deg); }
        .flip-front,
        .flip-back {
          position: absolute;
          inset: 0;
          border-radius: 14px;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          overflow: hidden;
        }
        .flip-back { transform: rotateY(180deg); }

        /* ══ ACE styles ══════════════════════════════════════ */
        .ace-front, .ace-back {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 18px 16px;
        }
        .ace-front {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(20px) saturate(1.6);
          border: 1px solid rgba(255,255,255,0.9);
          box-shadow:
            0 8px 32px rgba(100,160,230,0.12),
            0 2px 8px rgba(100,160,230,0.08),
            inset 0 1px 0 rgba(255,255,255,0.8);
        }
        .ace-back {
          background: linear-gradient(135deg,
            #dce8ff 0%,
            #c8dcfa 50%,
            #b4d2f5 100%);
          border: 1px solid rgba(180,210,255,0.6);
          box-shadow:
            0 12px 48px rgba(80,140,230,0.18),
            inset 0 1px 0 rgba(255,255,255,0.7);
        }
        .ace-corner {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 1.1;
        }
        .ace-corner.tl { top: 10px; left: 12px; }
        .ace-corner.br { bottom: 10px; right: 12px; }
        .ace-corner.rot { transform: rotate(180deg); }
        .ace-rank {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          font-weight: 600;
          color: #c0392b;
        }
        .ace-suit {
          font-size: 11px;
          color: #c0392b;
        }
        .ace-diamond-gem {
          font-size: 52px;
          margin-bottom: 12px;
          filter: drop-shadow(0 4px 12px rgba(100,160,255,0.3));
        }
        .ace-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: #334;
          text-align: center;
          margin-bottom: 6px;
        }
        .ace-tag {
          font-size: 10px;
          color: #889;
          background: rgba(180,210,255,0.3);
          border: 1px solid rgba(180,210,255,0.5);
          border-radius: 12px;
          padding: 3px 10px;
          margin-bottom: 14px;
          letter-spacing: 0.04em;
        }
        .ace-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: #fff;
          background: #c0392b;
          border: none;
          border-radius: 20px;
          padding: 7px 18px;
          cursor: pointer;
          transition: transform 0.18s, box-shadow 0.18s;
          box-shadow: 0 4px 16px rgba(192,57,43,0.35);
        }
        .ace-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(192,57,43,0.45); }
        .ace-big-a {
          font-family: 'Cormorant Garamond', serif;
          font-size: 130px;
          font-weight: 500;
          color: #c0392b;
          line-height: 1;
          text-shadow: 0 4px 24px rgba(192,57,43,0.2);
        }
        .ace-spade { color: #1a1a2e; text-shadow: 0 4px 24px rgba(26,26,46,0.25); }
        .ace-diamond { color: #2980b9; text-shadow: 0 4px 24px rgba(41,128,185,0.25); }
        .ace-club { color: #27ae60; text-shadow: 0 4px 24px rgba(39,174,96,0.25); }
        .ace-back-label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: #7a99cc;
          text-transform: uppercase;
          position: absolute;
          bottom: 26px;
        }

        /* ══ QUEEN styles ════════════════════════════════════ */
        .queen-front, .queen-back {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 18px 16px;
        }
        .queen-front {
          background: linear-gradient(145deg, #fdf6f0 0%, #f8ede3 60%, #f0ddd0 100%);
          border: 1px solid rgba(200,160,130,0.3);
          box-shadow:
            0 8px 32px rgba(180,120,80,0.14),
            0 2px 6px rgba(180,120,80,0.08),
            inset 0 1px 0 rgba(255,250,245,0.9);
        }
        .queen-back {
          background: linear-gradient(145deg,
            #e8c5a8 0%, #d4a57a 25%, #c89060 50%, #d4a57a 75%, #e8c5a8 100%);
          box-shadow:
            0 12px 48px rgba(160,100,60,0.28),
            inset 0 1px 0 rgba(255,230,200,0.5);
        }
        .queen-corner {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 1.1;
        }
        .queen-corner.tl { top: 10px; left: 12px; }
        .queen-corner.br { bottom: 10px; right: 12px; }
        .queen-corner.rot { transform: rotate(180deg); }
        .queen-corner span:first-child {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          font-weight: 600;
          color: #8a5a35;
        }
        .queen-corner span:last-child { font-size: 11px; color: #8a5a35; }
        .queen-icon {
          font-size: 48px;
          color: #8a5a35;
          margin-bottom: 12px;
          filter: drop-shadow(0 2px 8px rgba(138,90,53,0.2));
        }
        .queen-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: #5a3820;
          text-align: center;
          margin-bottom: 6px;
        }
        .queen-tag {
          font-size: 10px;
          color: #9a6a45;
          background: rgba(200,150,100,0.15);
          border: 1px solid rgba(180,130,90,0.25);
          border-radius: 12px;
          padding: 3px 10px;
          margin-bottom: 14px;
        }
        .queen-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: #fff;
          background: linear-gradient(135deg, #a07050, #8a5a35);
          border: none;
          border-radius: 20px;
          padding: 7px 18px;
          cursor: pointer;
          transition: transform 0.18s, box-shadow 0.18s;
          box-shadow: 0 4px 16px rgba(138,90,53,0.4);
        }
        .queen-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(138,90,53,0.5); }
        .queen-big-q {
          font-family: 'Cormorant Garamond', serif;
          font-size: 140px;
          font-weight: 400;
          color: rgba(90,40,10,0.55);
          line-height: 1;
          text-shadow: 0 6px 24px rgba(90,40,10,0.2), 0 -2px 0 rgba(255,220,180,0.5);
        }
        .queen-back-label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: rgba(90,40,10,0.5);
          text-transform: uppercase;
          position: absolute;
          bottom: 26px;
        }

        /* ══ KING styles ═════════════════════════════════════ */
        .king-front, .king-back {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 18px 16px;
        }
        .king-front {
          background: linear-gradient(160deg, #f7f7f5 0%, #eeecea 100%);
          border: 1px solid rgba(180,170,150,0.2);
          box-shadow:
            0 8px 32px rgba(0,0,0,0.08),
            inset 0 1px 0 rgba(255,255,255,0.9);
        }
        .king-back {
          background: linear-gradient(160deg, #1a1814 0%, #23201a 50%, #1a1814 100%);
          border: 1px solid rgba(180,150,60,0.3);
          box-shadow:
            0 16px 56px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(220,190,80,0.15);
        }
        .king-corner {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 1.1;
        }
        .king-corner.tl { top: 10px; left: 12px; }
        .king-corner.br { bottom: 10px; right: 12px; }
        .king-corner.rot { transform: rotate(180deg); }
        .king-corner span:first-child {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          font-weight: 600;
          color: #c8a84b;
        }
        .king-corner span:last-child { font-size: 11px; color: #c8a84b; }
        .king-icon {
          font-size: 52px;
          color: #b0a090;
          margin-bottom: 14px;
          filter: drop-shadow(0 2px 6px rgba(0,0,0,0.08));
        }
        .king-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: #2a2620;
          text-align: center;
          margin-bottom: 6px;
        }
        .king-tag {
          font-size: 10px;
          color: #888070;
          background: rgba(160,140,100,0.1);
          border: 1px solid rgba(160,140,100,0.2);
          border-radius: 12px;
          padding: 3px 10px;
          margin-bottom: 14px;
        }
        .king-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: #fff;
          background: #1a1814;
          border: none;
          border-radius: 4px;
          padding: 8px 20px;
          cursor: pointer;
          transition: transform 0.18s, background 0.18s;
          box-shadow: 0 4px 16px rgba(0,0,0,0.25);
        }
        .king-btn:hover { background: #0d0c0a; transform: translateY(-2px); }
        .king-big-k {
          font-family: 'Cormorant Garamond', serif;
          font-size: 140px;
          font-weight: 400;
          background: linear-gradient(160deg, #e8cc70 0%, #c8a84b 50%, #a88030 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          filter: drop-shadow(0 4px 16px rgba(200,168,75,0.4));
        }
        .king-back-label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.22em;
          color: rgba(200,168,75,0.6);
          text-transform: uppercase;
          position: absolute;
        }
        .king-corner.tl .king-back-label,
        .king-back .king-back-label { bottom: auto; top: auto; }
        .king-back > .king-back-label { position: absolute; bottom: 26px; }


        /* ══ HERO BANNER styles ══════════════════════════════ */
        .hb-root {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 18px;
          padding: 48px 56px;
          margin: 0 auto 40px;
          max-width: 872px;
          overflow: hidden;
          position: relative;
          min-height: 220px;
          gap: 32px;
        }
        .hb-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 480px;
          z-index: 2;
        }
        .hb-right {
          flex-shrink: 0;
          width: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
        }
        .hb-eyebrow {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #a8c4e8;
        }
        .hb-eyebrow-queen { color: #c8906a; }
        .hb-eyebrow-king { color: #c8a84b; }
        .hb-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 38px;
          font-weight: 600;
          line-height: 1.15;
          color: #ffffff;
          margin: 0;
        }
        .hb-headline-queen { color: #2a1508; }
        .hb-headline-king { color: #f0e6c8; }
        .hb-body {
          font-size: 14px;
          font-weight: 300;
          line-height: 1.6;
          color: rgba(255,255,255,0.7);
          max-width: 420px;
          margin: 0;
        }
        .hb-body-queen { color: rgba(60,25,5,0.7); }
        .hb-body-king { color: rgba(240,230,200,0.65); }
        .hb-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.06em;
          border: none;
          border-radius: 28px;
          padding: 13px 28px;
          cursor: pointer;
          align-self: flex-start;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          margin-top: 4px;
        }
        .hb-btn:hover { transform: translateY(-2px); }
        .hb-btn-ace {
          background: linear-gradient(135deg, #b8d4f8, #8ab4e8);
          color: #0a1628;
          box-shadow: 0 6px 24px rgba(100,160,240,0.35);
        }
        .hb-btn-ace:hover { box-shadow: 0 10px 32px rgba(100,160,240,0.5); }
        .hb-btn-queen {
          background: linear-gradient(135deg, #d4a57a, #b87850);
          color: #fff;
          box-shadow: 0 6px 24px rgba(180,110,60,0.4);
        }
        .hb-btn-queen:hover { box-shadow: 0 10px 32px rgba(180,110,60,0.55); }
        .hb-btn-king {
          background: linear-gradient(135deg, #e8cc70, #c8a84b);
          color: #1a1408;
          box-shadow: 0 6px 24px rgba(200,168,75,0.4);
        }
        .hb-btn-king:hover { box-shadow: 0 10px 32px rgba(200,168,75,0.55); }

        /* Banner backgrounds */
        .hb-ace {
          background: linear-gradient(135deg, #0d1b2e 0%, #142540 50%, #0a1628 100%);
          box-shadow: 0 16px 48px rgba(10,22,40,0.3);
        }
        .hb-queen {
          background: linear-gradient(135deg, #f5e6d8 0%, #ecdac8 50%, #e4cdb8 100%);
          box-shadow: 0 16px 48px rgba(180,120,70,0.2);
        }
        .hb-king {
          background: linear-gradient(135deg, #141008 0%, #1e180a 50%, #141008 100%);
          box-shadow: 0 16px 48px rgba(0,0,0,0.4);
          border: 1px solid rgba(200,168,75,0.15);
        }

        /* Illustration: arch + laurel + badge */
        .hb-illustration {
          position: relative;
          width: 220px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hb-arch-ace, .hb-arch-queen, .hb-arch-king {
          width: 110px;
          height: 150px;
          border-radius: 60px 60px 14px 14px;
          overflow: hidden;
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .hb-arch-ace {
          background: linear-gradient(160deg, #1e3a5f 0%, #2a5080 100%);
          border: 1px solid rgba(168,196,232,0.3);
        }
        .hb-arch-queen {
          background: linear-gradient(160deg, #c89060 0%, #e8c5a0 50%, #c89060 100%);
          border: 1px solid rgba(200,144,96,0.4);
        }
        .hb-arch-king {
          background: linear-gradient(160deg, #0a0805 0%, #1a1408 100%);
          border: 1px solid rgba(200,168,75,0.3);
        }
        .hb-arch-inner-ace, .hb-arch-inner-queen, .hb-arch-inner-king {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }
        .hb-big-letter-ace {
          font-family: 'Cormorant Garamond', serif;
          font-size: 96px;
          font-weight: 600;
          color: rgba(168,196,232,0.5);
          line-height: 1;
        }
        .hb-big-letter-queen {
          font-family: 'Cormorant Garamond', serif;
          font-size: 96px;
          font-weight: 400;
          color: rgba(90,40,10,0.35);
          line-height: 1;
        }
        .hb-big-letter-king {
          font-family: 'Cormorant Garamond', serif;
          font-size: 96px;
          font-weight: 400;
          background: linear-gradient(160deg, #e8cc70, #c8a84b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          opacity: 0.6;
        }
        .hb-laurel {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        .hb-laurel svg { width: 100%; height: 100%; }
        .hb-badge {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          border-radius: 10px;
          padding: 8px 14px;
          z-index: 3;
        }
        .hb-badge-ace {
          background: linear-gradient(135deg, #1e3a5f, #2a5080);
          border: 1px solid rgba(168,196,232,0.4);
          box-shadow: 0 4px 16px rgba(10,22,40,0.5);
        }
        .hb-badge-queen {
          background: linear-gradient(135deg, #c89060, #d4a57a);
          border: 1px solid rgba(255,220,180,0.4);
          box-shadow: 0 4px 16px rgba(160,90,40,0.4);
        }
        .hb-badge-king {
          background: linear-gradient(135deg, #1e180a, #2a2010);
          border: 1px solid rgba(200,168,75,0.5);
          box-shadow: 0 4px 16px rgba(0,0,0,0.6);
        }
        .hb-badge-icon { font-size: 20px; line-height: 1; }
        .hb-badge-year {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.85);
        }
        .hb-badge-king .hb-badge-year { color: #c8a84b; }

        @media (max-width: 680px) {
          .hb-root { flex-direction: column; padding: 32px 24px; text-align: center; }
          .hb-btn { align-self: center; }
          .hb-headline { font-size: 28px; }
        }

        /* Divider between rows */
        .cs-row + .cs-row { border-top: 1px solid rgba(0,0,0,0.06); padding-top: 20px; }
      `}</style>

      <section className="cs-root" aria-label="Card tiers">
        {ROWS.map((row) => (
          <div className="cs-row" key={row.tier}>
            {row.banner}
            <div className="cs-row-header">
              <div className="cs-tier">{row.tier}</div>
              <div className="cs-row-title">{row.subtitle}</div>
            </div>
            <div className="cs-cards">
              {row.cards.map((card) => (
                <FlipCard key={card.id} front={card.front} back={card.back} />
              ))}
            </div>
            {row.interestGrid}
          </div>
        ))}
      </section>
    </>
  );
}
