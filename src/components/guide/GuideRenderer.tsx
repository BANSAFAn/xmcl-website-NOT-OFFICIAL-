
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MarkdownRender } from "@/components/markdown/MarkdownRender";
import { ArrowLeft, Clock, User, Tag } from "lucide-react";

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

interface GuideRendererProps {
  guide: GuideData;
  onBack: () => void;
}

export function GuideRenderer({ guide, onBack }: GuideRendererProps) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuideContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(guide.path);
        if (!response.ok) {
          throw new Error(`Failed to fetch guide: ${response.statusText}`);
        }
        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load guide");
      } finally {
        setLoading(false);
      }
    };

    fetchGuideContent();
  }, [guide.path]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading guide...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="text-red-400 mb-4">Error loading guide</div>
        <p className="text-white/60 mb-6">{error}</p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Guides
        </button>

        <div className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
              {guide.category}
            </span>
            <div className="flex items-center gap-1 text-white/60 text-sm">
              <Clock className="w-4 h-4" />
              Updated {new Date(guide.lastUpdated).toLocaleDateString()}
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {guide.title}
          </h1>
          
          <p className="text-white/80 text-lg leading-relaxed">
            {guide.description}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
        <MarkdownRender content={content} />
      </div>
    </motion.div>
  );
}
