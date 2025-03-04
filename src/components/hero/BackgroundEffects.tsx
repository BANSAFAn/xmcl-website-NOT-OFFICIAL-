
export function BackgroundEffects() {
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-minecraft-darker-blue via-minecraft-dark-blue to-minecraft-dark-blue">
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-accent/20 rounded-full filter blur-[80px] opacity-40 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-[100px] opacity-30 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full filter blur-[70px] opacity-20 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
    </div>
  );
}
