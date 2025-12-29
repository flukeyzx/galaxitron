import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Key, Mail, User } from "lucide-react";
import ButtonLoader from "@/components/ui/button-loader";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name || !email || !password) {
      toast.warning("Please enter email and password");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setUser({
        email,
        password,
      });
      setIsLoading(false);
      toast.success("Signup successfull");
      navigate("/");
    }, 3000);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <GlassCard className="flex flex-col items-center justify-center px-12 py-16 gap-6 max-w-2xl">
        <h2 className="gradient-heading text-3xl font-bold text-center">
          Build Autonomouse AS9100 Compliance Without the Audit Panic
        </h2>

        <div className="flex flex-col gap-2 px-12 py-4">
          <Button
            onClick={() => navigate("/signup-individual")}
            variant="gradient"
            size="lg"
            className="px-22"
          >
            Continue As An Individual
          </Button>

          <Button
            size="lg"
            className="rounded-full bg-cyan-500 hover:bg-cyan-500 px-22 transition-transform duration-200 hover:scale-105"
          >
            Setting Up For A Team
          </Button>
        </div>
      </GlassCard>
    </div>
  );
};

export default Signup;
