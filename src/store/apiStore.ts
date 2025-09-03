import { create } from 'zustand';
import { apiV2 } from '../utils/axios';
import type { IAbout, IEvent, IMember, INews, IProject } from '../types/types';
interface ApiStore {
    loading: boolean;
    blog: INews[] | [];
    about: IAbout | null;
    members: IMember[] | [];
    projects: IProject[] | [];
    blogSingle: INews | null;
    events: IEvent[] | [];
    eventSingle: IEvent | null;
    fetchAbout: () => Promise<void>;
    fetchMembers: () => Promise<void>;
    fetchProjects: (year: number) => Promise<void>;
    fetchBlog: () => Promise<void>;
    fetchBlogSingle: (newsId: number) => Promise<void>;
    fetchEvents: () => Promise<void>;
    fetchEventSingle: (eventId: number) => Promise<void>;
}

export const useApiStore = create<ApiStore>((set) => ({
    loading: false,
    about: null,
    blog: [],
    members: [],
    projects: [],
    blogSingle: null,
    events: [],
    eventSingle: null,
    fetchAbout: async () => {
        set({ loading: true })
        try {
            const res = await apiV2.get('/about/view');
            set({ about: res.data });
            set({ loading: false })
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            set({ loading: false })
        }
    },
    fetchMembers: async () => {
        set({ loading: true })
        try {
            const res = await apiV2.get('/member/list');

            set({ members: res.data });
            set({ loading: false })
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            set({ loading: false })
        }
    },
    fetchProjects: async (year: number) => {
        set({ loading: true })
        try {
            const res = await apiV2.get(`/project/list?year=${year}`);
            set({ projects: res.data, loading: false })
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            set({ loading: false })
        }
    },
    fetchBlog: async () => {
        set({ loading: true })
        try {
            const res = await apiV2.get('/blog/list');
            set({ blog: res.data });
            set({ loading: false })

        } catch (error) {
            console.error('Failed to fetch categories:', error);
            set({ loading: false })

        }
    },
    fetchBlogSingle: async (newsId: number) => {
        set({ loading: true })
        try {
            const res = await apiV2.get(`/blog/details/${newsId}`);
            set({ blogSingle: res.data, loading: false });
        } catch (error) {
            console.error('Failed to fetch quizzes:', error);
            set({ loading: false })
        }
    },
    fetchEvents: async () => {
        set({ loading: true })
        try {
            const res = await apiV2.get('/event/list');
            set({ events: res.data });
            set({ loading: false })

        } catch (error) {
            console.error('Failed to fetch categories:', error);
            set({ loading: false })

        }
    },
    fetchEventSingle: async (eventId: number) => {
        set({ loading: true })
        try {
            const res = await apiV2.get(`/event/details/${eventId}`);
            set({ eventSingle: res.data, loading: false });
        } catch (error) {
            console.error('Failed to fetch quizzes:', error);
            set({ loading: false })
        }
    }
}));