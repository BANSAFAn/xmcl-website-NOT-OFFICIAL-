
import { motion } from "framer-motion";
import { Heart, ExternalLink } from "lucide-react";

export function SponsorshipSection() {
  const sponsors = [
    {
      name: "SignPath.io",
      description: "Free code signing on Windows",
      logo: "https://github.com/DGP-Studio/Snap.Hutao/assets/10614984/73ae8b90-f3c7-4033-b2b7-f4126331ce66",
      url: "https://signpath.io/",
      foundation: "SignPath Foundation",
      foundationUrl: "https://signpath.org/"
    },
    {
      name: "Deno Deploy",
      description: "Hassle-free platform for serverless JavaScript applications",
      logo: "https://deno.com/images/deno_logo_4.gif",
      url: "https://deno.com/deploy",
      provider: "Deno",
      providerUrl: "https://deno.com/"
    }
  ];

  const afdianSponsors = [
    { name: "爱发电用户_9d663", amount: "￥390.00", url: "https://afdian.com/u/9d663ec6fb6711ec9ace52540025c377", avatar: "https://pic1.afdiancdn.com/default/avatar/avatar-purple.png?imageView2/1/", size: 100 },
    { name: "爱发电用户_19e29", amount: "￥300.00", url: "https://afdian.com/u/19e292c21a1d11ee929a52540025c377", avatar: "https://pic1.afdiancdn.com/default/avatar/avatar-purple.png?imageView2/1/", size: 100 },
    { name: "ahdg", amount: "￥180.00", url: "https://afdian.com/u/dd9058ce20df11eba5c052540025c377", avatar: "https://pic1.afdiancdn.com/user/dd9058ce20df11eba5c052540025c377/avatar/0c776e6de1b1027e951c6d94919eb781_w1280_h1024_s364.jpg", size: 70 },
    { name: "Kandk", amount: "￥30.00", url: "https://afdian.com/u/404b86a078e111ecab3652540025c377", avatar: "https://pic1.afdiancdn.com/user/404b86a078e111ecab3652540025c377/avatar/dfa3e35a696d8d8af5425dd400d68a8d_w607_h527_s432.png", size: 50 },
    { name: "白雨 楠", amount: "￥30.00", url: "https://afdian.com/u/7f6ad7161b3e11eb8d0e52540025c377", avatar: "https://pic1.afdiancdn.com/user/7f6ad7161b3e11eb8d0e52540025c377/avatar/1fa3b75648a15aea8da202c6108d659b_w1153_h1153_s319.jpeg", size: 50 }
  ];

  return (
    <motion.section
      className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 p-8 mb-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <motion.h2 
        className="text-4xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Heart className="text-red-400" size={32} />
        <span className="bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
          Sponsorship
        </span>
      </motion.h2>
      
      {/* Corporate Sponsors */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {sponsors.map((sponsor, index) => (
          <motion.div
            key={sponsor.name}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={sponsor.logo} 
                alt={sponsor.name}
                className="w-12 h-12 rounded-lg object-contain bg-white/10 p-2"
              />
              <div>
                <h3 className="text-lg font-bold text-white">{sponsor.name}</h3>
                <p className="text-white/70 text-sm">{sponsor.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <motion.a
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm hover:bg-blue-500/30 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {sponsor.name}
                <ExternalLink size={12} />
              </motion.a>
              {sponsor.foundation && (
                <motion.a
                  href={sponsor.foundationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-sm hover:bg-purple-500/30 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  {sponsor.foundation}
                  <ExternalLink size={12} />
                </motion.a>
              )}
              {sponsor.provider && (
                <motion.a
                  href={sponsor.providerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-300 rounded-lg text-sm hover:bg-green-500/30 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  {sponsor.provider}
                  <ExternalLink size={12} />
                </motion.a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* AFDIAN Sponsors */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Community Sponsors (AFDIAN)</h3>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {afdianSponsors.map((sponsor, index) => (
            <motion.a
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              title={`${sponsor.name}: ${sponsor.amount}`}
            >
              <img 
                src={sponsor.avatar}
                alt={sponsor.name}
                className="rounded-full border-2 border-white/20 group-hover:border-blue-400/50 transition-all duration-300"
                style={{ width: sponsor.size, height: sponsor.size }}
              />
              <motion.div
                className="absolute -bottom-2 -right-2 px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
              >
                {sponsor.amount}
              </motion.div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
