import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

export const NewsletterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gdprConsent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Analytics hook placeholder
    console.log('Newsletter signup:', formData);
    toast.success('Thank you for subscribing!');
    setFormData({ firstName: '', lastName: '', email: '', gdprConsent: false });
  };

  return (
    <section ref={ref} id="contact-form" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Sign up to stay updated with Liquid C2 and receive our{' '}
              <span className="text-secondary">FREE REPORT</span>
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 mt-8">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                    First Name *
                  </label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    required
                    className="newsletter-input w-full"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                    Last Name *
                  </label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    required
                    className="newsletter-input w-full"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email *
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="newsletter-input w-full"
                />
              </div>
              <div className="flex items-start gap-3">
                <Checkbox
                  id="gdprConsent"
                  checked={formData.gdprConsent}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, gdprConsent: checked as boolean })
                  }
                  required
                />
                <label htmlFor="gdprConsent" className="text-sm text-muted-foreground">
                  Yes, I agree with the privacy policy. This site is protected by
                  reCAPTCHA and Google Privacy Policy and Terms of Service apply.
                </label>
              </div>
              <Button
                type="submit"
                className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3"
                disabled={!formData.gdprConsent}
              >
                Subscribe
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm">
              <div className="aspect-[3/4] bg-gradient-to-br from-secondary to-navy rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold text-center px-4">
                  FREE<br />SECURITY<br />REPORT
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
