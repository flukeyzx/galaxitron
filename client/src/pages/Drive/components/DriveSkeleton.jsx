import { Skeleton } from "@/components/ui/skeleton";
import GlassCard from "@/components/ui/glass-card";

export const DriveSkeleton = ({ viewMode }) => {
  if (viewMode === "list") {
    return (
      <GlassCard className="max-w-full">
        <div className="grid grid-cols-13 gap-4 px-4 py-3 border-b border-slate-800/50">
          <Skeleton className="col-span-6 h-4 w-24 bg-slate-800/50" />
          <Skeleton className="col-span-2 h-4 w-16 bg-slate-800/50" />
          <Skeleton className="col-span-3 h-4 w-24 bg-slate-800/50" />
          <Skeleton className="col-span-2 h-4 w-16 bg-slate-800/50" />
        </div>

        <div className="space-y-1 mt-2 p-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="grid grid-cols-13 gap-4 px-4 py-3 rounded-lg items-center"
            >
              <div className="col-span-6 flex items-center gap-3">
                <Skeleton className="h-5 w-5 rounded bg-slate-800/50" />
                <Skeleton className="h-4 w-48 bg-slate-800/50" />
              </div>
              <div className="col-span-2 flex items-center gap-1">
                <Skeleton className="h-7 w-7 rounded-full bg-slate-800/50" />
                <Skeleton className="h-4 w-8 bg-slate-800/50" />
              </div>
              <Skeleton className="col-span-3 h-4 w-24 bg-slate-800/50" />
              <Skeleton className="col-span-2 h-4 w-12 ml-auto bg-slate-800/50" />
            </div>
          ))}
        </div>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-8">
      <section>
        <Skeleton className="h-6 w-24 mb-4 bg-slate-800/50" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex flex-col justify-between rounded-2xl bg-slate-800/30 p-4 border border-white/5 h-[100px]"
            >
              <div className="flex justify-between items-start">
                <Skeleton className="h-8 w-8 rounded-xl bg-slate-700/50" />
                <Skeleton className="h-6 w-6 rounded-full bg-slate-700/50" />
              </div>
              <div>
                <Skeleton className="h-4 w-32 mb-2 bg-slate-700/50" />
                <Skeleton className="h-3 w-16 bg-slate-700/50" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <Skeleton className="h-6 w-32 mb-4 bg-slate-800/50" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex flex-col justify-between rounded-2xl bg-slate-800/30 p-4 border border-white/5 h-40"
            >
              <div className="flex justify-between items-start">
                <Skeleton className="h-8 w-8 rounded bg-slate-700/50" />
                <Skeleton className="h-6 w-6 rounded-full bg-slate-700/50" />
              </div>
              <Skeleton className="flex-1 my-3 bg-slate-900/50 rounded-lg" />
              <div>
                <Skeleton className="h-4 w-32 mb-2 bg-slate-700/50" />
                <Skeleton className="h-3 w-24 bg-slate-700/50" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
