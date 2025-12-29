import React from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
  ChevronRight,
  LayoutGrid,
  List,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const DriveHeader = ({ viewMode, setViewMode }) => {
  return (
    <div className="flex h-20 items-center justify-between border-b border-slate-800/50 px-8 py-4 bg-background/50 backdrop-blur-xl sticky top-0 z-20">
      <div className="flex items-center justify-center max-xl:hidden">
        <h1 className="text-3xl tracking-widest gradient-heading">
          Galaxitron
        </h1>
      </div>

      <div className="flex items-center justify-center gap-6">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search in Drive..."
            className="h-11 w-full rounded-full border border-slate-800 bg-slate-900/50 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-full h-11 px-6"
          >
            <Filter className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-full h-11 px-6"
          >
            <ArrowUpDown className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center gap-1 bg-slate-900/50 rounded-full p-1 border border-slate-800">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode("list")}
            className={`rounded-full h-6 w-6 ${
              viewMode === "list"
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode("grid")}
            className={`rounded-full h-6 w-6 ${
              viewMode === "grid"
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
