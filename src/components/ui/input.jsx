import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

function Input({
  className,
  type = "text",
  icon,
  borderRadius = "rounded-3xl",
  onChange,
  ...props
}) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [fileName, setFileName] = React.useState("");
  const fileInputRef = React.useRef(null);
  const isPassword = type === "password";
  const isFile = type === "file";

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
    if (onChange) {
      onChange(e);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  if (isFile) {
    return (
      <div className="relative w-full">
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          {...props}
        />
        <div
          className={cn(
            "relative flex items-center bg-white/5 border border-white/20 backdrop-blur-md shadow-sm transition-all duration-200 hover:border-white/30 group p-1 pr-4",
            borderRadius,
            className
          )}
        >
          <button
            type="button"
            onClick={handleButtonClick}
            className="cursor-pointer bg-primary text-white text-sm font-medium px-6 ml-1 my-1 py-2 rounded-full transition-colors mr-3 whitespace-nowrap"
          >
            Upload a file
          </button>
          <span className="text-white/60 text-sm truncate">
            {fileName || "No file chosen"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div
        className={cn(
          "relative flex items-center bg-white/5 border border-white/20 backdrop-blur-md shadow-sm transition-all duration-200 hover:border-white/30 focus-within:border-white/50  focus-within:bg-white/10 group",
          borderRadius
        )}
      >
        {icon && (
          <span className="flex items-center justify-center pl-4 pr-3 text-white/60 group-focus-within:text-white transition-colors">
            {icon}
          </span>
        )}

        <input
          type={isPassword && showPassword ? "text" : type}
          className={cn(
            "flex-1 h-12 py-3 bg-transparent outline-none text-white placeholder:text-white/50 transition-colors",
            icon ? "pl-0" : "pl-4",
            isPassword ? "pr-2" : "pr-4",
            "autofill:bg-transparent autofill:text-white",
            "[&:-webkit-autofill]:bg-transparent",
            "[&:-webkit-autofill]:[-webkit-text-fill-color:white]",
            "[&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_rgba(255,255,255,0.05)_inset]",
            "[&:-webkit-autofill:hover]:[-webkit-box-shadow:0_0_0_1000px_rgba(255,255,255,0.08)_inset]",
            "[&:-webkit-autofill:focus]:[-webkit-box-shadow:0_0_0_1000px_rgba(255,255,255,0.1)_inset]",
            className
          )}
          onChange={onChange}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="flex items-center justify-center px-4 text-white/60 hover:text-white transition-colors focus:outline-none focus:text-white"
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5 cursor-pointer" />
            ) : (
              <Eye className="w-5 h-5 cursor-pointer" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export { Input };
