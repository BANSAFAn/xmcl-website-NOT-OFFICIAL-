
import { motion } from "framer-motion";
import { Heart, Github, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/context";

export function Footer() {
  const { t } = useI18n();
  
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.footer 
      className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-black border-t border-slate-800/50 overflow-hidden"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`
        }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-md"></div>
                <img src="/a39086fb-5549-43c0-a69e-217c717d938e.png" alt="XMCL" className="relative h-12 w-12 rounded-xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {t.footer.launcherName}
                </h3>
                <p className="text-sm text-slate-400">{t.footer.launcherShortDesc}</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
              {t.footer.launcherFullDesc}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="text-center">
            <h4 className="text-lg font-semibold text-white mb-6 relative">
              {t.footer.quickLinks}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </h4>
            <div className="space-y-3">
              <Link to="/about" className="block text-slate-300 hover:text-blue-400 transition-colors duration-300 text-sm font-medium">
                {t.nav.about}
              </Link>
              <Link to="/contact" className="block text-slate-300 hover:text-blue-400 transition-colors duration-300 text-sm font-medium">
                {t.nav.contact}
              </Link>
              <Link to="/privacy" className="block text-slate-300 hover:text-blue-400 transition-colors duration-300 text-sm font-medium">
                {t.nav.privacy}
              </Link>
              <Link to="/changelogs" className="block text-slate-300 hover:text-blue-400 transition-colors duration-300 text-sm font-medium">
                {t.nav.changelogs}
              </Link>
            </div>
          </motion.div>

          {/* Community & Support */}
          <motion.div variants={itemVariants} className="text-center md:text-right">
            <h4 className="text-lg font-semibold text-white mb-6 relative">
              {t.footer.community}
              <div className="absolute -bottom-2 left-1/2 md:right-0 md:left-auto transform -translate-x-1/2 md:translate-x-0 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>            </h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              {t.footer.support}
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div 
          variants={itemVariants}
          className="w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-8"
        />

        {/* Bottom Section */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
        >
          <div className="flex items-center gap-2 text-slate-400">
            <span>© 2022-{new Date().getFullYear()} {t.footer.launcherName}. {t.footer.websiteBy}</span>
            <a href="https://github.com/Baneronetwo" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
              Baneronetwo
            </a>
          </div>
          
          <div className="flex items-center gap-2 text-slate-400">
            <span>{t.footer.madeWith}</span>
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <span>{t.footer.forCommunity}</span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
