import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Tag, Github, Download } from 'lucide-react';
import { PageTransition } from '@/components/PageTransition';
import { useTranslation } from '@/hooks/useTranslation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const stripDownloadsSection = (md: string) => {
  if (!md) return md;
  // Remove any section that starts with a heading named "Downloads"
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

const ModernChangelog: React.FC = () => {
  const { t } = useTranslation();
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-10">
          <header className="mb-10 text-center">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">{t('changelog.title')}</h1>
            <p className="text-muted-foreground mt-3">{t('changelog.subtitle')}</p>
            <div className="mt-5">
              <Button variant="outline" onClick={() => window.open('https://github.com/Voxelum/x-minecraft-launcher/releases', '_blank')}>
                <Github className="w-4 h-4 mr-2" /> {t('issues.viewOnGitHub')}
              </Button>
            </div>
          </header>

          {isLoading && (
            <div className="text-center py-20">{t('changelog.loadingChangelog')}</div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-destructive mb-4">{t('changelog.errorLoading')}</p>
              <Button variant="outline" onClick={() => window.open('https://github.com/Voxelum/x-minecraft-launcher/releases', '_blank')}>
                <Github className="w-4 h-4 mr-2" /> {t('issues.viewOnGitHub')}
              </Button>
            </div>
          )}

          {!isLoading && !error && (
            <section className="space-y-6 max-w-5xl mx-auto">
              {items.map((release: any) => {
                const downloads = release.assets?.reduce((s: number, a: any) => s + (a.download_count || 0), 0) || 0;
                const isExpanded = expandedId === release.id;
                const body: string = release.body || '';
                const strippedBody = stripDownloadsSection(body);
                const links = extractLinks(strippedBody);
                const preview = `${strippedBody.slice(0, 400)}${strippedBody.length > 400 ? '...' : ''}`;
                return (
                  <Card key={release.id} className="p-6">
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          <div className="flex-1 space-y-2">
                            <h2 className="text-xl font-semibold flex items-center gap-3">
                              {release.name || release.tag_name}
                              {release.prerelease && (
                                <Badge variant="secondary">{t('changelog.prereleases')}</Badge>
                              )}
                            </h2>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <span className="inline-flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {formatDate(release.published_at)}
                              </span>
                              <span className="inline-flex items-center gap-2">
                                <Tag className="w-4 h-4" />
                                <span className="font-mono">{release.tag_name}</span>
                              </span>
                            </div>
                          </div>
                          <Button variant="outline" onClick={() => window.open(release.html_url, '_blank')}>
                            <Github className="w-4 h-4 mr-2" /> {t('issues.viewOnGitHub')}
                          </Button>
                        </div>

                          <div className="space-y-3">
                            <div className="prose prose-sm dark:prose-invert max-w-none bg-muted/30 rounded-lg p-4 border">
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  a: ({ node, ...props }) => (
                                    <a
                                      {...props}
                                      className="text-primary underline underline-offset-4 hover:opacity-90"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    />
                                  ),
                                  code: ({ node, ...props }) => (
                                    <code {...props} className="px-1.5 py-0.5 rounded bg-muted" />
                                  ),
                                }}
                              >
                                {isExpanded ? strippedBody : preview}
                              </ReactMarkdown>
                              {strippedBody.length > 400 && (
                                <Button 
                                  variant="link" 
                                  className="p-0 h-auto font-medium text-sm mt-2" 
                                  onClick={() => setExpandedId(isExpanded ? null : release.id)}
                                >
                                  {isExpanded ? t('common.close') : `${t('common.view')} ${t('downloadSection.releaseNotes')}`}
                                </Button>
                              )}
                              {links.length > 0 && (
                                <details className="mt-3">
                                  <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                                    {t('common.open')} links ({links.length})
                                  </summary>
                                  <div className="mt-2 flex flex-wrap gap-2">
                                    {links.map((l) => (
                                      <Button key={l.href} asChild size="sm" variant="secondary">
                                        <a href={l.href} target="_blank" rel="noopener noreferrer">{l.text}</a>
                                      </Button>
                                    ))}
                                  </div>
                                </details>
                              )}
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

export default ModernChangelog;
