import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, DownloadCloud, Calendar, Tag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkEmoji from "remark-emoji";
import rehypeHighlight from "rehype-highlight";

type ReleaseAsset = {
  name: string;
  browser_download_url: string;
  size: number;
};

type Release = {
  id: number;
  tag_name: string;
  name: string;
  published_at: string;
  body: string;
  html_url: string;
  assets: ReleaseAsset[];
};

// Function to fetch all releases from GitHub
const fetchReleases = async (): Promise<Release[]> => {
  const response = await fetch(
    "https://api.github.com/repos/Voxelum/x-minecraft-launcher/releases",
  );
  if (!response.ok) {
    throw new Error("Failed to fetch releases");
  }
  return response.json();
};

// Format date function
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Function to remove download section from release body
const cleanReleaseBody = (body: string): string => {
  // This pattern matches the Downloads section including all the platform downloads listed
  const downloadsPattern = /## Downloads[\s\S]*?(?=##|$)/;
  return body.replace(downloadsPattern, "");
};

// Matrix-style loading component
const MatrixLoading = () => {
  const characters = "01";
  const columnCount = 12;

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative h-64 w-64 mb-8">
        {/* Matrix digital rain effect */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: columnCount }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="absolute top-0"
              style={{ left: `${(100 / columnCount) * colIndex}%` }}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={`${colIndex}-${i}`}
                  initial={{
                    y: -100 * Math.random(),
                    opacity: 0,
                  }}
                  animate={{
                    y: [null, 300],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: colIndex * 0.1 + i * 0.1,
                  }}
                  className="text-lg sm:text-2xl font-mono text-accent/80"
                >
                  {characters.charAt(
                    Math.floor(Math.random() * characters.length),
                  )}
                </motion.div>
              ))}
            </div>
          ))}
        </div>

        {/* Circular spinner with glowing effect */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="relative w-24 h-24"
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "linear",
            }}
          >
            <div className="absolute inset-0 rounded-full border-2 border-t-accent border-l-accent/50 border-b-accent/30 border-r-transparent shadow-[0_0_15px_rgba(56,189,248,0.5)]"></div>

            {/* Orbital particles */}
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-accent rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                initial={{
                  rotate: i * 60,
                  translateX: 50,
                }}
                animate={{
                  rotate: [i * 60, i * 60 + 360],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  rotate: { repeat: Infinity, duration: 6, ease: "linear" },
                  scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                }}
                style={{
                  transformOrigin: "center center",
                }}
              />
            ))}

            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-500/20 flex items-center justify-center"
              animate={{
                boxShadow: [
                  "0 0 5px rgba(56,189,248,0.3), 0 0 10px rgba(56,189,248,0.2), inset 0 0 5px rgba(56,189,248,0.2)",
                  "0 0 10px rgba(56,189,248,0.5), 0 0 20px rgba(56,189,248,0.3), inset 0 0 10px rgba(56,189,248,0.3)",
                  "0 0 5px rgba(56,189,248,0.3), 0 0 10px rgba(56,189,248,0.2), inset 0 0 5px rgba(56,189,248,0.2)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <DownloadCloud size={32} className="text-accent" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="font-mono">
        <motion.span
          className="inline-block text-lg"
          animate={{ opacity: [0, 1] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          Loading data...
        </motion.span>
      </div>
    </div>
  );
};

const Changelogs = () => {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  // Initialize language based on localStorage and add listener for changes
  useEffect(() => {
    const updateLanguage = () => {
      const savedLang = localStorage.getItem("language") || "en";
      setCurrentLanguage(savedLang);
    };

    // Initial language set
    updateLanguage();

    // Listen for storage changes
    window.addEventListener("storage", updateLanguage);
    window.addEventListener("languageChange", updateLanguage);

    return () => {
      window.removeEventListener("storage", updateLanguage);
      window.removeEventListener("languageChange", updateLanguage);
    };
  }, []);

  // Translations
  const translations = {
    en: {
      title: "Changelogs",
      subtitle:
        "Stay up to date with the latest improvements and fixes to X Minecraft Launcher",
      version: "Version",
      released: "Released",
      viewOnGithub: "View on GitHub",
      loading: "Loading releases...",
      error: "Failed to load releases. Please try again later.",
    },
    ru: {
      title: "История изменений",
      subtitle:
        "Будьте в курсе последних улучшений и исправлений X Minecraft Launcher",
      version: "Версия",
      released: "Выпущено",
      viewOnGithub: "Посмотреть на GitHub",
      loading: "Загрузка релизов...",
      error: "Не удалось загрузить релизы. Пожалуйста, попробуйте позже.",
    },
    uk: {
      title: "Історія змін",
      subtitle:
        "Будьте в курсі останніх покращень та виправлень X Minecraft Launcher",
      version: "Версія",
      released: "Випущено",
      viewOnGithub: "Переглянути на GitHub",
      loading: "Завантаження релізів...",
      error: "Не вдалося завантажити релізи. Будь ласка, спробуйте пізніше.",
    },
  };

  // Current translation
  const text =
    translations[currentLanguage as keyof typeof translations] ||
    translations.en;

  // Fetch releases data
  const {
    data: releases,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["githubReleases"],
    queryFn: fetchReleases,
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
    refetchOnWindowFocus: false,
  });

  // Process releases to remove download section
  const processedReleases = releases?.map((release) => ({
    ...release,
    body: cleanReleaseBody(release.body),
  }));

  return (
    <div className="min-h-screen bg-minecraft-dark-blue">
      <Navbar />

      <div className="pt-32 pb-20 relative">
        {/* Background blurred lights */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-20 w-64 h-64 bg-blue-500/10 rounded-full filter blur-[80px] opacity-30"></div>
          <div className="absolute bottom-40 right-20 w-80 h-80 bg-purple-500/10 rounded-full filter blur-[100px] opacity-30"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient-cyan">{text.title}</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              {text.subtitle}
            </p>
          </motion.div>

          {isLoading ? (
            <MatrixLoading />
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-400 mb-4">{text.error}</p>
              <a
                href="https://github.com/Voxelum/x-minecraft-launcher/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors"
              >
                <ExternalLink size={16} className="mr-2" />
                {text.viewOnGithub}
              </a>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-14">
              {processedReleases?.map((release, index) => (
                <motion.div
                  key={release.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-8 rounded-xl relative overflow-hidden"
                >
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60"></div>

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div className="flex items-center">
                      <Tag className="text-accent mr-3" />
                      <h2 className="text-2xl md:text-3xl font-bold">
                        <span className="text-accent">{release.tag_name}</span>
                        {release.name && release.name !== release.tag_name && (
                          <span className="ml-2 text-white/90">
                            - {release.name}
                          </span>
                        )}
                      </h2>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="flex items-center text-white/60 text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{formatDate(release.published_at)}</span>
                      </div>

                      <a
                        href={release.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm px-3 py-1 bg-white/10 hover:bg-white/20 rounded-md transition-colors text-white/80"
                      >
                        <ExternalLink size={14} className="mr-1" />
                        {text.viewOnGithub}
                      </a>
                    </div>
                  </div>

                  {/* Release notes content with enhanced markdown support */}
                  <div className="prose prose-invert prose-sm max-w-none prose-headings:text-accent prose-a:text-accent hover:prose-a:text-accent/80 prose-a:transition-colors">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm, remarkEmoji]}
                      rehypePlugins={[rehypeRaw, rehypeHighlight]}
                      components={{
                        a: ({ node, ...props }) => (
                          <a
                            {...props}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-accent/80 transition-colors"
                          />
                        ),
                        img: ({ node, ...props }) => (
                          <img
                            {...props}
                            className="max-w-full h-auto rounded-md my-4 border border-white/10"
                            loading="lazy"
                          />
                        ),
                        code: ({
                          node,
                          inline,
                          className,
                          children,
                          ...props
                        }) => {
                          return inline ? (
                            <code
                              className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono"
                              {...props}
                            >
                              {children}
                            </code>
                          ) : (
                            <div className="bg-white/5 rounded-md overflow-hidden border border-white/10 my-4">
                              <div className="px-4 py-2 bg-white/10 border-b border-white/10 text-xs text-white/60 font-mono">
                                {className
                                  ? className.replace(/language-/, "")
                                  : "code"}
                              </div>
                              <pre className="p-4 overflow-x-auto text-sm">
                                <code {...props}>{children}</code>
                              </pre>
                            </div>
                          );
                        },
                        table: ({ node, ...props }) => (
                          <div className="overflow-x-auto my-6">
                            <table
                              className="border-collapse w-full"
                              {...props}
                            />
                          </div>
                        ),
                        th: ({ node, ...props }) => (
                          <th
                            className="border border-white/10 px-4 py-2 bg-white/5 text-left"
                            {...props}
                          />
                        ),
                        td: ({ node, ...props }) => (
                          <td
                            className="border border-white/10 px-4 py-2"
                            {...props}
                          />
                        ),
                        blockquote: ({ node, ...props }) => (
                          <blockquote
                            className="border-l-4 border-accent/60 pl-4 py-1 my-4 text-white/80 bg-white/5 rounded-r-md"
                            {...props}
                          />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul
                            className="list-disc pl-5 my-4 space-y-2"
                            {...props}
                          />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol
                            className="list-decimal pl-5 my-4 space-y-2"
                            {...props}
                          />
                        ),
                      }}
                    >
                      {release.body}
                    </ReactMarkdown>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Changelogs;
