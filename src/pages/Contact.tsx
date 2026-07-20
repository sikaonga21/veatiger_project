import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { MapPin, Phone, Envelope, Buildings, CheckCircle } from "phosphor-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContactMutation } from '@/hooks/useApi';
import { useToast } from '@/components/ui/use-toast';

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
    const { toast } = useToast();
    const sendMessage = useContactMutation();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            toast({ title: 'Missing fields', description: 'Please fill in all required fields.', variant: 'destructive' });
            return;
        }

        setIsSubmitting(true);
        try {
            await sendMessage.mutateAsync(formData);
            
            const to = 'mining@veatiger.co.zm';
            const cc = 'construction@veatiger.co.zm,infor@veatiger.co.zm';
            const subject = encodeURIComponent(formData.subject || 'New Contact Form Submission');
            const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
            window.location.href = `mailto:${to}?cc=${cc}&subject=${subject}&body=${body}`;

            setSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            toast({ title: 'Message Sent!', description: 'Your email client has been opened.' });
        } catch (err: any) {
            toast({
                title: 'Send Failed',
                description: err?.message || 'Could not send your message. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative h-[50vh] min-h-[350px] bg-black overflow-hidden">
                    <img
                        src="contactus.jpg"
                        alt="Contact Us"
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
                                    <h2 className="text-secondary font-bold text-sm uppercase tracking-widest mb-3">Our Offices</h2>
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
                                                <Buildings className="w-5 h-5 text-primary" weight="bold" /> Head Office
                                            </h3>
                                            <div className="space-y-3 text-gray-600 pl-8">
                                                <p className="flex items-start gap-3">
                                                    <MapPin className="w-4 h-4 mt-1 shrink-0 text-primary" />
                                                    <span>  Ground Floor of Saturnia House.<br />Longacres - Chisidza Cres Rd - Lusaka</span>
                                                </p>
                                                <p className="flex items-center gap-3">
                                                    <Phone className="w-4 h-4 text-primary" />
                                                    +260 95 6431291 / +260 96 3627768
                                                </p>
                                                <div className="flex items-start gap-3">
                                                    <Envelope className="w-4 h-4 text-primary shrink-0 mt-1" />
                                                    <div className="flex flex-col">
                                                        <span>info@veatiger.co.zm</span>
                                                        <span>sale@veatiger.co.zm</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SectionObserver>

                                    {/* Branch Office */}
                                    <SectionObserver>
                                        <div className="p-8 bg-muted/50 border-l-4 border-primary hover:bg-muted transition-colors duration-300">
                                            <h3 className="text-xl font-bold font-heading text-black mb-4 flex items-center gap-3 uppercase">
                                                <Buildings className="w-5 h-5 text-primary" weight="bold" /> Branch Office
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
                                                    <Envelope className="w-4 h-4 text-primary" weight="fill" />
                                                    construction@veatiger.co.zm
                                                </p>
                                            </div>
                                        </div>
                                    </SectionObserver>

                                    {/* Copperbelt Office */}
                                    <SectionObserver>
                                        <div className="p-8 bg-muted/50 border-l-4 border-primary hover:bg-muted transition-colors duration-300">
                                            <h3 className="text-xl font-bold font-heading text-black mb-4 flex items-center gap-3 uppercase">
                                                <Buildings className="w-5 h-5 text-primary" weight="bold" /> Copperbelt Office
                                            </h3>
                                            <div className="space-y-3 text-gray-600 pl-8">
                                                <p className="flex items-start gap-3">
                                                    <MapPin className="w-4 h-4 mt-1 shrink-0 text-primary" />
                                                    <span>ECL Business Park, Office Block 2, Second Floor<br />Freedom Way - Kitwe</span>
                                                </p>
                                                <p className="flex items-center gap-3">
                                                    <Envelope className="w-4 h-4 text-primary" weight="fill" />
                                                    mining@veatiger.co.zm
                                                </p>
                                            </div>
                                        </div>
                                    </SectionObserver>

                                    {/* Ndola Office */}
                                    <SectionObserver>
                                        <div className="p-8 bg-muted/50 border-l-4 border-primary hover:bg-muted transition-colors duration-300">
                                            <h3 className="text-xl font-bold font-heading text-black mb-4 flex items-center gap-3 uppercase">
                                                <Buildings className="w-5 h-5 text-primary" weight="bold" /> Ndola Office
                                            </h3>
                                            <div className="space-y-3 text-gray-600 pl-8">
                                                <p className="flex items-start gap-3">
                                                    <MapPin className="w-4 h-4 mt-1 shrink-0 text-primary" />
                                                    <span>37 Cross Crescent, Kansenshi<br />Ndola, Zambia</span>
                                                </p>
                                                <p className="flex items-center gap-3">
                                                    <Envelope className="w-4 h-4 text-primary" weight="fill" />
                                                    construction@veatiger.co.zm
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
                                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d762.8207588198898!2d28.31568513263716!3d-15.419256801238152!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19408d2758885fc3%3A0x3021638e3ea0bf7!2sVeatiger%20General%20Dealers%20Limited!5e1!3m2!1sen!2szm!4v1784136441543!5m2!1sen!2szm"
                                            title="Veatiger Head Office Map"
                                        ></iframe>
                                    </div>
                                </SectionObserver>

                                {/* Contact Form */}
                                <SectionObserver>
                                    <div className="bg-black p-10">
                                        <h2 className="text-2xl font-bold font-heading text-white mb-2 uppercase">Send us a Message</h2>
                                        <div className="w-12 h-1 bg-primary mb-8"></div>

                                        {submitted ? (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="flex flex-col items-center justify-center py-12 text-center"
                                            >
                                                <CheckCircle className="w-16 h-16 text-primary mb-4" weight="fill" />
                                                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                                                <p className="text-white/60 mb-6">Thank you for reaching out. We'll get back to you shortly.</p>
                                                <button
                                                    onClick={() => setSubmitted(false)}
                                                    className="text-primary text-sm uppercase font-bold tracking-widest hover:underline"
                                                >
                                                    Send another message
                                                </button>
                                            </motion.div>
                                        ) : (
                                            <form onSubmit={handleSubmit} className="space-y-5">
                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium text-white/60 uppercase tracking-wide">Name *</label>
                                                        <Input
                                                            name="name"
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                            placeholder="Your Name"
                                                            className="bg-white/10 border-white/20 text-white placeholder:text-white/30 rounded-none focus:border-primary"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-medium text-white/60 uppercase tracking-wide">Email *</label>
                                                        <Input
                                                            name="email"
                                                            type="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            placeholder="Your Email"
                                                            className="bg-white/10 border-white/20 text-white placeholder:text-white/30 rounded-none focus:border-primary"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-white/60 uppercase tracking-wide">Subject</label>
                                                    <Input
                                                        name="subject"
                                                        value={formData.subject}
                                                        onChange={handleChange}
                                                        placeholder="Subject"
                                                        className="bg-white/10 border-white/20 text-white placeholder:text-white/30 rounded-none focus:border-primary"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-white/60 uppercase tracking-wide">Message *</label>
                                                    <Textarea
                                                        name="message"
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        placeholder="Your Message"
                                                        className="bg-white/10 border-white/20 text-white placeholder:text-white/30 rounded-none focus:border-primary min-h-[140px]"
                                                        required
                                                    />
                                                </div>
                                                <Button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full bg-primary text-black hover:bg-primary/90 font-bold uppercase tracking-wider py-6 rounded-none text-base"
                                                >
                                                    {isSubmitting ? (
                                                        <span className="flex items-center gap-2">
                                                            <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                                            Sending...
                                                        </span>
                                                    ) : 'Send Message'}
                                                </Button>
                                            </form>
                                        )}
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
