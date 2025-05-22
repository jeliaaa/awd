import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import Geo from '../assets/flags/geo.png';
import US from '../assets/flags/US.webp';

const supportedLanguages = ['ka', 'en'] as const;

const languageFlags: Record<(typeof supportedLanguages)[number], string> = {
    ka: Geo,
    en: US,
};

const LanguageDropdown = () => {
    const { i18n } = useTranslation();
    const location = useLocation();

    const handleLanguageChange = (newLang: string) => {
        if (newLang === i18n.language) return;

        const pathWithoutLang = location.pathname.replace(/^\/(en|ka)/, '');
        const newUrl = `/${newLang}${pathWithoutLang}${location.search}${location.hash}`;
        window.location.href = newUrl;
    };

    return (
        <div className="flex items-center space-x-3">
            {supportedLanguages.map((lang) => (
                <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`transition-all duration-200 cursor-pointer overflow-hidden w-12 h-8 border-2 ${i18n.language === lang ? 'scale-110 border-primary' : 'opacity-60 hover:opacity-100 border-transparent'
                        }`}
                >
                    <img src={languageFlags[lang]} alt={`${lang} flag`} className="w-full h-full object-cover" />
                </button>
            ))}
        </div>
    );
};

export default LanguageDropdown;
