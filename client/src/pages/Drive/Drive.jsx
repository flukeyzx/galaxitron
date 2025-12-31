import { useEffect, useState } from "react";
import { DriveSidebar } from "./components/DriveSidebar";
import { DriveHeader } from "./components/DriveHeader";
import { DriveBreadcrumbs } from "./components/DriveBreadcrumbs";
import { FileGrid } from "./components/FileGrid";
import { RenameItemDialog } from "./components/RenameItemDialog";
import { DeleteDialog } from "./components/DeleteDialog";
import { useQuery } from "@tanstack/react-query";
import { getFolderItems, getFolderPath } from "./api/drive.api";

const Drive = () => {
  const [currentFolderId, setCurrentFolderId] = useState(() => {
    const saved = sessionStorage.getItem("drive_currentFolderId");
    return saved === "null" ? null : saved;
  });
  const [selectedItemId, setSelectedItemId] = useState(() => null);

  const [viewMode, setViewMode] = useState(() => {
    return sessionStorage.getItem("drive_viewMode") || "grid";
  });

  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [itemToRename, setItemToRename] = useState(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const { data: items, isLoading: isLoadingItems } = useQuery({
    queryKey: ["getFolderItems", currentFolderId],
    queryFn: async () => await getFolderItems(currentFolderId),
    select: (res) => res.data,
  });

  const { data: breadcrumbs, isLoading: isLoadingBreadcrumbs } = useQuery({
    queryKey: ["getFolderPath", currentFolderId],
    queryFn: async () => await getFolderPath(currentFolderId),
    select: (res) => res.data,
  });

  useEffect(() => {
    sessionStorage.setItem("drive_currentFolderId", currentFolderId);
  }, [currentFolderId]);

  useEffect(() => {
    sessionStorage.setItem("drive_viewMode", viewMode);
  }, [viewMode]);

  const navigateBack = () => {
    if (!breadcrumbs.length) return;

    const parent =
      breadcrumbs.length > 1 ? breadcrumbs[breadcrumbs.length - 2] : null;

    setCurrentFolderId(parent?.id ?? null);
  };

  const createFolder = ({ name, color }) => {
    const item = {
      id: crypto.randomUUID(),
      name: name || "New Folder",
      type: "FOLDER",
      parentId: currentFolderId,
      color: color || "#fff",
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      itemCount: 0,
    };

    setItems((prev) => [...prev, item]);
  };

  const uploadFile = (file) => {
    const item = {
      id: crypto.randomUUID(),
      name: file.name,
      type: "FILE",
      parentId: currentFolderId,
      color: "#fff",
      tags: [],
      mimeType: file.name.split(".").pop(),
      createdAt: new Date(),
      updatedAt: new Date(),
      size: file.size,
    };

    setItems((prev) => [...prev, item]);
  };

  const initiateDelete = (id) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      setItemToDelete(item);
      setDeleteDialogOpen(true);
    }
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      const findAllDescendants = (parentId) => {
        const children = items.filter((item) => item.parentId === parentId);
        let ids = children.map((child) => child.id);

        children.forEach((child) => {
          if (child.type === "FOLDER") {
            ids = [...ids, ...findAllDescendants(child.id)];
          }
        });

        return ids;
      };

      const idsToDelete = [
        itemToDelete.id,
        ...findAllDescendants(itemToDelete.id),
      ];

      setItems((prev) => prev.filter((item) => !idsToDelete.includes(item.id)));

      if (selectedItemId && idsToDelete.includes(selectedItemId)) {
        setSelectedItemId(null);
      }

      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  const initiateRename = (id) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      setItemToRename(item);
      setRenameDialogOpen(true);
    }
  };

  const renameItem = (newName) => {
    if (itemToRename) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === itemToRename.id ? { ...item, name: newName } : item
        )
      );
      setItemToRename(null);
    }
  };

  const openFolder = (id) => {
    setCurrentFolderId(id);
    setSelectedItemId(null);
  };

  const currentItems = items?.filter(
    (item) => item.parentId === currentFolderId
  );

  return (
    <div className="flex h-full w-full text-white overflow-hidden font-sans col-span-2">
      <DriveSidebar onCreateFolder={createFolder} onUploadFile={uploadFile} />

      <div className="flex-1 flex flex-col h-full relative z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

        <DriveHeader viewMode={viewMode} setViewMode={setViewMode} />

        <DriveBreadcrumbs
          breadcrumbs={breadcrumbs || []}
          onNavigate={openFolder}
          onBack={navigateBack}
        />

        <FileGrid
          items={currentItems || []}
          onFolderClick={openFolder}
          viewMode={viewMode}
          onDelete={initiateDelete}
          onRename={initiateRename}
          isLoading={isLoadingItems}
        />

        <RenameItemDialog
          open={renameDialogOpen}
          onOpenChange={setRenameDialogOpen}
          currentName={itemToRename?.name}
          onRename={renameItem}
        />

        <DeleteDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          itemToDelete={itemToDelete}
          onConfirm={confirmDelete}
        />
      </div>
    </div>
  );
};

export default Drive;
