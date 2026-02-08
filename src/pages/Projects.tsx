import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar, Building2, Briefcase } from "lucide-react";

const projects = [
    {
        category: "Early Works",
        period: "2009–2012",
        description: "Foundational projects and long-term engagements.",
        items: [
            { name: "Chacha Park Lodge", year: "2009–2010", type: "Hospitality" },
            { name: "Kingfisher Lodge", year: "2009–2011", type: "Hospitality" },
            { name: "Modern Press & Zambia Sugar", year: "2009–2012", type: "Industrial" },
            { name: "Ministry of Science & Technology", year: "2010", type: "Government" },
            { name: "Germany Embassy", year: "2010–2011", type: "Diplomatic" },
        ]
    },
    {
        category: "Expansion",
        period: "2012–2017",
        description: "Corporate partnerships and infrastructure support.",
        items: [
            { name: "Hazida Distributors", year: "2012", type: "Distribution" },
            { name: "Airtel Investments", year: "2012", type: "Commercial" },
            { name: "RDA – ZPPA/CE/011/12", year: "2012", type: "Infrastructure" },
            { name: "Royal (Crocodile) Enterprises", year: "2015–2016", type: "Commercial" },
            { name: "Market Farm Company", year: "2017", type: "Agriculture" },
        ]
    },
    {
        category: "Large Scale Initiatives",
        period: "2016–Present",
        description: "Major engineering contracts and logistic services.",
        items: [
            { name: "ZESCO & Zambia Army", year: "2016–2018", type: "Government/Utility" },
            { name: "Aman Shaffan", year: "2016–2018", type: "Construction" },
            { name: "JAE Engineering", year: "Ongoing", type: "Engineering" },
            { name: "IRS Cargo", year: "2017–2018", type: "Logistics" },
            { name: "Ministry of Government", year: "2018", type: "Government" },
            { name: "LEON Engineering", year: "2018–2019", type: "Engineering" },
        ]
    }
];

const Projects = () => {
    return (
        <div className="min-h-screen flex flex-col bg-muted/10">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-secondary text-secondary-foreground py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-secondary/90 z-0">
                        {/* Abstract Pattern overlay could go here */}
                    </div>
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <Badge className="mb-4 bg-primary text-primary-foreground hover:bg-primary/90 text-sm py-1 px-4">
                            Since 2009
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">Our Project Portfolio</h1>
                        <p className="text-xl max-w-3xl mx-auto text-secondary-foreground/80 leading-relaxed">
                            A decade of excellence in delivering reliable, high-quality services across Zambia for private and public institutions.
                        </p>
                    </div>
                </section>

                {/* Timeline/Portfolio Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4">

                        <div className="space-y-20">
                            {projects.map((group, index) => (
                                <div key={index} className="relative">
                                    <div className="flex flex-col md:flex-row items-end gap-4 mb-8 border-b border-border pb-4">
                                        <div className="flex-1">
                                            <h2 className="text-3xl font-bold font-heading text-secondary">{group.category}</h2>
                                            <p className="text-muted-foreground mt-1">{group.description}</p>
                                        </div>
                                        <Badge variant="outline" className="text-lg font-bold py-1 px-4 border-primary text-primary">
                                            {group.period}
                                        </Badge>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {group.items.map((project, pIndex) => (
                                            <Card key={pIndex} className="group overflow-hidden border-border/50 hover:border-primary/50 transition-colors duration-300">
                                                {/* Image Placeholder */}
                                                <div className="h-48 bg-secondary/10 relative group-hover:bg-secondary/20 transition-colors flex items-center justify-center">
                                                    <Building2 className="w-12 h-12 text-muted-foreground/30 group-hover:text-primary/50 transition-colors" />
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-secondary/10 backdrop-blur-[2px]">
                                                        <span className="text-secondary font-bold text-sm bg-background/80 px-3 py-1 rounded-full border border-primary/20">
                                                            View Project
                                                        </span>
                                                    </div>
                                                </div>

                                                <CardHeader className="pb-3">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <Badge variant="secondary" className="text-xs font-normal">
                                                            {project.type}
                                                        </Badge>
                                                        <div className="flex items-center text-xs text-muted-foreground">
                                                            <Calendar className="w-3 h-3 mr-1" />
                                                            {project.year}
                                                        </div>
                                                    </div>
                                                    <CardTitle className="text-lg font-bold text-secondary group-hover:text-primary transition-colors">
                                                        {project.name}
                                                    </CardTitle>
                                                </CardHeader>
                                            </Card>
                                        ))}
                                    </div>
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

export default Projects;
