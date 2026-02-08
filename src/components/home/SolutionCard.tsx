import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface SolutionCardProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  learnMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
}

export const SolutionCard = ({
  title,
  subtitle,
  description,
  features,
  learnMoreLink,
  imageSrc,
  imageAlt,
  reverse = false,
}: SolutionCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className={`py-16 ${reverse ? 'bg-muted/50' : 'bg-background'}`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`grid lg:grid-cols-2 gap-12 items-center ${
            reverse ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? 30 : -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={reverse ? 'lg:order-2' : ''}
          >
            <h2 className="text-secondary text-2xl font-bold mb-2">{title}</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              <Link to={learnMoreLink} className="hover:underline">
                {subtitle}
              </Link>
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {description}
            </p>
            <ul className="space-y-2 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-secondary rounded-full" />
                  <Link
                    to="#"
                    className="text-foreground hover:text-secondary transition-colors"
                  >
                    {feature}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to={learnMoreLink}
              className="inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all"
            >
              Learn More
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={reverse ? 'lg:order-1' : ''}
          >
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
