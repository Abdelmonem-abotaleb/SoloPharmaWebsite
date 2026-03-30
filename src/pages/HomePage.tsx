import { Hero } from '@/sections/Hero';
import { Categories } from '@/sections/Categories';
import { About } from '@/sections/About';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/types';

interface HomePageProps {
  onAddToCart: (product: Product) => void;
}

export function HomePage({ onAddToCart }: HomePageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');

  const filteredProducts = selectedCategory === 'All Products'
    ? products.slice(0, 8)
    : products.filter(p => p.category === selectedCategory);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // Smooth scroll to featured products section when a category is selected
    const productsSection = document.getElementById('featured-products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main>
      <Hero />
      <Categories onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />

      {/* Featured Products */}
      <section id="featured-products" className="py-16 lg:py-24 bg-[#f8fbff] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <span className="inline-block text-[#0077b6] font-semibold text-xs uppercase tracking-[3px] mb-3">
                Top Picks
              </span>
              <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tight">
                {selectedCategory === 'All Products' ? 'Featured Products' : selectedCategory}
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-[#0077b6] font-semibold hover:gap-3 transition-all whitespace-nowrap group"
            >
              View All Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg font-medium">No products found for this category.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-sky-300/30 hover:opacity-90 hover:-translate-y-0.5 transition-all"
            >
              Shop All Products <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <About />
    </main>
  );
}
