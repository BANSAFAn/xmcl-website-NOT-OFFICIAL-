
import { BackgroundEffects } from "./hero/BackgroundEffects";
import { useLanguage } from "./hero/useLanguage";
import { useNumberParticles } from "./hero/useNumberParticles";
import { useKeyboardEasterEggs } from "./hero/useKeyboardEasterEggs";
import { SecretMessage } from "./hero/SecretMessage";
import { LinuxTerminal } from "./hero/LinuxTerminal";
import { HeroContent } from "./hero/HeroContent";
import { BlueScreenOfDeath } from "./hero/BlueScreenOfDeath";
import { Apple } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export function Hero() {
  const { text } = useLanguage();
  const generateRandomNumbers = useNumberParticles();
  const { 
    showSecretMessage, 
    setShowSecretMessage, 
    showLinuxTerminal, 
    setShowLinuxTerminal,
    showAppleMode,
    showBlueScreen,
    setShowBlueScreen
  } = useKeyboardEasterEggs();

  if (showSecretMessage) {
    return <SecretMessage setShowSecretMessage={setShowSecretMessage} />;
  }

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden">
      {/* Blurred background light effects */}
      <BackgroundEffects />
      
      {/* Linux Terminal Easter Egg */}
      <LinuxTerminal 
        showLinuxTerminal={showLinuxTerminal} 
        setShowLinuxTerminal={setShowLinuxTerminal} 
      />
      
      {/* Windows Blue Screen Easter Egg */}
      <AnimatePresence>
        {showBlueScreen && (
          <BlueScreenOfDeath onClose={() => setShowBlueScreen(false)} />
        )}
      </AnimatePresence>
      
      {/* Content container */}
      <HeroContent 
        title={text.title}
        subtitle={text.subtitle}
        downloadText={text.download}
        githubText={text.github}
        description={text.description}
        onNumberEffect={generateRandomNumbers}
      />
      
      {/* Apple mode indicator (only visible when active) */}
      {showAppleMode && (
        <div className="fixed bottom-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full">
          <Apple className="text-white h-6 w-6" />
        </div>
      )}
    </section>
  );
}
