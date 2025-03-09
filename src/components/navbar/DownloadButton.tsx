
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import { HashLink } from "react-router-hash-link";
import { useNumberParticles } from "../hero/useNumberParticles";
import { useLanguage } from "./LanguageContext";

interface DownloadButtonProps {
  fullWidth?: boolean;
}

export const DownloadButton = ({ fullWidth = false }: DownloadButtonProps) => {
  const generateParticles = useNumberParticles();
  const { translations } = useLanguage();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={fullWidth ? "w-full" : ""}
    >
      <HashLink
        smooth
        to="/#download"
        className={`flex items-center justify-center gap-2 px-4 py-2 bg-accent/90 backdrop-blur-sm text-white rounded-md transition-all hover:bg-accent shadow-sm ${
          fullWidth ? "w-full" : ""
        }`}
        onMouseEnter={generateParticles}
      >
        <Download size={18} />
        <span className="text-sm font-medium">{translations.downloadNow}</span>
      </HashLink>
    </motion.div>
  );
}
