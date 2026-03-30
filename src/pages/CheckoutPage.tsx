import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Banknote, Truck, MapPin, Phone, User, CheckCircle2, Package } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';

const checkoutSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  address: z.string().min(10, "Detailed address is required"),
  city: z.string().min(2, "City is required"),
  paymentMethod: z.enum(["cod", "card"], {
    message: "Please select a payment method"
  })
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { user, addOrder } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: user?.name ?? "",
      phone: user?.phone ?? "",
      address: user?.address ?? "",
      city: "Cairo",
      paymentMethod: "cod"
    }
  });

  const onSubmit = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);

    addOrder({
      total: finalTotal,
      items: items.reduce((sum, item) => sum + item.quantity, 0),
    });
    setOrderComplete(true);
    clearCart();
    toast.success("Order placed successfully!");
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="flex-1 min-h-[60vh] flex flex-col items-center justify-center p-4">
        <Package className="w-20 h-20 text-slate-300 mb-6" />
        <h2 className="text-2xl font-bold text-[#022047] mb-2">Your Cart is Empty</h2>
        <p className="text-slate-500 mb-6 text-center max-w-sm">
          Looks like you haven't added anything to your cart yet. Browse our products and find something you love.
        </p>
        <Button onClick={() => navigate('/products')} className="bg-[#0077b6] hover:bg-[#022047]">
          Continue Shopping
        </Button>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="flex-1 min-h-[60vh] flex flex-col items-center justify-center p-4 animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-[#022047] mb-2 text-center">Order Confirmed!</h2>
        <p className="text-slate-500 text-center max-w-md mb-8">
          Thank you for your purchase. We've received your order and our team will start processing it right away.
        </p>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => navigate('/profile')} className="border-[#0077b6] text-[#0077b6] hover:bg-sky-50 transition-colors">
            View Orders
          </Button>
          <Button onClick={() => navigate('/')} className="bg-[#0077b6] hover:bg-[#022047] transition-colors">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const shippingCost = totalPrice > 500 ? 0 : 50;
  const finalTotal = totalPrice + shippingCost;

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in-up">
      <h1 className="text-3xl font-bold text-[#022047] mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Checkout Form */}
        <div className="w-full lg:w-2/3">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <Card className="border-0 shadow-lg shadow-sky-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#022047]">
                  <Truck className="w-5 h-5 text-[#0077b6]" /> Shipping Details
                </CardTitle>
                <CardDescription>Enter your delivery address and contact info.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-slate-700">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input id="fullName" placeholder="John Doe" className="pl-10" {...form.register('fullName')} />
                    </div>
                    {form.formState.errors.fullName && <p className="text-xs text-red-500">{form.formState.errors.fullName.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-slate-700">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input id="phone" placeholder="+20 100 000 0000" className="pl-10" {...form.register('phone')} />
                    </div>
                    {form.formState.errors.phone && <p className="text-xs text-red-500">{form.formState.errors.phone.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-slate-700">Detailed Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input id="address" placeholder="123 Street, Building, Floor" className="pl-10" {...form.register('address')} />
                  </div>
                  {form.formState.errors.address && <p className="text-xs text-red-500">{form.formState.errors.address.message}</p>}
                </div>
                
                <div className="space-y-2 lg:w-1/2">
                  <Label htmlFor="city" className="text-slate-700">City</Label>
                  <Input id="city" placeholder="Cairo" {...form.register('city')} />
                  {form.formState.errors.city && <p className="text-xs text-red-500">{form.formState.errors.city.message}</p>}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg shadow-sky-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#022047]">
                  <CreditCard className="w-5 h-5 text-[#0077b6]" /> Payment Method
                </CardTitle>
                <CardDescription>Select how you want to pay for this order.</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  defaultValue="cod" 
                  onValueChange={(val) => form.setValue('paymentMethod', val as "cod" | "card")}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-3 border p-4 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors data-[state=checked]:border-[#0077b6] data-[state=checked]:bg-sky-50">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 flex items-center gap-3 cursor-pointer">
                      <Banknote className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-slate-800">Cash on Delivery</p>
                        <p className="text-xs text-slate-500">Pay when you receive the order</p>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 border p-4 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors opacity-70">
                    <RadioGroupItem value="card" id="card" disabled />
                    <Label htmlFor="card" className="flex-1 flex items-center gap-3 cursor-not-allowed">
                      <CreditCard className="w-5 h-5 text-slate-400" />
                      <div>
                        <p className="font-semibold text-slate-800">Credit / Debit Card</p>
                        <p className="text-xs text-slate-500">Coming soon</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
                {form.formState.errors.paymentMethod && <p className="text-xs text-red-500 mt-2">{form.formState.errors.paymentMethod.message}</p>}
              </CardContent>
            </Card>

            <div className="hidden lg:block">
              <Button type="submit" disabled={isSubmitting} className="w-full h-14 text-lg bg-gradient-to-r from-[#0077b6] to-[#00b4d8] hover:from-[#022047] hover:to-[#0077b6] shadow-xl shadow-sky-200 rounded-xl transition-all hover:-translate-y-1">
                {isSubmitting ? "Processing..." : `Place Order (${finalTotal.toFixed(2)} EGP)`}
              </Button>
            </div>
            
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <Card className="border-0 shadow-xl shadow-slate-200/50 sticky top-24 bg-gradient-to-b from-white to-sky-50/30">
            <CardHeader className="bg-[#022047] text-white rounded-t-xl mb-4">
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 bg-white p-2 rounded-lg border border-slate-100">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover border" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.quantity} x {item.price} EGP</p>
                    </div>
                    <p className="text-sm font-bold text-[#0077b6] whitespace-nowrap">{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <Separator className="bg-slate-200 my-4" />
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">{totalPrice.toFixed(2)} EGP</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shippingCost === 0 ? <span className="text-green-600">Free</span> : `${shippingCost.toFixed(2)} EGP`}
                  </span>
                </div>
              </div>

              <Separator className="bg-slate-200 my-4" />
              
              <div className="flex justify-between items-center pb-2">
                <span className="font-bold text-lg text-[#022047]">Total</span>
                <span className="font-bold text-2xl text-[#0077b6]">{finalTotal.toFixed(2)} EGP</span>
              </div>
            </CardContent>
            
            <CardFooter className="lg:hidden">
              <Button 
                onClick={form.handleSubmit(onSubmit)} 
                disabled={isSubmitting} 
                className="w-full h-14 text-lg bg-gradient-to-r from-[#0077b6] to-[#00b4d8] shadow-xl rounded-xl"
              >
                {isSubmitting ? "Processing..." : "Place Order"}
              </Button>
            </CardFooter>
          </Card>
        </div>

      </div>
    </div>
  );
}
