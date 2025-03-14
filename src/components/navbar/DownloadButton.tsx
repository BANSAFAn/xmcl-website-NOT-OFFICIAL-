
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import { HashLink } from "react-router-hash-link";
import { useNumberParticles } from "../hero/useNumberParticles";

interface DownloadButtonProps {
  fullWidth?: boolean;
}

export const DownloadButton = ({ fullWidth = false }: DownloadButtonProps) => {
  const generateParticles = useNumberParticles();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={fullWidth ? "w-full" : ""}
    >
      <HashLink
        smooth
        to="/#download"
        className={`flex items-center justify-center gap-2 p-3.5 bg-accent/90 backdrop-blur-sm text-white rounded-md transition-all hover:bg-accent shadow-sm ${
          fullWidth ? "w-full" : ""
        }`}
        onMouseEnter={generateParticles}
        aria-label="Download"
      >
        <Download size={24} />
      </HashLink>
    </motion.div>
  );
}
