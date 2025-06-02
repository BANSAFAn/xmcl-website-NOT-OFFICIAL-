
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from '@/i18n/context';
import { X, ExternalLink, Folder, File, ChevronRight, ChevronDown, ChevronLeft, Code, Download, Copy, Check, GitCommit, User, Calendar, Search, FolderOpen, Monitor } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";

interface GitHubFile {
  name: string;
  path: string;
  type: "file" | "dir";
  size?: number;
  download_url?: string;
  sha?: string;
}

interface GitHubCommit {
  sha: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
  };
  author: {
    login: string;
    avatar_url: string;
  } | null;
}

interface FileCommitInfo {
  lastCommit?: GitHubCommit;
  totalCommits: number;
}

interface GitHubFileViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GitHubFileViewer({ isOpen, onClose }: GitHubFileViewerProps) {
  const [files, setFiles] = useState<GitHubFile[]>([]);
  const [currentPath, setCurrentPath] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const repoUrl = "https://api.github.com/repos/Voxelum/x-minecraft-launcher/contents";

  useEffect(() => {
    if (isOpen) {
      fetchFiles("");
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const fetchFiles = async (path: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${repoUrl}${path ? `/${path}` : ""}`);
      const data = await response.json();
      const filesData = Array.isArray(data) ? data : [];
      setFiles(filesData);
      setCurrentPath(path);
    } catch (error) {
      console.error("Error fetching files:", error);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchFileContent = async (file: GitHubFile) => {
    if (file.type === "file" && file.download_url) {
      setLoading(true);
      try {
        const response = await fetch(file.download_url);
        const content = await response.text();
        setFileContent(content);
        setSelectedFile(file.path);
      } catch (error) {
        console.error("Error fetching file content:", error);
        setFileContent("Ошибка загрузки файла");
      } finally {
        setLoading(false);
      }
    }
  };

  const getFileIcon = (file: GitHubFile) => {
    if (file.type === "dir") {
      return <FolderOpen size={18} className="text-amber-400" />;
    }
    
    const ext = file.name.split('.').pop()?.toLowerCase();
    const iconColor = {
      'js': 'text-yellow-400',
      'ts': 'text-blue-400',
      'tsx': 'text-blue-400',
      'jsx': 'text-cyan-400',
      'json': 'text-green-400',
      'md': 'text-gray-300',
      'css': 'text-pink-400',
      'scss': 'text-pink-400',
      'html': 'text-orange-400',
      'vue': 'text-green-500',
      'py': 'text-yellow-500',
      'java': 'text-red-400',
    }[ext] || 'text-gray-400';
    
    return <File size={16} className={iconColor} />;
  };

  const formatCode = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, index) => (
      <div key={index} className="flex hover:bg-slate-700/30 transition-colors group">
        <span className="select-none text-slate-500 text-right pr-4 w-12 text-sm leading-6 group-hover:text-slate-400">
          {index + 1}
        </span>
        <span className="text-slate-200 font-mono text-sm leading-6 min-w-0 flex-1 whitespace-pre-wrap">{line || ' '}</span>
      </div>
    ));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fileContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    const { t } = useI18n();
    const sizes = [
      t.common.fileSize.bytes,
      t.common.fileSize.kb,
      t.common.fileSize.mb,
      t.common.fileSize.gb
    ];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - максимальный z-index */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm"
            style={{ zIndex: 2147483646 }}
            onClick={onClose}
          />
          
          {/* Main Modal - максимальный z-index */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 2147483647 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl border border-slate-600/50 w-full max-w-7xl h-[85vh] flex flex-col overflow-hidden shadow-2xl shadow-black/50">
              
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-700/50 bg-gradient-to-r from-slate-800/80 to-slate-700/80">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="p-3 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-2xl border border-emerald-500/30"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Monitor className="text-emerald-400" size={24} />
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                      GitHub Repository
                    </h2>
                    <p className="text-slate-400 text-sm">Voxelum/x-minecraft-launcher</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open("https://github.com/Voxelum/x-minecraft-launcher", "_blank")}
                    className="bg-slate-700/50 border-slate-600/50 hover:bg-slate-600/50 text-white backdrop-blur-sm"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Открыть на GitHub
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl"
                  >
                    <X size={20} />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 overflow-hidden">
                
                {/* File Explorer */}
                <div className="w-2/5 border-r border-slate-700/50 bg-slate-800/30 flex flex-col">
                  
                  {/* Explorer Header */}
                  <div className="p-4 border-b border-slate-700/50 space-y-4">
                    <div className="flex items-center gap-2 text-sm text-slate-300 bg-slate-800/50 p-3 rounded-xl">
                      <Folder size={16} className="text-amber-400" />
                      <span className="font-medium">/{currentPath || "root"}</span>
                    </div>
                    
                    {/* Search */}
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Поиск файлов..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                      />
                    </div>
                  </div>
                  
                  {/* File List */}
                  <ScrollArea className="flex-1">
                    <div className="p-4 space-y-2">
                      {loading ? (
                        <div className="flex items-center justify-center py-12">
                          <div className="animate-spin w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full"></div>
                        </div>
                      ) : (
                        <>
                          {currentPath && (
                            <motion.button
                              whileHover={{ scale: 1.02, x: 4 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => {
                                const parentPath = currentPath.split('/').slice(0, -1).join('/');
                                fetchFiles(parentPath);
                              }}
                              className="flex items-center gap-3 w-full text-left p-3 rounded-xl text-slate-400 hover:bg-slate-700/30 hover:text-white transition-all duration-200"
                            >
                              <ChevronLeft size={16} />
                              <span className="font-medium">..</span>
                            </motion.button>
                          )}
                          
                          {filteredFiles.map((file) => (
                            <motion.button
                              key={file.path}
                              whileHover={{ scale: 1.01, x: 4 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => {
                                if (file.type === "dir") {
                                  fetchFiles(file.path);
                                } else {
                                  fetchFileContent(file);
                                }
                              }}
                              className={`flex items-center gap-3 w-full text-left p-3 rounded-xl transition-all duration-200 group ${
                                selectedFile === file.path 
                                  ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 shadow-lg" 
                                  : "text-slate-300 hover:bg-slate-700/30 hover:text-white"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {getFileIcon(file)}
                                <span className="font-medium truncate">{file.name}</span>
                              </div>
                              {file.size && (
                                <span className="text-xs text-slate-500 ml-auto whitespace-nowrap">
                                  {formatFileSize(file.size)}
                                </span>
                              )}
                            </motion.button>
                          ))}
                          
                          {filteredFiles.length === 0 && !loading && (
                            <div className="text-center py-8">
                              <File size={32} className="text-slate-600 mx-auto mb-2" />
                              <p className="text-slate-500">Файлы не найдены</p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </ScrollArea>
                </div>

                {/* File Content */}
                <div className="flex-1 bg-slate-900/50 flex flex-col">
                  {selectedFile ? (
                    <>
                      {/* Content Header */}
                      <div className="flex items-center justify-between p-4 border-b border-slate-700/50 bg-slate-800/30">
                        <div className="flex items-center gap-3">
                          <File size={20} className="text-cyan-400" />
                          <span className="text-white font-medium truncate">{selectedFile.split('/').pop()}</span>
                          <Badge variant="secondary" className="bg-slate-700/50 text-slate-300 text-xs">
                            {selectedFile.split('.').pop()?.toUpperCase() || 'FILE'}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={copyToClipboard}
                            className="bg-slate-700/50 border-slate-600/50 hover:bg-slate-600/50 text-white"
                          >
                            {copied ? <Check size={14} className="mr-2" /> : <Copy size={14} className="mr-2" />}
                            {copied ? 'Скопировано!' : 'Копировать'}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const file = files.find(f => f.path === selectedFile);
                              if (file?.download_url) {
                                window.open(file.download_url, '_blank');
                              }
                            }}
                            className="bg-slate-700/50 border-slate-600/50 hover:bg-slate-600/50 text-white"
                          >
                            <Download size={14} className="mr-2" />
                            Скачать
                          </Button>
                        </div>
                      </div>
                      
                      {/* File Content Area */}
                      <ScrollArea className="flex-1">
                        <div className="p-6">
                          {loading ? (
                            <div className="flex items-center justify-center py-12">
                              <div className="animate-spin w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full"></div>
                              <p className="text-slate-400 ml-3">Загрузка содержимого...</p>
                            </div>
                          ) : (
                            <div className="bg-slate-800/30 rounded-xl border border-slate-700/50 overflow-hidden">
                              <div className="max-h-[60vh] overflow-auto custom-scrollbar">
                                <div className="p-4 font-mono text-sm leading-relaxed">
                                  {formatCode(fileContent)}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                    </>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="p-8 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-3xl border border-cyan-500/20">
                          <Code size={64} className="text-cyan-400 mx-auto" />
                        </div>
                        <div>
                          <p className="text-slate-300 text-xl font-semibold mb-2">Выберите файл для просмотра</p>
                          <p className="text-slate-500">Используйте панель слева для навигации по репозиторию</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Success notification */}
              <AnimatePresence>
                {copied && (
                  <motion.div
                    className="absolute top-6 right-6 bg-gradient-to-r from-green-500/90 to-emerald-500/90 border border-green-400/50 text-white px-6 py-3 rounded-xl shadow-xl backdrop-blur-md"
                    initial={{ opacity: 0, x: 100, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 100, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      <span className="font-medium">Код скопирован!</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
