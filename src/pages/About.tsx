
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { useLanguage } from "@/components/navbar/LanguageContext";
import { TeamSection } from "@/components/about/TeamSection";
import { ContributeSection } from "@/components/about/ContributeSection";
import { LicenseSection } from "@/components/about/LicenseSection";
import { SponsorshipSection } from "@/components/about/SponsorshipSection";
import { CreditSection } from "@/components/about/CreditSection";

const About = () => {
  const { currentLanguage, translations } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Navbar />
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-24 relative z-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-12"
        >
          <Link 
            to="/" 
            className="group flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:border-blue-400/50 transition-all duration-300 hover:bg-white/15"
          >
            <motion.div
              whileHover={{ rotate: -10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Home size={20} className="text-blue-400" />
            </motion.div>
            <span className="text-white font-medium group-hover:text-blue-400 transition-colors">
              {translations.backToHome}
            </span>
          </Link>
        </motion.div>
        
        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                {translations.about}
              </span>
            </motion.h1>
            <motion.p 
              className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Meet the creator behind X Minecraft Launcher - an open source project built with passion for the Minecraft community.
            </motion.p>
          </motion.div>

          {/* Team Section */}
          <TeamSection />
          
          {/* Contribute Section */}
          <ContributeSection />
          
          {/* License Section */}
          <LicenseSection />
          
          {/* Sponsorship Section */}
          <SponsorshipSection />
          
          {/* Credit Section */}
          <CreditSection />
        </div>
      </div>
    </div>
  );
};

export default About;
