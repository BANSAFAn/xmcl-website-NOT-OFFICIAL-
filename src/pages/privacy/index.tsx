
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { PrivacyHeader } from "./PrivacyHeader";
import { usePrivacyLanguage } from "./usePrivacyLanguage";

const Privacy = () => {
  const { content } = usePrivacyLanguage();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-minecraft-dark-blue">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <PrivacyHeader title={content.title} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="glass-card p-8 rounded-xl"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">{content.introduction.title}</h2>
            <p className="text-white/80 leading-relaxed">{content.introduction.content}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">{content.informationCollection.title}</h2>
            
            <motion.div
              variants={containerVariants}
              className="pl-4 border-l-2 border-accent/50 mb-6"
            >
              <h3 className="text-xl font-semibold text-white mb-2">{content.informationCollection.usageInfo.title}</h3>
              <p className="text-white/80 leading-relaxed mb-4">{content.informationCollection.usageInfo.content}</p>
              <ul className="space-y-2">
                {content.informationCollection.usageInfo.items.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { 
                        opacity: 1, 
                        x: 0,
                        transition: { delay: index * 0.1 }
                      }
                    }}
                    className="flex items-start text-white/80"
                  >
                    <span className="text-accent mr-2">•</span> {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              variants={containerVariants}
              className="pl-4 border-l-2 border-accent/50 mb-6"
            >
              <h3 className="text-xl font-semibold text-white mb-2">{content.informationCollection.additionalInfo.title}</h3>
              <p className="text-white/80 leading-relaxed mb-4">{content.informationCollection.additionalInfo.content}</p>
              <ul className="space-y-2">
                {content.informationCollection.additionalInfo.items.map((item, index) => (
                  <motion.li 
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { 
                        opacity: 1, 
                        x: 0,
                        transition: { delay: index * 0.1 }
                      }
                    }}
                    className="flex items-start text-white/80"
                  >
                    <span className="text-accent mr-2">•</span> {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div variants={itemVariants} className="pl-4 border-l-2 border-accent/50 mb-6">
              <h3 className="text-xl font-semibold text-white mb-2">{content.informationCollection.deviceId.title}</h3>
              <p className="text-white/80 leading-relaxed">{content.informationCollection.deviceId.content}</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="pl-4 border-l-2 border-accent/50">
              <h3 className="text-xl font-semibold text-white mb-2">{content.informationCollection.errorReporting.title}</h3>
              <p className="text-white/80 leading-relaxed">{content.informationCollection.errorReporting.content}</p>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">{content.dataSharing.title}</h2>
            <p className="text-white/80 leading-relaxed mb-4">{content.dataSharing.content}</p>
            <ul className="space-y-2 pl-4 border-l-2 border-accent/50">
              {content.dataSharing.items.map((item, index) => (
                <motion.li 
                  key={index}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      transition: { delay: index * 0.1 }
                    }
                  }}
                  className="flex items-start text-white/80"
                >
                  <span className="text-accent mr-2">•</span> {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">{content.dataSecurity.title}</h2>
            <p className="text-white/80 leading-relaxed">{content.dataSecurity.content}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">{content.thirdParty.title}</h2>
            <p className="text-white/80 leading-relaxed">{content.thirdParty.content}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">{content.children.title}</h2>
            <p className="text-white/80 leading-relaxed">{content.children.content}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">{content.changes.title}</h2>
            <p className="text-white/80 leading-relaxed">{content.changes.content}</p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-4">{content.contact.title}</h2>
            <p className="text-white/80 leading-relaxed">{content.contact.content}</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
