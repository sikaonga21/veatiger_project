import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const heroSlides = [
  {
    heading: 'EXPERT MINING SUPPORT',
    subheading: "WE DELIVER RESULTS.",
    image: "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?q=80&w=2070&auto=format&fit=crop"
  },
  {
    heading: 'RELIABLE LOGISTICS',
    subheading: "MOVING AFRICA FORWARD.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
  },
  {
    heading: 'CIVIL ENGINEERING',
    subheading: "BUILDING THE FUTURE.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
  },
];

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
           {/* Image */}
          <img 
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].heading}
            className="w-full h-full object-cover opacity-80"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-4 h-full relative z-10 flex items-center">
        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading text-white mb-4 leading-none tracking-tight">
                {heroSlides[currentSlide].heading}
              </h1>
              <p className="text-2xl md:text-3xl font-light text-primary mb-10 tracking-wide uppercase font-heading">
                {heroSlides[currentSlide].subheading}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link to="/contact" className="btn-primary text-lg inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
              Get a Quote
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-0 right-0 z-20">
        <div className="container mx-auto px-4 flex gap-3">
            {heroSlides.map((_, index) => (
            <button
                key={index}
                className={`h-1 rounded-full transition-all duration-500 ${
                index === currentSlide ? 'bg-primary w-16' : 'bg-white/30 w-8 hover:bg-white/50'
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
            />
            ))}
        </div>
      </div>
    </section>
  );
};
