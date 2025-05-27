
import { motion } from "framer-motion";
import { Filter, Clock, Calendar, Star } from "lucide-react";
import { Release } from "./types";

interface VersionFilterProps {
  releases: Release[];
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export function VersionFilter({ releases, selectedFilter, onFilterChange }: VersionFilterProps) {
  const filters = [
    { id: 'all', label: 'All Versions', icon: Calendar },
    { id: 'latest', label: 'Latest', icon: Star },
    { id: 'newest', label: 'Newest 5', icon: Clock },
    { id: 'oldest', label: 'Oldest 5', icon: Clock }
  ];

  const getFilteredReleases = (filter: string) => {
    switch (filter) {
      case 'latest':
        return releases.slice(0, 1);
      case 'newest':
        return releases.slice(0, 5);
      case 'oldest':
        return releases.slice(-5).reverse();
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
      </motion.h3>
      
      <div className="flex flex-wrap gap-3">
        {filters.map((filter, index) => {
          const Icon = filter.icon;
          const count = getFilteredReleases(filter.id).length;
          
          return (
            <motion.button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`relative group px-6 py-3 rounded-xl border transition-all duration-300 flex items-center gap-3 ${
                selectedFilter === filter.id
                  ? 'bg-blue-500/20 border-blue-400/50 shadow-lg shadow-blue-500/20 text-blue-300'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white/80 hover:text-white'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon size={18} />
              <span className="font-medium">{filter.label}</span>
              {filter.id !== 'all' && (
                <span className="px-2 py-1 text-xs bg-white/10 rounded-full">
                  {count}
                </span>
              )}
              
              {/* Selection indicator */}
              {selectedFilter === filter.id && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl"
                  layoutId="filter-indicator"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
