import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

const ButtonLoader = ({ size = 16, className, color = "text-white", text }) => {
  return (
    <div
      className={cn("flex items-center justify-center opacity-75", className)}
    >
      <Loader size={size} className={cn("animate-spin", color)} />
      {text && text}
    </div>
  );
};

export default ButtonLoader;
