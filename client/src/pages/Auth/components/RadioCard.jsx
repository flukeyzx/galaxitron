import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";

const RadioCard = ({ value, selectedValue, onChange, label, id }) => {
  return (
    <div
      onClick={() => onChange(value)}
      className={`cursor-pointer flex gap-2 border-2 items-center p-4 rounded-full ${
        selectedValue === value
          ? "border-cyan-500/60 bg-linear-to-r from-violet-500/25 via-blue-400/25 to-cyan-500/25"
          : "border-white/20 bg-linear-to-r from-white/8 via-white/6 to-white/2"
      }`}
    >
      <RadioGroupItem
        className="cursor-pointer"
        id={id || value}
        value={value}
      />
      <Label className="cursor-pointer" htmlFor={id || value}>
        {label}
      </Label>
    </div>
  );
};

export default RadioCard;
