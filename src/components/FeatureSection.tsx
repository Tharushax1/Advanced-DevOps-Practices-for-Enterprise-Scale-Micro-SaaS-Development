
import React, { useEffect, useRef } from 'react';
import { 
  BarChart, 
  Zap, 
  Shield, 
  Clock, 
  ArrowUpRight,
  Users,
} from 'lucide-react';

const features = [
  {
    icon: <BarChart className="h-8 w-8 text-blue-500" />,
    title: "Advanced Analytics",
    description: "Gain valuable insights with real-time data visualization and comprehensive reports.",
  },
  {
    icon: <Zap className="h-8 w-8 text-purple-500" />,
    title: "Lightning Fast",
    description: "Optimized performance ensures your workflow never slows down.",
  },
  {
    icon: <Shield className="h-8 w-8 text-green-500" />,
    title: "Enterprise Security",
    description: "Bank-level encryption and security protocols to keep your data safe.",
  },
  {
    icon: <Clock className="h-8 w-8 text-amber-500" />,
    title: "Time Saving",
    description: "Automate repetitive tasks and focus on what matters most to your business.",
  },
  {
    icon: <ArrowUpRight className="h-8 w-8 text-pink-500" />,
    title: "Scalable Solution",
    description: "Grows with your business, from startup to enterprise with flexible options.",
  },
  {
    icon: <Users className="h-8 w-8 text-indigo-500" />,
    title: "Team Collaboration",
    description: "Seamless collaboration tools for your entire organization.",
  },
];

const FeatureSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.feature-card');
            elements.forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).classList.add('opacity-100', 'translate-y-0');
                (el as HTMLElement).classList.remove('opacity-0', 'translate-y-10');
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section id="features" className="section-padding bg-gray-50" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-blue-100 text-primary text-sm font-medium">
            Powerful Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-foreground/80">
            Equipped with tools designed to optimize your workflow, increase productivity, and drive business growth.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card bg-white p-6 rounded-xl shadow-sm card-hover opacity-0 translate-y-10 transition-all duration-500"
            >
              <div className="mb-4 p-3 inline-block rounded-lg bg-gray-50">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-foreground/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
