import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';

export const ConsultationCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need a Consultation?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Drop us a line! We are here to answer your questions.
          </p>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-secondary px-8 py-3 text-lg"
            onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Contact us...
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
