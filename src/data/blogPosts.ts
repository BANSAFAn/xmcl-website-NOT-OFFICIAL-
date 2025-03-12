
import { BlogPost } from '@/types/blog';

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "azure-sourcemap-management",
    title: "Оптимизация X Minecraft Launcher: Azure Application Insights для управления исходными картами",
    date: "15 мая 2024",
    author: "Команда XMCL",
    excerpt: "Как мы используем Azure Application Insights и Azure Storage для безопасного управления исходными картами в нашем лаунчере.",
    category: "Разработка",
    image: "/lovable-uploads/9206c4a4-93f9-458c-ab4b-e28e0e96e071.png",
    content: `
# Оптимизация X Minecraft Launcher: Azure Application Insights для управления исходными картами

## Исходные карты и отладка

В X Minecraft Launcher мы раньше поставляли исходные карты (sourcemap) в производственном коде. С пакетом source-map-support стек ошибок становится значительно полезнее для решения проблем.

Мы можем напрямую узнать, в какой строке исходного кода возникла проблема.

Однако поставка исходных карт в продакшн делает наш конечный пакет больше. По сути, это удваивает размер конечной сборки asar. В то же время нам нужно загружать исходные карты в память, поэтому они будут потреблять много памяти при использовании в продакшн. Это плохо. 😕

Поэтому мы начали искать подход, который позволил бы нам не только иметь полный и понятный стек ошибок, но и удалить исходные карты из производственной сборки.

## Azure Application Insight

Лаунчер использует Azure Application Insight для телеметрии. Из официальной документации мы узнали, что он поддерживает демаскировку стека ошибок в телеметрии. Это выглядит круто, но вскоре мы обнаружили проблему.

## Проблема

В официальной документации мы видели пример отображения минифицированного стека ошибок JavaScript обратно в стек вызовов исходного кода. Стек ошибок JavaScript в браузере выглядит так:

\`\`\`
at x (https://xyz.com/path/js/a.js:123:456)
\`\`\`

Он начинается с домена, и Azure может игнорировать протокол и домен, напрямую используя путь /path/js/a.js для поиска соответствующего файла .map в BLOB-хранилище Azure \`<config-container>/path/js/a.js.map\`.

В лаунчере наш стек ошибок всегда является полным путем к диску, где находится JS-файл. Это означает, что путь стека ошибок зависит от того, где пользователь разместил программу. Например:

\`\`\`
at x (C:\\Users\\username\\x-minecraft-launcher\\resources\\app.asar\\index.js:123:456)
\`\`\`

Невозможно заставить Azure обрабатывать это отображение.

## Вдохновение

После того, как мы поняли суть логики ремаппинга Azure, мы решили придумать способ изменить стек вызовов, чтобы он соответствовал логике Azure.

Пакет source-map-support дал нам идею.

source-map-support делает нечто подобное, за исключением того, что он отображает стек вызовов обратно к исходному коду. Изучив его исходный код, мы обнаружили, что можем использовать API трассировки стека V8 для изменения стека в нужную нам форму.

Всё, что нам нужно сделать — перехватить процесс генерации трассировки стека V8 и заменить абсолютный путь к файлу на относительный путь к нашей исходной карте в BLOB-хранилище Azure.

## Решение

Лаунчер использует GitHub Actions для сборки артефактов, и мы используем номер запуска GitHub в качестве номера сборки лаунчера. Мы решили хранить исходные карты каждой сборки в BLOB-хранилище Azure и сопоставлять стек ошибок по номеру сборки.

Это означает, что мы храним исходные карты следующим образом:

\`\`\`
<storage-url>/<build_number>/<file>.map
\`\`\`

и наш стек ошибок должен выглядеть так:

\`\`\`
at x (/<build_number>/index.js:123:456)
\`\`\`

Поэтому сначала мы копируем код перехвата из source-map-support:

\`\`\`typescript
Error.prepareStackTrace = (error, stack) => {
  const name = error.name || 'Error'
  const message = error.message || ''
  const errorString = name + ': ' + message

  const processedStack = []
  for (let i = stack.length - 1; i >= 0; i--) {
    processedStack.push('\\n    at ' + wrapCallSite(stack[i]))
  }
  return errorString + processedStack.reverse().join('')
}
\`\`\`

В оригинальной реализации wrapCallSite — это сложная функция для преобразования стека вызовов к источнику.

Нам нужна только простая функция:

\`\`\`typescript
const buildNumber = process.env.BUILD_NUMBER
const prefix = \`/\${buildNumber}\`

const wrapCallSite = (frame: any) => {
  if (frame.isNative()) return frame
  frame = cloneCallSite(frame)
  const original = frame.getScriptNameOrSourceURL
  frame.getScriptNameOrSourceURL = function () {
    // substract the path
    let name = original.call(this)
    if (name) {
      name = name.replace(__dirname, prefix)
      name = name.replace(/\\\\/g, '/')
    }
    return name
  }
  return frame
}
\`\`\`

Функция cloneCallSite взята из оригинальной реализации.
    `
  }
];
