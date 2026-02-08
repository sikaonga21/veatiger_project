import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Buildings, Factory, Bank } from 'phosphor-react';

const projects = [
  {
    id: 1,
    category: 'Hospitality',
    title: 'Chacha Park and Kingfisher Lodge',
    excerpt:
      'Foundational projects including construction and renovation works for Chacha Park Lodge and Kingfisher Lodge, establishing our reputation for quality.',
    year: '2009-2011',
    icon: Buildings,
  },
  {
    id: 2,
    category: 'Industrial',
    title: 'Zambia Sugar and Modern Press',
    excerpt:
      'Long-term engagements providing industrial support and infrastructure development for major industrial players.',
    year: '2009-2012',
    icon: Factory,
  },
  {
    id: 3,
    category: 'Government',
    title: 'Ministry of Science and Technology',
    excerpt:
      'Service delivery and infrastructure support for government institutions, ensuring compliance and quality standards.',
    year: '2010',
    icon: Bank,
  },
];

export const NewsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Our Track Record
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Over a decade of delivering reliable, high-quality services across Zambia.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-border/50"
            >
              <div className="h-48 bg-muted flex items-center justify-center">
                 <item.icon className="w-16 h-16 text-secondary/50" />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-navy mt-2 mb-3">
                    {item.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {item.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <Link
                    to="/projects"
                    className="text-secondary font-medium text-sm hover:underline inline-flex items-center gap-1"
                  >
                    View Projects
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <span className="text-xs text-muted-foreground">{item.year}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        
        <div className="mt-12 text-center">
            <Link to="/projects" className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                View All Projects <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
      </div>
    </section>
  );
};
