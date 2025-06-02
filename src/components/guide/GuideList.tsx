
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Clock, ArrowRight } from "lucide-react";
import * as Icons from "lucide-react";

interface GuideData {
  slug: string;
  title: string;
  description: string;
  category: string;
  order: number;
  icon: string;
  path: string;
  lastUpdated: string;
}

interface GuideListProps {
  onSelectGuide: (guide: GuideData) => void;
}

export function GuideList({ onSelectGuide }: GuideListProps) {
  const [guides, setGuides] = useState<GuideData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await fetch("/guides.json");
        const data = await response.json();
        setGuides(data.sort((a: GuideData, b: GuideData) => a.order - b.order));
      } catch (error) {
        console.error("Failed to fetch guides:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  const categories = ["All", ...Array.from(new Set(guides.map(guide => guide.category)))];

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent className="w-6 h-6" /> : <Icons.FileText className="w-6 h-6" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading guides...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
          <input
            type="text"
            placeholder="Search guides..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-accent text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuides.map((guide, index) => (
          <motion.div
            key={guide.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => onSelectGuide(guide)}
            className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl rounded-xl p-6 border border-white/20 shadow-lg hover:shadow-xl hover:border-accent/30 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-accent/20 rounded-lg text-accent group-hover:bg-accent/30 transition-colors">
                {getIcon(guide.icon)}
              </div>
              <div className="flex-1">
                <span className="inline-block px-2 py-1 bg-white/10 text-white/80 text-xs rounded-full mb-2">
                  {guide.category}
                </span>
                <h3 className="font-semibold text-white group-hover:text-accent transition-colors">
                  {guide.title}
                </h3>
              </div>
            </div>

            <p className="text-white/70 text-sm mb-4 leading-relaxed">
              {guide.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-white/60 text-xs">
                <Clock className="w-3 h-3" />
                {new Date(guide.lastUpdated).toLocaleDateString()}
              </div>
              <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </div>
          </motion.div>
        ))}
      </div>

      {filteredGuides.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/60">No guides found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
