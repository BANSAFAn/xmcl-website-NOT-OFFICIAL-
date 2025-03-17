
import { motion } from "framer-motion";
import { ArrowDownToLine, Star, Download, GitFork } from "lucide-react";
import { useState, useEffect } from "react";

interface ActionButtonsProps {
  downloadText: string;
  githubText: string;
  onNumberEffect: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function ActionButtons({
  downloadText,
  githubText,
  onNumberEffect
}: ActionButtonsProps) {
  const [githubStats, setGithubStats] = useState({
    stars: "0",
    downloads: "0",
    forks: "0",
    loading: true
  });

  // Fetch GitHub stats
  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        // Fetch stars count and forks count
        const repoResponse = await fetch('https://api.github.com/repos/Voxelum/x-minecraft-launcher');
        const repoData = await repoResponse.json();
        
        // Fetch release stats
        const releasesResponse = await fetch('https://api.github.com/repos/Voxelum/x-minecraft-launcher/releases');
        const releasesData = await releasesResponse.json();
        
        // Calculate total downloads across all releases
        let totalDownloads = 0;
        releasesData.forEach((release: any) => {
          release.assets.forEach((asset: any) => {
            totalDownloads += asset.download_count;
          });
        });
        
        setGithubStats({
          stars: repoData.stargazers_count.toLocaleString(),
          forks: repoData.forks_count.toLocaleString(),
          downloads: totalDownloads.toLocaleString(),
          loading: false
        });
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        setGithubStats({
          stars: "N/A",
          forks: "N/A",
          downloads: "N/A",
          loading: false
        });
      }
    };
    
    fetchGitHubStats();
  }, []);

  return <motion.div className="flex flex-wrap gap-6 justify-center pt-6" initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5,
    delay: 0.6
  }}>
      <motion.a href="#download" whileHover={{
      scale: 1.05,
      backgroundColor: "rgba(59, 130, 246, 1)"
    }} whileTap={{
      scale: 0.95
    }} transition={{
      type: "spring",
      stiffness: 400,
      damping: 10
    }} className="p-3 bg-accent/90 backdrop-blur-sm text-white rounded-md font-medium flex items-center justify-center relative overflow-hidden group px-6">
        <span className="relative flex items-center">
          <motion.div initial={{
          rotate: 0
        }} whileHover={{
          rotate: 180
        }} transition={{
          duration: 0.3
        }}>
            <ArrowDownToLine strokeWidth={2} />
          </motion.div>
        </span>
      </motion.a>
      
      <motion.a 
        href="https://github.com/Voxelum/x-minecraft-launcher" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="py-3 px-6 bg-white/10 text-white rounded-md font-medium relative overflow-hidden group"
        whileHover={{
          scale: 1.05,
          backgroundColor: "rgba(255, 255, 255, 0.15)"
        }}
        whileTap={{
          scale: 0.95
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 10
        }}
        onMouseEnter={onNumberEffect}
      >
        <span className="relative flex items-center space-x-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
            <path d="M9 18c-4.51 2-5-2-7-2"></path>
          </svg>
          <span>{githubText}</span>
          
          {!githubStats.loading && (
            <div className="flex items-center space-x-3 border-l border-white/20 pl-3 ml-2">
              <div className="flex items-center">
                <Star size={16} className="text-yellow-400 mr-1" />
                <span className="text-sm">{githubStats.stars}</span>
              </div>
              <div className="flex items-center">
                <GitFork size={16} className="text-blue-400 mr-1" />
                <span className="text-sm">{githubStats.forks}</span>
              </div>
              <div className="flex items-center">
                <Download size={16} className="text-green-400 mr-1" />
                <span className="text-sm">{githubStats.downloads}</span>
              </div>
            </div>
          )}
        </span>
      </motion.a>
    </motion.div>;
}
