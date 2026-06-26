import { useEffect, useState, useRef, useCallback } from "react";
import profilePhoto from "@/imports/AnmolPORT.jpeg";

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL STYLES — injected once
// ─────────────────────────────────────────────────────────────────────────────
const GLOBAL_STYLES = `
  :root {
    --font-display: 'DM Serif Display', Georgia, serif;
    --font-body: 'DM Sans', system-ui, sans-serif;
  }

  body { font-family: var(--font-body); scroll-behavior: smooth; }
  h1, h2, h3 { font-family: var(--font-display); }

  @keyframes soarWing {
    0%, 100% { transform: rotate(-18deg); }
    50%       { transform: rotate(12deg);  }
  }
  @keyframes soarWingR {
    0%, 100% { transform: rotate(18deg) scaleX(-1); }
    50%       { transform: rotate(-12deg) scaleX(-1); }
  }
  @keyframes cloudDrift {
    from { transform: translateX(-220px); }
    to   { transform: translateX(110vw);  }
  }
  @keyframes particleRise {
    0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0.7; }
    100% { transform: translateY(-60px) translateX(12px) scale(0); opacity: 0; }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(36px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes heroReveal {
    from { opacity: 0; transform: scale(0.96) translateY(20px); }
    to   { opacity: 1; transform: scale(1) translateY(0);       }
  }
  @keyframes shimmerText {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center;  }
  }
  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 18px rgba(232,150,10,0.25); }
    50%       { box-shadow: 0 0 38px rgba(232,150,10,0.55); }
  }
  @keyframes floatCard {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-6px); }
  }
  @keyframes bgBirdFly {
    0%   { transform: translateX(-120px) translateY(0px);   opacity: 0;   }
    5%   { opacity: 1; }
    48%  { transform: translateX(48vw)  translateY(-18px);  }
    52%  { transform: translateX(52vw)  translateY(-22px);  }
    95%  { opacity: 0.6; }
    100% { transform: translateX(115vw) translateY(-10px);  opacity: 0;   }
  }
  @keyframes bgBirdWingA {
    0%, 100% { transform: rotate(-20deg); }
    50%       { transform: rotate(14deg);  }
  }
  @keyframes bgBirdWingB {
    0%, 100% { transform: rotate(20deg); }
    50%       { transform: rotate(-14deg); }
  }
  .bg-bird { animation: bgBirdFly linear infinite; }
  .bg-bird-wing-a { animation: bgBirdWingA ease-in-out infinite; }
  .bg-bird-wing-b { animation: bgBirdWingB ease-in-out infinite; }

  @keyframes tooltipPop {
    from { opacity: 0; transform: translateY(6px) scale(0.95); }
    to   { opacity: 1; transform: translateY(0)   scale(1);    }
  }

  .connect-card:hover .connect-tooltip {
    display: block;
    animation: tooltipPop 0.18s cubic-bezier(.22,1,.36,1) both;
  }
  .connect-tooltip { display: none; }

  @keyframes featherDrift {
    0%   { transform: translateY(0) translateX(0) rotate(0deg);    opacity: 0.9; }
    100% { transform: translateY(-22px) translateX(10px) rotate(25deg); opacity: 0; }
  }
  @keyframes resumeShimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center;  }
  }
  .resume-btn { background-size: 220% auto; }
  .resume-btn:hover { animation: resumeShimmer 1.8s linear infinite; }
  .resume-btn:hover .feather-1 { animation: featherDrift 0.7s ease-out 0s both; }
  .resume-btn:hover .feather-2 { animation: featherDrift 0.7s ease-out 0.12s both; }
  .resume-btn:hover .feather-3 { animation: featherDrift 0.7s ease-out 0.24s both; }
  .feather-1, .feather-2, .feather-3 { pointer-events: none; }

  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  .reveal {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1);
  }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  .wing-l {
    transform-origin: 42px 22px;
    animation: soarWing 0.75s ease-in-out infinite;
  }
  .wing-r {
    transform-origin: 42px 22px;
    animation: soarWingR 0.75s ease-in-out infinite;
  }

  .skill-bar-fill {
    animation: fillBar 1.2s cubic-bezier(.22,1,.36,1) forwards;
    width: 0%;
  }
  @keyframes fillBar {
    to { width: var(--target-width); }
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(62,126,197,0.3); border-radius: 4px; }

  /* ── photo animations ── */
  @keyframes photoFloat {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-10px); }
  }
  @keyframes ringPulse {
    0%, 100% { opacity: 0.75; transform: scale(1.04); }
    50%       { opacity: 1;   transform: scale(1.09); }
  }
  @keyframes featherOrbit1 {
    0%   { transform: rotate(0deg)   translateX(0) translateY(0)   rotate(0deg);   opacity:0.55; }
    33%  { transform: rotate(10deg)  translateX(5px) translateY(-14px) rotate(-10deg); opacity:0.8; }
    66%  { transform: rotate(-8deg)  translateX(-4px) translateY(-8px) rotate(8deg);  opacity:0.5; }
    100% { transform: rotate(0deg)   translateX(0) translateY(0)   rotate(0deg);   opacity:0.55; }
  }
  @keyframes featherOrbit2 {
    0%   { transform: translateY(0)   rotate(0deg);   opacity:0.4; }
    50%  { transform: translateY(-10px) rotate(18deg);  opacity:0.7; }
    100% { transform: translateY(0)   rotate(0deg);   opacity:0.4; }
  }
  @keyframes featherOrbit3 {
    0%   { transform: translateY(0)   rotate(-5deg);  opacity:0.35; }
    50%  { transform: translateY(-7px) rotate(-22deg); opacity:0.65; }
    100% { transform: translateY(0)   rotate(-5deg);  opacity:0.35; }
  }

  /* bird orbiting the photo */
  @keyframes orbitArm {
    0%   { transform: rotate(0deg)   translateX(152px); opacity:0;   }
    6%   { opacity: 1; }
    42%  { transform: rotate(360deg) translateX(152px); opacity: 1;  }
    44%  { transform: rotate(362deg) translateX(152px); opacity: 0;  }
    100% { transform: rotate(362deg) translateX(152px); opacity: 0;  }
  }
  @keyframes orbitSelf {
    0%   { transform: rotate(0deg); }
    42%  { transform: rotate(-360deg); }
    100% { transform: rotate(-360deg); }
  }

  /* final section bird ascending */
  @keyframes birdAscend {
    0%   { transform: translate(0,0) scale(1);           opacity:1;   }
    80%  { transform: translate(60px,-110px) scale(0.18); opacity:0.7; }
    100% { transform: translate(70px,-140px) scale(0.04); opacity:0;   }
  }
  @keyframes featherFall {
    0%   { transform: translateY(0)   translateX(0)   rotate(0deg);   opacity:0.7; }
    100% { transform: translateY(90px) translateX(28px) rotate(42deg); opacity:0;   }
  }
  @keyframes featherFall2 {
    0%   { transform: translateY(0)   translateX(0)    rotate(0deg);   opacity:0.6; }
    100% { transform: translateY(70px) translateX(-20px) rotate(-30deg); opacity:0;   }
  }

  /* ── richer interactive hover states ── */

  @keyframes cardPop {
    0%   { transform: translateY(0) scale(1);      box-shadow: 0 8px 32px rgba(0,0,0,0.07); }
    60%  { transform: translateY(-7px) scale(1.02); }
    100% { transform: translateY(-5px) scale(1.015); box-shadow: 0 22px 52px rgba(0,0,0,0.13); }
  }
  @keyframes cardUnpop {
    0%   { transform: translateY(-5px) scale(1.015); }
    100% { transform: translateY(0) scale(1);         }
  }

  @keyframes glowPulseBlue {
    0%, 100% { box-shadow: 0 0 0 0 rgba(62,126,197,0); }
    50%       { box-shadow: 0 0 22px 6px rgba(62,126,197,0.18); }
  }

  @keyframes tagBounce {
    0%,100% { transform: scale(1); }
    40%      { transform: scale(1.1); }
  }

  .hover-lift {
    transition: transform 0.28s cubic-bezier(.22,1,.36,1), box-shadow 0.28s ease;
  }
  .hover-lift:hover {
    transform: translateY(-5px) scale(1.015);
    box-shadow: 0 22px 48px rgba(0,0,0,0.12) !important;
  }

  .hover-glow:hover {
    animation: glowPulseBlue 1.6s ease-in-out infinite;
  }

  /* Magnetic pull on achievement rows */
  .achievement-row {
    transition: transform 0.22s cubic-bezier(.22,1,.36,1), background 0.22s ease, padding-left 0.22s ease;
  }
  .achievement-row:hover {
    transform: translateX(6px);
    background: rgba(255,255,255,0.85) !important;
    padding-left: 32px !important;
  }

  /* Cert card shine sweep */
  .cert-card {
    position: relative;
    overflow: hidden;
    transition: transform 0.22s cubic-bezier(.22,1,.36,1), box-shadow 0.22s ease;
  }
  .cert-card::before {
    content: '';
    position: absolute;
    top: 0; left: -80%;
    width: 60%; height: 100%;
    background: linear-gradient(105deg, transparent, rgba(255,255,255,0.45), transparent);
    transform: skewX(-15deg);
    transition: left 0.5s ease;
    pointer-events: none;
  }
  .cert-card:hover::before { left: 140%; }
  .cert-card:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 16px 36px rgba(0,0,0,0.12) !important;
  }

  /* Experience card border glow on hover */
  .exp-card {
    transition: transform 0.25s cubic-bezier(.22,1,.36,1), box-shadow 0.25s ease, border-color 0.25s ease;
  }
  .exp-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 44px rgba(232,150,10,0.14) !important;
    border-color: rgba(232,150,10,0.35) !important;
  }

  /* Nav link underline grow */
  .nav-link {
    position: relative;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 50%;
    width: 0; height: 2px;
    background: #3E7EC5;
    border-radius: 2px;
    transition: width 0.2s ease, left 0.2s ease;
  }
  .nav-link:hover::after { width: 60%; left: 20%; }

  /* Skill category card tilt on hover */
  .skill-card {
    transition: transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s ease;
  }
  .skill-card:hover {
    transform: perspective(600px) rotateX(-2deg) translateY(-4px);
    box-shadow: 0 20px 48px rgba(62,126,197,0.13) !important;
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// SKY ATMOSPHERES — one per section
// ─────────────────────────────────────────────────────────────────────────────
const SKIES = [
  "linear-gradient(170deg, #FFE5CA 0%, #FFD0A0 30%, #C5DEFF 100%)",  // Hero   — sunrise
  "linear-gradient(170deg, #D8EEFF 0%, #BDD8FF 45%, #A5CAFF 100%)",  // About  — morning blue
  "linear-gradient(170deg, #C2DAFF 0%, #91C3FF 50%, #6AADFF 100%)",  // Skills — bright sky
  "linear-gradient(170deg, #C4CCFF 0%, #ABAEFF 50%, #8E97FF 100%)",  // Projs  — lavender
  "linear-gradient(170deg, #FFD98A 0%, #FFC147 45%, #FF9B42 100%)",  // Exp    — golden hour
  "linear-gradient(170deg, #FFE999 0%, #FFD060 50%, #FFB840 100%)",  // Achiev — warm gold
  "linear-gradient(170deg, #FFB8CC 0%, #D8A0FF 50%, #9B7FFF 100%)",  // Certs  — sunset
  "linear-gradient(170deg, #BBCFFF 0%, #C8B8FF 50%, #FFB8CC 100%)",  // Contact— twilight
];

const SECTION_IDS = ["hero","about","skills","projects","experience","achievements","certifications","contact"]; // "contact" = FinalSection

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "Anmol",          href: "#hero"    },
  { label: "About",          href: "#about"    },
  { label: "Skills",         href: "#skills"   },
  { label: "Projects",       href: "#projects" },
  { label: "Experience",     href: "#experience" },
  { label: "Achievements",   href: "#achievements" },
  { label: "Certificates",   href: "#certifications" },
  { label: "Contact",        href: "#contact"  },
  // "Let's Talk" removed per user request
];

const SKILLS = [
  { name: "React & Next.js", level: 88, cat: "Frontend"  },
  { name: "TypeScript",      level: 82, cat: "Frontend"  },
  { name: "Tailwind CSS",    level: 90, cat: "Frontend"  },
  { name: "Python",          level: 78, cat: "Backend"   },
  { name: "Node.js",         level: 75, cat: "Backend"   },
  { name: "MongoDB",         level: 70, cat: "Backend"   },
  { name: "Figma & UI/UX",  level: 85, cat: "Design"    },
  { name: "Git & GitHub",    level: 92, cat: "Tools"     },
];

const PROJECTS = [
  {
    title: "SkyBoard",
    desc: "A real-time collaborative whiteboard with infinite canvas, live cursors, and multi-user drawing — built for seamless remote ideation.",
    tags: ["React", "WebSockets", "Canvas API", "Node.js"],
    color: "from-blue-100 to-indigo-100",
    accent: "#3E7EC5",
    emoji: "🖼",
  },
  {
    title: "Verdant — Plant Care App",
    desc: "Smart plant care companion with AI-powered diagnosis, watering schedules, and growth tracking. 2 000+ downloads on the Play Store.",
    tags: ["React Native", "Python", "TensorFlow", "Firebase"],
    color: "from-emerald-100 to-teal-100",
    accent: "#5EB5A6",
    emoji: "🌿",
  },
  {
    title: "Luminary Dashboard",
    desc: "Analytics SaaS platform offering real-time KPI monitoring, customisable widgets, and CSV/PDF exports for SME clients.",
    tags: ["Next.js", "Recharts", "PostgreSQL", "Tailwind"],
    color: "from-amber-100 to-orange-100",
    accent: "#E8960A",
    emoji: "✦",
  },
  {
    title: "Echoes — Music Discovery",
    desc: "Mood-based music discovery engine that curates personalised playlists using Spotify API and collaborative filtering.",
    tags: ["React", "Spotify API", "Python", "MongoDB"],
    color: "from-purple-100 to-pink-100",
    accent: "#9B7FFF",
    emoji: "♪",
  },
];

const EXPERIENCE = [
  {
    role:    "Frontend Developer Intern",
    company: "TechNova Solutions",
    period:  "Jun 2024 — Aug 2024",
    points: [
      "Redesigned the customer dashboard, reducing load time by 38% and improving user retention.",
      "Built reusable component library used across 4 product teams.",
      "Collaborated in agile sprints, shipped 6 features over 10 weeks.",
    ],
  },
  {
    role:    "UI/UX Design Lead",
    company: "Google Developer Student Club",
    period:  "Aug 2023 — May 2024",
    points: [
      "Led design sprints for 3 community projects serving 800+ students.",
      "Conducted usability testing workshops and presented findings to faculty.",
      "Mentored a team of 8 junior designers on Figma and design systems.",
    ],
  },
];

const ACHIEVEMENTS = [
  { title: "Smart India Hackathon — National Finalist",    year: "2024", icon: "🏆" },
  { title: "HackMIT — Top 12 Projects",                   year: "2024", icon: "⚡" },
  { title: "GDSC Solution Challenge — Regional Winner",    year: "2023", icon: "🥇" },
  { title: "Best UI/UX Award — TechFest IIT Bombay",      year: "2023", icon: "🎨" },
  { title: "National Scholarship for Technical Excellence",year: "2022", icon: "📚" },
];

const CERTS = [
  { name: "Google Associate Cloud Engineer",  issuer: "Google Cloud",   color: "#4285F4" },
  { name: "Meta Frontend Developer",           issuer: "Meta / Coursera", color: "#0082FB" },
  { name: "AWS Cloud Practitioner",            issuer: "Amazon",          color: "#FF9900" },
  { name: "UI/UX Design Specialisation",       issuer: "Google / Coursera",color: "#34A853" },
  { name: "Python for Data Science",           issuer: "IBM / Coursera",  color: "#006699" },
];

// ─────────────────────────────────────────────────────────────────────────────
// BIRD COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
function Bird({ progress }: { progress: number }) {
  const birdTop = `${88 - progress * 78}%`;
  const isGolden = progress > 0.55;
  const isHighAlt = progress > 0.75;

  const birdColor = isHighAlt ? "#D4A017" : isGolden ? "#E8960A" : "#1A1A2E";
  const glowStyle = isGolden
    ? { filter: `drop-shadow(0 0 ${isHighAlt ? 10 : 6}px ${isHighAlt ? "rgba(212,160,23,0.8)" : "rgba(232,150,10,0.5)"})` }
    : {};

  return (
    <div
      className="fixed left-4 md:left-6 z-40 hidden md:flex flex-col items-center gap-2"
      style={{ top: birdTop, transform: "translateY(-50%)", transition: "top 0.4s cubic-bezier(.22,1,.36,1)" }}
    >
      {/* Progress line */}
      <div
        className="w-px rounded-full"
        style={{
          height: `${progress * 60 + 20}px`,
          background: isGolden
            ? "linear-gradient(to top, transparent, rgba(232,150,10,0.5))"
            : "linear-gradient(to top, transparent, rgba(62,126,197,0.35))",
          transition: "height 0.4s ease, background 1s ease",
        }}
      />

      {/* Bird SVG */}
      <div style={{ ...glowStyle, transition: "filter 1s ease" }}>
        <svg viewBox="0 0 84 48" className="w-14 h-9" aria-label="Bird progress indicator">
          {/* Upper wing */}
          <g className="wing-l">
            <path
              d="M 42 22 C 34 16 22 11 6 8 C 16 14 28 19 40 22"
              fill={birdColor}
              opacity="0.92"
            />
          </g>
          {/* Lower wing trailing edge */}
          <g className="wing-r">
            <path
              d="M 42 24 C 32 28 20 33 5 37 C 17 31 30 25 42 24"
              fill={birdColor}
              opacity="0.65"
            />
          </g>
          {/* Body */}
          <ellipse cx="51" cy="23" rx="11" ry="3.5" fill={birdColor} opacity="0.95" />
          {/* Head */}
          <ellipse cx="60" cy="21" rx="4.5" ry="3.5" fill={birdColor} />
          {/* Beak */}
          <path d="M 64 20.5 L 70 22" stroke={birdColor} strokeWidth="1.6" strokeLinecap="round" />
          {/* Tail */}
          <path
            d="M 40 22 C 30 20 22 17 16 13 M 40 24 C 30 26 22 30 16 34"
            stroke={birdColor} strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.72"
          />
        </svg>
      </div>

      {/* Altitude label */}
      <span
        className="text-[9px] font-medium tracking-widest rotate-90 origin-center mt-1"
        style={{ color: isGolden ? "#E8960A" : "#6B7A9A", letterSpacing: "0.2em", opacity: 0.8 }}
      >
        {Math.round(progress * 100)}%
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING NAV
// ─────────────────────────────────────────────────────────────────────────────
function FloatingNav({ active, visible }: { active: number; visible: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500"
      style={{ opacity: visible ? 1 : 0, transform: `translateX(-50%) translateY(${visible ? 0 : -16}px)` }}
    >
      {/* Desktop nav */}
      <nav
        className="hidden md:flex items-center gap-0 px-2 py-2 rounded-3xl text-xs font-medium overflow-x-auto"
        style={{
          background: "rgba(255,255,255,0.52)",
          backdropFilter: "blur(32px) saturate(2)",
          border: "1px solid rgba(255,255,255,0.88)",
          boxShadow: "0 12px 44px rgba(62,126,197,0.1), 0 1px 0 rgba(255,255,255,1) inset",
          maxWidth: "97vw",
        }}
      >
        {NAV_ITEMS.map((item, i) => {
          const isActive = active === i;
          const isAnmol = item.label === "Anmol";
          return (
            <a
              key={item.href}
              href={item.href}
              className={`nav-link relative transition-all duration-200 flex flex-col items-center gap-0.5 whitespace-nowrap flex-shrink-0 ${isAnmol ? "px-2.5 py-1" : "px-2 py-0.5"} rounded-xl`}
              style={{ 
                color: isAnmol ? (isActive ? "#1A1A2E" : "#1A1A2E") : (isActive ? "#3E7EC5" : "#4A5568"),
                textDecoration: "none",
                fontFamily: isAnmol ? "var(--font-display)" : "inherit",
                fontStyle: isAnmol ? "italic" : "normal",
                fontSize: isAnmol ? "0.875rem" : "0.75rem",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(62,126,197,0.08)";
                if (!isAnmol) e.currentTarget.style.color = "#3E7EC5";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = isAnmol ? "#1A1A2E" : (isActive ? "#3E7EC5" : "#4A5568");
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              {item.label}
              {isActive && (
                <span
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 rounded-full"
                  style={{ width: 12, height: 1.5, background: isAnmol ? "#1A1A2E" : "#3E7EC5", borderRadius: 4 }}
                />
              )}
            </a>
          );
        })}
      </nav>

      {/* Mobile nav */}
      <div className="md:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center w-11 h-11 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.9)",
            boxShadow: "0 8px 24px rgba(62,126,197,0.12)",
          }}
          aria-label="Menu"
        >
          <span className="flex flex-col gap-1.5 w-5">
            <span className="block h-0.5 bg-foreground rounded transition-all" style={{ transform: open ? "rotate(45deg) translateY(7px)" : "none" }} />
            <span className="block h-0.5 bg-foreground rounded transition-all" style={{ opacity: open ? 0 : 1 }} />
            <span className="block h-0.5 bg-foreground rounded transition-all" style={{ transform: open ? "rotate(-45deg) translateY(-7px)" : "none" }} />
          </span>
        </button>
        {open && (
          <div
            className="absolute top-14 right-0 flex flex-col rounded-2xl p-3 gap-1 min-w-[160px]"
            style={{
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.9)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
            }}
          >
            {NAV_ITEMS.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                style={{ color: "#1A1A2E" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(62,126,197,0.08)"; e.currentTarget.style.color = "#3E7EC5"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#1A1A2E"; }}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CLOUD
// ─────────────────────────────────────────────────────────────────────────────
function Cloud({ top, duration, delay, scale, opacity }: { top: string; duration: number; delay: number; scale: number; opacity: number }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{ top, animation: `cloudDrift ${duration}s linear ${delay}s infinite`, opacity, transform: `scale(${scale})` }}
    >
      <svg viewBox="0 0 220 80" className="w-48 md:w-64 h-auto fill-white" aria-hidden>
        <ellipse cx="110" cy="55" rx="90" ry="28" />
        <ellipse cx="80"  cy="44" rx="55" ry="32" />
        <ellipse cx="145" cy="46" rx="50" ry="30" />
        <ellipse cx="110" cy="38" rx="38" ry="26" />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BACKGROUND FLYING BIRDS
// ─────────────────────────────────────────────────────────────────────────────
const BG_BIRDS = [
  { top: "12%", duration: 22, delay:  0,   size: 28, wingDur: 0.55, opacity: 0.28 },
  { top: "28%", duration: 35, delay: -8,   size: 20, wingDur: 0.65, opacity: 0.22 },
  { top:  "8%", duration: 28, delay: -14,  size: 36, wingDur: 0.50, opacity: 0.32 },
  { top: "44%", duration: 42, delay: -5,   size: 16, wingDur: 0.72, opacity: 0.18 },
  { top: "18%", duration: 30, delay: -20,  size: 24, wingDur: 0.60, opacity: 0.25 },
  { top: "55%", duration: 50, delay: -30,  size: 14, wingDur: 0.80, opacity: 0.15 },
  { top: "34%", duration: 38, delay: -42,  size: 22, wingDur: 0.58, opacity: 0.20 },
  { top:  "5%", duration: 26, delay: -17,  size: 18, wingDur: 0.68, opacity: 0.24 },
];

function BackgroundBirds() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }} aria-hidden>
      {BG_BIRDS.map((b, i) => (
        <div
          key={i}
          className="bg-bird absolute left-0"
          style={{
            top: b.top,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            opacity: b.opacity,
          }}
        >
          <svg
            viewBox="0 0 60 36"
            style={{ width: b.size, height: b.size * 0.6 }}
            fill="#1A1A2E"
          >
            {/* Upper wing */}
            <g
              className="bg-bird-wing-a"
              style={{ transformOrigin: "30px 18px", animationDuration: `${b.wingDur}s` }}
            >
              <path d="M 30 18 C 22 11 12 7 2 5 C 10 11 20 15 28 18" />
            </g>
            {/* Lower wing */}
            <g
              className="bg-bird-wing-b"
              style={{ transformOrigin: "30px 19px", animationDuration: `${b.wingDur}s` }}
            >
              <path d="M 30 19 C 22 24 12 28 2 31 C 10 25 20 21 30 19" opacity="0.7" />
            </g>
            {/* Body */}
            <ellipse cx="38" cy="18.5" rx="9" ry="2.8" />
            {/* Head */}
            <ellipse cx="46" cy="17" rx="3.5" ry="2.8" />
            {/* Tail */}
            <path d="M 29 18 C 22 16.5 17 14 13 11 M 29 19.5 C 22 21 17 23.5 13 26"
              stroke="#1A1A2E" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.8" />
          </svg>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// REVEAL WRAPPER
// ─────────────────────────────────────────────────────────────────────────────
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONNECT STRIP
// ─────────────────────────────────────────────────────────────────────────────
const CONNECT_LINKS = [
  {
    label:   "GitHub",
    tooltip: "Explore My Code",
    href:    "https://github.com/anmol230404",
    color:   "#1A1A2E",
    glow:    "rgba(26,26,46,0.25)",
    grad:    "linear-gradient(135deg,rgba(26,26,46,0.08),rgba(26,26,46,0.02))",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.76-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.929.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .319.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label:   "LinkedIn",
    tooltip: "Professional Journey",
    href:    "https://www.linkedin.com/in/anmol-tamrakar-394826325",
    color:   "#0A66C2",
    glow:    "rgba(10,102,194,0.28)",
    grad:    "linear-gradient(135deg,rgba(10,102,194,0.1),rgba(10,102,194,0.03))",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label:   "Instagram",
    tooltip: "Beyond Technology",
    href:    "https://www.instagram.com/__anmol__2304",
    color:   "#C13584",
    glow:    "rgba(193,53,132,0.25)",
    grad:    "linear-gradient(135deg,rgba(193,53,132,0.09),rgba(253,100,7,0.04))",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label:   "Email",
    tooltip: "Let's Connect",
    href:    "mailto:atamrakar2304@gmail.com",
    color:   "#E8960A",
    glow:    "rgba(232,150,10,0.28)",
    grad:    "linear-gradient(135deg,rgba(232,150,10,0.1),rgba(232,150,10,0.03))",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="4" width="20" height="16" rx="3" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
  },
];

// Wing-feather SVG icon for the resume button
function WingIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="none" aria-hidden>
      {/* Quill feather shape */}
      <path
        d="M4 20 C6 14 10 10 20 4 C18 10 14 15 10 18 L4 20Z"
        fill="rgba(255,255,255,0.95)"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="0.5"
      />
      {/* Central spine */}
      <path
        d="M4 20 L14 10"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      {/* Barbs */}
      <path d="M7 17 L12 13" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" strokeLinecap="round" />
      <path d="M9.5 15 L14 11.5" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" strokeLinecap="round" />
      <path d="M12 13 L16 10" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" strokeLinecap="round" />
    </svg>
  );
}

// Tiny floating feather for the hover trail
function FloatingFeather({ className, style }: { className: string; style?: React.CSSProperties }) {
  return (
    <span
      className={`${className} absolute`}
      style={{ bottom: "60%", left: "50%", transformOrigin: "center", ...style }}
    >
      <svg viewBox="0 0 14 20" className="w-2.5 h-3.5" fill="none">
        <path
          d="M7 18 C7 12 4 8 1 2 C5 6 9 6 13 2 C10 8 7 12 7 18Z"
          fill="rgba(255,255,255,0.7)"
        />
        <path d="M7 18 L7 8" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

// Icon-only social strip — reused in Hero and Final section
function SocialIcons({ size = 38 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      {CONNECT_LINKS.map(link => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith("mailto") ? undefined : "_blank"}
          rel="noopener noreferrer"
          className="connect-card relative flex items-center justify-center rounded-2xl transition-all duration-200 select-none"
          style={{
            width: size,
            height: size,
            background: "rgba(255,255,255,0.62)",
            backdropFilter: "blur(18px) saturate(1.5)",
            border: "1px solid rgba(255,255,255,0.92)",
            boxShadow: "0 3px 12px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,1)",
            color: link.color,
            textDecoration: "none",
          }}
          onMouseEnter={e => {
            const el = e.currentTarget;
            el.style.transform = "translateY(-4px) scale(1.1)";
            el.style.boxShadow = `0 12px 26px ${link.glow}, inset 0 1px 0 rgba(255,255,255,1)`;
            el.style.background = "rgba(255,255,255,0.92)";
          }}
          onMouseLeave={e => {
            const el = e.currentTarget;
            el.style.transform = "translateY(0) scale(1)";
            el.style.boxShadow = "0 3px 12px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,1)";
            el.style.background = "rgba(255,255,255,0.62)";
          }}
          aria-label={link.label}
        >
          {/* scale icon slightly for smaller container */}
          <span style={{ transform: "scale(0.85)", display: "flex" }}>{link.icon}</span>
          <span
            className="connect-tooltip absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1.5 rounded-xl text-[10px] font-medium whitespace-nowrap pointer-events-none"
            style={{
              background: "rgba(26,26,46,0.9)",
              color: "#fff",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
              letterSpacing: "0.03em",
            }}
          >
            {link.tooltip}
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45" style={{ background: "rgba(26,26,46,0.9)" }} />
          </span>
        </a>
      ))}
    </div>
  );
}

// Resume CTA pill
function ResumePill({ small = false }: { small?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="relative inline-block">
      <a
        href="https://docs.google.com/document/d/1iJd9hLdnuOG9ZYQXxKdyhoHYdImMJ-uo3Zyc7l77VSE/edit?usp=drivesdk"
        target="_blank"
        rel="noopener noreferrer"
        className="resume-btn connect-card relative flex items-center gap-3 select-none overflow-hidden"
        style={{
          padding: small ? "9px 18px" : "12px 24px",
          borderRadius: "1rem",
          background: "linear-gradient(125deg, #3E7EC5 0%, #6B5FD8 55%, #E8960A 100%)",
          backgroundSize: "220% auto",
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "0 6px 24px rgba(62,126,197,0.42), inset 0 1px 0 rgba(255,255,255,0.22)",
          textDecoration: "none",
          transition: "transform 0.22s cubic-bezier(.22,1,.36,1), box-shadow 0.22s ease",
        }}
        onMouseEnter={e => {
          setHovered(true);
          e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
          e.currentTarget.style.boxShadow = "0 20px 44px rgba(62,126,197,0.52), inset 0 1px 0 rgba(255,255,255,0.28)";
        }}
        onMouseLeave={e => {
          setHovered(false);
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow = "0 6px 24px rgba(62,126,197,0.42), inset 0 1px 0 rgba(255,255,255,0.22)";
        }}
        aria-label="View My Flight Plan — Resume"
      >
        <span className="absolute inset-0 pointer-events-none" style={{
          background: "linear-gradient(105deg, transparent 38%, rgba(255,255,255,0.17) 50%, transparent 62%)",
          backgroundSize: "200% 100%",
          animation: hovered ? "resumeShimmer 1.1s linear infinite" : "none",
          borderRadius: "inherit",
        }} aria-hidden />

        {hovered && (
          <>
            <FloatingFeather className="feather-1" />
            <FloatingFeather className="feather-2" style={{ left: "42%" }} />
            <FloatingFeather className="feather-3" style={{ left: "68%" }} />
          </>
        )}

        <span className="relative z-10 flex items-center justify-center w-6 h-6 rounded-lg" style={{ background: "rgba(255,255,255,0.15)" }}>
          <WingIcon />
        </span>
        <span className="relative z-10 flex flex-col gap-px">
          <span className={`${small ? "text-[12px]" : "text-[13px]"} font-semibold text-white tracking-wide leading-none`}>
            {hovered ? "My Journey So Far" : "View My Flight Plan"}
          </span>
          {!small && (
            <span className="text-[9px] font-medium tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>
              Resume &nbsp;·&nbsp; Opens in new tab
            </span>
          )}
        </span>
        <span className="relative z-10" style={{ color: "rgba(255,255,255,0.65)" }}>
          <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </span>
      </a>
      <div className="connect-tooltip absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-xl text-[10px] font-medium whitespace-nowrap pointer-events-none"
        style={{ background: "linear-gradient(135deg,rgba(62,126,197,0.95),rgba(107,95,216,0.95))", color: "#fff", backdropFilter: "blur(10px)", boxShadow: "0 4px 16px rgba(62,126,197,0.4)", letterSpacing: "0.03em" }}>
        Explore My Journey
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45" style={{ background: "rgba(62,126,197,0.95)" }} />
      </div>
    </div>
  );
}

function ConnectStrip() {
  return (
    <div className="flex flex-col gap-3 items-center md:items-start mt-1">
      <div className="flex items-center gap-3 justify-center md:justify-start">
        <div className="h-px w-8" style={{ background: "linear-gradient(to right, transparent, rgba(62,126,197,0.3))" }} />
        <span className="text-[9px] tracking-[0.25em] uppercase font-medium" style={{ color: "#B0BAD4" }}>Connect</span>
        <div className="h-px w-8" style={{ background: "linear-gradient(to left, transparent, rgba(62,126,197,0.3))" }} />
      </div>
      <SocialIcons size={38} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────────────────────────────────────
function HeroSection() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  const onMouseMove = useCallback((e: MouseEvent) => {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
    setMouse({ x: dx, y: dy });
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.addEventListener("mousemove", onMouseMove as EventListener);
    el.addEventListener("mouseleave", () => setMouse({ x: 0, y: 0 }));
    return () => { el.removeEventListener("mousemove", onMouseMove as EventListener); };
  }, [onMouseMove]);

  const photoStyle = {
    transform: `translate(${mouse.x * 7 - 60}px, ${mouse.y * 5}px)`,
    transition: "transform 0.12s ease-out",
    animation: "photoFloat 5s ease-in-out infinite",
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Cloud top="6%"  duration={55} delay={0}   scale={1.2} opacity={0.5} />
        <Cloud top="20%" duration={70} delay={-20}  scale={0.8} opacity={0.38} />
        <Cloud top="42%" duration={82} delay={-36}  scale={1.4} opacity={0.28} />
        <Cloud top="62%" duration={62} delay={-12}  scale={0.9} opacity={0.32} />
      </div>

      {/* Sunlight shaft */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" aria-hidden
        style={{ width: 1, height: "58%", background: "linear-gradient(to bottom, rgba(255,200,100,0.38), transparent)", boxShadow: "0 0 90px 70px rgba(255,200,100,0.1)" }} />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 md:px-12 flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-16 pt-20 pb-16">

        {/* ── LEFT: Text column ── */}
        <div
          className="flex flex-col text-center md:text-left"
          style={{ animation: "heroReveal 1s cubic-bezier(.22,1,.36,1) 0.1s both", gap: 0 }}
        >
          {/* Name */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-normal leading-[1.07]"
            style={{ fontFamily: "var(--font-display)", color: "#1A1A2E" }}
          >
            Hi, I&apos;m
            <br />
            <span style={{
              background: "linear-gradient(135deg, #3E7EC5 0%, #9B7FFF 50%, #E8960A 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmerText 4s linear infinite",
            }}>Anmol.</span>
          </h1>

          {/* Title */}
          <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-md mx-auto md:mx-0"
            style={{ color: "#4A5568", marginTop: "1.5rem" }}>
            Full Stack Developer &amp; Creative Technologist
          </p>

          {/* Quote */}
          <p
            className="text-sm sm:text-[15px] leading-[1.85] max-w-[28rem] mx-auto md:mx-0"
            style={{
              color: "#5A6880",
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              marginTop: "1.75rem",
              animation: "fadeInUp 0.9s cubic-bezier(.22,1,.36,1) 0.5s both",
            }}
          >
            "Like a bird chasing endless horizons, I am constantly
            learning, building, and soaring toward new possibilities."
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start" style={{ marginTop: "2.5rem" }}>
            <a
              href="#about"
              className="px-7 py-3.5 rounded-2xl text-white text-sm font-medium"
              style={{ background: "linear-gradient(135deg,#3E7EC5,#5B8ED8)", boxShadow: "0 5px 22px rgba(62,126,197,0.42)", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(62,126,197,0.52)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 5px 22px rgba(62,126,197,0.42)"; }}
            >
              Explore My Journey
            </a>
            <a
              href="#projects"
              className="px-7 py-3.5 rounded-2xl text-sm font-medium"
              style={{ background: "rgba(255,255,255,0.72)", border: "1px solid rgba(62,126,197,0.22)", color: "#3E7EC5", backdropFilter: "blur(14px)", transition: "transform 0.2s, background 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.95)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 10px 28px rgba(62,126,197,0.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.72)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              View Projects
            </a>
          </div>

          {/* Resume button — second row */}
          <div className="flex justify-center md:justify-start" style={{ marginTop: "1rem" }}>
            <ResumePill />
          </div>

          {/* Social icons — third row */}
          <div style={{ marginTop: "2.5rem" }}>
            <ConnectStrip />
          </div>
        </div>

        {/* ── RIGHT: Photo with animations ── */}
        <div
          className="flex-shrink-0 relative"
          style={{ animation: "heroReveal 1.1s cubic-bezier(.22,1,.36,1) 0.3s both" }}
        >
          {/* Outer glow ring — slow spin + pulse */}
          <div className="absolute rounded-full pointer-events-none" aria-hidden style={{
            inset: -6,
            background: "conic-gradient(from 0deg, #3E7EC5, #9B7FFF, #E8960A, #3E7EC5)",
            filter: "blur(3px)",
            animation: "spinSlow 10s linear infinite, ringPulse 3s ease-in-out infinite",
            borderRadius: "50%",
          }} />

          {/* Photo wrapper — floats + follows cursor */}
          <div style={photoStyle}>
            <div style={{
              width: "clamp(210px, 40vw, 285px)",
              height: "clamp(210px, 40vw, 285px)",
              borderRadius: "50%",
              overflow: "hidden",
              border: "4px solid rgba(255,255,255,0.92)",
              boxShadow: "0 24px 64px rgba(62,126,197,0.28), 0 0 0 10px rgba(255,255,255,0.45)",
              position: "relative",
            }}>
              <img src={profilePhoto} alt="Anmol — Full Stack Developer"
                className="w-full h-full object-cover object-top" />
            </div>

            {/* Floating feathers around photo */}
            <div aria-hidden className="pointer-events-none">
              {/* Top-right feather */}
              <span className="absolute" style={{ top: "-8%", right: "-4%", animation: "featherOrbit1 5s ease-in-out infinite" }}>
                <svg viewBox="0 0 14 22" className="w-4 h-5" fill="none">
                  <path d="M7 20 C7 13 3 8 0 2 C5 6 9 7 14 2 C11 8 7 13 7 20Z" fill="rgba(62,126,197,0.45)"/>
                  <path d="M7 20 L7 9" stroke="rgba(62,126,197,0.3)" strokeWidth="0.5" strokeLinecap="round"/>
                </svg>
              </span>
              {/* Bottom-left feather */}
              <span className="absolute" style={{ bottom: "4%", left: "-8%", animation: "featherOrbit2 6.5s ease-in-out 1s infinite" }}>
                <svg viewBox="0 0 12 18" className="w-3 h-4" fill="none">
                  <path d="M6 16 C6 11 2 7 0 1 C4 5 8 5 12 1 C9 7 6 11 6 16Z" fill="rgba(155,127,255,0.4)"/>
                  <path d="M6 16 L6 7" stroke="rgba(155,127,255,0.25)" strokeWidth="0.5" strokeLinecap="round"/>
                </svg>
              </span>
              {/* Right feather */}
              <span className="absolute" style={{ top: "55%", right: "-10%", animation: "featherOrbit3 7s ease-in-out 2s infinite" }}>
                <svg viewBox="0 0 10 16" className="w-2.5 h-3.5" fill="none">
                  <path d="M5 14 C5 9 2 6 0 1 C3 4 7 4 10 1 C8 6 5 9 5 14Z" fill="rgba(232,150,10,0.38)"/>
                </svg>
              </span>
            </div>

            {/* Orbiting mini bird */}
            <div aria-hidden className="pointer-events-none absolute"
              style={{ top: "50%", left: "50%", width: 0, height: 0 }}>
              <div style={{ animation: "orbitArm 18s linear 3s infinite", transformOrigin: "0 0" }}>
                <div style={{ animation: "orbitSelf 18s linear 3s infinite", position: "absolute", transform: "translate(-10px, -7px)" }}>
                  <svg viewBox="0 0 44 26" className="w-10 h-6" style={{ filter: "drop-shadow(0 2px 6px rgba(62,126,197,0.4))" }}>
                    <g style={{ color: "#3E7EC5" }}>
                      <g className="wing-l" style={{ "--wing-origin-x": "22px", "--wing-origin-y": "13px" } as React.CSSProperties}>
                        <path d="M 22 13 C 16 8 9 5 2 3 C 8 8 15 11 21 13" fill="currentColor" opacity="0.9"/>
                      </g>
                      <g className="wing-r">
                        <path d="M 22 14 C 16 17 9 20 2 22 C 8 18 15 15 22 14" fill="currentColor" opacity="0.65"/>
                      </g>
                      <ellipse cx="28" cy="13.5" rx="7" ry="2.3" fill="currentColor"/>
                      <ellipse cx="34" cy="12" rx="3" ry="2.3" fill="currentColor"/>
                      <path d="M 37 11.5 L 41 12.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* "Open to Opportunities" badge */}
          <div
            className="absolute px-4 py-2 rounded-2xl text-xs font-medium pointer-events-none"
            style={{
              bottom: "-4px", right: "-16px",
              background: "rgba(255,255,255,0.88)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.95)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              animation: "floatCard 4.2s ease-in-out infinite",
              color: "#3E7EC5",
            }}
          >
            ✦ Open to Opportunities
          </div>
        </div>
      </div>

      {/* Scroll nudge */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0.55, animation: "fadeInUp 1s 1.8s both" }}>
        <span className="text-[10px] tracking-[0.22em] uppercase" style={{ color: "#6B7A9A" }}>Scroll to fly</span>
        <div className="w-px h-9" style={{ background: "linear-gradient(to bottom, #6B7A9A, transparent)" }} />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT SECTION
// ─────────────────────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 md:px-12">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] uppercase mb-3" style={{ color: "#3E7EC5" }}>
            Chapter 01 — Takeoff
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-normal mb-10"
            style={{ fontFamily: "var(--font-display)", color: "#1A1A2E" }}
          >
            Discovering Purpose
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-8 items-start">
          <Reveal delay={100}>
            <div
              className="p-8 rounded-3xl"
              style={{
                background: "rgba(255,255,255,0.62)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.85)",
                boxShadow: "0 12px 48px rgba(62,126,197,0.1)",
              }}
            >
              <p className="leading-relaxed mb-5 text-[15px]" style={{ color: "#4A5568" }}>
                I&apos;m a third-year Computer Science student with an insatiable curiosity for
                building things that matter. My journey began with a single line of HTML — and
                evolved into a passion for crafting elegant, human-centred digital experiences.
              </p>
              <p className="leading-relaxed text-[15px]" style={{ color: "#4A5568" }}>
                I believe that great software tells a story. Every pixel, every interaction,
                every API call should feel intentional — like the steady beat of wings that
                carries a bird higher into the sky.
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-5">
            {[
              { label: "Currently Studying", value: "B.Tech Computer Science — 3rd Year", icon: "🎓" },
              { label: "Based In",           value: "India · Available remotely worldwide", icon: "📍" },
              { label: "Interests",          value: "Web Dev · AI/ML · Open Source · Design", icon: "✦" },
              { label: "Philosophy",         value: "Every height reached is a new starting point", icon: "🕊" },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 80 + 100}>
                <div
                  className="flex items-center gap-4 px-6 py-4 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.55)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.8)",
                    boxShadow: "0 4px 20px rgba(62,126,197,0.07)",
                  }}
                >
                  <span className="text-xl w-8 flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-xs font-medium tracking-wide uppercase mb-0.5" style={{ color: "#6B7A9A" }}>{item.label}</p>
                    <p className="text-sm font-medium" style={{ color: "#1A1A2E" }}>{item.value}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SKILLS SECTION
// ─────────────────────────────────────────────────────────────────────────────
function SkillBar({ name, level, i }: { name: string; level: number; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setFilled(true); }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${i * 60}ms` }}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium" style={{ color: "#1A1A2E" }}>{name}</span>
        <span className="text-xs font-medium" style={{ color: "#6B7A9A" }}>{level}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(62,126,197,0.12)" }}>
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: filled ? `${level}%` : "0%",
            background: "linear-gradient(90deg, #3E7EC5, #9B7FFF)",
            transition: `width 1.1s cubic-bezier(.22,1,.36,1) ${i * 60}ms`,
            boxShadow: "0 0 8px rgba(62,126,197,0.4)",
          }}
        />
      </div>
    </div>
  );
}

function SkillsSection() {
  const cats = ["Frontend", "Backend", "Design", "Tools"];
  return (
    <section id="skills" className="relative py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 md:px-12">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] uppercase mb-3" style={{ color: "#3E7EC5" }}>
            Chapter 02 — Learning to Fly Higher
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-normal mb-10"
            style={{ fontFamily: "var(--font-display)", color: "#1A1A2E" }}
          >
            Wings of Craft
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-6">
          {cats.map((cat, ci) => {
            const catSkills = SKILLS.filter(s => s.cat === cat);
            return (
              <Reveal key={cat} delay={ci * 100}>
                <div
                  className="skill-card p-7 rounded-3xl"
                  style={{
                    background: "rgba(255,255,255,0.58)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.85)",
                    boxShadow: "0 8px 32px rgba(62,126,197,0.09)",
                  }}
                >
                  <h3
                    className="text-base font-medium mb-6"
                    style={{ color: "#3E7EC5", fontFamily: "var(--font-display)", fontStyle: "italic" }}
                  >
                    {cat}
                  </h3>
                  <div className="flex flex-col gap-5">
                    {catSkills.map((s, i) => (
                      <SkillBar key={s.name} name={s.name} level={s.level} i={i} />
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS SECTION
// ─────────────────────────────────────────────────────────────────────────────
function ProjectsSection() {
  return (
    <section id="projects" className="relative py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-12">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] uppercase mb-3" style={{ color: "#9B7FFF" }}>
            Chapter 03 — Exploration
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-normal mb-10"
            style={{ fontFamily: "var(--font-display)", color: "#1A1A2E" }}
          >
            Built With Purpose
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div
                className="hover-lift p-7 rounded-3xl h-full flex flex-col gap-5 cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.62)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.85)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.07)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: `linear-gradient(135deg, ${p.accent}22, ${p.accent}44)`, border: `1px solid ${p.accent}33` }}
                >
                  {p.emoji}
                </div>
                <div className="flex-1">
                  <h3
                    className="text-xl font-normal mb-3"
                    style={{ fontFamily: "var(--font-display)", color: "#1A1A2E" }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B7A9A" }}>{p.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg text-xs font-medium"
                      style={{ background: `${p.accent}14`, color: p.accent, border: `1px solid ${p.accent}28` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPERIENCE SECTION
// ─────────────────────────────────────────────────────────────────────────────
function ExperienceSection() {
  return (
    <section id="experience" className="relative py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 md:px-12">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] uppercase mb-3" style={{ color: "#E8960A" }}>
            Chapter 04 — Gaining Altitude
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-normal mb-10"
            style={{ fontFamily: "var(--font-display)", color: "#1A1A2E" }}
          >
            The Journey So Far
          </h2>
        </Reveal>

        <div className="relative flex flex-col gap-8">
          {/* Timeline line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px hidden md:block"
            style={{ background: "linear-gradient(to bottom, #3E7EC5, #E8960A)" }}
            aria-hidden
          />
          {EXPERIENCE.map((exp, i) => (
            <Reveal key={exp.role} delay={i * 120}>
              <div className="md:pl-16 relative">
                {/* Timeline dot */}
                <div
                  className="hidden md:block absolute left-4 top-6 w-4 h-4 rounded-full border-2"
                  style={{ background: "#fff", borderColor: "#3E7EC5", boxShadow: "0 0 0 4px rgba(62,126,197,0.15)", transform: "translateX(-50%)" }}
                  aria-hidden
                />
                <div
                  className="exp-card p-7 rounded-3xl"
                  style={{
                    background: "rgba(255,255,255,0.62)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.85)",
                    boxShadow: "0 8px 32px rgba(232,150,10,0.08)",
                  }}
                >
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-5">
                    <div>
                      <h3 className="text-lg font-medium" style={{ color: "#1A1A2E" }}>{exp.role}</h3>
                      <p className="text-sm font-medium mt-0.5" style={{ color: "#3E7EC5" }}>{exp.company}</p>
                    </div>
                    <span
                      className="px-3 py-1 rounded-lg text-xs font-medium flex-shrink-0"
                      style={{ background: "rgba(232,150,10,0.12)", color: "#B87A00", border: "1px solid rgba(232,150,10,0.25)" }}
                    >
                      {exp.period}
                    </span>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {exp.points.map((pt, pi) => (
                      <li key={pi} className="flex gap-3 text-sm leading-relaxed" style={{ color: "#4A5568" }}>
                        <span className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-current opacity-40" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ACHIEVEMENTS SECTION
// ─────────────────────────────────────────────────────────────────────────────
function AchievementsSection() {
  return (
    <section id="achievements" className="relative py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 md:px-12">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] uppercase mb-3" style={{ color: "#E8960A" }}>
            Chapter 05 — Reaching Milestones
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-normal mb-10"
            style={{ fontFamily: "var(--font-display)", color: "#1A1A2E" }}
          >
            Heights Conquered
          </h2>
        </Reveal>
        <div className="flex flex-col gap-5">
          {ACHIEVEMENTS.map((ach, i) => (
            <Reveal key={ach.title} delay={i * 80}>
              <div
                className="achievement-row flex items-center gap-5 px-7 py-5 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.58)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.85)",
                  boxShadow: "0 4px 20px rgba(232,150,10,0.06)",
                }}
              >
                <span className="text-2xl flex-shrink-0">{ach.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: "#1A1A2E" }}>{ach.title}</p>
                </div>
                <span
                  className="text-xs font-medium px-3 py-1 rounded-lg flex-shrink-0"
                  style={{ background: "rgba(232,150,10,0.12)", color: "#B87A00" }}
                >
                  {ach.year}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CERTIFICATIONS SECTION
// ─────────────────────────────────────────────────────────────────────────────
function CertificationsSection() {
  return (
    <section id="certifications" className="relative py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 md:px-12">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] uppercase mb-3" style={{ color: "#9B7FFF" }}>
            Chapter 06 — Credentials
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-normal mb-10"
            style={{ fontFamily: "var(--font-display)", color: "#1A1A2E" }}
          >
            Earned Feathers
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-4">
          {CERTS.map((cert, i) => (
            <Reveal key={cert.name} delay={i * 70}>
              <div
                className="cert-card flex items-center gap-4 px-6 py-5 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.58)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.85)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex-shrink-0"
                  style={{ background: `${cert.color}22`, border: `2px solid ${cert.color}44` }}
                >
                  <div className="w-full h-full rounded-xl" style={{ background: cert.color, opacity: 0.6, borderRadius: "inherit" }} />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "#1A1A2E" }}>{cert.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#6B7A9A" }}>{cert.issuer}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT SECTION — bird-themed email, no form
// ─────────────────────────────────────────────────────────────────────────────
function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const EMAIL = "atamrakar2304@gmail.com";

  const copy = () => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <section id="contact" className="relative py-20 md:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <Cloud top="15%" duration={70} delay={-10} scale={1.1} opacity={0.18} />
        <Cloud top="65%" duration={90} delay={-40} scale={0.8} opacity={0.12} />
      </div>

      <div className="max-w-xl mx-auto px-5 sm:px-8 md:px-12 text-center">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] uppercase mb-3" style={{ color: "#3E7EC5" }}>
            Chapter 07 — The Next Horizon
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-normal mb-5"
            style={{ fontFamily: "var(--font-display)", color: "#1A1A2E" }}
          >
            Let&apos;s Fly Together
          </h2>
          <p
            className="text-sm sm:text-base leading-relaxed mb-12 mx-auto max-w-sm"
            style={{ color: "#6B7A9A", fontFamily: "var(--font-display)", fontStyle: "italic" }}
          >
            Every great journey begins with a single call across the sky —
            drop me a note and let&apos;s chart something wonderful together.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="flex flex-col items-center gap-5">
            {/* Animated bird above card */}
            <div aria-hidden style={{ animation: "floatCard 3.2s ease-in-out infinite" }}>
              <svg viewBox="0 0 100 55" className="w-16 h-9"
                style={{ filter: "drop-shadow(0 4px 12px rgba(62,126,197,0.3))" }}>
                <g style={{ color: "#3E7EC5" }}>
                  <g className="wing-l">
                    <path d="M 50 26 C 38 16 22 10 4 7 C 16 15 33 21 48 26" fill="currentColor" opacity="0.9"/>
                  </g>
                  <g className="wing-r">
                    <path d="M 50 28 C 38 34 22 40 4 43 C 16 37 33 30 50 28" fill="currentColor" opacity="0.65"/>
                  </g>
                  <ellipse cx="62" cy="27" rx="13" ry="4" fill="currentColor"/>
                  <ellipse cx="73" cy="24.5" rx="5.5" ry="4" fill="currentColor"/>
                  <path d="M 78 24 L 85 25.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </g>
              </svg>
            </div>

            {/* Clickable email card */}
            <div
              className="relative w-full cursor-pointer"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={copy}
              role="button"
              aria-label="Copy email address"
            >
              <div
                className="relative flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5 rounded-3xl transition-all duration-300"
                style={{
                  background: hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.68)",
                  backdropFilter: "blur(24px) saturate(1.6)",
                  border: `1px solid ${hovered ? "rgba(62,126,197,0.25)" : "rgba(255,255,255,0.9)"}`,
                  boxShadow: hovered
                    ? "0 20px 52px rgba(62,126,197,0.22), inset 0 1px 0 rgba(255,255,255,1)"
                    : "0 8px 28px rgba(62,126,197,0.1), inset 0 1px 0 rgba(255,255,255,1)",
                  transform: hovered ? "translateY(-5px) scale(1.01)" : "translateY(0) scale(1)",
                }}
              >
                {/* Shimmer sweep on hover */}
                {hovered && (
                  <span className="absolute inset-0 rounded-3xl pointer-events-none" aria-hidden style={{
                    background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.45) 50%, transparent 65%)",
                    animation: "resumeShimmer 1.3s linear infinite",
                    backgroundSize: "200% 100%",
                  }}/>
                )}

                {/* Icon + text */}
                <div className="flex items-center gap-4 z-10">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      background: hovered ? "linear-gradient(135deg, #3E7EC5, #6B5FD8)" : "rgba(62,126,197,0.1)",
                      boxShadow: hovered ? "0 6px 18px rgba(62,126,197,0.38)" : "none",
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none"
                      stroke={hovered ? "#fff" : "#3E7EC5"}
                      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                      className="w-5 h-5 transition-all duration-300">
                      <rect x="2" y="4" width="20" height="16" rx="3"/>
                      <path d="M2 7l10 7 10-7"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-medium tracking-widest uppercase mb-0.5" style={{ color: "#9EB3D0" }}>Feel free to reach me at</p>
                    <p className="text-sm sm:text-base font-semibold transition-all duration-200"
                      style={{ color: hovered ? "#3E7EC5" : "#1A1A2E", letterSpacing: "0.01em" }}>
                      {EMAIL}
                    </p>
                  </div>
                </div>

                {/* Copy chip */}
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 flex-shrink-0 z-10"
                  style={{
                    background: copied ? "rgba(94,181,166,0.15)" : hovered ? "rgba(62,126,197,0.1)" : "rgba(62,126,197,0.05)",
                    border: copied ? "1px solid rgba(94,181,166,0.4)" : "1px solid rgba(62,126,197,0.15)",
                  }}
                >
                  {copied ? (
                    <>
                      <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="#5EB5A6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 8l4 4 8-8"/>
                      </svg>
                      <span className="text-[11px] font-semibold" style={{ color: "#5EB5A6" }}>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="#3E7EC5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="5" width="9" height="9" rx="2"/>
                        <path d="M11 5V3a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
                      </svg>
                      <span className="text-[11px] font-semibold" style={{ color: "#3E7EC5" }}>Copy</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Bird-themed tagline */}
            <p className="text-xs mt-1" style={{ color: "#B0BAD4", fontStyle: "italic", fontFamily: "var(--font-display)" }}>
              "Even birds know — the right moment to call is always now." 🕊
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FINAL CLOSING SECTION
// ─────────────────────────────────────────────────────────────────────────────
function FinalSection() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative pb-0 pt-24 md:pt-40 overflow-hidden text-center">
      {/* Atmospheric clouds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <Cloud top="10%" duration={90}  delay={0}   scale={2.2} opacity={0.18} />
        <Cloud top="38%" duration={120} delay={-30} scale={3.2} opacity={0.13} />
        <Cloud top="65%" duration={80}  delay={-15} scale={1.6} opacity={0.16} />
      </div>

      {/* Horizon glow */}
      <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none" aria-hidden
        style={{ background: "linear-gradient(to top, rgba(232,150,10,0.18), transparent)" }} />

      <div className="relative z-10 max-w-2xl mx-auto px-5 sm:px-8">

        {/* Bird ascending into the horizon */}
        <div className="flex justify-center mb-12" aria-hidden>
          <div style={{ position: "relative", width: 96, height: 56 }}>
            {/* Main bird */}
            <svg viewBox="0 0 120 60" className="w-24 h-12 absolute inset-0"
              style={{
                filter: "drop-shadow(0 0 18px rgba(212,160,23,0.75))",
                animation: inView ? "birdAscend 3.5s cubic-bezier(.22,1,.36,1) 0.5s both" : "none",
              }}>
              <g style={{ color: "#D4A017" }}>
                <g className="wing-l" style={{ "--wing-origin-x":"60px","--wing-origin-y":"30px" } as React.CSSProperties}>
                  <path d="M 60 30 C 46 20 28 13 6 10 C 20 18 38 25 58 30" fill="currentColor" opacity="0.95"/>
                </g>
                <g className="wing-r">
                  <path d="M 60 32 C 46 38 28 44 6 47 C 20 40 38 33 60 32" fill="currentColor" opacity="0.7"/>
                </g>
                <ellipse cx="72" cy="31" rx="14" ry="4.5" fill="currentColor"/>
                <ellipse cx="84" cy="28.5" rx="6" ry="4.5" fill="currentColor"/>
                <path d="M 90 28 L 98 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </g>
            </svg>

            {/* Drifting feathers as bird departs */}
            {inView && (
              <>
                <span className="absolute" style={{ top: 10, left: 20, animation: "featherFall 2.2s ease-out 1.2s both" }}>
                  <svg viewBox="0 0 12 18" className="w-3 h-4" fill="none">
                    <path d="M6 16 C6 10 2 6 0 1 C4 5 8 5 12 1 C9 6 6 10 6 16Z" fill="rgba(212,160,23,0.55)"/>
                    <path d="M6 16L6 7" stroke="rgba(212,160,23,0.3)" strokeWidth="0.5"/>
                  </svg>
                </span>
                <span className="absolute" style={{ top: 20, left: 52, animation: "featherFall2 2.4s ease-out 1.5s both" }}>
                  <svg viewBox="0 0 10 16" className="w-2.5 h-3.5" fill="none">
                    <path d="M5 14 C5 9 2 6 0 1 C3 4 7 4 10 1 C8 6 5 9 5 14Z" fill="rgba(155,127,255,0.5)"/>
                  </svg>
                </span>
                <span className="absolute" style={{ top: 14, left: 68, animation: "featherFall 2s ease-out 1.8s both" }}>
                  <svg viewBox="0 0 8 14" className="w-2 h-3" fill="none">
                    <path d="M4 12 C4 8 1 5 0 1 C3 3 5 3 8 1 C6 5 4 8 4 12Z" fill="rgba(62,126,197,0.45)"/>
                  </svg>
                </span>
              </>
            )}
          </div>
        </div>

        {/* Main quote */}
        <Reveal>
          <h2
            className="text-2xl sm:text-3xl md:text-[2.8rem] font-normal leading-[1.2] mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              background: "linear-gradient(135deg, #1A1A2E 0%, #3E7EC5 45%, #E8960A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            "Every height reached is only
            <br />
            the beginning of the next flight."
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-[11px] tracking-[0.28em] uppercase mb-14" style={{ color: "#1A1A2E" }}>
            The journey continues beyond the horizon.
          </p>
        </Reveal>

        {/* Social icons */}
        <Reveal delay={200}>
          <div className="flex justify-center mb-5">
            <SocialIcons size={42} />
          </div>
        </Reveal>

        {/* Return to Beginning button */}
        <Reveal delay={280}>
          <div className="flex justify-center mb-14">
            <a
              href="#hero"
              className="px-7 py-3.5 rounded-2xl text-white text-sm font-medium"
              style={{ background: "linear-gradient(135deg,#3E7EC5,#5B8ED8)", boxShadow: "0 5px 22px rgba(62,126,197,0.42)", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(62,126,197,0.52)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 5px 22px rgba(62,126,197,0.42)"; }}
            >
              Return to Beginning
            </a>
          </div>
        </Reveal>

        {/* Closing line */}
        <Reveal delay={360}>
          <p
            className="text-sm leading-relaxed mb-16 mx-auto max-w-xs"
            style={{ color: "#8A9BBF", fontFamily: "var(--font-display)", fontStyle: "italic" }}
          >
            "The sky isn&apos;t the limit — it&apos;s just the beginning."
          </p>
        </Reveal>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t py-5" style={{ borderColor: "rgba(62,126,197,0.1)", background: "rgba(255,255,255,0.22)", backdropFilter: "blur(12px)" }}>
        <p className="text-[11px] tracking-widest uppercase text-center" style={{ color: "#1A1A2E" }}>
          Designed by Anmol
        </p>
      </footer>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [navVisible, setNavVisible] = useState(false);

  const onScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const totalH = document.body.scrollHeight - window.innerHeight;
    setScrollProgress(totalH > 0 ? Math.min(1, scrollY / totalH) : 0);
    setNavVisible(scrollY > 80);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        // Find the section that is most visible on screen
        let mostVisibleEntry = null;
        let maxVisibility = 0;

        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Calculate how much of the section is visible
            const visibility = entry.intersectionRatio;
            if (visibility > maxVisibility) {
              maxVisibility = visibility;
              mostVisibleEntry = entry;
            }
          }
        });

        // If a section is clearly most visible, update active section
        if (mostVisibleEntry) {
          const idx = SECTION_IDS.indexOf(mostVisibleEntry.target.id);
          if (idx !== -1) setActiveSection(idx);
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }, // More precise threshold points
    );
    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const currentSky = SKIES[activeSection] ?? SKIES[0];

  return (
    <>
      {/* Inject global styles */}
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />

      {/* Fixed sky background */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: currentSky,
          transition: "background 1.2s cubic-bezier(.22,1,.36,1)",
        }}
        aria-hidden
      />

      {/* Background flying birds */}
      <BackgroundBirds />

      {/* Bird progress indicator */}
      <Bird progress={scrollProgress} />

      {/* Navigation */}
      <FloatingNav active={activeSection} visible={navVisible} />

      {/* Page sections */}
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <AchievementsSection />
        <CertificationsSection />
        <FinalSection />
      </main>
    </>
  );
}
