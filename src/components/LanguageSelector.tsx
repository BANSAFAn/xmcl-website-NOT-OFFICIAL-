import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, ChevronDown, Search, Check, Sparkles, X } from "lucide-react";
import { useTranslation } from "@/contexts/TranslationContext";
import { languageConfigs } from "@/i18n/languageConfigs";
import { motion, AnimatePresence } from "framer-motion";

const USER_PREFERENCE_KEY = "userPreferredLanguage";
const AUTO_TRANSLATE_KEY = "autoTranslateLanguage";

// Languages for auto-translate (not in manual translation list)
const AUTO_TRANSLATE_LANGUAGES = [
  { code: 'pl', name: 'Polish', nativeName: 'Polski' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština' },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina' },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български' },
  { code: 'sr', name: 'Serbian', nativeName: 'Српски' },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski' },
  { code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά' },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' },
];

const LanguageSelectorComponent = () => {
  const { t, locale, changeLanguage } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'manual' | 'auto'>('manual');
  const [autoTranslateLanguage, setAutoTranslateLanguage] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load saved auto-translate preference
  useEffect(() => {
    try {
      const savedAutoLang = localStorage.getItem(AUTO_TRANSLATE_KEY);
      if (savedAutoLang) {
        setAutoTranslateLanguage(savedAutoLang);
      }
    } catch {}
  }, []);

  // Update dropdown position when opening
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        left: rect.left,
      });
    }
  }, [isOpen]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const filteredLanguages = useMemo(() => {
    if (!searchTerm) return languageConfigs;
    const term = searchTerm.toLowerCase();
    return languageConfigs.filter(
      (lang) =>
        lang.name.toLowerCase().includes(term) ||
        lang.code.toLowerCase().includes(term),
    );
  }, [searchTerm]);

  const filteredAutoLanguages = useMemo(() => {
    if (!searchTerm) return AUTO_TRANSLATE_LANGUAGES;
    const term = searchTerm.toLowerCase();
    return AUTO_TRANSLATE_LANGUAGES.filter(
      (lang) =>
        lang.name.toLowerCase().includes(term) ||
        lang.nativeName.toLowerCase().includes(term) ||
        lang.code.toLowerCase().includes(term),
    );
  }, [searchTerm]);

  const handleLanguageChange = useCallback(
    (langCode: string) => {
      changeLanguage(langCode);
      localStorage.setItem(USER_PREFERENCE_KEY, langCode);
      localStorage.removeItem(AUTO_TRANSLATE_KEY);
      setAutoTranslateLanguage(null);
      setSearchTerm("");
      setIsOpen(false);
    },
    [changeLanguage],
  );

  const handleAutoTranslate = useCallback(
    (langCode: string) => {
      setAutoTranslateLanguage(langCode);
      localStorage.setItem(AUTO_TRANSLATE_KEY, langCode);
      setSearchTerm("");
      setIsOpen(false);
    },
    [],
  );

  const currentLanguage = useMemo(
    () => languageConfigs.find((lang) => lang.code === locale),
    [locale],
  );

  const autoLangDisplay = autoTranslateLanguage 
    ? AUTO_TRANSLATE_LANGUAGES.find(l => l.code === autoTranslateLanguage)?.nativeName
    : null;

  return (
    <>
      {/* Trigger Button */}
      <Button
        ref={buttonRef}
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative w-full h-10 justify-between gap-2 overflow-hidden rounded-xl bg-black/5 dark:bg-white/10 px-3 text-slate-700 dark:text-slate-200 transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/15 border border-transparent dark:border-white/5"
        aria-label={t("ui.changeLanguage")}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/50 dark:bg-black/20 text-slate-600 dark:text-slate-300">
             {autoTranslateLanguage ? <Sparkles className="h-3.5 w-3.5 text-yellow-500" /> : <Globe className="h-3.5 w-3.5" />}
          </div>
          <span className="font-medium text-sm truncate">
            {autoLangDisplay || currentLanguage?.name || "English"}
          </span>
          {autoTranslateLanguage && (
            <span className="text-[10px] bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 px-1.5 py-0.5 rounded-full">AUTO</span>
          )}
        </div>
        <ChevronDown className={`h-4 w-4 opacity-50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {/* Dropdown Panel - Rendered via Portal */}
      {isOpen && createPortal(
        <AnimatePresence>
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed',
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              zIndex: 99999,
            }}
            className="w-[300px] overflow-hidden rounded-2xl border border-white/20 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900"
          >
            {/* Header with close button */}
            <div className="flex items-center justify-between p-3 border-b border-black/5 dark:border-white/5 bg-slate-50 dark:bg-slate-900">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {t("ui.changeLanguage") || "Select Language"}
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search */}
            <div className="p-3 border-b border-black/5 dark:border-white/5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder={t("language.searchPlaceholder") || "Search..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-9 border-none bg-black/5 pl-9 pr-4 text-sm rounded-lg focus-visible:ring-1 focus-visible:ring-indigo-500/50 dark:bg-white/5 dark:text-slate-200"
                />
              </div>
            </div>

            {/* Tab Toggle */}
            <div className="flex gap-1 p-2 bg-slate-50 dark:bg-slate-900 border-b border-black/5 dark:border-white/5">
              <button
                onClick={() => setActiveTab('manual')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'manual'
                    ? 'bg-indigo-500 text-white' 
                    : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                Manual ({languageConfigs.length})
              </button>
              <button
                onClick={() => setActiveTab('auto')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1 ${
                  activeTab === 'auto'
                    ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white' 
                    : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                Auto ({AUTO_TRANSLATE_LANGUAGES.length})
              </button>
            </div>

            {/* Language List */}
            <div className="max-h-[300px] overflow-y-auto p-2">
              {activeTab === 'manual' ? (
                <div className="space-y-1">
                  {filteredLanguages.length > 0 ? (
                    filteredLanguages.map((lang) => {
                      const isSelected = locale === lang.code && !autoTranslateLanguage;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`
                            w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors text-left
                            ${
                              isSelected
                                ? "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300"
                                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                            }
                          `}
                        >
                          <span className="flex-1">{lang.name}</span>
                          {isSelected && <Check className="h-4 w-4" />}
                        </button>
                      );
                    })
                  ) : (
                    <div className="py-8 text-center text-sm text-slate-400">
                      {t("language.noLanguageFound") || "No results"}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-1">
                  {filteredAutoLanguages.length > 0 ? (
                    filteredAutoLanguages.map((lang) => {
                      const isSelected = autoTranslateLanguage === lang.code;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => handleAutoTranslate(lang.code)}
                          className={`
                            w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors text-left
                            ${
                              isSelected
                                ? "bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-300"
                                : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                            }
                          `}
                        >
                          <Sparkles className="h-3 w-3 text-yellow-500 flex-shrink-0" />
                          <span className="flex-1">{lang.nativeName}</span>
                          <span className="text-xs text-slate-400">{lang.name}</span>
                          {isSelected && <Check className="h-4 w-4 flex-shrink-0" />}
                        </button>
                      );
                    })
                  ) : (
                    <div className="py-8 text-center text-sm text-slate-400">
                      No results
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

const LanguageSelector = React.memo(LanguageSelectorComponent);
export { LanguageSelector };
