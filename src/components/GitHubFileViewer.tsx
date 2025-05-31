
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Folder, File, ChevronRight, ChevronDown, ChevronLeft, Code, Download, Copy, Check, ArrowUpDown, Calendar, AlignLeft } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useLanguage } from "./navbar/LanguageContext";

interface GitHubFile {
  name: string;
  path: string;
  type: "file" | "dir";
  size?: number;
  download_url?: string;
  sha?: string;
  created_at?: string;
  updated_at?: string;
}

interface GitHubFileViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubFileViewer = ({ isOpen, onClose }: GitHubFileViewerProps) => {
  const { translations } = useLanguage();
  // Ensure translations.githubFileViewer exists
  const githubFileViewerTranslations = translations?.githubFileViewer || {
    viewCode: "View Code",
    close: "Close",
    loading: "Loading...",
    noFiles: "No files found",
    sortBy: "Sort by",
    name: "Name",
    date: "Date",
    size: "Size",
    type: "Type",
    copy: "Copy",
    copied: "Copied!",
    download: "Download",
    viewOnGithub: "View on GitHub",
    back: "Back"
  };
  const [files, setFiles] = useState<GitHubFile[]>([]);
  const [currentPath, setCurrentPath] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);
  const [sortType, setSortType] = useState<"name" | "date" | "none">("none");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const repoUrl = "https://api.github.com/repos/Voxelum/x-minecraft-launcher/contents";

  useEffect(() => {
    if (isOpen) {
      fetchFiles("");
    }
  }, [isOpen]);

  const fetchFiles = async (path: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${repoUrl}${path ? `/${path}` : ""}`);
      const data = await response.json();
      const filesData = Array.isArray(data) ? data : [];
      
      // Fetch additional metadata for each file if needed
      const filesWithMetadata = await Promise.all(filesData.map(async (file) => {
        // For simplicity, we'll use the commit data to get the last updated date
        // In a real implementation, you might want to cache this data
        if (file.type === "file") {
          try {
            const commitResponse = await fetch(`https://api.github.com/repos/Voxelum/x-minecraft-launcher/commits?path=${file.path}&page=1&per_page=1`);
            const commitData = await commitResponse.json();
            if (commitData && commitData.length > 0) {
              return {
                ...file,
                updated_at: commitData[0].commit.committer.date
              };
            }
          } catch (err) {
            console.error("Error fetching commit data:", err);
          }
        }
        return file;
      }));
      
      setFiles(sortFiles(filesWithMetadata, sortType, sortOrder));
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
        setFileContent("Error loading file content");
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleFolder = (folderPath: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderPath)) {
      newExpanded.delete(folderPath);
    } else {
      newExpanded.add(folderPath);
    }
    setExpandedFolders(newExpanded);
  };

  const sortFiles = (filesToSort: GitHubFile[], type: "name" | "date" | "none", order: "asc" | "desc") => {
    if (type === "none") {
      // Default sorting: directories first, then files alphabetically
      return [...filesToSort].sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === "dir" ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      });
    }
    
    return [...filesToSort].sort((a, b) => {
      // Always keep directories at the top
      if (a.type !== b.type) {
        return a.type === "dir" ? -1 : 1;
      }
      
      if (type === "name") {
        const result = a.name.localeCompare(b.name);
        return order === "asc" ? result : -result;
      } else if (type === "date" && a.updated_at && b.updated_at) {
        const dateA = new Date(a.updated_at).getTime();
        const dateB = new Date(b.updated_at).getTime();
        const result = dateA - dateB;
        return order === "asc" ? result : -result;
      }
      
      return 0;
    });
  };
  
  const handleSort = (type: "name" | "date") => {
    if (sortType === type) {
      // Toggle order if same type is selected
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set new type and default to ascending
      setSortType(type);
      setSortOrder("asc");
    }
    
    // Re-sort the files
    setFiles(sortFiles(files, type, sortOrder === "asc" ? "desc" : "asc"));
  };
  
  const getFileIcon = (file: GitHubFile) => {
    if (file.type === "dir") {
      return expandedFolders.has(file.path) ? <ChevronDown size={16} /> : <ChevronRight size={16} />;
    }
    return <File size={16} />;
  };

  const getFileExtension = (filename: string) => {
    return filename.split('.').pop()?.toLowerCase() || '';
  };

  const getLanguageFromExtension = (ext: string) => {
    const langMap: { [key: string]: string } = {
      'js': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'jsx': 'javascript',
      'py': 'python',
      'java': 'java',
      'json': 'json',
      'md': 'markdown',
      'html': 'html',
      'css': 'css',
      'scss': 'scss',
      'yml': 'yaml',
      'yaml': 'yaml',
      'vue': 'vue',
      'php': 'php',
      'rb': 'ruby',
      'go': 'go',
      'rs': 'rust',
      'cpp': 'cpp',
      'c': 'c',
      'sh': 'bash',
      'xml': 'xml'
    };
    return langMap[ext] || 'text';
  };

  const formatCode = (content: string, extension: string) => {
    if (extension === 'md') {
      return content; // Keep markdown as is for now
    }
    
    // Add basic syntax highlighting classes for different languages
    const lines = content.split('\n');
    const language = getLanguageFromExtension(extension);
    
    return lines.map((line, index) => {
      // Basic syntax highlighting
      let formattedLine = line;
      
      // Apply syntax highlighting based on language
      if (language === 'javascript' || language === 'typescript') {
        // Keywords
        formattedLine = formattedLine.replace(
          /\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|try|catch|throw)\b/g, 
          '<span class="text-purple-400">$1</span>'
        );
        // Strings
        formattedLine = formattedLine.replace(
          /(["'])(.*?)\1/g, 
          '<span class="text-green-400">$1$2$1</span>'
        );
        // Comments
        formattedLine = formattedLine.replace(
          /(\/\/.*$)/g, 
          '<span class="text-slate-500">$1</span>'
        );
      } else if (language === 'html' || language === 'xml') {
        // Tags
        formattedLine = formattedLine.replace(
          /(&lt;\/?)(\w+)(.*?)(&gt;)/g, 
          '$1<span class="text-orange-400">$2</span>$3$4'
        );
        // Attributes
        formattedLine = formattedLine.replace(
          /(\s+)(\w+)(=)(["'])(.*?)\4/g, 
          '$1<span class="text-yellow-400">$2</span>$3$4<span class="text-green-400">$5</span>$4'
        );
      } else if (language === 'css' || language === 'scss') {
        // Properties
        formattedLine = formattedLine.replace(
          /(\s+)([-\w]+)(:)/g, 
          '$1<span class="text-blue-400">$2</span>$3'
        );
        // Values
        formattedLine = formattedLine.replace(
          /(:)(\s+)([^;]+)(;?)/g, 
          '$1$2<span class="text-green-400">$3</span>$4'
        );
      }
      
      return (
        <div key={index} className="flex hover:bg-slate-800/50 transition-colors">
          <span className="select-none text-slate-500 text-right pr-4 w-12 text-sm border-r border-slate-700 mr-4">
            {index + 1}
          </span>
          <span 
            className="text-slate-200 font-mono text-sm flex-1 overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: formattedLine || ' ' }}
          />
        </div>
      );
    });
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
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  // Ensure the component is properly initialized
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl border border-slate-700 w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Enhanced Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700 bg-gradient-to-r from-slate-800/50 to-slate-700/50">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl border border-cyan-500/30">
                  <Code className="text-cyan-400" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">X Minecraft Launcher</h2>
                  <p className="text-slate-400">Voxelum/x-minecraft-launcher</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open("https://github.com/Voxelum/x-minecraft-launcher", "_blank")}
                  className="bg-slate-700 border-slate-600 hover:bg-slate-600 text-white"
                >
                  <ExternalLink size={16} className="mr-2" />
                  {githubFileViewerTranslations.openOnGitHub || "Open on GitHub"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-slate-400 hover:text-white hover:bg-slate-700"
                >
                  <X size={20} />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 overflow-hidden">
              {/* Enhanced File Explorer */}
              <div className="w-1/3 border-r border-slate-700 bg-slate-800/30 overflow-y-auto">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-800/50 p-3 rounded-lg flex-1">
                      <Folder size={16} />
                      <span>/{currentPath || "root"}</span>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="ml-2 bg-slate-700 border-slate-600 hover:bg-slate-600 text-white">
                          <ArrowUpDown size={14} className="mr-2" />
                          {sortType === "name" ? githubFileViewerTranslations.name || "Name" : sortType === "date" ? githubFileViewerTranslations.date || "Date" : githubFileViewerTranslations.sort || "Sort"}
                          {sortType !== "none" && (sortOrder === "asc" ? " ↑" : " ↓")}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                        <DropdownMenuItem 
                          onClick={() => handleSort("name")} 
                          className={`flex items-center ${sortType === "name" ? "text-cyan-400" : "text-slate-300"}`}
                        >
                          <AlignLeft size={14} className="mr-2" />
                          {githubFileViewerTranslations.name || "Name"} {sortType === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleSort("date")} 
                          className={`flex items-center ${sortType === "date" ? "text-cyan-400" : "text-slate-300"}`}
                        >
                          <Calendar size={14} className="mr-2" />
                          {githubFileViewerTranslations.date || "Date"} {sortType === "date" && (sortOrder === "asc" ? "↑" : "↓")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto"></div>
                      <p className="text-slate-400 mt-2">Loading...</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {currentPath && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            const parentPath = currentPath.split('/').slice(0, -1).join('/');
                            fetchFiles(parentPath);
                          }}
                          className="flex items-center gap-2 w-full text-left p-2 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                        >
                          <ChevronLeft size={16} />
                          <span>..</span>
                        </motion.button>
                      )}
                      
                      {files.map((file) => (
                        <motion.button
                          key={file.path}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            if (file.type === "dir") {
                              fetchFiles(file.path);
                              toggleFolder(file.path);
                            } else {
                              fetchFileContent(file);
                            }
                          }}
                          className={`flex items-center gap-2 w-full text-left p-3 rounded-lg transition-all duration-200 ${
                            selectedFile === file.path 
                              ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg" 
                              : "text-slate-300 hover:bg-slate-700 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-1">
                            {file.type === "dir" ? (
                              <Folder size={16} className="text-blue-400" />
                            ) : (
                              <File size={16} className="text-slate-400" />
                            )}
                          </div>
                          <span className="truncate flex-1">{file.name}</span>
                          {file.size && (
                            <span className="text-xs text-slate-500">
                              {formatFileSize(file.size)}
                            </span>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Enhanced File Content */}
              <div className="flex-1 bg-slate-900 overflow-hidden">
                {selectedFile ? (
                  <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800/30">
                      <div className="flex items-center gap-3">
                        <File size={20} className="text-cyan-400" />
                        <span className="text-white font-medium">{selectedFile}</span>
                        <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-full">
                          {getLanguageFromExtension(getFileExtension(selectedFile))}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={copyToClipboard}
                          className="bg-slate-700 border-slate-600 hover:bg-slate-600 text-white"
                        >
                          {copied ? <Check size={14} className="mr-2" /> : <Copy size={14} className="mr-2" />}
                          {copied ? githubFileViewerTranslations.copied || 'Copied!' : githubFileViewerTranslations.copy || 'Copy'}
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
                          className="bg-slate-700 border-slate-600 hover:bg-slate-600 text-white"
                        >
                          <Download size={14} className="mr-2" />
                          {githubFileViewerTranslations.downloadFile || 'Download'}
                        </Button>
                      </div>
                    </div>
                    <div className="flex-1 overflow-auto bg-slate-950">
                      <div className="p-6">
                        {loading ? (
                          <div className="text-center py-8">
                            <div className="animate-spin w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto"></div>
                            <p className="text-slate-400 mt-2">{githubFileViewerTranslations.loadingContent || "Loading file content..."}</p>
                          </div>
                        ) : (
                          <div className="font-mono text-sm leading-relaxed">
                            {formatCode(fileContent, getFileExtension(selectedFile))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-3xl border border-cyan-500/20 mb-6">
                        <Code size={64} className="text-cyan-400 mx-auto" />
                      </div>
                      <p className="text-slate-300 text-xl font-semibold mb-2">{githubFileViewerTranslations.selectFileToView || "Select a file to view its content"}</p>
                      <p className="text-slate-500">{githubFileViewerTranslations.browseFiles || "Browse the repository files on the left panel"}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
