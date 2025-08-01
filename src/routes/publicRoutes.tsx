import { lazy } from "react";
import { routes } from "./routes";

// Lazy imports
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Projects = lazy(() => import('../pages/Projects'));
const Reports = lazy(() => import('../pages/Reports'));
const Stories = lazy(() => import('../pages/Stories'));
const Calendar = lazy(() => import('../pages/Calendar'));
const Blog = lazy(() => import('../pages/Blog'));
const BlogSingle = lazy(() => import('../pages/BlogSingle'));
const ContactUs = lazy(() => import('../pages/ContactUs'));

export const publicRoutes = [
    { showBreadcrumbs: false, title: "home", path: routes.home, component: Home },
    { showBreadcrumbs: true, title: "about", path: routes.about, component: About },
    { showBreadcrumbs: true, title: "projects", path: routes.projects, component: Projects },
    { showBreadcrumbs: true, title: "reports", path: routes.reports, component: Reports },
    { showBreadcrumbs: true, title: "stories", path: routes.stories, component: Stories },
    { showBreadcrumbs: true, title: "calendar", path: routes.calendar, component: Calendar },
    { showBreadcrumbs: true, title: "blog", path: routes.blog, component: Blog },
    { showBreadcrumbs: true, title: "blogSingle", path: routes.blogSingle, component: BlogSingle },
    { showBreadcrumbs: true, title: "contact", path: routes.contact, component: ContactUs }
];
