import { Link, useLocation } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
import ChevronLeftIcon from "../../assets/icons/chevron-right.svg?react";
import { useTranslation } from 'react-i18next';


const BackBtn = () => {
    const path = useLocation().pathname;
    let pathArr = path.split('/');
    pathArr.pop();
    
    const { t } = useTranslation();

    if (pathArr.length > 1) {
        pathArr.shift();
    } else {
        pathArr = [''];
    }

    const newPath = `/${pathArr.join('/')}`;

    return (
        <Link to={newPath} className='flex justify-between cursor-pointer items-center'>
            <ChevronLeftIcon className="text-primary rotate-180 w-4 h-4 fill-primary" />
            <button className="text-primary cursor-pointer uppercase bg-color-primary rounded">
                <span>{t('back')}</span>
            </button>
        </Link>
    );
};

export default BackBtn;
