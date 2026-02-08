import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Phone, Mail, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

const Contact = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative h-[50vh] min-h-[350px] bg-black overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                        alt="Contact Us"
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                    <div className="absolute inset-0 flex items-center">
                        <div className="container mx-auto px-4">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading text-white uppercase tracking-tight mb-4">Contact Us</h1>
                                <div className="w-24 h-1 bg-primary mb-6"></div>
                                <p className="text-xl text-white/80 max-w-2xl font-light">
                                    Get in touch for inquiries, partnerships, or support.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className="py-24 md:py-32 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

                            {/* Contact Information */}
                            <div>
                                <SectionObserver>
                                    <h2 className="text-primary font-bold text-sm uppercase tracking-widest mb-3">Our Offices</h2>
                                    <h3 className="text-4xl md:text-5xl font-bold font-heading text-black mb-6 uppercase">VISIT US</h3>
                                    <div className="w-16 h-1 bg-primary mb-8"></div>
                                    <p className="text-gray-500 mb-12 text-lg">
                                        Visit us at one of our locations or contact us via phone or email.
                                    </p>
                                </SectionObserver>

                                <div className="space-y-8">
                                    {/* Head Office */}
                                    <SectionObserver>
                                        <div className="p-8 bg-muted/50 border-l-4 border-primary hover:bg-muted transition-colors duration-300">
                                            <h3 className="text-xl font-bold font-heading text-black mb-4 flex items-center gap-3 uppercase">
                                                <Building className="w-5 h-5 text-primary" /> Head Office
                                            </h3>
                                            <div className="space-y-3 text-gray-600 pl-8">
                                                <p className="flex items-start gap-3">
                                                    <MapPin className="w-4 h-4 mt-1 shrink-0 text-primary" />
                                                    <span>Plot No. 251 Ngwerere Rd.<br />Longacres - Lusaka</span>
                                                </p>
                                                <p className="flex items-center gap-3">
                                                    <Phone className="w-4 h-4 text-primary" />
                                                    +260 95 6431291 / +260 96 3627768
                                                </p>
                                                <p className="flex items-center gap-3">
                                                    <Mail className="w-4 h-4 text-primary" />
                                                    info@veatiger.com
                                                </p>
                                            </div>
                                        </div>
                                    </SectionObserver>

                                    {/* Branch Office */}
                                    <SectionObserver>
                                        <div className="p-8 bg-muted/50 border-l-4 border-primary hover:bg-muted transition-colors duration-300">
                                            <h3 className="text-xl font-bold font-heading text-black mb-4 flex items-center gap-3 uppercase">
                                                <Building className="w-5 h-5 text-primary" /> Branch Office
                                            </h3>
                                            <div className="space-y-3 text-gray-600 pl-8">
                                                <p className="flex items-start gap-3">
                                                    <MapPin className="w-4 h-4 mt-1 shrink-0 text-primary" />
                                                    <span>Plot No 162/10 Farmers Junction<br />Off Kafues Road - Lusaka</span>
                                                </p>
                                                <p className="flex items-center gap-3">
                                                    <Phone className="w-4 h-4 text-primary" />
                                                    +260 963 627768
                                                </p>
                                                <p className="flex items-center gap-3">
                                                    <Mail className="w-4 h-4 text-primary" />
                                                    info@veatiger.com
                                                </p>
                                            </div>
                                        </div>
                                    </SectionObserver>

                                    {/* Copperbelt Office */}
                                    <SectionObserver>
                                        <div className="p-8 bg-muted/50 border-l-4 border-primary hover:bg-muted transition-colors duration-300">
                                            <h3 className="text-xl font-bold font-heading text-black mb-4 flex items-center gap-3 uppercase">
                                                <Building className="w-5 h-5 text-primary" /> Copperbelt Office
                                            </h3>
                                            <div className="space-y-3 text-gray-600 pl-8">
                                                <p className="flex items-start gap-3">
                                                    <MapPin className="w-4 h-4 mt-1 shrink-0 text-primary" />
                                                    <span>ECL Business Park, Office Block 2, Second Floor<br />Freedom Way - Kitwe</span>
                                                </p>
                                                <p className="flex items-center gap-3">
                                                    <Mail className="w-4 h-4 text-primary" />
                                                    mining@veatiger.com
                                                </p>
                                            </div>
                                        </div>
                                    </SectionObserver>
                                </div>
                            </div>

                            {/* Map and Form */}
                            <div className="space-y-10">
                                {/* Map */}
                                <SectionObserver>
                                    <div className="overflow-hidden shadow-lg h-[350px] relative">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            loading="lazy"
                                            allowFullScreen
                                            src="https://maps.google.com/maps?q=Ngwerere+Rd,+Lusaka,+Zambia&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                            title="Veatiger Head Office Map"
                                        ></iframe>
                                    </div>
                                </SectionObserver>

                                {/* Contact Form */}
                                <SectionObserver>
                                    <div className="bg-black p-10">
                                        <h2 className="text-2xl font-bold font-heading text-white mb-2 uppercase">Send us a Message</h2>
                                        <div className="w-12 h-1 bg-primary mb-8"></div>
                                        <form className="space-y-5">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-white/60 uppercase tracking-wide">Name</label>
                                                    <Input placeholder="Your Name" className="bg-white/10 border-white/20 text-white placeholder:text-white/30 rounded-none focus:border-primary" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-white/60 uppercase tracking-wide">Email</label>
                                                    <Input type="email" placeholder="Your Email" className="bg-white/10 border-white/20 text-white placeholder:text-white/30 rounded-none focus:border-primary" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-white/60 uppercase tracking-wide">Subject</label>
                                                <Input placeholder="Subject" className="bg-white/10 border-white/20 text-white placeholder:text-white/30 rounded-none focus:border-primary" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-white/60 uppercase tracking-wide">Message</label>
                                                <Textarea placeholder="Your Message" className="bg-white/10 border-white/20 text-white placeholder:text-white/30 rounded-none focus:border-primary min-h-[140px]" />
                                            </div>
                                            <Button className="w-full bg-primary text-black hover:bg-primary/90 font-bold uppercase tracking-wider py-6 rounded-none text-base">
                                                Send Message
                                            </Button>
                                        </form>
                                    </div>
                                </SectionObserver>
                            </div>

                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Contact;
