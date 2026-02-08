import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export const ConsultationCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-primary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <h2 className="text-5xl md:text-7xl font-bold font-heading text-black mb-6 uppercase leading-tight">
            NEED A CONSULTATION?
          </h2>
          <p className="text-xl text-black/80 mb-10 font-light max-w-2xl">
            Drop us a line. We are here to answer your questions and provide the solutions your business needs.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-black text-white hover:bg-secondary px-10 py-4 font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:shadow-lg"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
