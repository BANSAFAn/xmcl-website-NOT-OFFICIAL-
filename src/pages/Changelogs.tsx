
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";

import { MatrixLoading } from "@/components/changelogs/MatrixLoading";
import { ReleaseItem } from "@/components/changelogs/ReleaseItem";
import { ChangelogHeader } from "@/components/changelogs/ChangelogHeader";
import { ErrorDisplay } from "@/components/changelogs/ErrorDisplay";
import { useChangelogLanguage } from "@/components/changelogs/useChangelogLanguage";
import { fetchReleases, formatDate, cleanChangelogContent } from "@/components/changelogs/utils";
import { Release } from "@/components/changelogs/types";

const Changelogs = () => {
  const { text } = useChangelogLanguage();

  const { data: releases, isLoading, error } = useQuery({
    queryKey: ['githubReleases'],
    queryFn: fetchReleases,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false
  });

  return (
    <div className="min-h-screen bg-minecraft-dark-blue">
      <Navbar />
      
      <div className="pt-32 pb-20 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-20 w-64 h-64 bg-blue-500/10 rounded-full filter blur-[80px] opacity-30"></div>
          <div className="absolute bottom-40 right-20 w-80 h-80 bg-purple-500/10 rounded-full filter blur-[100px] opacity-30"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <ChangelogHeader 
            title={text.title}
            subtitle={text.subtitle}
          />

          {isLoading ? (
            <MatrixLoading />
          ) : error ? (
            <ErrorDisplay 
              errorText={text.error}
              viewOnGithubText={text.viewOnGithub}
            />
          ) : (
            <div className="max-w-3xl mx-auto space-y-14">
              {releases?.map((release: Release, index: number) => {
                const cleanedBody = cleanChangelogContent(release.body);
                
                return (
                  <ReleaseItem
                    key={release.id}
                    release={{...release, body: cleanedBody}}
                    formatDate={formatDate}
                    viewOnGithubText={text.viewOnGithub}
                    index={index}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Changelogs;
