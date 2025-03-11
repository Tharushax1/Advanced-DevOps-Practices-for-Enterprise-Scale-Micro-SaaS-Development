
import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

type PricingPeriod = 'monthly' | 'annual';

interface PlanFeature {
  title: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: PlanFeature[];
  highlighted?: boolean;
  ctaText: string;
}

const plans: PricingPlan[] = [
  {
    name: "Starter",
    description: "Perfect for individuals and small teams getting started.",
    monthlyPrice: 29,
    annualPrice: 290,
    features: [
      { title: "Up to 5 team members", included: true },
      { title: "Basic analytics", included: true },
      { title: "1GB storage", included: true },
      { title: "Email support", included: true },
      { title: "Advanced integrations", included: false },
      { title: "Custom branding", included: false },
      { title: "API access", included: false },
    ],
    ctaText: "Start Free Trial",
  },
  {
    name: "Pro",
    description: "Ideal for growing businesses and teams.",
    monthlyPrice: 79,
    annualPrice: 790,
    features: [
      { title: "Up to 20 team members", included: true },
      { title: "Advanced analytics", included: true },
      { title: "10GB storage", included: true },
      { title: "Priority email & chat support", included: true },
      { title: "Advanced integrations", included: true },
      { title: "Custom branding", included: true },
      { title: "API access", included: false },
    ],
    highlighted: true,
    ctaText: "Get Started",
  },
  {
    name: "Enterprise",
    description: "For organizations requiring advanced features and support.",
    monthlyPrice: 199,
    annualPrice: 1990,
    features: [
      { title: "Unlimited team members", included: true },
      { title: "Custom analytics", included: true },
      { title: "Unlimited storage", included: true },
      { title: "24/7 phone & priority support", included: true },
      { title: "Advanced integrations", included: true },
      { title: "Custom branding", included: true },
      { title: "API access", included: true },
    ],
    ctaText: "Contact Sales",
  },
];

const PricingSection = () => {
  const [billingPeriod, setBillingPeriod] = useState<PricingPeriod>('monthly');
  
  return (
    <section id="pricing" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-blue-100 text-primary text-sm font-medium">
            Flexible Pricing
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Choose the Perfect Plan for Your Business
          </h2>
          <p className="text-lg text-foreground/80 mb-8">
            Simple, transparent pricing that scales with your business. No hidden fees or surprises.
          </p>
          
          <div className="inline-flex p-1 bg-gray-100 rounded-full">
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingPeriod === 'monthly'
                  ? 'bg-white shadow-sm'
                  : 'text-foreground/60 hover:text-foreground/80'
              }`}
              onClick={() => setBillingPeriod('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingPeriod === 'annual'
                  ? 'bg-white shadow-sm'
                  : 'text-foreground/60 hover:text-foreground/80'
              }`}
              onClick={() => setBillingPeriod('annual')}
            >
              Annual <span className="text-green-500 font-medium">Save 20%</span>
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl overflow-hidden transition-all ${
                plan.highlighted
                  ? 'bg-white shadow-xl ring-1 ring-primary/20 scale-105 md:-mt-4 z-10'
                  : 'bg-white shadow-lg'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-0 right-0 bg-primary text-white text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-foreground/70 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    ${billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                  </span>
                  <span className="text-foreground/70">
                    /{billingPeriod === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                
                <Link to="/cart">
                  <Button 
                    className={`w-full group ${plan.highlighted ? '' : 'variant-outline'}`}
                    variant={plan.highlighted ? 'default' : 'outline'}
                  >
                    {plan.ctaText} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                
                <div className="mt-8 space-y-4">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      ) : (
                        <div className="h-5 w-5 border border-gray-300 rounded-full mt-0.5 mr-3 flex-shrink-0"></div>
                      )}
                      <p className={feature.included ? '' : 'text-foreground/60'}>
                        {feature.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
