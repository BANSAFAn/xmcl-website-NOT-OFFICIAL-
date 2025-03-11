import { motion } from "framer-motion";

interface ActionButtonsProps {
  downloadText: string;
  githubText: string;
  onNumberEffect: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function ActionButtons({
  downloadText,
  githubText,
  onNumberEffect,
}: ActionButtonsProps) {
  return (
    <motion.div
      className="flex flex-wrap gap-6 justify-center pt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <motion.a
        href="#download"
        className="py-4 px-8 bg-accent text-white rounded-md font-medium flex items-center text-lg relative overflow-hidden group"
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-accent via-cyan-400 to-accent bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100"></span>
        <span className="relative flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          {downloadText}
        </span>
      </motion.a>

      <motion.a
        href="https://github.com/Voxelum/x-minecraft-launcher"
        target="_blank"
        rel="noopener noreferrer"
        className="py-4 px-8 bg-white/10 text-white rounded-md font-medium text-lg relative overflow-hidden group"
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        onMouseEnter={onNumberEffect}
      >
        <span className="absolute inset-0 bg-white/20 bg-[length:200%_100%] animate-pulse-slow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        <span className="relative flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
            <path d="M9 18c-4.51 2-5-2-7-2"></path>
          </svg>
          {githubText}
        </span>
      </motion.a>
    </motion.div>
  );
}
