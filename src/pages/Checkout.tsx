
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  CreditCard, 
  Check, 
  Shield,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

interface PaymentMethod {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'credit-card',
    title: 'Credit Card',
    description: 'Pay with Visa, Mastercard, Amex, or Discover',
    icon: <CreditCard className="h-5 w-5" />
  },
  {
    id: 'paypal',
    title: 'PayPal',
    description: 'Fast, secure checkout with PayPal',
    icon: <Mail className="h-5 w-5" />
  }
];

const Checkout = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit-card');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate processing payment
    setTimeout(() => {
      setLoading(false);
      toast.success("Payment processed successfully!");
      navigate('/');
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-10">
            <Link to="/cart" className="inline-flex items-center text-primary hover:underline">
              <ChevronLeft className="h-4 w-4 mr-1" /> Back to Cart
            </Link>
            
            <h1 className="text-3xl font-bold mt-4 mb-10">Checkout</h1>
            
            <div className="grid md:grid-cols-5 gap-12">
              <div className="md:col-span-3">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">Billing Information</h2>
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                            First Name
                          </label>
                          <Input 
                            id="firstName" 
                            required 
                            placeholder="John" 
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                            Last Name
                          </label>
                          <Input 
                            id="lastName" 
                            required 
                            placeholder="Doe" 
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <Input 
                          id="email" 
                          type="email" 
                          required 
                          placeholder="john.doe@example.com" 
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium mb-2">
                          Address
                        </label>
                        <Input 
                          id="address" 
                          required 
                          placeholder="123 Main St" 
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium mb-2">
                            City
                          </label>
                          <Input 
                            id="city" 
                            required 
                            placeholder="San Francisco" 
                          />
                        </div>
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium mb-2">
                            State
                          </label>
                          <Input 
                            id="state" 
                            required 
                            placeholder="CA" 
                          />
                        </div>
                        <div>
                          <label htmlFor="zip" className="block text-sm font-medium mb-2">
                            ZIP Code
                          </label>
                          <Input 
                            id="zip" 
                            required 
                            placeholder="94103" 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 border-t">
                      <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                      
                      <div className="space-y-4">
                        {paymentMethods.map((method) => (
                          <div 
                            key={method.id}
                            className={`border rounded-lg p-4 flex items-center cursor-pointer transition-all ${
                              selectedPaymentMethod === method.id 
                                ? 'border-primary bg-primary/5' 
                                : 'hover:border-gray-300'
                            }`}
                            onClick={() => setSelectedPaymentMethod(method.id)}
                          >
                            <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-4 ${
                              selectedPaymentMethod === method.id
                                ? 'border-primary' 
                                : 'border-gray-300'
                            }`}>
                              {selectedPaymentMethod === method.id && (
                                <div className="w-3 h-3 rounded-full bg-primary"></div>
                              )}
                            </div>
                            
                            <div className="flex-grow">
                              <h4 className="font-medium">{method.title}</h4>
                              <p className="text-sm text-gray-500">{method.description}</p>
                            </div>
                            
                            <div>
                              {method.icon}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {selectedPaymentMethod === 'credit-card' && (
                        <div className="mt-6 space-y-6">
                          <div>
                            <label htmlFor="cardNumber" className="block text-sm font-medium mb-2">
                              Card Number
                            </label>
                            <Input 
                              id="cardNumber" 
                              placeholder="1234 5678 9012 3456" 
                              required
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <label htmlFor="expiry" className="block text-sm font-medium mb-2">
                                Expiry Date
                              </label>
                              <Input 
                                id="expiry" 
                                placeholder="MM/YY" 
                                required
                              />
                            </div>
                            <div>
                              <label htmlFor="cvc" className="block text-sm font-medium mb-2">
                                CVC
                              </label>
                              <Input 
                                id="cvc" 
                                placeholder="123" 
                                required
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 border-t">
                      <Button
                        className="w-full"
                        size="lg"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? 'Processing...' : 'Complete Payment'}
                      </Button>
                      
                      <div className="mt-4 flex items-center justify-center text-sm text-gray-500 gap-2">
                        <Shield className="h-4 w-4 text-green-600" />
                        All transactions are secured and encrypted
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="border-b pb-4 mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Elevate Pro</h3>
                        <p className="text-sm text-gray-500">Annual Plan</p>
                      </div>
                      <span>$790.00</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>$790.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (10%)</span>
                      <span>$79.00</span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>$869.00</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <div className="flex items-start">
                      <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-green-800 text-sm">Money-Back Guarantee</h4>
                        <p className="text-xs text-green-700 mt-1">
                          Try risk-free for 30 days. If you're not satisfied, we'll refund your payment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
