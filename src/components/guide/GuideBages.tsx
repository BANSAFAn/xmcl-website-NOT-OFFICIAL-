import { Badge } from "@/components/ui/badge";

export function UnderConstructionBadge({
  children,
  size = "default",
}: {
  children?: React.ReactNode;
  size?: "small" | "default" | "large";
}) {
  const sizeClasses = {
    small: "text-[10px] px-1.5 py-0.5",
    default: "text-xs px-2 py-1",
    large: "text-sm px-2.5 py-1.5",
  };

  const sizeClass = sizeClasses[size] || sizeClasses.default;

  return (
    <Badge
      className={`inline-flex items-center gap-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 no-underline hover:no-underline focus:no-underline active:no-underline pointer-events-none ${sizeClass}`}
    >
      <span className="flex-none text-orange-500 leading-none">🚧</span>
      {children && <span className={`font-medium`}>{children}</span>}
      {!children && <span className={`font-medium`}>Under Construction</span>}
    </Badge>
  );
}

export function GreenBadge({
  children,
  showEmoji = false,
}: {
  children?: React.ReactNode;
  showEmoji?: boolean;
}) {
  return (
    <Badge className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-500 pointer-events-none text-xs w-fit">
      {children && (
        <span className="text-xs font-medium whitespace-nowrap flex items-center">
          {showEmoji && <span className="flex-none leading-none">✅</span>}
          <span className="ml-1">{children}</span>
        </span>
      )}
      {!children && (
        <span className="text-xs font-medium whitespace-nowrap flex items-center">
          {showEmoji && <span className="flex-none leading-none">✅</span>}
          <span className="ml-1">Success</span>
        </span>
      )}
    </Badge>
  );
}

export function YellowBadge({
  children,
  showEmoji = false,
}: {
  children?: React.ReactNode;
  showEmoji?: boolean;
}) {
  return (
    <Badge className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 pointer-events-none text-xs w-fit">
      {children && (
        <span className="text-xs font-medium whitespace-nowrap flex items-center">
          {showEmoji && <span className="flex-none leading-none">⚠️</span>}
          <span className="ml-1">{children}</span>
        </span>
      )}
      {!children && (
        <span className="text-xs font-medium whitespace-nowrap flex items-center">
          {showEmoji && <span className="flex-none leading-none">⚠️</span>}
          <span className="ml-1">Warning</span>
        </span>
      )}
    </Badge>
  );
}

export function RedBadge({
  children,
  showEmoji = false,
}: {
  children?: React.ReactNode;
  showEmoji?: boolean;
}) {
  return (
    <Badge className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 pointer-events-none text-xs w-fit">
      {children && (
        <span className="text-xs font-medium whitespace-nowrap flex items-center">
          {showEmoji && <span className="flex-none leading-none">❌</span>}
          <span className="ml-1">{children}</span>
        </span>
      )}
      {!children && (
        <span className="text-xs font-medium whitespace-nowrap flex items-center">
          {showEmoji && <span className="flex-none leading-none">❌</span>}
          <span className="ml-1">Error</span>
        </span>
      )}
    </Badge>
  );
}
