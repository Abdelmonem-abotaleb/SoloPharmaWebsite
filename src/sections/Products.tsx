import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import type { Product } from '@/types';
import { useEffect, useRef } from 'react';

interface ProductsProps {
  onAddToCart: (product: Product) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categoryList = ['All Products', 'Skin Care', 'Body Care', 'Face Care', 'Oral Care', 'Personal Care'];

export function Products({ onAddToCart, selectedCategory, onSelectCategory }: ProductsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.05 }
    );
    sectionRef.current?.querySelectorAll('.section-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filteredProducts =
    selectedCategory === 'All Products'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section id="products" ref={sectionRef} className="py-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 section-reveal">
          <span className="inline-block text-[#0077b6] font-semibold text-xs uppercase tracking-[3px] mb-3">
            Our Products
          </span>
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mt-1 mb-4 tracking-tight">
            Premium Pharmaceutical Cosmetics
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Scientifically formulated products designed to enhance your health, beauty, and daily hygiene routine.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 section-reveal" style={{ transitionDelay: '80ms' }}>
          {categoryList.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white border-transparent shadow-lg shadow-sky-300/30 scale-105'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-[#0077b6] hover:text-[#0077b6] hover:bg-sky-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 section-reveal" style={{ transitionDelay: '120ms' }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg font-medium">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
