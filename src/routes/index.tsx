import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Preloader } from "@/components/Preloader";
import { Reveal, staggerContainer, staggerItem } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { Cursor } from "@/components/Cursor";
import { AmbientBackground } from "@/components/AmbientBackground";
import { ALL_SOCIALS } from "@/components/BrandIcons";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Building2,
  ExternalLink,
  Eye,
  Send,
  GraduationCap,
  Award,
  BookOpen,
  Layout,
  Server,
  Database,
  Wrench,
  Cloud,
  Sparkles,
  Code,
  Terminal,
  GitBranch,
  Network,
  Zap,
  ArrowDown,
  Download,
  Sun,
  Moon,
  Menu,
  X as CloseIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

type Icon = ComponentType<SVGProps<SVGSVGElement> & { className?: string }>;

const NAV = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

const STATS = [
  { value: "7.98", label: "CGPA" },
  { value: "2+", label: "Years Exp" },
  { value: "6+", label: "Projects" },
  { value: "7", label: "Certifications" },
];

const LEARNING = ["Flask", "API Development", "Automation Scripting", "Backend Architecture", "Advanced SQL"];

const SKILL_GROUPS: {
  title: string;
  Icon: Icon;
  tone: string;
  items: string[];
}[] = [
  {
    title: "Programming Languages",
    Icon: Code,
    tone: "indigo",
    items: ["JavaScript (ES6+)", "HTML5", "CSS3", "Python (Basic)"],
  },
  {
    title: "Frontend",
    Icon: Layout,
    tone: "indigo",
    items: ["React JS", "Tailwind CSS", "Bootstrap", "Next JS (Basic)"],
  },
  {
    title: "Backend",
    Icon: Server,
    tone: "green",
    items: ["Node JS", "Express JS"],
  },
  {
    title: "Databases",
    Icon: Database,
    tone: "blue",
    items: ["MongoDB", "MySQL"],
  },
  {
    title: "Cloud",
    Icon: Cloud,
    tone: "orange",
    items: ["AWS Cloud Foundations", "Microsoft Azure Fundamentals"],
  },
  {
    title: "Version Control",
    Icon: GitBranch,
    tone: "purple",
    items: ["Git", "GitHub"],
  },
  {
    title: "Developer Tools",
    Icon: Wrench,
    tone: "purple",
    items: ["VS Code", "Cursor AI", "Google Colab", "Anaconda Navigator"],
  },
  {
    title: "APIs & Concepts",
    Icon: Network,
    tone: "emerald",
    items: ["REST APIs", "Responsive Web Design", "WCAG Accessibility", "Debugging", "API Integration"],
  },
  {
    title: "AI Tools",
    Icon: Sparkles,
    tone: "pink",
    items: ["ChatGPT", "Cursor AI", "Prompt Engineering", "Generative AI"],
  },
];

const TONE: Record<string, { bg: string; text: string; dot: string }> = {
  indigo: { bg: "bg-indigo-500/10", text: "text-indigo-400", dot: "bg-indigo-500" },
  green: { bg: "bg-green-500/10", text: "text-green-400", dot: "bg-green-500" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-400", dot: "bg-blue-500" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-400", dot: "bg-purple-500" },
  orange: { bg: "bg-orange-500/10", text: "text-orange-400", dot: "bg-orange-500" },
  pink: { bg: "bg-pink-500/10", text: "text-pink-400", dot: "bg-pink-500" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", dot: "bg-emerald-500" },
};

const EXPERIENCE = [
  {
    period: "Oct 2024 – Dec 2025",
    status: "Completed",
    statusTone: "green",
    role: "Web Developer",
    company: "NS Global Corporation",
    location: "Rajkot",
    accent: "indigo",
    bullets: [
      "Developed responsive websites and web applications using HTML5, CSS3, JavaScript, React.js, and Python.",
      "Troubleshot frontend issues, browser compatibility problems, and application bugs to improve overall application performance.",
      "Optimized SQL and MongoDB queries, enhancing data retrieval efficiency and application responsiveness.",
      "Collaborated directly with clients to gather requirements and translate business needs into technical solutions.",
      "Prepared technical documentation and supported team members with Git workflows, deployment processes, and development environment setup.",
      "Worked closely with cross-functional teams to deliver projects within deadlines while maintaining code quality.",
    ],
  },
  {
    period: "Dec 2025 – Present",
    status: "Current",
    statusTone: "emerald",
    role: "React Developer",
    company: "ADI Tech",
    location: "Ahmedabad",
    accent: "green",
    bullets: [
      "Developed and maintained responsive web applications using React.js, JavaScript (ES6+), HTML5, and CSS3, ensuring scalable and user-friendly interfaces.",
      "Built reusable React components and implemented state management to improve application maintainability and performance.",
      "Integrated REST APIs and managed asynchronous data fetching for seamless frontend-backend communication.",
      "Optimized application performance using lazy loading, code splitting, and cross-browser compatibility techniques.",
      "Collaborated with UI/UX designers, backend developers, and QA teams to deliver high-quality features within Agile sprints.",
      "Utilized Git and GitHub for version control, code reviews, and collaborative development.",
      "Leveraged AI-assisted development tools such as ChatGPT and Cursor AI for debugging, code optimization, and faster feature implementation.",
      "Diagnosed and resolved production issues to improve application stability and user experience.",
    ],
  },
];

const PROJECTS = [
  {
    n: "01",
    tone: "indigo",
    status: "Live",
    title: "Enterprise Business Solution Website",
    blurb:
      "Responsive enterprise business website built with React.js and Next.js, featuring reusable component architecture, server-side rendering, REST API integrations, and WCAG-aligned accessibility for a real client.",
    features: [
      "Reusable component architecture with SSR via Next.js",
      "REST API integration with dynamic content rendering",
      "WCAG accessibility & optimized Core Web Vitals for SEO",
      "~40% faster delivery via reusable components & AI-assisted workflows",
    ],
    tags: ["React", "Next.js", "Tailwind CSS", "JavaScript ES6+", "REST APIs"],
    live: "https://redhandsolutions.vercel.app/",
    repo: "https://github.com/AryanPatel03/red_hand_solutions",
  },
  {
    n: "02",
    tone: "emerald",
    status: "This Portfolio",
    title: "Personal Portfolio Website",
    blurb:
      "Fully responsive personal portfolio showcasing projects, technical skills, and achievements with interactive UI components, optimized performance, and accessibility-first, modular code.",
    features: [
      "Interactive UI components with performance optimizations",
      "Contact form & social integrations for engagement",
      "Responsive across desktop, tablet, and mobile devices",
      "Clean, modular code following accessibility best practices",
    ],
    tags: ["HTML5", "CSS3", "JavaScript"],
    live: "#hero",
    repo: null,
  },
  {
    n: "03",
    tone: "blue",
    status: "Live",
    title: "KR International",
    blurb:
      "A modern export business website for KR International showcasing premium natural gemstones, fresh produce, eco-friendly packaging, and sustainable export collections — with professional branding, product showcase and quotation requests.",
    features: [
      "Responsive business website",
      "Dynamic product showcase",
      "Quote request & integrations",
    ],
    tags: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "PHP", "Telegram API"],
    live: "https://krinternational.vercel.app/",
    repo: null,
  },
  {
    n: "04",
    tone: "purple",
    status: "Live",
    title: "Kilo AI",
    blurb:
      "An advanced AI-powered Telegram chatbot that intelligently routes requests across multiple OpenRouter models while maintaining conversation memory, automatic fallback handling, response caching, rate limiting, and production-ready architecture.",
    features: [
      "Multi-model routing & fallbacks",
      "Conversation memory & cache",
      "Usage analytics & admin tools",
    ],
    tags: ["Python", "python-telegram-bot", "OpenRouter API", "Flask", "SQLite"],
    live: "https://web.telegram.org/a/#8852505110",
    repo: null,
  },
];

const CERTS: { title: string; issuer: string; year: string; Icon: Icon; tone: string }[] = [
  { title: "Introduction to Prompt Engineering for Generative AI", issuer: "LinkedIn Learning", year: "2025", Icon: Sparkles, tone: "pink" },
  { title: "Learning SQL Programming", issuer: "LinkedIn Learning", year: "2024", Icon: Database, tone: "indigo" },
  { title: "Learning Git & GitHub", issuer: "LinkedIn Learning", year: "2026", Icon: GitBranch, tone: "purple" },
  { title: "HTML, CSS and JavaScript for Web Developers", issuer: "Coursera · Johns Hopkins University", year: "2024", Icon: Code, tone: "orange" },
  { title: "Python for Beginners", issuer: "Coursera · Google", year: "2024", Icon: Terminal, tone: "green" },
  { title: "Generative AI Mastermind 2 Days Bootcamp", issuer: "Out Skill", year: "2025", Icon: Zap, tone: "orange" },
  { title: "Computer Networking", issuer: "Great Learning", year: "2025", Icon: Network, tone: "blue" },
];

const SOCIALS = ALL_SOCIALS;

function Index() {
  return (
    <div className="min-h-screen text-zinc-100 selection:bg-indigo-500/30 selection:text-white">
      <Preloader />
      <Cursor />
      <ScrollProgress />
      <AmbientBackground />
      <Nav />
      <main className="relative z-[1]">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-indigo-500 via-violet-400 to-emerald-400 z-[60]"
    />
  );
}

function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = (localStorage.getItem("theme") as "dark" | "light" | null) ?? "dark";
    setTheme(stored);
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    const d = document.documentElement;
    d.classList.remove("dark", "light");
    d.classList.add(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* noop */
    }
  };
  return { theme, toggle };
}

function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={`relative w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-300 transition-colors overflow-hidden ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.span
            key="sun"
            initial={{ y: -14, rotate: -90, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            exit={{ y: 14, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute"
          >
            <Sun className="w-4 h-4" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ y: 14, rotate: 90, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            exit={{ y: -14, rotate: -90, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute"
          >
            <Moon className="w-4 h-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[#06060b]/70 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <a href="#hero" className="font-space font-bold tracking-tight text-lg">
            Aryan Virani<span className="text-indigo-400">.</span>
          </a>
          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-colors"
            >
              Let's talk <ArrowUpRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="lg:hidden w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-200 transition-colors"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <MobileMenu onClose={() => setOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl lg:hidden mobile-menu-overlay"
        aria-hidden="true"
      />
      <motion.aside
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 right-0 bottom-0 z-50 w-full bg-[#0e0e18] p-6 flex flex-col lg:hidden mobile-menu-panel"
      >
        <div className="flex items-center justify-between mb-8">
          <span className="font-space font-bold tracking-tight text-lg text-zinc-100">
            Aryan Virani<span className="text-indigo-400">.</span>
          </span>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 flex items-center justify-center text-zinc-200 transition-colors"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
        <motion.nav
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="flex flex-col gap-2"
        >
          {NAV.map((n) => (
            <motion.a
              key={n.href}
              variants={staggerItem}
              href={n.href}
              onClick={onClose}
              className="group flex items-center justify-between px-5 py-4 rounded-2xl bg-[#151522] hover:bg-[#1c1c2d] border border-white/10 text-base font-space font-medium text-zinc-200 transition-colors mobile-menu-item"
            >
              {n.label}
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-indigo-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
            </motion.a>
          ))}
        </motion.nav>
        <a
          href="#contact"
          onClick={onClose}
          className="mt-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-medium text-sm transition-colors"
        >
          <Mail className="w-4 h-4" /> Let's talk
        </a>
      </motion.aside>
    </>
  );
}

function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const orb1X = useTransform(smx, (v) => v * 30);
  const orb1Y = useTransform(smy, (v) => v * 30);
  const orb2X = useTransform(smx, (v) => v * -50);
  const orb2Y = useTransform(smy, (v) => v * -40);
  const orb3X = useTransform(smx, (v) => v * 18);
  const orb3Y = useTransform(smy, (v) => v * -24);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handle = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    el.addEventListener("mousemove", handle);
    return () => el.removeEventListener("mousemove", handle);
  }, [mx, my]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-28"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(99,102,241,0.18),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(16,185,129,0.08),_transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <motion.div
          style={{ x: orb1X, y: orb1Y }}
          className="absolute top-[12%] left-[8%] w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl"
        />
        <motion.div
          style={{ x: orb2X, y: orb2Y }}
          className="absolute bottom-[10%] right-[6%] w-[22rem] h-[22rem] rounded-full bg-violet-500/15 blur-3xl"
        />
        <motion.div
          style={{ x: orb3X, y: orb3Y }}
          className="absolute top-[40%] right-[22%] w-56 h-56 rounded-full bg-emerald-500/10 blur-3xl"
        />
        {/* Floating geometric shapes */}
        <motion.div
          aria-hidden
          animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="hidden md:block absolute top-[22%] right-[10%] w-16 h-16 rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/20 to-violet-500/5 backdrop-blur-xl shadow-2xl shadow-indigo-500/20"
          style={{ transform: "rotate(12deg)" }}
        />
        <motion.div
          aria-hidden
          animate={{ y: [0, 14, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="hidden md:block absolute bottom-[26%] left-[10%] w-10 h-10 rounded-full border border-white/10 bg-gradient-to-br from-emerald-400/20 to-transparent backdrop-blur-xl"
        />
        <motion.div
          aria-hidden
          animate={{ y: [0, -10, 0], x: [0, 6, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:block absolute top-[60%] right-[28%] w-6 h-6 rotate-45 border border-indigo-400/30 bg-indigo-500/10 backdrop-blur-md"
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full py-16 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] gap-12 items-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.span
            variants={staggerItem}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-semibold tracking-[0.15em] uppercase mb-8"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
            </span>
            Available for opportunities
          </motion.span>

          <h1 className="font-space font-bold tracking-tight leading-[0.9] mb-6">
            <motion.span
              variants={staggerItem}
              className="block text-2xl sm:text-3xl md:text-4xl text-zinc-500 font-medium mb-3"
            >
              Hello, I'm
            </motion.span>
            <motion.span
              variants={staggerItem}
              className="block text-[3rem] sm:text-[4.5rem] md:text-[6rem] leading-none bg-gradient-to-br from-indigo-300 via-indigo-400 to-violet-500 bg-clip-text text-transparent"
            >
              ARYAN
            </motion.span>
            <motion.span
              variants={staggerItem}
              className="block text-[3rem] sm:text-[4.5rem] md:text-[6rem] leading-none text-zinc-100"
            >
              VIRANI
            </motion.span>
          </h1>

          <motion.p
            variants={staggerItem}
            className="text-xl sm:text-2xl md:text-3xl font-light text-zinc-400"
          >
            <Typewriter
              words={["Full Stack Developer", "React Developer", "Python Developer", "Frontend Engineer"]}
            />
          </motion.p>

          <motion.p
            variants={staggerItem}
            className="text-sm sm:text-base md:text-lg text-zinc-500 mt-3 mb-6 flex items-center gap-1.5"
          >
            <MapPin className="w-3.5 h-3.5" />
            Ahmedabad, India
          </motion.p>

          <motion.p
            variants={staggerItem}
            className="text-[15px] md:text-base text-zinc-500 leading-relaxed max-w-xl mb-10"
          >
            Computer Science graduate passionate about building scalable web
            applications with Python & React. Turning ideas into clean,
            efficient, production-ready code.
          </motion.p>

          <motion.div variants={staggerItem} className="flex flex-wrap gap-3.5">
            <a
              href="#projects"
              className="group relative flex items-center gap-2.5 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-medium text-sm transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5"
            >
              <Eye className="w-4 h-4" /> View my work
            </a>
            <a
              href="#contact"
              className="group flex items-center gap-2.5 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-medium text-sm transition-all duration-300 hover:-translate-y-0.5"
            >
              <Send className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              Contact me
            </a>
            <a
              href="/resume.pdf"
              download
              className="group flex items-center gap-2.5 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-medium text-sm transition-all duration-300 hover:-translate-y-0.5"
            >
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              Resume
            </a>
          </motion.div>
        </motion.div>
        <HeroVisual mx={smx} my={smy} />
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-[10px] font-mono tracking-[0.25em] uppercase text-zinc-500 hover:text-indigo-300 transition-colors"
        aria-label="Scroll down"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex"
        >
          <ArrowDown className="w-4 h-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}

function SectionHeader({
  index,
  label,
  title,
  accent,
  subtitle,
}: {
  index: string;
  label: string;
  title: string;
  accent: string;
  subtitle: string;
}) {
  return (
    <Reveal className="mb-16">
      <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-indigo-400">
        {index} — {label}
      </span>
      <h2 className="font-space font-bold tracking-tight text-4xl md:text-5xl mt-3">
        {title}{" "}
        <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
          {accent}
        </span>
      </h2>
      <p className="text-zinc-500 mt-4 max-w-2xl">{subtitle}</p>
    </Reveal>
  );
}

function About() {
  return (
    <section id="about" className="py-28 md:py-36 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader
          index="01"
          label="About"
          title="Know Me"
          accent="Better"
          subtitle="Passionate about building modern, scalable, and user-focused digital experiences — one line of clean code at a time."
        />
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row items-start gap-6 mb-7">
              <ProfilePhoto />
              <div className="pt-1">
                <h3 className="text-xl font-space font-bold mb-1">Aryan Virani</h3>
                <p className="text-indigo-400 text-sm font-medium mb-2">
                  Python Developer · React Developer · Ahmedabad, India
                </p>
                <p className="text-[13px] text-zinc-400 leading-relaxed">
                  B.Tech Computer Engineering from{" "}
                  <strong className="text-zinc-100">Atmiya University</strong>{" "}
                  (CGPA: <strong className="text-indigo-400">7.98/10</strong>).
                  Currently at ADI Tech.
                </p>
              </div>
            </div>
            <p className="text-base text-zinc-400 leading-relaxed mb-5">
              With hands-on experience at{" "}
              <strong className="text-zinc-100">NS Global Corporation</strong>{" "}
              and <strong className="text-zinc-100">ADI Tech</strong>, I've
              built responsive apps, optimized databases, debugged complex
              issues, and collaborated with cross-functional teams. Now
              deepening expertise in{" "}
              <strong className="text-zinc-100">
                Python, Flask & backend architecture
              </strong>
              .
            </p>
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-semibold">Currently Learning</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {LEARNING.map((l) => (
                  <span
                    key={l}
                    className="px-3 py-1.5 bg-indigo-500/10 text-indigo-300 text-xs font-medium rounded-lg"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="p-5 rounded-2xl bg-[#0e0e18] border border-white/[0.06] text-center"
                >
                  <div className="text-3xl md:text-4xl font-space font-bold bg-gradient-to-br from-indigo-300 to-violet-400 bg-clip-text text-transparent">
                    {s.value}
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-2 font-semibold uppercase tracking-[0.15em]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  // Flatten all skills, tagged with their group tone, for the marquee rows.
  const flat = SKILL_GROUPS.flatMap((g) =>
    g.items.map((label) => ({ label, tone: g.tone, Icon: g.Icon, group: g.title })),
  );
  const half = Math.ceil(flat.length / 2);
  const rowA = flat.slice(0, half);
  const rowB = flat.slice(half).concat(flat.slice(0, 2)); // pad second row

  return (
    <section id="skills" className="py-28 md:py-36 relative bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader
          index="02"
          label="Skills"
          title="My Skills"
          accent="Toolkit"
          subtitle="A curated set of technologies I use to build fast, reliable, and beautiful products."
        />

        {/* Group summary chips */}
        <Reveal className="flex flex-wrap justify-center gap-2 mb-10">
          {SKILL_GROUPS.map(({ title, Icon, tone }) => {
            const t = TONE[tone];
            return (
              <span
                key={title}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium ${t.bg} ${t.text}`}
              >
                <Icon className="w-3.5 h-3.5" />
                {title}
              </span>
            );
          })}
        </Reveal>

        <div className="space-y-5">
          <SkillMarquee items={rowA} duration={48} />
          <SkillMarquee items={rowB} duration={62} reverse />
        </div>

        {/* Original skill cards grid — restored for readability */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {SKILL_GROUPS.map(({ title, Icon, tone, items }) => {
            const t = TONE[tone];
            return (
              <Reveal
                key={title}
                className="group relative rounded-2xl bg-[#0e0e18] border border-white/[0.06] p-6 hover:border-indigo-500/30 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_rgba(99,102,241,0.35)] transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.bg} group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`w-5 h-5 ${t.text}`} />
                  </span>
                  <h3 className="font-space font-semibold text-lg text-zinc-100">
                    {title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs font-medium text-zinc-300 hover:bg-white/[0.06] hover:text-zinc-100 transition-colors"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${t.dot}`} />
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SkillMarquee({
  items,
  duration,
  reverse,
}: {
  items: { label: string; tone: string; Icon: Icon; group: string }[];
  duration: number;
  reverse?: boolean;
}) {
  const loop = [...items, ...items];
  return (
    <div className="marquee relative overflow-hidden">
      <div
        className={`marquee-track gap-3 ${reverse ? "reverse" : ""}`}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {loop.map((it, i) => {
          const t = TONE[it.tone];
          return (
            <div
              key={`${it.label}-${i}`}
              className={`shrink-0 group flex items-center gap-2.5 pl-3 pr-4 py-2.5 rounded-xl bg-[#0e0e18] border border-white/[0.06] hover:border-indigo-500/40 hover:-translate-y-0.5 transition-all duration-300`}
            >
              <span
                className={`w-7 h-7 rounded-lg flex items-center justify-center ${t.bg} group-hover:scale-110 transition-transform`}
              >
                <it.Icon className={`w-3.5 h-3.5 ${t.text}`} />
              </span>
              <span className="text-sm font-medium text-zinc-200 whitespace-nowrap">
                {it.label}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 whitespace-nowrap">
                {it.group}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Typewriter({ words, typeSpeed = 85, deleteSpeed = 45, holdMs = 1400 }: { words: string[]; typeSpeed?: number; deleteSpeed?: number; holdMs?: number }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), holdMs);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(() => {
      setText((prev) =>
        deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
      );
    }, deleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(t);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, holdMs]);

  return (
    <span className="inline-flex items-baseline">
      <span className="bg-gradient-to-r from-indigo-300 via-indigo-400 to-violet-400 bg-clip-text text-transparent font-medium">
        {text}
      </span>
      <span
        aria-hidden
        className="ml-1 inline-block w-[2px] h-[0.9em] translate-y-[0.15em] bg-indigo-400 animate-pulse"
      />
    </span>
  );
}

function _SkillMarqueeUnused({
  items,
  duration,
  reverse,
}: {
  items: { label: string; tone: string; Icon: Icon; group: string }[];
  duration: number;
  reverse?: boolean;
}) {
  const loop = [...items, ...items];
  return (
    <div className="marquee relative overflow-hidden">
      <div
        className={`marquee-track gap-3 ${reverse ? "reverse" : ""}`}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {loop.map((it, i) => {
          const t = TONE[it.tone];
          return (
            <div
              key={`${it.label}-${i}`}
              className={`shrink-0 group flex items-center gap-2.5 pl-3 pr-4 py-2.5 rounded-xl bg-[#0e0e18] border border-white/[0.06] hover:border-indigo-500/40 hover:-translate-y-0.5 transition-all duration-300`}
            >
              <span
                className={`w-7 h-7 rounded-lg flex items-center justify-center ${t.bg} group-hover:scale-110 transition-transform`}
              >
                <it.Icon className={`w-3.5 h-3.5 ${t.text}`} />
              </span>
              <span className="text-sm font-medium text-zinc-200 whitespace-nowrap">
                {it.label}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 whitespace-nowrap">
                {it.group}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
function Experience() {
  return (
    <section id="experience" className="py-28 md:py-36 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader
          index="03"
          label="Experience"
          title="Where I've"
          accent="Worked"
          subtitle="Real-world experience building production-grade applications for clients and companies."
        />
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-indigo-500/60 via-white/10 to-transparent" />
          <div className="space-y-14">
            {EXPERIENCE.map((e) => {
              const dot = TONE[e.accent].dot;
              const arrow = TONE[e.accent].text;
              const status = TONE[e.statusTone];
              return (
                <Reveal key={e.role} className="relative pl-14 md:pl-20">
                  <div
                    className={`absolute left-[9px] md:left-[17px] top-2 w-3.5 h-3.5 rounded-full border-2 border-[#06060b] z-10 ${dot}`}
                  />
                  <div className="p-6 md:p-7 rounded-2xl bg-[#0e0e18] border border-white/[0.06] hover:border-indigo-500/30 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300">
                    <div className="flex flex-wrap items-center gap-2.5 mb-3.5">
                      <span className="px-3 py-1 bg-indigo-500/10 text-indigo-300 text-[11px] font-semibold rounded-lg">
                        {e.period}
                      </span>
                      <span
                        className={`px-3 py-1 text-[11px] font-semibold rounded-lg flex items-center gap-1.5 ${status.bg} ${status.text}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${status.dot} ${
                            e.status === "Current" ? "animate-pulse" : ""
                          }`}
                        />
                        {e.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-space font-bold mb-1">{e.role}</h3>
                    <p className="text-indigo-300 font-medium text-sm mb-5 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4" />
                      {e.company} · {e.location}
                    </p>
                    <ul className="space-y-2.5 text-zinc-400 text-sm leading-relaxed">
                      {e.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5">
                          <span className={`mt-0.5 shrink-0 ${arrow}`}>▹</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const isMobile = useIsMobile();
  const perSlide = isMobile ? 1 : 2;
  const pairs: (typeof PROJECTS)[] = [];
  for (let i = 0; i < PROJECTS.length; i += perSlide) pairs.push(PROJECTS.slice(i, i + perSlide));
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const total = pairs.length;

  useEffect(() => {
    setPage((p) => Math.min(p, Math.max(0, total - 1)));
  }, [total]);

  const go = (next: number) => {
    setDir(next > page || (page === total - 1 && next === 0) ? 1 : -1);
    setPage((next + total) % total);
  };

  useEffect(() => {
    if (paused || total <= 1) return;
    const id = window.setInterval(() => {
      setDir(1);
      setPage((p) => (p + 1) % total);
    }, 6000);
    return () => clearInterval(id);
  }, [paused, total]);

  return (
    <section id="projects" className="py-28 md:py-36 relative bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader
          index="04"
          label="Projects"
          title="Featured"
          accent="Work"
          subtitle="Some of my best projects that showcase skills, creativity, and problem-solving abilities."
        />

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative overflow-hidden [perspective:1400px] min-h-[560px] md:min-h-[600px]">
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <motion.div
                key={page}
                custom={dir}
                initial={{ opacity: 0, x: dir * 80, scale: 0.96, rotateY: dir * 6 }}
                animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, x: dir * -80, scale: 0.96, rotateY: dir * -6 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className={`grid gap-5 will-change-transform ${perSlide === 2 ? "md:grid-cols-2 max-w-none" : "grid-cols-1 max-w-md mx-auto"}`}
              >
                {pairs[page].map((p, i) => (
                  <motion.article
                    key={p.title}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="[perspective:1000px]"
                  >
                    <ProjectCard p={p} />
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              onClick={() => go(page - 1)}
              aria-label="Previous projects"
              className="group w-11 h-11 rounded-full border border-white/10 bg-white/[0.03] hover:bg-indigo-500/10 hover:border-indigo-400/50 flex items-center justify-center transition-all hover:shadow-lg hover:shadow-indigo-500/20 hover:-translate-x-0.5"
            >
              <ChevronLeft className="w-5 h-5 text-zinc-300 group-hover:text-indigo-300 transition" />
            </button>

            <div className="flex items-center gap-2">
              {pairs.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Go to project pair ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === page
                      ? "w-10 bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.7)]"
                      : "w-3 bg-white/15 hover:bg-white/30"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => go(page + 1)}
              aria-label="Next projects"
              className="group w-11 h-11 rounded-full border border-white/10 bg-white/[0.03] hover:bg-indigo-500/10 hover:border-indigo-400/50 flex items-center justify-center transition-all hover:shadow-lg hover:shadow-indigo-500/20 hover:translate-x-0.5"
            >
              <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:text-indigo-300 transition" />
            </button>
          </div>

          <p className="mt-4 text-center text-[11px] uppercase tracking-[0.25em] text-zinc-500 font-mono">
            {String(page * perSlide + 1).padStart(2, "0")}
            <span className="mx-2 text-zinc-700">/</span>
            {String(PROJECTS.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p }: { p: (typeof PROJECTS)[number] }) {
  const t = TONE[p.tone];
  return (
    <TiltCard
      as="div"
      max={8}
      className="group relative p-7 md:p-8 rounded-2xl bg-[#0e0e18] border border-white/[0.06] hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 transition-[border,box-shadow] duration-500 overflow-hidden flex flex-col h-full will-change-transform"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.14),_transparent_60%)]" />
      <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[conic-gradient(from_120deg,transparent,rgba(129,140,248,0.25),transparent_40%)] pointer-events-none" />
      <div className="relative flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <span className={`text-[11px] font-bold tracking-[0.2em] uppercase ${t.text}`}>
            Project {p.n} / 0{PROJECTS.length}
          </span>
          <span
            className={`px-2.5 py-1 text-[10px] font-semibold rounded-lg flex items-center gap-1.5 ${t.bg} ${t.text}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${t.dot} animate-pulse`} />
            {p.status}
          </span>
        </div>
        <h3 className="text-xl md:text-2xl font-space font-bold mb-3 leading-tight tracking-tight">
          {p.title}
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-5">{p.blurb}</p>

        <div className="mb-5">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
            Key Features
          </p>
          <ul className="space-y-1 text-sm text-zinc-400">
            {p.features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className={`${t.text} mt-0.5`}>▹</span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {p.tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.04, duration: 0.4 }}
              className={`px-2.5 py-1 text-[10px] font-medium rounded-md ${t.bg} ${t.text} transition-transform hover:-translate-y-0.5`}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-auto">
          <a
            href={p.live}
            target={p.live.startsWith("#") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="group/btn flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5"
          >
            <ExternalLink className="w-4 h-4 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
            Live Preview
          </a>
          {p.repo ? (
            <a
              href={p.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium text-sm transition-all hover:-translate-y-0.5"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          ) : (
            <span className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl font-medium text-sm text-zinc-500 opacity-60">
              <Github className="w-4 h-4" />
              Private Repo
            </span>
          )}
        </div>
      </div>
    </TiltCard>
  );
}

function Education() {
  return (
    <section id="education" className="py-28 md:py-36 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader
          index="05"
          label="Education & Certs"
          title="Learning"
          accent="Journey"
          subtitle="Academic foundations and industry certifications that keep me sharp and up to date."
        />

        <div className="mb-12">
          <h3 className="text-base font-space font-semibold mb-5 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-400" /> Education
          </h3>
          <div className="max-w-3xl p-6 md:p-7 rounded-2xl bg-[#0e0e18] border border-white/[0.06]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <div>
                <h4 className="text-lg font-space font-bold">
                  B.Tech in Computer Engineering
                </h4>
                <p className="text-indigo-400 font-medium text-sm mt-0.5">
                  Atmiya University · Rajkot, IN
                </p>
              </div>
              <span className="px-4 py-1.5 bg-indigo-500/10 text-indigo-300 text-sm font-bold rounded-xl shrink-0 self-start">
                2025
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-green-500 rounded-full"
                  style={{ width: "79.8%" }}
                />
              </div>
              <span className="text-sm font-bold font-space bg-gradient-to-r from-indigo-300 to-violet-400 bg-clip-text text-transparent">
                7.98/10
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-base font-space font-semibold mb-5 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" /> Certifications
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTS.map(({ title, issuer, year, Icon, tone }, i) => {
              const t = TONE[tone];
              return (
                <Reveal
                  key={title}
                  className="group p-5 rounded-2xl bg-[#0e0e18] border border-white/[0.06] hover:border-indigo-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      {/* <span className="font-space text-xs font-bold text-zinc-500 tabular-nums w-6 text-right">
                        {String(i + 1).padStart(2, "0")}
                      </span> */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${t.bg}`}>
                        <Icon className={`w-4 h-4 ${t.text}`} />
                      </div>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-medium">{year}</span>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{title}</h4>
                  <p className="text-xs text-zinc-500">{issuer}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-28 md:py-36 relative bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeader
          index="06"
          label="Contact"
          title="Let's"
          accent="Connect"
          subtitle="Have a project in mind, a question, or just want to say hello? I'd love to hear from you."
        />

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-2 space-y-3">
            <ContactCard
              href="mailto:aryanvirani9853@gmail.com"
              Icon={Mail}
              tone="indigo"
              label="Email"
              value="aryanvirani9853@gmail.com"
            />
            <ContactCard
              href="tel:+919081792393"
              Icon={Phone}
              tone="green"
              label="Phone"
              value="(+91) 90817-92393"
            />
            <ContactCard
              href="https://linkedin.com/in/aryan-virani-522052224"
              Icon={Linkedin}
              tone="blue"
              label="LinkedIn"
              value="Aryan Virani"
              external
            />
            <ContactCard
              href="https://www.google.com/maps/place/Ahmedabad,+Gujarat/" 
              Icon={MapPin}
              tone="purple"
              label="Location"
              value="Ahmedabad, India"
              external
            />

            <SocialStrip />
          </div>

          <div className="lg:col-span-3">
            <div className="p-8 md:p-10 rounded-2xl bg-[#0e0e18] border border-white/[0.06]">
              <h3 className="font-space font-bold text-2xl md:text-3xl mb-3">
                Ready to start a project?
              </h3>
              <p className="text-zinc-400 mb-8 leading-relaxed">
                I'm currently open to freelance projects, contract work, and
                full-time opportunities. The fastest way to reach me is by
                email — I usually reply within a day.
              </p>
              <a
                href="mailto:aryanvirani9853@gmail.com"
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/25"
              >
                <Mail className="w-4 h-4" />
                Send me an email
                <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <div className="mt-8 pt-8 border-t border-white/[0.06] grid grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">
                    Response Time
                  </p>
                  <p className="font-medium">Within 24 hours</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">
                    Availability
                  </p>
                  <p className="font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Open for work
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  href,
  Icon,
  tone,
  label,
  value,
  external,
}: {
  href?: string;
  Icon: Icon;
  tone: string;
  label: string;
  value: string;
  external?: boolean;
}) {
  const t = TONE[tone];
  const inner = (
    <>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${t.bg}`}>
        <Icon className={`w-5 h-5 ${t.text}`} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">
          {label}
        </p>
        <p className="text-sm font-medium break-all group-hover:text-indigo-300 transition-colors">
          {value}
        </p>
      </div>
    </>
  );
  const base =
    "flex items-center gap-3.5 p-5 rounded-2xl bg-[#0e0e18] border border-white/[0.06] transition-colors";
  if (!href) return <div className={base}>{inner}</div>;
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${base} group hover:border-white/[0.15]`}
    >
      {inner}
    </a>
  );
}

function Footer() {
  return _Footer();
}

function SocialStrip() {
  return (
    <div className="flex items-center gap-2 pt-3 flex-wrap">
      {SOCIALS.map(({ label, href, Icon }, i) => (
        <motion.a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          aria-label={label}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.04, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -3, scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="group relative w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-indigo-400/50 hover:bg-indigo-500/10 flex items-center justify-center text-zinc-400 hover:text-indigo-300 transition-colors"
        >
          <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-500/20 blur-md -z-10" />
          <Icon className="w-4 h-4" />
        </motion.a>
      ))}
    </div>
  );
}

function ProfilePhoto() {
  const [imgOk, setImgOk] = useState(true);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="shrink-0 relative"
    >
      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-indigo-500/40 via-violet-500/20 to-emerald-400/30 blur-2xl opacity-70" />
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.03, rotate: -1 }}
        className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-500 to-violet-600 border border-white/15 shadow-2xl shadow-indigo-500/30 backdrop-blur-xl"
      >
        {imgOk ? (
          <img
            src="/me.jpg"
            alt="Aryan Virani"
            onError={() => setImgOk(false)}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white font-space font-bold text-4xl sm:text-5xl tracking-tight">
            AV
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10 pointer-events-none" />
        <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-white/10 blur-2xl" />
      </motion.div>
      <span className="absolute -bottom-1 -right-1 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0e0e18] border border-white/10 text-[10px] font-semibold text-emerald-300">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online
      </span>
    </motion.div>
  );
}

function HeroVisual({ mx, my }: { mx: MotionValue<number>; my: MotionValue<number> }) {
  const rotateY = useTransform(mx, [-0.5, 0.5], [-14, 14]);
  const rotateX = useTransform(my, [-0.5, 0.5], [10, -10]);
  const tx = useTransform(mx, (v) => v * 14);
  const ty = useTransform(my, (v) => v * 14);

  const badges = [
    { label: "React", tone: "indigo", angle: 0 },
    { label: "Python", tone: "green", angle: 60 },
    { label: "Next.js", tone: "purple", angle: 120 },
    { label: "Node.js", tone: "emerald", angle: 180 },
    { label: "MongoDB", tone: "blue", angle: 240 },
    { label: "Tailwind", tone: "pink", angle: 300 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="hidden lg:flex relative aspect-square w-full max-w-[520px] mx-auto items-center justify-center [perspective:1200px]"
      aria-hidden
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        {/* Orbit rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute inset-8 rounded-full border border-white/[0.06]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
          className="absolute inset-20 rounded-full border border-indigo-400/10"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          className="absolute inset-32 rounded-full border border-violet-400/10"
        />

        {/* Glow core */}
        <motion.div
          style={{ x: tx, y: ty }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="absolute -inset-24 rounded-full bg-indigo-500/25 blur-3xl" />
          <div className="absolute -inset-16 rounded-full bg-violet-500/20 blur-2xl" />
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, 6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-40 h-40 rounded-[2rem] bg-gradient-to-br from-indigo-500 via-violet-500 to-indigo-700 shadow-2xl shadow-indigo-500/40 border border-white/20 flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(255,255,255,0.35),_transparent_60%)]" />
            <span className="relative font-space font-bold text-6xl text-white tracking-tight drop-shadow-lg">
              AV
            </span>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-emerald-400/40 blur-2xl" />
          </motion.div>
        </motion.div>

        {/* Orbiting badges */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        >
          {badges.map((b, i) => {
            const t = TONE[b.tone] ?? TONE.indigo;
            const rad = (b.angle * Math.PI) / 180;
            const R = 42; // percent
            const x = 50 + Math.cos(rad) * R;
            const y = 50 + Math.sin(rad) * R;
            return (
              <motion.div
                key={b.label}
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{ left: `${x}%`, top: `${y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 3 + (i % 3),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                  className={`px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-xl bg-[#0e0e18]/80 shadow-xl ${t.text} text-xs font-semibold whitespace-nowrap flex items-center gap-1.5`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${t.dot}`} />
                  {b.label}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Floating accent shapes */}
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-6 right-10 w-10 h-10 rounded-xl border border-indigo-400/30 bg-indigo-500/10 backdrop-blur-md"
        />
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [0, -15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-6 w-6 h-6 rotate-45 border border-emerald-400/30 bg-emerald-500/10"
        />
      </motion.div>
    </motion.div>
  );
}

function _Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-4 items-start">
          <div className="md:col-span-1">
            <a href="#hero" className="font-space font-bold tracking-tight text-lg">
              Aryan Virani<span className="text-indigo-400">.</span>
            </a>
            <p className="text-sm text-zinc-500 mt-3 max-w-xs leading-relaxed">
              Building thoughtful, production-ready web experiences with Python & React.
            </p>
            <div className="mt-5">
              <SocialStrip />
            </div>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500 mb-4">
              Explore
            </p>
            <ul className="space-y-2.5">
              {NAV.slice(0, 3).map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm text-zinc-400 hover:text-indigo-300 transition-colors"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500 mb-4">
              More
            </p>
            <ul className="space-y-2.5">
              {NAV.slice(3).map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm text-zinc-400 hover:text-indigo-300 transition-colors"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500 mb-4">
              Contact
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="mailto:aryanvirani9853@gmail.com"
                  className="text-zinc-400 hover:text-indigo-300 transition-colors break-all"
                >
                  aryanvirani9853@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919081792393"
                  className="text-zinc-400 hover:text-indigo-300 transition-colors"
                >
                  (+91) 90817-92393
                </a>
              </li>
              <li className="text-zinc-500">Ahmedabad, India</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Aryan Virani. All rights reserved.</p>
          <p className="font-mono flex items-center gap-1.5">
            Made with <span className="text-rose-400 animate-pulse">❤</span> by Aryan Virani
          </p>
        </div>
      </div>
    </footer>
  );
}