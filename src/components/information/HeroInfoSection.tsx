
import { motion } from "framer-motion";
import { useLanguage } from "@/components/navbar/LanguageContext";
import { Rocket, Wrench, Gem, Zap } from "lucide-react";

export function HeroInfoSection() {
  const { currentLanguage } = useLanguage();

  // Переводы для информационной секции
  const translations = {
    en: {
      title: "X Minecraft Launcher (XMCL) is the ultimate modern Minecraft launcher designed for seamless mod management. Experience effortless installation and organization of modpacks, resource packs, mods, and shader packs with our intuitive interface.",
      subtitle: "Seamlessly integrates with all major modding platforms including OptiFine, Quilt, Fabric, Minecraft Forge, Laby Mod, and NeoForge.",
      features: [{
        title: "Modern UI",
        description: "Beautiful and intuitive interface",
        icon: Gem
      }, {
        title: "Easy Setup",
        description: "Simple installation process",
        icon: Wrench
      }, {
        title: "Open Source",
        description: "Transparent and community-driven",
        icon: Rocket
      }, {
        title: "Fast & Reliable",
        description: "Optimized performance",
        icon: Zap
      }]
    },
    ru: {
      title: "X Minecraft Launcher (XMCL) - это современный лаунчер Minecraft, предназначенный для удобного управления модами. Испытайте простую установку и организацию модпаков, ресурс-паков, модов и шейдер-паков с помощью нашего интуитивного интерфейса.",
      subtitle: "Легко интегрируется со всеми основными платформами модов, включая OptiFine, Quilt, Fabric, Minecraft Forge, Laby Mod и NeoForge.",
      features: [{
        title: "Современный UI",
        description: "Красивый и интуитивный интерфейс",
        icon: Gem
      }, {
        title: "Простая настройка",
        description: "Простой процесс установки",
        icon: Wrench
      }, {
        title: "Открытый исходный код",
        description: "Прозрачный и управляемый сообществом",
        icon: Rocket
      }, {
        title: "Быстрый и надежный",
        description: "Оптимизированная производительность",
        icon: Zap
      }]
    },
    uk: {
      title: "X Minecraft Launcher (XMCL) - це сучасний лаунчер Minecraft, призначений для зручного управління модами. Відчуйте просту установку та організацію модпаків, ресурс-паків, модів і шейдер-паків за допомогою нашого інтуїтивного інтерфейсу.",
      subtitle: "Легко інтегрується з усіма основними платформами модів, включаючи OptiFine, Quilt, Fabric, Minecraft Forge, Laby Mod та NeoForge.",
      features: [{
        title: "Сучасний UI",
        description: "Красивий та інтуїтивний інтерфейс",
        icon: Gem
      }, {
        title: "Проста настройка",
        description: "Простий процес встановлення",
        icon: Wrench
      }, {
        title: "Відкритий вихідний код",
        description: "Прозорий та керований спільнотою",
        icon: Rocket
      }, {
        title: "Швидкий і надійний",
        description: "Оптимізована продуктивність",
        icon: Zap
      }]
    },
    zh: {
      title: "X Minecraft Launcher (XMCL) 是为无缝模组管理而设计的终极现代 Minecraft 启动器。通过我们直观的界面体验轻松的模组包、资源包、模组和着色器包的安装和组织。",
      subtitle: "与所有主要模组平台无缝集成，包括 OptiFine、Quilt、Fabric、Minecraft Forge、Laby Mod 和 NeoForge。",
      features: [{
        title: "现代用户界面",
        description: "美观直观的界面",
        icon: Gem
      }, {
        title: "简易设置",
        description: "简单的安装过程",
        icon: Wrench
      }, {
        title: "开源",
        description: "透明且社区驱动",
        icon: Rocket
      }, {
        title: "快速可靠",
        description: "优化的性能",
        icon: Zap
      }]
    }
  };

  const text = translations[currentLanguage as keyof typeof translations] || translations.en;

  return (
    <section className="py-16 bg-gradient-to-b from-black to-slate-900">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {text.title}
          </h2>
          <p className="text-lg text-white/80 max-w-4xl mx-auto">
            {text.subtitle}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {text.features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                className="text-center p-6 rounded-lg bg-slate-800/50 border border-slate-700/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500/20 rounded-lg mb-4">
                  <IconComponent className="text-cyan-400 w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/70">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
