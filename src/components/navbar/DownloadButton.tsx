
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
      <Link
        to="/download"
        className={`flex items-center justify-center gap-2 px-5 py-2.5 bg-accent text-white rounded-full transition-colors hover:bg-accent/90 shadow-md ${
          fullWidth ? "w-full" : ""
        }`}
        onMouseEnter={generateParticles}
      >
        <Download size={18} />
        <span>{translations.downloadNow}</span>
      </Link>
    </motion.div>
  );
};
