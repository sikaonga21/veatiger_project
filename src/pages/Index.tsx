import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { SmartSolutionsSection } from '@/components/home/SmartSolutionsSection';
import { PartnersCarousel } from '@/components/home/PartnersCarousel';
import { SolutionsSection } from '@/components/home/SolutionsSection';
import { CassavaAIBanner } from '@/components/home/CassavaAIBanner';
import { NewsletterSection } from '@/components/home/NewsletterSection';
import { NewsSection } from '@/components/home/NewsSection';
import { ConsultationCTA } from '@/components/home/ConsultationCTA';
import { useEffect } from 'react';

const Index = () => {
  // Analytics hook placeholder
  useEffect(() => {
    // Initialize analytics tracking
    console.log('Page view: Home');
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <SmartSolutionsSection />
        <PartnersCarousel />
        <SolutionsSection />
        <CassavaAIBanner />
        <NewsletterSection />
        <NewsSection />
        <ConsultationCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
