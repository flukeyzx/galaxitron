import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const ExclusionCheckbox = ({ id, label, checked, onCheckedChange }) => {
  return (
    <div className="flex gap-3 px-1 items-center">
      <Checkbox
        id={id}
        className="size-5"
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <Label htmlFor={id} className="text-base font-normal cursor-pointer">
        {label}
      </Label>
    </div>
  );
};

export default ExclusionCheckbox;
