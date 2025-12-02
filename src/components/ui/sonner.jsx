import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  return (
    <Sonner
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
        "--border-radius": "var(--radius)",
      }}
      toastOptions={{
        classNames: {
          success:
            "!bg-emerald-500/15 !border-emerald-500/25 !text-emerald-500 backdrop-blur-md",
          info: "!bg-cyan-500/15 !border-cyan-500/25 !text-cyan-500 backdrop-blur-md",
          warning:
            "!bg-amber-500/15 !border-amber-500/25 !text-amber-500 backdrop-blur-md",
          error:
            "!bg-red-600/15 !border-red-600/25 !text-red-500 backdrop-blur-md",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
