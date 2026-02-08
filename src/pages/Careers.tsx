import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Clock, ArrowRight } from 'phosphor-react';

const jobOpenings = [
  {
    id: 1,
    title: 'Civil Engineer',
    department: 'Engineering',
    location: 'Lusaka, Zambia',
    type: 'Full-time',
    description: 'We are seeking an experienced Civil Engineer to join our team. You will be responsible for designing, planning, and overseeing construction projects.',
    requirements: [
      'Bachelor\'s degree in Civil Engineering',
      '5+ years of experience in construction projects',
      'Professional engineering license preferred',
      'Strong project management skills'
    ]
  },
  {
    id: 2,
    title: 'Logistics Coordinator',
    department: 'Transport and Logistics',
    location: 'Lusaka, Zambia',
    type: 'Full-time',
    description: 'Join our logistics team to coordinate transportation operations, manage fleet schedules, and ensure timely delivery of goods across Southern Africa.',
    requirements: [
      'Degree in Logistics, Supply Chain, or related field',
      '3+ years of logistics coordination experience',
      'Knowledge of cross-border transportation regulations',
      'Excellent communication and organizational skills'
    ]
  },
  {
    id: 3,
    title: 'Project Manager',
    department: 'Construction',
    location: 'Kitwe, Zambia',
    type: 'Full-time',
    description: 'Lead construction projects from planning to completion. Manage teams, budgets, timelines, and ensure quality standards are met.',
    requirements: [
      'Bachelor\'s degree in Construction Management or related',
      '7+ years of project management experience',
      'PMP certification preferred',
      'Strong leadership and problem-solving skills'
    ]
  },
  {
    id: 4,
    title: 'Mining Support Specialist',
    department: 'Mining',
    location: 'Copperbelt, Zambia',
    type: 'Full-time',
    description: 'Provide technical support and supply chain solutions to mining operations. Coordinate material deliveries and maintain relationships with mining clients.',
    requirements: [
      'Experience in mining industry or related field',
      'Knowledge of mining operations and safety standards',
      'Strong relationship management skills',
      'Ability to work in remote locations'
    ]
  },
  {
    id: 5,
    title: 'Accountant',
    department: 'Finance',
    location: 'Lusaka, Zambia',
    type: 'Full-time',
    description: 'Manage financial records, prepare reports, and ensure compliance with accounting standards. Support financial planning and budgeting processes.',
    requirements: [
      'Bachelor\'s degree in Accounting or Finance',
      'Professional accounting qualification (ACCA, CIMA, or equivalent)',
      '3+ years of accounting experience',
      'Proficiency in accounting software'
    ]
  },
  {
    id: 6,
    title: 'Sales Representative',
    department: 'Sales',
    location: 'Lusaka, Zambia',
    type: 'Full-time',
    description: 'Build relationships with clients, identify business opportunities, and promote our range of services including construction, logistics, and general supply.',
    requirements: [
      'Bachelor\'s degree in Business or related field',
      '2+ years of B2B sales experience',
      'Excellent communication and negotiation skills',
      'Self-motivated and results-oriented'
    ]
  }
];

const SectionObserver = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const Careers = () => {
    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative h-[60vh] min-h-[400px] bg-black overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070&auto=format&fit=crop"
                        alt="Careers"
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                    <div className="absolute inset-0 flex items-center pt-20 lg:pt-24">
                        <div className="container mx-auto px-4">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading text-white uppercase tracking-tight mb-4">
                                    Careers
                                </h1>
                                <div className="w-24 h-1 bg-primary mb-6"></div>
                                <p className="text-xl text-white/80 max-w-3xl font-light">
                                    Join our team and build your career with a company that values excellence, innovation, and growth.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Why Work With Us */}
                <section className="py-24 md:py-32 bg-white">
                    <div className="container mx-auto px-4">
                        <SectionObserver className="mb-16">
                            <h2 className="text-4xl md:text-6xl font-bold font-heading text-black mb-4 uppercase">
                                Why Work With Us
                            </h2>
                            <div className="w-24 h-1 bg-primary mb-8"></div>
                        </SectionObserver>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Briefcase,
                                    title: 'GROWTH OPPORTUNITIES',
                                    description: 'We invest in our employees\' professional development and provide opportunities for career advancement.'
                                },
                                {
                                    icon: MapPin,
                                    title: 'DIVERSE PROJECTS',
                                    description: 'Work on exciting projects across mining, construction, logistics, and infrastructure development.'
                                },
                                {
                                    icon: Clock,
                                    title: 'WORK LIFE BALANCE',
                                    description: 'We value your time and offer flexible working arrangements where possible.'
                                }
                            ].map((item, index) => (
                                <SectionObserver key={item.title} delay={index * 0.1}>
                                    <div className="p-8 bg-muted/30 hover:bg-muted/50 transition-colors duration-300">
                                        <item.icon className="w-10 h-10 text-primary mb-6" weight="bold" />
                                        <h3 className="text-xl font-bold font-heading text-black mb-4 uppercase tracking-wide">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </SectionObserver>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Job Openings */}
                <section className="py-24 md:py-32 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <SectionObserver className="mb-16">
                            <h2 className="text-4xl md:text-6xl font-bold font-heading text-black mb-4 uppercase">
                                Current Openings
                            </h2>
                            <div className="w-24 h-1 bg-primary mb-8"></div>
                            <p className="text-lg text-gray-600 max-w-2xl">
                                Explore our current job openings and find the perfect opportunity to advance your career.
                            </p>
                        </SectionObserver>

                        <div className="grid md:grid-cols-2 gap-8">
                            {jobOpenings.map((job, index) => (
                                <SectionObserver key={job.id} delay={index * 0.1}>
                                    <div className="bg-white p-8 border border-black/5 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-2xl font-bold font-heading text-black mb-2 uppercase group-hover:text-secondary transition-colors">
                                                    {job.title}
                                                </h3>
                                                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                                                    {job.department}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" weight="fill" />
                                                <span>{job.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4" weight="fill" />
                                                <span>{job.type}</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                            {job.description}
                                        </p>
                                        <div className="mb-6">
                                            <h4 className="text-sm font-bold uppercase tracking-wider text-black mb-3">Key Requirements:</h4>
                                            <ul className="space-y-2">
                                                {job.requirements.map((req, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0"></span>
                                                        <span>{req}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <Link
                                            to="/contact"
                                            className="btn-primary inline-flex items-center gap-2 text-sm group-hover:gap-3 transition-all"
                                        >
                                            Apply Now <ArrowRight className="w-4 h-4" weight="bold" />
                                        </Link>
                                    </div>
                                </SectionObserver>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 bg-primary">
                    <div className="container mx-auto px-4">
                        <SectionObserver className="max-w-3xl">
                            <h2 className="text-4xl md:text-6xl font-bold font-heading text-black mb-6 uppercase">
                                DON'T SEE A MATCH?
                            </h2>
                            <p className="text-xl text-black/80 mb-10 font-light">
                                We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
                            </p>
                            <Link to="/contact" className="inline-block bg-black text-white hover:bg-secondary px-10 py-4 font-bold uppercase tracking-wider text-sm transition-all duration-300">
                                Submit Your Resume
                            </Link>
                        </SectionObserver>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Careers;
