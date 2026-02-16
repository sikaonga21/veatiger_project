import { useState, useRef } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Search, Edit, Trash2, Upload, X, Image as ImageIcon, Star } from 'lucide-react';

// Mock blog data
const initialBlogPosts = [
    {
        id: 1,
        title: 'Veatiger Completes Major Infrastructure Project in Lusaka',
        excerpt: 'We are proud to announce the successful completion of a major infrastructure development project...',
        content: '',
        category: 'Projects',
        author: 'Admin Team',
        date: '2024-01-15',
        image: null,
        featured: true,
        status: 'published',
    },
    {
        id: 2,
        title: 'Sustainable Construction Practices',
        excerpt: 'At Veatiger, we believe in building for the future. Learn about our sustainable practices...',
        content: '',
        category: 'News',
        author: 'Admin Team',
        date: '2024-01-10',
        image: null,
        featured: false,
        status: 'published',
    },
];

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    author: string;
    date: string;
    image: string | null;
    featured: boolean;
    status: string;
}

export default function BlogManagement() {
    const [posts, setPosts] = useState<BlogPost[]>(initialBlogPosts);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [deletingPost, setDeletingPost] = useState<BlogPost | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        author: '',
        image: null as string | null,
        featured: false,
        status: 'draft',
    });

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    // Filter posts
    const filteredPosts = posts.filter((post) => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
        const matchesStatus = filterStatus === 'all' || post.status === filterStatus;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    // Get unique categories
    const categories = Array.from(new Set(posts.map(p => p.category)));

    const handleOpenDialog = (post?: BlogPost) => {
        if (post) {
            setEditingPost(post);
            setFormData({
                title: post.title,
                excerpt: post.excerpt,
                content: post.content,
                category: post.category,
                author: post.author,
                image: post.image,
                featured: post.featured,
                status: post.status,
            });
        } else {
            setEditingPost(null);
            setFormData({
                title: '',
                excerpt: '',
                content: '',
                category: '',
                author: '',
                image: null,
                featured: false,
                status: 'draft',
            });
        }
        setFormErrors({});
        setIsDialogOpen(true);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setFormData({ ...formData, image: null });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (!formData.title.trim()) errors.title = 'Title is required';
        if (!formData.excerpt.trim()) errors.excerpt = 'Excerpt is required';
        if (!formData.content.trim()) errors.content = 'Content is required';
        if (!formData.category.trim()) errors.category = 'Category is required';
        if (!formData.author.trim()) errors.author = 'Author is required';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSave = () => {
        if (!validateForm()) return;

        if (editingPost) {
            setPosts(posts.map(p =>
                p.id === editingPost.id
                    ? { ...p, ...formData, date: p.date }
                    : p
            ));
        } else {
            const newPost: BlogPost = {
                ...formData,
                id: Math.max(...posts.map(p => p.id), 0) + 1,
                date: new Date().toISOString().split('T')[0],
            };
            setPosts([newPost, ...posts]);
        }

        setIsDialogOpen(false);
    };

    const handleDelete = () => {
        if (deletingPost) {
            setPosts(posts.filter(p => p.id !== deletingPost.id));
            setIsDeleteDialogOpen(false);
            setDeletingPost(null);
        }
    };

    const toggleFeatured = (post: BlogPost) => {
        // Only one post can be featured at a time
        setPosts(posts.map(p =>
            p.id === post.id
                ? { ...p, featured: !p.featured }
                : { ...p, featured: false }
        ));
    };

    const toggleStatus = (post: BlogPost) => {
        setPosts(posts.map(p =>
            p.id === post.id
                ? { ...p, status: p.status === 'published' ? 'draft' : 'published' }
                : p
        ));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold font-heading text-black uppercase">
                        Blog Management
                    </h1>
                    <p className="text-gray-600 mt-1">Create and manage blog posts</p>
                </div>
                <Button
                    onClick={() => handleOpenDialog()}
                    className="bg-primary hover:bg-primary/90 text-black font-bold uppercase"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    New Post
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                        placeholder="Search posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                        <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <div className="border rounded-lg bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-bold uppercase">Image</TableHead>
                            <TableHead className="font-bold uppercase">Title</TableHead>
                            <TableHead className="font-bold uppercase">Category</TableHead>
                            <TableHead className="font-bold uppercase">Author</TableHead>
                            <TableHead className="font-bold uppercase">Date</TableHead>
                            <TableHead className="font-bold uppercase">Featured</TableHead>
                            <TableHead className="font-bold uppercase">Status</TableHead>
                            <TableHead className="font-bold uppercase text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredPosts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                                    No blog posts found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredPosts.map((post) => (
                                <TableRow key={post.id}>
                                    <TableCell>
                                        <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                                            {post.image ? (
                                                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <ImageIcon className="w-6 h-6 text-gray-400" />
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium max-w-xs truncate">{post.title}</TableCell>
                                    <TableCell><Badge variant="outline">{post.category}</Badge></TableCell>
                                    <TableCell className="text-sm text-gray-600">{post.author}</TableCell>
                                    <TableCell className="text-sm text-gray-600">
                                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => toggleFeatured(post)}
                                            className="p-1"
                                        >
                                            <Star className={`w-5 h-5 ${post.featured ? 'fill-primary text-primary' : 'text-gray-300'}`} />
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                                                {post.status}
                                            </Badge>
                                            <Switch
                                                checked={post.status === 'published'}
                                                onCheckedChange={() => toggleStatus(post)}
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleOpenDialog(post)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    setDeletingPost(post);
                                                    setIsDeleteDialogOpen(true);
                                                }}
                                            >
                                                <Trash2 className="w-4 h-4 text-red-500" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Add/Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold font-heading uppercase">
                            {editingPost ? 'Edit Post' : 'Create New Post'}
                        </DialogTitle>
                        <DialogDescription>
                            {editingPost ? 'Update the blog post details below' : 'Fill in the details for the new blog post'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div>
                            <Label htmlFor="title">Title *</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="e.g. Major Infrastructure Project Completed"
                            />
                            {formErrors.title && <p className="text-sm text-red-500 mt-1">{formErrors.title}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="category">Category *</Label>
                                <Input
                                    id="category"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    placeholder="e.g. Projects, News, Team"
                                />
                                {formErrors.category && <p className="text-sm text-red-500 mt-1">{formErrors.category}</p>}
                            </div>

                            <div>
                                <Label htmlFor="author">Author *</Label>
                                <Input
                                    id="author"
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    placeholder="e.g. Admin Team"
                                />
                                {formErrors.author && <p className="text-sm text-red-500 mt-1">{formErrors.author}</p>}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="excerpt">Excerpt *</Label>
                            <Textarea
                                id="excerpt"
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                placeholder="Brief summary of the article (shown on blog list page)..."
                                rows={3}
                            />
                            {formErrors.excerpt && <p className="text-sm text-red-500 mt-1">{formErrors.excerpt}</p>}
                        </div>

                        <div>
                            <Label htmlFor="content">Full Content *</Label>
                            <Textarea
                                id="content"
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                placeholder="Write the full article content here..."
                                rows={8}
                            />
                            {formErrors.content && <p className="text-sm text-red-500 mt-1">{formErrors.content}</p>}
                        </div>

                        {/* Image Upload */}
                        <div>
                            <Label>Featured Image</Label>
                            {formData.image ? (
                                <div className="relative mt-2">
                                    <img src={formData.image} alt="Preview" className="w-full h-48 object-cover rounded border" />
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        className="absolute top-2 right-2"
                                        onClick={removeImage}
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            ) : (
                                <div className="mt-2">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="image-upload"
                                    />
                                    <label
                                        htmlFor="image-upload"
                                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-primary transition-colors"
                                    >
                                        <div className="text-center">
                                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                            <p className="text-sm text-gray-600">Click to upload featured image</p>
                                        </div>
                                    </label>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <Switch
                                    id="featured"
                                    checked={formData.featured}
                                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                                />
                                <Label htmlFor="featured">Featured post</Label>
                            </div>

                            <div className="flex items-center gap-2">
                                <Switch
                                    id="status"
                                    checked={formData.status === 'published'}
                                    onCheckedChange={(checked) => setFormData({ ...formData, status: checked ? 'published' : 'draft' })}
                                />
                                <Label htmlFor="status">Publish immediately</Label>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-black font-bold">
                            {editingPost ? 'Update' : 'Create'} Post
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Post</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete "{deletingPost?.title}"? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
