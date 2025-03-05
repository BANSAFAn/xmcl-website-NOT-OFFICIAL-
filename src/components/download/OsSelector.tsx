
import { motion } from "framer-motion";
import { Monitor, Apple, Terminal } from "lucide-react";

interface OSSelectorProps {
  activeOS: string;
  setActiveOS: (os: string) => void;
}

export function OSSelector({ activeOS, setActiveOS }: OSSelectorProps) {
  const operatingSystems = [
    { id: "windows", name: "Windows", icon: <Monitor className="mr-2" size={18} /> },
    { id: "macos", name: "macOS", icon: <Apple className="mr-2" size={18} /> },
    { id: "linux", name: "Linux", icon: <Terminal className="mr-2" size={18} /> }
  ];

  return (
    <div className="flex justify-center mb-10">
      <div className="inline-flex bg-white/5 backdrop-blur-sm p-1 rounded-lg shadow-inner">
        {operatingSystems.map((os) => (
          <motion.button
            key={os.id}
            onClick={() => setActiveOS(os.id)}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeOS === os.id
                ? "bg-blue-500 text-white shadow-md"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
            whileHover={{ scale: activeOS === os.id ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {os.icon}
            {os.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
