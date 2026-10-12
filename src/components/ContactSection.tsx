import { useEffect, useRef, useState } from "react";
import { ArrowRight, Mail, Github, Linkedin, Send, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_EMAIL = "kriticse005@gmail.com";
// Optional: create a free form at https://formspree.io and put its ID in a .env file
// as VITE_FORMSPREE_ID=xxxxxxxx — messages are then delivered straight to your inbox.
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined;

type Status = "idle" | "sending" | "sent" | "error";

const ContactSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    // No backend configured: open the visitor's mail app with the message pre-filled.
    if (!FORMSPREE_ID) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${formState.name}`);
      const body = encodeURIComponent(`${formState.message}\n\n— ${formState.name} (${formState.email})`);
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formState),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("sent");
      setFormState({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 4000);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-anim-premium",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      // Using a deep, warm dark brown/black like Jesko Jets - theme aware
      className="bg-[hsl(var(--dark-section))] text-white py-24 md:py-40 relative overflow-hidden"
      ref={containerRef}
    >

      {/* Jesko Jet Style Decorative Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-white/[0.02] tracking-tighter uppercase pointer-events-none select-none">
        KRITI
      </div>

      {/* Background Decorative Halos */}
      <div className={`absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-[hsl(var(--accent-glow))]/5 rounded-full blur-[120px] pointer-events-none`}></div>
      <div className="absolute top-[10%] -left-[10%] w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1300px] mx-auto px-4 md:px-12 relative z-10">

        <div className="contact-anim-premium mb-16 md:mb-24 text-center lg:text-left">
          <p className="text-white/40 font-mono text-sm tracking-[0.3em] uppercase mb-6 flex items-center justify-center lg:justify-start gap-4">
            <span className="w-12 h-[1px] bg-white/20"></span>
            <Sparkles size={16} className="text-[hsl(var(--accent-glow))]/60" />
            Get In Touch
          </p>
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-none">
            Let&apos;s <span className="italic font-light text-white/50">Talk.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Contact Details side */}
          <div className="space-y-12">
            <p className="contact-anim-premium text-xl md:text-2xl font-light text-white/70 leading-relaxed max-w-lg italic">
              "Building intelligence is a marathon, not a sprint. Let's build something enduring together."
            </p>

            <div className="space-y-4">
              {[
                { label: "Direct Mail", value: CONTACT_EMAIL, icon: Mail, href: `mailto:${CONTACT_EMAIL}` },
                { label: "LinkedIn", value: "kritikumari01", icon: Linkedin, href: "https://www.linkedin.com/in/kritikumari01/" },
                { label: "GitHub", value: "Kriti-kumari221", icon: Github, href: "https://github.com/Kriti-kumari221" }
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target={link.label !== "Direct Mail" ? "_blank" : undefined}
                  rel={link.label !== "Direct Mail" ? "noopener noreferrer" : undefined}
                  className="contact-anim-premium group flex items-center justify-between p-8 rounded-[2rem] border border-white/5 bg-white/[0.03] backdrop-blur-xl hover:bg-white/[0.07] transition-all duration-500 hover:border-white/20"
                >
                  <div className="flex items-center gap-8">
                    <div className="p-4 rounded-2xl bg-card/10 border border-white/5 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 shadow-xl">
                      <link.icon size={24} className="text-white/60 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/30 mb-2 font-bold">{link.label}</p>
                      <span className="text-base sm:text-lg md:text-xl font-medium tracking-tight break-all sm:break-normal">{link.value}</span>
                    </div>
                  </div>
                  <ArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-white/40" />
                </a>
              ))}
            </div>
          </div>

          {/* Form side */}
          <div className="contact-anim-premium">
            <div className="relative">
              {/* Massive subtle card */}
              <form onSubmit={handleSubmit} className="space-y-8 bg-white/[0.02] backdrop-blur-2xl p-6 sm:p-10 md:p-14 rounded-[2.5rem] md:rounded-[4rem] border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label htmlFor="contact-name" className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50 pl-1 font-black">Your Name</label>
                    <input
                      type="text"
                      autoComplete="name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-white/[0.05] border border-white/5 rounded-3xl px-6 md:px-8 py-5 md:py-6 text-base md:text-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all shadow-inner"
                      id="contact-name"
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="contact-email" className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50 pl-1 font-black">Email Address</label>
                    <input
                      type="email"
                      autoComplete="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-white/[0.05] border border-white/5 rounded-3xl px-6 md:px-8 py-5 md:py-6 text-base md:text-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all shadow-inner"
                      id="contact-email"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="space-y-3">
                    <label htmlFor="contact-message" className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/50 pl-1 font-black">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-white/[0.05] border border-white/5 rounded-3xl px-6 md:px-8 py-5 md:py-6 text-base md:text-lg text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all resize-none shadow-inner"
                      id="contact-message"
                      placeholder="What are we building?"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "sending" || status === "sent"}
                  className="w-full group bg-white text-black py-6 rounded-3xl font-black tracking-[0.2em] uppercase text-sm hover:scale-[0.98] active:scale-[0.95] transition-all duration-500 flex justify-center items-center gap-4 shadow-2xl shadow-white/5 disabled:bg-white/20 disabled:text-white/40"
                >
                  {status === "sending" ? "Sending…" : status === "sent" ? "Message Sent — Thank You!" : status === "error" ? "Failed — Try Again" : (
                    <>
                      Send Message <Send size={20} className="transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-white/40" role="status" aria-live="polite">
                  {status === "error"
                    ? `Something went wrong. You can also email me directly at ${CONTACT_EMAIL}.`
                    : FORMSPREE_ID ? "I usually reply within a day or two." : "This opens your email app with the message ready to send."}
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
