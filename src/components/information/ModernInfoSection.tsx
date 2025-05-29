
import { motion } from "framer-motion";
import { useLanguage } from "@/components/navbar/LanguageContext";
import { informationTranslations, LanguageKeyType } from "./translations";
import { ExternalLink, Sparkles, Zap, Shield, Download, Code } from "lucide-react";

// Simplified Feature interface that matches the actual data structure
interface Feature {
  title: string;
  description: string;
  icon: string;
  image: string;
  links?: Array<{
    name: string;
    url: string;
  }>;
  link?: string;
}

export function ModernInfoSection() {
  const { currentLanguage } = useLanguage();
  const text = informationTranslations[currentLanguage as LanguageKeyType] || informationTranslations.en;

  // Simplified animation variants for better performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut"
      }
    }
  };

  // Enhanced features with proper icons
  const features: Feature[] = [
    {
      ...text.features[0], // Modern Interface
      image: "/XMCL/2.gif"
    },
    {
      ...text.features[1], // Mod Management with links
      image: "/XMCL/3.gif"
    },
    {
      ...text.features[2], // Cross Platform
      image: "/XMCL/4.gif"
    },
    {
      ...text.features[3], // Easy Installation
      image: "/XMCL/5.gif"
    },
    {
      ...text.features[4], // Open Source with GitHub link
      image: "/XMCL/1.gif"
    }
  ];

  const iconMap = {
    "🎨": Sparkles,
    "⚡": Zap,
    "🌐": Shield,
    "📦": Download,
    "💻": Code
  };

  return (
    <motion.section 
      className="py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-black relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Simplified Background Effects for performance */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 w-80 h-80 bg-cyan-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          variants={cardVariants}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 backdrop-blur-sm rounded-full border border-cyan-500/30 mb-8">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 font-semibold text-sm">FEATURES</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
            {text.title}
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full mb-8"></div>
          
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            {text.subtitle}
          </p>
        </motion.div>

        {/* Features Grid - Optimized layout */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto"
          variants={containerVariants}
        >
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon as keyof typeof iconMap] || Sparkles;
            
            return (
              <motion.div
                key={index}
                className="group relative"
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Card Container */}
                <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 backdrop-blur-sm group-hover:border-cyan-400/40 transition-all duration-500">
                  
                  {/* Image Container */}
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                    
                    {/* Floating Icon */}
                    <div className="absolute top-4 right-4 p-3 bg-cyan-500/20 backdrop-blur-sm rounded-xl border border-cyan-400/30">
                      <IconComponent className="text-cyan-400 w-6 h-6" />
                    </div>
                  </div>
                  
                  {/* Content Container */}
                  <div className="p-6 relative z-10">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-lg text-white/70 leading-relaxed mb-6 group-hover:text-white/90 transition-colors duration-300">
                      {feature.description}
                    </p>

                    {/* Links Section */}
                    {feature.links && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {feature.links.map((link, linkIndex) => (
                          <a
                            key={linkIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-2 bg-cyan-500/20 backdrop-blur-sm rounded-lg border border-cyan-500/30 text-cyan-400 hover:text-white hover:bg-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 text-sm font-medium"
                          >
                            <span>{link.name}</span>
                            <ExternalLink size={12} />
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Single Link for Open Source */}
                    {feature.link && (
                      <a
                        href={feature.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-3 bg-green-500/20 backdrop-blur-sm rounded-xl border border-green-500/30 text-green-400 hover:text-white hover:bg-green-500/30 hover:border-green-400/60 transition-all duration-300 font-semibold"
                      >
                        <span>View on GitHub</span>
                        <ExternalLink size={16} />
                      </a>
                    )}

                    {/* Progress Bar */}
                    <div className="mt-6 h-1 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>

                  {/* Corner Glow Effect */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-400/20 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
