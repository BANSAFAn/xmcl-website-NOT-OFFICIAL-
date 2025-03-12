
import { motion } from "framer-motion";
import { Github, MessageSquare, Youtube, Twitch, Coffee, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { TeamMember } from "@/components/about/TeamMember";
import { PageTitle } from "@/components/about/PageTitle";
import { Navbar } from "@/components/navbar";
import { SponsorsSection } from "@/components/about/SponsorsSection";

const About = () => {
  const teamMembers = [
    {
      name: "CIO10",
      role: "Lead Developer",
      avatar: "https://avatars.githubusercontent.com/u/8425057?v=4",
      socials: [
        { icon: <Github className="w-5 h-5" />, link: "https://github.com/ci010" },
        { icon: <MessageSquare className="w-5 h-5" />, link: "https://discord.gg/W5XVwYY7GQ" }
      ]
    },
    {
      name: "Baneronetwo",
      role: "Web Developer & Moderator",
      avatar: "https://avatars.githubusercontent.com/u/86590991?v=4",
      socials: [
        { icon: <Github className="w-5 h-5" />, link: "https://github.com/BANSAFAn" },
        { icon: <MessageSquare className="w-5 h-5" />, link: "https://discord.gg/FEyMjn3mtA" },
        { icon: <Coffee className="w-5 h-5" />, link: "https://ko-fi.com/baneronetwo" }
      ]
    },
    {
      name: "v1mkss",
      role: "Web Developer & Moderator",
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
            <span className="text-sm font-medium">Return to Home</span>
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
