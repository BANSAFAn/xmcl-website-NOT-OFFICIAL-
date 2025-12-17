import { e as createComponent, k as renderComponent, r as renderTemplate } from '../chunks/astro/server_BQmXhRda.mjs';
import 'piccolore';
import { a as useTranslation, L as Link, B as Button, A as AppShell, $ as $$Layout } from '../chunks/AppShell_BklFfeZH.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { memo, useMemo, useState, useRef } from 'react';
import { P as PageTransition } from '../chunks/PageTransition_FR7ZFP18.mjs';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Download, ArrowRight, Package, Zap, TrendingUp, Star, ExternalLink, GitBranch, Activity, Github, Sparkles, Layers, HardDrive, Gamepad2 } from 'lucide-react';
import { B as Badge } from '../chunks/badge_zWW6J42E.mjs';
export { renderers } from '../renderers.mjs';

const HeroSection = ({ onDownloadClick }) => {
  const { t } = useTranslation();
  const { data: repoData, isLoading: repoLoading } = useQuery({
    queryKey: ["github-repo-stats"],
    queryFn: async () => {
      const response = await fetch("https://api.github.com/repos/Voxelum/x-minecraft-launcher");
      if (!response.ok) throw new Error("Failed to fetch repository data");
      return response.json();
    },
    staleTime: 10 * 60 * 1e3,
    // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false
  });
  const { data: releasesData, isLoading: releasesLoading } = useQuery({
    queryKey: ["github-releases-stats"],
    queryFn: async () => {
      const response = await fetch("https://api.github.com/repos/Voxelum/x-minecraft-launcher/releases");
      if (!response.ok) throw new Error("Failed to fetch releases data");
      return response.json();
    },
    staleTime: 10 * 60 * 1e3,
    // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false
  });
  const totalDownloads = releasesData?.reduce((acc, release) => {
    return acc + (release.assets?.reduce((assetAcc, asset) => {
      return assetAcc + (asset.download_count || 0);
    }, 0) || 0);
  }, 0) || 0;
  const formatNumber = (num) => {
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toString();
  };
  const isLoading = repoLoading || releasesLoading;
  return /* @__PURE__ */ jsxs("section", { className: "min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-20 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" }),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse", style: { animationDelay: "1s" } }),
      /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse", style: { animationDelay: "2s" } })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10 w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -50 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.8 },
            children: [
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  className: "inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-full border border-blue-500/20",
                  initial: { opacity: 0, scale: 0.8 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 0.5, delay: 0.2 },
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-green-500 animate-pulse" }),
                    /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-blue-600 dark:text-blue-400", children: t("home.openSourceStatus") })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                motion.h1,
                {
                  className: "text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-[0.9] tracking-tight",
                  initial: { opacity: 0, y: 30 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6, delay: 0.1 },
                  children: /* @__PURE__ */ jsx("span", { className: "inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent", children: t("home.heroTitle") })
                }
              ),
              /* @__PURE__ */ jsx(
                motion.p,
                {
                  className: "text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed font-light mb-8",
                  initial: { opacity: 0, y: 30 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6, delay: 0.2 },
                  children: t("home.heroSubtitle")
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  className: "flex flex-col sm:flex-row gap-4 mb-12",
                  initial: { opacity: 0, y: 30 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.8, delay: 0.5 },
                  children: [
                    /* @__PURE__ */ jsx(motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: /* @__PURE__ */ jsx(Link, { to: "/download", children: /* @__PURE__ */ jsxs(Button, { size: "lg", className: "group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-lg", children: [
                      /* @__PURE__ */ jsxs("span", { className: "relative z-10 flex items-center gap-2", children: [
                        /* @__PURE__ */ jsx(Download, { className: "w-5 h-5 group-hover:animate-bounce" }),
                        t("home.getStarted"),
                        /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 group-hover:translate-x-1 transition-transform" })
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" })
                    ] }) }) }),
                    /* @__PURE__ */ jsx(motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: /* @__PURE__ */ jsx(
                      Button,
                      {
                        variant: "outline",
                        size: "lg",
                        onClick: onDownloadClick,
                        className: "border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 px-8 py-6 text-lg",
                        children: t("home.learnMore")
                      }
                    ) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  className: "flex flex-wrap gap-4",
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.8, delay: 0.6 },
                  children: [
                    /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "px-4 py-2 text-sm bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm", children: [
                      /* @__PURE__ */ jsx(Package, { className: "w-4 h-4 mr-1 text-blue-500" }),
                      t("home.crossPlatform")
                    ] }),
                    /* @__PURE__ */ jsxs(Badge, { variant: "outline", className: "px-4 py-2 text-sm bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm", children: [
                      /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 mr-1 text-yellow-500" }),
                      t("home.highPerformance")
                    ] })
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: "grid grid-cols-2 gap-6",
            initial: { opacity: 0, x: 50 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.8, delay: 0.2 },
            children: [
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  className: "bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20 shadow-lg",
                  whileHover: { y: -5, transition: { duration: 0.2 } },
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                      /* @__PURE__ */ jsx(Download, { className: "w-8 h-8 text-blue-500" }),
                      /* @__PURE__ */ jsx(TrendingUp, { className: "w-5 h-5 text-blue-400" })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-slate-900 dark:text-white mb-2", children: isLoading ? /* @__PURE__ */ jsx("div", { className: "w-16 h-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" }) : formatNumber(totalDownloads) }),
                    /* @__PURE__ */ jsx("div", { className: "text-sm text-slate-600 dark:text-slate-400", children: t("home.downloads") })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  className: "bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-xl rounded-2xl p-6 border border-yellow-500/20 shadow-lg",
                  whileHover: { y: -5, transition: { duration: 0.2 } },
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                      /* @__PURE__ */ jsx(Star, { className: "w-8 h-8 text-yellow-500" }),
                      /* @__PURE__ */ jsx(ExternalLink, { className: "w-5 h-5 text-yellow-400" })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-slate-900 dark:text-white mb-2", children: isLoading ? /* @__PURE__ */ jsx("div", { className: "w-16 h-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" }) : formatNumber(repoData?.stargazers_count || 0) }),
                    /* @__PURE__ */ jsx("div", { className: "text-sm text-slate-600 dark:text-slate-400", children: t("home.stars") })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  className: "bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 shadow-lg",
                  whileHover: { y: -5, transition: { duration: 0.2 } },
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                      /* @__PURE__ */ jsx(GitBranch, { className: "w-8 h-8 text-purple-500" }),
                      /* @__PURE__ */ jsx(Activity, { className: "w-5 h-5 text-purple-400" })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-slate-900 dark:text-white mb-2", children: isLoading ? /* @__PURE__ */ jsx("div", { className: "w-16 h-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" }) : formatNumber(repoData?.forks_count || 0) }),
                    /* @__PURE__ */ jsx("div", { className: "text-sm text-slate-600 dark:text-slate-400", children: t("home.forks") })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.div,
                {
                  className: "bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-xl rounded-2xl p-6 border border-red-500/20 shadow-lg",
                  whileHover: { y: -5, transition: { duration: 0.2 } },
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                      /* @__PURE__ */ jsx(Activity, { className: "w-8 h-8 text-red-500" }),
                      /* @__PURE__ */ jsx(ExternalLink, { className: "w-5 h-5 text-red-400" })
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold text-slate-900 dark:text-white mb-2", children: isLoading ? /* @__PURE__ */ jsx("div", { className: "w-16 h-8 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" }) : repoData?.open_issues_count || 0 }),
                    /* @__PURE__ */ jsx("div", { className: "text-sm text-slate-600 dark:text-slate-400", children: t("home.issues") })
                  ]
                }
              )
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "flex justify-center mt-12",
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay: 0.7 },
          children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://github.com/Voxelum/x-minecraft-launcher",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex items-center gap-2 px-6 py-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors",
              children: [
                /* @__PURE__ */ jsx(Github, { className: "w-5 h-5" }),
                t("home.viewOnGitHub"),
                /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4" })
              ]
            }
          )
        }
      )
    ] })
  ] });
};

const ANIMATION_CONFIG = {
  spring: { stiffness: 300, damping: 30 },
  buttonSpring: { stiffness: 400, damping: 25 }};
const COLOR_MAP = {
  orange: "bg-orange-500 hover:bg-orange-600 shadow-orange-500/50",
  green: "bg-green-500 hover:bg-green-600 shadow-green-500/50",
  cyan: "bg-cyan-500 hover:bg-cyan-600 shadow-cyan-500/50",
  indigo: "bg-indigo-500 hover:bg-indigo-600 shadow-indigo-500/50",
  red: "bg-red-500 hover:bg-red-600 shadow-red-500/50",
  blue: "bg-blue-500 hover:bg-blue-600 shadow-blue-500/50",
  purple: "bg-purple-500 hover:bg-purple-600 shadow-purple-500/50",
  yellow: "bg-yellow-500 hover:bg-yellow-600 shadow-yellow-500/50",
  amber: "bg-amber-500 hover:bg-amber-600 shadow-amber-500/50"
};
const FeaturesSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
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
            color: "orange"
          },
          { name: "Modrinth", url: "https://modrinth.com/", color: "green" }
        ]
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
            color: "cyan"
          },
          {
            name: t("home.symbolicLink"),
            url: "https://en.wikipedia.org/wiki/Symbolic_link",
            color: "indigo"
          }
        ]
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
            color: "red"
          },
          { name: "Fabric", url: "https://fabricmc.net/", color: "blue" },
          { name: "NeoForge", url: "https://neoforged.net/", color: "purple" },
          { name: "Quilt", url: "https://quiltmc.org/", color: "yellow" },
          { name: "LabyMod", url: "https://www.labymod.net/", color: "indigo" }
        ]
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
            color: "purple"
          }
        ]
      }
    ],
    [t]
  );
  return /* @__PURE__ */ jsxs(
    "section",
    {
      ref: sectionRef,
      className: "relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden",
      style: { position: "relative" },
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 opacity-30 dark:opacity-20",
            style: {
              backgroundImage: "radial-gradient(circle at 2px 2px, rgb(148 163 184 / 0.15) 1px, transparent 0)",
              backgroundSize: "40px 40px"
            }
          }
        ) }),
        /* @__PURE__ */ jsx(FloatingOrbs, {}),
        /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto relative z-10", children: [
          /* @__PURE__ */ jsx(SectionHeader, { t }),
          /* @__PURE__ */ jsx("div", { className: "space-y-40", children: features.map((feature, index) => /* @__PURE__ */ jsx(
            FeatureCard,
            {
              feature,
              index,
              scrollProgress: scrollYProgress
            },
            index
          )) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" })
      ]
    }
  );
};
const SectionHeader = memo(({ t }) => /* @__PURE__ */ jsxs(
  motion.div,
  {
    className: "text-center mb-28",
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 1 },
    children: [
      /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: "inline-flex items-center gap-3 px-6 py-3 mb-8 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 backdrop-blur-2xl rounded-full border border-white/20 dark:border-white/10 shadow-2xl",
          initial: { scale: 0, rotate: -180 },
          whileInView: { scale: 1, rotate: 0 },
          viewport: { once: true },
          transition: { type: "spring", ...ANIMATION_CONFIG.spring, delay: 0.2 },
          whileHover: { scale: 1.05 },
          children: [
            /* @__PURE__ */ jsx(
              motion.div,
              {
                animate: { rotate: 360 },
                transition: { duration: 3, repeat: Infinity, ease: "linear" },
                children: /* @__PURE__ */ jsx(Sparkles, { className: "w-5 h-5 text-purple-600 dark:text-purple-400" })
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 dark:from-purple-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent", children: t("home.powerfulFeatures") }),
            /* @__PURE__ */ jsx(Star, { className: "w-4 h-4 text-yellow-500 fill-yellow-500" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        motion.h2,
        {
          className: "text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 leading-[0.9] tracking-tight",
          initial: { opacity: 0, y: 40 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.8, delay: 0.3 },
          children: /* @__PURE__ */ jsx("span", { className: "inline-block bg-gradient-to-br from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent drop-shadow-2xl", children: t("home.featuresTitle") })
        }
      ),
      /* @__PURE__ */ jsx(
        motion.p,
        {
          className: "text-xl sm:text-2xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed font-medium",
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.8, delay: 0.5 },
          children: t("home.comprehensiveSolution")
        }
      )
    ]
  }
));
const FloatingOrbs = memo(() => {
  const orbs = useMemo(
    () => [
      {
        size: 500,
        color: "bg-purple-500/20",
        style: { left: "10%", top: "10%" },
        duration: 20
      },
      {
        size: 400,
        color: "bg-blue-500/20",
        style: { right: "15%", top: "20%" },
        duration: 25
      },
      {
        size: 450,
        color: "bg-cyan-500/20",
        style: { left: "20%", bottom: "15%" },
        duration: 22
      },
      {
        size: 350,
        color: "bg-pink-500/20",
        style: { right: "25%", bottom: "20%" },
        duration: 18
      }
    ],
    []
  );
  return /* @__PURE__ */ jsx("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: orbs.map((orb, i) => /* @__PURE__ */ jsx(
    motion.div,
    {
      className: `absolute ${orb.color} dark:opacity-50 rounded-full blur-3xl will-change-transform`,
      style: {
        width: orb.size,
        height: orb.size,
        ...orb.style
      },
      animate: {
        x: [0, 100, 0],
        y: [0, -50, 0],
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3]
      },
      transition: {
        duration: orb.duration,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    i
  )) });
});
const FeatureCard = memo(({ feature, index, scrollProgress }) => {
  const [isHovered, setIsHovered] = useState(false);
  const reverse = index % 2 !== 0;
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [5, -5]),
    ANIMATION_CONFIG.spring
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-5, 5]),
    ANIMATION_CONFIG.spring
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
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      className: `grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${reverse ? "lg:grid-flow-dense" : ""}`,
      initial: { opacity: 0, y: 100 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-100px", amount: 0.2 },
      transition: {
        duration: 0.9,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1]
      },
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      children: [
        /* @__PURE__ */ jsx(
          ImageSection,
          {
            cardRef,
            feature,
            reverse,
            isHovered,
            rotateX,
            rotateY
          }
        ),
        /* @__PURE__ */ jsx(ContentSection, { feature, reverse, index })
      ]
    }
  );
});
const ImageSection = memo(
  ({ cardRef, feature, reverse, isHovered, rotateX, rotateY }) => /* @__PURE__ */ jsx(
    motion.div,
    {
      ref: cardRef,
      className: `relative ${reverse ? "lg:col-start-2" : ""}`,
      style: { rotateX, rotateY, transformStyle: "preserve-3d" },
      children: /* @__PURE__ */ jsxs("div", { className: "relative group", children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: `absolute -inset-4 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-700 rounded-3xl will-change-transform`,
            animate: isHovered ? { scale: 1.1 } : { scale: 1 }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "relative rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-1 shadow-2xl", children: /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-[1.3rem] bg-white dark:bg-slate-950", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none z-20",
              style: {
                backgroundImage: "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
                backgroundSize: "20px 20px"
              }
            }
          ),
          /* @__PURE__ */ jsx(
            motion.img,
            {
              src: feature.image,
              alt: feature.title,
              loading: "lazy",
              className: "w-full h-auto relative z-10",
              initial: { scale: 1.1, opacity: 0 },
              whileInView: { scale: 1, opacity: 1 },
              viewport: { once: true, amount: 0.3 },
              transition: { duration: 1.2, ease: "easeOut" }
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-30",
              initial: { x: "-100%" },
              animate: isHovered ? { x: "100%" } : { x: "-100%" },
              transition: { duration: 1.2, ease: "easeInOut" }
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 mix-blend-overlay pointer-events-none z-20`
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: `absolute -top-6 ${reverse ? "-left-6" : "-right-6"} p-5 bg-gradient-to-br ${feature.gradient} rounded-2xl shadow-2xl z-50`,
            initial: { scale: 0, rotate: -180 },
            whileInView: { scale: 1, rotate: 0 },
            viewport: { once: true },
            transition: { type: "spring", stiffness: 300, delay: 0.4 },
            whileHover: { scale: 1.15, rotate: 10 },
            children: /* @__PURE__ */ jsx(
              feature.icon,
              {
                className: "w-8 h-8 text-white drop-shadow-lg",
                strokeWidth: 2.5
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: `absolute -bottom-4 ${reverse ? "left-4" : "right-4"} flex gap-2 z-50`,
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: 0.5 },
            children: feature.tags.slice(0, 3).map((tag, i) => /* @__PURE__ */ jsx(
              motion.span,
              {
                className: "px-3 py-1.5 text-xs font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 backdrop-blur-xl",
                initial: { opacity: 0, scale: 0 },
                whileInView: { opacity: 1, scale: 1 },
                viewport: { once: true },
                transition: { delay: 0.6 + i * 0.1, type: "spring" },
                whileHover: { scale: 1.1, y: -2 },
                children: tag
              },
              i
            ))
          }
        )
      ] })
    }
  )
);
const ContentSection = memo(({ feature, reverse, index }) => /* @__PURE__ */ jsxs(
  motion.div,
  {
    className: `space-y-6 ${reverse ? "lg:col-start-1 lg:row-start-1" : ""}`,
    initial: { opacity: 0, x: reverse ? 50 : -50 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.8, delay: 0.3 },
    children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs(
          motion.div,
          {
            className: "flex items-center gap-3 mb-2",
            initial: { opacity: 0, x: -20 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { delay: 0.4 },
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `w-1.5 h-12 bg-gradient-to-b ${feature.gradient} rounded-full`
                }
              ),
              /* @__PURE__ */ jsx(Layers, { className: `w-5 h-5 text-${feature.accentColor}-500` })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.h3,
          {
            className: "text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight tracking-tight",
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: 0.5 },
            children: feature.title
          }
        ),
        /* @__PURE__ */ jsx(
          motion.p,
          {
            className: "text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed",
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: 0.6 },
            children: feature.description
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "flex flex-wrap gap-3 pt-4",
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: 0.7 },
          children: feature.links.map((link, i) => /* @__PURE__ */ jsx(ActionButton, { link, index: i }, i))
        }
      )
    ]
  }
));
const ActionButton = memo(({ link, index }) => /* @__PURE__ */ jsxs(
  motion.a,
  {
    href: link.url,
    target: "_blank",
    rel: "noopener noreferrer",
    className: `group relative inline-flex items-center gap-2 px-6 py-3 ${COLOR_MAP[link.color]} text-white font-bold rounded-xl shadow-lg overflow-hidden transition-all duration-300`,
    initial: { opacity: 0, scale: 0.8 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true },
    transition: {
      delay: 0.8 + index * 0.1,
      type: "spring",
      ...ANIMATION_CONFIG.buttonSpring
    },
    whileHover: { scale: 1.05, y: -3 },
    whileTap: { scale: 0.95 },
    children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          className: "absolute inset-0 bg-white/25 pointer-events-none",
          initial: { x: "-100%", skewX: -20 },
          whileHover: { x: "100%" },
          transition: { duration: 0.6 }
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "relative z-10 text-sm sm:text-base", children: link.name }),
      /* @__PURE__ */ jsx(
        motion.div,
        {
          animate: { x: [0, 4, 0] },
          transition: { duration: 1.5, repeat: Infinity },
          children: /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 sm:w-5 sm:h-5 relative z-10" })
        }
      )
    ]
  }
));
SectionHeader.displayName = "SectionHeader";
FloatingOrbs.displayName = "FloatingOrbs";
FeatureCard.displayName = "FeatureCard";
ImageSection.displayName = "ImageSection";
ContentSection.displayName = "ContentSection";
ActionButton.displayName = "ActionButton";

const IndexContent = () => {
  const { t } = useTranslation();
  const handleDownloadClick = () => {
    const featuresSection = document.querySelector("#features-section");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return /* @__PURE__ */ jsx(PageTransition, { children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsx(HeroSection, { onDownloadClick: handleDownloadClick }),
    /* @__PURE__ */ jsx("section", { id: "features-section", className: "relative", children: /* @__PURE__ */ jsx(FeaturesSection, {}) }),
    /* @__PURE__ */ jsx("section", { className: "py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950", children: /* @__PURE__ */ jsx("div", { className: "max-w-4xl mx-auto text-center", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8 },
        children: [
          /* @__PURE__ */ jsx("h2", { className: "text-4xl sm:text-5xl lg:text-6xl font-black mb-6", children: /* @__PURE__ */ jsx("span", { className: "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent", children: t("home.readyToStart") }) }),
          /* @__PURE__ */ jsx("p", { className: "text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto", children: t("home.readyToStartDesc") }),
          /* @__PURE__ */ jsx(motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: /* @__PURE__ */ jsx(Link, { to: "/download", children: /* @__PURE__ */ jsx(Button, { size: "lg", className: "group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-6 text-lg", children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Zap, { className: "w-5 h-5" }),
            t("home.tryNow"),
            /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 group-hover:translate-x-1 transition-transform" })
          ] }) }) }) })
        ]
      }
    ) }) })
  ] }) });
};
function Index() {
  return /* @__PURE__ */ jsx(AppShell, { children: /* @__PURE__ */ jsx(IndexContent, {}) });
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "X Minecraft Launcher - Home" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Index", Index, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/baneronetwo/Documents/GitHub/xmcl-website-NOT-OFFICIAL-/src/react-pages/Index", "client:component-export": "default" })} ` })}`;
}, "C:/Users/baneronetwo/Documents/GitHub/xmcl-website-NOT-OFFICIAL-/src/pages/index.astro", void 0);

const $$file = "C:/Users/baneronetwo/Documents/GitHub/xmcl-website-NOT-OFFICIAL-/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
