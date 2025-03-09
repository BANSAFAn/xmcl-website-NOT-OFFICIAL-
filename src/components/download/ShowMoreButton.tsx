
interface ShowMoreButtonProps {
  showAllOptions: boolean;
  setShowAllOptions: (show: boolean) => void;
  totalOptions: number;
}

export function ShowMoreButton({ 
  showAllOptions, 
  setShowAllOptions, 
  totalOptions 
}: ShowMoreButtonProps) {
  // Only show button if there are more than 3 options
  if (totalOptions <= 3) return null;

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={() => setShowAllOptions(!showAllOptions)}
        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 text-white/80 hover:text-white"
      >
        {showAllOptions ? "Show Less Options" : "Show All Options"}
      </button>
    </div>
  );
}
