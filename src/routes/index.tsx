import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroWoman from "@/assets/hero-woman.jpg";
import heroEmpowerment from "@/assets/hero-women-empowerment.webp";
import heroResilience from "@/assets/hero-community-resilience.webp";
import heroGbv from "@/assets/hero-gbv.webp";
import handsSoil from "@/assets/hands-soil.jpg";
import womenCircle from "@/assets/women-circle.jpg";
import verticalGarden from "@/assets/vertical-garden.jpg";
import wogiLogo from "@/assets/wogi-logo.png";
import {
  Scale,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  Mountain,
  Users,
  Megaphone,
  GraduationCap,
  Handshake,
  Leaf,
  ShieldAlert,
  TreePine,
  HeartPulse,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
  CheckCircle2,
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
  ["Home", "#top"],
  ["About", "#about"],
  ["Programs", "#programs"],
  ["Our Impact", "#impact"],
  ["Approach", "#approach"],
  ["Partnerships", "#partnerships"],
  ["Contact", "#contact"],
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
        <nav className="hidden items-center gap-6 lg:flex">
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
            href="#partnerships"
            className="btn-pink inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold"
          >
            Partner With Us <ArrowRight className="h-4 w-4" />
          </a>
        </nav>
        <button
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className={`lg:hidden ${scrolled ? "text-white" : "text-[var(--brown)]"}`}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      {open && (
        <div className="mx-5 mt-3 rounded-2xl bg-[var(--brown)] p-5 shadow-2xl lg:hidden">
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
              href="#partnerships"
              onClick={() => setOpen(false)}
              className="btn-pink mt-2 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold"
            >
              Partner With Us <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- hero ---------------- */

const HERO_SLIDES = [
  { src: heroWoman, alt: "Human rights advocacy", label: "Human Rights Advocacy" },
  { src: heroEmpowerment, alt: "Women and girls empowerment", label: "Women & Girls Empowerment" },
  { src: heroResilience, alt: "Community resilience and climate action", label: "Community Resilience & Climate Action" },
  { src: heroGbv, alt: "Gender-based violence prevention dialogue", label: "Gender-Based Violence Prevention" },
];

function Hero() {
  const headline = ["Amplifying", "Voices.", "Building", "Resilience."];
  const [slide, setSlide] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5500);
    return () => clearInterval(id);
  }, []);
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[var(--brown)]"
    >
      {HERO_SLIDES.map((s, i) => (
        <img
          key={i}
          src={s.src}
          alt={s.alt}
          width={1920}
          height={1080}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-out ${i === slide ? "opacity-65" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--brown)]/95 via-[var(--brown)]/55 to-[var(--deep-pink)]/55" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--brown)] to-transparent" />

      <div className="absolute bottom-8 right-5 z-10 flex items-center gap-3 sm:right-8">
        <span className="hidden text-xs font-semibold uppercase tracking-widest text-white/80 sm:inline">
          {HERO_SLIDES[slide].label}
        </span>
        <div className="flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === slide ? "w-8 bg-[var(--pink)]" : "w-4 bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>
      </div>

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
              {i === 1 || i === 3 ? <span className="italic text-[var(--pink)]">{w}</span> : w}
            </span>
          ))}
        </h1>
        <p
          className="word-in mt-7 max-w-2xl text-lg font-medium text-white/85 sm:text-xl"
          style={{ animationDelay: "1.05s" }}
        >
          A women-led grassroots organization advancing human rights, gender equality, community
          resilience, and social justice for women, girls, and marginalized communities across Kenya.
        </p>
        <div
          className="word-in mt-10 flex flex-wrap gap-3"
          style={{ animationDelay: "1.25s" }}
        >
          <a
            href="#partnerships"
            className="btn-pink inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold tracking-wide"
          >
            Partner With Us <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#programs"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
          >
            Explore Our Programs
          </a>
        </div>

        <div
          className="word-in mt-16 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-5 border-t border-white/15 pt-8 sm:grid-cols-4"
          style={{ animationDelay: "1.5s" }}
        >
          {[
            ["1,500", "People supported"],
            ["300", "Women trained"],
            ["7", "Core programs"],
            ["70%", "Women & youth"],
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

/* ---------------- about (who we are) ---------------- */

function About() {
  return (
    <section id="about" className="relative bg-[var(--blush)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal max-w-3xl">
          <p className="section-label mb-4">01 — Who we are</p>
          <h2 className="font-display text-4xl font-bold text-[var(--brown)] sm:text-5xl md:text-[3.5rem]">
            Sustainable change{" "}
            <span className="italic text-[var(--deep-pink)]">begins within communities.</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <div className="reveal lg:col-span-7">
            <p className="text-lg leading-relaxed text-[var(--brown)]/80">
              WOGI Voices is a women-led grassroots organization based in Kenya working to advance
              human rights, gender equality, community resilience, and social justice for women,
              girls, and marginalized communities.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-[var(--brown)]/80">
              We believe that sustainable change begins within communities. Through advocacy, legal
              awareness, leadership development, and community-driven initiatives, we work to amplify
              voices that are often unheard and create safer, more inclusive, and resilient societies.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-[var(--brown)]/80">
              Our work is rooted in dignity, participation, empowerment, and locally led solutions.
            </p>
          </div>

          <div className="reveal space-y-5 lg:col-span-5">
            <div className="rounded-3xl bg-white p-8 shadow-[0_4px_30px_-12px_rgba(26,10,0,0.15)]">
              <div className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[var(--pink)]">
                Our Vision
              </div>
              <p className="font-display text-xl leading-snug text-[var(--brown)] sm:text-2xl">
                A just, inclusive, and resilient society where women, girls, and marginalized
                communities live with dignity, equality, safety, and equal opportunities.
              </p>
            </div>
            <div className="rounded-3xl bg-[var(--brown)] p-8 text-white shadow-[0_4px_30px_-12px_rgba(26,10,0,0.25)]">
              <div className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[var(--pink)]">
                Our Mission
              </div>
              <p className="font-display text-xl leading-snug sm:text-2xl">
                To empower women, girls, and vulnerable communities through advocacy, legal
                empowerment, leadership development, community resilience programs, and social
                justice initiatives that promote equality, human rights, and sustainable development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- core values ---------------- */

function Values() {
  const values = [
    {
      icon: Scale,
      title: "Equality",
      copy: "We promote equal rights, opportunities, and participation for all people regardless of gender, age, or social background.",
    },
    {
      icon: ShieldCheck,
      title: "Integrity",
      copy: "We uphold transparency, accountability, honesty, and ethical leadership in all our work.",
    },
    {
      icon: Users,
      title: "Community Leadership",
      copy: "We believe communities are best positioned to identify their challenges and lead sustainable solutions.",
    },
    {
      icon: Sparkles,
      title: "Empowerment",
      copy: "We strengthen the capacity, confidence, and leadership of women, girls, and young people.",
    },
    {
      icon: HeartHandshake,
      title: "Inclusion",
      copy: "We create spaces where diverse voices are heard, respected, and represented.",
    },
    {
      icon: Mountain,
      title: "Resilience",
      copy: "We support communities to adapt, recover, and thrive amid social, economic, and environmental challenges.",
    },
  ];

  return (
    <section className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal max-w-3xl">
          <p className="section-label mb-4">02 — Core values</p>
          <h2 className="font-display text-4xl font-bold text-[var(--brown)] sm:text-5xl md:text-[3.5rem]">
            The principles that{" "}
            <span className="italic text-[var(--deep-pink)]">guide every step.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <article
              key={v.title}
              className="reveal group relative overflow-hidden rounded-3xl bg-[var(--blush)] p-8 transition hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_20px_60px_-20px_rgba(232,25,122,0.35)]"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[var(--pink)] transition group-hover:bg-[var(--pink)] group-hover:text-white">
                <v.icon className="h-7 w-7" strokeWidth={2} />
              </div>
              <h3 className="font-display text-2xl font-bold text-[var(--brown)]">{v.title}</h3>
              <p className="mt-3 text-[var(--brown)]/70">{v.copy}</p>
              <span className="absolute right-6 top-6 font-display text-5xl font-bold text-[var(--pink)]/10">
                0{i + 1}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- programs (what we do) ---------------- */

function Programs() {
  const programs = [
    {
      icon: Megaphone,
      title: "Human Rights Advocacy",
      copy: "We advocate for the protection and promotion of human rights, especially for women, girls, youth, and vulnerable populations through awareness campaigns, dialogue forums, and advocacy initiatives.",
    },
    {
      icon: Scale,
      title: "Legal Aid and Legal Awareness",
      copy: "We improve access to justice by providing legal awareness, referrals, and community education on rights, gender-based violence, child protection, and civic participation.",
    },
    {
      icon: Sparkles,
      title: "Women and Girls Empowerment",
      copy: "We support women and girls through leadership development, mentorship, skills-building opportunities, and initiatives that strengthen social and economic empowerment.",
    },
    {
      icon: ShieldAlert,
      title: "Gender-Based Violence Prevention",
      copy: "We work with communities to prevent and respond to GBV through education, advocacy, survivor-centered approaches, and referral support systems.",
    },
    {
      icon: Leaf,
      title: "Community Resilience & Climate Action",
      copy: "We support communities affected by environmental and social challenges by promoting resilience-building, disaster preparedness, climate awareness, and locally led adaptation strategies.",
    },
    {
      icon: GraduationCap,
      title: "Youth Engagement and Leadership",
      copy: "We empower young people through civic engagement, leadership training, mentorship, and participation in community development and peacebuilding.",
    },
    {
      icon: HeartHandshake,
      title: "Peacebuilding and Social Cohesion",
      copy: "We promote peaceful coexistence, dialogue, inclusion, and the participation of women and youth in peace and community decision-making.",
    },
  ];

  return (
    <section id="programs" className="relative bg-[var(--blush)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-5">
            <p className="section-label mb-4">03 — What we do</p>
            <h2 className="font-display text-4xl font-bold leading-tight text-[var(--brown)] sm:text-5xl md:text-[3.25rem]">
              Seven programs.{" "}
              <span className="italic text-[var(--deep-pink)]">One shared purpose.</span>
            </h2>
            <p className="mt-6 text-lg text-[var(--brown)]/75">
              Our work spans advocacy, justice, empowerment, and resilience — designed with the
              community and delivered with the community.
            </p>
            <div className="relative mt-10 overflow-hidden rounded-3xl">
              <img
                src={verticalGarden}
                alt="Community-led resilience in action"
                width={1200}
                height={1500}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--brown)]/90 to-transparent p-6">
                <p className="font-display text-xl italic text-white">
                  Locally led. Community-owned. Built to last.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {programs.map((p, i) => (
                <article
                  key={p.title}
                  className="reveal group rounded-2xl border border-[var(--brown)]/10 bg-white p-7 transition hover:-translate-y-1 hover:border-[var(--pink)]/40 hover:shadow-[0_14px_40px_-18px_rgba(232,25,122,0.35)]"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--pink)] text-white">
                    <p.icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[var(--brown)]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--brown)]/70">{p.copy}</p>
                  <div className="mt-5 text-xs font-bold uppercase tracking-widest text-[var(--deep-pink)]">
                    Program 0{i + 1}
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
    { n: 10, label: "Community Spaces" },
    { n: 500, label: "Households Reached" },
    { n: 70, suffix: "%", label: "Women & Youth Beneficiaries" },
    { n: 7, label: "Core Programs" },
  ];

  const areas = [
    "Increased legal and human rights awareness",
    "Stronger community participation",
    "Women and youth leadership development",
    "Improved access to support and referral systems",
    "Community resilience initiatives",
    "Advocacy for gender equality and social justice",
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
          <p className="section-label mb-4">04 — Our impact</p>
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

        <div className="reveal mt-20 rounded-3xl bg-white/5 p-8 ring-1 ring-white/10 sm:p-12">
          <p className="section-label mb-6 text-[var(--pink)]">Impact areas</p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {areas.map((a) => (
              <li key={a} className="flex items-start gap-3 text-base text-white/90 sm:text-lg">
                <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-[var(--pink)]" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal mt-12 grid items-center gap-10 overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10 md:grid-cols-2">
          <img
            src={handsSoil}
            alt="Hands building community"
            width={1400}
            height={1000}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="p-8 sm:p-12">
            <p className="section-label mb-4 text-[var(--pink)]">From the field</p>
            <p className="font-display text-2xl leading-snug sm:text-3xl">
              Every voice amplified is a community strengthened. Every right defended is a future
              protected. Every leader nurtured is change made permanent.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- approach ---------------- */

function Approach() {
  const items = [
    {
      icon: Users,
      title: "Community-Led Solutions",
      copy: "We work directly with communities to identify priorities and co-create practical, sustainable solutions.",
    },
    {
      icon: Handshake,
      title: "Partnerships and Collaboration",
      copy: "We collaborate with local organizations, networks, institutions, and development partners to advance shared goals.",
    },
    {
      icon: Megaphone,
      title: "Advocacy and Awareness",
      copy: "We use advocacy, education, storytelling, and community engagement to influence positive social change.",
    },
    {
      icon: TreePine,
      title: "Sustainability",
      copy: "Our programs are designed to strengthen long-term community capacity and resilience.",
    },
  ];

  return (
    <section id="approach" className="bg-[var(--blush)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal max-w-3xl">
          <p className="section-label mb-4">05 — Our approach</p>
          <h2 className="font-display text-4xl font-bold text-[var(--brown)] sm:text-5xl md:text-[3.5rem]">
            How we{" "}
            <span className="italic text-[var(--deep-pink)]">create lasting change.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {items.map((it, i) => (
            <article
              key={it.title}
              className="reveal group flex gap-5 rounded-3xl bg-white p-8 transition hover:-translate-y-1 hover:shadow-[0_18px_50px_-18px_rgba(232,25,122,0.4)]"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex-shrink-0">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--blush)] text-[var(--pink)] transition group-hover:bg-[var(--pink)] group-hover:text-white">
                  <it.icon className="h-7 w-7" strokeWidth={2} />
                </div>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-[var(--brown)]">{it.title}</h3>
                <p className="mt-2 text-[var(--brown)]/75">{it.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- partnerships ---------------- */

function Partnerships() {
  const partners = [
    "Community organizations",
    "Civil society organizations",
    "Donors & development partners",
    "Government institutions",
    "Youth & women-led groups",
    "Researchers & advocates",
  ];
  return (
    <section
      id="partnerships"
      className="relative overflow-hidden bg-gradient-to-br from-[var(--pink)] via-[var(--deep-pink)] to-[var(--brown)] py-24 text-white sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="reveal lg:col-span-6">
            <p className="section-label mb-4 text-white/85">06 — Partnerships</p>
            <h2 className="font-display text-4xl font-bold sm:text-5xl md:text-[3.5rem]">
              Partner With <span className="italic">Us.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/90">
              We welcome partnerships with community organizations, civil society organizations,
              donors and development partners, government institutions, youth and women-led groups,
              researchers and advocates.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-white/90">
              Together, we can create stronger, safer, and more resilient communities.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold tracking-wide text-[var(--deep-pink)] transition hover:bg-[var(--blush)]"
              >
                Get in Touch <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@wogivoices.org"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15"
              >
                Email Us
              </a>
            </div>
          </div>

          <div className="reveal lg:col-span-6">
            <div className="rounded-3xl bg-white/10 p-8 ring-1 ring-white/15 backdrop-blur sm:p-10">
              <p className="section-label mb-6 text-white/85">Who we partner with</p>
              <ul className="grid gap-4 sm:grid-cols-2">
                {partners.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-3 rounded-xl bg-white/5 p-4 text-sm font-semibold text-white ring-1 ring-white/10"
                  >
                    <HeartPulse className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--pink)]" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- contact / footer ---------------- */

function Footer() {
  return (
    <footer id="contact" className="bg-[var(--brown)] text-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="reveal mb-12 max-w-3xl">
          <p className="section-label mb-4 text-[var(--pink)]">07 — Contact</p>
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            Let's <span className="italic text-[var(--pink)]">connect.</span>
          </h2>
          <p className="mt-5 text-lg text-white/80">
            Reach out to learn more, partner with us, or support our work.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
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
                  Women & Girls Voices
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm italic text-white/80">
              Women-led · Community-driven · Impact-focused
            </p>
            <p className="mt-4 max-w-sm text-sm text-white/70">
              A women-led grassroots organization advancing human rights, gender equality, and
              community resilience in Kenya.
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
            <ul className="mt-5 space-y-3 text-sm text-white/85">
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 flex-shrink-0 text-[var(--pink)]" />
                Naivasha, Kenya
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-[var(--pink)]" />
                <a href="mailto:info@wogivoices.org" className="hover:text-[var(--pink)]">
                  info@wogivoices.org
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-[var(--pink)]" />
                <a href="tel:+254000000000" className="hover:text-[var(--pink)]">
                  +254 (0) 000 000 000
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
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-white/60 sm:flex-row sm:px-8">
          <p>© 2026 WOGI Voices — Women & Girls Voices · Naivasha, Kenya</p>
          <p className="italic">Women-led · Community-driven · Impact-focused</p>
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
        <About />
        <Values />
        <Programs />
        <Impact />
        <Approach />
        <Partnerships />
      </main>
      <Footer />
    </div>
  );
}
