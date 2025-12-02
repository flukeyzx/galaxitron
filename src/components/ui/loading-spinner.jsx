import { Ellipsis, Loader2, LoaderPinwheel, Rocket } from "lucide-react";
import GalaxyBackground from "./galaxy-background";

const LoadingSpinner = ({ size = 2 }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <GalaxyBackground />

      <Rocket
        className="animate-float text-foreground"
        style={{ width: `${size}rem`, height: `${size}rem` }}
      />
    </div>
  );
};

export default LoadingSpinner;
