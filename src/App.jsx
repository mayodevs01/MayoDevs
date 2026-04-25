import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Bot,
  Boxes,
  BrainCircuit,
  Code2,
  Cpu,
  Layers3,
  Mail,
  MonitorCog,
  ShieldCheck,
  Terminal,
  WandSparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Code2,
    title: "Animated Sites",
    text: "3D landing pages, scroll effects, and clean responsive UI.",
  },
  {
    icon: Bot,
    title: "AI Automation",
    text: "Chatbots, agents, workflows, and smart business tools.",
  },
  {
    icon: MonitorCog,
    title: "Dashboards",
    text: "Admin panels, analytics, CRM tools, and product dashboards.",
  },
  {
    icon: Boxes,
    title: "Plugins + Products",
    text: "Plugins, SaaS prototypes, UI kits, and AI product builds.",
  },
];

const projects = [
  "AI chatbots",
  "Automation systems",
  "3D websites",
  "Dashboards",
  "Plugins",
  "UI designs",
];

const particles = [
  { x: "10%", y: "23%", delay: "0s" },
  { x: "20%", y: "14%", delay: "0.6s" },
  { x: "78%", y: "18%", delay: "1.1s" },
  { x: "88%", y: "28%", delay: "1.7s" },
  { x: "24%", y: "72%", delay: "0.4s" },
  { x: "74%", y: "74%", delay: "1.3s" },
];

function HeroScene() {
  const [rotation, setRotation] = useState({ x: -12, y: 18 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragOrigin = useRef({ x: -12, y: 18 });

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const handlePointerDown = (event) => {
    setIsDragging(true);
    dragStart.current = { x: event.clientX, y: event.clientY };
    dragOrigin.current = { ...rotation };
  };

  const handlePointerMove = (event) => {
    if (!isDragging) return;

    const dx = event.clientX - dragStart.current.x;
    const dy = event.clientY - dragStart.current.y;

    setRotation({
      x: clamp(dragOrigin.current.x - dy * 0.08, -28, 18),
      y: clamp(dragOrigin.current.y + dx * 0.09, -32, 32),
    });
  };

  const stopDragging = () => setIsDragging(false);

  return (
    <div
      className={`scene-shell ${isDragging ? "is-dragging" : ""}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerLeave={stopDragging}
    >
      <div
        className="scene-stage"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        <div className="scene-ring scene-ring-outer" />
        <div className="scene-ring scene-ring-inner" />

        {particles.map((particle) => (
          <span
            key={`${particle.x}-${particle.y}`}
            className="scene-particle"
            style={{ left: particle.x, top: particle.y, animationDelay: particle.delay }}
          />
        ))}

        <div className="scene-monitor scene-monitor-left">
          <span className="code-line line-cyan short" />
          <span className="code-line line-white medium" />
          <span className="code-line line-cyan medium" />
        </div>

        <div className="scene-monitor scene-monitor-center">
          <span className="code-line line-cyan long" />
          <span className="code-line line-white medium" />
          <span className="code-line line-cyan medium" />
          <span className="code-line line-white short" />
        </div>

        <div className="scene-monitor scene-monitor-right">
          <span className="code-line line-cyan medium" />
          <span className="code-line line-white short" />
          <span className="code-line line-cyan short" />
        </div>

        <div className="scene-avatar">
          <div className="scene-headset" />
          <div className="scene-head" />
          <div className="scene-neck" />
          <div className="scene-body" />
          <div className="scene-core-glow" />
          <div className="scene-arm scene-arm-left" />
          <div className="scene-arm scene-arm-right" />
        </div>

        <div className="scene-desk" />
        <div className="scene-keyboard" />
        <div className="scene-platform" />
      </div>
    </div>
  );
}

function App() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-reveal]", {
        opacity: 0,
        y: 46,
        duration: 0.95,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".main-flow",
          start: "top 78%",
        },
      });

      gsap.utils.toArray(".motion-card").forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 36,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 86%",
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-void text-ice">
      <div className="noise" />
      <Header />
      <section className="hero-grid relative min-h-screen px-5 pt-28 sm:px-8 lg:px-12">
        <div className="hero-copy relative z-10 flex max-w-3xl flex-col justify-center pb-10">
          <div className="eyebrow mb-6 w-fit">
            <Terminal size={16} />
            MayoDevs // AI web systems
          </div>
          <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[0.96] tracking-normal text-white sm:text-7xl lg:text-8xl">
            MayoDevs builds animated AI products.
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-chrome/78 sm:text-lg">
            Futuristic websites, dashboards, automations, plugins, and chatbots with a clean hacker-style look.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a className="primary-btn" href="mailto:MayoDevs01@gmail.com">
              <Mail size={18} />
              Contact me
            </a>
            <a className="ghost-btn" href="#work">
              See work
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
        <div className="scene-wrap">
          <HeroScene />
          <div className="scene-overlay-chip">
            <div className="scene-chip">drag to rotate setup</div>
          </div>
        </div>
      </section>

      <section className="main-flow px-5 py-24 sm:px-8 lg:px-12" id="services">
        <div className="mx-auto max-w-7xl">
          <div data-reveal className="section-kicker">
            <BrainCircuit size={18} />
            What MayoDevs builds
          </div>
          <div data-reveal className="mt-5 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <h2 className="font-display text-4xl font-semibold leading-tight text-white sm:text-6xl">
              Websites, AI tools, and product UI.
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-chrome/72">
              Simple, sharp, animated, and built for modern brands.
            </p>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <article className="motion-card service-card" key={service.title}>
                <service.icon className="text-cyanCore" size={25} />
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-12" id="work">
        <div className="mx-auto max-w-7xl">
          <div className="section-kicker">
            <Cpu size={18} />
            Product lab
          </div>
          <div className="mt-5 flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <h2 className="max-w-3xl font-display text-4xl font-semibold leading-tight text-white sm:text-6xl">
              Things I can build.
            </h2>
            <a className="ghost-btn w-fit" href="mailto:MayoDevs01@gmail.com">
              Contact
              <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <article className="motion-card project-card" key={project}>
                <span>0{index + 1}</span>
                <h3>{project}</h3>
                <div className="project-tags">
                  <small>React</small>
                  <small>AI</small>
                  <small>Motion</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-12" id="contact">
        <div className="contact-panel mx-auto max-w-7xl">
          <div>
            <div className="section-kicker">
              <ShieldCheck size={18} />
              Contact
            </div>
            <h2 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-tight text-white sm:text-6xl">
              Pricing is negotiable.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-chrome/72">
              Tell me what you want to build and I will reply with a custom quote.
            </p>
          </div>
          <div className="contact-actions">
            <a className="primary-btn" href="mailto:MayoDevs01@gmail.com">
              <Mail size={18} />
              MayoDevs01@gmail.com
            </a>
            <div className="terminal-card">
              <div>
                <span />
                <span />
                <span />
              </div>
              <p>$ contact MayoDevs</p>
              <p className="text-cyanCore">quote: negotiable</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-void/72 px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-12">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-5">
        <a className="flex items-center gap-3 font-display text-lg font-semibold text-white" href="#">
          <span className="brand-mark">
            <Layers3 size={18} />
          </span>
          MayoDevs
        </a>
        <div className="hidden items-center gap-7 text-sm text-chrome/72 md:flex">
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="nav-mail" href="mailto:MayoDevs01@gmail.com" aria-label="Email MayoDevs">
          <WandSparkles size={17} />
          Hire
        </a>
      </nav>
    </header>
  );
}

export default App;
