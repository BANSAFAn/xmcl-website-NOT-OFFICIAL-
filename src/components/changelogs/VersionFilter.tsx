
import { motion } from "framer-motion";
import { Filter, Clock, Calendar, Star, ArrowUp, ArrowDown, List } from "lucide-react";
import { Release } from "./types";

interface VersionFilterProps {
  releases: Release[];
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export function VersionFilter({ releases, selectedFilter, onFilterChange }: VersionFilterProps) {
  const filters = [
    { id: 'all', label: 'All Versions', icon: List, description: 'Show all releases' },
    { id: 'latest', label: 'Latest', icon: Star, description: 'Most recent release' },
    { id: 'newest', label: 'Recent 10', icon: ArrowDown, description: 'Last 10 releases' },
    { id: 'oldest', label: 'First 10', icon: ArrowUp, description: 'First 10 releases' },
    { id: 'newest-25', label: 'Recent 25', icon: Clock, description: 'Last 25 releases' },
    { id: 'oldest-25', label: 'First 25', icon: Clock, description: 'First 25 releases' }
  ];

  const getFilteredReleases = (filter: string) => {
    switch (filter) {
      case 'latest':
        return releases.slice(0, 1);
      case 'newest':
        return releases.slice(0, 10);
      case 'newest-25':
        return releases.slice(0, 25);
      case 'oldest':
        return releases.slice(-10).reverse();
      case 'oldest-25':
        return releases.slice(-25).reverse();
      default:
        return releases;
    }
  };

  return (
    <div className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6 mb-8">
      <motion.h3 
        className="text-xl font-bold text-white mb-6 flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Filter className="mr-2 text-blue-400" size={20} />
        Version Filter
        <span className="ml-auto text-sm text-white/60 font-normal">
          Total: {releases.length} versions
        </span>
      </motion.h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {filters.map((filter, index) => {
          const Icon = filter.icon;
          const count = getFilteredReleases(filter.id).length;
          
          return (
            <motion.button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`relative group p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-2 min-h-[100px] ${
                selectedFilter === filter.id
                  ? 'bg-blue-500/20 border-blue-400/50 shadow-lg shadow-blue-500/20 text-blue-300'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white/80 hover:text-white'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Icon with animation */}
              <motion.div
                whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                transition={{ duration: 0.4 }}
              >
                <Icon size={20} />
              </motion.div>
              
              {/* Label */}
              <span className="font-medium text-sm text-center leading-tight">
                {filter.label}
              </span>
              
              {/* Count badge */}
              <div className="flex items-center gap-1">
                <span className="px-2 py-1 text-xs bg-white/10 rounded-full font-medium">
                  {count}
                </span>
              </div>
              
              {/* Description tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-slate-900/95 border border-white/20 rounded-lg text-xs text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                {filter.description}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
              </div>
              
              {/* Selection indicator */}
              {selectedFilter === filter.id && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl"
                  layoutId="filter-indicator"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          );
        })}
      </div>
      
      {/* Quick navigation */}
      <motion.div 
        className="mt-6 flex flex-wrap justify-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          onClick={() => onFilterChange('latest')}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border border-green-500/30 hover:border-green-500/50 rounded-lg transition-all duration-300 text-green-400 hover:text-green-300 text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowDown size={14} />
          Jump to Latest
        </motion.button>
        
        <motion.button
          onClick={() => onFilterChange('oldest')}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-violet-500/20 hover:from-purple-500/30 hover:to-violet-500/30 border border-purple-500/30 hover:border-purple-500/50 rounded-lg transition-all duration-300 text-purple-400 hover:text-purple-300 text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUp size={14} />
          Jump to First
        </motion.button>
      </motion.div>
    </div>
  );
}
