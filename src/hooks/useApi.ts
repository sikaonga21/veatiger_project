import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

// Helper to handle Supabase errors
const handleSupabaseError = (error: any) => {
    if (error) throw new Error(error.message);
};

// Career hooks
export const useCareerQuery = () => {
    return useQuery({
        queryKey: ['careers'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('careers')
                .select('*')
                .order('created_at', { ascending: false });
            handleSupabaseError(error);
            return data;
        },
    });
};

export const useCareerMutation = () => {
    const queryClient = useQueryClient();

    return {
        create: useMutation({
            mutationFn: async (data: any) => {
                const { data: newCareer, error } = await supabase
                    .from('careers')
                    .insert([data])
                    .select()
                    .single();
                handleSupabaseError(error);
                return newCareer;
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['careers'] });
            },
        }),
        update: useMutation({
            mutationFn: async ({ id, data }: { id: number; data: any }) => {
                const { data: updatedCareer, error } = await supabase
                    .from('careers')
                    .update(data)
                    .eq('id', id)
                    .select()
                    .single();
                handleSupabaseError(error);
                return updatedCareer;
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['careers'] });
            },
        }),
        delete: useMutation({
            mutationFn: async (id: number) => {
                const { error } = await supabase
                    .from('careers')
                    .delete()
                    .eq('id', id);
                handleSupabaseError(error);
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['careers'] });
            },
        }),
    };
};

// Project hooks
export const useProjectQuery = () => {
    return useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });
            handleSupabaseError(error);
            return data;
        },
    });
};

export const useProjectMutation = () => {
    const queryClient = useQueryClient();

    return {
        create: useMutation({
            mutationFn: async (data: any) => {
                const { data: newProject, error } = await supabase
                    .from('projects')
                    .insert([data])
                    .select()
                    .single();
                handleSupabaseError(error);
                return newProject;
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['projects'] });
            },
        }),
        update: useMutation({
            mutationFn: async ({ id, data }: { id: number; data: any }) => {
                const { data: updatedProject, error } = await supabase
                    .from('projects')
                    .update(data)
                    .eq('id', id)
                    .select()
                    .single();
                handleSupabaseError(error);
                return updatedProject;
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['projects'] });
            },
        }),
        delete: useMutation({
            mutationFn: async (id: number) => {
                const { error } = await supabase
                    .from('projects')
                    .delete()
                    .eq('id', id);
                handleSupabaseError(error);
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['projects'] });
            },
        }),
    };
};

// Blog hooks
export const useBlogQuery = () => {
    return useQuery({
        queryKey: ['blog_posts'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .order('created_at', { ascending: false });
            handleSupabaseError(error);
            return data;
        },
    });
};

export const useBlogMutation = () => {
    const queryClient = useQueryClient();

    return {
        create: useMutation({
            mutationFn: async (data: any) => {
                const { data: newPost, error } = await supabase
                    .from('blog_posts')
                    .insert([data])
                    .select()
                    .single();
                handleSupabaseError(error);
                return newPost;
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['blog_posts'] });
            },
        }),
        update: useMutation({
            mutationFn: async ({ id, data }: { id: number; data: any }) => {
                const { data: updatedPost, error } = await supabase
                    .from('blog_posts')
                    .update(data)
                    .eq('id', id)
                    .select()
                    .single();
                handleSupabaseError(error);
                return updatedPost;
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['blog_posts'] });
            },
        }),
        delete: useMutation({
            mutationFn: async (id: number) => {
                const { error } = await supabase
                    .from('blog_posts')
                    .delete()
                    .eq('id', id);
                handleSupabaseError(error);
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['blog_posts'] });
            },
        }),
    };
};

// Analytics hooks (real stats from DB)
export const useAnalyticsQuery = () => {
    return useQuery({
        queryKey: ['analytics'],
        queryFn: async () => {
            const [
                { count: projectsCount },
                { count: careersCount },
                { count: blogCount },
                { count: messagesCount },
            ] = await Promise.all([
                supabase.from('projects').select('*', { count: 'exact', head: true }),
                supabase.from('careers').select('*', { count: 'exact', head: true }).eq('status', 'active'),
                supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
                supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
            ]);

            return {
                projects: projectsCount || 0,
                active_careers: careersCount || 0,
                blog_posts: blogCount || 0,
                messages: messagesCount || 0,
            };
        },
    });
};

export const useTrackVisit = () => {
    return useMutation({
        mutationFn: async (data: { page: string; referrer?: string }) => {
            console.log('Tracking visit:', data);
        },
    });
};

// Contact form hook
export const useContactMutation = () => {
    return useMutation({
        mutationFn: async (data: {
            name: string;
            email: string;
            subject: string;
            message: string;
        }) => {
            const { data: result, error } = await supabase
                .from('contact_messages')
                .insert([{ ...data, status: 'unread' }])
                .select()
                .single();
            handleSupabaseError(error);
            return result;
        },
    });
};

// Dashboard stats hook
export const useDashboardStats = () => {
    return useQuery({
        queryKey: ['dashboard_stats'],
        queryFn: async () => {
            const [
                { count: totalProjects },
                { count: activeCareers },
                { count: totalBlogPosts },
                { count: unreadMessages },
            ] = await Promise.all([
                supabase.from('projects').select('*', { count: 'exact', head: true }),
                supabase.from('careers').select('*', { count: 'exact', head: true }).eq('status', 'active'),
                supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
                supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('status', 'unread'),
            ]);
            return {
                totalProjects: totalProjects || 0,
                activeCareers: activeCareers || 0,
                totalBlogPosts: totalBlogPosts || 0,
                unreadMessages: unreadMessages || 0,
            };
        },
    });
};
