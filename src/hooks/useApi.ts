import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Mock API base URL - replace with actual backend URL
const API_BASE_URL = '/api';

// API client helper
const apiClient = {
    get: async (endpoint: string) => {
        const token = localStorage.getItem('admin_token');
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
            },
        });
        if (!response.ok) throw new Error('API request failed');
        return response.json();
    },

    post: async (endpoint: string, data: any) => {
        const token = localStorage.getItem('admin_token');
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('API request failed');
        return response.json();
    },

    put: async (endpoint: string, data: any) => {
        const token = localStorage.getItem('admin_token');
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('API request failed');
        return response.json();
    },

    delete: async (endpoint: string) => {
        const token = localStorage.getItem('admin_token');
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Authorization': token ? `Bearer ${token}` : '',
            },
        });
        if (!response.ok) throw new Error('API request failed');
        return response.json();
    },
};

// Career hooks
export const useCareerQuery = () => {
    return useQuery({
        queryKey: ['careers'],
        queryFn: () => apiClient.get('/careers'),
    });
};

export const useCareerMutation = () => {
    const queryClient = useQueryClient();

    return {
        create: useMutation({
            mutationFn: (data: any) => apiClient.post('/careers', data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['careers'] });
            },
        }),
        update: useMutation({
            mutationFn: ({ id, data }: { id: number; data: any }) =>
                apiClient.put(`/careers/${id}`, data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['careers'] });
            },
        }),
        delete: useMutation({
            mutationFn: (id: number) => apiClient.delete(`/careers/${id}`),
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
        queryFn: () => apiClient.get('/projects'),
    });
};

export const useProjectMutation = () => {
    const queryClient = useQueryClient();

    return {
        create: useMutation({
            mutationFn: (data: any) => apiClient.post('/projects', data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['projects'] });
            },
        }),
        update: useMutation({
            mutationFn: ({ id, data }: { id: number; data: any }) =>
                apiClient.put(`/projects/${id}`, data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['projects'] });
            },
        }),
        delete: useMutation({
            mutationFn: (id: number) => apiClient.delete(`/projects/${id}`),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['projects'] });
            },
        }),
    };
};

// Analytics hooks
export const useAnalyticsQuery = () => {
    return useQuery({
        queryKey: ['analytics'],
        queryFn: () => apiClient.get('/analytics/stats'),
    });
};

export const useTrackVisit = () => {
    return useMutation({
        mutationFn: (data: { page: string; referrer?: string }) =>
            apiClient.post('/analytics/track', data),
    });
};

// Content hooks
export const useContentQuery = () => {
    return useQuery({
        queryKey: ['content'],
        queryFn: () => apiClient.get('/content'),
    });
};

export const useContentMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ key, data }: { key: string; data: any }) =>
            apiClient.put(`/content/${key}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['content'] });
        },
    });
};

// Blog hooks
export const useBlogQuery = () => {
    return useQuery({
        queryKey: ['blog'],
        queryFn: () => apiClient.get('/blog'),
    });
};

export const useBlogMutation = () => {
    const queryClient = useQueryClient();

    return {
        create: useMutation({
            mutationFn: (data: any) => apiClient.post('/blog', data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['blog'] });
            },
        }),
        update: useMutation({
            mutationFn: ({ id, data }: { id: number; data: any }) =>
                apiClient.put(`/blog/${id}`, data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['blog'] });
            },
        }),
        delete: useMutation({
            mutationFn: (id: number) => apiClient.delete(`/blog/${id}`),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['blog'] });
            },
        }),
    };
};
