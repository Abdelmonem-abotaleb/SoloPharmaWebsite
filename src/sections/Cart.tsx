import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingBag, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { CartItem } from '@/types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  totalPrice: number;
}

const FREE_SHIPPING_THRESHOLD = 500;

export function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemove, totalPrice }: CartProps) {
  const navigate = useNavigate();
  const qualifiesForFreeShipping = totalPrice >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = qualifiesForFreeShipping ? 0 : 50;
  const total = totalPrice + shippingCost;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader className="space-y-2.5 pb-4">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <ShoppingBag className="w-6 h-6 text-[#0077b6]" />
            Shopping Cart
            <span className="text-sm font-normal text-gray-500">
              ({items.length} {items.length === 1 ? 'item' : 'items'})
            </span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6 max-w-xs">
              Looks like you haven't added any products yet.
            </p>
            <Button onClick={onClose} className="bg-[#0077b6] hover:bg-[#005a8c] rounded-xl">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Free shipping progress */}
            {!qualifiesForFreeShipping && (
              <div className="mb-4 p-3 bg-sky-50 rounded-xl border border-sky-100">
                <p className="text-xs text-[#0077b6] font-semibold mb-1.5">
                  Add {(FREE_SHIPPING_THRESHOLD - totalPrice).toFixed(0)} EGP more for free shipping!
                </p>
                <div className="h-1.5 bg-sky-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0077b6] to-[#00b4d8] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}

            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-gray-50 rounded-xl p-3 border border-slate-100">
                    <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center flex-shrink-0 border border-slate-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-w-full max-h-full object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-500">{item.volume}</p>
                      <p className="text-[#0077b6] font-bold mt-0.5 text-sm">
                        {item.price.toFixed(2)} EGP
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1.5">
                          <button
                            className="w-7 h-7 rounded-lg border border-slate-200 bg-white flex items-center justify-center hover:border-[#0077b6] transition-colors"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                          <button
                            className="w-7 h-7 rounded-lg border border-slate-200 bg-white flex items-center justify-center hover:border-[#0077b6] transition-colors"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          className="w-7 h-7 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors"
                          onClick={() => onRemove(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="pt-4 space-y-4">
              <Separator />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-semibold">{totalPrice.toFixed(2)} EGP</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className={`font-semibold ${qualifiesForFreeShipping ? 'text-emerald-600' : ''}`}>
                    {qualifiesForFreeShipping ? 'Free 🎉' : `${shippingCost.toFixed(2)} EGP`}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-black text-xl text-[#0077b6]">{total.toFixed(2)} EGP</span>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-[#0077b6] to-[#00b4d8] hover:opacity-90 h-12 text-base font-bold rounded-xl shadow-lg shadow-sky-300/30"
                onClick={() => {
                  onClose();
                  navigate('/checkout');
                }}
              >
                Proceed to Checkout
              </Button>
              <Button variant="outline" className="w-full rounded-xl" onClick={onClose}>
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
