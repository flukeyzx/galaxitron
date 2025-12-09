import { cn } from "@/lib/utils";

const GlassCard = ({ children, className }) => {
  return (
    <div
      className={cn(
        "w-full max-w-md p-8 bg-[rgba(13,25,48,0.4)] backdrop-blur-md rounded-3xl border border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
