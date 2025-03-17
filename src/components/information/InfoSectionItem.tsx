
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { InfoSection } from "./translations";
import { Lens } from "@/components/ui/lens";

interface InfoSectionItemProps {
  section: InfoSection;
}

export function InfoSectionItem({ section }: InfoSectionItemProps) {
  return (
    <div 
      className={`flex flex-col ${section.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}
      id={section.id}
    >
      <motion.div 
        initial={{ opacity: 0, x: section.reverse ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="lg:w-1/2"
      >
        <div className="relative">
          <div className={`absolute -inset-1 bg-gradient-to-r ${section.reverse ? 'from-minecraft-accent-orange to-accent' : 'from-accent to-minecraft-accent-green'} opacity-30 blur-xl rounded-2xl`}></div>
          <div className="relative bg-minecraft-darker-blue rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <Lens 
              zoomFactor={1.3}
              lensSize={150}
              lensColor="rgba(0,0,0,0.9)"
            >
              <img 
                src={section.image} 
                alt={section.imageAlt} 
                className="w-full h-auto"
              />
            </Lens>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: section.reverse ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        className="lg:w-1/2 space-y-6"
      >
        <h3 className="text-2xl sm:text-3xl font-bold leading-tight transition-all duration-300 hover:scale-105 hover:text-accent hover:drop-shadow-[0_0_10px_rgba(14,165,233,0.5)]">
          {section.title}
        </h3>
        
        <p className="text-lg text-white/80">
          {section.description}
        </p>
        
        <div className="flex flex-wrap gap-4 pt-2">
          {section.cta && (
            <Link
              to={section.ctaLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 bg-accent/20 hover:bg-accent/30 backdrop-blur-sm text-white rounded-md transition-all duration-300 border border-accent/50"
            >
              &gt; {section.cta}
            </Link>
          )}
          
          {section.cta2 && (
            <Link
              to={section.cta2Link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 bg-minecraft-accent-green/20 hover:bg-minecraft-accent-green/30 backdrop-blur-sm text-white rounded-md transition-all duration-300 border border-minecraft-accent-green/50"
            >
              &gt; {section.cta2}
            </Link>
          )}
          
          {section.cta3 && (
            <Link
              to={section.cta3Link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 bg-minecraft-accent-orange/20 hover:bg-minecraft-accent-orange/30 backdrop-blur-sm text-white rounded-md transition-all duration-300 border border-minecraft-accent-orange/50"
            >
              &gt; {section.cta3}
            </Link>
          )}
          
          {section.cta4 && (
            <Link
              to={section.cta4Link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 bg-minecraft-accent-yellow/20 hover:bg-minecraft-accent-yellow/30 backdrop-blur-sm text-white rounded-md transition-all duration-300 border border-minecraft-accent-yellow/50"
            >
              &gt; {section.cta4}
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  );
}
