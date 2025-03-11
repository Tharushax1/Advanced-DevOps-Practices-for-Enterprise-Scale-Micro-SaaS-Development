
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  ChevronLeft, 
  Plus, 
  Minus, 
  LockIcon, 
  CreditCard,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface CartItem {
  id: number;
  name: string;
  plan: string;
  price: number;
  quantity: number;
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Elevate Pro",
    plan: "Annual Plan",
    price: 790,
    quantity: 1,
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const navigate = useNavigate();
  
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(
      cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% tax rate for example
  const total = subtotal + tax;
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <Link to="/" className="inline-flex items-center text-primary hover:underline">
              <ChevronLeft className="h-4 w-4 mr-1" /> Back to Home
            </Link>
            
            <h1 className="text-3xl font-bold mt-4 mb-6">Your Cart</h1>
            
            {cartItems.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-gray-400 mb-4 text-7xl">🛒</div>
                <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/#pricing">
                  <Button>Browse Plans</Button>
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-10">
                <div className="md:col-span-2">
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b">
                      <h2 className="text-xl font-semibold">Cart Items</h2>
                    </div>
                    
                    <div className="divide-y">
                      {cartItems.map(item => (
                        <div key={item.id} className="p-6 flex flex-col md:flex-row md:items-center">
                          <div className="flex-grow mb-4 md:mb-0">
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <p className="text-gray-500 text-sm">{item.plan}</p>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="flex items-center border rounded-md">
                              <button 
                                className="px-3 py-1 text-gray-500 hover:text-gray-700"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-3 py-1">{item.quantity}</span>
                              <button 
                                className="px-3 py-1 text-gray-500 hover:text-gray-700"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            
                            <div className="text-right min-w-[80px]">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            
                            <button 
                              className="p-2 text-gray-400 hover:text-red-500"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-1">
                  <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                    <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax (10%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      className="w-full mb-4"
                      size="lg"
                      onClick={handleCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                    
                    <div className="flex items-center justify-center text-sm text-gray-500 gap-2 mb-4">
                      <LockIcon className="h-4 w-4" /> Secure checkout
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">100% Secure Payment</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        All transactions are secured using SSL encryption
                      </p>
                      <div className="flex mt-3 gap-2 justify-center">
                        <CreditCard className="h-6 w-6 text-gray-400" />
                        <CreditCard className="h-6 w-6 text-gray-400" />
                        <CreditCard className="h-6 w-6 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
