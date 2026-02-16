import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Calendar, User, MagnifyingGlass, ArrowRight } from 'phosphor-react';

// Mock blog posts - will be replaced with API
const blogPosts = [
    {
        id: 1,
        title: 'Veatiger Completes Major Infrastructure Project in Lusaka',
        excerpt: 'We are proud to announce the successful completion of a major infrastructure development project in partnership with ZESCO...',
        category: 'Projects',
        author: 'Admin Team',
        date: '2024-01-15',
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop',
        featured: true,
    },
    {
        id: 2,
        title: 'Sustainable Construction Practices: Our Commitment to the Environment',
        excerpt: 'At Veatiger, we believe in building for the future. Learn about our sustainable construction practices and environmental initiatives...',
        category: 'News',
        author: 'Admin Team',
        date: '2024-01-10',
        image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2071&auto=format&fit=crop',
        featured: false,
    },
    {
        id: 3,
        title: 'Expanding Our Logistics Network Across Southern Africa',
        excerpt: 'Exciting news as we expand our logistics services to new regions across Southern Africa, improving supply chain efficiency...',
        category: 'Company News',
        author: 'Admin Team',
        date: '2024-01-05',
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop',
        featured: false,
    },
    {
        id: 4,
        title: 'Innovation in Mining Support Services',
        excerpt: 'Discover how Veatiger is revolutionizing mining support services with cutting-edge technology and dedicated expertise...',
        category: 'Services',
        author: 'Admin Team',
        date: '2023-12-28',
        image: 'https://images.unsplash.com/photo-1547593750-20d2e62ebc8f?q=80&w=2070&auto=format&fit=crop',
        featured: false,
    },
    {
        id: 5,
        title: 'Meet Our Team: Engineering Excellence',
        excerpt: 'Get to know the talented engineers behind our successful projects and learn about their passion for building excellence...',
        category: 'Team',
        author: 'Admin Team',
        date: '2023-12-20',
        image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=2070&auto=format&fit=crop',
        featured: false,
    },
];

const SectionObserver = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const Blog = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Get unique categories
    const categories = Array.from(new Set(blogPosts.map(post => post.category)));

    // Filter posts
    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const featuredPost = blogPosts.find(post => post.featured);
    const regularPosts = filteredPosts.filter(post => !post.featured);

    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative h-[60vh] min-h-[400px] bg-black overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop"
                        alt="Blog"
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
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading text-white uppercase tracking-tight mb-4">
                                    Blog
                                </h1>
                                <div className="w-24 h-1 bg-primary mb-6"></div>
                                <p className="text-xl text-white/80 max-w-3xl font-light">
                                    News, insights, and updates from Veatiger
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Search and Filters */}
                <section className="py-12 bg-white border-b">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
                            <div className="relative flex-1">
                                <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <Input
                                    placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 h-12"
                                />
                            </div>
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger className="w-full md:w-[200px] h-12">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {categories.map(cat => (
                                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </section>

                {/* Featured Post */}
                {featuredPost && selectedCategory === 'all' && !searchQuery && (
                    <section className="py-24 bg-muted/30">
                        <div className="container mx-auto px-4">
                            <SectionObserver>
                                <Badge className="mb-6 bg-primary text-black hover:bg-primary/90 text-xs py-1.5 px-4 font-bold uppercase tracking-wider">
                                    Featured
                                </Badge>
                                <div className="grid lg:grid-cols-2 gap-8 items-center">
                                    <div className="order-2 lg:order-1">
                                        <Badge variant="outline" className="mb-4">
                                            {featuredPost.category}
                                        </Badge>
                                        <h2 className="text-4xl md:text-5xl font-bold font-heading text-black mb-4 uppercase">
                                            {featuredPost.title}
                                        </h2>
                                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                            {featuredPost.excerpt}
                                        </p>
                                        <div className="flex items-center gap-6 mb-6 text-sm text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4" weight="fill" />
                                                <span>{featuredPost.author}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" weight="fill" />
                                                <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                            </div>
                                        </div>
                                        <Button className="bg-primary hover:bg-secondary text-black font-bold uppercase">
                                            Read More <ArrowRight className="w-4 h-4 ml-2" weight="bold" />
                                        </Button>
                                    </div>
                                    <div className="order-1 lg:order-2">
                                        <img
                                            src={featuredPost.image}
                                            alt={featuredPost.title}
                                            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
                                        />
                                    </div>
                                </div>
                            </SectionObserver>
                        </div>
                    </section>
                )}

                {/* All Posts */}
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-4">
                        <SectionObserver className="mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold font-heading text-black uppercase mb-4">
                                Latest Articles
                            </h2>
                            <div className="w-24 h-1 bg-primary"></div>
                        </SectionObserver>

                        {regularPosts.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">No articles found</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {regularPosts.map((post, index) => (
                                    <SectionObserver key={post.id} delay={index * 0.1}>
                                        <article className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                                <Badge className="absolute top-4 left-4 bg-primary text-black text-xs">
                                                    {post.category}
                                                </Badge>
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold font-heading text-black mb-3 uppercase group-hover:text-secondary transition-colors">
                                                    {post.title}
                                                </h3>
                                                <p className="text-gray-600 mb-4 line-clamp-3">
                                                    {post.excerpt}
                                                </p>
                                                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                                                    <div className="flex items-center gap-1">
                                                        <User className="w-3 h-3" weight="fill" />
                                                        <span>{post.author}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" weight="fill" />
                                                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                    </div>
                                                </div>
                                                <Button variant="link" className="text-primary hover:text-secondary font-bold uppercase text-sm p-0">
                                                    Read More <ArrowRight className="w-4 h-4 ml-1" weight="bold" />
                                                </Button>
                                            </div>
                                        </article>
                                    </SectionObserver>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Blog;
