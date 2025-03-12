
import { motion } from "framer-motion";

interface TeamMemberProps {
  member: {
    name: string;
    role: string;
    avatar: string;
    socials: { icon: React.ReactNode; link: string; }[];
  };
  index: number;
}

export function TeamMember({ member, index }: TeamMemberProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-accent/40 transition-all duration-300"
    >
      <div className="flex flex-col items-center text-center">
        <motion.img
          src={member.avatar}
          alt={member.name}
          className="w-24 h-24 rounded-full mb-4 border-2 border-accent object-cover"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        />
        <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
        <p className="text-white/60 text-sm mb-4">{member.role}</p>
        
        <div className="flex gap-3">
          {member.socials.map((social, i) => (
            <motion.a
              key={i}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 text-white/80 hover:text-white transition-colors"
              whileHover={{ scale: 1.2, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
