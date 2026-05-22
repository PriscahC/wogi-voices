import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroWoman from "@/assets/hero-woman.jpg";
import handsSoil from "@/assets/hands-soil.jpg";
import womenCircle from "@/assets/women-circle.jpg";
import verticalGarden from "@/assets/vertical-garden.jpg";
import wogiLogo from "@/assets/wogi-logo.png";
import {
  Sprout,
  Leaf,
  TreePine,
  HandHeart,
  PiggyBank,
  CloudRain,
  ShoppingBasket,
  ShieldAlert,
  Megaphone,
  Heart,
  Users,
  Mail,
  MapPin,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

/* ---------------- helpers ---------------- */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1800,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      });
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to, duration]);
  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ---------------- nav ---------------- */

const NAV = [
  ["Story", "#story"],
  ["The Hub", "#hub"],
  ["Impact", "#impact"],
  ["Journey", "#journey"],
  ["Team", "#team"],
  ["Get Involved", "#involve"],
] as const;

function Nav() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "nav-solid py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          <img
            src={wogiLogo}
            alt="WOGI Voices logo"
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover"
          />
          <span
            className={`font-display text-lg font-bold tracking-tight transition-colors ${
              scrolled ? "text-white" : "text-[var(--brown)]"
            }`}
          >
            WOGI VOICES
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={`text-sm font-semibold transition-colors hover:text-[var(--pink)] ${
                scrolled ? "text-white/85" : "text-[var(--brown)]/80"
              }`}
            >
              {label}
            </a>
          ))}
          <a
            href="#involve"
            className="btn-pink inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold"
          >
            Fund the Hub <ArrowRight className="h-4 w-4" />
          </a>
        </nav>
        <button
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden ${scrolled ? "text-white" : "text-[var(--brown)]"}`}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      {open && (
        <div className="mx-5 mt-3 rounded-2xl bg-[var(--brown)] p-5 shadow-2xl md:hidden">
          <div className="flex flex-col gap-3">
            {NAV.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="text-base font-semibold text-white/90 hover:text-[var(--pink)]"
              >
                {label}
              </a>
            ))}
            <a
              href="#involve"
              onClick={() => setOpen(false)}
              className="btn-pink mt-2 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold"
            >
              Fund the Hub <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- hero ---------------- */

function Hero() {
  const headline = ["Growing", "Resilience", "from the", "Ground Up"];
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[var(--brown)]"
    >
      <img
        src={heroWoman}
        alt="A Kenyan woman leading her community"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover opacity-65"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--brown)]/95 via-[var(--brown)]/55 to-[var(--deep-pink)]/55" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--brown)] to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-32 pb-24 sm:px-8 sm:pt-40">
        <p
          className="section-label word-in mb-6 text-[var(--pink)]"
          style={{ animationDelay: "0.1s" }}
        >
          WOGI Voices · Naivasha, Kenya
        </p>
        <h1 className="font-display text-[2.6rem] font-bold leading-[1.05] text-white sm:text-6xl md:text-7xl lg:text-[5.25rem]">
          {headline.map((w, i) => (
            <span
              key={i}
              className="word-in mr-[0.25em] inline-block"
              style={{ animationDelay: `${0.25 + i * 0.15}s` }}
            >
              {i === 1 ? <span className="italic text-[var(--pink)]">{w}</span> : w}
            </span>
          ))}
        </h1>
        <p
          className="word-in mt-7 max-w-2xl text-lg font-medium text-white/85 sm:text-xl"
          style={{ animationDelay: "1.05s" }}
        >
          Women-led. Community-owned. Rooted in Naivasha. WOGI Voices is building a future where
          women and girls in informal settlements don't just survive climate change, poverty, and
          inequality — they lead the transformation.
        </p>
        <div
          className="word-in mt-10 flex flex-wrap gap-3"
          style={{ animationDelay: "1.25s" }}
        >
          <a
            href="#involve"
            className="btn-pink inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold tracking-wide"
          >
            Fund the Hub <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#hub"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
          >
            Explore the Hub
          </a>
        </div>

        {/* mini stats strip */}
        <div
          className="word-in mt-16 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-5 border-t border-white/15 pt-8 sm:grid-cols-4"
          style={{ animationDelay: "1.5s" }}
        >
          {[
            ["1,500", "People supported"],
            ["300", "Women trained"],
            ["10", "Green spaces"],
            ["500", "Farming households"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-display text-3xl font-bold text-[var(--pink)] sm:text-4xl">
                {n}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-white/70">
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- story / problem ---------------- */

function Story() {
  const cards = [
    {
      icon: CloudRain,
      title: "Climate Shocks",
      copy: "Flooding streets and rising heat hit low-income, women-headed households first and hardest.",
    },
    {
      icon: ShoppingBasket,
      title: "Food & Income Gaps",
      copy: "Rising food costs and invisible hours in informal economies leave families one bad day from crisis.",
    },
    {
      icon: ShieldAlert,
      title: "Unsafe Environments",
      copy: "Without green space, safe infrastructure, or community support, everyday life carries risk — especially for young women and girls.",
    },
  ];

  return (
    <section id="story" className="relative bg-[var(--blush)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal max-w-3xl">
          <p className="section-label mb-4">01 — The world they live in</p>
          <h2 className="font-display text-4xl font-bold text-[var(--brown)] sm:text-5xl md:text-[3.5rem]">
            When every challenge{" "}
            <span className="italic text-[var(--deep-pink)]">arrives together.</span>
          </h2>
          <p className="mt-6 text-lg text-[var(--brown)]/75">
            Most interventions treat climate, livelihood, and gender-based violence as separate
            problems. In Naivasha's informal settlements, they don't arrive separately — and they
            can't be solved that way either.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <article
              key={c.title}
              className="reveal group relative overflow-hidden rounded-3xl bg-white p-8 shadow-[0_4px_30px_-12px_rgba(26,10,0,0.15)] transition hover:-translate-y-1.5 hover:shadow-[0_20px_60px_-20px_rgba(232,25,122,0.35)]"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--blush)] text-[var(--pink)] transition group-hover:bg-[var(--pink)] group-hover:text-white">
                <c.icon className="h-7 w-7" strokeWidth={2} />
              </div>
              <h3 className="font-display text-2xl font-bold text-[var(--brown)]">{c.title}</h3>
              <p className="mt-3 text-[var(--brown)]/70">{c.copy}</p>
              <span className="absolute right-6 top-6 font-display text-5xl font-bold text-[var(--pink)]/10">
                0{i + 1}
              </span>
            </article>
          ))}
        </div>

        {/* pull quote */}
        <figure className="reveal mx-auto mt-24 max-w-4xl border-l-4 border-[var(--skin)] pl-6 sm:pl-10">
          <blockquote className="font-display text-2xl italic leading-snug text-[var(--brown)] sm:text-3xl md:text-4xl">
            "We transform vulnerable women and girls into community leaders, entrepreneurs, and
            environmental stewards."
          </blockquote>
          <figcaption className="mt-4 text-sm font-semibold uppercase tracking-widest text-[var(--skin)]">
            — WOGI Voices
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ---------------- hub / solution ---------------- */

function Hub() {
  const pillars = [
    {
      icon: Sprout,
      title: "Urban Farming",
      copy: "Vertical gardens, sack farming, composting. Food on the table and income in the hand.",
    },
    {
      icon: Leaf,
      title: "Green Enterprise",
      copy: "Seedling nurseries, compost production, reusable sanitary pad manufacturing. Skills that last.",
    },
    {
      icon: TreePine,
      title: "Environmental Healing",
      copy: "Tree planting, drainage cleanup, community greening. Neighbourhoods that breathe.",
    },
    {
      icon: HandHeart,
      title: "Safe Spaces",
      copy: "Support circles, mentorship, GBV referral pathways. No woman left without somewhere to turn.",
    },
    {
      icon: PiggyBank,
      title: "Financial Power",
      copy: "Women-led savings groups for lasting independence and household resilience.",
    },
  ];

  return (
    <section id="hub" className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-5">
            <p className="section-label mb-4">02 — The hub model</p>
            <h2 className="font-display text-4xl font-bold leading-tight text-[var(--brown)] sm:text-5xl md:text-[3.25rem]">
              One hub. Five pillars.{" "}
              <span className="italic text-[var(--deep-pink)]">Endless possibility.</span>
            </h2>
            <p className="mt-6 text-lg text-[var(--brown)]/75">
              The Women Resilience and Green Livelihood Hub is not a project — it is a place. A
              living, breathing community space where solutions grow side by side.
            </p>
            <div className="relative mt-10 overflow-hidden rounded-3xl">
              <img
                src={verticalGarden}
                alt="Lush vertical sack garden"
                width={1200}
                height={1500}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--brown)]/90 to-transparent p-6">
                <p className="font-display text-xl italic text-white">
                  Where food, income, and dignity grow on the same wall.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {pillars.map((p, i) => (
                <article
                  key={p.title}
                  className="reveal group rounded-2xl border border-[var(--brown)]/10 bg-[var(--blush)] p-7 transition hover:-translate-y-1 hover:border-[var(--pink)]/40 hover:bg-white hover:shadow-[0_14px_40px_-18px_rgba(232,25,122,0.35)]"
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--pink)] text-white">
                    <p.icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[var(--brown)]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--brown)]/70">{p.copy}</p>
                  <div className="mt-5 text-xs font-bold uppercase tracking-widest text-[var(--deep-pink)]">
                    Pillar 0{i + 1}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- impact ---------------- */

function Impact() {
  const stats: Array<{
    n: number;
    suffix?: string;
    prefix?: string;
    label: string;
  }> = [
    { n: 1500, label: "People Supported" },
    { n: 300, label: "Women Trained" },
    { n: 10, label: "Green Spaces" },
    { n: 500, label: "Farming Households" },
    { n: 70, suffix: "%", label: "Women & Youth Beneficiaries" },
    { n: 50, prefix: "$", suffix: "K", label: "Project Budget" },
  ];

  return (
    <section id="impact" className="relative overflow-hidden bg-[var(--brown)] py-24 text-white sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-[var(--pink)]/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[var(--skin)]/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal max-w-3xl">
          <p className="section-label mb-4">03 — Impact</p>
          <h2 className="font-display text-4xl font-bold sm:text-5xl md:text-[3.5rem]">
            Real numbers. Real people.{" "}
            <span className="italic text-[var(--pink)]">Real change.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-x-6 gap-y-10 border-t border-white/10 pt-12 sm:grid-cols-2 md:grid-cols-3">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="reveal border-l-2 border-[var(--pink)]/60 pl-5"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="font-display text-5xl font-bold text-[var(--pink)] sm:text-6xl md:text-7xl">
                <CountUp to={s.n} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-white/75">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="reveal mt-20 grid items-center gap-10 overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 md:grid-cols-2">
          <img
            src={handsSoil}
            alt="Hands planting seedlings"
            width={1400}
            height={1000}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="p-8 sm:p-12">
            <p className="section-label mb-4 text-[var(--pink)]">From the field</p>
            <p className="font-display text-2xl leading-snug sm:text-3xl">
              Every seedling planted is a household fed. Every savings group started is a daughter
              kept in school. Every safe space is a future protected.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- journey ---------------- */

function Journey() {
  const phases = [
    ["Months 1–2", "Community Consultations & Baseline"],
    ["Months 2–4", "Resilience Hub & Demo Site Setup"],
    ["Months 3–8", "Training & Savings Group Formation"],
    ["Months 4–10", "Greening, Farming & Awareness Campaigns"],
    ["Months 6–11", "Mentorship, Business Support & Monitoring"],
    ["Months 11–12", "Evaluation, Documentation & Scale Planning"],
  ];
  return (
    <section id="journey" className="bg-[var(--blush)] py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="reveal mb-16 text-center">
          <p className="section-label mb-4">04 — The journey</p>
          <h2 className="font-display text-4xl font-bold text-[var(--brown)] sm:text-5xl md:text-[3.5rem]">
            The Road to <span className="italic text-[var(--deep-pink)]">Resilience</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-[var(--brown)]/75">
            A twelve-month blueprint — designed with the community, delivered with the community,
            owned by the community.
          </p>
        </div>

        <ol className="relative ml-3 border-l-2 border-dashed border-[var(--pink)]/40">
          {phases.map(([when, what], i) => (
            <li
              key={when}
              className="reveal relative mb-12 pl-10 last:mb-0"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="absolute -left-[11px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--pink)] ring-4 ring-[var(--blush)]">
                <span className="h-2 w-2 rounded-full bg-white" />
              </span>
              <div className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--skin)]">
                Phase 0{i + 1} · {when}
              </div>
              <h3 className="mt-1 font-display text-2xl font-bold text-[var(--brown)] sm:text-3xl">
                {what}
              </h3>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- team ---------------- */

const TEAM = [
  {
    name: "Mary Wairimu",
    role: "Founder & Executive Director",
    bio: "A born organiser. Mary built WOGI Voices from the ground up, refusing to let women in informal settlements be invisible.",
    initials: "MW",
  },
  {
    name: "Grace Atieno",
    role: "Programmes Lead",
    bio: "Turns vision into reality. Grace designs the trainings, savings groups, and greening work that anchor the Hub.",
    initials: "GA",
  },
  {
    name: "Priscilah Adhiambo",
    role: "Finance & Administration",
    bio: "Disciplined, transparent, and deeply committed. Priscilah ensures every shilling reaches its purpose.",
    initials: "PA",
  },
  {
    name: "Stephen Otieno",
    role: "Environmental Activities Coordinator",
    bio: "Leads the greening work with the humility of someone who knows the women are in charge.",
    initials: "SO",
  },
  {
    name: "Karen Nguta",
    role: "Volunteer Social Support",
    bio: "A fierce advocate for GBV survivors. Karen makes sure no woman navigates the hardest moments alone.",
    initials: "KN",
  },
];

function Team() {
  return (
    <section id="team" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal max-w-3xl">
          <p className="section-label mb-4">05 — The people</p>
          <h2 className="font-display text-4xl font-bold text-[var(--brown)] sm:text-5xl md:text-[3.5rem]">
            Led from <span className="italic text-[var(--deep-pink)]">within</span> the community
            we serve.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m, i) => (
            <article
              key={m.name}
              className="reveal group rounded-3xl border border-[var(--brown)]/10 bg-[var(--blush)] p-7 transition hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_18px_50px_-18px_rgba(232,25,122,0.4)]"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[var(--pink)] to-[var(--deep-pink)] font-display text-xl font-bold text-white ring-4 ring-white">
                  {m.initials}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-[var(--brown)]">{m.name}</h3>
                  <p className="text-sm font-semibold text-[var(--deep-pink)]">{m.role}</p>
                </div>
              </div>
              <p className="mt-5 text-[var(--brown)]/75">{m.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- equality ---------------- */

function Equality() {
  return (
    <section className="relative overflow-hidden bg-[var(--blush)] py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        <div className="reveal relative overflow-hidden rounded-3xl">
          <img
            src={womenCircle}
            alt="Women in a community circle"
            width={1400}
            height={1000}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover"
          />
          <div className="absolute left-6 top-6 rounded-full bg-[var(--pink)] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
            70% Women & Youth
          </div>
        </div>
        <div className="reveal">
          <p className="section-label mb-4">06 — Equality</p>
          <h2 className="font-display text-4xl font-bold leading-tight text-[var(--brown)] sm:text-5xl md:text-[3.25rem]">
            Equity is not an add-on.{" "}
            <span className="italic text-[var(--deep-pink)]">It is the architecture.</span>
          </h2>
          <p className="mt-6 text-lg text-[var(--brown)]/75">
            Over 70% of direct beneficiaries are women and girls. The resilience hub is designed to
            be accessible to persons with disabilities, GBV survivors, and the most marginalised
            women in each community. Youth and women shape every decision — in planning,
            implementation, leadership, and monitoring.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Women & girls first",
              "Disability inclusion",
              "Youth leadership",
              "GBV survivor support",
            ].map((v) => (
              <li
                key={v}
                className="diamond rounded-xl bg-white/70 px-4 py-3 text-sm font-semibold text-[var(--brown)] ring-1 ring-[var(--brown)]/5"
              >
                {v}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- get involved ---------------- */

function Involve() {
  const ctas = [
    {
      icon: Heart,
      title: "Fund the Hub",
      copy: "Your support establishes resilience hubs, trains women, and puts food on tables. Every dollar is tracked, reported, and celebrated.",
      cta: "Donate",
    },
    {
      icon: Users,
      title: "Partner With Us",
      copy: "We collaborate with NGOs, agencies, and corporates committed to women-led climate resilience and inclusive development.",
      cta: "Get in touch",
    },
    {
      icon: Megaphone,
      title: "Share the Voice",
      copy: "Amplify WOGI Voices in your network. Visibility unlocks doors that funding alone cannot.",
      cta: "Spread the word",
    },
  ];
  return (
    <section
      id="involve"
      className="relative overflow-hidden bg-gradient-to-br from-[var(--pink)] via-[var(--deep-pink)] to-[var(--brown)] py-24 text-white sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal max-w-3xl">
          <p className="section-label mb-4 text-white/85">07 — Get involved</p>
          <h2 className="font-display text-4xl font-bold sm:text-5xl md:text-[3.5rem]">
            This work needs <span className="italic">you.</span>
          </h2>
          <p className="mt-6 text-lg text-white/85">
            Three ways to stand with the women of Naivasha — and the future they're building, brick
            by brick, seedling by seedling.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {ctas.map((c, i) => (
            <article
              key={c.title}
              className="reveal group flex flex-col rounded-3xl bg-white/10 p-8 ring-1 ring-white/15 backdrop-blur transition hover:-translate-y-1.5 hover:bg-white hover:text-[var(--brown)]"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[var(--pink)] group-hover:bg-[var(--pink)] group-hover:text-white">
                <c.icon className="h-7 w-7" strokeWidth={2} />
              </div>
              <h3 className="font-display text-2xl font-bold">{c.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/85 group-hover:text-[var(--brown)]/75">
                {c.copy}
              </p>
              <a
                href="mailto:hello@wogivoices.org"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
              >
                {c.cta} <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- footer ---------------- */

function Footer() {
  return (
    <footer className="bg-[var(--brown)] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={wogiLogo}
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 rounded-full"
            />
            <div>
              <div className="font-display text-lg font-bold">WOGI VOICES</div>
              <div className="text-xs uppercase tracking-widest text-[var(--pink)]">
                Women & Girls Voices CBO
              </div>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm text-white/70">
            Empower, Educate &amp; Liberate Women &amp; Girls. A women-led grassroots organisation
            growing resilience from the ground up.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-[var(--pink)]">
            Explore
          </h4>
          <ul className="mt-5 space-y-3 text-sm text-white/80">
            {NAV.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="hover:text-[var(--pink)]">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-widest text-[var(--pink)]">
            Connect
          </h4>
          <ul className="mt-5 space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-[var(--pink)]" /> Naivasha, Kenya
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-[var(--pink)]" />
              <a href="mailto:hello@wogivoices.org" className="hover:text-[var(--pink)]">
                hello@wogivoices.org
              </a>
            </li>
          </ul>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-[var(--pink)] ring-1 ring-white/10 transition hover:bg-[var(--pink)] hover:text-white"
                aria-label="Social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-white/60 sm:flex-row sm:px-8">
          <p>© 2025 WOGI Voices — Women &amp; Girls Voices CBO · Naivasha, Kenya</p>
          <p className="italic">Growing resilience from the ground up.</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- page ---------------- */

function Index() {
  useReveal();
  return (
    <div className="min-h-screen bg-white text-[var(--brown)]">
      <Nav />
      <main>
        <Hero />
        <Story />
        <Hub />
        <Impact />
        <Journey />
        <Team />
        <Equality />
        <Involve />
      </main>
      <Footer />
    </div>
  );
}
