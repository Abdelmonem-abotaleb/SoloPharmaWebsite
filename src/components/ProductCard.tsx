import { ShoppingCart, Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '@/types';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative bg-white rounded-2xl overflow-hidden card-hover border border-slate-100 shadow-sm flex flex-col h-full"
    >
      {/* Image area */}
      <div className="relative bg-gradient-to-br from-[#f0f9ff] to-[#e8f4fd] p-6 pb-4">
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="text-[10px] font-bold text-white bg-gradient-to-r from-[#0077b6] to-[#00b4d8] px-2.5 py-1 rounded-full shadow-sm">
            {product.category}
          </span>
          {discount && (
            <span className="text-[10px] font-bold text-white bg-red-500 px-2.5 py-1 rounded-full shadow-sm">
              -{discount}%
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 text-[10px] font-semibold text-slate-500 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full border border-slate-200">
          {product.volume}
        </div>

        <div className="relative h-44 flex items-center justify-center overflow-hidden mt-4">
          <div className="absolute inset-0 bg-gradient-radial from-white/40 to-transparent rounded-full blur-xl" />
          <img
            src={product.image}
            alt={product.name}
            className="relative max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-lg"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
          ))}
          <span className="text-xs text-slate-400 ml-1">(4.9)</span>
        </div>

        <h3 className="font-bold text-slate-900 mb-1.5 line-clamp-1 text-base">{product.name}</h3>
        <p className="text-slate-500 text-sm mb-3 line-clamp-2 flex-1">{product.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.features.slice(0, 2).map((f) => (
            <span key={f} className="text-[10px] font-medium text-[#0077b6] bg-sky-50 border border-sky-100 px-2 py-0.5 rounded-full">
              {f}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900">{product.price.toFixed(2)}</span>
            <span className="text-xs font-semibold text-slate-400">EGP</span>
            {product.originalPrice && (
              <span className="text-sm text-slate-400 line-through">{product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
              added
                ? 'bg-emerald-500 shadow-emerald-300/40'
                : 'bg-gradient-to-r from-[#0077b6] to-[#00b4d8] shadow-sky-300/30'
            }`}
          >
            {added ? (
              <><Check className="w-4 h-4" strokeWidth={3} /> Added</>
            ) : (
              <><ShoppingCart className="w-4 h-4" /> Add</>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}
