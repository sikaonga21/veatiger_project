import { useState } from 'react';
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
import { Plus, Search, Edit, Trash2, MapPin, Clock } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Mock data - will be replaced with API
const initialCareers = [
    {
        id: 1,
        title: 'Civil Engineer',
        department: 'Engineering',
        location: 'Lusaka, Zambia',
        type: 'Full-time',
        description: 'We are seeking an experienced Civil Engineer...',
        requirements: ['Bachelor\'s degree in Civil Engineering', '5+ years experience'],
        status: 'active',
        createdAt: '2024-01-15',
    },
    {
        id: 2,
        title: 'Project Manager',
        department: 'Construction',
        location: 'Kitwe, Zambia',
        type: 'Full-time',
        description: 'Lead construction projects from planning to completion...',
        requirements: ['Bachelor\'s degree in Construction Management', '7+ years experience'],
        status: 'active',
        createdAt: '2024-01-10',
    },
];

interface Career {
    id: number;
    title: string;
    department: string;
    location: string;
    type: string;
    description: string;
    requirements: string[];
    status: string;
    createdAt: string;
}

export default function CareerManagement() {
    const [careers, setCareers] = useState<Career[]>(initialCareers);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterDepartment, setFilterDepartment] = useState('all');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [editingCareer, setEditingCareer] = useState<Career | null>(null);
    const [deletingCareer, setDeletingCareer] = useState<Career | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        department: '',
        location: '',
        type: 'Full-time',
        description: '',
        requirements: '',
        status: 'active',
    });

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    // Filter careers
    const filteredCareers = careers.filter((career) => {
        const matchesSearch = career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            career.department.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDepartment = filterDepartment === 'all' || career.department === filterDepartment;
        return matchesSearch && matchesDepartment;
    });

    // Get unique departments
    const departments = Array.from(new Set(careers.map(c => c.department)));

    const handleOpenDialog = (career?: Career) => {
        if (career) {
            setEditingCareer(career);
            setFormData({
                title: career.title,
                department: career.department,
                location: career.location,
                type: career.type,
                description: career.description,
                requirements: career.requirements.join('\n'),
                status: career.status,
            });
        } else {
            setEditingCareer(null);
            setFormData({
                title: '',
                department: '',
                location: '',
                type: 'Full-time',
                description: '',
                requirements: '',
                status: 'active',
            });
        }
        setFormErrors({});
        setIsDialogOpen(true);
    };

    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (!formData.title.trim()) errors.title = 'Title is required';
        if (!formData.department.trim()) errors.department = 'Department is required';
        if (!formData.location.trim()) errors.location = 'Location is required';
        if (!formData.description.trim()) errors.description = 'Description is required';
        if (!formData.requirements.trim()) errors.requirements = 'At least one requirement is needed';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSave = () => {
        if (!validateForm()) return;

        const careerData = {
            ...formData,
            requirements: formData.requirements.split('\n').filter(r => r.trim()),
        };

        if (editingCareer) {
            // Update existing
            setCareers(careers.map(c =>
                c.id === editingCareer.id
                    ? { ...c, ...careerData }
                    : c
            ));
        } else {
            // Create new
            const newCareer: Career = {
                ...careerData,
                id: Math.max(...careers.map(c => c.id), 0) + 1,
                createdAt: new Date().toISOString().split('T')[0],
            };
            setCareers([...careers, newCareer]);
        }

        setIsDialogOpen(false);
    };

    const handleDelete = () => {
        if (deletingCareer) {
            setCareers(careers.filter(c => c.id !== deletingCareer.id));
            setIsDeleteDialogOpen(false);
            setDeletingCareer(null);
        }
    };

    const toggleStatus = (career: Career) => {
        setCareers(careers.map(c =>
            c.id === career.id
                ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' }
                : c
        ));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold font-heading text-black uppercase">
                        Career Management
                    </h1>
                    <p className="text-gray-600 mt-1">Manage job postings and openings</p>
                </div>
                <Button
                    onClick={() => handleOpenDialog()}
                    className="bg-primary hover:bg-primary/90 text-black font-bold uppercase"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Career
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                        placeholder="Search careers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                        <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        {departments.map(dept => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Table */}
            <div className="border rounded-lg bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-bold uppercase">Title</TableHead>
                            <TableHead className="font-bold uppercase">Department</TableHead>
                            <TableHead className="font-bold uppercase">Location</TableHead>
                            <TableHead className="font-bold uppercase">Type</TableHead>
                            <TableHead className="font-bold uppercase">Status</TableHead>
                            <TableHead className="font-bold uppercase text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCareers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                    No careers found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredCareers.map((career) => (
                                <TableRow key={career.id}>
                                    <TableCell className="font-medium">{career.title}</TableCell>
                                    <TableCell>{career.department}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1 text-sm">
                                            <MapPin className="w-4 h-4 text-gray-400" />
                                            {career.location}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1 text-sm">
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            {career.type}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Badge variant={career.status === 'active' ? 'default' : 'secondary'}>
                                                {career.status}
                                            </Badge>
                                            <Switch
                                                checked={career.status === 'active'}
                                                onCheckedChange={() => toggleStatus(career)}
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleOpenDialog(career)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    setDeletingCareer(career);
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
                            {editingCareer ? 'Edit Career' : 'Add New Career'}
                        </DialogTitle>
                        <DialogDescription>
                            {editingCareer ? 'Update the career details below' : 'Fill in the details for the new job posting'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div>
                            <Label htmlFor="title">Title *</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="e.g. Civil Engineer"
                            />
                            {formErrors.title && <p className="text-sm text-red-500 mt-1">{formErrors.title}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="department">Department *</Label>
                                <Input
                                    id="department"
                                    value={formData.department}
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    placeholder="e.g. Engineering"
                                />
                                {formErrors.department && <p className="text-sm text-red-500 mt-1">{formErrors.department}</p>}
                            </div>

                            <div>
                                <Label htmlFor="location">Location *</Label>
                                <Input
                                    id="location"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    placeholder="e.g. Lusaka, Zambia"
                                />
                                {formErrors.location && <p className="text-sm text-red-500 mt-1">{formErrors.location}</p>}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="type">Employment Type</Label>
                            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Full-time">Full-time</SelectItem>
                                    <SelectItem value="Part-time">Part-time</SelectItem>
                                    <SelectItem value="Contract">Contract</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Describe the role and responsibilities..."
                                rows={4}
                            />
                            {formErrors.description && <p className="text-sm text-red-500 mt-1">{formErrors.description}</p>}
                        </div>

                        <div>
                            <Label htmlFor="requirements">Requirements * (one per line)</Label>
                            <Textarea
                                id="requirements"
                                value={formData.requirements}
                                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                                placeholder="Bachelor's degree in Engineering&#10;5+ years experience&#10;..."
                                rows={4}
                            />
                            {formErrors.requirements && <p className="text-sm text-red-500 mt-1">{formErrors.requirements}</p>}
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
                            {editingCareer ? 'Update' : 'Create'} Career
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Career</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete "{deletingCareer?.title}"? This action cannot be undone.
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
