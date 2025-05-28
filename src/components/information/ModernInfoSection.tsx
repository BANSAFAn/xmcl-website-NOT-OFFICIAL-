
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { informationTranslations, LanguageKey } from "./translations";
import { ExternalLink, FolderOpen, File, ChevronDown, ChevronRight, Github, X } from "lucide-react";
import { useState, useEffect } from "react";
import { CodeBlock } from "@/components/markdown/CodeBlock";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";

// Интерфейсы для GitHub API
interface GitHubFileItem {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string | null;
  type: "file" | "dir";
  _links: {
    self: string;
    git: string;
    html: string;
  };
}

interface GitHubFileContent {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: "file";
  content: string;
  encoding: string;
  _links: {
    self: string;
    git: string;
    html: string;
  };
}

// Компонент для отображения файла репозитория
function RepoFile({ file, onSelect }: { file: GitHubFileItem; onSelect: (file: GitHubFileItem) => void }) {
  return (
    <div 
      className="flex items-center gap-2 p-2 hover:bg-gray-800/50 rounded cursor-pointer"
      onClick={() => onSelect(file)}
    >
      <File className="h-4 w-4 text-blue-400" />
      <span className="text-sm">{file.name}</span>
    </div>
  );
}

// Компонент для отображения директории репозитория
function RepoDirectory({ 
  directory, 
  onSelect, 
  fetchContents 
}: { 
  directory: GitHubFileItem; 
  onSelect: (file: GitHubFileItem) => void;
  fetchContents: (path: string) => Promise<GitHubFileItem[]>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [contents, setContents] = useState<GitHubFileItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleDirectory = async () => {
    if (!isOpen && contents.length === 0) {
      setIsLoading(true);
      setError(null);
      try {
        const items = await fetchContents(directory.path);
        setContents(items);
      } catch (err) {
        setError("Failed to load directory contents");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div 
        className="flex items-center gap-2 p-2 hover:bg-gray-800/50 rounded cursor-pointer"
        onClick={toggleDirectory}
      >
        {isOpen ? 
          <ChevronDown className="h-4 w-4 text-gray-400" /> : 
          <ChevronRight className="h-4 w-4 text-gray-400" />
        }
        <FolderOpen className="h-4 w-4 text-yellow-400" />
        <span className="text-sm">{directory.name}</span>
      </div>
      
      <Collapsible open={isOpen}>
        <CollapsibleContent>
          <div className="ml-6 border-l border-gray-700 pl-2">
            {isLoading && (
              <div className="p-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-3/4 mt-2" />
              </div>
            )}
            
            {error && (
              <div className="p-2 text-sm text-red-400">{error}</div>
            )}
            
            {!isLoading && !error && contents.map(item => (
              <div key={item.path}>
                {item.type === "dir" ? (
                  <RepoDirectory 
                    directory={item} 
                    onSelect={onSelect} 
                    fetchContents={fetchContents} 
                  />
                ) : (
                  <RepoFile file={item} onSelect={onSelect} />
                )}
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

// Компонент для отображения содержимого файла
function FileViewer({ file, content, isLoading, error }: { 
  file: GitHubFileItem | null; 
  content: string | null;
  isLoading: boolean;
  error: string | null;
}) {
  if (!file) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">Select a file to view its contents</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <File className="h-4 w-4 text-blue-400" />
          <span className="font-medium">{file.name}</span>
        </div>
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full mt-2" />
        <Skeleton className="h-6 w-full mt-2" />
        <Skeleton className="h-6 w-3/4 mt-2" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <File className="h-4 w-4 text-blue-400" />
          <span className="font-medium">{file.name}</span>
        </div>
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  // Определение языка на основе расширения файла
  const getLanguage = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const languageMap: Record<string, string> = {
      'js': 'javascript',
      'jsx': 'jsx',
      'ts': 'typescript',
      'tsx': 'tsx',
      'html': 'html',
      'css': 'css',
      'json': 'json',
      'md': 'markdown',
      'py': 'python',
      'java': 'java',
      'c': 'c',
      'cpp': 'cpp',
      'cs': 'csharp',
      'go': 'go',
      'rs': 'rust',
      'sh': 'bash',
      'yml': 'yaml',
      'yaml': 'yaml',
      'xml': 'xml',
      'svg': 'svg',
      'sql': 'sql',
      'rb': 'ruby',
      'php': 'php',
      'kt': 'kotlin',
      'swift': 'swift',
      'dart': 'dart',
    };
    return ext ? (languageMap[ext] || 'text') : 'text';
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <File className="h-4 w-4 text-blue-400" />
        <span className="font-medium">{file.name}</span>
      </div>
      {content && (
        <CodeBlock language={getLanguage(file.name)} showLineNumbers={true}>
          {content}
        </CodeBlock>
      )}
    </div>
  );
}

// Компонент для просмотра репозитория
function RepositoryViewer({ repoUrl }: { repoUrl: string }) {
  const [rootContents, setRootContents] = useState<GitHubFileItem[]>([]);
  const [isLoadingRoot, setIsLoadingRoot] = useState(true);
  const [rootError, setRootError] = useState<string | null>(null);
  
  const [selectedFile, setSelectedFile] = useState<GitHubFileItem | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [contentError, setContentError] = useState<string | null>(null);

  // Извлекаем owner и repo из URL
  const getRepoInfo = (url: string) => {
    // Поддерживаем форматы: https://github.com/owner/repo и github.com/owner/repo
    const regex = /github\.com\/([^\/]+)\/([^\/]+)/;
    const match = url.match(regex);
    if (match && match.length >= 3) {
      return { owner: match[1], repo: match[2] };
    }
    return null;
  };

  const repoInfo = getRepoInfo(repoUrl);

  // Функция для получения содержимого директории
  const fetchDirectoryContents = async (path: string = '') => {
    if (!repoInfo) throw new Error("Invalid repository URL");
    
    const { owner, repo } = repoInfo;
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch directory contents: ${response.statusText}`);
    }
    
    return await response.json();
  };

  // Функция для получения содержимого файла
  const fetchFileContent = async (file: GitHubFileItem) => {
    setSelectedFile(file);
    setIsLoadingContent(true);
    setContentError(null);
    setFileContent(null);
    
    try {
      if (!file.download_url) {
        throw new Error("No download URL available for this file");
      }
      
      const response = await fetch(file.download_url);
      if (!response.ok) {
        throw new Error(`Failed to fetch file content: ${response.statusText}`);
      }
      
      const content = await response.text();
      setFileContent(content);
    } catch (err) {
      console.error("Error fetching file content:", err);
      setContentError(err instanceof Error ? err.message : "Failed to load file content");
    } finally {
      setIsLoadingContent(false);
    }
  };

  // Загрузка корневого содержимого репозитория при монтировании
  useEffect(() => {
    const loadRootContents = async () => {
      if (!repoInfo) {
        setRootError("Invalid repository URL");
        setIsLoadingRoot(false);
        return;
      }
      
      try {
        const contents = await fetchDirectoryContents();
        setRootContents(contents);
      } catch (err) {
        console.error("Error loading repository contents:", err);
        setRootError(err instanceof Error ? err.message : "Failed to load repository contents");
      } finally {
        setIsLoadingRoot(false);
      }
    };
    
    loadRootContents();
  }, [repoUrl]);

  // Обработчик выбора файла
  const handleFileSelect = (file: GitHubFileItem) => {
    if (file.type === "file") {
      fetchFileContent(file);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 h-[600px] flex flex-col">
      <div className="flex items-center justify-between bg-gray-800 p-3">
        <div className="flex items-center gap-2">
          <Github className="h-5 w-5 text-white" />
          <span className="font-medium text-white">
            {repoInfo ? `${repoInfo.owner}/${repoInfo.repo}` : "Repository Viewer"}
          </span>
        </div>
        <a 
          href={repoUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
        >
          <ExternalLink className="h-4 w-4" />
          <span>Open on GitHub</span>
        </a>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Файловая структура */}
        <div className="w-1/3 border-r border-gray-800 overflow-y-auto bg-gray-900">
          {isLoadingRoot && (
            <div className="p-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full mt-2" />
              <Skeleton className="h-6 w-3/4 mt-2" />
            </div>
          )}
          
          {rootError && (
            <div className="p-4 text-red-400">{rootError}</div>
          )}
          
          {!isLoadingRoot && !rootError && rootContents.map(item => (
            <div key={item.path}>
              {item.type === "dir" ? (
                <RepoDirectory 
                  directory={item} 
                  onSelect={handleFileSelect} 
                  fetchContents={fetchDirectoryContents} 
                />
              ) : (
                <RepoFile file={item} onSelect={handleFileSelect} />
              )}
            </div>
          ))}
        </div>
        
        {/* Просмотр содержимого файла */}
        <div className="flex-1 overflow-y-auto bg-gray-950">
          <ScrollArea className="h-full">
            <FileViewer 
              file={selectedFile} 
              content={fileContent} 
              isLoading={isLoadingContent} 
              error={contentError} 
            />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

// Компонент для диалогового окна просмотра репозитория
function RepositoryViewerDialog({ repoUrl }: { repoUrl: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <FolderOpen className="h-4 w-4" />
          <span>View Repository Files</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl h-[80vh] p-0">
        <DialogHeader className="p-4 border-b border-gray-800">
          <DialogTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            <span>Repository File Viewer</span>
          </DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <div className="p-0 h-full">
          <RepositoryViewer repoUrl={repoUrl} />
        </div>
      </DialogContent>
    </Dialog>
  );
}


interface FeatureWithLinks {
  title: string;
  description: string;
  icon: string;
  image: string;
  links: { name: string; url: string; }[];
  link?: never;
}

interface FeatureWithSingleLink {
  title: string;
  description: string;
  icon: string;
  image: string;
  link: string;
  links?: never;
}

interface FeatureWithoutLinks {
  title: string;
  description: string;
  icon: string;
  image: string;
  link?: never;
  links?: never;
}

type Feature = FeatureWithLinks | FeatureWithSingleLink | FeatureWithoutLinks;

export function ModernInfoSection() {
  const { currentLanguage } = useLanguage();
  const text = informationTranslations[currentLanguage as LanguageKey] || informationTranslations.en;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // Features with proper 1920x1080 aspect ratio images and links
  const features: Feature[] = [
    {
      ...text.features[0], // Modern Interface
      image: "/XMCL/2.gif"
    },
    {
      ...text.features[1], // Mod Management with links
      image: "/XMCL/3.gif",
      links: [
        { name: "Minecraft Forge", url: "https://files.minecraftforge.net/" },
        { name: "Fabric", url: "https://fabricmc.net/" },
        { name: "Quilt", url: "https://quiltmc.org/" },
        { name: "NeoForge", url: "https://neoforged.net/" }
      ]
    },
    {
      ...text.features[2], // Cross Platform
      image: "/XMCL/2.gif"
    },
    {
      ...text.features[3], // Easy Installation
      image: "/XMCL/4.gif"
    },
    {
      ...text.features[4], // Open Source with GitHub link
      image: "/XMCL/5.gif",
      link: "https://github.com/voxelum/x-minecraft-launcher"
    }
  ];

  return (
    <motion.section 
      className="py-32 bg-gradient-to-b from-minecraft-dark-blue via-slate-900 to-black relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full filter blur-[120px] animate-pulse md:w-[500px] md:h-[500px]"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full filter blur-[150px] animate-pulse md:w-[700px] md:h-[700px]" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-full filter blur-[100px] md:w-[400px] md:h-[400px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-20"
          variants={itemVariants}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-blue-500/30 mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-blue-400 font-semibold">Features</span>
          </motion.div>
          
          <motion.h2 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              {text.title}
            </span>
          </motion.h2>
          
          <motion.div
            className="w-40 h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 mx-auto rounded-full mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          
          <motion.p 
            className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            {text.subtitle}
          </motion.p>
        </motion.div>

        {/* Redesigned Features Grid with 1920x1080 aspect ratio */}
        <motion.div 
          className="space-y-16 max-w-7xl mx-auto"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 md:gap-12 items-center group`}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              {/* Image Container - 16:9 aspect ratio */}
              <div className="flex-1 relative overflow-hidden rounded-3xl border border-white/20">
                <div className="aspect-video relative">
                  <motion.img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    initial={{ scale: 1.1, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Icon overlay */}
                  <motion.div 
                    className="absolute top-4 right-4 md:top-6 md:right-6 p-3 md:p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <span className="text-3xl md:text-4xl">{feature.icon}</span>
                  </motion.div>
                </div>
              </div>
              
              {/* Content Container */}
              <div className="flex-1 space-y-4 md:space-y-6">
                <motion.h3 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-500"
                  whileHover={{ scale: 1.05 }}
                >
                  {feature.title}
                </motion.h3>
                
                <p className="text-base md:text-xl text-white/80 leading-relaxed group-hover:text-white/95 transition-colors duration-500">
                  {feature.description}
                </p>

                {/* Links for features */}
                {feature.links && (
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {feature.links.map((link, linkIndex) => (
                      <motion.a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg border border-blue-500/30 text-blue-400 hover:text-white hover:bg-blue-500/30 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-sm md:font-semibold">{link.name}</span>
                        <ExternalLink size={14} className="md:w-4 md:h-4 w-3.5 h-3.5" />
                      </motion.a>
                    ))}
                  </div>
                )}

                {/* GitHub Repository Feature */}
                {feature.link && feature.link.includes('github.com') && (
                  <div className="flex flex-col gap-3 mt-4">
                    {/* Repository Viewer Dialog */}
                    <RepositoryViewerDialog repoUrl={feature.link} />
                    
                    {/* GitHub Link */}
                    <motion.a
                      href={feature.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 md:gap-2 px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl border border-green-500/30 text-green-400 hover:text-white hover:bg-green-500/30 transition-all duration-300 font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-sm md:text-base">View on GitHub</span>
                      <ExternalLink size={16} className="md:w-4.5 md:h-4.5 w-4 h-4" />
                    </motion.a>
                  </div>
                )}
                
                {/* Non-GitHub Single Link */}
                {feature.link && !feature.link.includes('github.com') && (
                  <motion.a
                    href={feature.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 md:gap-2 px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl border border-blue-500/30 text-blue-400 hover:text-white hover:bg-blue-500/30 transition-all duration-300 font-semibold mt-4"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-sm md:text-base">Learn More</span>
                    <ExternalLink size={16} className="md:w-4.5 md:h-4.5 w-4 h-4" />
                  </motion.a>
                )}

                {/* Animated progress bar */}
                <motion.div 
                  className="h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.15 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
