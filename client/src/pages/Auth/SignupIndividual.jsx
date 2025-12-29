import GlassCard from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Ban,
  Building2,
  CircleX,
  Factory,
  Key,
  Mail,
  MapPin,
  PersonStanding,
  Save,
  SkipBack,
  UserLock,
  UserPen,
  UserRoundCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MultiformNavigations from "./components/MultiformNavigations";
import MultiStepProgress from "./components/MultiStepProgress";
import { RadioGroup } from "@/components/ui/radio-group";
import RadioCard from "./components/RadioCard";
import ExclusionCheckbox from "./components/ExclusionCheckbox";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogOverlay,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import ButtonLoader from "@/components/ui/button-loader";

const SignupIndividual = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    companyName: "",
    industry: "",
    primaryMarket: "",
    companySize: "",
    certificationStatus: "",
    qmsOwner: "quality-manager",
    auditConfidence: "low",
    certificationStatus: "certified",
    qmsClauses: "Yes",
    clauseExclusions: [],
  });

  const [loading, setLoading] = useState(false);

  const steps = [
    { id: 1, title: "Personal Info" },
    { id: 2, title: "Company Info" },
    { id: 3, title: "Compliance Info" },
    { id: 4, title: "Verification" },
  ];

  const navigate = useNavigate();

  const next = () => {
    setStep(step + 1);
  };

  const prev = () => {
    setStep(step - 1);
  };

  const handleSignup = () => {
    console.log(formData);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 4000);
  };

  const toggleCheckedChange = (clauseId) => {
    setFormData((prev) => ({
      ...prev,
      clauseExclusions: prev.clauseExclusions.includes(clauseId)
        ? prev.clauseExclusions.filter((id) => id !== clauseId)
        : [...prev.clauseExclusions, clauseId],
    }));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {step === 1 && (
        <GlassCard className="flex flex-col items-center px-12 py-16 gap-6 max-w-3xl">
          <MultiStepProgress currentStep={step} steps={steps} />
          <div className="flex justify-between w-full gap-8">
            <div className="flex flex-col w-full gap-2">
              <label className="pl-4">First Name</label>
              <Input
                icon={<UserPen size={18} />}
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col w-full gap-2">
              <label className="pl-4">Last Name</label>
              <Input
                icon={<UserPen size={18} />}
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex justify-between w-full gap-8">
            <div className="flex flex-col w-full gap-2">
              <label className="pl-4">Email</label>
              <Input
                icon={<Mail size={18} />}
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col w-full gap-2">
              <label className="pl-4">Password</label>
              <Input
                icon={<Key size={18} />}
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex justify-between w-full gap-8">
            <div className="flex flex-col w-full gap-2">
              <label className="pl-4">Role</label>
              <Select>
                <SelectTrigger icon={<UserLock size={18} />}>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <MultiformNavigations
            step={step}
            setStep={setStep}
            next={next}
            prev={prev}
          />
        </GlassCard>
      )}

      {step === 2 && (
        <GlassCard className="flex flex-col items-center px-12 py-16 gap-6 max-w-3xl">
          <MultiStepProgress currentStep={step} steps={steps} />
          <div className="flex justify-between w-full gap-8">
            <div className="flex flex-col w-full gap-2">
              <label className="pl-4">Company Name</label>
              <Input
                icon={<Building2 size={18} />}
                placeholder="Company Name"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col w-full gap-2">
              <label className="pl-4">Industry</label>
              <Input
                icon={<Factory size={18} />}
                placeholder="Industry"
                value={formData.industry}
                onChange={(e) =>
                  setFormData({ ...formData, industry: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex justify-between w-full gap-8">
            <div className="flex flex-col w-full gap-2">
              <label className="pl-4">Primary Market</label>

              <Select
                value={formData.primaryMarket}
                onChange={(e) =>
                  setFormData({ ...formData, primaryMarket: e.target.value })
                }
              >
                <SelectTrigger icon={<MapPin size={18} />}>
                  <SelectValue placeholder="Select a primary market" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">US</SelectItem>
                  <SelectItem value="UK">UK</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col w-full gap-2">
              <label className="pl-4">Company Size</label>

              <Select
                value={formData.companySize}
                onChange={(e) =>
                  setFormData({ ...formData, companySize: e.target.value })
                }
              >
                <SelectTrigger icon={<PersonStanding size={18} />}>
                  <SelectValue placeholder="Select a company size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-50">1-50</SelectItem>
                  <SelectItem value="51-100">51-100</SelectItem>
                  <SelectItem value="101-500">101-500</SelectItem>
                  <SelectItem value="501-1000">501-1000</SelectItem>
                  <SelectItem value="1001+">1001+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <MultiformNavigations
            step={step}
            setStep={setStep}
            next={next}
            prev={prev}
          />
        </GlassCard>
      )}

      {step === 3 && (
        <GlassCard className="flex flex-col items-center px-12 py-16 gap-6 max-w-3xl">
          <MultiStepProgress currentStep={step} steps={steps} />

          <div className="flex flex-col justify-between w-full gap-2">
            <label className="text-xl pl-2">
              What is your AS9100 certification status?
            </label>

            <RadioGroup
              value={formData.certificationStatus}
              onValueChange={(value) =>
                setFormData({ ...formData, certificationStatus: value })
              }
            >
              <RadioCard
                value="certified"
                selectedValue={formData.certificationStatus}
                onChange={(val) =>
                  setFormData({ ...formData, certificationStatus: val })
                }
                label="Certified"
              />
              <RadioCard
                value="in-progress"
                selectedValue={formData.certificationStatus}
                onChange={(val) =>
                  setFormData({ ...formData, certificationStatus: val })
                }
                label="In Progress"
              />
              <RadioCard
                value="planning"
                selectedValue={formData.certificationStatus}
                onChange={(val) =>
                  setFormData({ ...formData, certificationStatus: val })
                }
                label="Planning"
              />
            </RadioGroup>
          </div>

          <div className="flex flex-col justify-between w-full gap-2">
            <label className="text-xl pl-2">Who owns the QMS?</label>

            <RadioGroup
              value={formData.qmsOwner}
              onValueChange={(value) =>
                setFormData({ ...formData, qmsOwner: value })
              }
            >
              <RadioCard
                value="quality-manager"
                selectedValue={formData.qmsOwner}
                onChange={(val) => setFormData({ ...formData, qmsOwner: val })}
                label="Quality Manager"
              />
              <RadioCard
                value="director-of-quality"
                selectedValue={formData.qmsOwner}
                onChange={(val) => setFormData({ ...formData, qmsOwner: val })}
                label="Director of Quality"
              />
              <RadioCard
                value="vp-quality"
                selectedValue={formData.qmsOwner}
                onChange={(val) => setFormData({ ...formData, qmsOwner: val })}
                label="VP Quality"
              />
              <RadioCard
                value="other"
                selectedValue={formData.qmsOwner}
                onChange={(val) => setFormData({ ...formData, qmsOwner: val })}
                label="Other"
              />
            </RadioGroup>
          </div>

          <MultiformNavigations
            step={step}
            setStep={setStep}
            next={next}
            prev={prev}
          />
        </GlassCard>
      )}

      {step === 4 && (
        <GlassCard className="flex flex-col items-center px-12 py-16 gap-6 max-w-3xl">
          <MultiStepProgress currentStep={step} steps={steps} />

          <div className="flex flex-col justify-between w-full gap-2">
            <label className="text-xl pl-2">
              Does your Quality Management System include all AS9100 clauses?
            </label>

            <RadioGroup
              value={formData.qmsClauses}
              onValueChange={(value) =>
                setFormData({ ...formData, qmsClauses: value })
              }
            >
              <RadioCard
                value="Yes"
                selectedValue={formData.qmsClauses}
                onChange={(val) =>
                  setFormData({ ...formData, qmsClauses: val })
                }
                label="Yes - all clauses included"
              />
              <RadioCard
                value="No"
                selectedValue={formData.qmsClauses}
                onChange={(val) =>
                  setFormData({ ...formData, qmsClauses: val })
                }
                label="No - some exclusions"
              />
            </RadioGroup>
          </div>

          <div className="flex flex-col justify-between w-full gap-2">
            <label className="text-xl pl-2">
              How confident are you in audit readiness today?
            </label>

            <RadioGroup
              value={formData.auditConfidence}
              onValueChange={(value) =>
                setFormData({ ...formData, auditConfidence: value })
              }
            >
              <RadioCard
                value="low"
                selectedValue={formData.auditConfidence}
                onChange={(val) =>
                  setFormData({ ...formData, auditConfidence: val })
                }
                label="Low"
              />
              <RadioCard
                value="medium"
                selectedValue={formData.auditConfidence}
                onChange={(val) =>
                  setFormData({ ...formData, auditConfidence: val })
                }
                label="Medium"
              />
              <RadioCard
                value="high"
                selectedValue={formData.auditConfidence}
                onChange={(val) =>
                  setFormData({ ...formData, auditConfidence: val })
                }
                label="High"
              />
            </RadioGroup>

            <Dialog>
              <DialogOverlay />
              <form>
                <div className="flex justify-between px-4 items-center mt-4 text-lg font-semibold">
                  <span>Do you have AS9100 clauses exclusions?</span>

                  <DialogTrigger asChild>
                    <Button variant="outline" className="px-8!">
                      <Ban />
                      Add Exclusions
                    </Button>
                  </DialogTrigger>
                </div>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-2xl">
                      AS9100 Clause Exclusions
                    </DialogTitle>
                    <DialogDescription>
                      Please select the clauses you would like to exclude from
                      your AS9100 audit.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="flex flex-col gap-4 mt-2">
                    <ExclusionCheckbox
                      id="8.3"
                      label="Clause 8.3 - Design & Development"
                      checked={formData.clauseExclusions.includes("8.3")}
                      onCheckedChange={() => toggleCheckedChange("8.3")}
                    />

                    <ExclusionCheckbox
                      id="8.5"
                      label="Clause 8.5 - Production"
                      checked={formData.clauseExclusions.includes("8.5")}
                      onCheckedChange={() => toggleCheckedChange("8.5")}
                    />

                    <ExclusionCheckbox
                      id="8.7"
                      label="Clause 8.7 - Quality System"
                      checked={formData.clauseExclusions.includes("8.7")}
                      onCheckedChange={() => toggleCheckedChange("8.7")}
                    />
                  </div>

                  <DialogFooter className="mt-8">
                    <DialogClose asChild>
                      <Button
                        onClick={() => {
                          setFormData({
                            ...formData,
                            clauseExclusions: [],
                          });
                        }}
                        variant="outline"
                        className="flex gap-2 px-12!"
                      >
                        <CircleX />
                        Cancel
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button className="flex gap-2 px-12!">
                        Save <Save />
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
          </div>

          <div
            className={`flex ${
              step === 1 ? "justify-end" : "justify-between"
            } w-full gap-8 mt-6`}
          >
            <Button className="px-12!" variant="outline" onClick={prev}>
              <SkipBack size={18} />
              Prev
            </Button>

            <Button
              className="px-12!"
              variant="gradient"
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? (
                <ButtonLoader
                  text={<span className="ml-2 font-normal">Finish</span>}
                />
              ) : (
                "Finish"
              )}
              <UserRoundCheck size={18} />
            </Button>
          </div>
        </GlassCard>
      )}
    </div>
  );
};

export default SignupIndividual;
