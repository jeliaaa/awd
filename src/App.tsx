import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Accesebility from './components/Accesebility';
import Breadcrumbs from './components/webNav/Breadcrumbs';
import { publicRoutes } from './routes/publicRoutes';

const App = () => {
  const location = useLocation();
  const currentRoute = publicRoutes.find(route =>
    location.pathname === route.path ||
    location.pathname.startsWith(route.path + '/')
  );
  const showBreadcrumbs = currentRoute?.showBreadcrumbs;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <Header />
      <div className="main_wrapper w-full flex flex-col items-center justify-start">
        {showBreadcrumbs && <Breadcrumbs />}
        <Routes>
          {publicRoutes.map(({ path, component: Element }) => (
            <Route key={path} path={path} element={<Element />} />
          ))}
        </Routes>
      </div>
      <Footer />
      <Accesebility />
    </div>
  );
};

export default App;
