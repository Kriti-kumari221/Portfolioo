import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Info, Github, ExternalLink, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useModal } from "@/hooks/use-modal";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  tech: string[];
  github: string;
  demo: string;
  image: string;
  infoText: string;
  color: "primary" | "secondary";
}

const projects: Project[] = [
  {
    title: "RazorShield AI Risk Manager",
    subtitle: "Agentic Payment Fraud Intelligence",
    description: "An AI-powered payment risk system that detects fraud, investigates suspicious behavior, and recommends the right action: Allow, Verify, Review, or Block.",
    features: ["XGBoost Fraud Model (0.91 PR-AUC)", "Graph & Anomaly Risk Analysis", "Cost-Aware AI Risk Agent with Audit Trail"],
    tech: ["Python", "XGBoost", "FastAPI", "React", "Isolation Forest", "SQLite", "Docker"],
    github: "https://github.com/Kriti-kumari221/AI_Risk",
    demo: "https://ai-risk-4.onrender.com/ui/",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
    infoText: "Trained on ~590K IEEE-CIS transactions with chronological splits",
    color: "primary" as const,
  },
  {
    title: "Smart Placement Tracker",
    subtitle: "Full Stack Application",
    description: "A comprehensive platform to track and manage student placements, analyze hiring trends, and streamline the recruitment process.",
    features: ["Placement Analytics", "Student Dashboard", "Recruiter Portal"],
    tech: ["Node.js", "Express", "MongoDB", "React"],
    github: "https://github.com/Kriti-kumari221/Smart-Placement-Tracker",
    demo: "https://smart-placement-tracker-silk.vercel.app/",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80",
    infoText: "Complete Placement Ecosystem",
    color: "primary" as const,
  },
  {
    title: "AI NutriCare",
    subtitle: "Contribution: Full Stack AI",
    description: "An AI-based nutrition recommendation system generating personalized diet plans.",
    features: ["AI diet recommendations", "Health suggestions", "Interactive web interface"],
    tech: ["Python", "Machine Learning", "React", "FastAPI"],
    github: "https://github.com/PriceOptima-SpringBoard/AI-NutriCare/tree/Kriti-AI-NutriCare",
    demo: "https://ai-nutricare-frontend.vercel.app",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80",
    infoText: "Machine learning integration pipeline active",
    color: "primary" as const,
  },
  {
    title: "Sentiment Analysis",
    subtitle: "NLP & Deep Learning",
    description: "An intelligent platform that performs real-time sentiment extraction from textual data using advanced NLP techniques.",
    features: ["Natural Language Processing", "Real-time Text Analysis", "Neural Network Model"],
    tech: ["Python", "NLP", "TensorFlow", "React", "Scikit-Learn"],
    github: "https://github.com/Kriti-kumari221/NLP/tree/main/Sentiment_Analysis",
    demo: "https://nlp-one-gilt.vercel.app/",
    image: "https://images.unsplash.com/photo-1599658880436-c61792e70672?auto=format&fit=crop&q=80",
    infoText: "Deep learning model for behavioral analytics",
    color: "secondary" as const,
  }
];

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(".projects-header",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );

      const cards = gsap.utils.toArray<HTMLElement>(".project-card-wrapper");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: i * 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const closeExpanded = useCallback(() => setExpandedIndex(null), []);
  useModal(expandedIndex !== null, closeExpanded);

  return (
    <section id="projects" className="section-padding relative bg-background py-20 md:py-32 overflow-hidden" ref={containerRef}>
      {/* Ambient background glows */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full blur-[180px] pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, hsl(var(--neon-blue)/0.2) 0%, transparent 70%)" }} />
      <div className="absolute bottom-20 left-0 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-15"
        style={{ background: "radial-gradient(circle, hsl(var(--neon-purple)/0.2) 0%, transparent 70%)" }} />
      <div className="max-w-[1400px] mx-auto px-4 md:px-12 relative z-10">

        {/* Premium Header */}
        <div className="projects-header mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="relative">
            {/* Glowing orb behind title */}
            <div className="absolute -left-10 -top-10 w-40 h-40 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>

            <p className="text-foreground/50 font-mono text-sm tracking-[0.2em] uppercase mb-4 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-foreground/30"></span> Featured Work
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight">
              Selected <span className="text-foreground/60 italic">Projects</span>
            </h2>
            {/* Gradient underline */}
            <div className="mt-4 w-20 h-[2px] rounded-full" style={{ background: "linear-gradient(90deg, hsl(var(--primary)), transparent)" }} />
          </div>
          <p className="text-foreground/60 text-lg md:text-xl max-w-lg tracking-wide leading-relaxed font-light border-l border-foreground/10 pl-6">
            A showcase of comprehensive software architectures, machine learning models, and fully-deployed applications built to solve complex problems.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, i) => (
            <div key={project.title} className="project-card-wrapper">
              <ProjectCard
                project={project}
                onToggle={() => setExpandedIndex(i)}
              />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {expandedIndex !== null && (
          <ExpandedProjectView
            project={projects[expandedIndex]}
            onClose={closeExpanded}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

const ProjectCard = ({
  project,
  onToggle,
}: {
  project: Project;
  onToggle: () => void;
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <motion.div
      className="bg-foreground/[0.02] card-shimmer backdrop-blur-md rounded-[2.5rem] overflow-hidden cursor-pointer group flex flex-col h-full border border-foreground/10 shadow-2xl shadow-transparent hover:shadow-primary/5 hover:border-foreground/20 relative transition-[box-shadow,border-color] duration-500"
      onClick={onToggle}
      role="button"
      tabIndex={0}
      aria-label={`Open details for ${project.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      whileHover={{ y: -10, transition: { duration: 0.4, ease: "easeOut" } }}
    >
      {/* Decorative Glow on hover */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/10 rounded-full blur-[120px] scale-0 group-hover:scale-100 transition-transform duration-700 pointer-events-none opacity-0 group-hover:opacity-100"></div>

      {/* Top Image area */}
      <div className="w-full h-72 md:h-80 shrink-0 bg-gradient-to-br from-foreground/10 to-foreground/[0.03] relative overflow-hidden">
        {!imgFailed && (
          <img
            src={project.image}
            alt={project.title}
            onError={() => setImgFailed(true)}
            className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700 [transition-timing-function:cubic-bezier(0.25,1,0.5,1)] z-10"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent z-20" />

        {/* Floating tech tags on the image */}
        <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-20 pointer-events-none">
          {project.tech.slice(0, 2).map((t) => (
            <span key={t} className="px-3 py-1 text-xs font-mono tracking-widest uppercase bg-background/60 backdrop-blur-md rounded-full border border-foreground/10 text-foreground/80">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Content area */}
      <div className="px-8 pb-10 pt-8 flex-1 flex flex-col relative z-20">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
            {project.title}
          </h3>
          <div className="w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center flex-shrink-0 group-hover:bg-foreground group-hover:text-background transition-colors duration-300">
            <ExternalLink size={18} />
          </div>
        </div>

        <p className="font-mono text-sm tracking-widest uppercase text-foreground/50 mb-6 flex items-center gap-2">
          <Sparkles size={14} className="text-primary shrink-0" /> {project.subtitle}
        </p>

        <p className="text-foreground/70 text-lg leading-relaxed mb-8 flex-1">
          {project.description}
        </p>

        <div className="flex items-center gap-3 pt-6 border-t border-foreground/10 mt-auto">
          <Info className="w-5 h-5 flex-shrink-0 text-primary" />
          <p className="text-sm text-foreground/60">{project.infoText}</p>
        </div>
      </div>
    </motion.div>
  );
};

const ExpandedProjectView = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl overflow-y-auto overflow-x-hidden p-4 md:p-8"
    >
      <button
        onClick={onClose}
        aria-label="Close project details"
        className="fixed top-6 right-6 md:top-8 md:right-8 z-[999] group flex items-center gap-3 px-5 py-2.5 md:px-6 md:py-3 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-2xl border border-white/20 text-white transition-colors duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
      >
        <span className="uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold font-mono">Close</span>
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
          <span className="text-base leading-none transition-transform duration-500 group-hover:rotate-90">×</span>
        </span>
      </button>

      {/* Wrapper keeps the panel vertically centred when short, but lets it
          scroll from the very top when tall (items-center on the scroll
          container would clip the top of the panel). */}
      <div className="min-h-full flex">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98, transition: { duration: 0.25 } }}
          transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-6xl m-auto bg-background border border-foreground/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col shadow-2xl shadow-black/50"
        >
          {/* Hero */}
          <div className="relative w-full h-[34vh] min-h-[240px] md:h-[40vh] bg-gradient-to-br from-foreground/10 to-foreground/[0.03] overflow-hidden">
            {!imgFailed && (
              <img
                src={project.image}
                alt={project.title}
                onError={() => setImgFailed(true)}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />

            <div className="absolute inset-x-0 bottom-0 px-6 md:px-12 pb-6 md:pb-8">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground leading-[1.05]">
                {project.title}
              </h2>
              <p className="mt-3 font-mono text-xs md:text-sm tracking-widest uppercase text-foreground/60 flex items-center gap-2">
                <Sparkles size={14} className="text-primary shrink-0" /> {project.subtitle}
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-0 px-6 md:px-12 py-8 md:py-12">
            {/* Left column */}
            <div className="md:pr-12">
              <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-foreground/40 mb-5">Overview</h4>
              <p className="text-xl md:text-2xl font-light text-foreground/80 leading-relaxed mb-10">
                {project.description}
              </p>

              <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-foreground/40 mb-5">Key Capabilities</h4>
              <ul className="space-y-4">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-4 text-foreground/80 border-b border-foreground/5 pb-4">
                    <Sparkles size={16} className="text-primary/70 shrink-0" /> {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right column */}
            <div className="md:border-l border-foreground/10 md:pl-12 flex flex-col">
              <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-foreground/40 mb-5">Technologies Used</h4>
              <div className="flex flex-wrap gap-3 mb-10">
                {project.tech.map((t) => (
                  <span key={t} className="px-4 py-2 rounded-full border border-foreground/10 bg-foreground/[0.02] text-foreground/80 font-mono text-xs md:text-sm tracking-widest uppercase">
                    {t}
                  </span>
                ))}
              </div>

              <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-foreground/40 mb-5">Project Note</h4>
              <p className="text-foreground/70 flex items-center gap-3 mb-10">
                <Info size={18} className="text-primary shrink-0" /> {project.infoText}
              </p>

              {/* Actions */}
              <div className="flex flex-col gap-3 mt-auto">
                {project.demo && project.demo !== "#" && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="bg-foreground text-background px-6 py-4 rounded-2xl font-medium text-center hover:opacity-90 transition-opacity flex items-center justify-center gap-3 tracking-wide whitespace-nowrap">
                    Launch Live App <ExternalLink size={16} />
                  </a>
                )}
                {project.github && project.github !== "#" && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="bg-background hover:bg-foreground/[0.05] border border-foreground/15 text-foreground px-6 py-4 rounded-2xl font-medium text-center transition-colors flex items-center justify-center gap-3 tracking-wide whitespace-nowrap">
                    <Github size={20} /> View Source
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectsSection;