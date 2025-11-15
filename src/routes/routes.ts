export const PublicRoutes = {
    login: "/login",
    register: "/register",
    home: "/",
    about: "/about",
    projects: "/projects",
    projectsSingle: "/projects/:id",
    dontaion: "/donate",
    stories: "/stories",
    calendar: "/calendar",
    blog: "/blog",
    blogSingle: "/blog/:id",
    contact: "/contact",
};

export const routes = {
    ...PublicRoutes
};

export const navItems = [
  { label: "about", path: "/about" },
  { label: "projects", path: "/projects" },
  { label: "donate", path: "/donate" },
  { label: "stories", path: "/stories" },
  { label: "calendar", path: "/calendar" },
  { label: "blog", path: "/blog" },
  { label: "contact", path: "/contact" },
];