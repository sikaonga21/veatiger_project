import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
    LayoutDashboard,
    Briefcase,
    FolderKanban,
    FileText,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { useState } from 'react';

export const AdminLayout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Careers', href: '/admin/careers', icon: Briefcase },
        { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
        { name: 'Blog', href: '/admin/blog', icon: FileText },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-full w-64 bg-black text-white transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-white/10">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold font-heading text-primary uppercase">
                                Veatiger
                            </h1>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="lg:hidden text-white hover:text-primary"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Admin Panel</p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive(item.href)
                                        ? 'bg-primary text-black font-bold'
                                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium uppercase text-sm tracking-wide">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User info & logout */}
                    <div className="p-4 border-t border-white/10">
                        <div className="flex items-center gap-3 mb-4 px-4">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <span className="text-primary font-bold text-lg">
                                    {user?.name?.charAt(0) || 'A'}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium uppercase text-sm tracking-wide">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="lg:ml-64">
                {/* Top bar */}
                <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
                    <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-gray-600 hover:text-gray-900"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="flex-1 lg:flex-none"></div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600 hidden sm:inline">
                                Welcome, <span className="font-semibold text-black">{user?.name}</span>
                            </span>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
