
import { Link } from 'react-router-dom';
import { ArrowRight, Award, FlaskConical, Users, Leaf, Shield, Sparkles } from 'lucide-react';
import { useEffect } from 'react';

export function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'About Us — SoloPharma';
  }, []);

  const milestones = [
    { year: '2007', title: 'Founded', desc: 'SoloPharma was established with a mission to create pharmaceutical-grade cosmetics.' },
    { year: '2010', title: 'ISO Certification', desc: 'Achieved ISO 9001 certification, setting a new standard in quality control.' },
    { year: '2015', title: '500K Customers', desc: 'Reached half a million satisfied customers across Egypt and the Middle East.' },
    { year: '2020', title: 'Digital Launch', desc: 'Launched our e-commerce platform, bringing premium products nationwide.' },
    { year: '2024', title: '1M+ Customers', desc: 'Celebrated over one million happy customers trusting SoloPharma.' },
  ];

  const values = [
    { icon: Shield, title: 'Pharma Quality', desc: 'Every product meets strict pharmaceutical-grade quality standards.', color: '#0077b6', bg: 'from-sky-50 to-blue-50', border: '#bae6fd' },
    { icon: Leaf, title: 'Natural Ingredients', desc: 'We source only the finest natural, responsibly sourced ingredients.', color: '#059669', bg: 'from-emerald-50 to-green-50', border: '#a7f3d0' },
    { icon: Sparkles, title: 'Derma Tested', desc: 'All formulas are rigorously tested by certified dermatologists.', color: '#7c3aed', bg: 'from-violet-50 to-purple-50', border: '#ddd6fe' },
    { icon: Award, title: 'Award Winning', desc: 'Multiple industry awards recognizing our innovation and quality.', color: '#d97706', bg: 'from-amber-50 to-orange-50', border: '#fed7aa' },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-[#022047] via-[#0077b6] to-[#00b4d8] py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="about-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#about-grid)" />
          </svg>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative text-center">
          <span className="inline-block text-sky-200 font-semibold text-xs uppercase tracking-[4px] mb-4">
            Our Story
          </span>
          <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6">
            About SoloPharma
          </h1>
          <p className="text-sky-100 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Over 20 years of commitment to your health and beauty — combining science,
            nature, and innovation to deliver products you can trust.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { icon: Award, value: '20+', label: 'Years Experience', color: '#fbbf24' },
              { icon: FlaskConical, value: '15+', label: 'Products', color: '#38bdf8' },
              { icon: Users, value: '1M+', label: 'Happy Customers', color: '#34d399' },
            ].map(({ icon: Icon, value, label, color }) => (
              <div key={label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-center min-w-[130px]">
                <Icon className="w-5 h-5 mx-auto mb-2" style={{ color }} />
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="text-sky-200 text-xs font-medium mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28 bg-[#f8fbff]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-[#0077b6] font-semibold text-xs uppercase tracking-[3px] mb-3">Who We Are</span>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-6">
                Committed to Your<br />
                <span className="shimmer-text">Health & Well-being</span>
              </h2>
              <p className="text-slate-500 leading-relaxed mb-5">
                SoloPharma is a leading Egyptian pharmaceutical company developing high-quality
                cosmetic and personal care products. Founded in 2007, we combine scientific
                innovation with natural ingredients to create products that are both effective
                and safe for everyday use.
              </p>
              <p className="text-slate-500 leading-relaxed mb-8">
                Our ISO-certified manufacturing facilities follow strict quality control measures.
                Every product undergoes rigorous testing to meet the highest pharmaceutical
                standards before it reaches your hands.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white font-bold px-7 py-3.5 rounded-2xl shadow-lg shadow-sky-300/30 hover:opacity-90 transition-all hover:-translate-y-0.5"
              >
                Explore Our Products <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#0077b6] to-[#00b4d8] p-12 shadow-2xl shadow-sky-300/30">
                <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="dots-about" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1.5" fill="white" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dots-about)" />
                </svg>
                <div className="relative text-center">
                  <img
                    src="/logo.png"
                    alt="SoloPharma"
                    className="w-48 h-auto object-contain mx-auto drop-shadow-2xl animate-float"
                  />
                  <p className="text-white/80 text-sm font-medium mt-6 uppercase tracking-widest">
                    Trusted Since 2007
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block text-[#0077b6] font-semibold text-xs uppercase tracking-[3px] mb-3">What Drives Us</span>
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mt-1 mb-4 tracking-tight">Our Core Values</h2>
            <p className="text-slate-500 max-w-xl mx-auto">The principles that guide every product we create and every decision we make.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc, color, bg, border }) => (
              <div
                key={title}
                className={`bg-gradient-to-br ${bg} rounded-2xl p-7 border card-hover`}
                style={{ borderColor: border }}
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-5" style={{ color }}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-28 bg-[#f8fbff]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-block text-[#0077b6] font-semibold text-xs uppercase tracking-[3px] mb-3">Our Journey</span>
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mt-1 mb-4 tracking-tight">Key Milestones</h2>
          </div>
          <div className="relative max-w-3xl mx-auto">
            {/* Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0077b6] to-[#00b4d8] hidden sm:block" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex gap-6 items-start group">
                  <div className="relative flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0077b6] to-[#00b4d8] flex items-center justify-center shadow-lg shadow-sky-300/30 z-10">
                    <span className="text-white font-black text-sm leading-tight text-center">{m.year}</span>
                  </div>
                  <div className={`flex-1 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm card-hover`} style={{ transitionDelay: `${i * 60}ms` }}>
                    <h3 className="font-bold text-slate-900 text-base mb-1">{m.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#022047] via-[#0077b6] to-[#00b4d8]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 tracking-tight">
            Ready to Experience the Difference?
          </h2>
          <p className="text-sky-100 mb-8 max-w-lg mx-auto text-lg">
            Browse our full range of pharmaceutical-grade cosmetics today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white text-[#0077b6] font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Shop All Products <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/30 font-bold px-8 py-4 rounded-2xl hover:bg-white/20 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
