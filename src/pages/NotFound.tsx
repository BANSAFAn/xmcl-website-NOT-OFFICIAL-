import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-minecraft-dark-blue">
      <Navbar />

      <motion.div
        className="min-h-[85vh] flex items-center justify-center"
        initial="initial"
        animate="animate"
        variants={containerVariants}
      >
        <div className="text-center mx-4 glass-card p-8 rounded-xl border border-white/10 max-w-lg">
          <motion.div variants={itemVariants}>
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-red-500/20">
                <AlertTriangle className="h-12 w-12 text-red-400" />
              </div>
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl font-bold mb-4 text-gradient-cyan"
            variants={itemVariants}
          >
            404
          </motion.h1>

          <motion.p
            className="text-xl text-white/80 mb-6"
            variants={itemVariants}
          >
            Oops! The page you're looking for has vanished into the void.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            variants={itemVariants}
          >
            <Link
              to="/"
              className="px-4 py-2 rounded-md bg-accent hover:bg-accent/80 transition-colors flex items-center justify-center gap-2"
            >
              <Home size={18} />
              <span>Return to Home</span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              <span>Go Back</span>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
