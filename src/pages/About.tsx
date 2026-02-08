import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CheckCircle2 } from "lucide-react";

const About = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-secondary text-secondary-foreground py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">About Us</h1>
                        <p className="text-xl max-w-2xl mx-auto text-secondary-foreground/80">
                            Leading the way in integrated distribution and logistics solutions.
                        </p>
                    </div>
                </section>

                {/* Objective Section */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold font-heading text-secondary mb-8 text-center">Our Objective</h2>
                        <div className="max-w-4xl mx-auto text-lg text-muted-foreground leading-relaxed space-y-6">
                            <p>
                                At VEATIGER GENERAL DEALERS LIMITED, our objective is to effectively manage long-term relationships with our shareholders and customers by providing integrated distribution, product support, and logistics solutions that add value to their businesses.
                            </p>
                            <p>
                                We strive to develop businesses in challenging territories with high-growth prospects and sustain our competitive edge through organic and acquisitive growth. Our commitment to leading in empowerment and transformation ensures that we surpass minimum requirements and set the benchmark for the industries in which we operate, ensuring our sustainability into the future.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Core Values Section */}
                <section className="py-16 md:py-24 bg-secondary/5">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold font-heading text-secondary mb-12 text-center">Our Core Values</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Client Focus",
                                    description: "We prioritize our clients and strive to provide them with the best possible solutions and service, tailored to their specific needs."
                                },
                                {
                                    title: "Communication",
                                    description: "We believe in clear and open communication with clients, ensuring that they are kept informed at every stage of a project or transaction, and that their feedback and input is valued and incorporated into our decision-making process."
                                },
                                {
                                    title: "Excellence",
                                    description: "We maintain high standards of quality and performance in all aspects of our business operations, from project delivery to customer service."
                                },
                                {
                                    title: "Integrity",
                                    description: "We conduct ourselves with honesty, transparency, and accountability in all our dealings with clients, partners, and stakeholders"
                                },
                                {
                                    title: "Innovation",
                                    description: "We continuously seek new and innovative ways to improve our products, services, and processes, and stay ahead of the curve in a rapidly evolving industry."
                                },
                                {
                                    title: "Collaboration",
                                    description: "We foster a culture of teamwork and collaboration, working closely with clients, partners, and colleagues to achieve shared goals and objectives."
                                }
                            ].map((value, index) => (
                                <div key={index} className="bg-background p-8 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <CheckCircle2 className="w-6 h-6 text-primary" />
                                        <h3 className="text-xl font-bold font-heading text-secondary">{value.title}</h3>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default About;
