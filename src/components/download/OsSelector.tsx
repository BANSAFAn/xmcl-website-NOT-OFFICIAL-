
import { motion } from "framer-motion";

interface OSOption {
  id: string;
  name: string;
  color: string;
}

interface OSSelectorProps {
  activeOS: string;
  setActiveOS: (os: string) => void;
}

export function OSSelector({ activeOS, setActiveOS }: OSSelectorProps) {
  const osOptions: OSOption[] = [
    { id: "windows", name: "Windows", color: "bg-blue-500 hover:bg-blue-600" },
    { id: "macos", name: "macOS", color: "bg-orange-500 hover:bg-orange-600" },
    { id: "linux", name: "Linux", color: "bg-cyan-500 hover:bg-cyan-600" }
  ];

  return (
    <motion.div 
      className="flex justify-center mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="glass-card inline-flex p-1 rounded-xl">
        {osOptions.map((os) => (
          <motion.button
            key={os.id}
            onClick={() => setActiveOS(os.id)}
            className={`px-6 py-2 rounded-lg transition-all duration-300 ${
              activeOS === os.id 
                ? `${os.color} text-white shadow-lg` 
                : 'hover:bg-white/10 text-white/70'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {os.name}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
