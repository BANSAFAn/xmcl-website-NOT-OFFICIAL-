
import { motion } from "framer-motion";

export function PageTitle() {
  return (
    <div className="text-center">
      <motion.h1
        className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Meet Our Team
      </motion.h1>
      <motion.p
        className="mt-4 text-lg text-white/60 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        The talented individuals behind XMCL who make this project possible.
      </motion.p>
    </div>
  );
}
