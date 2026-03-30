import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from '@/sections/Header';
import { Footer } from '@/sections/Footer';
import { Cart } from '@/sections/Cart';
import { useCart } from '@/hooks/useCart';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import type { Product } from '@/types';

import { HomePage } from '@/pages/HomePage';
import { ProductPage } from '@/pages/ProductPage';
import { ShopPage } from '@/pages/ShopPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

function App() {
  const {
    items,
    isOpen,
    setIsOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
  } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      description: `${product.price.toFixed(2)} EGP - ${product.volume}`,
    });
  };

  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
        <Toaster position="bottom-right" richColors />

        <Header
          cartItemsCount={totalItems}
          onCartClick={() => setIsOpen(true)}
        />

        <div className="flex-1 flex flex-col min-h-[60vh]">
          <Routes>
            <Route path="/" element={<HomePage onAddToCart={handleAddToCart} />} />
            <Route path="/products" element={<ShopPage onAddToCart={handleAddToCart} />} />
            <Route path="/category/:categoryName" element={<ShopPage onAddToCart={handleAddToCart} />} />
            <Route path="/product/:id" element={<ProductPage onAddToCart={handleAddToCart} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* 404 catch-all */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        <Footer />

        <Cart
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          items={items}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          totalPrice={totalPrice}
        />
      </div>
    </Router>
  );
}

export default App;
