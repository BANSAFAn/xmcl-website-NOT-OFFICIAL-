
import { motion } from "framer-motion";
import { useLanguage } from "@/components/navbar/LanguageContext";
import { Rocket, Wrench, Gem, Zap, Shield, Download } from "lucide-react";

export function HeroInfoSection() {
  const { currentLanguage } = useLanguage();

  // Переводы для информационной секции
  const translations = {
    en: {
      title: "Experience the Future of Minecraft Launching",
      subtitle: "X Minecraft Launcher (XMCL) revolutionizes your Minecraft experience with cutting-edge technology and seamless mod management.",
      description: "Built for modern gamers who demand performance, reliability, and ease of use. Our launcher supports all major modding platforms and provides an unparalleled user experience.",
      features: [{
        title: "Modern Interface",
        description: "Sleek, intuitive design that feels natural and responsive",
        icon: Gem,
        gradient: "from-purple-500 to-pink-500"
      }, {
        title: "Lightning Fast",
        description: "Optimized performance for instant launches and smooth gameplay",
        icon: Zap,
        gradient: "from-yellow-500 to-orange-500"
      }, {
        title: "Universal Compatibility",
        description: "Works seamlessly across Windows, macOS, and Linux platforms",
        icon: Shield,
        gradient: "from-green-500 to-teal-500"
      }, {
        title: "Easy Installation",
        description: "One-click setup with automatic mod and resource pack management",
        icon: Download,
        gradient: "from-blue-500 to-cyan-500"
      }, {
        title: "Community Driven",
        description: "Open source development with active community contributions",
        icon: Rocket,
        gradient: "from-indigo-500 to-purple-500"
      }, {
        title: "Professional Tools",
        description: "Advanced features for power users and content creators",
        icon: Wrench,
        gradient: "from-red-500 to-pink-500"
      }]
    },
    ru: {
      title: "Почувствуйте будущее запуска Minecraft",
      subtitle: "X Minecraft Launcher (XMCL) революционизирует ваш опыт Minecraft с передовыми технологиями и безупречным управлением модами.",
      description: "Создан для современных геймеров, которые требуют производительности, надёжности и простоты использования. Наш лаунчер поддерживает все основные платформы модов и обеспечивает непревзойдённый пользовательский опыт.",
      features: [{
        title: "Современный интерфейс",
        description: "Элегантный, интуитивный дизайн, который ощущается естественно и отзывчиво",
        icon: Gem,
        gradient: "from-purple-500 to-pink-500"
      }, {
        title: "Молниеносная скорость",
        description: "Оптимизированная производительность для мгновенных запусков и плавного игрового процесса",
        icon: Zap,
        gradient: "from-yellow-500 to-orange-500"
      }, {
        title: "Универсальная совместимость",
        description: "Безупречно работает на Windows, macOS и Linux платформах",
        icon: Shield,
        gradient: "from-green-500 to-teal-500"
      }, {
        title: "Простая установка",
        description: "Установка в один клик с автоматическим управлением модами и ресурс-паками",
        icon: Download,
        gradient: "from-blue-500 to-cyan-500"
      }, {
        title: "Сообщество разработчиков",
        description: "Разработка с открытым исходным кодом с активным вкладом сообщества",
        icon: Rocket,
        gradient: "from-indigo-500 to-purple-500"
      }, {
        title: "Профессиональные инструменты",
        description: "Расширенные функции для опытных пользователей и создателей контента",
        icon: Wrench,
        gradient: "from-red-500 to-pink-500"
      }]
    },
    uk: {
      title: "Відчуйте майбутнє запуску Minecraft",
      subtitle: "X Minecraft Launcher (XMCL) революціонізує ваш досвід Minecraft з передовими технологіями та бездоганним управлінням модами.",
      description: "Створений для сучасних геймерів, які вимагають продуктивності, надійності та простоти використання. Наш лаунчер підтримує всі основні платформи модів та забезпечує неперевершений користувацький досвід.",
      features: [{
        title: "Сучасний інтерфейс",
        description: "Елегантний, інтуїтивний дизайн, який відчувається природно та чуйно",
        icon: Gem,
        gradient: "from-purple-500 to-pink-500"
      }, {
        title: "Блискавична швидкість",
        description: "Оптимізована продуктивність для миттєвих запусків та плавного ігрового процесу",
        icon: Zap,
        gradient: "from-yellow-500 to-orange-500"
      }, {
        title: "Універсальна сумісність",
        description: "Бездоганно працює на платформах Windows, macOS та Linux",
        icon: Shield,
        gradient: "from-green-500 to-teal-500"
      }, {
        title: "Проста установка",
        description: "Установка в один клік з автоматичним управлінням модами та ресурс-паками",
        icon: Download,
        gradient: "from-blue-500 to-cyan-500"
      }, {
        title: "Спільнота розробників",
        description: "Розробка з відкритим вихідним кодом з активним внеском спільноти",
        icon: Rocket,
        gradient: "from-indigo-500 to-purple-500"
      }, {
        title: "Професійні інструменти",
        description: "Розширені функції для досвідчених користувачів та творців контенту",
        icon: Wrench,
        gradient: "from-red-500 to-pink-500"
      }]
    },
    zh: {
      title: "体验 Minecraft 启动的未来",
      subtitle: "X Minecraft Launcher (XMCL) 以尖端技术和无缝模组管理革新您的 Minecraft 体验。",
      description: "为要求性能、可靠性和易用性的现代玩家而构建。我们的启动器支持所有主要模组平台，提供无与伦比的用户体验。",
      features: [{
        title: "现代界面",
        description: "优雅、直观的设计，感觉自然且响应迅速",
        icon: Gem,
        gradient: "from-purple-500 to-pink-500"
      }, {
        title: "闪电般快速",
        description: "优化性能，实现即时启动和流畅游戏",
        icon: Zap,
        gradient: "from-yellow-500 to-orange-500"
      }, {
        title: "通用兼容性",
        description: "在 Windows、macOS 和 Linux 平台上无缝运行",
        icon: Shield,
        gradient: "from-green-500 to-teal-500"
      }, {
        title: "简易安装",
        description: "一键设置，自动管理模组和资源包",
        icon: Download,
        gradient: "from-blue-500 to-cyan-500"
      }, {
        title: "社区驱动",
        description: "开源开发，社区积极贡献",
        icon: Rocket,
        gradient: "from-indigo-500 to-purple-500"
      }, {
        title: "专业工具",
        description: "为高级用户和内容创作者提供的高级功能",
        icon: Wrench,
        gradient: "from-red-500 to-pink-500"
      }]
    },
    de: {
      title: "Erleben Sie die Zukunft des Minecraft-Startens",
      subtitle: "X Minecraft Launcher (XMCL) revolutioniert Ihr Minecraft-Erlebnis mit modernster Technologie und nahtlosem Mod-Management.",
      description: "Entwickelt für moderne Gamer, die Leistung, Zuverlässigkeit und Benutzerfreundlichkeit fordern. Unser Launcher unterstützt alle wichtigen Modding-Plattformen und bietet ein unvergleichliches Benutzererlebnis.",
      features: [{
        title: "Modernes Interface",
        description: "Elegantes, intuitives Design, das natürlich und reaktionsschnell wirkt",
        icon: Gem,
        gradient: "from-purple-500 to-pink-500"
      }, {
        title: "Blitzschnell",
        description: "Optimierte Leistung für sofortige Starts und flüssiges Gameplay",
        icon: Zap,
        gradient: "from-yellow-500 to-orange-500"
      }, {
        title: "Universelle Kompatibilität",
        description: "Funktioniert nahtlos auf Windows-, macOS- und Linux-Plattformen",
        icon: Shield,
        gradient: "from-green-500 to-teal-500"
      }, {
        title: "Einfache Installation",
        description: "Ein-Klick-Setup mit automatischem Mod- und Ressourcenpaket-Management",
        icon: Download,
        gradient: "from-blue-500 to-cyan-500"
      }, {
        title: "Community-getrieben",
        description: "Open-Source-Entwicklung mit aktiven Community-Beiträgen",
        icon: Rocket,
        gradient: "from-indigo-500 to-purple-500"
      }, {
        title: "Professionelle Tools",
        description: "Erweiterte Funktionen für Power-User und Content-Ersteller",
        icon: Wrench,
        gradient: "from-red-500 to-pink-500"
      }]
    },
    ja: {
      title: "Minecraft起動の未来を体験",
      subtitle: "X Minecraft Launcher (XMCL) は最先端技術とシームレスなMod管理でMinecraftエクスペリエンスを革新します。",
      description: "パフォーマンス、信頼性、使いやすさを求める現代のゲーマーのために構築されました。私たちのランチャーはすべての主要なModプラットフォームをサポートし、比類のないユーザーエクスペリエンスを提供します。",
      features: [{
        title: "モダンインターフェース",
        description: "自然で反応の良い、洗練された直感的なデザイン",
        icon: Gem,
        gradient: "from-purple-500 to-pink-500"
      }, {
        title: "稲妻の速さ",
        description: "即座の起動とスムーズなゲームプレイのための最適化されたパフォーマンス",
        icon: Zap,
        gradient: "from-yellow-500 to-orange-500"
      }, {
        title: "ユニバーサル互換性",
        description: "Windows、macOS、Linuxプラットフォームでシームレスに動作",
        icon: Shield,
        gradient: "from-green-500 to-teal-500"
      }, {
        title: "簡単インストール",
        description: "ワンクリックセットアップとModおよびリソースパックの自動管理",
        icon: Download,
        gradient: "from-blue-500 to-cyan-500"
      }, {
        title: "コミュニティ主導",
        description: "アクティブなコミュニティ貢献によるオープンソース開発",
        icon: Rocket,
        gradient: "from-indigo-500 to-purple-500"
      }, {
        title: "プロフェッショナルツール",
        description: "パワーユーザーとコンテンツクリエイター向けの高度な機能",
        icon: Wrench,
        gradient: "from-red-500 to-pink-500"
      }]
    }
  };

  const text = translations[currentLanguage as keyof typeof translations] || translations.en;

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-pink-500/20 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-cyan-500/30 mb-8"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Революционный опыт</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {text.title}
          </motion.h2>
          
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mx-auto rounded-full mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          
          <motion.p 
            className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {text.subtitle}
          </motion.p>
          
          <motion.p 
            className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {text.description}
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {text.features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative p-8 h-full bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm rounded-2xl border border-white/10 group-hover:border-cyan-400/50 transition-all duration-500 overflow-hidden">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="text-white w-8 h-8" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                    {feature.description}
                  </p>
                  
                  {/* Hover Effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
