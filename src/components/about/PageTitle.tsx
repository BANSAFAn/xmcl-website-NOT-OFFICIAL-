
import { motion } from "framer-motion";
import { useLanguage } from "@/components/navbar/LanguageContext";

export function PageTitle() {
  const { currentLanguage } = useLanguage();
  
  const translations = {
    en: {
      title: "Meet Our Team",
      subtitle: "The talented individuals behind XMCL who make this project possible."
    },
    ru: {
      title: "Знакомьтесь с нашей командой", 
      subtitle: "Талантливые люди, стоящие за XMCL, которые делают этот проект возможным."
    },
    uk: {
      title: "Знайомтеся з нашою командою",
      subtitle: "Талановиті люди, які стоять за XMCL і роблять цей проект можливим."
    },
    zh: {
      title: "认识我们的团队",
      subtitle: "XMCL背后才华横溢的人们，他们让这个项目成为可能。"
    },
    de: {
      title: "Lernen Sie unser Team kennen",
      subtitle: "Die talentierten Personen hinter XMCL, die dieses Projekt möglich machen."
    },
    ja: {
      title: "私たちのチームに会う",
      subtitle: "このプロジェクトを可能にするXMCLの背後にいる才能ある個人たち。"
    }
  };

  const text = translations[currentLanguage as keyof typeof translations] || translations.en;

  return (
    <div className="text-center">
      <motion.h1
        className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {text.title}
      </motion.h1>
      
      <motion.div
        className="w-32 h-1.5 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full mb-8"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      
      <motion.p
        className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {text.subtitle}
      </motion.p>
    </div>
  );
}
