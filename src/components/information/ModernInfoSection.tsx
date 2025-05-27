
import { motion } from "framer-motion";
import { useLanguage } from "@/components/navbar/LanguageContext";
import { informationTranslations, LanguageKey } from "./translations";
import { ExternalLink } from "lucide-react";

interface FeatureWithLinks {
  title: string;
  description: string;
  icon: string;
  image: string;
  links: { name: string; url: string; }[];
  link?: never;
}

interface FeatureWithSingleLink {
  title: string;
  description: string;
  icon: string;
  image: string;
  link: string;
  links?: never;
}

interface FeatureWithoutLinks {
  title: string;
  description: string;
  icon: string;
  image: string;
  link?: never;
  links?: never;
}

type Feature = FeatureWithLinks | FeatureWithSingleLink | FeatureWithoutLinks;

export function ModernInfoSection() {
  const { currentLanguage } = useLanguage();
  const text = informationTranslations[currentLanguage as LanguageKey] || informationTranslations.en;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // Features with proper 1920x1080 aspect ratio images and links
  const features: Feature[] = [
    {
      ...text.features[0], // Modern Interface
      image: "public/2.gif"
    },
    {
      ...text.features[1], // Mod Management with links
      image: "public/3.gif",
      links: [
        { name: "Minecraft Forge", url: "https://files.minecraftforge.net/" },
        { name: "Fabric", url: "https://fabricmc.net/" },
        { name: "Quilt", url: "https://quiltmc.org/" },
        { name: "NeoForge", url: "https://neoforged.net/" }
      ]
    },
    {
      ...text.features[2], // Cross Platform
      image: "public/2.gif"
    },
    {
      ...text.features[3], // Easy Installation
      image: "public/4.gif"
    },
    {
      ...text.features[4], // Open Source with GitHub link
      image: "public/5.gif",
      link: "https://github.com/Voxelum"
    }
  ];

  return (
    <motion.section 
      className="py-32 bg-gradient-to-b from-minecraft-dark-blue via-slate-900 to-black relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full filter blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full filter blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-full filter blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-20"
          variants={itemVariants}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-blue-500/30 mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-blue-400 font-semibold">Features</span>
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              {text.title}
            </span>
          </motion.h2>
          
          <motion.div
            className="w-40 h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 mx-auto rounded-full mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          
          <motion.p 
            className="text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {text.subtitle}
          </motion.p>
        </motion.div>

        {/* Redesigned Features Grid with 1920x1080 aspect ratio */}
        <motion.div 
          className="space-y-16 max-w-7xl mx-auto"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center group`}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              {/* Image Container - 16:9 aspect ratio */}
              <div className="flex-1 relative overflow-hidden rounded-3xl border border-white/20">
                <div className="aspect-video relative">
                  <motion.img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    initial={{ scale: 1.1, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Icon overlay */}
                  <motion.div 
                    className="absolute top-6 right-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <span className="text-4xl">{feature.icon}</span>
                  </motion.div>
                </div>
              </div>
              
              {/* Content Container */}
              <div className="flex-1 space-y-6">
                <motion.h3 
                  className="text-4xl md:text-5xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-500"
                  whileHover={{ scale: 1.05 }}
                >
                  {feature.title}
                </motion.h3>
                
                <p className="text-xl text-white/80 leading-relaxed group-hover:text-white/95 transition-colors duration-500">
                  {feature.description}
                </p>

                {/* Links for features */}
                {feature.links && (
                  <div className="flex flex-wrap gap-3">
                    {feature.links.map((link, linkIndex) => (
                      <motion.a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg border border-blue-500/30 text-blue-400 hover:text-white hover:bg-blue-500/30 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="font-semibold">{link.name}</span>
                        <ExternalLink size={16} />
                      </motion.a>
                    ))}
                  </div>
                )}

                {/* Single link for Open Source */}
                {feature.link && (
                  <motion.a
                    href={feature.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl border border-green-500/30 text-green-400 hover:text-white hover:bg-green-500/30 transition-all duration-300 font-semibold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>View on GitHub</span>
                    <ExternalLink size={18} />
                  </motion.a>
                )}

                {/* Animated progress bar */}
                <motion.div 
                  className="h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.15 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
