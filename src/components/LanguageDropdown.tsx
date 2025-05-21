import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const supportedLanguages = ['en', 'ka'] as const;

const LanguageDropdown = () => {
    const { i18n } = useTranslation();
    const location = useLocation();

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLang = e.target.value;

        if (newLang === i18n.language) return;

        // Remove the existing lang prefix from current path
        const pathWithoutLang = location.pathname.replace(/^\/(en|ka)/, '');

        // Navigate to new path and refresh the page
        const newUrl = `/${newLang}${pathWithoutLang}${location.search}${location.hash}`;
        window.location.href = newUrl; // hard reload
    };

    return (
        <select
            value={i18n.language}
            onChange={handleLanguageChange}
            className="border border-gray-300 rounded px-2 py-1 plain-text bg-white cursor-pointer"
        >
            {supportedLanguages.map(lang => (
                <option key={lang} value={lang}>
                    {lang.toUpperCase()}
                </option>
            ))}
        </select>
    );
};

export default LanguageDropdown;
