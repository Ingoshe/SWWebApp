import { useRef, useEffect, useState } from "react";

interface Country {
  code: string;
  name: string;
  emoji: string;
}

// All 195 UN-recognised countries + widely used flags
const COUNTRIES: Country[] = [
  { code: "AF", name: "Afghanistan", emoji: "🇦🇫" },
  { code: "AL", name: "Albania", emoji: "🇦🇱" },
  { code: "DZ", name: "Algeria", emoji: "🇩🇿" },
  { code: "AD", name: "Andorra", emoji: "🇦🇩" },
  { code: "AO", name: "Angola", emoji: "🇦🇴" },
  { code: "AG", name: "Antigua & Barbuda", emoji: "🇦🇬" },
  { code: "AR", name: "Argentina", emoji: "🇦🇷" },
  { code: "AM", name: "Armenia", emoji: "🇦🇲" },
  { code: "AU", name: "Australia", emoji: "🇦🇺" },
  { code: "AT", name: "Austria", emoji: "🇦🇹" },
  { code: "AZ", name: "Azerbaijan", emoji: "🇦🇿" },
  { code: "BS", name: "Bahamas", emoji: "🇧🇸" },
  { code: "BH", name: "Bahrain", emoji: "🇧🇭" },
  { code: "BD", name: "Bangladesh", emoji: "🇧🇩" },
  { code: "BB", name: "Barbados", emoji: "🇧🇧" },
  { code: "BY", name: "Belarus", emoji: "🇧🇾" },
  { code: "BE", name: "Belgium", emoji: "🇧🇪" },
  { code: "BZ", name: "Belize", emoji: "🇧🇿" },
  { code: "BJ", name: "Benin", emoji: "🇧🇯" },
  { code: "BT", name: "Bhutan", emoji: "🇧🇹" },
  { code: "BO", name: "Bolivia", emoji: "🇧🇴" },
  { code: "BA", name: "Bosnia & Herzegovina", emoji: "🇧🇦" },
  { code: "BW", name: "Botswana", emoji: "🇧🇼" },
  { code: "BR", name: "Brazil", emoji: "🇧🇷" },
  { code: "BN", name: "Brunei", emoji: "🇧🇳" },
  { code: "BG", name: "Bulgaria", emoji: "🇧🇬" },
  { code: "BF", name: "Burkina Faso", emoji: "🇧🇫" },
  { code: "BI", name: "Burundi", emoji: "🇧🇮" },
  { code: "CV", name: "Cabo Verde", emoji: "🇨🇻" },
  { code: "KH", name: "Cambodia", emoji: "🇰🇭" },
  { code: "CM", name: "Cameroon", emoji: "🇨🇲" },
  { code: "CA", name: "Canada", emoji: "🇨🇦" },
  { code: "CF", name: "Central African Republic", emoji: "🇨🇫" },
  { code: "TD", name: "Chad", emoji: "🇹🇩" },
  { code: "CL", name: "Chile", emoji: "🇨🇱" },
  { code: "CN", name: "China", emoji: "🇨🇳" },
  { code: "CO", name: "Colombia", emoji: "🇨🇴" },
  { code: "KM", name: "Comoros", emoji: "🇰🇲" },
  { code: "CG", name: "Congo", emoji: "🇨🇬" },
  { code: "CD", name: "Congo (DRC)", emoji: "🇨🇩" },
  { code: "CR", name: "Costa Rica", emoji: "🇨🇷" },
  { code: "CI", name: "Côte d'Ivoire", emoji: "🇨🇮" },
  { code: "HR", name: "Croatia", emoji: "🇭🇷" },
  { code: "CU", name: "Cuba", emoji: "🇨🇺" },
  { code: "CY", name: "Cyprus", emoji: "🇨🇾" },
  { code: "CZ", name: "Czech Republic", emoji: "🇨🇿" },
  { code: "DK", name: "Denmark", emoji: "🇩🇰" },
  { code: "DJ", name: "Djibouti", emoji: "🇩🇯" },
  { code: "DM", name: "Dominica", emoji: "🇩🇲" },
  { code: "DO", name: "Dominican Republic", emoji: "🇩🇴" },
  { code: "EC", name: "Ecuador", emoji: "🇪🇨" },
  { code: "EG", name: "Egypt", emoji: "🇪🇬" },
  { code: "SV", name: "El Salvador", emoji: "🇸🇻" },
  { code: "GQ", name: "Equatorial Guinea", emoji: "🇬🇶" },
  { code: "ER", name: "Eritrea", emoji: "🇪🇷" },
  { code: "EE", name: "Estonia", emoji: "🇪🇪" },
  { code: "SZ", name: "Eswatini", emoji: "🇸🇿" },
  { code: "ET", name: "Ethiopia", emoji: "🇪🇹" },
  { code: "FJ", name: "Fiji", emoji: "🇫🇯" },
  { code: "FI", name: "Finland", emoji: "🇫🇮" },
  { code: "FR", name: "France", emoji: "🇫🇷" },
  { code: "GA", name: "Gabon", emoji: "🇬🇦" },
  { code: "GM", name: "Gambia", emoji: "🇬🇲" },
  { code: "GE", name: "Georgia", emoji: "🇬🇪" },
  { code: "DE", name: "Germany", emoji: "🇩🇪" },
  { code: "GH", name: "Ghana", emoji: "🇬🇭" },
  { code: "GR", name: "Greece", emoji: "🇬🇷" },
  { code: "GD", name: "Grenada", emoji: "🇬🇩" },
  { code: "GT", name: "Guatemala", emoji: "🇬🇹" },
  { code: "GN", name: "Guinea", emoji: "🇬🇳" },
  { code: "GW", name: "Guinea-Bissau", emoji: "🇬🇼" },
  { code: "GY", name: "Guyana", emoji: "🇬🇾" },
  { code: "HT", name: "Haiti", emoji: "🇭🇹" },
  { code: "HN", name: "Honduras", emoji: "🇭🇳" },
  { code: "HU", name: "Hungary", emoji: "🇭🇺" },
  { code: "IS", name: "Iceland", emoji: "🇮🇸" },
  { code: "IN", name: "India", emoji: "🇮🇳" },
  { code: "ID", name: "Indonesia", emoji: "🇮🇩" },
  { code: "IR", name: "Iran", emoji: "🇮🇷" },
  { code: "IQ", name: "Iraq", emoji: "🇮🇶" },
  { code: "IE", name: "Ireland", emoji: "🇮🇪" },
  { code: "IL", name: "Israel", emoji: "🇮🇱" },
  { code: "IT", name: "Italy", emoji: "🇮🇹" },
  { code: "JM", name: "Jamaica", emoji: "🇯🇲" },
  { code: "JP", name: "Japan", emoji: "🇯🇵" },
  { code: "JO", name: "Jordan", emoji: "🇯🇴" },
  { code: "KZ", name: "Kazakhstan", emoji: "🇰🇿" },
  { code: "KE", name: "Kenya", emoji: "🇰🇪" },
  { code: "KI", name: "Kiribati", emoji: "🇰🇮" },
  { code: "KP", name: "North Korea", emoji: "🇰🇵" },
  { code: "KR", name: "South Korea", emoji: "🇰🇷" },
  { code: "KW", name: "Kuwait", emoji: "🇰🇼" },
  { code: "KG", name: "Kyrgyzstan", emoji: "🇰🇬" },
  { code: "LA", name: "Laos", emoji: "🇱🇦" },
  { code: "LV", name: "Latvia", emoji: "🇱🇻" },
  { code: "LB", name: "Lebanon", emoji: "🇱🇧" },
  { code: "LS", name: "Lesotho", emoji: "🇱🇸" },
  { code: "LR", name: "Liberia", emoji: "🇱🇷" },
  { code: "LY", name: "Libya", emoji: "🇱🇾" },
  { code: "LI", name: "Liechtenstein", emoji: "🇱🇮" },
  { code: "LT", name: "Lithuania", emoji: "🇱🇹" },
  { code: "LU", name: "Luxembourg", emoji: "🇱🇺" },
  { code: "MG", name: "Madagascar", emoji: "🇲🇬" },
  { code: "MW", name: "Malawi", emoji: "🇲🇼" },
  { code: "MY", name: "Malaysia", emoji: "🇲🇾" },
  { code: "MV", name: "Maldives", emoji: "🇲🇻" },
  { code: "ML", name: "Mali", emoji: "🇲🇱" },
  { code: "MT", name: "Malta", emoji: "🇲🇹" },
  { code: "MH", name: "Marshall Islands", emoji: "🇲🇭" },
  { code: "MR", name: "Mauritania", emoji: "🇲🇷" },
  { code: "MU", name: "Mauritius", emoji: "🇲🇺" },
  { code: "MX", name: "Mexico", emoji: "🇲🇽" },
  { code: "FM", name: "Micronesia", emoji: "🇫🇲" },
  { code: "MD", name: "Moldova", emoji: "🇲🇩" },
  { code: "MC", name: "Monaco", emoji: "🇲🇨" },
  { code: "MN", name: "Mongolia", emoji: "🇲🇳" },
  { code: "ME", name: "Montenegro", emoji: "🇲🇪" },
  { code: "MA", name: "Morocco", emoji: "🇲🇦" },
  { code: "MZ", name: "Mozambique", emoji: "🇲🇿" },
  { code: "MM", name: "Myanmar", emoji: "🇲🇲" },
  { code: "NA", name: "Namibia", emoji: "🇳🇦" },
  { code: "NR", name: "Nauru", emoji: "🇳🇷" },
  { code: "NP", name: "Nepal", emoji: "🇳🇵" },
  { code: "NL", name: "Netherlands", emoji: "🇳🇱" },
  { code: "NZ", name: "New Zealand", emoji: "🇳🇿" },
  { code: "NI", name: "Nicaragua", emoji: "🇳🇮" },
  { code: "NE", name: "Niger", emoji: "🇳🇪" },
  { code: "NG", name: "Nigeria", emoji: "🇳🇬" },
  { code: "MK", name: "North Macedonia", emoji: "🇲🇰" },
  { code: "NO", name: "Norway", emoji: "🇳🇴" },
  { code: "OM", name: "Oman", emoji: "🇴🇲" },
  { code: "PK", name: "Pakistan", emoji: "🇵🇰" },
  { code: "PW", name: "Palau", emoji: "🇵🇼" },
  { code: "PA", name: "Panama", emoji: "🇵🇦" },
  { code: "PG", name: "Papua New Guinea", emoji: "🇵🇬" },
  { code: "PY", name: "Paraguay", emoji: "🇵🇾" },
  { code: "PE", name: "Peru", emoji: "🇵🇪" },
  { code: "PH", name: "Philippines", emoji: "🇵🇭" },
  { code: "PL", name: "Poland", emoji: "🇵🇱" },
  { code: "PT", name: "Portugal", emoji: "🇵🇹" },
  { code: "QA", name: "Qatar", emoji: "🇶🇦" },
  { code: "RO", name: "Romania", emoji: "🇷🇴" },
  { code: "RU", name: "Russia", emoji: "🇷🇺" },
  { code: "RW", name: "Rwanda", emoji: "🇷🇼" },
  { code: "KN", name: "Saint Kitts & Nevis", emoji: "🇰🇳" },
  { code: "LC", name: "Saint Lucia", emoji: "🇱🇨" },
  { code: "VC", name: "Saint Vincent & Grenadines", emoji: "🇻🇨" },
  { code: "WS", name: "Samoa", emoji: "🇼🇸" },
  { code: "SM", name: "San Marino", emoji: "🇸🇲" },
  { code: "ST", name: "São Tomé & Príncipe", emoji: "🇸🇹" },
  { code: "SA", name: "Saudi Arabia", emoji: "🇸🇦" },
  { code: "SN", name: "Senegal", emoji: "🇸🇳" },
  { code: "RS", name: "Serbia", emoji: "🇷🇸" },
  { code: "SC", name: "Seychelles", emoji: "🇸🇨" },
  { code: "SL", name: "Sierra Leone", emoji: "🇸🇱" },
  { code: "SG", name: "Singapore", emoji: "🇸🇬" },
  { code: "SK", name: "Slovakia", emoji: "🇸🇰" },
  { code: "SI", name: "Slovenia", emoji: "🇸🇮" },
  { code: "SB", name: "Solomon Islands", emoji: "🇸🇧" },
  { code: "SO", name: "Somalia", emoji: "🇸🇴" },
  { code: "ZA", name: "South Africa", emoji: "🇿🇦" },
  { code: "SS", name: "South Sudan", emoji: "🇸🇸" },
  { code: "ES", name: "Spain", emoji: "🇪🇸" },
  { code: "LK", name: "Sri Lanka", emoji: "🇱🇰" },
  { code: "SD", name: "Sudan", emoji: "🇸🇩" },
  { code: "SR", name: "Suriname", emoji: "🇸🇷" },
  { code: "SE", name: "Sweden", emoji: "🇸🇪" },
  { code: "CH", name: "Switzerland", emoji: "🇨🇭" },
  { code: "SY", name: "Syria", emoji: "🇸🇾" },
  { code: "TW", name: "Taiwan", emoji: "🇹🇼" },
  { code: "TJ", name: "Tajikistan", emoji: "🇹🇯" },
  { code: "TZ", name: "Tanzania", emoji: "🇹🇿" },
  { code: "TH", name: "Thailand", emoji: "🇹🇭" },
  { code: "TL", name: "Timor-Leste", emoji: "🇹🇱" },
  { code: "TG", name: "Togo", emoji: "🇹🇬" },
  { code: "TO", name: "Tonga", emoji: "🇹🇴" },
  { code: "TT", name: "Trinidad & Tobago", emoji: "🇹🇹" },
  { code: "TN", name: "Tunisia", emoji: "🇹🇳" },
  { code: "TR", name: "Turkey", emoji: "🇹🇷" },
  { code: "TM", name: "Turkmenistan", emoji: "🇹🇲" },
  { code: "TV", name: "Tuvalu", emoji: "🇹🇻" },
  { code: "UG", name: "Uganda", emoji: "🇺🇬" },
  { code: "UA", name: "Ukraine", emoji: "🇺🇦" },
  { code: "AE", name: "United Arab Emirates", emoji: "🇦🇪" },
  { code: "GB", name: "United Kingdom", emoji: "🇬🇧" },
  { code: "US", name: "United States", emoji: "🇺🇸" },
  { code: "UY", name: "Uruguay", emoji: "🇺🇾" },
  { code: "UZ", name: "Uzbekistan", emoji: "🇺🇿" },
  { code: "VU", name: "Vanuatu", emoji: "🇻🇺" },
  { code: "VE", name: "Venezuela", emoji: "🇻🇪" },
  { code: "VN", name: "Vietnam", emoji: "🇻🇳" },
  { code: "YE", name: "Yemen", emoji: "🇾🇪" },
  { code: "ZM", name: "Zambia", emoji: "🇿🇲" },
  { code: "ZW", name: "Zimbabwe", emoji: "🇿🇼" },
];

export default function FlagCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const [paused, setPaused] = useState(false);
  const [tooltip, setTooltip] = useState<{ name: string; x: number } | null>(
    null
  );

  // Triple the list to ensure seamless infinite loop
  const repeated = [...COUNTRIES, ...COUNTRIES, ...COUNTRIES];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const ITEM_WIDTH = 80;
    const SINGLE_SET = COUNTRIES.length * ITEM_WIDTH;
    const SPEED = 0.5;

    let animId: number;

    const tick = () => {
      if (!paused) {
        posRef.current += SPEED;
        if (posRef.current >= SINGLE_SET) posRef.current -= SINGLE_SET;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [paused]);

  useEffect(() => {
    const track = trackRef.current;
    const root = rootRef.current;
    if (!track || !root) return;

    const ITEM_WIDTH = 80;
    const SINGLE_SET = COUNTRIES.length * ITEM_WIDTH;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      posRef.current += delta;
      if (posRef.current >= SINGLE_SET) posRef.current -= SINGLE_SET;
      if (posRef.current < 0) posRef.current += SINGLE_SET;
      track.style.transform = `translateX(-${posRef.current}px)`;
    };

    root.addEventListener("wheel", handleWheel, { passive: false });
    return () => root.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap');

        .fc-root {
          font-family: 'DM Sans', sans-serif;
          width: 100%;
          background: #ebebeb;
          border-bottom: 1px solid rgba(0,0,0,0.08);
          padding: 10px 0;
          position: relative;
          overflow: hidden;
          user-select: none;
        }

        /* Fade edges */
        .fc-root::before,
        .fc-root::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
        }
        .fc-root::before {
          left: 0;
          background: linear-gradient(to right, #ebebeb 0%, transparent 100%);
        }
        .fc-root::after {
          right: 0;
          background: linear-gradient(to left, #ebebeb 0%, transparent 100%);
        }

        .fc-viewport {
          overflow: hidden;
          width: 100%;
        }

        .fc-track {
          display: flex;
          align-items: center;
          gap: 12px;
          will-change: transform;
          width: max-content;
        }

        .fc-flag {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          flex-shrink: 0;
          transition: transform 0.18s ease;
          position: relative;
        }
        .fc-flag:hover { transform: translateY(-3px) scale(1.12); }

        .fc-emoji {
          font-size: 30px;
          line-height: 1;
          /* Crisp rendering on all platforms */
          text-rendering: optimizeLegibility;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.12));
          width: 44px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          overflow: hidden;
          background: rgba(255,255,255,0.25);
        }

        /* Tooltip */
        .fc-tooltip {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          background: #1a1a1a;
          color: #fff;
          font-size: 11px;
          font-weight: 500;
          white-space: nowrap;
          padding: 4px 8px;
          border-radius: 6px;
          pointer-events: none;
          letter-spacing: 0.02em;
          z-index: 10;
        }
        .fc-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 4px solid transparent;
          border-top-color: #1a1a1a;
        }
      `}</style>

      <div
        ref={rootRef}
        className="fc-root"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          setPaused(false);
          setTooltip(null);
        }}
        aria-label="World flags carousel"
        role="region"
      >
        <div className="fc-viewport">
          <div className="fc-track" ref={trackRef}>
            {repeated.map((country, i) => (
              <div
                key={`${country.code}-${i}`}
                className="fc-flag"
                onMouseEnter={(e) => {
                  const rect = (
                    e.currentTarget as HTMLElement
                  ).getBoundingClientRect();
                  setTooltip({ name: country.name, x: rect.left });
                }}
                onMouseLeave={() => setTooltip(null)}
                title={country.name}
                role="img"
                aria-label={country.name}
              >
                <span className="fc-emoji">{country.emoji}</span>
                {tooltip?.name === country.name && (
                  <div className="fc-tooltip">{country.name}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
