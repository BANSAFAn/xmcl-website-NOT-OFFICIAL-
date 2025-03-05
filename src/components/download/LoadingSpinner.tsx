
import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 border-4 border-white/20 border-t-accent rounded-full animate-spin"></div>
      <p className="mt-4 text-white/60">Loading download options...</p>
    </div>
  );
}
