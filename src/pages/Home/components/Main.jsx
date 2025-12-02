import galaxitronLogo from "@/assets/Galaxitron.png";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

const Main = () => {
  return (
    <main className="px-12 max-md:px-6">
      <div className="flex items-center justify-center mt-6">
        {/* <img src={galaxitronLogo} alt="Galaxitron Logo" width={250} /> */}
        <h1 className="text-4xl tracking-widest gradient-heading">
          Galaxitron
        </h1>
      </div>

      <div className="mt-12 max-md:mt-6">
        <h2 className="text-2xl font-semibold mt-6 pl-4 max-md:text-xl">
          Customer to Contract Co-Pilot
        </h2>

        <GlassCard className="mt-4 max-w-full">
          <div className="grid grid-cols-2 gap-8 gap-x-16 max-lg:grid-cols-1 px-2">
            <div>
              <div className="flex gap-1 ml-4 pb-3 items-center">
                <Upload size={16} />
                <Label>Upload SOW Document</Label>
              </div>
              <Input
                type="file"
                accept=".pdf"
                className="cursor-pointer max-lg:col-span-2"
              />
            </div>

            <div>
              <div className="flex gap-1 ml-4 pb-3 items-center">
                <Upload size={16} />
                <Label>Upload T&C Document</Label>
              </div>
              <Input type="file" accept=".pdf" className="cursor-pointer" />
            </div>

            <div>
              <div className="flex gap-1 ml-4 pb-3 items-center">
                <Upload size={16} />
                <Label>Upload Quality Control</Label>
              </div>
              <Input type="file" accept=".pdf" className="cursor-pointer" />
            </div>

            <div>
              <div className="flex gap-1 ml-4 pb-3 items-center">
                <Upload size={16} />
                <Label>Upload Technical Document</Label>
              </div>
              <Input type="file" accept=".pdf" className="cursor-pointer" />
            </div>

            <div className="col-span-2 flex justify-end mt-2">
              <Button variant="gradient" className="px-20 py-6 max-lg:px-12">
                Generate
              </Button>
            </div>
          </div>
        </GlassCard>
      </div>
    </main>
  );
};

export default Main;
