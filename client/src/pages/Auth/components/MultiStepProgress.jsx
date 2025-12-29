import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const MultiStepProgress = ({ currentStep, steps }) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-12 px-8">
      <div className="relative flex justify-between items-start">
        <div className="absolute top-4.5 left-0 w-full h-1.5 bg-white/5 rounded-full -z-10" />

        <div
          className="absolute top-4.5 left-0 h-1.5 bg-linear-to-r from-blue-500 to-indigo-500 rounded-full -z-10 transition-all duration-500 ease-in-out shadow-[0_0_10px_rgba(139,92,246,0.5)]"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />

        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center relative gap-2 group"
            >
              <div
                className={cn(
                  "relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ease-in-out z-10",
                  "bg-[#0f172a]",
                  isActive
                    ? "border-indigo-400 bg-linear-to-br from-blue-500 to-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.6)] scale-110 text-white"
                    : isCompleted
                    ? "border-indigo-500 bg-indigo-600/90 text-white shadow-[0_0_10px_rgba(124,58,237,0.4)]"
                    : "border-white/10 bg-[#0f172a] text-white/40"
                )}
              >
                {isActive && (
                  <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping" />
                )}

                {isCompleted ? (
                  <Check className="w-5 h-5 text-white/75" />
                ) : (
                  <span
                    className={cn(
                      "text-sm font-bold transition-colors duration-300",
                      isActive ? "text-white" : "text-inherit"
                    )}
                  >
                    {stepNumber}
                  </span>
                )}
              </div>

              <div className="absolute top-12 flex flex-col items-center w-32">
                <span
                  className={cn(
                    "text-xs font-semibold uppercase tracking-wider transition-all duration-300 whitespace-nowrap",
                    isActive
                      ? "text-indigo-400 translate-y-0 opacity-100"
                      : isCompleted
                      ? "text-violet-400"
                      : "text-white/30"
                  )}
                >
                  {step.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultiStepProgress;
