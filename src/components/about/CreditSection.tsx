
import { motion } from "framer-motion";
import { Users, Github } from "lucide-react";

export function CreditSection() {
  const contributors = [
    {
      name: "BANER",
      github: "BANSAFAn", 
      contribution: "who helps me a lot on the RU/UK community."
    },
    {
      name: "GodLeaveMe",
      github: "GodLeaveMe",
      contribution: "maintaining the AUR package registry."
    },
    {
      name: "v1mkss", 
      github: "v1mkss",
      contribution: "maintaining the AUR package registry."
    },
    {
      name: "0xc0000142",
      github: "0xc0000142", 
      contribution: "maintaining the winget."
    },
    {
      name: "Marmur2020",
      github: "Marmur2020",
      contribution: "completely translated a Ukrainian language!"
    },
    {
      name: "vanja-san",
      github: "vanja-san",
      contribution: "provided Russian language!"
    },
    {
      name: "lukechu10",
      github: "lukechu10", 
      contribution: "helps me on Launcher core."
    },
    {
      name: "HoldYourWaffle",
      github: "HoldYourWaffle",
      contribution: "helps me on Launcher core."
    },
    {
      name: "laolarou726",
      github: "laolarou726",
      contribution: "who helps a lot on launcher design."
    }
  ];

  return (
    <motion.section
      className="bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <motion.h2 
        className="text-3xl font-bold text-white mb-8 flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Users className="mr-3 text-green-400" size={28} />
        Credit
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contributors.map((contributor, index) => (
          <motion.div
            key={contributor.name}
            className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <a
                href={`https://github.com/${contributor.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-semibold"
              >
                <Github size={16} />
                {contributor.name}
              </a>
            </div>
            <p className="text-white/70 text-sm">
              {contributor.contribution}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
