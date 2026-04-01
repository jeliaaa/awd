import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import Geo from '../assets/flags/geo.png';
import US from '../assets/flags/uk.webp';

const supportedLanguages = ['ka', 'en'] as const;

const languageOptions: Record<
  (typeof supportedLanguages)[number],
  { label: string; flag: string }
> = {
  ka: {
    label: 'GE',
    flag: Geo,
  },
  en: {
    label: 'EN',
    flag: US,
  },
};

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const currentLang = supportedLanguages.includes(i18n.language as 'ka' | 'en')
    ? (i18n.language as 'ka' | 'en')
    : 'en';

  const handleLanguageChange = (newLang: string) => {
    if (newLang === i18n.language) {
      setOpen(false);
      return;
    }

    const pathWithoutLang = location.pathname.replace(/^\/(en|ka)/, '');
    const newUrl = `/${newLang}${pathWithoutLang}${location.search}${location.hash}`;
    window.location.href = newUrl;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm transition hover:border-gray-300 hover:shadow-md focus:outline-none"
      >
        <img
          src={languageOptions[currentLang].flag}
          alt={languageOptions[currentLang].label}
          className="h-5 w-7 rounded-sm object-cover"
        />

        <span className="text-sm font-semibold text-gray-800">
          {languageOptions[currentLang].label}
        </span>

        {/* <ChevronDown
          size={16}
          className={`text-gray-500 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        /> */}
      </button>

      <div
        className={`absolute right-0 z-50 mt-2 w-36 origin-top-right rounded-xl border border-gray-200 bg-white p-1 shadow-lg transition-all duration-200 ${
          open
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        {supportedLanguages.map((lang) => {
          const isActive = currentLang === lang;

          return (
            <button
              key={lang}
              type="button"
              onClick={() => handleLanguageChange(lang)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition ${
                isActive
                  ? 'bg-gray-100'
                  : 'hover:bg-gray-50'
              }`}
            >
              <img
                src={languageOptions[lang].flag}
                alt={languageOptions[lang].label}
                className="h-5 w-7 rounded-sm object-cover"
              />

              <span className="text-sm font-medium text-gray-800">
                {languageOptions[lang].label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageDropdown;