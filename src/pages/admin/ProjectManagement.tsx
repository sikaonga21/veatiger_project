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
import { Plus, Search, Edit, Trash2, Upload, X, Image as ImageIcon } from 'lucide-react';

// Mock data
const initialProjects = [
    {
        id: 1,
        name: 'ZESCO and Zambia Army',
        category: 'Large Scale Initiatives',
        year: '2016-2018',
        type: 'Government/Utility',
        description: '',
        image: null,
        status: 'active',
    },
    {
        id: 2,
        name: 'Chacha Park Lodge',
        category: 'Early Works',
        year: '2009-2010',
        type: 'Hospitality',
        description: '',
        image: null,
        status: 'active',
    },
];

interface Project {
    id: number;
    name: string;
    category: string;
    year: string;
    type: string;
    description: string;
    image: string | null;
    status: string;
}

export default function ProjectManagement() {
    const [projects, setProjects] = useState<Project[]>(initialProjects);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [deletingProject, setDeletingProject] = useState<Project | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        year: '',
        type: '',
        description: '',
        image: null as string | null,
        status: 'active',
    });

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    // Filter projects
    const filteredProjects = projects.filter((project) => {
        const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.type.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === 'all' || project.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    // Get unique categories
    const categories = Array.from(new Set(projects.map(p => p.category)));

    const handleOpenDialog = (project?: Project) => {
        if (project) {
            setEditingProject(project);
            setFormData({
                name: project.name,
                category: project.category,
                year: project.year,
                type: project.type,
                description: project.description,
                image: project.image,
                status: project.status,
            });
        } else {
            setEditingProject(null);
            setFormData({
                name: '',
                category: '',
                year: '',
                type: '',
                description: '',
                image: null,
                status: 'active',
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

        if (!formData.name.trim()) errors.name = 'Project name is required';
        if (!formData.category.trim()) errors.category = 'Category is required';
        if (!formData.year.trim()) errors.year = 'Year is required';
        if (!formData.type.trim()) errors.type = 'Type is required';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSave = () => {
        if (!validateForm()) return;

        if (editingProject) {
            setProjects(projects.map(p =>
                p.id === editingProject.id
                    ? { ...p, ...formData }
                    : p
            ));
        } else {
            const newProject: Project = {
                ...formData,
                id: Math.max(...projects.map(p => p.id), 0) + 1,
            };
            setProjects([...projects, newProject]);
        }

        setIsDialogOpen(false);
    };

    const handleDelete = () => {
        if (deletingProject) {
            setProjects(projects.filter(p => p.id !== deletingProject.id));
            setIsDeleteDialogOpen(false);
            setDeletingProject(null);
        }
    };

    const toggleStatus = (project: Project) => {
        setProjects(projects.map(p =>
            p.id === project.id
                ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' }
                : p
        ));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold font-heading text-black uppercase">
                        Project Management
                    </h1>
                    <p className="text-gray-600 mt-1">Manage your portfolio and projects</p>
                </div>
                <Button
                    onClick={() => handleOpenDialog()}
                    className="bg-primary hover:bg-primary/90 text-black font-bold uppercase"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-full sm:w-[250px]">
                        <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <div className="border rounded-lg bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-bold uppercase">Image</TableHead>
                            <TableHead className="font-bold uppercase">Name</TableHead>
                            <TableHead className="font-bold uppercase">Category</TableHead>
                            <TableHead className="font-bold uppercase">Year</TableHead>
                            <TableHead className="font-bold uppercase">Type</TableHead>
                            <TableHead className="font-bold uppercase">Status</TableHead>
                            <TableHead className="font-bold uppercase text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProjects.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                    No projects found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredProjects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell>
                                        <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                                            {project.image ? (
                                                <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <ImageIcon className="w-6 h-6 text-gray-400" />
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">{project.name}</TableCell>
                                    <TableCell><Badge variant="outline">{project.category}</Badge></TableCell>
                                    <TableCell>{project.year}</TableCell>
                                    <TableCell className="text-sm text-gray-600">{project.type}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                                                {project.status}
                                            </Badge>
                                            <Switch
                                                checked={project.status === 'active'}
                                                onCheckedChange={() => toggleStatus(project)}
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleOpenDialog(project)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    setDeletingProject(project);
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
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold font-heading uppercase">
                            {editingProject ? 'Edit Project' : 'Add New Project'}
                        </DialogTitle>
                        <DialogDescription>
                            {editingProject ? 'Update the project details below' : 'Fill in the details for the new project'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div>
                            <Label htmlFor="name">Project Name *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. ZESCO Infrastructure"
                            />
                            {formErrors.name && <p className="text-sm text-red-500 mt-1">{formErrors.name}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="category">Category *</Label>
                                <Input
                                    id="category"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    placeholder="e.g. Large Scale Initiatives"
                                />
                                {formErrors.category && <p className="text-sm text-red-500 mt-1">{formErrors.category}</p>}
                            </div>

                            <div>
                                <Label htmlFor="year">Year/Period *</Label>
                                <Input
                                    id="year"
                                    value={formData.year}
                                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                    placeholder="e.g. 2016-2018"
                                />
                                {formErrors.year && <p className="text-sm text-red-500 mt-1">{formErrors.year}</p>}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="type">Type *</Label>
                            <Input
                                id="type"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                placeholder="e.g. Government/Utility"
                            />
                            {formErrors.type && <p className="text-sm text-red-500 mt-1">{formErrors.type}</p>}
                        </div>

                        <div>
                            <Label htmlFor="description">Description (Optional)</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Project details..."
                                rows={3}
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <Label>Project Image (Optional)</Label>
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
                                            <p className="text-sm text-gray-600">Click to upload image</p>
                                        </div>
                                    </label>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <Switch
                                id="status"
                                checked={formData.status === 'active'}
                                onCheckedChange={(checked) => setFormData({ ...formData, status: checked ? 'active' : 'inactive' })}
                            />
                            <Label htmlFor="status">Active (visible to public)</Label>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-black font-bold">
                            {editingProject ? 'Update' : 'Create'} Project
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Project</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete "{deletingProject?.name}"? This action cannot be undone.
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
