import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Eye, Upload } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRef } from 'react';

// Mock content data
const initialContent = {
    home: {
        hero_title: 'Building Excellence Across Zambia',
        hero_subtitle: 'Your trusted partner in construction, logistics, and mining support since 2009',
        about_preview: 'Veatiger is a leading Zambian company providing comprehensive solutions...',
    },
    about: {
        mission: 'To deliver exceptional quality and innovation in every project we undertake',
        vision: 'To be the most trusted and respected company in our industries across Southern Africa',
        description: 'Founded in 2009, Veatiger has grown to become a cornerstone...',
    },
    services: {
        intro: 'We offer a comprehensive range of professional services...',
    },
    contact: {
        head_office_address: 'Plot 1234, Lusaka Road, Lusaka, Zambia',
        head_office_phone: '+260 211 123 456',
        head_office_email: 'info@veatiger.com',
    },
};

export default function ContentManagement() {
    const [content, setContent] = useState(initialContent);
    const [activeTab, setActiveTab] = useState('home');
    const [isSaved, setIsSaved] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    const handleContentChange = (section: string, key: string, value: string) => {
        setContent(prev => ({
            ...prev,
            [section]: {
                ...prev[section as keyof typeof prev],
                [key]: value,
            },
        }));
        setHasChanges(true);
        setIsSaved(false);
    };

    const handleSave = () => {
        // TODO: Save to API
        console.log('Saving content:', content);
        setIsSaved(true);
        setHasChanges(false);

        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold font-heading text-black uppercase">
                        Content Management
                    </h1>
                    <p className="text-gray-600 mt-1">Edit website content and text</p>
                </div>
                <div className="flex items-center gap-3">
                    {hasChanges && (
                        <span className="text-sm text-orange-600 font-medium">Unsaved changes</span>
                    )}
                    <Button
                        onClick={handleSave}
                        className="bg-primary hover:bg-primary/90 text-black font-bold uppercase"
                        disabled={!hasChanges}
                    >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                    </Button>
                </div>
            </div>

            {isSaved && (
                <Alert className="bg-green-50 border-green-200">
                    <AlertDescription className="text-green-800">
                        ✓ Changes saved successfully!
                    </AlertDescription>
                </Alert>
            )}

            {/* Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="home" className="uppercase font-bold">Home</TabsTrigger>
                    <TabsTrigger value="about" className="uppercase font-bold">About</TabsTrigger>
                    <TabsTrigger value="services" className="uppercase font-bold">Services</TabsTrigger>
                    <TabsTrigger value="contact" className="uppercase font-bold">Contact</TabsTrigger>
                </TabsList>

                {/* Home Content */}
                <TabsContent value="home" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-bold font-heading uppercase">Hero Section</CardTitle>
                            <CardDescription>Main banner content on the homepage</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="hero_title">Hero Title</Label>
                                <Input
                                    id="hero_title"
                                    value={content.home.hero_title}
                                    onChange={(e) => handleContentChange('home', 'hero_title', e.target.value)}
                                    className="text-lg font-bold"
                                />
                            </div>
                            <div>
                                <Label htmlFor="hero_subtitle">Hero Subtitle</Label>
                                <Textarea
                                    id="hero_subtitle"
                                    value={content.home.hero_subtitle}
                                    onChange={(e) => handleContentChange('home', 'hero_subtitle', e.target.value)}
                                    rows={2}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-bold font-heading uppercase">About Preview</CardTitle>
                            <CardDescription>Short description shown on homepage</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                value={content.home.about_preview}
                                onChange={(e) => handleContentChange('home', 'about_preview', e.target.value)}
                                rows={4}
                                placeholder="Enter a brief description of your company..."
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* About Content */}
                <TabsContent value="about" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-bold font-heading uppercase">Mission & Vision</CardTitle>
                            <CardDescription>Company mission and vision statements</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="mission">Mission Statement</Label>
                                <Textarea
                                    id="mission"
                                    value={content.about.mission}
                                    onChange={(e) => handleContentChange('about', 'mission', e.target.value)}
                                    rows={3}
                                />
                            </div>
                            <div>
                                <Label htmlFor="vision">Vision Statement</Label>
                                <Textarea
                                    id="vision"
                                    value={content.about.vision}
                                    onChange={(e) => handleContentChange('about', 'vision', e.target.value)}
                                    rows={3}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-bold font-heading uppercase">Company Description</CardTitle>
                            <CardDescription>Full company description and history</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                value={content.about.description}
                                onChange={(e) => handleContentChange('about', 'description', e.target.value)}
                                rows={6}
                                placeholder="Tell your company's story..."
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                Tip: Use clear, engaging language to describe your company's journey and values
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Services Content */}
                <TabsContent value="services" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-bold font-heading uppercase">Services Introduction</CardTitle>
                            <CardDescription>Opening text for services page</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                value={content.services.intro}
                                onChange={(e) => handleContentChange('services', 'intro', e.target.value)}
                                rows={4}
                                placeholder="Introduce your services..."
                            />
                        </CardContent>
                    </Card>

                    <Card className="bg-blue-50 border-blue-200">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold uppercase text-blue-900">Note</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-blue-800">
                                Individual service items are managed through the code. Contact your developer to add or modify specific services.
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Contact Content */}
                <TabsContent value="contact" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg font-bold font-heading uppercase">Head Office Details</CardTitle>
                            <CardDescription>Main office contact information</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="head_office_address">Address</Label>
                                <Textarea
                                    id="head_office_address"
                                    value={content.contact.head_office_address}
                                    onChange={(e) => handleContentChange('contact', 'head_office_address', e.target.value)}
                                    rows={2}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="head_office_phone">Phone</Label>
                                    <Input
                                        id="head_office_phone"
                                        value={content.contact.head_office_phone}
                                        onChange={(e) => handleContentChange('contact', 'head_office_phone', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="head_office_email">Email</Label>
                                    <Input
                                        id="head_office_email"
                                        type="email"
                                        value={content.contact.head_office_email}
                                        onChange={(e) => handleContentChange('contact', 'head_office_email', e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-blue-50 border-blue-200">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold uppercase text-blue-900">Note</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-blue-800">
                                Additional office locations (Branch Office, Copperbelt Office) are managed through the code. Contact your developer for changes.
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Preview Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-bold font-heading uppercase flex items-center gap-2">
                        <Eye className="w-5 h-5" />
                        Live Preview
                    </CardTitle>
                    <CardDescription>See how your changes will appear (save to update public site)</CardDescription>
                </CardHeader>
                <CardContent className="bg-gray-50 p-6 rounded">
                    <p className="text-sm text-gray-600 text-center">
                        Preview functionality will be available in a future update.
                        <br />
                        For now, save your changes and view them on the public website.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
