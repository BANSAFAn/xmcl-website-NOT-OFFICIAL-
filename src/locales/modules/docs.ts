import type { SupportedLocale } from '@/types/i18n';

export interface DocsTranslations {
  title: string;
  subtitle: string;
  sections: {
    coreApi: {
      title: string;
      description: string;
    };
    launcherCore: {
      title: string;
      description: string;
    };
    modManagement: {
      title: string;
      description: string;
    };
  };
  openDocumentation: string;
  fullDocumentation: string;
  fullDocumentationDescription: string;
  goToDocumentation: string;
}

export const docsTranslations: Record<SupportedLocale, DocsTranslations> = {
  en: {
    title: "Core Documentation",
    subtitle: "Technical documentation for developers",
    sections: {
      coreApi: {
        title: "Core API",
        description: "Documentation for the core XMCL API"
      },
      launcherCore: {
        title: "Launcher Core",
        description: "Core launcher components"
      },
      modManagement: {
        title: "Mod Management",
        description: "Modification management"
      }
    },
    openDocumentation: "Open Documentation",
    fullDocumentation: "Full Documentation",
    fullDocumentationDescription: "Visit the official documentation for complete information",
    goToDocumentation: "Go to Documentation"
  },
  ru: {
    title: "Документация Core",
    subtitle: "Техническая документация для разработчиков",
    sections: {
      coreApi: {
        title: "Core API",
        description: "Документация по основному API XMCL"
      },
      launcherCore: {
        title: "Launcher Core",
        description: "Основные компоненты лаунчера"
      },
      modManagement: {
        title: "Mod Management",
        description: "Управление модификациями"
      }
    },
    openDocumentation: "Открыть документацию",
    fullDocumentation: "Полная документация",
    fullDocumentationDescription: "Посетите официальную документацию для получения полной информации",
    goToDocumentation: "Перейти к документации"
  },
  ja: {
    title: "コアドキュメント",
    subtitle: "開発者向け技術ドキュメント",
    sections: {
      coreApi: {
        title: "Core API",
        description: "XMCLコアAPIのドキュメント"
      },
      launcherCore: {
        title: "Launcher Core",
        description: "コアランチャーコンポーネント"
      },
      modManagement: {
        title: "Mod Management",
        description: "MOD管理"
      }
    },
    openDocumentation: "ドキュメントを開く",
    fullDocumentation: "完全なドキュメント",
    fullDocumentationDescription: "完全な情報については公式ドキュメントをご覧ください",
    goToDocumentation: "ドキュメントへ移動"
  },
  zh: {
    title: "核心文档",
    subtitle: "开发者技术文档",
    sections: {
      coreApi: {
        title: "Core API",
        description: "XMCL 核心 API 文档"
      },
      launcherCore: {
        title: "Launcher Core",
        description: "核心启动器组件"
      },
      modManagement: {
        title: "Mod Management",
        description: "模组管理"
      }
    },
    openDocumentation: "打开文档",
    fullDocumentation: "完整文档",
    fullDocumentationDescription: "访问官方文档获取完整信息",
    goToDocumentation: "前往文档"
  },
  uk: {
    title: "Документація Core",
    subtitle: "Технічна документація для розробників",
    sections: {
      coreApi: {
        title: "Core API",
        description: "Документація по основному API XMCL"
      },
      launcherCore: {
        title: "Launcher Core",
        description: "Основні компоненти лаунчера"
      },
      modManagement: {
        title: "Mod Management",
        description: "Управління модифікаціями"
      }
    },
    openDocumentation: "Відкрити документацію",
    fullDocumentation: "Повна документація",
    fullDocumentationDescription: "Відвідайте офіційну документацію для отримання повної інформації",
    goToDocumentation: "Перейти до документації"
  }
};