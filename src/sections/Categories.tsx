import { categories } from '@/data/products';
import {
  Droplets,
  Sun,
  Smile,
  Sparkles,
  Heart,
  ShoppingBag,
} from 'lucide-react';
import { useEffect, useRef } from 'react';

interface CategoriesProps {
  onCategorySelect?: (categoryName: string) => void;
  selectedCategory?: string;
}

const categoryIcons: Record<string, React.ReactNode> = {
  'All Products': <ShoppingBag className="w-7 h-7" />,
  'Skin Care': <Droplets className="w-7 h-7" />,
  'Body Care': <Sun className="w-7 h-7" />,
  'Face Care': <Smile className="w-7 h-7" />,
  'Oral Care': <Sparkles className="w-7 h-7" />,
  'Personal Care': <Heart className="w-7 h-7" />,
};

const categoryColors: Record<string, { bg: string; icon: string; border: string }> = {
  'All Products': { bg: 'from-slate-50 to-slate-100', icon: '#475569', border: '#e2e8f0' },
  'Skin Care': { bg: 'from-sky-50 to-blue-50', icon: '#0077b6', border: '#bae6fd' },
  'Body Care': { bg: 'from-amber-50 to-orange-50', icon: '#d97706', border: '#fed7aa' },
  'Face Care': { bg: 'from-pink-50 to-rose-50', icon: '#e11d48', border: '#fecdd3' },
  'Oral Care': { bg: 'from-violet-50 to-purple-50', icon: '#7c3aed', border: '#ddd6fe' },
  'Personal Care': { bg: 'from-emerald-50 to-green-50', icon: '#059669', border: '#a7f3d0' },
};

export function Categories({ onCategorySelect, selectedCategory }: CategoriesProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.section-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="categories" ref={sectionRef} className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-14 section-reveal">
          <span className="inline-block text-[#0077b6] font-semibold text-xs uppercase tracking-[3px] mb-3">
            Browse by Category
          </span>
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mt-1 mb-4 tracking-tight">
            Find What You Need
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
            From skincare to oral care — everything for your daily health and beauty routine.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 section-reveal" style={{ transitionDelay: '100ms' }}>
          {categories.map((category) => {
            const colors = categoryColors[category.name] ?? categoryColors['Skin Care'];
            const isSelected = selectedCategory === category.name;
            
            return (
              <button
                key={category.name}
                onClick={() => onCategorySelect?.(category.name)}
                className={`group relative bg-gradient-to-br ${colors.bg} rounded-2xl p-6 text-center border w-full h-full block transition-transform ${isSelected ? 'ring-2 ring-offset-2 ring-[#0077b6] scale-105' : 'card-hover'}`}
                style={{ borderColor: colors.border }}
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                  style={{ color: colors.icon }}
                >
                  {categoryIcons[category.name]}
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-[#0077b6] transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium">{category.count} Products</p>

                {/* Hover arrow */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: colors.icon }}>
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
