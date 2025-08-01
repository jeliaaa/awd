import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BackBtn from './BackBtn';


const Breadcrumbs: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  const generatePath = (index: number) => {
    return '/' + pathnames.slice(0, index + 1).join('/');
  };

  return (
    <nav className="flex items-center justify-between py-4 px-6 bg-background text-primary plain-text w-full">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/" className="hover:underline">
            {/* {t('main')} */}
            მთავარი
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const isLast = index === pathnames.length - 1;
          const path = generatePath(index);

          return (
            <li key={index} className="flex items-center space-x-2">
              <span>/</span>
              {isLast ? (
                <span className="text-gray-500">{t(name)}</span>
              ) : (
                <Link to={path} className="hover:underline">
                  {t(name)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <BackBtn />
    </nav>
  );
};

export default Breadcrumbs;
