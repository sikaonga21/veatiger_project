import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Truck, Pickaxe, Hammer, HardHat, ShoppingCart, Utensils, Wrench } from "lucide-react";

const services = [
    {
        title: "Mining",
        icon: Pickaxe,
        description: "Veatiger General Dealers is well-positioned to support Zambia’s mining sector through a range of reliable and cost-effective services. With years of experience supplying industrial materials, engineering support, and logistics solutions to both government and private entities, we bring proven capability and efficiency to mining operations. Backed by a strong supply chain network and commitment to compliance and safety standards, Veatiger is a trusted partner in the mining industry."
    },
    {
        title: "Transport & Logistics",
        icon: Truck,
        description: "In the transport and logistics business, VEATIGER boasts of a well-maintained fleet of 72 trucks, including long haul tri-axle trailers that are registered for container transportation with reputable companies such as Mediterranean Shipping Company (MSC), SAFMARIME, and Maersk. In addition, the company has a fleet of 4 x 7 tonners’ trucks that complement the larger fleet by handling smaller consignments into the depot for consolidation and onward loading onto bigger trucks, ensuring efficient and timely deliveries to final destinations."
    },
    {
        title: "Building Construction",
        icon: Hammer,
        description: "In the transport and logistics business, VEATIGER boasts of a well-maintained fleet of 72 trucks, including long haul tri-axle trailers that are registered for container transportation with reputable companies such as Mediterranean Shipping Company (MSC), SAFMARIME, and Maersk. In addition, the company has a fleet of 4 x 7 tonners’ trucks that complement the larger fleet by handling smaller consignments into the depot for consolidation and onward loading onto bigger trucks, ensuring efficient and timely deliveries to final destinations."
    },
    {
        title: "Civil Engineering",
        icon: HardHat,
        description: "Our company provides civil engineering services to clients in various sectors, including mining, oil and gas, and power generation. Our team of experts offers design, engineering, and project management services for civil engineering projects, including earthworks, concrete works, and structural steel works."
    },
    {
        title: "General Supply",
        icon: ShoppingCart,
        description: "We recognize the critical role that reliable office supplies, office equipment, and cleaning materials play in the day-to-day operations of any business. Our Office Supplies and Services are designed to enhance efficiency, productivity, and cleanliness in workplaces of all sizes. We offer a wide selection of high-quality stationery, office equipment, and cleaning tools, ensuring your business has everything it needs to function smoothly and maintain a professional environment."
    },
    {
        title: "Hardware Supplies",
        icon: Wrench,
        description: "We offer essential construction materials including cement, sand, bricks, and tiles for both small and large projects. Our products are sourced from reliable suppliers to ensure quality and durability. Our plumbing supplies include pipes, faucets, fittings, and plumbing tools. These high-quality products are perfect for installations, repairs, and maintenance of water and gas systems. We also provide electrical supplies such as wires, cables, circuit breakers, and lighting fixtures."
    },
    {
        title: "Food Supplies",
        icon: Utensils,
        description: "We offer a variety of grains and dry foods, including maize, rice, beans, and groundnuts. These staple items provide essential nutrition and energy for meals. Our fresh produce includes a wide range of vegetables such as onions, potatoes, tomatoes, and cabbages, as well as fruits like bananas, apples, and oranges. We supply a selection of fresh meat and meat products, including beef, chicken, sausages, and processed meats, and fish providing high-quality protein for your meals."
    }
];

const Services = () => {
    return (
        <div className="min-h-screen flex flex-col bg-muted/10">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-secondary text-secondary-foreground py-24">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">Our Services</h1>
                        <p className="text-xl max-w-4xl mx-auto text-secondary-foreground/80 leading-relaxed">
                            VEATIGER GENERAL DEALERS LIMITED provides a range of services, including transport and logistics, mining, civil engineering, road construction, general supply and earthworks, transportation of various commodities within the Southern African region.
                        </p>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-8">
                            {services.map((service, index) => (
                                <Card key={index} className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group">
                                    <CardHeader>
                                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                            <service.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <CardTitle className="text-2xl font-bold text-secondary group-hover:text-primary transition-colors">
                                            {service.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {service.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Services;
