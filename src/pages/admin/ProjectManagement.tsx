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
import { useProjectQuery, useProjectMutation } from '@/hooks/useApi';
import { useToast } from '@/components/ui/use-toast';

interface Project {
    id: number;
    name: string;
    category: string;
    year: string;
    type: string;
    description: string;
    date: string | null;
    image_url: string | null;
    images: string[] | null;
    status: string;
    created_at: string;
}

export default function ProjectManagement() {
    const { data: projects = [], isLoading } = useProjectQuery();
    const { create, update, delete: remove } = useProjectMutation();
    const { toast } = useToast();

    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [deletingProject, setDeletingProject] = useState<Project | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        year: '',
        type: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        image_url: null as string | null,
        images: [] as string[],
        status: 'active',
    });

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    // Filter projects
    const filteredProjects = projects.filter((project: Project) => {
        const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.type.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === 'all' || project.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    // Get unique categories
    const categories = Array.from(new Set(projects.map((p: Project) => p.category))) as string[];

    const handleOpenDialog = (project?: Project) => {
        if (project) {
            setEditingProject(project);
            setFormData({
                name: project.name,
                category: project.category,
                year: project.year,
                type: project.type,
                description: project.description || '',
                date: project.date || new Date().toISOString().split('T')[0],
                image_url: project.image_url,
                images: project.images || [],
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
                date: new Date().toISOString().split('T')[0],
                image_url: null,
                images: [],
                status: 'active',
            });
        }
        setFormErrors({});
        setIsDialogOpen(true);
    };

    // Handle multiple image uploads
    const handleImagesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const remainingSlots = 5 - (formData.images?.length || 0);

        if (files.length > remainingSlots) {
            toast({
                title: 'Limit Exceeded',
                description: `You can only add ${remainingSlots} more image(s). (Max 5 total)`,
                variant: 'destructive'
            });
        }

        const filesToProcess = files.slice(0, remainingSlots);

        filesToProcess.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                setFormData(prev => ({
                    ...prev,
                    images: [...(prev.images || []), base64],
                    // Set the first image as the main image_url if not already set
                    image_url: prev.image_url || base64
                }));
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index: number) => {
        setFormData(prev => {
            const newImages = [...(prev.images || [])];
            newImages.splice(index, 1);

            // If we removed the main image_url, update it to the next available one
            let newImageUrl = prev.image_url;
            if (prev.images?.[index] === prev.image_url) {
                newImageUrl = newImages.length > 0 ? newImages[0] : null;
            }

            return {
                ...prev,
                images: newImages,
                image_url: newImageUrl
            };
        });

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const setMainImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            image_url: prev.images?.[index] || null
        }));
        toast({ title: 'Main Image Set', description: 'Selected image will be used as the project thumbnail.' });
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

    const handleSave = async () => {
        if (!validateForm()) return;

        setIsSaving(true);
        try {
            if (editingProject) {
                await update.mutateAsync({ id: editingProject.id, data: formData });
                toast({ title: 'Success', description: 'Project updated successfully' });
            } else {
                await create.mutateAsync(formData);
                toast({ title: 'Success', description: 'Project created successfully' });
            }
            setIsDialogOpen(false);
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to save project', variant: 'destructive' });
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (deletingProject) {
            try {
                await remove.mutateAsync(deletingProject.id);
                toast({ title: 'Success', description: 'Project deleted successfully' });
            } catch (error) {
                toast({ title: 'Error', description: 'Failed to delete project', variant: 'destructive' });
            }
            setIsDeleteDialogOpen(false);
            setDeletingProject(null);
        }
    };

    const toggleStatus = async (project: Project) => {
        try {
            await update.mutateAsync({
                id: project.id,
                data: { status: project.status === 'active' ? 'inactive' : 'active' }
            });
        } catch (error) {
            toast({ title: 'Error', description: 'Failed to update status', variant: 'destructive' });
        }
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
                            <TableHead className="font-bold uppercase">Date</TableHead>
                            <TableHead className="font-bold uppercase">Category</TableHead>
                            <TableHead className="font-bold uppercase">Year</TableHead>
                            <TableHead className="font-bold uppercase">Type</TableHead>
                            <TableHead className="font-bold uppercase">Status</TableHead>
                            <TableHead className="font-bold uppercase text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8">Loading...</TableCell>
                            </TableRow>
                        ) : filteredProjects.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                                    No projects found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredProjects.map((project: Project) => (
                                <TableRow key={project.id}>
                                    <TableCell>
                                        <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                                            {project.image_url ? (
                                                <img src={project.image_url} alt={project.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <ImageIcon className="w-6 h-6 text-gray-400" />
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">{project.name}</TableCell>
                                    <TableCell className="text-sm">
                                        {project.date ? new Date(project.date).toLocaleDateString() : 'N/A'}
                                    </TableCell>
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
                            <Label htmlFor="date">Project Date *</Label>
                            <Input
                                id="date"
                                type="date"
                                value={formData.date || ''}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
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

                        {/* Multiple Image Upload */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <Label>Project Images (Max 5)</Label>
                                <span className="text-xs text-gray-500">{formData.images?.length || 0} / 5</span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                                {formData.images?.map((url, index) => (
                                    <div key={index} className="relative group aspect-square rounded border overflow-hidden bg-gray-50">
                                        <img src={url} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />

                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <Button
                                                type="button"
                                                variant="secondary"
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                                onClick={() => setMainImage(index)}
                                                title="Set as main image"
                                            >
                                                <Star className={`w-4 h-4 ${formData.image_url === url ? 'fill-primary text-primary' : ''}`} />
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                                onClick={() => removeImage(index)}
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>

                                        {formData.image_url === url && (
                                            <div className="absolute top-1 left-1 bg-primary text-black text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                                                Main
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {(formData.images?.length || 0) < 5 && (
                                    <label
                                        htmlFor="images-upload"
                                        className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-gray-300 rounded cursor-pointer hover:border-primary transition-colors bg-gray-50"
                                    >
                                        <Upload className="w-6 h-6 text-gray-400 mb-1" />
                                        <span className="text-[10px] text-gray-500 uppercase font-bold">Upload</span>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleImagesUpload}
                                            className="hidden"
                                            id="images-upload"
                                        />
                                    </label>
                                )}
                            </div>
                            <p className="text-[10px] text-gray-500 mt-2">
                                Tip: The image marked as "Main" will be shown in the project listing.
                            </p>
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
                        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-black font-bold" disabled={isSaving}>
                            {isSaving ? 'Saving...' : editingProject ? 'Update Project' : 'Create Project'}
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
