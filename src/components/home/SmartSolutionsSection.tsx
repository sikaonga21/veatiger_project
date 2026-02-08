import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle, ShieldCheck, Users, Globe, Wrench, Briefcase } from 'phosphor-react';

const reasons = [
  {
    title: "RISK MITIGATION",
    description: "We understand investment risks and mitigate them through careful and prudent due diligence.",
    icon: ShieldCheck
  },
  {
    title: "CLIENT SATISFACTION",
    description: "Our clients' satisfaction is our top priority. We provide high quality services that exceed expectations.",
    icon: Users
  },
  {
    title: "EXTENSIVE EXPERIENCE",
    description: "Years of experience in the African market allow us to navigate complexities and ensure success.",
    icon: Globe
  },
  {
    title: "TAILORED SOLUTIONS",
    description: "We provide solutions tailored to meet the specific requirements and goals of each client.",
    icon: Wrench
  },
  {
    title: "PROFESSIONALISM",
    description: "We operate with the highest level of professionalism, transparency, honesty, and integrity.",
    icon: Briefcase
  },
  {
    title: "COMPREHENSIVE SERVICES",
    description: "A one-stop-shop for transport, logistics, construction, and civil engineering needs.",
    icon: CheckCircle
  }
];

export const SmartSolutionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 bg-secondary text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6 text-white">
            WHY CHOOSE VEATIGER?
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-white/80 font-light leading-relaxed">
            Experience the peace of mind that comes with expert knowledge, meticulous attention to detail, and a commitment to delivering results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
        <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 p-8 rounded-sm hover:bg-white/10 transition-colors border border-white/10 group"
            >
              <div className="mb-6">
                <reason.icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold font-heading text-white mb-4 tracking-wide">{reason.title}</h3>
              <p className="text-white/70 leading-relaxed">
                {reason.description}
          </p>
        </motion.div>
          ))}
            </div>
      </div>
    </section>
  );
};
