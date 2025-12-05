import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "./button";

const BackButton = ({ onClick, label = "Back" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    else navigate(-1);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={handleClick}
      className="
        group flex items-center gap-2 px-4 py-2 rounded-xl 
        border border-muted-foreground/60 
        text-muted-foreground hover:text-foreground 
        hover:border-muted-foreground/60 hover:bg-muted/60
        transition-all duration-200 ease-in-out
        shadow-sm hover:shadow
      "
    >
      <ArrowLeft
        size={12}
        className="transition-transform duration-200 group-hover:-translate-x-1"
      />{" "}
      <span className="font-medium">{label}</span>
    </Button>
  );
};

export default BackButton;
