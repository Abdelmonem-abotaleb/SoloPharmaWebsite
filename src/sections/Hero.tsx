import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Leaf, Sparkles, Star } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.section-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const images = [
    { src: '/images/59076.png', label: 'Skin Care', category: 'Skin Care', delay: '0ms' },
    { src: '/images/59070.jpg', label: 'Oral Care', category: 'Oral Care', delay: '100ms' },
    { src: '/images/59073.jpg', label: 'Face Care', category: 'Face Care', delay: '200ms' },
    { src: '/images/59068.jpg', label: 'Personal Care', category: 'Personal Care', delay: '300ms' },
  ];

  return (
    <section id="home" ref={sectionRef} className="relative overflow-hidden bg-[#f8fbff] py-20 lg:py-28">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-[#0077b6]/8 rounded-full blur-[100px]" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-[#00b4d8]/8 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/60 rounded-full blur-[120px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0077b6" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-7 section-reveal">
            <div className="inline-flex items-center gap-2.5 bg-white border border-sky-100 shadow-sm shadow-sky-100/50 text-[#0077b6] px-4 py-2 rounded-full text-sm font-semibold">
              <div className="flex -space-x-1">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-5 h-5 rounded-full bg-gradient-to-br from-[#0077b6] to-[#00b4d8] border-2 border-white" />
                ))}
              </div>
              <span>1M+ Satisfied Customers</span>
              <div className="flex items-center gap-0.5 text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-xs font-bold">4.9</span>
              </div>
            </div>

            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
              Your Health &{' '}
              <span className="shimmer-text">Beauty</span>
              <br />
              In Good Hands
            </h1>

            <p className="text-lg text-slate-500 max-w-md leading-relaxed">
              Premium pharmaceutical-grade cosmetics — scientifically formulated for
              effective skincare, oral care, and personal hygiene.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#0077b6] to-[#00b4d8] hover:opacity-90 text-white gap-2 h-13 px-7 rounded-2xl shadow-lg shadow-sky-400/30 font-semibold text-base transition-all hover:-translate-y-0.5"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <a href="/#about">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-slate-200 text-slate-700 hover:bg-white hover:border-[#0077b6] hover:text-[#0077b6] h-13 px-7 rounded-2xl font-semibold text-base transition-all"
                >
                  Learn More
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {[
                { icon: Shield, label: 'Pharma Grade', color: '#0077b6' },
                { icon: Leaf, label: 'Natural Ingredients', color: '#22c55e' },
                { icon: Sparkles, label: 'Derma Tested', color: '#a855f7' },
              ].map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-white border border-slate-100 shadow-sm px-4 py-2.5 rounded-xl text-slate-700 text-sm font-medium"
                >
                  <Icon className="w-4 h-4" style={{ color }} />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Product grid */}
          <div className="relative section-reveal" style={{ transitionDelay: '150ms' }}>
            <div className="absolute inset-0 bg-gradient-radial from-[#00b4d8]/20 to-transparent rounded-3xl blur-2xl" />
            <div className="grid grid-cols-2 gap-4 relative">
              {images.map((img) => (
                <Link
                  key={img.src}
                  to={`/category/${encodeURIComponent(img.category)}`}
                  className="group bg-white rounded-2xl shadow-md flex flex-col hover:shadow-2xl hover:shadow-sky-200/50 p-5 card-hover gradient-border h-full"
                  style={{ transitionDelay: img.delay }}
                >
                  <div className="h-44 flex items-center justify-center overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.label}
                      className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-700">{img.label}</span>
                    <span className="text-xs text-white bg-gradient-to-r from-[#0077b6] to-[#00b4d8] px-2.5 py-1 rounded-full font-medium">
                      View
                    </span>
                  </div>
                </Link>
              ))}
            </div>


          </div>
        </div>
      </div>
    </section>
  );
}
