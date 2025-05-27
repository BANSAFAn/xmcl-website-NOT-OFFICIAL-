
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import { useState } from "react";
import { MatrixLoading } from "@/components/changelogs/MatrixLoading";
import { ReleaseItem } from "@/components/changelogs/ReleaseItem";
import { ChangelogHeader } from "@/components/changelogs/ChangelogHeader";
import { ErrorDisplay } from "@/components/changelogs/ErrorDisplay";
import { VersionMap } from "@/components/changelogs/VersionMap";
import { VersionFilter } from "@/components/changelogs/VersionFilter";
import { useChangelogLanguage } from "@/components/changelogs/useChangelogLanguage";
import { fetchReleases, formatDate, cleanChangelogContent } from "@/components/changelogs/utils";
import { Release } from "@/components/changelogs/types";

const Changelogs = () => {
  const { text } = useChangelogLanguage();
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const { data: releases, isLoading, error } = useQuery({
    queryKey: ['githubReleases'],
    queryFn: fetchReleases,
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false
  });

  const handleVersionSelect = (version: string) => {
    setSelectedVersion(selectedVersion === version ? null : version);
  };

  const getFilteredReleases = (filter: string) => {
    if (!releases) return [];
    
    switch (filter) {
      case 'latest':
        return releases.slice(0, 1);
      case 'newest':
        return releases.slice(0, 5);
      case 'oldest':
        return releases.slice(-5).reverse();
      default:
        return releases;
    }
  };

  const displayedReleases = selectedVersion 
    ? releases?.filter(release => release.tag_name === selectedVersion)
    : getFilteredReleases(selectedFilter);

  return (
    <div className="min-h-screen bg-minecraft-dark-blue">
      <Navbar />
      
      <div className="pt-32 pb-20 relative">
        {/* Enhanced background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 left-20 w-64 h-64 bg-blue-500/10 rounded-full filter blur-[80px] opacity-30 animate-pulse-slow"></div>
          <div className="absolute bottom-40 right-20 w-80 h-80 bg-purple-500/10 rounded-full filter blur-[100px] opacity-30 animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full filter blur-[120px] opacity-20"></div>
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
            <div className="max-w-4xl mx-auto">
              {/* Version Filter */}
              {releases && (
                <VersionFilter 
                  releases={releases}
                  selectedFilter={selectedFilter}
                  onFilterChange={setSelectedFilter}
                />
              )}

              {/* Version Map */}
              {releases && (
                <VersionMap 
                  releases={releases}
                  selectedVersion={selectedVersion}
                  onVersionSelect={handleVersionSelect}
                />
              )}

              {/* Release items */}
              <div className="space-y-12">
                {displayedReleases?.map((release: Release, index: number) => {
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Changelogs;
