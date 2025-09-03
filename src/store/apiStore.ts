import { create } from 'zustand';
import { apiV2 } from '../utils/axios';
import type { IEvent, INews } from '../types/types';
interface ApiStore {
    loading: boolean;
    blog: INews[] | [];
    blogSingle: INews | null;
    events: IEvent[] | [];
    eventSingle: IEvent | null;
    fetchBlog: () => Promise<void>;
    fetchBlogSingle: (newsId: number) => Promise<void>;
    fetchEvents: () => Promise<void>;
    fetchEventSingle: (eventId: number) => Promise<void>;
}

export const useApiStore = create<ApiStore>((set) => ({
    loading: false,
    blog: [],
    blogSingle: null,
    events: [],
    eventSingle: null,
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