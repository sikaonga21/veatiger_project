import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Calendar, Buildings } from "phosphor-react";

const projects = [
    {
        category: "Large Scale Initiatives",
        period: "2016–Present",
        description: "Major engineering contracts and logistics services for key institutions.",
        items: [
            { name: "ZESCO and Zambia Army", year: "2016–2018", type: "Government/Utility" },
            { name: "Aman Shaffan", year: "2016–2018", type: "Construction" },
            { name: "JAE Engineering", year: "Ongoing", type: "Engineering" },
            { name: "IRS Cargo", year: "2017–2018", type: "Logistics" },
            { name: "Ministry of Government", year: "2018", type: "Government" },
            { name: "LEON Engineering", year: "2018–2019", type: "Engineering" },
        ]
    },

    {
        category: "Expansion",
        period: "2012–2017",
        description: "Corporate partnerships and infrastructure support across Zambia.",
        items: [
            { name: "Hazida Distributors", year: "2012", type: "Distribution" },
            { name: "Airtel Investments", year: "2012", type: "Commercial" },
            { name: "RDA/ZPPA/CE/011/12", year: "2012", type: "Infrastructure" },
            { name: "Royal (Crocodile) Enterprises", year: "2015–2016", type: "Commercial" },
            { name: "Market Farm Company", year: "2017", type: "Agriculture" },
        ]
    },
    {
        category: "Early Works",
        period: "2009–2012",
        description: "Foundational projects and long-term engagements that established our reputation.",
        items: [
            { name: "Chacha Park Lodge", year: "2009–2010", type: "Hospitality" },
            { name: "Kingfisher Lodge", year: "2009–2011", type: "Hospitality" },
            { name: "Modern Press and Zambia Sugar", year: "2009–2012", type: "Industrial" },
            { name: "Ministry of Science and Technology", year: "2010", type: "Government" },
            { name: "Germany Embassy", year: "2010–2011", type: "Diplomatic" },
        ]
    }
   
];

const SectionObserver = ({ children, className = "", delay = 0, direction = "left" }: { children: React.ReactNode; className?: string; delay?: number; direction?: "left" | "right" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const xOffset = direction === "left" ? -60 : 60;
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: xOffset }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const Projects = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative h-[60vh] min-h-[400px] bg-black overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop"
                        alt="Our Projects"
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
                                <Badge className="mb-6 bg-primary text-black hover:bg-primary/90 text-sm py-1.5 px-5 font-bold uppercase tracking-wider rounded-none">
                                    Since 2009
                                </Badge>
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading text-white uppercase tracking-tight mb-4">
                                    Our Projects
                                </h1>
                                <div className="w-24 h-1 bg-primary mb-6"></div>
                                <p className="text-xl text-white/80 max-w-3xl font-light">
                                    A decade of excellence in delivering reliable, high-quality services across Zambia.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Timeline/Portfolio Sections */}
                {projects.map((group, gIndex) => (
                    <section key={gIndex} className={`py-24 overflow-hidden ${gIndex % 2 === 1 ? 'bg-muted/30' : 'bg-white'}`}>
                        <div className="container mx-auto px-4">
                            <SectionObserver>
                                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12 pb-6 border-b-2 border-black/10">
                                    <div>
                                        <h2 className="text-4xl md:text-5xl font-bold font-heading text-black uppercase">{group.category}</h2>
                                        <p className="text-gray-500 mt-2 text-lg">{group.description}</p>
                                    </div>
                                    <span className="text-3xl font-bold font-heading text-primary whitespace-nowrap">
                                        {group.period}
                                    </span>
                                </div>
                            </SectionObserver>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {group.items.map((project, pIndex) => (
                                    <SectionObserver key={pIndex} delay={pIndex * 0.1} direction={pIndex % 2 === 0 ? "left" : "right"}>
                                        <div className="group overflow-hidden border border-black/5 hover:border-primary/50 transition-all duration-300 bg-white hover:shadow-lg">
                                            <div className="h-48 bg-secondary/5 relative flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
                                                <Buildings className="w-12 h-12 text-secondary/20 group-hover:text-primary/60 transition-colors duration-300" weight="bold" />
                                            </div>
                                            <div className="p-6">
                                                <div className="flex justify-between items-start mb-3">
                                                    <span className="text-xs font-bold uppercase tracking-widest text-primary">
                                                        {project.type}
                                                    </span>
                                                    <div className="flex items-center text-xs text-gray-400">
                                                        <Calendar className="w-3 h-3 mr-1" />
                                                        {project.year}
                                                    </div>
                                                </div>
                                                <h3 className="text-lg font-bold text-black uppercase group-hover:text-secondary transition-colors" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                                    {project.name}
                                                </h3>
                                            </div>
                                        </div>
                                    </SectionObserver>
                                ))}
                            </div>
                        </div>
                    </section>
                ))}

                {/* CTA */}
                <section className="py-24 bg-primary overflow-hidden">
                    <div className="container mx-auto px-4">
                        <SectionObserver className="max-w-3xl" direction="left">
                            <h2 className="text-4xl md:text-6xl font-bold font-heading text-black mb-6 uppercase">
                                HAVE A PROJECT IN MIND?
                            </h2>
                            <p className="text-xl text-black/80 mb-10 font-light">
                                Partner with Veatiger and experience reliable project delivery backed by over a decade of proven results.
                            </p>
                            <Link to="/contact" className="inline-block bg-black text-white hover:bg-secondary px-10 py-4 font-bold uppercase tracking-wider text-sm transition-all duration-300">
                                Start a Conversation
                            </Link>
                        </SectionObserver>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Projects;
