import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Factory, Landmark } from 'lucide-react';

const projects = [
  {
    id: 1,
    category: 'Hospitality',
    title: 'Chacha Park & Kingfisher Lodge',
    excerpt:
      'Foundational projects including construction and renovation works, establishing our reputation for quality delivery.',
    year: '2009-2011',
    icon: Building2,
  },
  {
    id: 2,
    category: 'Industrial',
    title: 'Zambia Sugar & Modern Press',
    excerpt:
      'Long-term engagements providing industrial support and infrastructure development for major industrial players.',
    year: '2009-2012',
    icon: Factory,
  },
  {
    id: 3,
    category: 'Government',
    title: 'Ministry of Science & Technology',
    excerpt:
      'Service delivery and infrastructure support for government institutions, ensuring compliance and quality standards.',
    year: '2010',
    icon: Landmark,
  },
];

export const NewsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold font-heading text-black mb-4 uppercase">
            Our Track Record
          </h2>
          <div className="w-24 h-1 bg-primary mb-6"></div>
          <p className="text-lg text-gray-500 max-w-2xl">
            Over a decade of delivering reliable, high-quality services across Zambia.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group cursor-pointer"
            >
              <div className="h-64 bg-secondary/10 flex items-center justify-center mb-6 overflow-hidden group-hover:bg-secondary/20 transition-colors duration-500">
                <item.icon className="w-20 h-20 text-secondary/30 group-hover:text-primary transition-colors duration-500 group-hover:scale-110 transform" />
              </div>
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-400">{item.year}</span>
                </div>
                <h3 className="text-xl font-bold font-heading text-black mb-3 uppercase group-hover:text-secondary transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {item.excerpt}
                </p>
                <Link
                  to="/projects"
                  className="text-primary font-bold text-sm uppercase tracking-wider inline-flex items-center gap-2 group-hover:gap-3 transition-all"
                >
                  View Projects
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <Link to="/projects" className="btn-primary inline-flex items-center gap-2">
            View All Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
