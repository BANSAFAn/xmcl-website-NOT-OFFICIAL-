
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Card } from './ui/card';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay: number;
  image?: string;
  reverse?: boolean;
  links?: Array<{ name: string; url: string; color: string }>;
}

export const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  delay, 
  image, 
  reverse, 
  links 
}: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: delay / 1000, ease: "easeOut" }}
      className={`flex flex-col lg:flex-row items-center gap-16 ${reverse ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* Content */}
      <div className="flex-1 space-y-8">
        <Card className="group p-8 bg-card/80 backdrop-blur-xl border border-border hover:border-primary/20 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-start gap-6 mb-6">
              <div className="p-4 bg-primary/10 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            </div>

            {links && (
              <div className="flex flex-wrap gap-3 pt-6 border-t border-border/20">
                {links.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (delay + index * 100) / 1000 }}
                    className={`inline-flex items-center px-4 py-2 bg-secondary/10 border border-secondary/20 text-secondary-foreground rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-md ${link.color}`}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Image */}
      {image && (
        <motion.div 
          className="flex-1"
          initial={{ opacity: 0, scale: 0.8, rotateY: reverse ? -15 : 15 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: (delay + 200) / 1000, ease: "easeOut" }}
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-2xl transform group-hover:scale-105 transition-transform duration-500 opacity-50"></div>
            <img
              src={image}
              alt={title}
              className="relative w-full rounded-2xl shadow-xl border border-border/20 group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
