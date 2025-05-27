import { motion } from "framer-motion";
import { AnimatedTitle } from "./AnimatedTitle";
import { AnimatedSubtitle } from "./AnimatedSubtitle";
import { ActionButtons } from "./ActionButtons";
import { useLanguage } from "@/components/navbar/LanguageContext";

interface HeroContentProps {
  title: string;
  subtitle: string;
  downloadText: string;
  githubText: string;
  description: string;
  onNumberEffect: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function HeroContent({ 
  title, 
  subtitle, 
  downloadText, 
  githubText, 
  description,
  onNumberEffect 
}: HeroContentProps) {
  const { currentLanguage } = useLanguage();

  // Improved descriptions with better formatting
  const descriptions = {
    en: "X Minecraft Launcher (XMCL) is the ultimate modern Minecraft launcher designed for seamless mod management. Experience effortless installation and organization of modpacks, resource packs, mods, and shader packs with our intuitive interface.",
    ru: "X Minecraft Launcher (XMCL) - это современный лаунчер Minecraft нового поколения, созданный для беспроблемного управления модами. Наслаждайтесь простой установкой и организацией модпаков, ресурспаков, модов и шейдеров через интуитивный интерфейс.",
    uk: "X Minecraft Launcher (XMCL) - це сучасний лаунчер Minecraft нового покоління, створений для безпроблемного керування модами. Насолоджуйтесь простою установкою та організацією модпаків, ресурспаків, модів та шейдерів через інтуїтивний інтерфейс.",
    zh: "X Minecraft 启动器 (XMCL) 是终极现代化 Minecraft 启动器，专为无缝模组管理而设计。通过我们直观的界面，轻松安装和组织模组包、资源包、模组和光影包。",
    de: "X Minecraft Launcher (XMCL) ist der ultimative moderne Minecraft-Launcher für nahtloses Mod-Management. Erleben Sie mühelose Installation und Organisation von Modpacks, Ressourcenpaketen, Mods und Shader-Paketen mit unserer intuitiven Benutzeroberfläche.",
    ja: "X Minecraft ランチャー（XMCL）は、シームレスなMOD管理のために設計された究極の現代的なMinecraftランチャーです。直感的なインターフェースで、MODパック、リソースパック、MOD、シェーダーパックの簡単なインストールと整理を体験してください。"
  };

  // Platform integration text
  const integrationTexts = {
    en: "Seamlessly integrates with all major modding platforms including",
    ru: "Бесшовно интегрируется со всеми основными платформами модов, включая",
    uk: "Безшовно інтегрується з усіма основними платформами модів, включаючи",
    zh: "与所有主要模组平台无缝集成，包括",
    de: "Nahtlose Integration mit allen wichtigen Modding-Plattformen, einschließlich",
    ja: "以下を含むすべての主要なMODプラットフォームとシームレスに統合："
  };

  const currentDescription = descriptions[currentLanguage as keyof typeof descriptions] || descriptions.en;
  const currentIntegrationText = integrationTexts[currentLanguage as keyof typeof integrationTexts] || integrationTexts.en;

  return (
    <div className="container mx-auto px-4 relative z-10">
      <div className="flex flex-col items-center justify-center text-center">
        {/* Main text content with enhanced animations */}
        <motion.div 
          className="max-w-4xl space-y-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Enhanced title container */}
          <motion.div
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-3xl rounded-full"></div>
            <AnimatedTitle title={title} />
          </motion.div>

          {/* Enhanced subtitle with gradient background */}
          <motion.div
            className="relative bg-gradient-to-r from-green-400/10 via-blue-500/10 to-purple-600/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatedSubtitle subtitle={subtitle} />
          </motion.div>

          {/* Enhanced action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-2xl rounded-full"></div>
            <ActionButtons />
          </motion.div>
        </motion.div>
        
        {/* Enhanced description section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 max-w-6xl"
        >
          <div className="relative group">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-purple-600/10 rounded-3xl border border-white/20"></div>
            
            {/* Content container */}
            <div className="relative z-10 p-10 rounded-3xl bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-md border border-white/20 shadow-2xl">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="space-y-8"
              >
                {/* Main description */}
                <p className="text-2xl leading-relaxed text-white/90 font-light">
                  {currentDescription}
                </p>

                {/* Platform integration */}
                <div className="border-t border-white/10 pt-6">
                  <p className="text-lg text-white/80 mb-6">
                    {currentIntegrationText}{" "}
                    <motion.a 
                      href="https://modrinth.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-purple-400 transition-all duration-300 relative inline-block font-semibold"
                      whileHover={{ scale: 1.05 }}
                      style={{
                        background: "linear-gradient(45deg, transparent 30%, rgba(168, 85, 247, 0.15) 50%, transparent 70%)",
                        backgroundSize: "200% 100%",
                        padding: "4px 12px",
                        borderRadius: "8px",
                        animation: "shimmer 3s infinite"
                      }}
                    >
                      Modrinth
                    </motion.a>, {" "}
                    <motion.a 
                      href="https://quiltmc.org/en/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-green-400 transition-all duration-300 relative inline-block font-semibold"
                      whileHover={{ scale: 1.05 }}
                      style={{
                        background: "linear-gradient(45deg, transparent 30%, rgba(34, 197, 94, 0.15) 50%, transparent 70%)",
                        backgroundSize: "200% 100%",
                        padding: "4px 12px",
                        borderRadius: "8px",
                        animation: "shimmer 3.5s infinite"
                      }}
                    >
                      Quilt
                    </motion.a>, {" "}
                    <motion.a 
                      href="https://fabricmc.net/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-orange-400 transition-all duration-300 relative inline-block font-semibold"
                      whileHover={{ scale: 1.05 }}
                      style={{
                        background: "linear-gradient(45deg, transparent 30%, rgba(251, 146, 60, 0.15) 50%, transparent 70%)",
                        backgroundSize: "200% 100%",
                        padding: "4px 12px",
                        borderRadius: "8px",
                        animation: "shimmer 4s infinite"
                      }}
                    >
                      Fabric
                    </motion.a>, and {" "}
                    <motion.a 
                      href="https://files.minecraftforge.net/net/minecraftforge/forge/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-400 transition-all duration-300 relative inline-block font-semibold"
                      whileHover={{ scale: 1.05 }}
                      style={{
                        background: "linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.15) 50%, transparent 70%)",
                        backgroundSize: "200% 100%",
                        padding: "4px 12px",
                        borderRadius: "8px",
                        animation: "shimmer 4.5s infinite"
                      }}
                    >
                      Minecraft Forge
                    </motion.a>.
                  </p>
                </div>
                
                {/* Enhanced feature highlights */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { icon: "🚀", text: "Modern UI", color: "from-blue-500 to-cyan-500" },
                    { icon: "🔧", text: "Easy Setup", color: "from-green-500 to-emerald-500" },
                    { icon: "💎", text: "Open Source", color: "from-purple-500 to-pink-500" },
                    { icon: "⚡", text: "Fast & Reliable", color: "from-orange-500 to-red-500" }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className={`relative flex flex-col items-center p-6 rounded-xl bg-gradient-to-br ${feature.color}/10 backdrop-blur-sm border border-white/10 group overflow-hidden`}
                      whileHover={{ scale: 1.05, y: -8 }}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color}/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                      <motion.span 
                        className="text-3xl mb-3 relative z-10"
                        whileHover={{ rotate: 10, scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {feature.icon}
                      </motion.span>
                      <span className="text-white/90 text-sm font-medium relative z-10">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
