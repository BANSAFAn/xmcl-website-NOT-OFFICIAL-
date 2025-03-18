
import { motion } from "framer-motion";
import { BackgroundEffects } from "./BackgroundEffects";

interface SecretMessageProps {
  setShowSecretMessage: (show: boolean) => void;
}

export function SecretMessage({ setShowSecretMessage }: SecretMessageProps) {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center items-center overflow-hidden">
      <BackgroundEffects />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="text-center p-8 bg-black/50 backdrop-blur-md rounded-xl max-w-2xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-red-500 mb-6">Secret Message Activated</h1>
        <p className="text-xl text-white mb-8">
          Я создал XMCL, а Baneronetwo простой модератор который забыл спросить разрешение
        </p>
        <button 
          onClick={() => setShowSecretMessage(false)}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          Close Message
        </button>
      </motion.div>
    </section>
  );
}
