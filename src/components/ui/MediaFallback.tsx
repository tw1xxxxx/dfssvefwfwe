export function MediaFallback({ className }: { className?: string }) {
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-white/5 ${className}`}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Pulsing circle */}
      <div className="relative z-10">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/10 border-t-white/40" />
      </div>
    </div>
  );
}
