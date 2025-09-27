
import { motion } from "framer-motion";
import { useTranslation } from "../i18n";
import { useState, useEffect } from "react";

export function FeatureShowcase() {
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  
  // Initialize language based on localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLang);
  }, []);

  const features = [
    {
      title: t('showcase.install.title'),
      description: t('showcase.install.description'),
      highlightText: t('showcase.install.highlight'),
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-minecraft-accent-orange">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.29 7 12 12 20.71 7"></polyline>
            <line x1="12" y1="22" x2="12" y2="12"></line>
          </svg>,
      color: "text-minecraft-accent-orange",
      bgColor: "bg-minecraft-accent-orange/20",
      borderColor: "border-minecraft-accent-orange/30"
    },
    {
      title: t('showcase.resources.title'),
      description: t('showcase.resources.description'),
      highlightText: t('showcase.resources.highlight'),
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-minecraft-accent-green">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>,
      color: "text-minecraft-accent-green",
      bgColor: "bg-minecraft-accent-green/20",
      borderColor: "border-minecraft-accent-green/30"
    },
    {
      title: t('showcase.workspace.title'),
      description: t('showcase.workspace.description'),
      highlightText: t('showcase.workspace.highlight'),
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-minecraft-accent-cyan">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <path d="M3.29 7.05 12 12l8.71-4.95"></path>
            <path d="M12 12v9.95"></path>
            <path d="M12 12 7 8.8"></path>
          </svg>,
      color: "text-minecraft-accent-cyan",
      bgColor: "bg-minecraft-accent-cyan/20",
      borderColor: "border-minecraft-accent-cyan/30"
    },
    {
      title: t('showcase.communities.title'),
      description: t('showcase.communities.description'),
      highlightText: t('showcase.communities.highlight'),
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-minecraft-accent-yellow">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>,
      color: "text-minecraft-accent-yellow",
      bgColor: "bg-minecraft-accent-yellow/20",
      borderColor: "border-minecraft-accent-yellow/30"
    }
  ];

  return (
    <section className="py-24 bg-minecraft-dark-blue">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`p-6 rounded-xl transition-all duration-300 ${feature.bgColor} ${feature.borderColor} border hover:shadow-lg hover:-translate-y-1`}
            >
              <div className="flex items-start gap-4">
                <div className={`rounded-lg p-3 ${feature.bgColor}`}>
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`text-xl font-bold ${feature.color} mb-2`}>
                    {feature.title}
                  </h3>
                  <p className="text-white/80 mb-3">
                    {feature.description}
                  </p>
                  {feature.highlightText && (
                    <p className="text-sm font-medium text-white/60">
                      {feature.highlightText}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
