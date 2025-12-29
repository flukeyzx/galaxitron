import { Button } from "@/components/ui/button";
import { SkipBack, SkipForward } from "lucide-react";

const MultiformNavigations = ({ step, setStep, next, prev }) => {
  return (
    <div
      className={`flex ${
        step === 1 ? "justify-end" : "justify-between"
      } w-full gap-8 mt-6`}
    >
      {step > 1 && (
        <Button className="px-12!" variant="outline" onClick={prev}>
          <SkipBack size={18} />
          Prev
        </Button>
      )}

      <Button className="px-12!" variant="gradient" onClick={next}>
        Next
        <SkipForward size={18} />
      </Button>
    </div>
  );
};

export default MultiformNavigations;
