import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface FeatureLink {
  name: string;
  url: string;
  color: string;
}

interface FeatureCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  image?: string;
  links?: FeatureLink[];
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  image,
  links,
  index
}) => {
  return (
    <Card className="group p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] relative overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      
      <div className="relative z-10">
        <div className="flex items-start gap-6 mb-6">
          <motion.div 
            className="p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </motion.div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              {title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {links && (
          <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
            {links.map((link, linkIndex) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-4 py-2 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg ${link.color}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -2 }}
                transition={{ delay: linkIndex * 0.1 }}
              >
                {link.name}
                <ExternalLink className="w-4 h-4 ml-2" />
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export { FeatureCard };