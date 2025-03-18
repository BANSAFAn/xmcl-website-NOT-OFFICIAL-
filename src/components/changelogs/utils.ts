
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export const cleanChangelogContent = (content: string): string => {
  let cleanedContent = content.replace(/## Downloads[\s\S]*?(?=##|$)/, '');
  
  cleanedContent = cleanedContent.replace(/Windows \(x64\):.*/, '');
  cleanedContent = cleanedContent.replace(/Linux \(x64\):.*/, '');
  cleanedContent = cleanedContent.replace(/Linux \(arm64\):.*/, '');
  cleanedContent = cleanedContent.replace(/Mac \(x64\):.*/, '');
  cleanedContent = cleanedContent.replace(/Mac \(arm64\):.*/, '');
  
  return cleanedContent.trim();
};

export const fetchReleases = async () => {
  const response = await fetch('https://api.github.com/repos/Voxelum/x-minecraft-launcher/releases');
  if (!response.ok) {
    throw new Error('Failed to fetch releases');
  }
  return response.json();
};
