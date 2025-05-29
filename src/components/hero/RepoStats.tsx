
import { motion } from "framer-motion";
import { Star, GitFork, Download, Tag, Users, Activity } from "lucide-react";
import { useGitHubRepoStats } from "@/hooks/useGitHubRepoStats";
import { useGitHubStats } from "@/hooks/useGitHubStats";

export function RepoStats() {
  const { formattedStars, formattedForks, isLoading: repoLoading } = useGitHubRepoStats();
  const { formattedDownloads, releases, isLoading: statsLoading } = useGitHubStats();

  const latestVersion = releases?.[0]?.tag_name || "v0.0.0";

  const stats = [
    {
      icon: Star,
      value: formattedStars,
      label: "Stars",
      color: "from-yellow-400 to-orange-500",
      delay: 0.1
    },
    {
      icon: GitFork,
      value: formattedForks,
      label: "Forks",
      color: "from-blue-400 to-cyan-500",
      delay: 0.2
    },
    {
      icon: Download,
      value: formattedDownloads,
      label: "Downloads",
      color: "from-green-400 to-emerald-500",
      delay: 0.3
    },
    {
      icon: Tag,
      value: latestVersion,
      label: "Latest",
      color: "from-purple-400 to-pink-500",
      delay: 0.4
    }
  ];

  if (repoLoading || statsLoading) {
    return (
      <motion.div
        className="flex justify-center items-center gap-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 w-24 h-20 animate-pulse" />
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex flex-wrap justify-center items-center gap-4 mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className={`relative group overflow-hidden`}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: stat.delay }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          {/* Animated background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color}/20 rounded-xl blur-xl opacity-60 group-hover:opacity-100 transition-all duration-500`} />
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color}/10 rounded-xl border border-white/20 group-hover:border-white/40 transition-all duration-300`} />
          
          {/* Content */}
          <div className="relative z-10 bg-white/5 backdrop-blur-md rounded-xl p-4 min-w-[100px] text-center border border-white/10 group-hover:bg-white/10 transition-all duration-300">
            <motion.div
              className="flex justify-center mb-2"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <stat.icon className={`w-5 h-5 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
            </motion.div>
            <motion.div
              className="text-lg font-bold text-white mb-1"
              animate={{ 
                textShadow: ["0 0 0px rgba(255,255,255,0.5)", "0 0 10px rgba(255,255,255,0.8)", "0 0 0px rgba(255,255,255,0.5)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {stat.value}
            </motion.div>
            <div className="text-xs text-white/70 font-medium">{stat.label}</div>
          </div>
          
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
