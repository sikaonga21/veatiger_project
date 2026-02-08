import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { SmartSolutionsSection } from '@/components/home/SmartSolutionsSection';
import { PartnersCarousel } from '@/components/home/PartnersCarousel';
import { SolutionsSection } from '@/components/home/SolutionsSection';
import { NewsSection } from '@/components/home/NewsSection';
import { ConsultationCTA } from '@/components/home/ConsultationCTA';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const PullQuote = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4">
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto text-center"
        >
          <p className="text-2xl md:text-4xl font-light text-black leading-relaxed italic">
            "We are a Zambian company specializing in moving goods within the Southern African region, offering services in construction, civil engineering, transportation, and general supply."
          </p>
          <footer className="mt-8">
            <div className="w-16 h-1 bg-primary mx-auto"></div>
          </footer>
        </motion.blockquote>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PullQuote />
        <SolutionsSection />
        <SmartSolutionsSection />
        <PartnersCarousel />
        <NewsSection />
        <ConsultationCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
