import React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import {
  Folder,
  FileText,
  MoreVertical,
  File,
  Trash,
  Pencil,
  Download,
} from "lucide-react";
import GlassCard from "@/components/ui/glass-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const getFileIcon = (mimeType, className = "h-8 w-8") => {
  if (mimeType === "pdf")
    return <FileText className={`${className} text-red-400`} />;
  return <File className={`${className} text-blue-400`} />;
};

const FolderCard = ({ item, onDoubleClick, onDelete, onRename }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const color = item.color || "#3b82f6";

  const getBgColor = () => {
    if (isHovered) return color;
    return `${color}33`;
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          onDoubleClick={() => onDoubleClick(item.id)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative flex flex-col justify-between rounded-2xl bg-slate-800/30 p-4 border border-white/5 hover:border-white/10 hover:bg-slate-800/60 transition-all cursor-pointer backdrop-blur-sm"
          style={{ borderColor: isHovered ? `${color}80` : "" }}
        >
          <div className="flex items-start justify-between">
            <div
              className="rounded-xl p-3 transition-colors duration-200"
              style={{
                backgroundColor: getBgColor(),
                color: isHovered ? "#fff" : color,
              }}
            >
              <Folder className="h-6 w-6 fill-current" />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="text-slate-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-white/10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="h-5 w-5" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-40 p-1"
                align="end"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => onRename(item.id)}
                  className="cursor-pointer w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-slate-700/50 text-slate-200 transition-colors"
                >
                  <Pencil className="h-4 w-4" /> Rename
                </button>
                <button
                  disabled
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm text-slate-500 cursor-not-allowed"
                >
                  <Download className="h-4 w-4" /> Download
                </button>
                <div className="h-px bg-white/10 my-1" />
                <button
                  onClick={() => onDelete(item.id)}
                  className="cursor-pointer w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash className="h-4 w-4" /> Delete
                </button>
              </PopoverContent>
            </Popover>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold text-slate-200 truncate">
              {item.name}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {item.itemCount || 0} items
            </p>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => onRename(item.id)}>
          <Pencil className="mr-2 h-4 w-4" /> Rename
        </ContextMenuItem>
        <ContextMenuItem disabled>
          <Download className="mr-2 h-4 w-4" /> Download
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          onClick={() => onDelete(item.id)}
          className="text-red-500 focus:text-red-500 hover:text-red-500"
        >
          <Trash className="mr-2 h-4 w-4" /> Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

const FileCard = ({ item, onDelete, onRename }) => (
  <ContextMenu>
    <ContextMenuTrigger>
      <div className="group relative flex flex-col justify-between rounded-2xl bg-slate-800/30 p-4 border border-white/5 hover:border-blue-500/50 hover:bg-slate-800/60 transition-all cursor-pointer backdrop-blur-sm">
        <div className="flex items-start justify-between">
          <div className="p-2">{getFileIcon(item.mimeType)}</div>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="text-slate-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="h-5 w-5" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-40 p-1"
              align="end"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => onRename(item.id)}
                className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-slate-700/50 text-slate-200 transition-colors"
              >
                <Pencil className="h-4 w-4" /> Rename
              </button>
              <button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-slate-700/50 text-slate-200 transition-colors">
                <Download className="h-4 w-4" /> Download
              </button>
              <div className="h-px bg-white/10 my-1" />
              <button
                onClick={() => onDelete(item.id)}
                className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors"
              >
                <Trash className="h-4 w-4" /> Delete
              </button>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex-1 my-2 rounded-lg bg-slate-900/50 flex items-center justify-center overflow-hidden relative group-hover:scale-[1.02] transition-transform">
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent opacity-50" />
        </div>

        <div>
          <h3 className="font-semibold text-slate-200 truncate text-sm">
            {item.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1">2.4 MB • Today</p>
        </div>
      </div>
    </ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem onClick={() => onRename(item.id)}>
        <Pencil className="mr-2 h-4 w-4" /> Rename
      </ContextMenuItem>
      <ContextMenuItem>
        <Download className="mr-2 h-4 w-4" /> Download
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem
        onClick={() => onDelete(item.id)}
        className="text-red-500 focus:text-red-500 hover:text-red-500"
      >
        <Trash className="mr-2 h-4 w-4" /> Delete
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
);

const ListView = ({ items, onFolderClick, onDelete, onRename }) => (
  <GlassCard className="max-w-full">
    <div className="grid grid-cols-13 gap-4 px-4 py-3 border-b border-slate-800/50 text-sm font-semibold text-slate-300 uppercase tracking-wider sticky top-0 backdrop-blur-md z-10">
      <div className="col-span-6 pl-2">Name</div>
      <div className="col-span-2">Owner</div>
      <div className="col-span-3">Last Modified</div>
      <div className="col-span-2 text-right pr-4">File Size</div>
    </div>

    <div className="space-y-1 mt-2">
      {items.map((item) => (
        <ContextMenu key={item.id}>
          <ContextMenuTrigger>
            <div
              onDoubleClick={() =>
                item.type === "folder" && onFolderClick(item.id)
              }
              className="grid grid-cols-13 gap-4 px-4 py-3 rounded-lg hover:bg-slate-700/40 text-base text-slate-300 items-center cursor-pointer transition-colors group border border-transparent hover:border-slate-600"
            >
              <div className="col-span-6 flex items-center gap-3 overflow-hidden">
                <div
                  className="shrink-0 transition-colors"
                  style={{
                    color:
                      item.type === "folder"
                        ? item.color || "#3b82f6"
                        : undefined,
                  }}
                >
                  {item.type === "folder" ? (
                    <Folder className="h-5 w-5 fill-current" />
                  ) : (
                    getFileIcon(item.mimeType, "h-5 w-5")
                  )}
                </div>
                <span className="truncate font-medium text-slate-200 group-hover:text-white transition-colors">
                  {item.name}
                </span>
              </div>

              <div className="col-span-2 flex items-center gap-1">
                <div className="h-7 w-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">
                  ME
                </div>
                <span className="text-slate-400 text-sm">Me</span>
              </div>

              <div className="col-span-3 text-slate-400 text-sm">
                {item.updatedAt.toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>

              <div className="col-span-2 text-right pr-4 text-slate-400 text-sm font-mono">
                {item.type === "folder" ? "-" : "2.4 MB"}
              </div>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onClick={() => onRename(item.id)}>
              <Pencil className="mr-2 h-4 w-4" /> Rename
            </ContextMenuItem>
            {item.type !== "folder" && (
              <ContextMenuItem>
                <Download className="mr-2 h-4 w-4" /> Download
              </ContextMenuItem>
            )}
            <ContextMenuSeparator />
            <ContextMenuItem
              onClick={() => onDelete(item.id)}
              className="text-red-500 focus:text-red-500 hover:text-red-500"
            >
              <Trash className="mr-2 h-4 w-4" /> Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ))}
    </div>
  </GlassCard>
);

export const FileGrid = ({
  items,
  onFolderClick,
  viewMode = "grid",
  onDelete,
  onRename,
}) => {
  const folders = items.filter((i) => i.type === "folder");
  const files = items.filter((i) => i.type === "file");

  if (items.length === 0) {
    return (
      <div className="flex h-[calc(100vh-200px)] flex-col items-center justify-center text-slate-500 animate-in fade-in duration-500">
        <Folder className="h-16 w-16 mb-4 opacity-20" />
        <p className="text-lg">This folder is empty</p>
        <p className="text-sm opacity-50">Drag files here to upload</p>
      </div>
    );
  }

  return (
    <div className="p-6 overflow-y-auto h-[calc(100vh-160px)] scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
      {viewMode === "list" ? (
        <ListView
          items={items}
          onFolderClick={onFolderClick}
          onDelete={onDelete}
          onRename={onRename}
        />
      ) : (
        <>
          {folders.length > 0 && (
            <section className="mb-8">
              <h3 className="text-lg font-semibold text-slate-300 mb-4 px-1">
                Folders
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {folders.map((folder) => (
                  <FolderCard
                    key={folder.id}
                    item={folder}
                    onDoubleClick={onFolderClick}
                    onDelete={onDelete}
                    onRename={onRename}
                  />
                ))}
              </div>
            </section>
          )}

          {files.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-slate-300 mb-4 px-1">
                Recent Files
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {files.map((file) => (
                  <FileCard
                    key={file.id}
                    item={file}
                    onDelete={onDelete}
                    onRename={onRename}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};
