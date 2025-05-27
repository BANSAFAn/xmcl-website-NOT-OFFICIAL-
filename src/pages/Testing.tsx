
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/components/navbar/LanguageContext";
import { Monitor, Apple, Smartphone, CheckCircle, XCircle, Clock, ExternalLink, Download } from "lucide-react";

interface WorkflowRun {
  id: number;
  name: string;
  status: string;
  conclusion: string;
  head_branch: string;
  created_at: string;
  updated_at: string;
  html_url: string;
}

const Testing = () => {
  const { translations } = useLanguage();
  const [workflows, setWorkflows] = useState<WorkflowRun[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/Voxelum/x-minecraft-launcher/actions/runs?per_page=10');
        const data = await response.json();
        setWorkflows(data.workflow_runs || []);
      } catch (error) {
        console.error('Failed to fetch workflows:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkflows();
  }, []);

  const getStatusIcon = (status: string, conclusion: string) => {
    if (status === 'in_progress') return <Clock className="h-5 w-5 text-yellow-500 animate-spin" />;
    if (conclusion === 'success') return <CheckCircle className="h-5 w-5 text-green-500" />;
    return <XCircle className="h-5 w-5 text-red-500" />;
  };

  const getStatusColor = (status: string, conclusion: string) => {
    if (status === 'in_progress') return 'border-yellow-500/30 bg-yellow-500/5';
    if (conclusion === 'success') return 'border-green-500/30 bg-green-500/5';
    return 'border-red-500/30 bg-red-500/5';
  };

  // Format date with China timezone
  const formatDateTimeChina = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      timeZone: 'Asia/Shanghai',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const testingTranslations = {
    en: {
      title: "Testing & Development Builds",
      subtitle: "Latest builds and development status from GitHub Actions",
      latestBuilds: "Latest Builds",
      buildStatus: "Build Status", 
      branch: "Branch",
      updated: "Updated",
      downloadArtifacts: "Download Artifacts",
      viewOnGitHub: "View on GitHub",
      loading: "Loading latest builds...",
      noBuilds: "No builds available",
      chinaTime: "China Time"
    },
    ru: {
      title: "Тестирование и сборки разработки",
      subtitle: "Последние сборки и статус разработки из GitHub Actions",
      latestBuilds: "Последние сборки",
      buildStatus: "Статус сборки",
      branch: "Ветка", 
      updated: "Обновлено",
      downloadArtifacts: "Скачать артефакты",
      viewOnGitHub: "Посмотреть на GitHub",
      loading: "Загрузка последних сборок...",
      noBuilds: "Нет доступных сборок",
      chinaTime: "Время КНР"
    },
    uk: {
      title: "Тестування та збірки розробки",
      subtitle: "Останні збірки та статус розробки з GitHub Actions",
      latestBuilds: "Останні збірки",
      buildStatus: "Статус збірки",
      branch: "Гілка",
      updated: "Оновлено", 
      downloadArtifacts: "Завантажити артефакти",
      viewOnGitHub: "Переглянути на GitHub",
      loading: "Завантаження останніх збірок...",
      noBuilds: "Немає доступних збірок",
      chinaTime: "Час КНР"
    },
    zh: {
      title: "测试和开发版本",
      subtitle: "来自 GitHub Actions 的最新构建和开发状态",
      latestBuilds: "最新构建",
      buildStatus: "构建状态",
      branch: "分支",
      updated: "更新时间",
      downloadArtifacts: "下载构建产物",
      viewOnGitHub: "在 GitHub 上查看",
      loading: "正在加载最新构建...",
      noBuilds: "没有可用的构建",
      chinaTime: "中国时间"
    },
    de: {
      title: "Testing und Entwicklungs-Builds",
      subtitle: "Neueste Builds und Entwicklungsstatus von GitHub Actions",
      latestBuilds: "Neueste Builds",
      buildStatus: "Build-Status",
      branch: "Branch",
      updated: "Aktualisiert",
      downloadArtifacts: "Artefakte herunterladen",
      viewOnGitHub: "Auf GitHub ansehen",
      loading: "Lade neueste Builds...",
      noBuilds: "Keine Builds verfügbar",
      chinaTime: "China-Zeit"
    },
    ja: {
      title: "テストと開発ビルド",
      subtitle: "GitHub Actions からの最新ビルドと開発状況",
      latestBuilds: "最新ビルド",
      buildStatus: "ビルドステータス",
      branch: "ブランチ",
      updated: "更新日時",
      downloadArtifacts: "アーティファクトをダウンロード",
      viewOnGitHub: "GitHub で表示",
      loading: "最新ビルドを読み込み中...",
      noBuilds: "利用可能なビルドがありません",
      chinaTime: "中国時間"
    }
  };

  const currentLang = translations.language || 'en';
  const t = testingTranslations[currentLang as keyof typeof testingTranslations] || testingTranslations.en;

  return (
    <div className="min-h-screen bg-minecraft-dark-blue text-white">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
              {t.title}
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Build Status Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Monitor className="h-6 w-6 text-blue-400" />
              {t.latestBuilds}
            </h2>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                <span className="ml-3 text-white/70">{t.loading}</span>
              </div>
            ) : workflows.length === 0 ? (
              <div className="text-center py-12 text-white/70">
                {t.noBuilds}
              </div>
            ) : (
              <div className="grid gap-4">
                {workflows.slice(0, 5).map((workflow) => (
                  <motion.div
                    key={workflow.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.02 }}
                    className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-300 ${getStatusColor(workflow.status, workflow.conclusion)}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(workflow.status, workflow.conclusion)}
                        <div>
                          <h3 className="font-semibold text-lg">{workflow.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-white/60">
                            <span>{t.branch}: {workflow.head_branch}</span>
                            <span>{t.updated}: {formatDateTimeChina(workflow.updated_at)} ({t.chinaTime})</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <motion.a
                          href={workflow.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Download Platforms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              { name: "Windows", icon: <Monitor className="h-8 w-8" />, color: "blue" },
              { name: "macOS", icon: <Apple className="h-8 w-8" />, color: "purple" },
              { name: "Linux", icon: <Smartphone className="h-8 w-8" />, color: "green" }
            ].map((platform) => (
              <motion.div
                key={platform.name}
                whileHover={{ scale: 1.05, y: -5 }}
                className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/40 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`text-${platform.color}-400`}>
                    {platform.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{platform.name}</h3>
                </div>
                
                <motion.a
                  href="https://github.com/Voxelum/x-minecraft-launcher/actions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="h-4 w-4" />
                  {t.downloadArtifacts}
                </motion.a>
              </motion.div>
            ))}
          </motion.div>

          {/* GitHub Actions Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <motion.a
              href="https://github.com/Voxelum/x-minecraft-launcher/actions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="h-5 w-5" />
              {t.viewOnGitHub}
            </motion.a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Testing;
