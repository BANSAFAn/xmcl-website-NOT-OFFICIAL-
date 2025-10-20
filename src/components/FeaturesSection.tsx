import React, { useState, useRef, memo, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  Download,
  HardDrive,
  Gamepad2,
  Zap,
  Sparkles,
  ExternalLink,
  ArrowRight,
  Star,
  Layers,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const ANIMATION_CONFIG = {
  spring: { stiffness: 300, damping: 30 },
  buttonSpring: { stiffness: 400, damping: 25 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

const COLOR_MAP = {
  orange: "bg-orange-500 hover:bg-orange-600 shadow-orange-500/50",
  green: "bg-green-500 hover:bg-green-600 shadow-green-500/50",
  cyan: "bg-cyan-500 hover:bg-cyan-600 shadow-cyan-500/50",
  indigo: "bg-indigo-500 hover:bg-indigo-600 shadow-indigo-500/50",
  red: "bg-red-500 hover:bg-red-600 shadow-red-500/50",
  blue: "bg-blue-500 hover:bg-blue-600 shadow-blue-500/50",
  purple: "bg-purple-500 hover:bg-purple-600 shadow-purple-500/50",
  yellow: "bg-yellow-500 hover:bg-yellow-600 shadow-yellow-500/50",
  amber: "bg-amber-500 hover:bg-amber-600 shadow-amber-500/50",
};

export const FeaturesSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const features = useMemo(
    () => [
      {
        icon: Download,
        title: t("home.downloadManageWhatever"),
        description: t("home.downloadManageWhateverDesc"),
        image: "/PhotoXMCL/477b2df8-4979-4097-95e5-b918123b0cf7.png",
        gradient: "from-orange-500 via-red-500 to-pink-600",
        accentColor: "orange",
        tags: ["CurseForge", "Modrinth", "Modpacks"],
        links: [
          {
            name: "CurseForge",
            url: "https://www.curseforge.com/minecraft/mc-mods",
            color: "orange",
          },
          { name: "Modrinth", url: "https://modrinth.com/", color: "green" },
        ],
      },
      {
        icon: HardDrive,
        title: t("home.optimalDiskSpace"),
        description: t("home.optimalDiskSpaceDesc"),
        image: "/PhotoXMCL/c1b9c039-948c-498e-b2c7-9389ef257ae0.png",
        gradient: "from-cyan-500 via-blue-500 to-indigo-600",
        accentColor: "cyan",
        tags: ["Hard Links", "Symbolic Links", "Optimization"],
        links: [
          {
            name: t("home.hardLink"),
            url: "https://en.wikipedia.org/wiki/Hard_link",
            color: "cyan",
          },
          {
            name: t("home.symbolicLink"),
            url: "https://en.wikipedia.org/wiki/Symbolic_link",
            color: "indigo",
          },
        ],
      },
      {
        icon: Gamepad2,
        title: t("home.installingAnyFramework"),
        description: t("home.installingAnyFrameworkDesc"),
        image: "/PhotoXMCL/download minecrat.png",
        gradient: "from-purple-500 via-violet-500 to-fuchsia-600",
        accentColor: "purple",
        tags: ["Forge", "Fabric", "NeoForge", "Quilt"],
        links: [
          {
            name: "Forge",
            url: "https://files.minecraftforge.net/",
            color: "red",
          },
          { name: "Fabric", url: "https://fabricmc.net/", color: "blue" },
          { name: "NeoForge", url: "https://neoforged.net/", color: "purple" },
          { name: "Quilt", url: "https://quiltmc.org/", color: "yellow" },
          { name: "LabyMod", url: "https://www.labymod.net/", color: "indigo" },
        ],
      },
      {
        icon: Zap,
        title: t("home.multipleInstances"),
        description: t("home.multipleInstancesDesc"),
        image: "/PhotoXMCL/X_Minecraft_Launcher_O3OyGdWjN6.png",
        gradient: "from-amber-500 via-yellow-500 to-lime-500",
        accentColor: "amber",
        tags: ["P2P", "Fast", "Efficient"],
        links: [
          {
            name: t("home.p2p"),
            url: "https://en.wikipedia.org/wiki/Peer-to-peer",
            color: "purple",
          },
        ],
      },
    ],
    [t],
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div
          className="absolute inset-0 opacity-30 dark:opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgb(148 163 184 / 0.15) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <FloatingOrbs />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader t={t} />

        <div className="space-y-40">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
              scrollProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
    </section>
  );
};

const SectionHeader = memo(({ t }) => (
  <motion.div
    className="text-center mb-28"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 1 }}
  >
    <motion.div
      className="inline-flex items-center gap-3 px-6 py-3 mb-8 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 backdrop-blur-2xl rounded-full border border-white/20 dark:border-white/10 shadow-2xl"
      initial={{ scale: 0, rotate: -180 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", ...ANIMATION_CONFIG.spring, delay: 0.2 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
      </motion.div>
      <span className="text-sm font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 dark:from-purple-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
        {t("home.powerfulFeatures")}
      </span>
      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
    </motion.div>

    <motion.h2
      className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 leading-[0.9] tracking-tight"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <span className="inline-block bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent drop-shadow-2xl">
        {t("home.featuresTitle")}
      </span>
    </motion.h2>

    <motion.p
      className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed font-medium"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      {t("home.comprehensiveSolution")}
    </motion.p>
  </motion.div>
));

const FloatingOrbs = memo(() => {
  const orbs = useMemo(
    () => [
      {
        size: 500,
        color: "bg-purple-500/20",
        style: { left: "10%", top: "10%" },
        duration: 20,
      },
      {
        size: 400,
        color: "bg-blue-500/20",
        style: { right: "15%", top: "20%" },
        duration: 25,
      },
      {
        size: 450,
        color: "bg-cyan-500/20",
        style: { left: "20%", bottom: "15%" },
        duration: 22,
      },
      {
        size: 350,
        color: "bg-pink-500/20",
        style: { right: "25%", bottom: "20%" },
        duration: 18,
      },
    ],
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute ${orb.color} dark:opacity-50 rounded-full blur-3xl will-change-transform`}
          style={{
            width: orb.size,
            height: orb.size,
            ...orb.style,
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
});

const FeatureCard = memo(({ feature, index, scrollProgress }) => {
  const [isHovered, setIsHovered] = useState(false);
  const reverse = index % 2 !== 0;
  const cardRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [5, -5]),
    ANIMATION_CONFIG.spring,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-5, 5]),
    ANIMATION_CONFIG.spring,
  );

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <motion.div
      className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${reverse ? "lg:grid-flow-dense" : ""}`}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px", amount: 0.2 }}
      transition={{
        duration: 0.9,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ImageSection
        cardRef={cardRef}
        feature={feature}
        reverse={reverse}
        isHovered={isHovered}
        rotateX={rotateX}
        rotateY={rotateY}
      />

      <ContentSection feature={feature} reverse={reverse} index={index} />
    </motion.div>
  );
});

const ImageSection = memo(
  ({ cardRef, feature, reverse, isHovered, rotateX, rotateY }) => (
    <motion.div
      ref={cardRef}
      className={`relative ${reverse ? "lg:col-start-2" : ""}`}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      <div className="relative group">
        <motion.div
          className={`absolute -inset-4 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-700 rounded-3xl will-change-transform`}
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
        />

        <div className="relative rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-1 shadow-2xl">
          <div className="relative overflow-hidden rounded-[1.3rem] bg-white dark:bg-slate-950">
            <div
              className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none z-20"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            <motion.img
              src={feature.image}
              alt={feature.title}
              loading="lazy"
              className="w-full h-auto relative z-10"
              initial={{ scale: 1.1, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />

            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-30"
              initial={{ x: "-100%" }}
              animate={isHovered ? { x: "100%" } : { x: "-100%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />

            <div
              className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 mix-blend-overlay pointer-events-none z-20`}
            />
          </div>
        </div>

        <motion.div
          className={`absolute -top-6 ${reverse ? "-left-6" : "-right-6"} p-5 bg-gradient-to-br ${feature.gradient} rounded-2xl shadow-2xl z-50`}
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, delay: 0.4 }}
          whileHover={{ scale: 1.15, rotate: 10 }}
        >
          <feature.icon
            className="w-8 h-8 text-white drop-shadow-lg"
            strokeWidth={2.5}
          />
        </motion.div>

        <motion.div
          className={`absolute -bottom-4 ${reverse ? "left-4" : "right-4"} flex gap-2 z-50`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {feature.tags.slice(0, 3).map((tag, i) => (
            <motion.span
              key={i}
              className="px-3 py-1.5 text-xs font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 backdrop-blur-xl"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.1, type: "spring" }}
              whileHover={{ scale: 1.1, y: -2 }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  ),
);

const ContentSection = memo(({ feature, reverse, index }) => (
  <motion.div
    className={`space-y-6 ${reverse ? "lg:col-start-1 lg:row-start-1" : ""}`}
    initial={{ opacity: 0, x: reverse ? 50 : -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.8, delay: 0.3 }}
  >
    <div className="space-y-4">
      <motion.div
        className="flex items-center gap-3 mb-2"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <div
          className={`w-1.5 h-12 bg-gradient-to-b ${feature.gradient} rounded-full`}
        />
        <Layers className={`w-5 h-5 text-${feature.accentColor}-500`} />
      </motion.div>

      <motion.h3
        className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        {feature.title}
      </motion.h3>

      <motion.p
        className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        {feature.description}
      </motion.p>
    </div>

    <motion.div
      className="flex flex-wrap gap-3 pt-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.7 }}
    >
      {feature.links.map((link, i) => (
        <ActionButton key={i} link={link} index={i} />
      ))}
    </motion.div>
  </motion.div>
));

const ActionButton = memo(({ link, index }) => (
  <motion.a
    href={link.url}
    target="_blank"
    rel="noopener noreferrer"
    className={`group relative inline-flex items-center gap-2 px-6 py-3 ${COLOR_MAP[link.color]} text-white font-bold rounded-xl shadow-lg overflow-hidden transition-all duration-300`}
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{
      delay: 0.8 + index * 0.1,
      type: "spring",
      ...ANIMATION_CONFIG.buttonSpring,
    }}
    whileHover={{ scale: 1.05, y: -3 }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.div
      className="absolute inset-0 bg-white/25 pointer-events-none"
      initial={{ x: "-100%", skewX: -20 }}
      whileHover={{ x: "100%" }}
      transition={{ duration: 0.6 }}
    />
    <span className="relative z-10 text-sm sm:text-base">{link.name}</span>
    <motion.div
      animate={{ x: [0, 4, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
    </motion.div>
  </motion.a>
));

SectionHeader.displayName = "SectionHeader";
FloatingOrbs.displayName = "FloatingOrbs";
FeatureCard.displayName = "FeatureCard";
ImageSection.displayName = "ImageSection";
ContentSection.displayName = "ContentSection";
ActionButton.displayName = "ActionButton";
