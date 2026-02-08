import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MapPin, Phone, Mail, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
    return (
        <div className="min-h-screen flex flex-col bg-muted/10">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-secondary text-secondary-foreground py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Contact Us</h1>
                        <p className="text-xl max-w-2xl mx-auto text-secondary-foreground/80">
                            Get in touch with us for inquiries, partnerships, or support.
                        </p>
                    </div>
                </section>

                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12">

                            {/* Contact Information */}
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-3xl font-bold font-heading text-secondary mb-6">Our Offices</h2>
                                    <p className="text-muted-foreground mb-8">
                                        Visit us at one of our locations or contact us via phone or email.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    {/* Head Office */}
                                    <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
                                        <h3 className="text-xl font-bold font-heading text-secondary mb-4 flex items-center gap-2">
                                            <Building className="w-5 h-5 text-primary" /> Head Office
                                        </h3>
                                        <div className="space-y-3 text-muted-foreground pl-7">
                                            <p className="flex items-start gap-2">
                                                <MapPin className="w-4 h-4 mt-1 shrink-0" />
                                                <span>Plot No. 251 Ngwerere Rd.<br />Longacres - Lusaka</span>
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <Phone className="w-4 h-4" />
                                                +260 95 6431291 / +260 96 3627768
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <Mail className="w-4 h-4" />
                                                info@veatiger.com
                                            </p>
                                        </div>
                                    </div>

                                    {/* Branch Office */}
                                    <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
                                        <h3 className="text-xl font-bold font-heading text-secondary mb-4 flex items-center gap-2">
                                            <Building className="w-5 h-5 text-primary" /> Branch Office
                                        </h3>
                                        <div className="space-y-3 text-muted-foreground pl-7">
                                            <p className="flex items-start gap-2">
                                                <MapPin className="w-4 h-4 mt-1 shrink-0" />
                                                <span>Plot No 162/10 Farmers Junction<br />Off Kafues Road - Lusaka</span>
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <Phone className="w-4 h-4" />
                                                +260 963 627768
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <Mail className="w-4 h-4" />
                                                info@veatiger.com
                                            </p>
                                        </div>
                                    </div>

                                    {/* Copperbelt Office */}
                                    <div className="bg-background p-6 rounded-lg border border-border shadow-sm">
                                        <h3 className="text-xl font-bold font-heading text-secondary mb-4 flex items-center gap-2">
                                            <Building className="w-5 h-5 text-primary" /> Copperbelt Office
                                        </h3>
                                        <div className="space-y-3 text-muted-foreground pl-7">
                                            <p className="flex items-start gap-2">
                                                <MapPin className="w-4 h-4 mt-1 shrink-0" />
                                                <span>ECL Business Park, Office Block 2, Second Floor<br />Freedom Way - Kitwe</span>
                                            </p>
                                            <p className="flex items-center gap-2">
                                                <Mail className="w-4 h-4" />
                                                mining@veatiger.com
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map and Form */}
                            <div className="space-y-8">
                                {/* Map */}
                                <div className="bg-background rounded-lg border border-border shadow-sm overflow-hidden h-[300px] relative">
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

                                {/* Contact Form */}
                                <div className="bg-background p-8 rounded-lg border border-border shadow-sm">
                                    <h2 className="text-2xl font-bold font-heading text-secondary mb-6">Send us a Message</h2>
                                    <form className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Name</label>
                                                <Input placeholder="Your Name" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Email</label>
                                                <Input type="email" placeholder="Your Email" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Subject</label>
                                            <Input placeholder="Subject" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Message</label>
                                            <Textarea placeholder="Your Message" className="min-h-[120px]" />
                                        </div>
                                        <Button className="w-full font-bold">Send Message</Button>
                                    </form>
                                </div>
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
