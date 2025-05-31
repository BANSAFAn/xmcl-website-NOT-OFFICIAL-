
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
import { useIsMobile } from "@/hooks/use-mobile";

export function Hero() {
  const { text } = useLanguage();
  const generateRandomNumbers = useNumberParticles();
  const isMobile = useIsMobile();
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
    <section className={`relative min-h-screen flex flex-col justify-center overflow-hidden ${isMobile ? 'pt-24 pb-16' : 'pt-32 pb-20'}`}>
      <BackgroundEffects isMobile={isMobile} />
      
      {/* Only show terminal on desktop */}
      {!isMobile && (
        <LinuxTerminal 
          showLinuxTerminal={showLinuxTerminal} 
          setShowLinuxTerminal={setShowLinuxTerminal} 
        />
      )}
      
      <AnimatePresence>
        {showBlueScreen && (
          <BlueScreenOfDeath onClose={() => setShowBlueScreen(false)} />
        )}
      </AnimatePresence>
      
      <HeroContent 
        title={text.title}
        subtitle={text.subtitle}
        description={text.description}
        onNumberEffect={generateRandomNumbers}
        isMobile={isMobile}
      />
      
      {showAppleMode && (
        <div className="fixed bottom-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full">
          <Apple className="text-white h-6 w-6" />
        </div>
      )}
    </section>
  );
}
