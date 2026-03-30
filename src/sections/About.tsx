import { Check, Award, FlaskConical, Users, ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.section-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const features = [
    'Pharmaceutical-grade quality standards',
    'Scientifically formulated products',
    'Dermatologically tested',
    'Natural and safe ingredients',
    'Cruelty-free manufacturing',
    'ISO certified facilities',
  ];

  const stats = [
    { icon: Award, value: '20+', label: 'Years Experience', color: '#f59e0b' },
    { icon: FlaskConical, value: '15+', label: 'Products', color: '#0077b6' },
    { icon: Users, value: '1M+', label: 'Happy Customers', color: '#10b981' },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 lg:py-28 bg-[#f8fbff] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-sky-100/50 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-blue-100/30 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — logo showcase */}
          <div className="relative section-reveal order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0077b6] to-[#00b4d8] p-12 shadow-2xl shadow-sky-300/30">
              {/* Pattern overlay */}
              <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="white" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dots)" />
              </svg>

              <div className="relative text-center">
                <img
                  src="/images/59067.png"
                  alt="SoloPharma Logo"
                  className="w-48 h-auto object-contain mx-auto drop-shadow-2xl animate-float"
                />
                <p className="text-white/80 text-sm font-medium mt-6 uppercase tracking-widest">
                  Trusted Since 2007
                </p>
              </div>
            </div>

            {/* Stats card */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] bg-white rounded-2xl shadow-xl border border-slate-100 p-5 grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center"
                    style={{ background: `${stat.color}18` }}
                  >
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500 font-medium leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — content */}
          <div className="space-y-7 section-reveal order-1 lg:order-2 lg:mt-0 mt-8" style={{ transitionDelay: '150ms' }}>
            <span className="inline-block text-[#0077b6] font-semibold text-xs uppercase tracking-[3px]">
              About SoloPharma
            </span>

            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight">
              Committed to Your{' '}
              <span className="shimmer-text">Health & Well-being</span>
            </h2>

            <p className="text-slate-500 leading-relaxed">
              SoloPharma is a leading pharmaceutical company developing high-quality cosmetic
              and personal care products. With over 20 years of experience, we combine
              scientific innovation with natural ingredients for products that are both
              effective and safe.
            </p>

            <p className="text-slate-500 leading-relaxed">
              Our ISO-certified manufacturing facilities follow strict quality control
              measures. Every product undergoes rigorous testing to meet the highest
              pharmaceutical standards.
            </p>

            {/* Feature grid */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-slate-100 shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-600" strokeWidth={3} />
                  </div>
                  <span className="text-slate-700 text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-[#0077b6] font-semibold hover:gap-3 transition-all"
            >
              Get in Touch <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
