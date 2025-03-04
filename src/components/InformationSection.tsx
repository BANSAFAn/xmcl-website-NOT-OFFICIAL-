
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export function InformationSection() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  
  // Initialize language based on localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLang);
  }, []);

  // Translations for the section titles
  const sectionTitles = {
    en: {
      mainTitle: "Advanced Features for Modern Minecraft",
      subtitle: "XMCL is designed to enhance your Minecraft experience with powerful features"
    },
    ru: {
      mainTitle: "Расширенные функции для современного Minecraft",
      subtitle: "XMCL разработан для улучшения вашего опыта в Minecraft с мощными функциями"
    },
    uk: {
      mainTitle: "Розширені функції для сучасного Minecraft",
      subtitle: "XMCL розроблений для покращення вашого досвіду в Minecraft з потужними функціями"
    }
  };

  // Get the translated sections based on current language
  const getTranslatedSections = () => {
    switch(currentLanguage) {
      case 'ru':
        return [
          {
            title: "Не беспокойтесь об установке игры",
            description: "XMCL поддерживает установку vanilla Minecraft, Minecraft Forge, Fabric и даже Optifine - всё в одном! Вы можете установить их в одном месте в Лаунчере. Также поддерживается сторонняя зеркальная ссылка BMCL API. Вы даже можете настроить собственное зеркало в лаунчере.",
            cta: "BMCL API",
            ctaLink: "https://bmclapidoc.bangbang93.com/",
            image: "/XMCL/1.png",
            imageAlt: "Установка игры"
          },
          {
            title: "Оптимальное дисковое пространство с массивными ресурсами",
            description: "XMCL хранит все моды, пакеты ресурсов, шейдеры и модпаки в одном месте. Когда вы пытаетесь использовать любой известный ресурс, он использует жесткую ссылку для установки ресурса в экземпляр без копирования. Это означает, что вы больше никогда не увидите дублированных копий в папке /mods.",
            cta: "Жесткая ссылка",
            ctaLink: "https://en.wikipedia.org/wiki/Hard_link",
            cta2: "Символическая ссылка",
            cta2Link: "https://en.wikipedia.org/wiki/Symbolic_link",
            image: "/XMCL/2.gif",
            imageAlt: "Управление дисковым пространством",
            reverse: true
          },
          {
            title: "Держите рабочее пространство чистым с помощью мульти-экземпляров",
            description: "XMCL имеет встроенную поддержку мульти-экземпляров. Вы можете легко создавать несколько экземпляров. Так что вам не нужно беспокоиться о смешении различных настроек запуска.",
            image: "/XMCL/3.png",
            imageAlt: "Мульти-экземпляры"
          },
          {
            title: "Интеграция с несколькими сообществами",
            description: "XMCL имеет встроенную поддержку Curseforge и Modrinth. Он также предоставляет возможность поддерживать пользовательские учетные записи/системы скинов, такие как Blessing Skin.",
            cta: "Curseforge",
            ctaLink: "https://curseforge.com/minecraft/",
            cta2: "Modrinth",
            cta2Link: "https://modrinth.com/",
            cta3: "Blessing Skin",
            cta3Link: "https://github.com/bs-community",
            cta4: "Authlib Injector",
            cta4Link: "https://blessing.netlify.app/yggdrasil-api/authlib-injector.html",
            image: "/XMCL/2.png",
            imageAlt: "Интеграция с сообществами",
            reverse: true
          }
        ];
      case 'uk':
        return [
          {
            title: "Не турбуйтеся про встановлення гри",
            description: "XMCL підтримує встановлення vanilla Minecraft, Minecraft Forge, Fabric і навіть Optifine - все в одному! Ви можете встановити їх в одному місці в Лаунчері. Також підтримується стороннє дзеркальне посилання BMCL API. Ви навіть можете налаштувати власне дзеркало в лаунчері.",
            cta: "BMCL API",
            ctaLink: "https://bmclapidoc.bangbang93.com/",
            image: "/XMCL/1.png",
            imageAlt: "Встановлення гри"
          },
          {
            title: "Оптимальний дисковий простір з масивними ресурсами",
            description: "XMCL зберігає всі моди, пакети ресурсів, шейдери та модпаки в одному місці. Коли ви намагаєтеся використовувати будь-який відомий ресурс, він використовує жорстке посилання для встановлення ресурсу в екземпляр без копіювання. Це означає, що ви більше ніколи не побачите дубльованих копій у папці /mods.",
            cta: "Жорстке посилання",
            ctaLink: "https://en.wikipedia.org/wiki/Hard_link",
            cta2: "Символічне посилання",
            cta2Link: "https://en.wikipedia.org/wiki/Symbolic_link",
            image: "/XMCL/2.gif",
            imageAlt: "Управління дисковим простором",
            reverse: true
          },
          {
            title: "Тримайте робочий простір чистим за допомогою мульти-екземплярів",
            description: "XMCL має вбудовану підтримку мульти-екземплярів. Ви можете легко створювати кілька екземплярів. Тож вам не потрібно турбуватися про змішування різних налаштувань запуску.",
            image: "/XMCL/3.png",
            imageAlt: "Мульти-екземпляри"
          },
          {
            title: "Інтеграція з кількома спільнотами",
            description: "XMCL має вбудовану підтримку Curseforge та Modrinth. Він також надає можливість підтримувати користувацькі облікові записи/системи скінів, такі як Blessing Skin.",
            cta: "Curseforge",
            ctaLink: "https://curseforge.com/minecraft/",
            cta2: "Modrinth",
            cta2Link: "https://modrinth.com/",
            cta3: "Blessing Skin",
            cta3Link: "https://github.com/bs-community",
            cta4: "Authlib Injector",
            cta4Link: "https://blessing.netlify.app/yggdrasil-api/authlib-injector.html",
            image: "/XMCL/2.png",
            imageAlt: "Інтеграція зі спільнотами",
            reverse: true
          }
        ];
      default: // English
        return [
          {
            title: "No more worry about the Game Install",
            description: "XMCL supports installation of vanilla Minecraft, Minecraft Forge, Fabric, and even Optifine All in One! You can install them in a single place within the Launcher. It also supports the third party mirror link BMCL API. You can even customize your own mirror in the launcher.",
            cta: "BMCL API",
            ctaLink: "https://bmclapidoc.bangbang93.com/",
            image: "/XMCL/1.png",
            imageAlt: "Game Installation"
          },
          {
            title: "Optimal disk space with Massive Resources",
            description: "XMCL will store all the mods, resource packs, shader packs and modpacks to a single store location. While you try to use any known resource, it will use hard link to install the resource to the instance without copying. It means you will never see any duplicated copy in /mods folder anymore.",
            cta: "Hard link",
            ctaLink: "https://en.wikipedia.org/wiki/Hard_link",
            cta2: "Symbolic link",
            cta2Link: "https://en.wikipedia.org/wiki/Symbolic_link",
            image: "/XMCL/2.gif",
            imageAlt: "Disk Space Management",
            reverse: true
          },
          {
            title: "Keep your workspace Clean with multi-instances",
            description: "XMCL has built in support of multi-instances. You can create multiple instances easily. So you don't need to be worried about the mixture of the different launch settings.",
            image: "/XMCL/3.png",
            imageAlt: "Multi-instances"
          },
          {
            title: "Integrated with Multiple Communities",
            description: "XMCL built in supports with Curseforge & Modrinth. It also provides the ability to support custom user accounts/skin systems like blessing skin.",
            cta: "Curseforge",
            ctaLink: "https://curseforge.com/minecraft/",
            cta2: "Modrinth",
            cta2Link: "https://modrinth.com/",
            cta3: "Blessing Skin",
            cta3Link: "https://github.com/bs-community",
            cta4: "Authlib Injector",
            cta4Link: "https://blessing.netlify.app/yggdrasil-api/authlib-injector.html",
            image: "/XMCL/2.png",
            imageAlt: "Community Integration",
            reverse: true
          }
        ];
    }
  };

  const sections = getTranslatedSections();
  const title = sectionTitles[currentLanguage as keyof typeof sectionTitles] || sectionTitles.en;

  return (
    <section className="py-24 bg-minecraft-dark-blue">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient-cyan">{title.mainTitle}</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            {title.subtitle}
          </p>
        </div>

        <div className="space-y-32">
          {sections.map((section, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${section.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}
            >
              <motion.div 
                initial={{ opacity: 0, x: section.reverse ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="lg:w-1/2"
              >
                <div className="relative">
                  <div className={`absolute -inset-1 bg-gradient-to-r ${section.reverse ? 'from-minecraft-accent-orange to-accent' : 'from-accent to-minecraft-accent-green'} opacity-30 blur-xl rounded-2xl`}></div>
                  <div className="relative bg-minecraft-darker-blue rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <img 
                      src={section.image} 
                      alt={section.imageAlt} 
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: section.reverse ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="lg:w-1/2 space-y-6"
              >
                <h3 className="text-2xl sm:text-3xl font-bold leading-tight">
                  {section.title}
                </h3>
                
                <p className="text-lg text-white/80">
                  {section.description}
                </p>
                
                <div className="flex flex-wrap gap-4 pt-2">
                  {section.cta && (
                    <Link
                      to={section.ctaLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-4 bg-accent/20 hover:bg-accent/30 backdrop-blur-sm text-white rounded-md transition-all duration-300 border border-accent/50"
                    >
                      &gt; {section.cta}
                    </Link>
                  )}
                  
                  {section.cta2 && (
                    <Link
                      to={section.cta2Link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-4 bg-minecraft-accent-green/20 hover:bg-minecraft-accent-green/30 backdrop-blur-sm text-white rounded-md transition-all duration-300 border border-minecraft-accent-green/50"
                    >
                      &gt; {section.cta2}
                    </Link>
                  )}
                  
                  {section.cta3 && (
                    <Link
                      to={section.cta3Link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-4 bg-minecraft-accent-orange/20 hover:bg-minecraft-accent-orange/30 backdrop-blur-sm text-white rounded-md transition-all duration-300 border border-minecraft-accent-orange/50"
                    >
                      &gt; {section.cta3}
                    </Link>
                  )}
                  
                  {section.cta4 && (
                    <Link
                      to={section.cta4Link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-4 bg-minecraft-accent-yellow/20 hover:bg-minecraft-accent-yellow/30 backdrop-blur-sm text-white rounded-md transition-all duration-300 border border-minecraft-accent-yellow/50"
                    >
                      &gt; {section.cta4}
                    </Link>
                  )}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
