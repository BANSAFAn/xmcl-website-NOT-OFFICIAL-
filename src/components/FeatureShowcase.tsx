
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function FeatureShowcase() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  
  // Initialize language based on localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLang);
  }, []);

  const getTranslatedFeatures = () => {
    switch(currentLanguage) {
      case 'ru':
        return [
          {
            title: "Не беспокойтесь об установке игры",
            description: "XMCL поддерживает установку vanilla Minecraft, Minecraft Forge, Fabric и даже Optifine - всё в одном! Вы можете установить их в одном месте в Лаунчере. Также поддерживается сторонняя зеркальная ссылка BMCL API. Вы даже можете настроить собственное зеркало в лаунчере.",
            highlightText: "BMCL API",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-minecraft-accent-orange">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.29 7 12 12 20.71 7"></polyline>
                  <line x1="12" y1="22" x2="12" y2="12"></line>
                </svg>,
            color: "text-minecraft-accent-orange",
            bgColor: "bg-minecraft-accent-orange/20",
            borderColor: "border-minecraft-accent-orange/30"
          },
          {
            title: "Оптимальное дисковое пространство с массивными ресурсами",
            description: "XMCL хранит все моды, пакеты ресурсов, шейдеры и модпаки в одном месте. Когда вы пытаетесь использовать любой известный ресурс, он использует жесткую ссылку для установки ресурса в экземпляр без копирования. Это означает, что вы больше никогда не увидите дублированных копий в папке /mods.",
            highlightText: "Жесткая ссылка, Символическая ссылка",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-minecraft-accent-green">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>,
            color: "text-minecraft-accent-green",
            bgColor: "bg-minecraft-accent-green/20",
            borderColor: "border-minecraft-accent-green/30"
          },
          {
            title: "Держите рабочее пространство чистым с помощью мульти-экземпляров",
            description: "XMCL имеет встроенную поддержку мульти-экземпляров. Вы можете легко создавать несколько экземпляров. Так что вам не нужно беспокоиться о смешении различных настроек запуска.",
            highlightText: "",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-minecraft-accent-cyan">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <path d="M3.29 7.05 12 12l8.71-4.95"></path>
                  <path d="M12 12v9.95"></path>
                  <path d="M12 12 7 8.8"></path>
                </svg>,
            color: "text-minecraft-accent-cyan",
            bgColor: "bg-minecraft-accent-cyan/20",
            borderColor: "border-minecraft-accent-cyan/30"
          },
          {
            title: "Интеграция с несколькими сообществами",
            description: "XMCL имеет встроенную поддержку Curseforge и Modrinth. Он также предоставляет возможность поддерживать пользовательские учетные записи/системы скинов, такие как Blessing Skin.",
            highlightText: "Curseforge, Modrinth, Blessing Skin, Authlib Injector",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-minecraft-accent-yellow">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>,
            color: "text-minecraft-accent-yellow",
            bgColor: "bg-minecraft-accent-yellow/20",
            borderColor: "border-minecraft-accent-yellow/30"
          }
        ];
      case 'uk':
        return [
          {
            title: "Не турбуйтеся про встановлення гри",
            description: "XMCL підтримує встановлення vanilla Minecraft, Minecraft Forge, Fabric і навіть Optifine - все в одному! Ви можете встановити їх в одному місці в Лаунчері. Також підтримується стороннє дзеркальне посилання BMCL API. Ви навіть можете налаштувати власне дзеркало в лаунчері.",
            highlightText: "BMCL API",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-minecraft-accent-orange">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.29 7 12 12 20.71 7"></polyline>
                  <line x1="12" y1="22" x2="12" y2="12"></line>
                </svg>,
            color: "text-minecraft-accent-orange",
            bgColor: "bg-minecraft-accent-orange/20",
            borderColor: "border-minecraft-accent-orange/30"
          },
          {
            title: "Оптимальний дисковий простір з масивними ресурсами",
            description: "XMCL зберігає всі моди, пакети ресурсів, шейдери та модпаки в одному місці. Коли ви намагаєтеся використовувати будь-який відомий ресурс, він використовує жорстке посилання для встановлення ресурсу в екземпляр без копіювання. Це означає, що ви більше ніколи не побачите дубльованих копій у папці /mods.",
            highlightText: "Жорстке посилання, Символічне посилання",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-minecraft-accent-green">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>,
            color: "text-minecraft-accent-green",
            bgColor: "bg-minecraft-accent-green/20",
            borderColor: "border-minecraft-accent-green/30"
          },
          {
            title: "Тримайте робочий простір чистим за допомогою мульти-екземплярів",
            description: "XMCL має вбудовану підтримку мульти-екземплярів. Ви можете легко створювати кілька екземплярів. Тож вам не потрібно турбуватися про змішування різних налаштувань запуску.",
            highlightText: "",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-minecraft-accent-cyan">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <path d="M3.29 7.05 12 12l8.71-4.95"></path>
                  <path d="M12 12v9.95"></path>
                  <path d="M12 12 7 8.8"></path>
                </svg>,
            color: "text-minecraft-accent-cyan",
            bgColor: "bg-minecraft-accent-cyan/20",
            borderColor: "border-minecraft-accent-cyan/30"
          },
          {
            title: "Інтеграція з кількома спільнотами",
            description: "XMCL має вбудовану підтримку Curseforge та Modrinth. Він також надає можливість підтримувати користувацькі облікові записи/системи скінів, такі як Blessing Skin.",
            highlightText: "Curseforge, Modrinth, Blessing Skin, Authlib Injector",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-minecraft-accent-yellow">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>,
            color: "text-minecraft-accent-yellow",
            bgColor: "bg-minecraft-accent-yellow/20",
            borderColor: "border-minecraft-accent-yellow/30"
          }
        ];
      case 'zh':
        return [
          {
            title: "不用担心游戏安装",
            description: "XMCL支持安装原版Minecraft、Minecraft Forge、Fabric，甚至Optifine，全部集成在一起！您可以在启动器中的单一位置安装它们。它还支持第三方镜像链接BMCL API。您甚至可以在启动器中自定义自己的镜像。",
            highlightText: "BMCL API",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-minecraft-accent-orange">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.29 7 12 12 20.71 7"></polyline>
                  <line x1="12" y1="22" x2="12" y2="12"></line>
                </svg>,
            color: "text-minecraft-accent-orange",
            bgColor: "bg-minecraft-accent-orange/20",
            borderColor: "border-minecraft-accent-orange/30"
          },
          {
            title: "大量资源的最佳磁盘空间利用",
            description: "XMCL将所有模组、资源包、着色器包和整合包存储在单一位置。当您尝试使用任何已知资源时，它将使用硬链接将资源安装到实例中，无需复制。这意味着您在/mods文件夹中再也不会看到任何重复的副本。",
            highlightText: "硬链接, 符号链接",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-minecraft-accent-green">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>,
            color: "text-minecraft-accent-green",
            bgColor: "bg-minecraft-accent-green/20",
            borderColor: "border-minecraft-accent-green/30"
          },
          {
            title: "多实例保持工作空间整洁",
            description: "XMCL内置支持多实例。您可以轻松创建多个实例。因此，您不必担心不同启动设置的混合。",
            highlightText: "",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-minecraft-accent-cyan">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <path d="M3.29 7.05 12 12l8.71-4.95"></path>
                  <path d="M12 12v9.95"></path>
                  <path d="M12 12 7 8.8"></path>
                </svg>,
            color: "text-minecraft-accent-cyan",
            bgColor: "bg-minecraft-accent-cyan/20",
            borderColor: "border-minecraft-accent-cyan/30"
          },
          {
            title: "与多个社区集成",
            description: "XMCL内置支持Curseforge和Modrinth。它还提供支持自定义用户账户/皮肤系统（如Blessing Skin）的能力。",
            highlightText: "Curseforge, Modrinth, Blessing Skin, Authlib Injector",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-minecraft-accent-yellow">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>,
            color: "text-minecraft-accent-yellow",
            bgColor: "bg-minecraft-accent-yellow/20",
            borderColor: "border-minecraft-accent-yellow/30"
          }
        ];
      case 'de':
        return [
          {
            title: "Keine Sorgen mehr bei der Spielinstallation",
            description: "XMCL unterstützt die Installation von Vanilla Minecraft, Minecraft Forge, Fabric und sogar Optifine - alles in einem! Sie können sie an einem einzigen Ort im Launcher installieren. Es unterstützt auch den Drittanbieter-Spiegellink BMCL API. Sie können sogar Ihren eigenen Spiegel im Launcher anpassen.",
            highlightText: "BMCL API",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-minecraft-accent-orange">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.29 7 12 12 20.71 7"></polyline>
                  <line x1="12" y1="22" x2="12" y2="12"></line>
                </svg>,
            color: "text-minecraft-accent-orange",
            bgColor: "bg-minecraft-accent-orange/20",
            borderColor: "border-minecraft-accent-orange/30"
          },
          {
            title: "Optimaler Festplattenplatz mit massiven Ressourcen",
            description: "XMCL speichert alle Mods, Ressourcenpakete, Shader-Pakete und Modpacks an einem einzigen Speicherort. Wenn Sie versuchen, eine bekannte Ressource zu verwenden, wird ein Hard-Link verwendet, um die Ressource ohne Kopieren in die Instanz zu installieren. Das bedeutet, dass Sie nie wieder doppelte Kopien im /mods-Ordner sehen werden.",
            highlightText: "Hard-Link, Symbolischer Link",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-minecraft-accent-green">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>,
            color: "text-minecraft-accent-green",
            bgColor: "bg-minecraft-accent-green/20",
            borderColor: "border-minecraft-accent-green/30"
          },
          {
            title: "Halten Sie Ihren Arbeitsbereich mit Multi-Instanzen sauber",
            description: "XMCL hat eingebaute Unterstützung für Multi-Instanzen. Sie können mehrere Instanzen einfach erstellen. So müssen Sie sich keine Sorgen mehr über die Vermischung verschiedener Starteinstellungen machen.",
            highlightText: "",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-minecraft-accent-cyan">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <path d="M3.29 7.05 12 12l8.71-4.95"></path>
                  <path d="M12 12v9.95"></path>
                  <path d="M12 12 7 8.8"></path>
                </svg>,
            color: "text-minecraft-accent-cyan",
            bgColor: "bg-minecraft-accent-cyan/20",
            borderColor: "border-minecraft-accent-cyan/30"
          },
          {
            title: "Integration mit mehreren Communities",
            description: "XMCL hat eingebaute Unterstützung für Curseforge und Modrinth. Es bietet auch die Möglichkeit, benutzerdefinierte Benutzerkonten/Skin-Systeme wie Blessing Skin zu unterstützen.",
            highlightText: "Curseforge, Modrinth, Blessing Skin, Authlib Injector",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-minecraft-accent-yellow">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>,
            color: "text-minecraft-accent-yellow",
            bgColor: "bg-minecraft-accent-yellow/20",
            borderColor: "border-minecraft-accent-yellow/30"
          }
        ];
      case 'ja':
        return [
          {
            title: "ゲームインストールの心配はもうありません",
            description: "XMCLはバニラMinecraft、Minecraft Forge、Fabric、さらにはOptifineのインストールをオールインワンでサポートしています！ランチャー内の一箇所でそれらをインストールできます。また、サードパーティのミラーリンクBMCL APIもサポートしています。ランチャーで独自のミラーをカスタマイズすることもできます。",
            highlightText: "BMCL API",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-minecraft-accent-orange">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.29 7 12 12 20.71 7"></polyline>
                  <line x1="12" y1="22" x2="12" y2="12"></line>
                </svg>,
            color: "text-minecraft-accent-orange",
            bgColor: "bg-minecraft-accent-orange/20",
            borderColor: "border-minecraft-accent-orange/30"
          },
          {
            title: "大量のリソースで最適なディスク容量",
            description: "XMCLはすべてのMod、リソースパック、シェーダーパック、Modpackを単一の保存場所に保存します。既知のリソースを使用しようとすると、コピーせずにハードリンクを使用してリソースをインスタンスにインストールします。これにより、/modsフォルダに重複したコピーが表示されることはもうありません。",
            highlightText: "ハードリンク, シンボリックリンク",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-minecraft-accent-green">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>,
            color: "text-minecraft-accent-green",
            bgColor: "bg-minecraft-accent-green/20",
            borderColor: "border-minecraft-accent-green/30"
          },
          {
            title: "マルチインスタンスでワークスペースをクリーンに保つ",
            description: "XMCLにはマルチインスタンスのサポートが組み込まれています。複数のインスタンスを簡単に作成できます。そのため、異なる起動設定の混在について心配する必要はありません。",
            highlightText: "",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-minecraft-accent-cyan">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <path d="M3.29 7.05 12 12l8.71-4.95"></path>
                  <path d="M12 12v9.95"></path>
                  <path d="M12 12 7 8.8"></path>
                </svg>,
            color: "text-minecraft-accent-cyan",
            bgColor: "bg-minecraft-accent-cyan/20",
            borderColor: "border-minecraft-accent-cyan/30"
          },
          {
            title: "複数のコミュニティと統合",
            description: "XMCLにはCurseforgeとModrinthのサポートが組み込まれています。また、Blessing Skinのようなカスタムユーザーアカウント/スキンシステムをサポートする機能も提供しています。",
            highlightText: "Curseforge, Modrinth, Blessing Skin, Authlib Injector",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-minecraft-accent-yellow">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>,
            color: "text-minecraft-accent-yellow",
            bgColor: "bg-minecraft-accent-yellow/20",
            borderColor: "border-minecraft-accent-yellow/30"
          }
        ];
      default: // English
        return [
          {
            title: "No more worry about the Game Install",
            description: "XMCL supports installation of vanilla Minecraft, Minecraft Forge, Fabric, and even Optifine All in One! You can install them in a single place within the Launcher. It also supports the third party mirror link BMCL API. You can even customize your own mirror in the launcher.",
            highlightText: "BMCL API",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-minecraft-accent-orange">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.29 7 12 12 20.71 7"></polyline>
                  <line x1="12" y1="22" x2="12" y2="12"></line>
                </svg>,
            color: "text-minecraft-accent-orange",
            bgColor: "bg-minecraft-accent-orange/20",
            borderColor: "border-minecraft-accent-orange/30"
          },
          {
            title: "Optimal disk space with Massive Resources",
            description: "XMCL will store all the mods, resource packs, shader packs and modpacks to a single store location. While you try to use any known resource, it will use hard link to install the resource to the instance without copying. It means you will never see any duplicated copy in /mods folder anymore.",
            highlightText: "Hard link, Symbolic link",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-minecraft-accent-green">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>,
            color: "text-minecraft-accent-green",
            bgColor: "bg-minecraft-accent-green/20",
            borderColor: "border-minecraft-accent-green/30"
          },
          {
            title: "Keep your workspace Clean with multi-instances",
            description: "XMCL has built in support of multi-instances. You can create multiple instances easily. So you don't need to be worried about the mixture of the different launch settings.",
            highlightText: "",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-minecraft-accent-cyan">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <path d="M3.29 7.05 12 12l8.71-4.95"></path>
                  <path d="M12 12v9.95"></path>
                  <path d="M12 12 7 8.8"></path>
                </svg>,
            color: "text-minecraft-accent-cyan",
            bgColor: "bg-minecraft-accent-cyan/20",
            borderColor: "border-minecraft-accent-cyan/30"
          },
          {
            title: "Integrated with Multiple Communities",
            description: "XMCL built in supports with Curseforge & Modrinth. It also provides the ability to support custom user accounts/skin systems like blessing skin.",
            highlightText: "Curseforge, Modrinth, Blessing Skin, Authlib Injector",
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-minecraft-accent-yellow">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>,
            color: "text-minecraft-accent-yellow",
            bgColor: "bg-minecraft-accent-yellow/20",
            borderColor: "border-minecraft-accent-yellow/30"
          }
        ];
    }
  };

  const features = getTranslatedFeatures();

  return (
    <section className="py-24 bg-minecraft-dark-blue">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`p-6 rounded-xl transition-all duration-300 ${feature.bgColor} ${feature.borderColor} border hover:shadow-lg hover:-translate-y-1`}
            >
              <div className="flex items-start gap-4">
                <div className={`rounded-lg p-3 ${feature.bgColor}`}>
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`text-xl font-bold ${feature.color} mb-2`}>
                    {feature.title}
                  </h3>
                  <p className="text-white/80 mb-3">
                    {feature.description}
                  </p>
                  {feature.highlightText && (
                    <p className="text-sm font-medium text-white/60">
                      {feature.highlightText}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
