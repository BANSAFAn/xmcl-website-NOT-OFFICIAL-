
import { motion } from "framer-motion";
import { useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Navbar } from "@/components/navbar";
import { PrivacyHeader } from "./PrivacyHeader";
import { usePrivacyLanguage } from "./usePrivacyLanguage";
import { Shield, Lock, Eye, Globe, FileText } from "lucide-react";

const hasTitle = (obj: any): obj is { title: string } => {
  return obj && typeof obj === 'object' && typeof obj.title === 'string';
};

const hasContent = (obj: any): obj is { content: string } => {
  return obj && typeof obj === 'object' && typeof obj.content === 'string';
};

const hasItems = (obj: any): obj is { items: string[] } => {
  return obj && typeof obj === 'object' && Array.isArray(obj.items);
};

const Privacy = () => {
  const { content } = usePrivacyLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
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
      transition: { duration: 0.6 }
    }
  };

  const sections = [
    { key: 'introduction', icon: <FileText className="w-5 h-5" /> },
    { key: 'informationCollection', icon: <Eye className="w-5 h-5" /> },
    { key: 'dataSharing', icon: <Globe className="w-5 h-5" /> },
    { key: 'dataSecurity', icon: <Shield className="w-5 h-5" /> },
    { key: 'thirdParty', icon: <Lock className="w-5 h-5" /> },
    { key: 'children', icon: <Shield className="w-5 h-5" /> },
    { key: 'changes', icon: <FileText className="w-5 h-5" /> },
    { key: 'contact', icon: <Globe className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <Navbar />
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full filter blur-3xl"></div>
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 py-24 relative z-10">
        <PrivacyHeader title={content.title} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.div 
            className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl relative overflow-hidden"
            variants={itemVariants}
            ref={containerRef}
          >
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full filter blur-xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full filter blur-xl"></div>
            
            <ScrollArea className="h-[70vh] pr-4">
              <motion.div className="space-y-8">
                {/* Introduction */}
                <motion.div variants={itemVariants} className="relative">
                  <motion.div 
                    className="flex items-center gap-3 mb-4"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-2 rounded-lg bg-blue-500/20">
                      <FileText className="w-5 h-5 text-blue-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      {hasTitle(content.introduction) ? content.introduction.title : ''}
                    </h2>
                  </motion.div>
                  <motion.p 
                    className="text-white/80 leading-relaxed pl-11"
                    whileHover={{ color: "rgba(255, 255, 255, 0.9)" }}
                  >
                    {hasContent(content.introduction) ? content.introduction.content : ''}
                  </motion.p>
                </motion.div>

                {/* Information Collection */}
                <motion.div variants={itemVariants} className="relative">
                  <motion.div 
                    className="flex items-center gap-3 mb-6"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-2 rounded-lg bg-purple-500/20">
                      <Eye className="w-5 h-5 text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">
                      {hasTitle(content.informationCollection) ? content.informationCollection.title : ''}
                    </h2>
                  </motion.div>
                  
                  <div className="pl-11 space-y-6">
                    {/* Usage Info */}
                    {content.informationCollection && typeof content.informationCollection === 'object' && 'usageInfo' in content.informationCollection && (
                      <motion.div
                        className="p-4 rounded-xl bg-white/5 border border-white/10"
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                      >
                        <h3 className="text-lg font-semibold text-white mb-3">{content.informationCollection.usageInfo.title}</h3>
                        <p className="text-white/80 leading-relaxed mb-4">{content.informationCollection.usageInfo.content}</p>
                        <ul className="space-y-2">
                          {content.informationCollection.usageInfo.items.map((item, index) => (
                            <motion.li
                              key={index}
                              className="flex items-start text-white/80 hover:text-white/95"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ x: 5 }}
                            >
                              <span className="text-blue-400 mr-3 mt-1">●</span>
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                    
                    {/* Additional Info */}
                    {content.informationCollection && typeof content.informationCollection === 'object' && 'additionalInfo' in content.informationCollection && (
                      <motion.div
                        className="p-4 rounded-xl bg-white/5 border border-white/10"
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                      >
                        <h3 className="text-lg font-semibold text-white mb-3">{content.informationCollection.additionalInfo.title}</h3>
                        <p className="text-white/80 leading-relaxed mb-4">{content.informationCollection.additionalInfo.content}</p>
                        <ul className="space-y-2">
                          {content.informationCollection.additionalInfo.items.map((item, index) => (
                            <motion.li
                              key={index}
                              className="flex items-start text-white/80 hover:text-white/95"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ x: 5 }}
                            >
                              <span className="text-purple-400 mr-3 mt-1">●</span>
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                    
                    {/* Device ID */}
                    {content.informationCollection && typeof content.informationCollection === 'object' && 'deviceId' in content.informationCollection && (
                      <motion.div
                        className="p-4 rounded-xl bg-white/5 border border-white/10"
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                      >
                        <h3 className="text-lg font-semibold text-white mb-3">{content.informationCollection.deviceId.title}</h3>
                        <p className="text-white/80 leading-relaxed">{content.informationCollection.deviceId.content}</p>
                      </motion.div>
                    )}
                    
                    {/* Error Reporting */}
                    {content.informationCollection && typeof content.informationCollection === 'object' && 'errorReporting' in content.informationCollection && (
                      <motion.div
                        className="p-4 rounded-xl bg-white/5 border border-white/10"
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                      >
                        <h3 className="text-lg font-semibold text-white mb-3">{content.informationCollection.errorReporting.title}</h3>
                        <p className="text-white/80 leading-relaxed">{content.informationCollection.errorReporting.content}</p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* Other sections */}
                {['dataSharing', 'dataSecurity', 'thirdParty', 'children', 'changes', 'contact'].map((section, sectionIndex) => {
                  const sectionContent = content[section as keyof typeof content];
                  const sectionConfig = sections.find(s => s.key === section);
                  const colors = [
                    'from-green-500/20 to-emerald-500/20',
                    'from-red-500/20 to-pink-500/20',
                    'from-yellow-500/20 to-orange-500/20',
                    'from-cyan-500/20 to-blue-500/20',
                    'from-indigo-500/20 to-purple-500/20',
                    'from-teal-500/20 to-green-500/20'
                  ];
                  
                  // Only render if sectionContent is an object (not a string)
                  if (typeof sectionContent !== 'object' || !sectionContent) {
                    return null;
                  }
                  
                  return (
                    <motion.div 
                      key={section}
                      variants={itemVariants} 
                      className="relative"
                    >
                      <motion.div 
                        className="flex items-center gap-3 mb-4"
                        whileHover={{ x: 5 }}
                      >
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${colors[sectionIndex]}`}>
                          {sectionConfig?.icon}
                        </div>
                        <h2 className="text-2xl font-bold text-white">
                          {hasTitle(sectionContent) ? sectionContent.title : ''}
                        </h2>
                      </motion.div>
                      
                      <motion.div
                        className="p-4 rounded-xl bg-white/5 border border-white/10 ml-11"
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                      >
                        {section === 'contact' && hasContent(sectionContent) ? (
                          <p className="text-white/80 leading-relaxed">
                            {sectionContent.content.split('cijhn@hotmail.com')[0]}
                            <motion.a 
                              href="mailto:cijhn@hotmail.com" 
                              className="text-blue-400 hover:text-blue-300 underline"
                              whileHover={{ scale: 1.05 }}
                            >
                              cijhn@hotmail.com
                            </motion.a>
                            {sectionContent.content.split('cijhn@hotmail.com')[1]}
                          </p>
                        ) : section === 'dataSharing' && hasItems(sectionContent) ? (
                          <div>
                            <p className="text-white/80 leading-relaxed mb-4">
                              {hasContent(sectionContent) ? sectionContent.content : ''}
                            </p>
                            <ul className="space-y-2">
                              {sectionContent.items.map((item, index) => (
                                <motion.li 
                                  key={index}
                                  className="flex items-start text-white/80 hover:text-white/95"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  whileHover={{ x: 5 }}
                                >
                                  <span className="text-green-400 mr-3 mt-1">●</span>
                                  {item}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <p className="text-white/80 leading-relaxed">
                            {hasContent(sectionContent) ? sectionContent.content : ''}
                          </p>
                        )}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </ScrollArea>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
