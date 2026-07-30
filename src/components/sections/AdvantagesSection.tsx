import { Cog, ShieldCheck, Zap, Settings, Headphones, Globe, Palette, PenTool, Package, Clock9, MessageSquareMore, Wrench, Users, Handshake, MapPin } from "lucide-react";

interface AdvantageItem {
  icon: React.ElementType;
  title: string;
  description: string;
  features?: { icon: React.ElementType; label: string }[];
}

const ADVANTAGES: AdvantageItem[] = [
  {
    icon: Cog, title: "Precision Engineering",
    description: "Every ALFAGRAND pump undergoes rigorous computational fluid dynamics (CFD) simulation and real-world testing to ensure optimal hydraulic performance. Our engineers fine-tune impeller geometry, sealing, and motor alignment for maximum efficiency.",
  },
  {
    icon: ShieldCheck, title: "Reliable Quality",
    description: "We enforce strict quality control at every stage — from raw material inspection to final performance testing. Each pump meets international standards, ensuring reliable operation even under the most demanding conditions.",
  },
  {
    icon: Zap, title: "Energy Efficiency",
    description: "Our permanent magnet synchronous motor technology and intelligent VFD control deliver up to 40% energy savings. Designed for continuous duty with minimal power consumption, lowering your total cost of ownership.",
  },
  {
    icon: Settings, title: "OEM & ODM Flexibility",
    description: "From branding to specifications, we adapt to your market needs. Our flexible production lines handle custom orders efficiently, giving you a competitive edge with tailor-made pump solutions.",
    features: [
      { icon: PenTool, label: "Logo Customization" },
      { icon: Palette, label: "Color Options" },
      { icon: Package, label: "Packaging Design" },
    ],
  },
  {
    icon: Headphones, title: "Technical Support",
    description: "Our dedicated technical team provides pre-sales consultation, installation guidance, and responsive after-sales service to keep your operations running smoothly — wherever you are in the world.",
    features: [
      { icon: Clock9, label: "Fast Response" },
      { icon: MessageSquareMore, label: "Expert Support" },
      { icon: Wrench, label: "After-sales Service" },
    ],
  },
  {
    icon: Globe, title: "Global Market Experience",
    description: "With trusted partnerships in over 50 countries across Southeast Asia, the Middle East, South America, and Africa, we understand local market requirements and deliver solutions that match regional conditions.",
    features: [
      { icon: MapPin, label: "50+ Countries Served" },
      { icon: Handshake, label: "Reliable Partner Network" },
      { icon: Users, label: "Local Support Worldwide" },
    ],
  },
];

export default function AdvantagesSection() {
  return (
    <section id="advantages" className="relative py-24 overflow-hidden bg-bg-primary">
      <div className="absolute inset-0 tech-grid-bg-light" />
      {/* Ambient accent orb */}
      <div className="absolute top-1/3 right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.02]"
        style={{ background: "radial-gradient(circle, #00E5FF, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="tech-badge mb-4 inline-block">WHY CHOOSE ALFAGRAND</span>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
            <span className="text-white">ENGINEERED FOR PERFORMANCE. </span>
            <span className="gradient-text">COMMITTED TO YOUR SUCCESS.</span>
          </h2>
          <p className="text-text-secondary mt-6 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
            ALFAGRAND combines advanced engineering, strict quality control and dedicated service to deliver water pump solutions that create real value for our partners worldwide.
          </p>
        </div>

        {/* Advantages grid: 3 cols x 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ADVANTAGES.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="group relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 glow-border bg-bg-card">
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: "0 0 25px rgba(0,229,255,0.06)" }}
                />

                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative flex-shrink-0">
                    <div className="absolute -inset-2 rounded-full opacity-30 transition-opacity duration-300 group-hover:opacity-60"
                      style={{ background: "radial-gradient(circle, rgba(0,229,255,0.2), transparent 70%)" }}
                    />
                    <div className="absolute -inset-1 rounded-full border border-border-glow" />
                    <div className="relative w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)" }}
                    >
                      <Icon size={22} className="text-accent-cyan" />
                    </div>
                  </div>
                  <div className="pt-1.5">
                    <h3 className="text-white font-bold text-base leading-tight">{item.title}</h3>
                    <div className="mt-2 w-10 h-[2px] rounded-full bg-accent-cyan" />
                  </div>
                </div>

                <p className="text-text-secondary text-sm leading-relaxed mb-5">{item.description}</p>

                {item.features && item.features.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-border-default">
                    {item.features.map((feat) => {
                      const FeatIcon = feat.icon;
                      return (
                        <span key={feat.label} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium"
                          style={{ color: "#8892B0", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                        >
                          <FeatIcon size={13} className="text-accent-cyan" />
                          {feat.label}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
