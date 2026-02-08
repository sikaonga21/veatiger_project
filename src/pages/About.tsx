import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle2, Target, Eye, Award } from "lucide-react";
import { Link } from 'react-router-dom';

const values = [
    {
        title: "Client Focus",
        description: "We prioritize our clients and strive to provide them with the best possible solutions and service, tailored to their specific needs."
    },
    {
        title: "Communication",
        description: "We believe in clear and open communication with clients, ensuring that they are kept informed at every stage of a project or transaction."
    },
    {
        title: "Excellence",
        description: "We maintain high standards of quality and performance in all aspects of our business operations, from project delivery to customer service."
    },
    {
        title: "Integrity",
        description: "We conduct ourselves with honesty, transparency, and accountability in all our dealings with clients, partners, and stakeholders."
    },
    {
        title: "Innovation",
        description: "We continuously seek new and innovative ways to improve our products, services, and processes, and stay ahead of the curve."
    },
    {
        title: "Collaboration",
        description: "We foster a culture of teamwork and collaboration, working closely with clients, partners, and colleagues to achieve shared goals."
    }
];

const SectionObserver = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const About = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero Section - Full width image */}
                <section className="relative h-[60vh] min-h-[400px] bg-black overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop"
                        alt="About Veatiger"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                    <div className="absolute inset-0 flex items-center">
                        <div className="container mx-auto px-4">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading text-white uppercase tracking-tight mb-4">About Us</h1>
                                <div className="w-24 h-1 bg-primary"></div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Pull Quote */}
                <section className="py-20 md:py-28 bg-white">
                    <div className="container mx-auto px-4">
                        <SectionObserver className="max-w-5xl mx-auto text-center">
                            <p className="text-2xl md:text-4xl font-light text-black leading-relaxed italic">
                                "Choose Veatiger General Dealers Limited and experience the peace of mind that comes with expert knowledge, meticulous attention to detail, and a commitment to delivering results."
                            </p>
                        </SectionObserver>
                    </div>
                </section>

                {/* Mission / Vision / Heritage */}
                <section className="py-24 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-3 gap-0">
                            {[
                                {
                                    icon: Target,
                                    title: "Our Mission",
                                    text: "To provide innovative and cost-effective solutions, high quality products, and reliable construction management services to our customers through a commitment and a passion for what we do."
                                },
                                {
                                    icon: Eye,
                                    title: "Our Vision",
                                    text: "To become the top choice for clients and employees seeking long term business relationships through exceptional service delivery and market leadership by 2030."
                                },
                                {
                                    icon: Award,
                                    title: "Our Heritage",
                                    text: "Founded in 2012, VEATIGER has evolved into a leader in construction and infrastructure, offering world-class services nationally and internationally."
                                }
                            ].map((item, index) => (
                                <SectionObserver key={item.title}>
                                    <div className={`p-12 h-full ${index === 1 ? 'bg-secondary text-white' : 'bg-white'}`}>
                                        <item.icon className={`w-10 h-10 mb-6 ${index === 1 ? 'text-primary' : 'text-primary'}`} />
                                        <h3 className={`text-2xl font-bold font-heading mb-6 uppercase tracking-wider ${index === 1 ? 'text-white' : 'text-black'}`}>
                                            {item.title}
                                        </h3>
                                        <p className={`leading-relaxed ${index === 1 ? 'text-white/80' : 'text-gray-600'}`}>
                                            {item.text}
                                        </p>
                                    </div>
                                </SectionObserver>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Objective Section - Text + Image */}
                <section className="py-24 md:py-32 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                            <SectionObserver>
                                <h2 className="text-primary font-bold text-sm uppercase tracking-widest mb-3">Our Approach</h2>
                                <h3 className="text-4xl md:text-5xl font-bold font-heading text-black mb-8 uppercase leading-tight">
                                    INTEGRATED SOLUTIONS FOR AFRICA
                                </h3>
                                <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                                    <p>
                                        At VEATIGER GENERAL DEALERS LIMITED, our objective is to effectively manage long-term relationships with our shareholders and customers by providing integrated distribution, product support, and logistics solutions that add value to their businesses.
                                    </p>
                                    <p>
                                        We strive to develop businesses in challenging territories with high-growth prospects and sustain our competitive edge through organic and acquisitive growth.
                                    </p>
                                </div>
                                <Link to="/services" className="btn-primary inline-block mt-10">
                                    Explore Services
                                </Link>
                            </SectionObserver>
                            <SectionObserver>
                                <div className="relative overflow-hidden shadow-2xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop"
                                        alt="Team at work"
                                        className="w-full h-[500px] object-cover"
                                    />
                                </div>
                            </SectionObserver>
                        </div>
                    </div>
                </section>

                {/* Core Values Section - Dark background */}
                <section className="py-24 md:py-32 bg-black">
                    <div className="container mx-auto px-4">
                        <SectionObserver className="mb-16">
                            <h2 className="text-4xl md:text-6xl font-bold font-heading text-white mb-4 uppercase">Our Core Values</h2>
                            <div className="w-24 h-1 bg-primary"></div>
                        </SectionObserver>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
                            {values.map((value, index) => (
                                <SectionObserver key={index}>
                                    <div className="bg-black p-10 h-full group hover:bg-white/5 transition-colors duration-300">
                                        <div className="flex items-start gap-4 mb-4">
                                            <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                                            <h3 className="text-xl font-bold font-heading text-white uppercase tracking-wider">{value.title}</h3>
                                        </div>
                                        <p className="text-gray-400 leading-relaxed pl-10">
                                            {value.description}
                                        </p>
                                    </div>
                                </SectionObserver>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA - Yellow section */}
                <section className="py-24 bg-primary">
                    <div className="container mx-auto px-4">
                        <SectionObserver className="max-w-3xl">
                            <h2 className="text-4xl md:text-6xl font-bold font-heading text-black mb-6 uppercase">
                                READY TO WORK WITH US?
                            </h2>
                            <p className="text-xl text-black/80 mb-10 font-light">
                                Experience professionalism, transparency, and results-driven solutions.
                            </p>
                            <Link to="/contact" className="inline-block bg-black text-white hover:bg-secondary px-10 py-4 font-bold uppercase tracking-wider text-sm transition-all duration-300">
                                Get in Touch
                            </Link>
                        </SectionObserver>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default About;
