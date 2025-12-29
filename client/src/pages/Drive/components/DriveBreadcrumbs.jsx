import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DriveBreadcrumbs = ({ breadcrumbs, onNavigate, onBack }) => {
  return (
    <div className="flex h-14 items-center gap-4 px-6 border-b border-slate-800/50 bg-background/45 backdrop-blur-md sticky top-20 z-10 w-full animate-in slide-in-from-top-2 duration-300">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          disabled={breadcrumbs.length <= 1}
          className="h-8 w-8 px-6 rounded-full text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30"
        >
          <ChevronLeft size={20} />
        </Button>
        <div className="h-4 w-px bg-slate-800 mx-2" />
      </div>

      <div className="flex items-center gap-2 text-slate-400">
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.id} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="h-4 w-4 text-slate-600" />}
            <button
              onClick={() =>
                index < breadcrumbs.length - 1 && onNavigate(crumb.id)
              }
              disabled={index === breadcrumbs.length - 1}
              className={`transition-colors text-sm ${
                index === breadcrumbs.length - 1
                  ? "font-semibold text-white cursor-default"
                  : "hover:text-blue-400 cursor-pointer"
              }`}
            >
              {crumb.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
