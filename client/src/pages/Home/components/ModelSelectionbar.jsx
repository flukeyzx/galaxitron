import { useState } from "react";
import galaxyLogo from "@/assets/galaxy-logo.png";
import c2c from "@/assets/c2c.png";
import c2d from "@/assets/c2d.png";
import d2m from "@/assets/d2m.png";
import m2q from "@/assets/m2q.png";
import q2d from "@/assets/q2d.png";
import q2f from "@/assets/q2f.png";
import drive from "@/assets/drive.png";
import { cn } from "@/lib/utils";
import { LogOut, User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const models = [
  { id: "drive", src: drive, alt: "Drive" },
  { id: "c2c", src: c2c, alt: "C2C" },
  { id: "c2d", src: c2d, alt: "C2D" },
  { id: "d2m", src: d2m, alt: "D2M" },
  { id: "m2q", src: m2q, alt: "M2Q" },
  { id: "q2d", src: q2d, alt: "Q2D" },
  { id: "q2f", src: q2f, alt: "Q2F" },
];

const ModelSelectionbar = ({ selectedModel, onSelectModel }) => {
  const navigate = useNavigate();

  return (
    <aside className="flex flex-col items-center py-6 border-r border-primary/10 shadow-lg shadow-primary/20 bg-black/20 backdrop-blur-sm">
      <div className="mb-6 px-4">
        <img
          src={galaxyLogo}
          alt="Galaxy Logo"
          className="w-32 object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
        />
      </div>

      <div className="flex flex-col gap-4 w-full px-6">
        {models.map((model) => (
          <button
            key={model.id}
            onClick={() => onSelectModel(model.id)}
            className={cn(
              "cursor-pointer group relative flex items-center justify-center p-3 rounded-2xl transition-all duration-300",
              "hover:bg-white/5",
              selectedModel === model.id
                ? "bg-white/10 shadow-[0_0_20px_rgba(168,85,247,0.3)] ring-1 ring-white/20"
                : "opacity-60 hover:opacity-100"
            )}
          >
            {selectedModel === model.id && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-linear-to-b from-indigo-500 to-blue-500 rounded-r-full" />
            )}

            <div>
              <img
                src={model.src}
                alt={model.alt}
                className={cn(
                  "w-10 h-10 object-contain transition-transform duration-300",
                  "group-hover:scale-110",
                  selectedModel === model.id &&
                    "scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                )}
              />

              <span>{model.alt}</span>
            </div>

            <div className="absolute left-full ml-4 px-3 py-1.5 rounded-lg bg-black/80 border border-white/10 text-xs font-medium text-white opacity-0 -translate-x-2 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap z-50 backdrop-blur-md">
              {model.alt}
            </div>
          </button>
        ))}
      </div>

      <Popover>
        <PopoverTrigger className="flex items-center gap-2 mt-auto mb-6 cursor-pointer p-3 rounded-2xl">
          <div className="flex border-2 border-white/80 shadow-lg shadow-muted-foreground/40 rounded-full p-1">
            <User size={22} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm">John Doe</span>
            <span className="text-xs text-white/60">Free</span>
          </div>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="center"
          sideOffset={6}
          className="w-34 flex flex-col p-1.5"
        >
          <Button
            onClick={() => navigate("/profile")}
            variant={"ghost"}
            className="text-base rounded-xl"
          >
            <User className="h-5 w-5" />
            Profile
          </Button>
          <Button
            variant={"ghost"}
            className="text-base rounded-xl text-destructive/75 hover:bg-destructive/20 hover:text-destructive"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </PopoverContent>
      </Popover>
    </aside>
  );
};

export default ModelSelectionbar;
