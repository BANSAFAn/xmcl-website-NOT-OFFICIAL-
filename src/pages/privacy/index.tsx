
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { PrivacyHeader } from "./PrivacyHeader";
import { PrivacySection } from "./PrivacySection";
import { PrivacyListSection } from "./PrivacyListSection";
import { ContactSection } from "./ContactSection";
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
          <PrivacySection 
            title={content.introduction.title} 
            content={content.introduction.content} 
          />

          <PrivacySection 
            title={content.informationCollection.title} 
            content=""
          >
            <PrivacyListSection
              title={content.informationCollection.usageInfo.title}
              content={content.informationCollection.usageInfo.content}
              items={content.informationCollection.usageInfo.items}
              variant="subsection"
            />

            <PrivacyListSection
              title={content.informationCollection.additionalInfo.title}
              content={content.informationCollection.additionalInfo.content}
              items={content.informationCollection.additionalInfo.items}
              variant="subsection"
            />

            <PrivacySection
              title={content.informationCollection.deviceId.title}
              content={content.informationCollection.deviceId.content}
              variant="subsection"
            />

            <PrivacySection
              title={content.informationCollection.errorReporting.title}
              content={content.informationCollection.errorReporting.content}
              variant="subsection"
            />
          </PrivacySection>

          <PrivacyListSection
            title={content.dataSharing.title}
            content={content.dataSharing.content}
            items={content.dataSharing.items}
          />

          <PrivacySection 
            title={content.dataSecurity.title} 
            content={content.dataSecurity.content} 
          />

          <PrivacySection 
            title={content.thirdParty.title} 
            content={content.thirdParty.content} 
          />

          <PrivacySection 
            title={content.children.title} 
            content={content.children.content} 
          />

          <PrivacySection 
            title={content.changes.title} 
            content={content.changes.content} 
          />

          <ContactSection 
            title={content.contact.title} 
            content={content.contact.content} 
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
