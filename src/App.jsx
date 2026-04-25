import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Html,
  OrbitControls,
  PerspectiveCamera,
  Stars,
  Text,
} from "@react-three/drei";
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
import { Component, Suspense, useEffect, useMemo, useRef } from "react";

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

class SceneBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.error("3D scene failed:", error);
  }

  render() {
    if (this.state.failed) {
      return <StaticScene />;
    }

    return this.props.children;
  }
}

function Rig() {
  const group = useRef();
  const leftHand = useRef();
  const rightHand = useRef();
  const head = useRef();
  const cursor = useRef();

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    if (!group.current || !leftHand.current || !rightHand.current || !head.current || !cursor.current) return;

    group.current.rotation.y = pointer.x * 0.16;
    group.current.rotation.x = -pointer.y * 0.04;
    leftHand.current.position.y = 0.6 + Math.sin(t * 11) * 0.035;
    rightHand.current.position.y = 0.6 + Math.cos(t * 13) * 0.035;
    head.current.rotation.y = Math.sin(t * 0.8) * 0.08;
    cursor.current.position.x = 0.34 + Math.sin(t * 4) * 0.28;
    cursor.current.material.opacity = Math.sin(t * 10) > 0 ? 1 : 0.15;
  });

  return (
    <group ref={group} position={[0, -0.8, 0]}>
      <Desk />
      <Coder leftHand={leftHand} rightHand={rightHand} head={head} />
      <Monitor cursor={cursor} position={[0, 1.03, -0.74]} />
      <Monitor position={[-1.15, 0.9, -0.88]} rotation={[0, 0.28, 0]} small />
      <Monitor position={[1.15, 0.9, -0.88]} rotation={[0, -0.28, 0]} small />
      <Keyboard />
      <CodeParticles />
    </group>
  );
}

function Desk() {
  return (
    <group>
      <mesh position={[0, 0.24, 0]}>
        <boxGeometry args={[3.4, 0.16, 1.55]} />
        <meshStandardMaterial color="#111722" metalness={0.75} roughness={0.28} />
      </mesh>
      <mesh position={[-1.48, -0.35, 0.48]}>
        <boxGeometry args={[0.12, 1.1, 0.12]} />
        <meshStandardMaterial color="#0a0d12" metalness={0.9} roughness={0.22} />
      </mesh>
      <mesh position={[1.48, -0.35, 0.48]}>
        <boxGeometry args={[0.12, 1.1, 0.12]} />
        <meshStandardMaterial color="#0a0d12" metalness={0.9} roughness={0.22} />
      </mesh>
      <mesh position={[-1.48, -0.35, -0.48]}>
        <boxGeometry args={[0.12, 1.1, 0.12]} />
        <meshStandardMaterial color="#0a0d12" metalness={0.9} roughness={0.22} />
      </mesh>
      <mesh position={[1.48, -0.35, -0.48]}>
        <boxGeometry args={[0.12, 1.1, 0.12]} />
        <meshStandardMaterial color="#0a0d12" metalness={0.9} roughness={0.22} />
      </mesh>
    </group>
  );
}

function Coder({ leftHand, rightHand, head }) {
  return (
    <group position={[0, 0.14, 0.28]}>
      <mesh position={[0, 0.45, 0.16]} rotation={[0.08, 0, 0]}>
        <capsuleGeometry args={[0.33, 0.58, 10, 20]} />
        <meshStandardMaterial color="#151a23" metalness={0.35} roughness={0.42} />
      </mesh>
      <mesh ref={head} position={[0, 1.04, 0.08]}>
        <sphereGeometry args={[0.24, 36, 24]} />
        <meshStandardMaterial color="#d8e2ea" metalness={0.55} roughness={0.28} />
      </mesh>
      <mesh position={[0, 1.09, -0.05]}>
        <torusGeometry args={[0.28, 0.025, 8, 38]} />
        <meshStandardMaterial color="#07090d" metalness={0.8} roughness={0.18} />
      </mesh>
      <mesh position={[-0.14, 1.06, 0.29]}>
        <boxGeometry args={[0.08, 0.035, 0.025]} />
        <meshStandardMaterial color="#47f3ff" emissive="#47f3ff" emissiveIntensity={1.4} />
      </mesh>
      <mesh position={[0.14, 1.06, 0.29]}>
        <boxGeometry args={[0.08, 0.035, 0.025]} />
        <meshStandardMaterial color="#47f3ff" emissive="#47f3ff" emissiveIntensity={1.4} />
      </mesh>
      <mesh ref={leftHand} position={[-0.38, 0.62, 0.58]} rotation={[0.9, -0.25, 0.2]}>
        <capsuleGeometry args={[0.07, 0.43, 8, 16]} />
        <meshStandardMaterial color="#cfd9e1" metalness={0.35} roughness={0.32} />
      </mesh>
      <mesh ref={rightHand} position={[0.38, 0.62, 0.58]} rotation={[0.9, 0.25, -0.2]}>
        <capsuleGeometry args={[0.07, 0.43, 8, 16]} />
        <meshStandardMaterial color="#cfd9e1" metalness={0.35} roughness={0.32} />
      </mesh>
    </group>
  );
}

function Monitor({ position, rotation = [0, 0, 0], small = false, cursor }) {
  const w = small ? 0.82 : 1.25;
  const h = small ? 0.48 : 0.72;
  const codeLines = small ? ["api.flow()", "bot.reply()", "ship()"] : ["const build = MayoDevs.ai", "agent.run(automation)", "dashboard.sync()", "deploy({ glow: true })"];

  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[w, h, 0.06]} />
        <meshStandardMaterial color="#05070b" metalness={0.85} roughness={0.16} />
      </mesh>
      <mesh position={[0, 0, 0.035]}>
        <planeGeometry args={[w * 0.88, h * 0.74]} />
        <meshStandardMaterial color="#07121a" emissive="#082f38" emissiveIntensity={0.95} />
      </mesh>
      {codeLines.map((line, index) => (
        <Text
          key={line}
          position={[-w * 0.35, h * 0.22 - index * 0.12, 0.07]}
          fontSize={small ? 0.035 : 0.05}
          color={index % 2 ? "#d7e0e8" : "#47f3ff"}
          anchorX="left"
          anchorY="middle"
          maxWidth={w * 0.72}
        >
          {line}
        </Text>
      ))}
      {!small && (
        <mesh ref={cursor} position={[0.22, -0.14, 0.075]}>
          <boxGeometry args={[0.045, 0.14, 0.01]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#47f3ff"
            emissiveIntensity={1.6}
            transparent
          />
        </mesh>
      )}
      <mesh position={[0, -h * 0.68, 0]}>
        <boxGeometry args={[0.13, 0.34, 0.06]} />
        <meshStandardMaterial color="#0b0f16" metalness={0.85} roughness={0.2} />
      </mesh>
    </group>
  );
}

function Keyboard() {
  const keys = useMemo(() => {
    const list = [];
    for (let row = 0; row < 4; row += 1) {
      for (let col = 0; col < 13; col += 1) {
        list.push([col * 0.105 - 0.63 + row * 0.02, 0.37, 0.68 + row * 0.075]);
      }
    }
    return list;
  }, []);

  return (
    <group>
      <mesh position={[0, 0.33, 0.78]} rotation={[-0.06, 0, 0]}>
        <boxGeometry args={[1.55, 0.06, 0.46]} />
        <meshStandardMaterial color="#07090d" metalness={0.75} roughness={0.2} />
      </mesh>
      {keys.map((position, index) => (
        <mesh key={index} position={position}>
          <boxGeometry args={[0.07, 0.025, 0.045]} />
          <meshStandardMaterial
            color={index % 7 === 0 ? "#47f3ff" : "#171d26"}
            emissive={index % 7 === 0 ? "#47f3ff" : "#000000"}
            emissiveIntensity={index % 7 === 0 ? 0.65 : 0}
            metalness={0.45}
            roughness={0.32}
          />
        </mesh>
      ))}
    </group>
  );
}

function CodeParticles() {
  const symbols = ["</>", "AI", "01", "API", "UX", "BOT", "{}"];
  return (
    <Float speed={2.2} rotationIntensity={0.25} floatIntensity={0.45}>
      <group position={[0, 1.35, 0.05]}>
        {symbols.map((symbol, index) => {
          const angle = (index / symbols.length) * Math.PI * 2;
          return (
            <Text
              key={symbol}
              position={[Math.cos(angle) * 1.35, Math.sin(index) * 0.2, Math.sin(angle) * 0.5]}
              fontSize={0.12}
              color={index % 2 ? "#d7e0e8" : "#47f3ff"}
              anchorX="center"
              anchorY="middle"
            >
              {symbol}
            </Text>
          );
        })}
      </group>
    </Float>
  );
}

function HeroScene() {
  return (
    <SceneBoundary>
      <Suspense fallback={<StaticScene />}>
        <Canvas dpr={[1, 1.7]} gl={{ antialias: true, alpha: true }}>
          <PerspectiveCamera makeDefault position={[0, 1.4, 4.35]} fov={43} />
          <ambientLight intensity={0.9} />
          <pointLight position={[2.5, 3, 2]} color="#47f3ff" intensity={35} />
          <pointLight position={[-3, 2.4, -1]} color="#ffffff" intensity={16} />
          <Stars radius={40} depth={24} count={750} factor={2.2} saturation={0} fade speed={0.4} />
          <Rig />
          <ContactShadows position={[0, -1.24, 0]} opacity={0.42} scale={6} blur={2.8} far={3} />
          <Environment preset="city" />
          <OrbitControls
            enablePan={false}
            minDistance={3.2}
            maxDistance={6}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.05}
          />
          <Html position={[0, 1.95, -1.2]} center>
            <div className="scene-chip">drag to inspect setup</div>
          </Html>
        </Canvas>
      </Suspense>
    </SceneBoundary>
  );
}

function StaticScene() {
  return (
    <div className="static-scene" aria-label="MayoDevs coding setup preview">
      <div className="static-screen screen-left">
        <span>automation.flow()</span>
        <span>chatbot.reply()</span>
        <span>dashboard.sync()</span>
      </div>
      <div className="static-screen screen-main">
        <span>const studio = "MayoDevs";</span>
        <span>build.aiProducts();</span>
        <span>deploy.animatedSite();</span>
        <i />
      </div>
      <div className="static-screen screen-right">
        <span>plugins.map()</span>
        <span>ui.polish()</span>
        <span>ship()</span>
      </div>
      <div className="static-coder">
        <b />
        <em />
        <strong />
      </div>
      <div className="static-desk" />
      <div className="static-keyboard" />
      <div className="scene-chip">3D scene loading</div>
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
