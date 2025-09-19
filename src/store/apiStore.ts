import { create } from 'zustand';
import { apiV2 } from '../utils/axios';
import type { IAbout, IEvent, IMember, IBlog, IProject, IActivity, IVideo, IContactInfo, StoryVideo } from '../types/types';
interface ApiStore {
    loading: boolean;
    blog: IBlog[] | [];
    about: IAbout | null;
    members: IMember[] | [];
    projects: IProject[] | [];
    projectSingle: IProject | null;
    blogSingle: IBlog | null;
    events: IEvent[] | [];
    eventSingle: IEvent | null;
    activities: IActivity[] | [];
    videos: IVideo[] | [];
    stories: StoryVideo[] | [];
    contactInfo: IContactInfo | null;
    resMessage: string | null;
    fetchAbout: () => Promise<void>;
    fetchMembers: () => Promise<void>;
    fetchProjects: (year: number) => Promise<void>;
    fetchProjectsSingle: (id: number) => Promise<void>;
    fetchBlog: () => Promise<void>;
    fetchBlogSingle: (newsId: number) => Promise<void>;
    fetchEvents: () => Promise<void>;
    fetchEventSingle: (eventId: number) => Promise<void>;
    fetchActivities: (limit: number, offset: number) => Promise<void>;
    fetchVideos: () => Promise<void>;
    fetchStories: () => Promise<void>;
    sendEmail: (name: string, email: string, message: string) => Promise<void>;
    fetchContactInfo:() => Promise<void>;
}

export const useApiStore = create<ApiStore>((set) => ({
    loading: false,
    about: null,
    blog: [],
    members: [],
    projects: [],
    projectSingle: null,
    blogSingle: null,
    events: [],
    eventSingle: null,
    activities: [],
    videos: [],
    stories: [],
    resMessage: null,
    contactInfo: null,
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
    fetchProjectsSingle: async (id: number) => {
        set({ loading: true })
        try {
            const res = await apiV2.get(`/project/details/${id}`);
            set({ projectSingle: res.data, loading: false });
        } catch (error) {
            console.error('Failed to fetch quizzes:', error);
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
    },
    fetchActivities: async (limit: number, offset: number) => {
        set({ loading: true })
        try {
            const res = await apiV2.get(`/activity/list?limit=${limit}&offset=${offset}&ordering=-created_at`);
            set({ activities: res.data, loading: false });
        } catch (error) {
            console.error('Failed to fetch quizzes:', error);
            set({ loading: false })
        }
    },
    fetchVideos: async () => {
        set({ loading: true })
        try {
            const res = await apiV2.get('/video/list');
            set({ videos: res.data });
            set({ loading: false })

        } catch (error) {
            console.error('Failed to fetch categories:', error);
            set({ loading: false })

        }
    },
    fetchStories: async () => {
        set({ loading: true })
        try {
            const res = await apiV2.get('/story/list');
            set({ stories: res.data });
            set({ loading: false })

        } catch (error) {
            console.error('Failed to fetch categories:', error);
            set({ loading: false })

        }
    },
    fetchContactInfo: async () => {
        set({ loading: true })
        try {
            const res = await apiV2.get('/contact/info');
            set({ contactInfo: res.data });
            set({ loading: false })

        } catch (error) {
            console.error('Failed to fetch categories:', error);
            set({ loading: false })

        }
    },
    sendEmail: async (name: string, email: string, message: string) => {
        set({ loading: true })
        try {
            const res = await apiV2.post('/contact/create',
                { name, email, message }
            );
            set({ resMessage: res.data.detail });
            set({ loading: false })

        } catch (error) {
            console.error('Failed to fetch categories:', error);
            set({ loading: false })

        }
    },
}));