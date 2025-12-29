import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Folder } from "lucide-react";
import { Label } from "@/components/ui/label";

const COLORS = [
  "#3b82f6", // blue-500
  "#ef4444", // red-500
  "#22c55e", // green-500
  "#eab308", // yellow-500
  "#a855f7", // purple-500
  "#ec4899", // pink-500
  "#f97316", // orange-500
  "#06b6d4", // cyan-500
  "#64748b", // slate-500
  "#ffffff", // white
];

export const CreateFolderDialog = ({ open, onOpenChange, onCreate }) => {
  const [folderName, setFolderName] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const handleSubmit = () => {
    onCreate({ name: folderName, color: selectedColor });
    setFolderName("");
    setSelectedColor(COLORS[0]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Folder
              className="h-5 w-5 fill-current"
              style={{ color: selectedColor }}
            />
            Create Folder
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex flex-col gap-2">
            <Label className="pl-2">Name</Label>

            <Input
              icon={<Folder />}
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Untitled Folder"
              className=" focus-visible:ring-blue-500/50"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium text-slate-300">Color</label>
            <div className="flex flex-wrap gap-3">
              {COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`cursor-pointer h-8 w-8 rounded-full transition-transform hover:scale-110 focus:outline-hidden ${
                    selectedColor === color
                      ? "ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110"
                      : ""
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-slate-400 hover:text-white hover:bg-white/10"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="default">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
