import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import cloudMaze from '@/assets/cloud-maze.png';

const heroSlides = [
  {
    question: 'Whatever your business challenge',
    answer: "We'll C2 it.",
  },
  {
    question: 'Need a digital acceleration partner to match your vision?',
    answer: "We'll C2 it.",
  },
  {
    question: 'Is the cloud clouding your vision?',
    answer: "We'll C2 it.",
  },
  {
    question: 'Got a cloud not-work instead of a cloud network?',
    answer: "We'll C2 it.",
  },
  {
    question: 'Security nightmares keeping you awake at night?',
    answer: "We'll C2 it.",
  },
  {
    question: 'Want to power-up productivity?',
    answer: "We'll C2 it.",
  },
  {
    question: 'Need one managed services provider for your multi-cloud needs?',
    answer: "We'll C2 it.",
  },
];

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section min-h-[600px] lg:min-h-[700px] flex items-center pt-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white/90 leading-tight mb-4">
                  {heroSlides[currentSlide].question}
                </h1>
                <p className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-8">
                  {heroSlides[currentSlide].answer}
                </p>
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Button
                variant="outline"
                className="btn-hero text-lg"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Talk to an Expert
              </Button>
            </motion.div>

            {/* Slide Indicators */}
            <div className="flex justify-center lg:justify-start gap-2 mt-8">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-white w-6' : 'bg-white/40'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Cloud Maze Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <img
              src={cloudMaze}
              alt="Cloud network visualization"
              className="w-full max-w-lg lg:max-w-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
