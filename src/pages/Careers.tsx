import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, MapPin, Clock, ArrowRight } from 'phosphor-react';
import { useCareerQuery } from '@/hooks/useApi';

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
    // Fetch careers from Supabase
    const { data: careers = [], isLoading, error } = useCareerQuery();

    // Filter only active careers
    const activeCareers = careers.filter((job: any) => job.status === 'active');

    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative h-[60vh] min-h-[400px] bg-black overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                        alt="Careers at Veatiger"
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
                                    Join Us
                                </h1>
                                <div className="w-24 h-1 bg-primary mb-6"></div>
                                <p className="text-xl text-white/80 max-w-3xl font-light">
                                    Build your career with Veatiger. We're always looking for talented individuals to join our growing team.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>



                {/* Current Openings */}
                <section className="py-24 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <SectionObserver className="mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold font-heading text-black uppercase mb-4">
                                Current Openings
                            </h2>
                            <div className="w-24 h-1 bg-primary"></div>
                        </SectionObserver>

                        {isLoading ? (
                            <div className="text-center py-12">
                                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-gray-600">Loading open positions...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-12">
                                <p className="text-red-500">Failed to load job openings. Please try again later.</p>
                            </div>
                        ) : activeCareers.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-600 text-lg">No current openings. Please check back later.</p>
                            </div>
                        ) : (
                            <div className="grid gap-6">
                                {activeCareers.map((job: any, index: number) => (
                                    <SectionObserver key={job.id} delay={index * 0.1}>
                                        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="text-2xl font-bold font-heading text-black group-hover:text-primary transition-colors">
                                                            {job.title}
                                                        </h3>
                                                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-full">
                                                            {job.department}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                                                        <div className="flex items-center gap-1">
                                                            <MapPin className="w-4 h-4 text-primary" weight="fill" />
                                                            <span>{job.location}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="w-4 h-4 text-primary" weight="fill" />
                                                            <span>{job.type}</span>
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                                        {job.description}
                                                    </p>
                                                    {job.requirements && job.requirements.length > 0 && (
                                                        <div className="flex flex-wrap gap-2">
                                                            {job.requirements.slice(0, 3).map((req: string, i: number) => (
                                                                <span key={i} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded border border-gray-100">
                                                                    {req}
                                                                </span>
                                                            ))}
                                                            {job.requirements.length > 3 && (
                                                                <span className="text-xs text-gray-400 px-2 py-1">
                                                                    +{job.requirements.length - 3} more
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex items-center">
                                                    <a
                                                        href={`mailto:careers@veatiger.com?subject=Application for ${job.title}`}
                                                        className="btn-primary whitespace-nowrap"
                                                    >
                                                        Apply Now
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </SectionObserver>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* General Application */}
                <section className="py-24 bg-primary text-black">
                    <div className="container mx-auto px-4 text-center">
                        <SectionObserver className="max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6 uppercase">
                                DONT SEE A MATCH?
                            </h2>
                            <p className="text-xl mb-10 font-light opacity-90">
                                We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
                            </p>
                            <a
                                href="mailto:careers@veatiger.com?subject=General Application"
                                className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-gray-900 transition-colors"
                            >
                                Email Your Resume <ArrowRight className="w-5 h-5" weight="bold" />
                            </a>
                        </SectionObserver>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Careers;
