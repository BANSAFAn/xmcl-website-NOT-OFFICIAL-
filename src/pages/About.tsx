
import { motion } from "framer-motion";
import { Github, MessageSquare, Youtube, Twitch, Coffee, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { TeamMember } from "@/components/about/TeamMember";
import { PageTitle } from "@/components/about/PageTitle";
import { Navbar } from "@/components/navbar";
import { SponsorsSection } from "@/components/about/SponsorsSection";
import { useLanguage } from "@/components/navbar/LanguageContext";

const About = () => {
  const { currentLanguage } = useLanguage();

  // Multi-language translations
  const translations = {
    en: {
      returnHome: "Return to Home",
      title: "About the Team",
      subtitle: "Meet the people behind X Minecraft Launcher",
      leadDeveloper: "Lead Developer",
      webDeveloper: "Web Developer & Moderator",
      aboutSection: "We are a small team of dedicated developers and Minecraft enthusiasts working to create the best Minecraft launcher experience possible.",
      missionTitle: "Our Mission",
      missionText: "To provide a fast, reliable, and feature-rich Minecraft launcher that helps players enjoy the game with minimal technical difficulties.",
      contactUs: "Contact Us",
      joinDiscord: "Join our Discord"
    },
    ru: {
      returnHome: "Вернуться на главную",
      title: "О команде",
      subtitle: "Познакомьтесь с людьми, создающими X Minecraft Launcher",
      leadDeveloper: "Ведущий разработчик",
      webDeveloper: "Веб-разработчик и модератор",
      aboutSection: "Мы небольшая команда преданных разработчиков и энтузиастов Minecraft, работающих над созданием лучшего опыта использования Minecraft лаунчера.",
      missionTitle: "Наша миссия",
      missionText: "Предоставить быстрый, надежный и функциональный Minecraft лаунчер, который помогает игрокам наслаждаться игрой с минимальными техническими трудностями.",
      contactUs: "Связаться с нами",
      joinDiscord: "Присоединиться к нашему Discord"
    },
    uk: {
      returnHome: "Повернутися на головну",
      title: "Про команду",
      subtitle: "Познайомтеся з людьми, які створюють X Minecraft Launcher",
      leadDeveloper: "Провідний розробник",
      webDeveloper: "Веб-розробник і модератор",
      aboutSection: "Ми невелика команда відданих розробників та ентузіастів Minecraft, які працюють над створенням найкращого досвіду використання Minecraft лаунчера.",
      missionTitle: "Наша місія",
      missionText: "Надати швидкий, надійний та функціональний Minecraft лаунчер, який допомагає гравцям насолоджуватися грою з мінімальними технічними труднощами.",
      contactUs: "Зв'язатися з нами",
      joinDiscord: "Приєднатися до нашого Discord"
    },
    zh: {
      returnHome: "返回首页",
      title: "关于团队",
      subtitle: "认识 X Minecraft 启动器背后的人员",
      leadDeveloper: "首席开发者",
      webDeveloper: "网页开发者和版主",
      aboutSection: "我们是一个由专注的开发者和 Minecraft 爱好者组成的小团队，致力于创造最佳的 Minecraft 启动器体验。",
      missionTitle: "我们的使命",
      missionText: "提供一个快速、可靠且功能丰富的 Minecraft 启动器，帮助玩家以最少的技术困难享受游戏。",
      contactUs: "联系我们",
      joinDiscord: "加入我们的 Discord"
    }
  };

  // Select the appropriate translation
  const text = translations[currentLanguage as keyof typeof translations] || translations.en;

  const teamMembers = [
    {
      name: "CIO10",
      role: text.leadDeveloper,
      avatar: "https://avatars.githubusercontent.com/u/8425057?v=4",
      socials: [
        { icon: <Github className="w-5 h-5" />, link: "https://github.com/ci010" },
        { icon: <MessageSquare className="w-5 h-5" />, link: "https://discord.gg/W5XVwYY7GQ" }
      ]
    },
    {
      name: "Baneronetwo",
      role: text.webDeveloper,
      avatar: "https://avatars.githubusercontent.com/u/86590991?v=4",
      socials: [
        { icon: <Github className="w-5 h-5" />, link: "https://github.com/BANSAFAn" },
        { icon: <MessageSquare className="w-5 h-5" />, link: "https://discord.gg/FEyMjn3mtA" },
        { icon: <Coffee className="w-5 h-5" />, link: "https://ko-fi.com/baneronetwo" }
      ]
    },
    {
      name: "v1mkss",
      role: text.webDeveloper,
      avatar: "https://avatars.githubusercontent.com/u/155435591?v=4",
      socials: [
        { icon: <Github className="w-5 h-5" />, link: "https://github.com/v1mkss" },
        { icon: <Twitch className="w-5 h-5" />, link: "https://www.twitch.tv/v1mkss" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-minecraft-dark-blue">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-6"
        >
          <Link to="/" className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300">
            <Home size={18} />
            <span className="text-sm font-medium">{text.returnHome}</span>
          </Link>
        </motion.div>
        
        <PageTitle />
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {teamMembers.map((member, index) => (
            <TeamMember 
              key={member.name}
              member={member}
              index={index}
            />
          ))}
        </motion.div>

        {/* Sponsors Section */}
        <SponsorsSection />
      </div>
    </div>
  );
};

export default About;
