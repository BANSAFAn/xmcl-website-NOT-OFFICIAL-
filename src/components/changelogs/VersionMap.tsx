
import { motion } from "framer-motion";
import { ChevronRight, Calendar, Package, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { Release } from "./types";
import { formatDate } from "./utils";
import { useState } from "react";
import { useLocation, useNavigate } from '@/hooks/useRouting';
import { useEffect } from 'react';

interface VersionMapProps {
  releases: Release[];
  selectedVersion: string | null;
  onVersionSelect: (version: string) => void;
}

export function VersionMap({ releases, selectedVersion, onVersionSelect }: VersionMapProps) {
  const [showAllVersions, setShowAllVersions] = useState(false);
  const displayedReleases = showAllVersions ? releases : releases.slice(0, 12);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hash = location.hash.slice(1);
    if (hash && releases.some(r => r.tag_name === hash)) {
      onVersionSelect(hash);
    }
  }, [location.hash, releases, onVersionSelect]);

  const handleVersionClick = (version: string) => {
    onVersionSelect(version);
    navigate({ hash: version });
  };

  return (
    <div className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6 mb-8">
      <motion.h3 
        className="text-xl font-bold text-white mb-6 flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Package className="mr-2 text-blue-400" size={20} />
        Version Map
      </motion.h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {displayedReleases.map((release, index) => (
          <motion.button
            key={release.id}
            onClick={() => handleVersionClick(release.tag_name)}
            className={`relative group p-4 rounded-xl border transition-all duration-300 text-left ${
              selectedVersion === release.tag_name
                ? 'bg-blue-500/20 border-blue-400/50 shadow-lg shadow-blue-500/20'
                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Version indicator */}
            <div className="flex items-center justify-between mb-2">
              <span className={`font-bold text-sm ${
                selectedVersion === release.tag_name ? 'text-blue-300' : 'text-white'
              }`}>
                {release.tag_name}
              </span>
              {release.prerelease && (
                <span className="px-2 py-1 text-xs bg-orange-500/20 text-orange-300 rounded-full border border-orange-500/30">
                  Pre
                </span>
              )}
            </div>
            
            {/* Date */}
            <div className="flex items-center text-xs text-white/60 mb-2">
              <Calendar size={12} className="mr-1" />
              {formatDate(release.published_at)}
            </div>
            
            {/* Release name (truncated) */}
            <div className="text-xs text-white/80 truncate">
              {release.name || release.tag_name}
            </div>
            
            {/* Selection indicator */}
            {selectedVersion === release.tag_name && (
              <motion.div
                className="absolute top-2 right-2"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                <ChevronRight className="text-blue-400" size={16} />
              </motion.div>
            )}
            
            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
        ))}
      </div>
      
      {/* Show more/less button */}
      {releases.length > 12 && (
        <motion.div 
          className="mt-6 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={() => setShowAllVersions(!showAllVersions)}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showAllVersions ? (
              <>
                <ChevronUp size={16} />
                <span>Show less</span>
              </>
            ) : (
              <>
                <ChevronDown size={16} />
                <span>Show all versions ({releases.length})</span>
              </>
            )}
          </motion.button>
        </motion.div>
      )}
      
      {/* Navigation hint */}
      <motion.div 
        className="mt-4 flex items-center justify-center text-white/50 text-sm cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={() => {
          if (releases.length > 0 && !selectedVersion) {
            onVersionSelect(releases[0].tag_name);
          }
        }}
      >
        <ArrowRight size={16} className="mr-2" />
        Click any version to view its changelog
      </motion.div>
    </div>
  );
}
