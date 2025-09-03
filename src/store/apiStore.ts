import { create } from 'zustand';
import { apiV2 } from '../utils/axios';
import type { INews } from '../types/types';
interface NewsStore {
    loading: boolean;
    blog: INews[] | [];
    blogSingle: INews | null;
    fetchBlog: () => Promise<void>;
    fetchBlogSingle: (newsId: number) => Promise<void>;
}

export const useNewsStore = create<NewsStore>((set) => ({
    loading: false,
    blog: [],
    blogSingle: null,
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
    }
}));