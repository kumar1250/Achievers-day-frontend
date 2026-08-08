import { useEffect, useRef, useState } from "react";
import bvceLogo from "../assets/bvce-logo.png";
import RegisterSection from "../components/RegisterSection";
import AcknowledgementSection from "../components/AcknowledgementSection";

// All four slots now use real campus/event photos. Swap any file below
// for a different shot any time — just point the import at the new file
// and update its tag/title/blurb to match what's actually in the photo.
import galleryCampus from "../assets/gallery-campus.jpg";
import galleryStage from "../assets/gallery-stage.jpeg";
import galleryCap from "../assets/gallery-cap.jpeg";
import galleryFriends from "../assets/gallery-friends.jpeg";

// ---------------------------------------------------------------------
// PALETTE — "Achievers Day" identity
// Midnight  #14102B   deep plum-black, hero background
// Gold      #F4A100   marigold / medal gold, primary accent
// Coral     #FF5A5F   celebratory energy, secondary accent
// Jade      #00B8A9   fresh contrast, tertiary accent
// Violet    #7C4DFF   quaternary accent (gallery / details)
// Ivory     #FFFBF2   warm content background
// Ink       #1F1B3A   body text on light backgrounds
// Fonts: Fraunces (display), Sora (body/UI), Caveat (script accent)
// ---------------------------------------------------------------------

const DETAILS = [
  {
    label: "Date",
    value: "22nd August, 2026",
    color: "bg-[#00B8A9]",
    icon: (
      <path d="M7 3v3M17 3v3M4 9h16M5.5 5h13A1.5 1.5 0 0 1 20 6.5v13A1.5 1.5 0 0 1 18.5 21h-13A1.5 1.5 0 0 1 4 19.5v-13A1.5 1.5 0 0 1 5.5 5Z" />
    ),
  },
  {
    label: "Venue",
    value: "College Main Auditorium",
    color: "bg-[#FF5A5F]",
    icon: <path d="M4 21h16M5 21V10l7-6 7 6v11M9 21v-6h6v6" />,
  },
  {
    label: "Eligible Batch",
    value: "2025-2026 Batch — Confirmed Achievers List",
    color: "bg-[#F4A100]",
    icon: (
      <path d="M12 3 2 8l10 5 10-5-10-5Zm-7 8.5V16c0 1.5 3 3.5 7 3.5s7-2 7-3.5v-4.5M22 8v6" />
    ),
  },
];

const STEPS = [
  {
    n: "01",
    color: "bg-[#F4A100]",
    title: "Find your record",
    text: "Enter your Regd number to pull up your placement record — company, package, and branch details.",
  },
  {
    n: "02",
    color: "bg-[#00B8A9]",
    title: "Confirm attendance",
    text: "Verify your details and let us know if you'll be joining Achievers Day, along with anyone accompanying you.",
  },
  {
    n: "03",
    color: "bg-[#FF5A5F]",
    title: "Download your pass",
    text: "Get an instant, printable acknowledgement with your seating and check-in instructions.",
  },
];

// Tag, title, and blurb are the caption copy shown over/under each photo —
// edit freely to match what's actually happening in each shot.
const GALLERY = [
  {
    src: galleryCampus,
    alt: "Photo of the BVCE campus building",
    tag: "Campus",
    tagColor: "bg-[#00B8A9]",
    title: "A campus built for the next chapter",
    blurb:
      "Spread across Amalapuram and Odalarevu, the BVCE campus has been home to generations of engineering and technology students since 1997.",
  },
  {
    src: galleryStage,
    alt: "Photo of the auditorium stage and podium",
    tag: "Ceremony",
    tagColor: "bg-[#FF5A5F]",
    title: "Center stage for this year's achievers",
    blurb:
      "The Main Auditorium has hosted every BVCE felicitation to date — the same stage where this year's achievers will be recognized.",
  },
  {
    src: galleryCap,
    alt: "Students seated in a packed BVCE classroom during a seminar session",
    tag: "Academics",
    tagColor: "bg-[#7C4DFF]",
    title: "Classrooms that shaped careers",
    blurb:
      "From orientation talks to guest seminars, BVCE's classrooms have hosted every batch — where core engineering meets computer science and IT through hands-on coursework and real project work that led to these placements.",
  },
  {
    src: galleryFriends,
    alt: "Photo of students celebrating together",
    tag: "Community",
    tagColor: "bg-[#F4A100]",
    title: "A growing record of achievement",
    blurb:
      "Every year, another batch of BVCE students steps into top companies — carrying the institution's name into workplaces across the region and beyond.",
  },
];

function scrollToRegister() {
  const el = document.getElementById("register");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// Lightweight scroll-reveal: fades + slides an element in the first time
// it enters the viewport. No animation library needed — just an
// IntersectionObserver and a couple of Tailwind transition classes.
function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options || { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

// direction now also supports "scale" for a cinematic zoom-and-fade entrance,
// used by the big one-by-one gallery images.
function Reveal({ children, className = "", delay = 0, direction = "up" }) {
  const [ref, inView] = useInView();
  const hiddenClass =
    direction === "left"
      ? "opacity-0 -translate-x-10"
      : direction === "right"
      ? "opacity-0 translate-x-10"
      : direction === "scale"
      ? "opacity-0 scale-95 translate-y-6"
      : "opacity-0 translate-y-8";

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform motion-reduce:transition-none motion-reduce:transform-none ${
        inView ? "opacity-100 translate-x-0 translate-y-0 scale-100" : hiddenClass
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [registeredStudent, setRegisteredStudent] = useState(null);
  const [heroMounted, setHeroMounted] = useState(false);

  useEffect(() => {
    // trigger the hero entrance animation just after first paint
    const t = setTimeout(() => setHeroMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const heroStep = () =>
    `transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none ${
      heroMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`;
  const heroStyle = (delay) => ({ transitionDelay: `${delay}ms` });

  return (
    <div className="min-h-screen bg-[#14102B] text-white/90 overflow-x-hidden font-['Sora']">
      {/* Fonts: Fraunces for display headlines, Sora for UI/body text,
          Caveat for the handwritten script accent. The hero is a slow,
          ever-shifting gold/coral/violet gradient instead of a photo; a
          matching shimmer runs on the top rule. Both respect reduced
          motion, and everything else fires on scroll/hover so the page
          stays calm. */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..900;1,9..144,400..900&family=Sora:wght@400;500;600;700;800&family=Caveat:wght@600;700&display=swap');

        @keyframes shimmer {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes heroShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 6s linear infinite;
        }
        .hero-gradient {
          background: linear-gradient(120deg, #F4A100, #FF5A5F, #7C4DFF, #FF5A5F, #F4A100);
          background-size: 300% 300%;
          animation: heroShift 16s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-shimmer, .hero-gradient { animation: none !important; }
        }
      `}</style>

      <div className="h-1.5 animate-shimmer bg-gradient-to-r from-[#F4A100] via-[#FF5A5F] to-[#7C4DFF]" />

      <section className="relative overflow-hidden hero-gradient text-[#14102B]">
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative max-w-5xl mx-auto px-5 sm:px-6 pt-14 pb-16 md:pt-20 md:pb-24">
          <div className="flex flex-col items-center text-center gap-5 md:gap-6">
            <img
              src={bvceLogo}
              alt="BVCE emblem"
              className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 drop-shadow-[0_4px_18px_rgba(20,16,43,0.35)] ${heroStep()}`}
              style={heroStyle(0)}
            />

            <div className={heroStep()} style={heroStyle(120)}>
              <p className="font-['Fraunces'] font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] text-[#FFD966] drop-shadow-[0_2px_6px_rgba(20,16,43,0.45)] text-xl sm:text-2xl md:text-3xl px-2">
                Bonam Venkata Chalamayya Engineering College , Odalarevu
              </p>
              <p className="text-[#FFD966]/80 drop-shadow-[0_1px_4px_rgba(20,16,43,0.4)] text-xs sm:text-sm mt-2 tracking-wide px-2">
                Odalarevu — Since 1997
              </p>
            </div>

            <h1
              className={`font-['Fraunces'] font-black italic text-[2.1rem] leading-[1.1] sm:text-4xl md:text-6xl md:leading-[1.05] max-w-3xl px-1 text-[#FFD966] drop-shadow-[0_3px_10px_rgba(20,16,43,0.45)] ${heroStep()}`}
              style={heroStyle(220)}
            >
              <span className="not-italic text-[#65ffff] drop-shadow-[0_3px_10px_rgba(20,16,43,0.5)]">Achievers Day</span>{" "}
              <span className="inline-flex items-center gap-2 align-middle">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#FFD966] shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  aria-hidden="true"
                >
                  <path d="M4 4c3 1 4 4 4 8s-1 8-4 9M4 4c1.5 3 1 6-.5 9M4 4c-.8 2.6-.8 5.4 0 8" strokeLinecap="round" />
                </svg>
                <span className="text-white drop-shadow-[0_3px_10px_rgba(20,16,43,0.55)]">
                  2026
                </span>
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#FFD966] shrink-0 scale-x-[-1]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  aria-hidden="true"
                >
                  <path d="M4 4c3 1 4 4 4 8s-1 8-4 9M4 4c1.5 3 1 6-.5 9M4 4c-.8 2.6-.8 5.4 0 8" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p
              className={`font-['Caveat'] font-semibold text-2xl sm:text-3xl md:text-4xl text-[#FFD966]/90 drop-shadow-[0_2px_6px_rgba(20,16,43,0.4)] -mt-1 md:-mt-2 ${heroStep()}`}
              style={heroStyle(320)}
            >
              Batch of 2025-26 &mdash; celebrating every achievement, big and small
            </p>

            <p
              className={`text-[#FFD966]/85 drop-shadow-[0_1px_4px_rgba(20,16,43,0.35)] max-w-xl text-sm md:text-base leading-relaxed px-2 ${heroStep()}`}
              style={heroStyle(420)}
            >
              Register your attendance below to confirm your seat at the
              Achievers Day ceremony and receive your official
              acknowledgement, ready to download in seconds.
            </p>

            {!registeredStudent && (
              <button
                type="button"
                onClick={scrollToRegister}
                className={`mt-2 group inline-flex items-center justify-center gap-2 w-full max-w-xs sm:w-auto bg-[#14102B] hover:bg-[#221A3F] active:bg-[#14102B] text-white font-['Sora'] font-bold text-sm px-8 py-3.5 rounded-full shadow-[0_10px_30px_-8px_rgba(20,16,43,0.55)] transition hover:scale-[1.03] active:scale-[0.98] ${heroStep()}`}
                style={heroStyle(520)}
              >
                Register for Achievers Day
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  className="transition group-hover:translate-x-0.5 shrink-0"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="h-px bg-[#14102B]/25" />
      </section>

      <section className="max-w-5xl mx-auto px-5 sm:px-6 -mt-6 md:-mt-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
          {DETAILS.map((d, i) => (
            <Reveal key={d.label} delay={i * 100}>
              <div className="bg-white/[0.06] backdrop-blur-sm rounded-2xl shadow-[0_18px_40px_-24px_rgba(0,0,0,0.55)] border border-white/10 px-5 py-5 md:px-6 md:py-6 flex items-center gap-4 h-full transition hover:-translate-y-1 hover:bg-white/[0.09] hover:border-white/20">
                <div
                  className={`shrink-0 w-11 h-11 rounded-full ${d.color} flex items-center justify-center shadow-inner`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {d.icon}
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                    {d.label}
                  </p>
                  <p className="text-white font-semibold text-sm mt-0.5 break-words">
                    {d.value}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 sm:px-6 pt-14 md:pt-16 pb-4">
        <Reveal>
          <div className="text-center mb-8 md:mb-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#FF8A65]">
              Three simple steps
            </p>
            <h2 className="font-['Fraunces'] text-xl sm:text-2xl md:text-3xl font-bold text-white mt-2">
              Getting registered takes a minute
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <div className="relative pl-12 md:pl-14">
                <span
                  className={`absolute left-0 top-0 w-9 h-9 md:w-10 md:h-10 rounded-full ${s.color} text-white font-['Fraunces'] text-sm md:text-base font-bold flex items-center justify-center shadow-[0_8px_18px_-6px_rgba(20,16,43,0.4)]`}
                >
                  {s.n}
                </span>
                <h3 className="font-['Sora'] font-semibold text-white">{s.title}</h3>
                <p className="text-sm text-white/55 mt-1.5 leading-relaxed">
                  {s.text}
                </p>
                {i < STEPS.length - 1 && (
                  <span className="hidden md:block absolute -right-4 top-2 text-white/15">
                    &rarr;
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Gallery — big, full-width images shown one at a time so each one
          gets room to breathe on every screen size, with the caption
          overlaid on the photo and a short note underneath. */}
      <section className="max-w-5xl mx-auto px-5 sm:px-6 pt-14 md:pt-16 pb-2">
        <Reveal>
          <div className="text-center mb-10 md:mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#FF8A65]">
              Moments to remember
            </p>
            <h2 className="font-['Fraunces'] text-xl sm:text-2xl md:text-3xl font-bold text-white mt-2">
              Life at BVCE
            </h2>
            <p className="text-white/55 text-sm mt-3 max-w-md mx-auto leading-relaxed">
              A look back at our campus and the achievers who came before this one.
            </p>
          </div>
        </Reveal>

        <div className="space-y-14 md:space-y-20">
          {GALLERY.map((g) => (
            <Reveal key={g.tag} direction="scale" delay={80}>
              <div className="flex flex-col items-center gap-5 md:gap-6">
                <div className="w-full group relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-[0_28px_60px_-24px_rgba(0,0,0,0.6)]">
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 motion-reduce:transition-none motion-reduce:transform-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14102B]/70 via-[#14102B]/10 to-transparent" />
                  <span
                    className={`absolute top-4 left-4 sm:top-5 sm:left-5 ${g.tagColor} text-white text-[11px] sm:text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full shadow`}
                  >
                    {g.tag}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8">
                    <p className="font-['Fraunces'] font-bold text-white text-lg sm:text-2xl md:text-3xl leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
                      {g.title}
                    </p>
                  </div>
                </div>

                <p className="text-white/55 text-sm md:text-base leading-relaxed text-center max-w-2xl px-2">
                  {g.blurb}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="register" className="px-5 sm:px-6 pt-16 pb-16 md:pb-20">
        {registeredStudent ? (
          <AcknowledgementSection
            student={registeredStudent}
            onRegisterAnother={() => setRegisteredStudent(null)}
          />
        ) : (
          <>
            <Reveal>
              <div className="text-center max-w-2xl mx-auto mb-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#FF8A65]">
                  Registration
                </p>
                <h2 className="font-['Fraunces'] text-xl sm:text-2xl md:text-3xl font-bold text-white mt-2">
                  Confirm your attendance
                </h2>
                <p className="text-white/55 text-sm mt-3 leading-relaxed px-2">
                  Enter your Regd number to confirm your placement details and
                  register your attendance for Achievers Day. If you're
                  already registered, you can re-download your acknowledgement
                  here too.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <RegisterSection
                onRegistered={(student) => setRegisteredStudent(student)}
              />
            </Reveal>
          </>
        )}
      </section>

      <footer className="bg-[#0F0B24] text-white/50">
        <div className="h-px bg-gradient-to-r from-[#F4A100]/70 via-[#FF5A5F]/70 to-[#7C4DFF]/70" />
        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <img src={bvceLogo} alt="BVCE emblem" className="w-9 h-9 opacity-90" />
            <div>
              <p className="text-white font-['Sora'] font-semibold text-sm">
                Bonam Venkata Chalamayya Engineering College Odalarevu
              </p>
              <p className="text-xs mt-0.5">
                B.V.C. Engineering College, Odalarevu Beach Road, Odalarevu – 533210, Allavaram Mandal, Dr. B.R. Ambedkar Konaseema District (formerly East Godavari), Andhra Pradesh, India
              </p>
            </div>
          </div>
          <p className="text-xs">
            &copy; 2026 BVCE Achievers Day — Placements Office. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}