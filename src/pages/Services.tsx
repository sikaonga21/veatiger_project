import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Mountains, Wall, GearSix, ShoppingCart, ForkKnife, Wrench, ArrowRight } from "phosphor-react";

const services = [
    {
        title: "Mining",
        icon: Mountains,
        description: "Veatiger General Dealers is well-positioned to support Zambia's mining sector through a range of reliable and cost-effective services. With years of experience supplying industrial materials, engineering support, and logistics solutions to both government and private entities, we bring proven capability and efficiency to mining operations. Backed by a strong supply chain network and commitment to compliance and safety standards, Veatiger is a trusted partner in the mining industry.",
        image: "/melting.jpg"
    },
    {
        title: "Transport and Logistics",
        icon: Truck,
        description: "In the transport and logistics business, VEATIGER boasts of a well-maintained fleet of 72 trucks, including long haul tri-axle trailers that are registered for container transportation with reputable companies such as Mediterranean Shipping Company (MSC), SAFMARIME, and Maersk. In addition, the company has a fleet of 4 x 7 tonners' trucks that complement the larger fleet by handling smaller consignments into the depot for consolidation and onward loading onto bigger trucks, ensuring efficient and timely deliveries to final destinations.",
        image: "/trucks.jpeg"
    },
    {
        title: "Building Construction",
        icon: Wall,
        description: "Our construction division delivers quality building projects for residential, commercial, and industrial clients. We bring expertise in project management, material sourcing, and skilled labour to every project, ensuring on-time delivery and exceptional workmanship.",
        image: "/const.jpeg"
    },
    {
        title: "Civil Engineering",
        icon: GearSix,
        description: "Our company provides civil engineering services to clients in various sectors, including mining, oil and gas, and power generation. Our team of experts offers design, engineering, and project management services for civil engineering projects, including earthworks, concrete works, and structural steel works.",
        image: "/C-engi.jpeg"
    },
    {
        title: "General Supply",
        icon: ShoppingCart,
        description: "We recognize the critical role that reliable office supplies, office equipment, and cleaning materials play in the day-to-day operations of any business. Our Office Supplies and Services are designed to enhance efficiency, productivity, and cleanliness in workplaces of all sizes. We offer a wide selection of high-quality stationery, office equipment, and cleaning tools, ensuring your business has everything it needs to function smoothly and maintain a professional environment.",
        image: "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?q=80&w=2070&auto=format&fit=crop"
    },
    {
        title: "Hardware Supplies",
        icon: Wrench,
        description: "We offer essential construction materials including cement, sand, bricks, and tiles for both small and large projects. Our products are sourced from reliable suppliers to ensure quality and durability. Our plumbing supplies include pipes, faucets, fittings, and plumbing tools. These high-quality products are perfect for installations, repairs, and maintenance of water and gas systems. We also provide electrical supplies such as wires, cables, circuit breakers, and lighting fixtures.",
        image: "/hardware.jpeg"
    },
    {
        title: "Food Supplies",
        icon: ForkKnife,
        description: "We offer a variety of grains and dry foods, including maize, rice, beans, and groundnuts. These staple items provide essential nutrition and energy for meals. Our fresh produce includes a wide range of vegetables such as onions, potatoes, tomatoes, and cabbages, as well as fruits like bananas, apples, and oranges. We supply a selection of fresh meat and meat products, including beef, chicken, sausages, and processed meats, and fish providing high-quality protein for your meals.",
        image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=2070&auto=format&fit=crop"
    }
];

const ServiceItem = ({ service, index }: { service: typeof services[0]; index: number }) => {
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
                        <div className="flex items-center gap-4 mb-6">
                            <service.icon className="w-8 h-8 text-primary" weight="bold" />
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-black uppercase leading-tight">
                                {service.title}
                            </h2>
                        </div>
                        <div className="w-16 h-1 bg-primary mb-8"></div>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            {service.description}
                        </p>
                        <Link to="/contact" className="btn-primary inline-flex items-center gap-2 text-sm">
                            Request a Quote <ArrowRight className="w-4 h-4" weight="bold" />
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
                                src={service.image}
                                alt={service.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

const Services = () => {
    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative h-[60vh] min-h-[400px] bg-black overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop"
                        alt="Our Services"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                    <div className="absolute inset-0 flex items-center pt-20 lg:pt-24">
                        <div className="container mx-auto px-4">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading text-white uppercase tracking-tight mb-4">Our Services</h1>
                                <div className="w-24 h-1 bg-primary mb-6"></div>
                                <p className="text-xl text-white/80 max-w-3xl font-light">
                                    Providing comprehensive solutions in transport, logistics, mining, civil engineering, and construction across Southern Africa.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Services - Alternating layout with images */}
                {services.map((service, index) => (
                    <ServiceItem key={service.title} service={service} index={index} />
                ))}

                {/* CTA */}
                <section className="py-24 bg-primary">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl md:text-6xl font-bold font-heading text-black mb-6 uppercase">
                            LET US BUILD TOGETHER
                        </h2>
                        <p className="text-xl text-black/80 mb-10 font-light max-w-2xl">
                            Whatever your project requirements, we have the experience and capability to deliver results.
                        </p>
                        <Link to="/contact" className="inline-block bg-black text-white hover:bg-secondary px-10 py-4 font-bold uppercase tracking-wider text-sm transition-all duration-300">
                            Start a Conversation
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Services;
