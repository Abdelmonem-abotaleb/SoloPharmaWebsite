import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { ArrowLeft, ShoppingCart, Check, ShieldCheck, Truck } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Product } from '@/types';

interface ProductPageProps {
  onAddToCart: (product: Product) => void;
}

export function ProductPage({ onAddToCart }: ProductPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));
  const relatedProducts = product
    ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];
  const [added, setAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-white">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingCart className="w-8 h-8 text-slate-300" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-3">Product Not Found</h2>
        <p className="text-slate-500 mb-8 max-w-sm">
          We couldn't find the product you're looking for. It might have been removed or the link is broken.
        </p>
        <Link to="/">
          <Button className="rounded-xl px-8 bg-[#0077b6] hover:bg-[#005a8c]">Back to Store</Button>
        </Link>
      </div>
    );
  }

  const activeImage = selectedImage && (product.image === selectedImage || product.gallery?.includes(selectedImage))
    ? selectedImage
    : product.image;

  const allImages = [product.image, ...(product.gallery || [])];

  const handleAddToCart = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <main className="min-h-screen bg-[#f8fbff] py-10 lg:py-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb / Back Navigation */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#0077b6] transition-colors mb-8 group"
        >
          <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:border-[#0077b6] transition-colors shadow-sm">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back
        </button>

        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100/60 overflow-hidden">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-0">
            
            {/* Left Column: Image Gallery */}
            <div className="p-6 lg:p-10 bg-gradient-to-br from-[#f0f9ff]/80 to-[#e8f4fd]/80 flex flex-col border-r border-slate-100/50">
              {/* Main Active Image View */}
              <div className="relative flex-1 min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] flex items-center justify-center rounded-3xl bg-white/60 mb-6 p-10 border border-white shadow-sm overflow-hidden group">
                {discount && (
                  <span className="absolute top-5 left-5 text-xs font-black text-white bg-red-500 px-3 py-1.5 rounded-full shadow-md z-10 tracking-widest">
                    {discount}% OFF
                  </span>
                )}
                <span className="absolute top-5 right-5 text-[10px] uppercase font-black tracking-widest text-[#0077b6] bg-sky-100/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm z-10 border border-sky-200/50">
                  {product.category}
                </span>
                
                {/* Decorative background glow behind active image */}
                <div className="absolute inset-0 bg-gradient-radial from-white to-transparent opacity-80" />
                
                <img 
                  src={activeImage} 
                  alt={product.name} 
                  className="relative max-h-full max-w-full object-contain mix-blend-multiply drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Thumbnail Strip */}
              <div className="flex items-center gap-3 overflow-x-auto pb-4 custom-scrollbar -mx-2 px-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border-2 overflow-hidden flex-shrink-0 transition-all duration-300 ${
                      activeImage === img 
                        ? 'border-[#0077b6] shadow-lg shadow-sky-200/50 ring-4 ring-sky-50' 
                        : 'border-transparent shadow-sm opacity-60 hover:opacity-100 hover:shadow-md'
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-contain mix-blend-multiply p-2" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Product Details */}
            <div className="p-8 sm:p-10 lg:p-14 flex flex-col">
              <div className="inline-block px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 w-fit">
                {product.volume}
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 leading-[1.1] tracking-tight">
                {product.name}
              </h1>
              
              <div className="flex items-end gap-3 mb-8 pb-8 border-b border-slate-100">
                <span className="text-4xl font-black text-slate-900 leading-none">{product.price.toFixed(2)} EGP</span>
                {product.originalPrice && (
                  <span className="text-lg text-slate-400 line-through font-bold mb-1">{product.originalPrice.toFixed(2)} EGP</span>
                )}
              </div>

              {/* Description Block */}
              <div className="prose prose-sky prose-sm max-w-none text-slate-600 mb-10">
                <p className="text-lg leading-relaxed text-slate-700 font-medium mb-6">{product.description}</p>
                <div className="bg-slate-50 p-6 sm:p-8 rounded-[1.5rem] border border-slate-100/80 shadow-inner">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                     Detailed Information
                  </h3>
                  <p className="whitespace-pre-line text-sm leading-relaxed">{product.detailedDescription}</p>
                </div>
              </div>

              {/* Features/Benefits Grid */}
              <div className="mb-12">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-5">Product Benefits</h3>
                <ul className="grid sm:grid-cols-2 gap-y-4 gap-x-6">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm font-bold">
                      <div className="mt-0.5 bg-emerald-100 rounded-full p-1 flex-shrink-0">
                        <Check className="w-3.5 h-3.5 text-emerald-600" strokeWidth={3} />
                      </div>
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Area (Pushed to bottom using mt-auto) */}
              <div className="mt-auto space-y-4 pt-6">
                <Button 
                  onClick={handleAddToCart}
                  className={`w-full h-16 text-lg sm:text-xl font-black tracking-wide rounded-2xl transition-all duration-300 ${
                    added 
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-200/50 scale-[0.98]' 
                      : 'bg-gradient-to-r from-[#0077b6] to-[#00b4d8] hover:to-[#00a3c4] hover:scale-[1.02] text-white shadow-xl shadow-sky-200/60'
                  }`}
                >
                  {added ? (
                    <span className="flex items-center justify-center gap-2"><Check className="w-6 h-6" strokeWidth={4} /> In Your Cart</span>
                  ) : (
                    <span className="flex items-center justify-center gap-3"><ShoppingCart className="w-6 h-6" /> Add to Cart</span>
                  )}
                </Button>
                
                {/* Trust Badges */}
                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Secure Checkout</span>
                  <span className="flex items-center gap-2"><Truck className="w-4 h-4 text-[#0077b6]" /> Fast Delivery</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="container mx-auto px-4 mt-16 pb-16">
          <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
