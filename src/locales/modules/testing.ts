
import type { SupportedLocale } from '@/types/i18n';

export interface TestingTranslations {
  title: string;
  subtitle: string;
  warningTitle: string;
  warningDescription: string;
  useAtOwnRisk: string;
  notRecommendedProduction: string;
  reportIssuesGitHub: string;
  lastUpdated: string;
  allPlatforms: string;
  downloadWindows: string;
  downloadLinux: string;
  downloadMacOS: string;
  noArtifacts: string;
  howToDownload: string;
  howToDownloadSteps: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step5: string;
  };
  downloadStarted: string;
  buildStatus: string;
  lastBuild: string;
  buildNumber: string;
  commitHash: string;
  buildTime: string;
  artifacts: string;
  downloadArtifact: string;
}

export const testingTranslations: Record<SupportedLocale, TestingTranslations> = {
  en: {
    title: "Testing Builds",
    subtitle: "Get early access to the latest features and improvements",
    warningTitle: "Development Builds",
    warningDescription: "These builds are for testing purposes only and may contain bugs",
    useAtOwnRisk: "Use at your own risk - backup your data",
    notRecommendedProduction: "Not recommended for production use",
    reportIssuesGitHub: "Report issues on GitHub",
    lastUpdated: "Last Updated",
    allPlatforms: "All Platforms",
    downloadWindows: "Download for Windows",
    downloadLinux: "Download for Linux",
    downloadMacOS: "Download for macOS",
    noArtifacts: "No artifacts available",
    howToDownload: "How to Download",
    howToDownloadSteps: {
      step1: "Choose your platform below",
      step2: "Download the appropriate file",
      step3: "Install using your preferred method",
      step4: "Report any issues you encounter",
      step5: "Provide feedback to help us improve"
    },
    downloadStarted: "Download started",
    buildStatus: "Build Status",
    lastBuild: "Last Build",
    buildNumber: "Build Number",
    commitHash: "Commit Hash",
    buildTime: "Build Time",
    artifacts: "Artifacts",
    downloadArtifact: "Download Artifact"
  },
  ru: {
    title: "Тестовые сборки",
    subtitle: "Получите ранний доступ к последним функциям и улучшениям",
    warningTitle: "Сборки разработки",
    warningDescription: "Эти сборки предназначены только для тестирования и могут содержать ошибки",
    useAtOwnRisk: "Используйте на свой страх и риск - сделайте резервную копию данных",
    notRecommendedProduction: "Не рекомендуется для производственного использования",
    reportIssuesGitHub: "Сообщать о проблемах на GitHub",
    lastUpdated: "Последнее обновление",
    allPlatforms: "Все платформы",
    downloadWindows: "Скачать для Windows",
    downloadLinux: "Скачать для Linux",
    downloadMacOS: "Скачать для macOS",
    noArtifacts: "Артефакты недоступны",
    howToDownload: "Как скачать",
    howToDownloadSteps: {
      step1: "Выберите свою платформу ниже",
      step2: "Скачайте подходящий файл",
      step3: "Установите предпочитаемым способом",
      step4: "Сообщайте о любых обнаруженных проблемах",
      step5: "Оставляйте отзывы чтобы помочь нам улучшить продукт"
    },
    downloadStarted: "Скачивание началось",
    buildStatus: "Статус сборки",
    lastBuild: "Последняя сборка",
    buildNumber: "Номер сборки",
    commitHash: "Хеш коммита",
    buildTime: "Время сборки",
    artifacts: "Артефакты",
    downloadArtifact: "Скачать артефакт"
  },
  ja: {
    title: "テストビルド",
    subtitle: "最新機能と改善に早期アクセス",
    warningTitle: "開発ビルド",
    warningDescription: "これらのビルドはテスト目的のみでバグを含む可能性があります",
    useAtOwnRisk: "自己責任でご使用ください - データをバックアップしてください",
    notRecommendedProduction: "本番環境での使用は推奨されません",
    reportIssuesGitHub: "GitHubで問題を報告",
    lastUpdated: "最終更新",
    allPlatforms: "すべてのプラットフォーム",
    downloadWindows: "Windows用ダウンロード",
    downloadLinux: "Linux用ダウンロード",
    downloadMacOS: "macOS用ダウンロード",
    noArtifacts: "利用可能なアーティファクトがありません",
    howToDownload: "ダウンロード方法",
    howToDownloadSteps: {
      step1: "下記からプラットフォームを選択",
      step2: "適切なファイルをダウンロード",
      step3: "お好みの方法でインストール",
      step4: "遭遇した問題を報告",
      step5: "改善に役立つフィードバックを提供"
    },
    downloadStarted: "ダウンロード開始",
    buildStatus: "ビルド状態",
    lastBuild: "最新ビルド",
    buildNumber: "ビルド番号",
    commitHash: "コミットハッシュ",
    buildTime: "ビルド時間",
    artifacts: "アーティファクト",
    downloadArtifact: "アーティファクトをダウンロード"
  },
  zh: {
    title: "测试构建",
    subtitle: "抢先体验最新功能和改进",
    warningTitle: "开发构建",
    warningDescription: "这些构建仅用于测试目的，可能包含错误",
    useAtOwnRisk: "使用风险自负 - 请备份您的数据",
    notRecommendedProduction: "不建议在生产环境中使用",
    reportIssuesGitHub: "在GitHub报告问题",
    lastUpdated: "最后更新",
    allPlatforms: "所有平台",
    downloadWindows: "下载Windows版",
    downloadLinux: "下载Linux版",
    downloadMacOS: "下载macOS版",
    noArtifacts: "无可用构件",
    howToDownload: "如何下载",
    howToDownloadSteps: {
      step1: "在下方选择您的平台",
      step2: "下载相应文件",
      step3: "使用您偏好的方法安装",
      step4: "报告您遇到的任何问题",
      step5: "提供反馈以帮助我们改进"
    },
    downloadStarted: "下载已开始",
    buildStatus: "构建状态",
    lastBuild: "最新构建",
    buildNumber: "构建编号",
    commitHash: "提交哈希",
    buildTime: "构建时间",
    artifacts: "构件",
    downloadArtifact: "下载构件"
  },
  uk: {
    title: "Тестові збірки",
    subtitle: "Отримайте ранній доступ до останніх функцій та покращень",
    warningTitle: "Збірки розробки",
    warningDescription: "Ці збірки призначені тільки для тестування та можуть містити помилки",
    useAtOwnRisk: "Використовуйте на власний ризик - зробіть резервну копію даних",
    notRecommendedProduction: "Не рекомендується для використання у виробництві",
    reportIssuesGitHub: "Повідомляти про проблеми на GitHub",
    lastUpdated: "Останнє оновлення",
    allPlatforms: "Усі платформи",
    downloadWindows: "Завантажити для Windows",
    downloadLinux: "Завантажити для Linux",
    downloadMacOS: "Завантажити для macOS",
    noArtifacts: "Артефакти недоступні",
    howToDownload: "Як завантажити",
    howToDownloadSteps: {
      step1: "Виберіть свою платформу нижче",
      step2: "Завантажте відповідний файл",
      step3: "Встановіть бажаним способом",
      step4: "Повідомляйте про будь-які виявлені проблеми",
      step5: "Залишайте відгуки щоб допомогти нам покращити продукт"
    },
    downloadStarted: "Завантаження розпочато",
    buildStatus: "Статус збірки",
    lastBuild: "Остання збірка",
    buildNumber: "Номер збірки",
    commitHash: "Хеш коміту",
    buildTime: "Час збірки",
    artifacts: "Артефакти",
    downloadArtifact: "Завантажити артефакт"
  }
};
