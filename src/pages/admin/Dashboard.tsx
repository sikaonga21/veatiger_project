import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Briefcase, FolderKanban, Eye, TrendingUp, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Mock data - will be replaced with real API calls
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

const recentActivities = [
    { id: 1, action: 'New career posted', item: 'Civil Engineer', time: '2 hours ago', type: 'career' },
    { id: 2, action: 'Project updated', item: 'ZESCO Infrastructure', time: '5 hours ago', type: 'project' },
    { id: 3, action: 'Content modified', item: 'About Page', time: '1 day ago', type: 'content' },
    { id: 4, action: 'Career deleted', item: 'Accountant', time: '2 days ago', type: 'career' },
];

export default function AdminDashboard() {
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
                <Card className="border-l-4 border-l-primary">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600 uppercase">
                            Total Projects
                        </CardTitle>
                        <FolderKanban className="w-5 h-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black">24</div>
                        <p className="text-xs text-gray-500 mt-1">
                            <span className="text-green-600 font-medium">+3</span> from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-secondary">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600 uppercase">
                            Active Careers
                        </CardTitle>
                        <Briefcase className="w-5 h-5 text-secondary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black">6</div>
                        <p className="text-xs text-gray-500 mt-1">
                            Currently hiring
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600 uppercase">
                            Total Page Views
                        </CardTitle>
                        <Eye className="w-5 h-5 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black">12,453</div>
                        <p className="text-xs text-gray-500 mt-1">
                            <span className="text-green-600 font-medium">+18%</span> from last week
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600 uppercase">
                            Unique Visitors
                        </CardTitle>
                        <Users className="w-5 h-5 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-black">3,287</div>
                        <p className="text-xs text-gray-500 mt-1">
                            Last 30 days
                        </p>
                    </CardContent>
                </Card>
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

            {/* Recent Activity & Quick Actions */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Recent Activity */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold font-heading uppercase flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            Recent Activity
                        </CardTitle>
                        <CardDescription>Latest changes to your content</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivities.map((activity) => (
                                <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                                    <div className={`w-2 h-2 rounded-full mt-2 ${activity.type === 'career' ? 'bg-secondary' :
                                            activity.type === 'project' ? 'bg-primary' :
                                                'bg-blue-500'
                                        }`} />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-black">{activity.action}</p>
                                        <p className="text-sm text-gray-600">{activity.item}</p>
                                    </div>
                                    <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
                                </div>
                            ))}
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
                        <Link to="/admin/content">
                            <Button className="w-full bg-white hover:bg-gray-100 text-black font-bold uppercase">
                                <TrendingUp className="w-4 h-4 mr-2" />
                                Edit Content
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
