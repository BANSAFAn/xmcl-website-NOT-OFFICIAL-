
interface ErrorDisplayProps {
  error: Error;
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  return (
    <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl text-center">
      <p className="text-red-400">{error.toString()}</p>
      <p className="mt-2 text-white/80">Please check your internet connection and try again.</p>
    </div>
  );
}
