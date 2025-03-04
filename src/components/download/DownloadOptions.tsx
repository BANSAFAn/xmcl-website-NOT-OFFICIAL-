
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useDownloadOptions } from "./useDownloadOptions";
import { DownloadCard } from "./DownloadCard";
import { Release } from "./fetchReleases";

interface DownloadOptionsProps {
  releaseData: Release | undefined;
  isLoading: boolean;
  error: Error | null;
  activeOS: string;
  downloadText: string;
}

export function DownloadOptions({ 
  releaseData, 
  isLoading, 
  error, 
  activeOS,
  downloadText
}: DownloadOptionsProps) {
  const downloadOptions = useDownloadOptions(releaseData, activeOS);

  // If we're still loading the release data, show skeleton loaders
  if (isLoading) {
    return (
      <>
        {Array(4).fill(0).map((_, index) => (
          <motion.div 
            key={index}
            className="glass-card p-6 rounded-xl text-center bg-white/5 animate-pulse-slow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4 mx-auto"></div>
            <div className="h-5 bg-white/10 rounded-md w-3/4 mx-auto mb-2"></div>
            <div className="h-4 bg-white/5 rounded-md w-1/2 mx-auto mb-4"></div>
            <div className="py-2 px-4 bg-white/10 rounded-md w-32 h-10 mx-auto"></div>
          </motion.div>
        ))}
      </>
    );
  }
  
  if (error) {
    return (
      <div className="col-span-full text-center py-8">
        <p className="text-red-400 mb-4">Failed to fetch latest release information</p>
        <p className="text-white/70">
          Please visit the <a href="https://github.com/Voxelum/x-minecraft-launcher/releases" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">GitHub Releases page</a> to download
        </p>
      </div>
    );
  }
  
  if (downloadOptions.length === 0) {
    return (
      <div className="col-span-full text-center py-8">
        <p className="text-white/70 mb-4">No download options available for selected OS</p>
        <a 
          href="https://github.com/Voxelum/x-minecraft-launcher/releases/latest" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors"
        >
          <ExternalLink size={16} className="mr-2" />
          View on GitHub
        </a>
      </div>
    );
  }
  
  return (
    <>
      {downloadOptions.map((option, index) => (
        <DownloadCard
          key={index}
          title={option.title}
          description={option.description}
          icon={option.icon}
          link={option.link}
          size={option.size}
          colorClass={option.colorClass}
          downloadText={downloadText}
          index={index}
        />
      ))}
    </>
  );
}
