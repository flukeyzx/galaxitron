import { useEffect, useState } from "react";
import { DriveSidebar } from "./components/DriveSidebar";
import { DriveHeader } from "./components/DriveHeader";
import { DriveBreadcrumbs } from "./components/DriveBreadcrumbs";
import { FileGrid } from "./components/FileGrid";
import { RenameItemDialog } from "./components/RenameItemDialog";
import { DeleteDialog } from "./components/DeleteDialog";

const ROOT_ID = "root";

const Drive = () => {
  const [items, setItems] = useState(() => {
    const saved = sessionStorage.getItem("drive_items");
    if (saved) {
      return JSON.parse(saved).map((item) => ({
        ...item,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
      }));
    }
    return [
      {
        id: "folder-1",
        name: "My Projects",
        type: "folder",
        parentId: ROOT_ID,
        color: "#3b82f6",
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        itemCount: 12,
      },
      {
        id: "folder-2",
        name: "Documents",
        type: "folder",
        parentId: ROOT_ID,
        color: "#10b981",
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        itemCount: 4,
      },
      {
        id: "file-1",
        name: "Project_Proposal.pdf",
        type: "file",
        parentId: ROOT_ID,
        color: "#fff",
        mimeType: "pdf",
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "file-2",
        name: "design_system_v1.fig",
        type: "file",
        parentId: ROOT_ID,
        color: "#fff",
        mimeType: "fig",
        tags: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  });

  const [currentFolderId, setCurrentFolderId] = useState(() => {
    return sessionStorage.getItem("drive_currentFolderId") || ROOT_ID;
  });

  const [selectedItemId, setSelectedItemId] = useState(null);

  const [viewMode, setViewMode] = useState(() => {
    return sessionStorage.getItem("drive_viewMode") || "grid";
  });

  // Rename Dialog State
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [itemToRename, setItemToRename] = useState(null);

  // Delete Dialog State
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // ... effects ...
  useEffect(() => {
    sessionStorage.setItem("drive_items", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    sessionStorage.setItem("drive_currentFolderId", currentFolderId);
  }, [currentFolderId]);

  useEffect(() => {
    sessionStorage.setItem("drive_viewMode", viewMode);
  }, [viewMode]);

  const currentItems = items.filter(
    (item) => item.parentId === currentFolderId
  );

  const getBreadcrumbs = () => {
    if (currentFolderId === ROOT_ID) return [{ id: ROOT_ID, name: "My Drive" }];

    const crumbs = [];
    let curr = items.find((i) => i.id === currentFolderId);
    while (curr) {
      crumbs.unshift({ id: curr.id, name: curr.name });
      curr = items.find((i) => i.id === curr.parentId);
    }
    crumbs.unshift({ id: ROOT_ID, name: "My Drive" });
    return crumbs;
  };

  const navigateBack = () => {
    if (currentFolderId === ROOT_ID) return;
    const currentFolder = items.find((i) => i.id === currentFolderId);
    if (currentFolder && currentFolder.parentId) {
      setCurrentFolderId(currentFolder.parentId);
    } else {
      setCurrentFolderId(ROOT_ID);
    }
  };

  const createFolder = ({ name, color }) => {
    const item = {
      id: crypto.randomUUID(),
      name: name || "New Folder",
      type: "folder",
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
      type: "file",
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
          if (child.type === "folder") {
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

  return (
    <div className="flex h-full w-full text-white overflow-hidden font-sans col-span-2">
      <DriveSidebar onCreateFolder={createFolder} onUploadFile={uploadFile} />

      <div className="flex-1 flex flex-col h-full relative z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

        <DriveHeader viewMode={viewMode} setViewMode={setViewMode} />
        <DriveBreadcrumbs
          breadcrumbs={getBreadcrumbs()}
          onNavigate={openFolder}
          onBack={navigateBack}
        />

        <FileGrid
          items={currentItems}
          onFolderClick={openFolder}
          viewMode={viewMode}
          onDelete={initiateDelete}
          onRename={initiateRename}
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
