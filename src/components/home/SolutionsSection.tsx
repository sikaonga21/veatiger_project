import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const solutions = [
  {
    title: 'MINING SUPPORT',
    subtitle: 'INDUSTRIAL EXCELLENCE',
    description:
      "Veatiger General Dealers is well-positioned to support Zambia’s mining sector through a range of reliable and cost-effective services. With years of experience supplying industrial materials, engineering support, and logistics solutions, we are the partner of choice for major mining operations.",
    learnMoreLink: '/services',
    imageSrc: 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?q=80&w=2070&auto=format&fit=crop',
    imageAlt: 'Mining Support',
  },
  {
    title: 'TRANSPORT & LOGISTICS',
    subtitle: 'MOVING AFRICA',
    description:
      "We boast a well-maintained fleet of 72 trucks, including long haul tri-axle trailers registered for container transportation. Our fleet handles everything from large consignments to smaller loads for consolidation, ensuring your goods reach their destination safely and on time.",
    learnMoreLink: '/services',
    imageSrc: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop',
    imageAlt: 'Transport and Logistics',
    reverse: true,
  },
  {
    title: 'CIVIL ENGINEERING',
    subtitle: 'INFRASTRUCTURE DEVELOPMENT',
    description:
      "Our team of experts offers design, engineering, and project management services for civil engineering projects. From earthworks and concrete works to structural steel, we deliver infrastructure that stands the test of time.",
    learnMoreLink: '/services',
    imageSrc: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop',
    imageAlt: 'Civil Engineering',
  },
  {
    title: 'GENERAL SUPPLY',
    subtitle: 'ESSENTIAL SOLUTIONS',
    description:
      "We offer comprehensive supply solutions ranging from office equipment and stationery to hardware and food supplies. We ensure your business has everything it needs to function smoothly, allowing you to focus on your core operations.",
    learnMoreLink: '/services',
    imageSrc: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?q=80&w=2070&auto=format&fit=crop',
    imageAlt: 'General Supply',
    reverse: true,
  },
];

const SolutionItem = ({ title, subtitle, description, learnMoreLink, imageSrc, imageAlt, reverse = false }: any) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div ref={ref} className="py-24 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Text Content */}
                    <motion.div 
                        className="flex-1"
                        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-primary font-bold tracking-widest uppercase mb-2 text-sm">{title}</h3>
                        <h2 className="text-4xl md:text-5xl font-bold font-heading text-secondary mb-8 leading-tight">{subtitle}</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-light">
                            {description}
                        </p>
                        <Link to={learnMoreLink} className="btn-primary inline-flex items-center gap-2 text-sm">
                            Learn More <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>

                    {/* Image */}
                    <motion.div 
                        className="flex-1 w-full"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-2xl">
                            <img 
                                src={imageSrc} 
                                alt={imageAlt} 
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export const SolutionsSection = () => {
  return (
    <section className="bg-white">
      {solutions.map((solution, index) => (
        <div key={solution.title} className={index % 2 === 1 ? "bg-muted/30" : ""}>
            <SolutionItem {...solution} />
        </div>
      ))}
    </section>
  );
};
