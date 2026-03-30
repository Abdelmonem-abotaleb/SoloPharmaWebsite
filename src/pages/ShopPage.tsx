import { useParams } from 'react-router-dom';
import { Products } from '@/sections/Products';
import type { Product } from '@/types';
import { useState, useEffect } from 'react';

interface ShopPageProps {
  onAddToCart: (product: Product) => void;
}

export function ShopPage({ onAddToCart }: ShopPageProps) {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [selectedCategory, setSelectedCategory] = useState(
    categoryName ? decodeURIComponent(categoryName) : 'All Products'
  );

  // Sync selected category when the URL param changes (e.g. navigating between categories)
  useEffect(() => {
    setSelectedCategory(categoryName ? decodeURIComponent(categoryName) : 'All Products');
  }, [categoryName]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryName]);

  return (
    <div className="bg-white min-h-screen pt-10">
      <Products
        onAddToCart={onAddToCart}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
    </div>
  );
}
