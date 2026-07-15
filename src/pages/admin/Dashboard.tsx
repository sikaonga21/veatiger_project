import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Briefcase, FolderKanban, MessageSquare, FileText, TrendingUp, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useDashboardStats } from '@/hooks/useApi';

// Placeholder chart data (visual indicator only)
const pageViewsData = [
    { name: 'Mon', views: 245 },
    { name: 'Tue', views: 312 },
    { name: 'Wed', views: 289 },
    { name: 'Thu', views: 402 },
    { name: 'Fri', views: 478 },
    { name: 'Sat', views: 321 },
    { name: 'Sun', views: 267 },
];

const visitorTrendData = [
    { name: 'Week 1', visitors: 1240 },
    { name: 'Week 2', visitors: 1398 },
    { name: 'Week 3', visitors: 1580 },
    { name: 'Week 4', visitors: 1789 },
];

export default function AdminDashboard() {
    const { data: stats, isLoading: statsLoading } = useDashboardStats();

    const statCards = [
        {
            label: 'Total Projects',
            value: statsLoading ? '...' : stats?.totalProjects ?? 0,
            icon: FolderKanban,
            color: 'border-l-primary',
            iconColor: 'text-primary',
            sub: 'In your portfolio',
        },
        {
            label: 'Active Careers',
            value: statsLoading ? '...' : stats?.activeCareers ?? 0,
            icon: Briefcase,
            color: 'border-l-secondary',
            iconColor: 'text-secondary',
            sub: 'Currently hiring',
        },
        {
            label: 'Blog Posts',
            value: statsLoading ? '...' : stats?.totalBlogPosts ?? 0,
            icon: FileText,
            color: 'border-l-blue-500',
            iconColor: 'text-blue-500',
            sub: 'Published articles',
        },
        {
            label: 'Unread Messages',
            value: statsLoading ? '...' : stats?.unreadMessages ?? 0,
            icon: MessageSquare,
            color: 'border-l-purple-500',
            iconColor: 'text-purple-500',
            sub: 'From contact form',
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold font-heading text-black uppercase mb-2">
                    Dashboard
                </h1>
                <p className="text-gray-600">Welcome back! Here's what's happening with your website.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.label} className={`border-l-4 ${stat.color}`}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-gray-600 uppercase">
                                    {stat.label}
                                </CardTitle>
                                <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold text-black">{String(stat.value)}</div>
                                <p className="text-xs text-gray-500 mt-1">{stat.sub}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Charts */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Daily Page Views */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-bold font-heading uppercase">
                            Daily Page Views
                        </CardTitle>
                        <CardDescription>Views for the last 7 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={pageViewsData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="name" stroke="#666" />
                                <YAxis stroke="#666" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e5e5e5',
                                        borderRadius: '4px'
                                    }}
                                />
                                <Bar dataKey="views" fill="#FDF113" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Visitor Trend */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg font-bold font-heading uppercase">
                            Visitor Trend
                        </CardTitle>
                        <CardDescription>Monthly visitor growth</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={visitorTrendData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="name" stroke="#666" />
                                <YAxis stroke="#666" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e5e5e5',
                                        borderRadius: '4px'
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="visitors"
                                    stroke="#285F04"
                                    strokeWidth={3}
                                    dot={{ fill: '#285F04', r: 5 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* DB Status */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold font-heading uppercase flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            Supabase Connection
                        </CardTitle>
                        <CardDescription>Live data from your Supabase project</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 pb-3 border-b">
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                                <div>
                                    <p className="text-sm font-medium text-black">Connected to Supabase</p>
                                    <p className="text-xs text-gray-500">Project: isrrbfclonghenrwqpjp</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 rounded p-3">
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Projects table</p>
                                    <p className="text-lg font-bold text-black mt-1">
                                        {statsLoading ? '...' : stats?.totalProjects ?? 0} rows
                                    </p>
                                </div>
                                <div className="bg-gray-50 rounded p-3">
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Careers table</p>
                                    <p className="text-lg font-bold text-black mt-1">
                                        {statsLoading ? '...' : stats?.activeCareers ?? 0} active
                                    </p>
                                </div>
                                <div className="bg-gray-50 rounded p-3">
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Blog posts table</p>
                                    <p className="text-lg font-bold text-black mt-1">
                                        {statsLoading ? '...' : stats?.totalBlogPosts ?? 0} rows
                                    </p>
                                </div>
                                <div className="bg-gray-50 rounded p-3">
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Contact messages</p>
                                    <p className="text-lg font-bold text-black mt-1">
                                        {statsLoading ? '...' : stats?.unreadMessages ?? 0} unread
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-black text-white">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold font-heading uppercase text-primary">
                            Quick Actions
                        </CardTitle>
                        <CardDescription className="text-gray-400">Manage your content</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Link to="/admin/careers">
                            <Button className="w-full bg-primary hover:bg-primary/90 text-black font-bold uppercase">
                                <Briefcase className="w-4 h-4 mr-2" />
                                Add Career
                            </Button>
                        </Link>
                        <Link to="/admin/projects">
                            <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold uppercase">
                                <FolderKanban className="w-4 h-4 mr-2" />
                                Add Project
                            </Button>
                        </Link>
                        <Link to="/admin/blog">
                            <Button className="w-full bg-white hover:bg-gray-100 text-black font-bold uppercase">
                                <TrendingUp className="w-4 h-4 mr-2" />
                                Write Blog Post
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
