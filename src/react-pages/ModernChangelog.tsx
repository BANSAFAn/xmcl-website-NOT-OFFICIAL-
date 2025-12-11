import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Tag, Github, Download, ChevronDown, ChevronUp, ExternalLink, Link2 } from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';
import { useTranslation } from '@/hooks/useTranslation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { AppShell } from '@/components/AppShell';

// Стили для анимированного фона (встроенные через style)
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Градиентный фон */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/70 via-purple-50/70 to-pink-50/70 dark:from-gray-900/90 dark:via-indigo-900/30 dark:to-purple-900/30"></div>
      
      {/* Анимированные частицы */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-indigo-300/10 dark:bg-indigo-500/10 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 80 + 20}px`,
              height: `${Math.random() * 80 + 20}px`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.3,
              filter: 'blur(10px)'
            }}
          />
        ))}
      </div>
      
      {/* Движущиеся линии */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-300/20 to-transparent animate-moveLine"
          style={{ animationDuration: '15s', animationIterationCount: 'infinite' }}
        ></div>
        <div 
          className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-300/20 to-transparent animate-moveLine"
          style={{ animationDuration: '20s', animationIterationCount: 'infinite', animationDelay: '5s' }}
        ></div>
        <div 
          className="absolute top-3/4 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-300/20 to-transparent animate-moveLine"
          style={{ animationDuration: '25s', animationIterationCount: 'infinite', animationDelay: '10s' }}
        ></div>
      </div>
    </div>
  );
};

// Функция для замены ссылок на кнопку "Links"
const replaceLinksWithButton = (md: string, links: { text: string; href: string }[]) => {
  if (!links.length) return md;
  
  // Заменяем каждую ссылку на placeholder
  let result = md;
  links.forEach((link, index) => {
    const placeholder = `[LINK_${index}]`;
    const regex = new RegExp(`\\[([^\]]+)\\]\\(${link.href}\\)`, 'g');
    result = result.replace(regex, placeholder);
  });
  
  // Добавляем кнопку "Links" в конец текста
  const buttonPlaceholder = `\n\n<LINKS_BUTTON />`;
  return result + buttonPlaceholder;
};

const stripDownloadsSection = (md: string) => {
  if (!md) return md;
  const pattern = /(^|\n)#{1,6}\s*Downloads[\s\S]*/i;
  return md.replace(pattern, '');
};

const extractLinks = (md: string) => {
  const links: { text: string; href: string }[] = [];
  const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(md)) !== null) {
    links.push({ text: m[1], href: m[2] });
  }
  const seen = new Set<string>();
  return links.filter((l) => {
    if (seen.has(l.href)) return false;
    seen.add(l.href);
    return true;
  });
};

const truncateUrl = (url: string) => {
  try {
    const urlObj = new URL(url);
    return `${urlObj.hostname}${urlObj.pathname.replace(/\/$/, '')}`;
  } catch {
    return url.length > 30 ? `${url.substring(0, 30)}...` : url;
  }
};

const ModernChangelogContent: React.FC = () => {
  const { t } = useTranslation();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [visibleLinks, setVisibleLinks] = useState<{ [key: string]: boolean }>({});

  const { data: releases, isLoading, error } = useQuery({
    queryKey: ['modern-releases'],
    queryFn: async () => {
      const res = await fetch('https://api.github.com/repos/Voxelum/x-minecraft-launcher/releases?per_page=15');
      if (!res.ok) throw new Error(res.status === 403 ? 'API rate limit exceeded' : 'Failed to fetch releases');
      return res.json();
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  const formatCount = (n: number) => (n >= 1_000_000 ? `${(n/1_000_000).toFixed(1)}M` : n >= 1_000 ? `${(n/1_000).toFixed(1)}K` : `${n}`);

  const items = useMemo(() => releases ?? [], [releases]);

  return (
    <PageTransition>
      <div className="min-h-screen relative overflow-x-hidden">
        <AnimatedBackground />

        <main className="container mx-auto px-4 py-10 relative z-10">
          <header className="mb-12 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              {t('changelog.title')}
            </h1>
            <p className="text-muted-foreground mt-4 text-lg">
              {t('changelog.subtitle')}
            </p>
            <div className="mt-6">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg"
                onClick={() => window.open('https://github.com/Voxelum/x-minecraft-launcher/releases', '_blank')}
              >
                <Github className="w-5 h-5 mr-2" /> {t('issues.viewOnGitHub')}
              </Button>
            </div>
          </header>

          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-16 h-16 bg-indigo-200 dark:bg-indigo-900/50 rounded-full mb-4"></div>
                <div className="h-4 bg-indigo-200 dark:bg-indigo-900/50 rounded w-48"></div>
              </div>
            </div>
          )}

          {error && (
            <div className="max-w-2xl mx-auto text-center py-12 px-4">
              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-8">
                <div className="text-destructive text-2xl mb-4">⚠️</div>
                <h3 className="text-xl font-semibold mb-2">{t('changelog.errorLoading')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('changelog.retryMessage')}
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => window.open('https://github.com/Voxelum/x-minecraft-launcher/releases', '_blank')}
                >
                  <Github className="w-4 h-4 mr-2" /> {t('issues.viewOnGitHub')}
                </Button>
              </div>
            </div>
          )}

          {!isLoading && !error && (
            <section className="space-y-8 max-w-4xl mx-auto">
              {items.map((release: any) => {
                const downloads = release.assets?.reduce((s: number, a: any) => s + (a.download_count || 0), 0) || 0;
                const isExpanded = expandedId === release.id;
                const body: string = release.body || '';
                const strippedBody = stripDownloadsSection(body);
                const links = extractLinks(strippedBody);
                const preview = `${strippedBody.slice(0, 400)}${strippedBody.length > 400 ? '...' : ''}`;

                // Создаем модифицированный текст с кнопкой "Links"
                const modifiedBody = replaceLinksWithButton(strippedBody, links);
                const modifiedPreview = replaceLinksWithButton(preview, links);

                return (
                  <Card 
                    key={release.id} 
                    className="p-0 overflow-hidden shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="p-6">
                      <div className="flex flex-col gap-5">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div className="flex-1 space-y-3">
                            <h2 className="text-2xl font-bold flex items-center gap-3 flex-wrap">
                              {release.name || release.tag_name}
                              {release.prerelease && (
                                <Badge variant="destructive" className="text-xs px-2 py-1">
                                  {t('changelog.prereleases')}
                                </Badge>
                              )}
                            </h2>
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                              <span className="inline-flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {formatDate(release.published_at)}
                              </span>
                              <span className="inline-flex items-center gap-2">
                                <Tag className="w-4 h-4" />
                                <span className="font-mono bg-muted px-2 py-0.5 rounded-md">
                                  {release.tag_name}
                                </span>
                              </span>
                              <span className="inline-flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                {formatCount(downloads)} {t('changelog.downloads')}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => window.open(release.html_url, '_blank')}
                              className="flex items-center gap-2"
                            >
                              <Github className="w-4 h-4" /> {t('issues.viewOnGitHub')}
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="prose prose-sm dark:prose-invert max-w-none bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-gray-700/30 dark:to-gray-800/30 rounded-xl p-5 border border-indigo-100/50 dark:border-gray-700/50 transition-all duration-300">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                a: ({ node, ...props }) => {
                                  // Заменяем все ссылки на пустой элемент — они уже обработаны
                                  return <span />;
                                },
                                code: ({ node, ...props }) => (
                                  <code 
                                    {...props} 
                                    className="px-2 py-1 rounded bg-indigo-100/50 dark:bg-gray-700/50 text-indigo-700 dark:text-indigo-300 font-mono text-sm"
                                  />
                                ),
                                p: ({ node, ...props }) => {
                                  const content = props.children;
                                  // Проверяем, есть ли в параграфе наш плейсхолдер
                                  if (content && typeof content === 'string' && content.includes('<LINKS_BUTTON />')) {
                                    return (
                                      <div className="flex items-center gap-2 mt-2">
                                        <span>{content.replace('<LINKS_BUTTON />', '')}</span>
                                        {links.length > 0 && (
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            className="text-xs px-2 py-1 h-7 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100/50 dark:hover:bg-indigo-900/20"
                                            onClick={() => setVisibleLinks(prev => ({ ...prev, [release.id]: !prev[release.id] }))}
                                          >
                                            <Link2 className="w-3 h-3 mr-1" />
                                            {t('common.links')} ({links.length})
                                          </Button>
                                        )}
                                      </div>
                                    );
                                  }
                                  return <p className="my-2" {...props} />;
                                },
                                h1: ({ node, ...props }) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
                                h2: ({ node, ...props }) => <h3 className="text-lg font-semibold mt-4 mb-2" {...props} />,
                                h3: ({ node, ...props }) => <h3 className="font-medium mt-3 mb-1.5" {...props} />,
                                ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-2" {...props} />,
                                ol: ({ node, ...props }) => <ol className="list-decimal pl-5 my-2" {...props} />,
                                li: ({ node, ...props }) => <li className="my-1" {...props} />,
                              }}
                            >
                              {isExpanded ? modifiedBody : modifiedPreview}
                            </ReactMarkdown>
                            
                            {/* Отображение ссылок при нажатии */}
                            {links.length > 0 && visibleLinks[release.id] && (
                              <div className="mt-3 p-3 bg-indigo-50/50 dark:bg-gray-700/50 rounded-lg border border-indigo-200/50 dark:border-gray-600/50">
                                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                                  <Link2 className="w-4 h-4" />
                                  {t('common.links')} ({links.length})
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {links.map((l, idx) => (
                                    <Button 
                                      key={idx} 
                                      asChild 
                                      size="sm" 
                                      variant="secondary"
                                      className="text-xs px-2 py-1 h-7"
                                    >
                                      <a href={l.href} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="w-3 h-3 mr-1" />
                                        {truncateUrl(l.href)}
                                      </a>
                                    </Button>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {strippedBody.length > 400 && (
                              <Button 
                                variant="ghost" 
                                className="p-0 h-auto font-medium text-sm mt-3 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center gap-1"
                                onClick={() => setExpandedId(isExpanded ? null : release.id)}
                              >
                                {isExpanded ? (
                                  <>
                                    <ChevronUp className="w-4 h-4" /> {t('common.close')}
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className="w-4 h-4" /> {t('common.view')} {t('downloadSection.releaseNotes')}
                                  </>
                                )}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </section>
          )}
        </main>
      </div>
    </PageTransition>
  );
};

export default function ModernChangelog() {
  return (
    <AppShell>
      <ModernChangelogContent />
    </AppShell>
  );
}