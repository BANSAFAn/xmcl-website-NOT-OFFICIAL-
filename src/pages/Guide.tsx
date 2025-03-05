
import { useState } from "react";
import { motion } from "framer-motion";
import { Layout, Upload, Download, Database, Users } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Globe } from "@/components/guide/Globe";
import {
  AppearanceGuide,
  AppXMigrationGuide,
  LocalizationGuide,
  InstallationGuide,
  DataStorageGuide,
  MultiplayerGuide,
  UpdateGuide
} from "@/components/guide/sections";

const Guide = () => {
  const [activeTab, setActiveTab] = useState("appearance");
  
  // Define guide sections
  const sections = [
    {
      id: "appearance",
      title: "Appearance Guide",
      icon: <Layout className="w-5 h-5" />,
      content: <AppearanceGuide />
    },
    {
      id: "appx-migration",
      title: "AppX Migration",
      icon: <Upload className="w-5 h-5" />,
      content: <AppXMigrationGuide />
    },
    {
      id: "localization",
      title: "Localization Guide",
      icon: <Globe className="w-5 h-5" />,
      content: <LocalizationGuide />
    },
    {
      id: "installation",
      title: "Installation Guide",
      icon: <Download className="w-5 h-5" />,
      content: <InstallationGuide />
    },
    {
      id: "data-storage",
      title: "Data Storage",
      icon: <Database className="w-5 h-5" />,
      content: <DataStorageGuide />
    },
    {
      id: "multiplayer",
      title: "Multiplayer Guide",
      icon: <Users className="w-5 h-5" />,
      content: <MultiplayerGuide />
    },
    {
      id: "update",
      title: "Update Guide",
      icon: <Upload className="w-5 h-5" />,
      content: <UpdateGuide />
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-minecraft-dark-blue">
      <Navbar />
      
      <motion.div 
        className="container mx-auto px-4 pt-32 pb-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl lg:text-5xl font-bold text-center mb-4">
            <span className="text-gradient-cyan">X Minecraft Launcher</span> Guide
          </h1>
          <p className="text-center text-white/80 max-w-3xl mx-auto mb-12">
            Complete documentation for getting the most out of the X Minecraft Launcher
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Sidebar */}
          <motion.div 
            className="lg:w-1/4"
            variants={itemVariants}
          >
            <div className="glass-card rounded-xl p-4 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Guide Sections</h2>
              <nav className="flex flex-col space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`py-2 px-4 rounded-lg text-left transition-all flex items-center gap-2 ${
                      activeTab === section.id
                        ? "bg-accent text-white"
                        : "hover:bg-white/10 text-white/80"
                    }`}
                  >
                    {section.icon}
                    <span>{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>
          
          {/* Content */}
          <motion.div 
            className="lg:w-3/4"
            variants={itemVariants}
          >
            <div className="glass-card rounded-xl p-6 md:p-8 min-h-[70vh]">
              {sections.find(section => section.id === activeTab)?.content}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Guide;
