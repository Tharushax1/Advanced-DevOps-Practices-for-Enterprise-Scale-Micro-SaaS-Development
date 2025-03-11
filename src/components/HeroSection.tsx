
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const children = heroRef.current?.querySelectorAll('.animate-item');
    children?.forEach((child) => observer.observe(child));
    
    return () => {
      children?.forEach((child) => observer.unobserve(child));
    };
  }, []);
  
  return (
    <section className="relative pt-32 pb-20 overflow-hidden" ref={heroRef}>
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-blue-100 text-primary text-sm font-medium animate-item opacity-0 translate-y-10 transition-all duration-700 delay-100">
            Streamline Your Workflow
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-item opacity-0 translate-y-10 transition-all duration-700 delay-200">
            <span className="text-gradient">Elevate</span> Your Business with Intelligent Solutions
          </h1>
          
          <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto animate-item opacity-0 translate-y-10 transition-all duration-700 delay-300">
            An all-in-one platform designed to optimize your workflow, increase productivity, and drive business growth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-item opacity-0 translate-y-10 transition-all duration-700 delay-400">
            <Button size="lg" className="group">
              Get Started <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline">
              See How It Works
            </Button>
          </div>
          
          <div className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl animate-item opacity-0 translate-y-10 transition-all duration-700 delay-500">
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
              alt="Elevate Platform Dashboard" 
              className="w-full h-auto"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
