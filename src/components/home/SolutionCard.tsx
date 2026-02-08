import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'phosphor-react';

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
      className={`py-24 ${reverse ? 'bg-muted' : 'bg-white'}`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`grid lg:grid-cols-2 gap-16 items-center ${
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
            <h2 className="text-primary text-xl font-bold mb-2 uppercase tracking-wider font-heading">{title}</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-black mb-8 font-heading uppercase leading-tight">
              <Link to={learnMoreLink} className="hover:text-secondary transition-colors">
                {subtitle}
              </Link>
            </h3>
            <p className="text-gray-600 leading-relaxed mb-8 text-lg font-body">
              {description}
            </p>
            <ul className="space-y-3 mb-10">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-gray-800 font-medium">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              to={learnMoreLink}
              className="btn-primary inline-flex items-center gap-2 text-black hover:gap-3"
            >
              Learn More
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={reverse ? 'lg:order-1' : ''}
          >
            <div className="relative overflow-hidden shadow-2xl">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
