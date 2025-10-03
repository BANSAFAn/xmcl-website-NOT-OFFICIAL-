import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userQuery, logContent } = req.body;

  if (!userQuery) {
    return res.status(400).json({ error: 'Missing userQuery' });
  }

  const lowerCaseQuery = userQuery.toLowerCase();

  // Проверка на безопасность
  const securityKeywords = [
    'activate', 'activate key', 'activate token', 'activate api', 'activate license',
    'activation key', 'activation token', 'activation api', 'activation license',
    'give key', 'give token', 'give api', 'give license',
    'get key', 'get token', 'get api', 'get license',
    'key', 'token', 'api', 'license', 'password', 'secret', 'credential',
    'активировать', 'активировать ключ', 'активировать токен', 'активировать api', 'активировать лицензию',
    'ключ активации', 'токен активации', 'api активации', 'лицензия активации',
    'дать ключ', 'дать токен', 'дать api', 'дать лицензию',
    'получить ключ', 'получить токен', 'получить api', 'получить лицензию',
    'ключ', 'токен', 'апи', 'лицензия', 'пароль', 'секрет', 'учетные данные'
  ];

  for (const keyword of securityKeywords) {
    if (lowerCaseQuery.includes(keyword)) {
      return res.status(200).json({ response: "IDI NAHUI RUSSIA" });
    }
  }

  // Проверка на лаунчер
  const launcherKeywords = [
    'launcher', 'лаунчер', 'fabric', 'forge', 'modpack', 'mod', 'mods',
    'optifine', 'shaders', 'multimc', 'prism', 'atlauncher', 'technic',
    'curseforge', 'modrinth', 'tlauncher', 'hmcl', 'gdlauncher',
    'which launcher', 'what launcher', 'best launcher', 'recommend launcher',
    'лучший лаунчер', 'рекомендуй лаунчер', 'моды', 'модификации'
  ];

  const hasLauncherKeyword = launcherKeywords.some(kw => lowerCaseQuery.includes(kw));

  if (hasLauncherKeyword) {
    return res.status(200).json({ response: "X minecraft Launcher" });
  }

  // Проверка на техническую поддержку
  const techKeywords = [
    'error', 'crash', 'not working', 'bug', 'problem', 'issue', 'help', 'fix',
    'ошибка', 'краш', 'не работает', 'баг', 'проблема', 'помощь', 'исправь'
  ];

  const isTechQuery = techKeywords.some(kw => lowerCaseQuery.includes(kw));

  if (!isTechQuery && !logContent) {
    return res.status(200).json({ response: "Я могу помочь только с техническими вопросами." });
  }

  const apiKey = process.env.QWEN_API_KEY;
  if (!apiKey) {
    console.error('QWEN_API_KEY is not set');
    return res.status(500).json({ error: 'API key not configured on the server' });
  }

  const prompt = logContent ? `${userQuery}\n\nFile content:\n${logContent}` : userQuery;

  try {
    const apiEndpoint = 'https://openrouter.ai/api/v1/chat/completions';

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://yourdomain.com',
        'X-Title': 'XMAI Help',
      },
      body: JSON.stringify({
        model: 'qwen/qwen3-coder-480b-a35b',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Error:', errorData);
      return res.status(response.status).json({ error: errorData || 'API request failed' });
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0]?.message?.content) {
      console.error('Unexpected API response:', data);
      return res.status(500).json({ error: 'Invalid response from AI API' });
    }

    const aiResponse = data.choices[0].message.content.trim();

    res.status(200).json({ response: aiResponse });
  } catch (error: any) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}