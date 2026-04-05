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
    googleCalendar: "/google-calendar",
};

export const routes = {
    ...PublicRoutes
};

export const navItems = [
  { label: "about", path: "/about" },
  { label: "projects", path: "/projects" },
  { label: "stories", path: "/stories" },
  { label: "calendar", path: "/calendar" },
  { label: "google_calendar", path: "/google-calendar" },
  { label: "blog", path: "/blog", hasDropdown: true },
  { label: "contact", path: "/contact" },
];