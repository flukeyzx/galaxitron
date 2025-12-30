import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Database, Trash2, Cloud, Plus, Folder, FileUp } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CreateFolderDialog } from "./CreateFolderDialog";

const SidebarItem = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`cursor-pointer flex w-full items-center gap-3 rounded-r-full px-6 py-3 text-sm font-medium transition-all duration-200 
      ${
        isActive
          ? "bg-blue-500/10 text-blue-400 border-l-4 border-blue-500"
          : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border-l-4 border-transparent"
      }`}
  >
    <Icon className="h-5 w-5" />
    {label}
  </button>
);

export const DriveSidebar = ({ onCreateFolder, onUploadFile }) => {
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Handle multiple files if needed, for now just taking the first one or iterating
      Array.from(files).forEach((file) => onUploadFile(file));
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex h-full w-[260px] bg-background/50 flex-col gap-6 py-6 pr-4 border-r border-slate-800/50">
      <div className="px-6">
        <h2 className="text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
          <Cloud className="text-blue-500" /> Drive
        </h2>
      </div>

      <div className="flex flex-col gap-1 justify-center">
        <div className="px-6 mb-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="mx-auto bg-white/90 hover:bg-white/70 text-black/90 text-base font-semibold rounded-xl py-5.5! px-10! flex items-center gap-1">
                <Plus size={14} /> New Upload
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-50 p-2" align="start">
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setIsCreateFolderOpen(true)}
                  className="cursor-pointer flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors text-left"
                >
                  <Folder className="h-4 w-4 text-blue-400" />
                  <span>New Folder</span>
                </button>
                <button
                  onClick={triggerFileUpload}
                  className="cursor-pointer flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors text-left"
                >
                  <FileUp className="h-4 w-4 text-green-400" />
                  <span>File Upload</span>
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="mt-2">
          <SidebarItem icon={Database} label="All Files" isActive={true} />
          <SidebarItem icon={Trash2} label="Deleted" />
        </div>
      </div>

      <CreateFolderDialog
        open={isCreateFolderOpen}
        onOpenChange={setIsCreateFolderOpen}
        onCreate={onCreateFolder}
      />

      <input
        type="file"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileUpload}
      />
    </div>
  );
};
