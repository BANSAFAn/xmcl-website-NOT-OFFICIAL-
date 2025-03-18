
import { ExternalLink } from "lucide-react";

interface ErrorDisplayProps {
  errorText: string;
  viewOnGithubText: string;
}

export const ErrorDisplay = ({ errorText, viewOnGithubText }: ErrorDisplayProps) => {
  return (
    <div className="text-center py-20">
      <p className="text-red-400 mb-4">{errorText}</p>
      <a 
        href="https://github.com/Voxelum/x-minecraft-launcher/releases" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors"
      >
        <ExternalLink size={16} className="mr-2" />
        {viewOnGithubText}
      </a>
    </div>
  );
};
