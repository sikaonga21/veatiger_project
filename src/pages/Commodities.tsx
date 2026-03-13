import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe } from "phosphor-react";

const commodities = [
    {
        title: "Chrome Concentrate",
        region: "South Africa",
        description: "We facilitate chrome concentrate transactions between verified suppliers and buyers across South Africa. Our deep market knowledge and established networks ensure smooth, compliant, and timely deals for all parties involved.",
        image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=2070&auto=format&fit=crop",
    },
    {
        title: "Diesel & Petrol",
        region: "South Africa & Mozambique",
        description: "Acting as a trusted intermediary, we connect diesel and petrol suppliers and buyers operating across South Africa and Mozambique. Our tankers are fitted with emergency shut-off valves and fire suppression systems, and undergo regular inspections to ensure compliance with industry safety standards. We handle logistics coordination and documentation to ensure efficient and compliant fuel trade.",
        image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=2070&auto=format&fit=crop",
    },
    {
        title: "Coal",
        region: "South Africa",
        description: "We source and facilitate the buying and selling of coal across South Africa. Whether for industrial, power generation, or export purposes, we connect serious buyers with credible coal suppliers.",
        image: "https://images.unsplash.com/photo-1569880153113-76161035d269?q=80&w=2070&auto=format&fit=crop",
    },
    {
        title: "Manganese",
        region: "Zambia & Tanzania",
        description: "We facilitate manganese ore and alloy transactions between suppliers and buyers in Zambia and Tanzania. Our local presence in both markets gives us a competitive advantage in facilitating seamless deals.",
        image: "https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?q=80&w=2070&auto=format&fit=crop",
    },
    {
        title: "Gold",
        region: "All over Africa",
        description: "We facilitate gold trade across the African continent, connecting licensed suppliers with verified international and local buyers. All transactions are handled with the highest standards of compliance and confidentiality.",
        image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=2070&auto=format&fit=crop",
    },
    {
        title: "Diamonds",
        region: "All over Africa",
        description: "Operating across the African continent, we facilitate diamond transactions between certified suppliers and qualified buyers. We ensure full regulatory compliance and transparent deal facilitation at every stage.",
        image: "https://images.unsplash.com/photo-1615655406736-b37892a30a12?q=80&w=2070&auto=format&fit=crop",
    },
    {
        title: "Copper — Cathode, Millberry & Blister",
        region: "All over Africa and Europe",
        description: "We have extensive experience facilitating copper transactions — including cathode, millberry, and blister copper — across Africa and into European markets. Our connections span mining regions, smelters, and international buyers.",
        image: "/melting.jpg",
    },
];

const CommodityItem = ({ commodity, index }: { commodity: typeof commodities[0]; index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const reverse = index % 2 === 1;

    return (
        <div ref={ref} className={`py-20 md:py-24 ${reverse ? 'bg-muted/30' : 'bg-white'} overflow-hidden`}>
            <div className="container mx-auto px-4">
                <div className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Text */}
                    <motion.div
                        className="flex-1"
                        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <Globe className="w-5 h-5 text-secondary" weight="bold" />
                            <span className="text-secondary font-bold text-sm uppercase tracking-widest">{commodity.region}</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-black uppercase leading-tight mb-6">
                            {commodity.title}
                        </h2>
                        <div className="w-16 h-1 bg-primary mb-8"></div>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            {commodity.description}
                        </p>
                        <Link to="/contact" className="btn-primary inline-flex items-center gap-2 text-sm">
                            Enquire Now <ArrowRight className="w-4 h-4" weight="bold" />
                        </Link>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        className="flex-1 w-full"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="relative overflow-hidden shadow-2xl aspect-[4/3]">
                            <img
                                src={commodity.image}
                                alt={commodity.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const Commodities = () => {
    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden">
            <Header />
            <main className="flex-1">
                {/* Hero */}
                <section className="relative h-[60vh] min-h-[400px] bg-black overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?q=80&w=2070&auto=format&fit=crop"
                        alt="Commodities"
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-0 flex items-center pt-20 lg:pt-24">
                        <div className="container mx-auto px-4">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading text-white uppercase tracking-tight mb-4">
                                    Commodities
                                </h1>
                                <div className="w-24 h-1 bg-primary mb-6"></div>
                                <p className="text-xl text-white/80 max-w-3xl font-light">
                                    Facilitating the buying and selling of key commodities between trusted suppliers and buyers across Africa and beyond.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Intro */}
                <section className="py-16 bg-secondary text-white">
                    <div className="container mx-auto px-4 text-center max-w-4xl">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            className="text-xl md:text-2xl font-light leading-relaxed"
                        >
                            Veatiger General Dealers acts as a reliable bridge between commodity suppliers and buyers, ensuring transparent, compliant, and efficient transactions across multiple markets.
                        </motion.p>
                    </div>
                </section>

                {/* Commodity Items */}
                {commodities.map((commodity, index) => (
                    <CommodityItem key={commodity.title} commodity={commodity} index={index} />
                ))}

                {/* CTA */}
                <section className="py-24 bg-primary">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl md:text-6xl font-bold font-heading text-black mb-6 uppercase">
                            LOOKING TO BUY OR SELL?
                        </h2>
                        <p className="text-xl text-black/80 mb-10 font-light max-w-2xl">
                            Reach out and let us connect you with the right partners for your commodity needs.
                        </p>
                        <Link to="/contact" className="inline-block bg-black text-white hover:bg-secondary px-10 py-4 font-bold uppercase tracking-wider text-sm transition-all duration-300">
                            Get in Touch
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Commodities;
