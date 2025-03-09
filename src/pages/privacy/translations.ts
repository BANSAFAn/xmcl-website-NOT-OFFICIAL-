
export type LanguageKey = 'en' | 'ru' | 'uk' | 'zh';

// Privacy page translations
export const privacyTranslations = {
  en: {
    title: "X Minecraft Launcher Privacy Terms",
    introduction: {
      title: "1. Introduction",
      content: "Thank you for using the X Minecraft Launcher (\"the Launcher\"), developed by XMCL developer team (\"the Organization\"). This document outlines the privacy terms and practices governing the collection, use, and protection of certain information when you use the Launcher. By using the Launcher, you agree to the terms outlined in this document."
    },
    informationCollection: {
      title: "2. Information Collection and Use",
      usageInfo: {
        title: "2.1. Usage Information",
        content: "The Launcher collects the following usage information:",
        items: ["Minecraft game start event", "Minecraft game exit event", "User login event"]
      },
      additionalInfo: {
        title: "2.2. Additional Information",
        content: "In addition to the usage information mentioned above, the Launcher also collects the following data:",
        items: ["Minecraft startup arguments", "Game exit code", "User login service name"]
      },
      deviceId: {
        title: "2.3. Device Identification",
        content: "The Launcher generates a unique ID for your device. This ID will be used to identify your device as a single user. No personally identifiable information is associated with this device ID."
      },
      errorReporting: {
        title: "2.4. Error Reporting",
        content: "The Launcher collects unexpected errors and their associated error stacks for the purpose of identifying and resolving issues. This information is used to improve the stability and performance of the Launcher and is not used for any other purpose."
      }
    },
    dataSharing: {
      title: "3. Data Sharing and Disclosure",
      content: "The Organization may share the collected information in the following circumstances:",
      items: [
        "With contributors and maintainers of the Launcher for the purpose of improving the software and providing support",
        "When required by applicable law or in response to a legal request",
        "To protect the rights, property, or safety of the Organization, its users, or others",
        "As part of an aggregated and anonymized dataset that does not identify individual users"
      ]
    },
    dataSecurity: {
      title: "4. Data Security",
      content: "The Organization takes reasonable measures to protect the collected information from unauthorized access, use, or disclosure. However, please note that no method of transmission over the internet or electronic storage is 100% secure."
    },
    thirdParty: {
      title: "5. Third-Party Services",
      content: "The Launcher may integrate with or provide links to third-party services or websites. The Organization is not responsible for the privacy practices or content of those third parties. We encourage you to review the privacy policies of those third parties before providing any personal information."
    },
    children: {
      title: "6. Children's Privacy",
      content: "The Launcher is not intended for use by individuals under the age of 13. The Organization does not knowingly collect personal information from children under 13. If you believe we have collected personal information from a child under 13, please contact us immediately."
    },
    changes: {
      title: "7. Changes to this Privacy Terms",
      content: "The Organization reserves the right to update or modify this privacy terms document at any time. We will notify you of any material changes by posting the updated version on our website or through other communication channels."
    },
    contact: {
      title: "8. Contact Us",
      content: "If you have any questions or concerns about this privacy terms document or our privacy practices, please contact us at cijhn@hotmail.com."
    }
  },
  ru: {
    title: "Политика конфиденциальности X Minecraft Launcher",
    introduction: {
      title: "1. Введение",
      content: "Благодарим вас за использование X Minecraft Launcher (\"Лаунчер\"), разработанного командой разработчиков XMCL (\"Организация\"). Этот документ описывает положения о конфиденциальности и практики, регулирующие сбор, использование и защиту определенной информации при использовании Лаунчера. Используя Лаунчер, вы соглашаетесь с условиями, изложенными в этом документе."
    },
    informationCollection: {
      title: "2. Сбор и использование информации",
      usageInfo: {
        title: "2.1. Информация об использовании",
        content: "Лаунчер собирает следующую информацию об использовании:",
        items: ["Событие запуска игры Minecraft", "Событие выхода из игры Minecraft", "Событие входа пользователя"]
      },
      additionalInfo: {
        title: "2.2. Дополнительная информация",
        content: "В дополнение к вышеупомянутой информации об использовании, Лаунчер также собирает следующие данные:",
        items: ["Аргументы запуска Minecraft", "Код выхода из игры", "Название службы входа пользователя"]
      },
      deviceId: {
        title: "2.3. Идентификация устройства",
        content: "Лаунчер генерирует уникальный ID для вашего устройства. Этот ID будет использоваться для идентификации вашего устройства как одного пользователя. Никакая персонально идентифицируемая информация не связана с этим ID устройства."
      },
      errorReporting: {
        title: "2.4. Отчеты об ошибках",
        content: "Лаунчер собирает непредвиденные ошибки и связанные с ними стеки ошибок с целью выявления и решения проблем. Эта информация используется для улучшения стабильности и производительности Лаунчера и не используется для каких-либо других целей."
      }
    },
    dataSharing: {
      title: "3. Обмен данными и раскрытие информации",
      content: "Организация может делиться собранной информацией в следующих обстоятельствах:",
      items: [
        "С участниками и сопровождающими Лаунчера с целью улучшения программного обеспечения и предоставления поддержки",
        "Когда это требуется применимым законодательством или в ответ на юридический запрос",
        "Для защиты прав, собственности или безопасности Организации, ее пользователей или других лиц",
        "В составе агрегированного и анонимизированного набора данных, который не идентифицирует отдельных пользователей"
      ]
    },
    dataSecurity: {
      title: "4. Безопасность данных",
      content: "Организация принимает разумные меры для защиты собранной информации от несанкционированного доступа, использования или раскрытия. Однако обратите внимание, что ни один метод передачи через интернет или электронного хранения не является на 100% безопасным."
    },
    thirdParty: {
      title: "5. Сторонние сервисы",
      content: "Лаунчер может интегрироваться или предоставлять ссылки на сторонние сервисы или веб-сайты. Организация не несет ответственности за практики конфиденциальности или содержание этих третьих сторон. Мы рекомендуем ознакомиться с политиками конфиденциальности этих третьих сторон перед предоставлением любой личной информации."
    },
    children: {
      title: "6. Конфиденциальность детей",
      content: "Лаунчер не предназначен для использования лицами младше 13 лет. Организация сознательно не собирает личную информацию от детей младше 13 лет. Если вы считаете, что мы собрали личную информацию от ребенка младше 13 лет, пожалуйста, немедленно свяжитесь с нами."
    },
    changes: {
      title: "7. Изменения в этих положениях о конфиденциальности",
      content: "Организация оставляет за собой право обновлять или изменять этот документ о положениях конфиденциальности в любое время. Мы уведомим вас о любых существенных изменениях, разместив обновленную версию на нашем веб-сайте или через другие каналы связи."
    },
    contact: {
      title: "8. Свяжитесь с нами",
      content: "Если у вас есть вопросы или опасения относительно этого документа о положениях конфиденциальности или наших практик конфиденциальности, пожалуйста, свяжитесь с нами по адресу cijhn@hotmail.com."
    }
  },
  uk: {
    title: "Політика конфіденційності X Minecraft Launcher",
    introduction: {
      title: "1. Вступ",
      content: "Дякуємо вам за використання X Minecraft Launcher (\"Лаунчер\"), розробленого командою розробників XMCL (\"Організація\"). Цей документ описує положення про конфіденційність та практики, що регулюють збір, використання та захист певної інформації при використанні Лаунчера. Використовуючи Лаунчер, ви погоджуєтеся з умовами, викладеними в цьому документі."
    },
    informationCollection: {
      title: "2. Збір та використання інформації",
      usageInfo: {
        title: "2.1. Інформація про використання",
        content: "Лаунчер збирає наступну інформацію про використання:",
        items: ["Подія запуску гри Minecraft", "Подія виходу з гри Minecraft", "Подія входу користувача"]
      },
      additionalInfo: {
        title: "2.2. Додаткова інформація",
        content: "Крім вищезгаданої інформації про використання, Лаунчер також збирає наступні дані:",
        items: ["Аргументи запуску Minecraft", "Код виходу з гри", "Назва служби входу користувача"]
      },
      deviceId: {
        title: "2.3. Ідентифікація пристрою",
        content: "Лаунчер генерує унікальний ID для вашого пристрою. Цей ID буде використовуватися для ідентифікації вашого пристрою як одного користувача. Жодна персонально ідентифікована інформація не пов'язана з цим ID пристрою."
      },
      errorReporting: {
        title: "2.4. Звіти про помилки",
        content: "Лаунчер збирає непередбачені помилки та пов'язані з ними стеки помилок з метою виявлення та вирішення проблем. Ця інформація використовується для покращення стабільності та продуктивності Лаунчера і не використовується для будь-яких інших цілей."
      }
    },
    dataSharing: {
      title: "3. Обмін даними та розкриття інформації",
      content: "Організація може ділитися зібраною інформацією в наступних обставинах:",
      items: [
        "З учасниками та супроводжуючими Лаунчера з метою покращення програмного забезпечення та надання підтримки",
        "Коли це вимагається застосовним законодавством або у відповідь на юридичний запит",
        "Для захисту прав, власності або безпеки Організації, її користувачів або інших осіб",
        "У складі агрегованого та анонімізованого набору даних, який не ідентифікує окремих користувачів"
      ]
    },
    dataSecurity: {
      title: "4. Безпека даних",
      content: "Організація вживає розумних заходів для захисту зібраної інформації від несанкціонованого доступу, використання або розкриття. Однак зверніть увагу, що жоден метод передачі через інтернет або електронного зберігання не є на 100% безпечним."
    },
    thirdParty: {
      title: "5. Сторонні сервіси",
      content: "Лаунчер може інтегруватися або надавати посилання на сторонні сервіси або веб-сайти. Організація не несе відповідальності за практики конфіденційності або зміст цих третіх сторін. Ми рекомендуємо ознайомитися з політиками конфіденційності цих третіх сторін перед наданням будь-якої особистої інформації."
    },
    children: {
      title: "6. Конфіденційність дітей",
      content: "Лаунчер не призначений для використання особами молодше 13 років. Організація свідомо не збирає особисту інформацію від дітей молодше 13 років. Якщо ви вважаєте, що ми зібрали особисту інформацію від дитини молодше 13 років, будь ласка, негайно зв'яжіться з нами."
    },
    changes: {
      title: "7. Зміни в цих положеннях про конфіденційність",
      content: "Організація залишає за собою право оновлювати або змінювати цей документ про положення конфіденційності в будь-який час. Ми повідомимо вас про будь-які суттєві зміни, розмістивши оновлену версію на нашому веб-сайті або через інші канали зв'язку."
    },
    contact: {
      title: "8. Зв'яжіться з нами",
      content: "Якщо у вас є питання або занепокоєння щодо цього документу про положення конфіденційності або наших практик конфіденційності, будь ласка, зв'яжіться з нами за адресою cijhn@hotmail.com."
    }
  },
  zh: {
    title: "X Minecraft 启动器隐私条款",
    introduction: {
      title: "1. 引言",
      content: "感谢您使用由XMCL开发团队（\"组织\"）开发的X Minecraft启动器（\"启动器\"）。本文档概述了在您使用启动器时，收集、使用和保护某些信息的隐私条款和实践。通过使用启动器，您同意本文档中概述的条款。"
    },
    informationCollection: {
      title: "2. 信息收集和使用",
      usageInfo: {
        title: "2.1. 使用信息",
        content: "启动器收集以下使用信息：",
        items: ["Minecraft游戏启动事件", "Minecraft游戏退出事件", "用户登录事件"]
      },
      additionalInfo: {
        title: "2.2. 附加信息",
        content: "除了上述使用信息外，启动器还收集以下数据：",
        items: ["Minecraft启动参数", "游戏退出代码", "用户登录服务名称"]
      },
      deviceId: {
        title: "2.3. 设备识别",
        content: "启动器为您的设备生成一个唯一ID。此ID将用于将您的设备识别为单个用户。没有个人可识别信息与此设备ID相关联。"
      },
      errorReporting: {
        title: "2.4. 错误报告",
        content: "启动器收集意外错误及其相关错误堆栈，以识别和解决问题。此信息用于改进启动器的稳定性和性能，不用于任何其他目的。"
      }
    },
    dataSharing: {
      title: "3. 数据共享和披露",
      content: "组织可能在以下情况下共享收集的信息：",
      items: [
        "与启动器的贡献者和维护者共享，目的是改进软件并提供支持",
        "当适用法律要求或响应法律请求时",
        "为保护组织、其用户或其他人的权利、财产或安全",
        "作为不识别个人用户的聚合和匿名数据集的一部分"
      ]
    },
    dataSecurity: {
      title: "4. 数据安全",
      content: "组织采取合理措施保护收集的信息免受未经授权的访问、使用或披露。但请注意，没有任何通过互联网传输或电子存储的方法是100%安全的。"
    },
    thirdParty: {
      title: "5. 第三方服务",
      content: "启动器可能与第三方服务或网站集成或提供链接。组织不对这些第三方的隐私实践或内容负责。在提供任何个人信息之前，我们鼓励您查看这些第三方的隐私政策。"
    },
    children: {
      title: "6. 儿童隐私",
      content: "启动器不适用于13岁以下的个人。组织不会故意收集13岁以下儿童的个人信息。如果您认为我们收集了13岁以下儿童的个人信息，请立即联系我们。"
    },
    changes: {
      title: "7. 本隐私条款的变更",
      content: "组织保留随时更新或修改本隐私条款文档的权利。我们将通过在我们的网站上发布更新版本或通过其他通信渠道通知您任何重大变更。"
    },
    contact: {
      title: "8. 联系我们",
      content: "如果您对本隐私条款文档或我们的隐私实践有任何问题或疑虑，请通过cijhn@hotmail.com联系我们。"
    }
  }
};
