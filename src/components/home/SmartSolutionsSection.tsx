import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const SmartSolutionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-navy">Smart Solutions To Scale</span>
            <br />
            <span className="text-navy">Your Business</span>
          </h2>
          <p className="text-lg text-muted-foreground italic">
            Assisting organisations with the right technology to achieve growth, operate smartly, and gain efficiency.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-navy mb-6">
            Revolutionise the way you reach your mobile and digital customer base across Africa and the world
          </h3>
          <p className="text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Conventional boundaries no longer define today's workplaces. Instead, the modern workforce needs to 
            collaborate and communicate with one another on their preferred device, chosen time zone, and favourite 
            office space. Liquid C2 offers leading solutions to streamline workplace operations, secure cloud storage, 
            rapid data recovery, and scale growth. Count on us to help you improve your customer experience with 
            far-reaching cloud security solutions.
          </p>
        </motion.div>

        {/* Service Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-wrap justify-center gap-8"
        >
          {['Cloud Services', 'Cyber Security', 'Edge Platform'].map((service, index) => (
            <div
              key={service}
              className="bg-muted px-8 py-4 rounded-lg text-center"
            >
              <h4 className="text-xl font-semibold text-navy">{service}</h4>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
