import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const newsItems = [
  {
    id: 1,
    category: 'Insights',
    title: 'Case Study: A Comprehensive Cybersecurity Journey with MTS',
    excerpt:
      'When Misr Technology Services (MTS) needed to strengthen their national trade platform, they partnered with Liquid C2 to elevate cybersecurity to international standards.',
    date: '02/12/2025',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=400&fit=crop',
  },
  {
    id: 2,
    category: 'News',
    title: 'Liquid C2 expands Google Cloud access in Africa with AI-driven distribution programme',
    excerpt:
      'Liquid C2 has announced the launch of its AI-powered Google Cloud distribution programme, known as Liquid G.',
    date: '01/12/2025',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop',
  },
  {
    id: 3,
    category: 'News',
    title: 'Cloudmania recognised as the winner of 2025 Microsoft Egypt Partner of the Year Award',
    excerpt:
      'Cloudmania has won the 2025 Microsoft Partner of the Year Award for Egypt, demonstrating excellence in innovation.',
    date: '24/11/2025',
    image: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=400&h=400&fit=crop',
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
          <h2 className="text-3xl md:text-4xl font-bold text-navy">
            C2 News & Insights
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-navy mt-2 mb-3 line-clamp-2">
                  <Link to="#" className="hover:text-secondary transition-colors">
                    {item.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {item.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <Link
                    to="#"
                    className="text-secondary font-medium text-sm hover:underline inline-flex items-center gap-1"
                  >
                    Read More
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
