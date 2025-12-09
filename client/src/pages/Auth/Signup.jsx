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
      <GlassCard className="flex flex-col items-center justify-center p-8">
        <div className="flex flex-col items-center mb-8 text-center  gradient-heading">
          <h2 className="text-3xl font-bold mb-2">Sign Up to Get Started</h2>
          <p className="text-white/60 text-sm max-w-xs">
            Please enter your personal details to create an account.
          </p>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-white/80 uppercase tracking-wider ml-2">
              Enter Full Name
            </label>
            <div className="flex flex-col gap-2">
              <Input
                icon={<User size={18} />}
                type="text"
                placeholder="e.g.  John Doe"
                className="h-12"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-white/80 uppercase tracking-wider ml-2">
              Enter Email
            </label>
            <div className="flex flex-col gap-2">
              <Input
                icon={<Mail size={18} />}
                type="email"
                placeholder="e.g.  johndoe@gmail.com"
                className="h-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-white/80 uppercase tracking-wider ml-2">
              Enter Password
            </label>
            <Input
              icon={<Key size={18} />}
              type="password"
              placeholder="e.g. 12345678"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <p className="text-[10px] text-white/30 uppercase tracking-widest text-right pr-4">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-white/60 underline cursor-pointer"
              >
                Sign In
              </Link>
            </p>
          </div>

          <Button
            disabled={isLoading}
            variant={"gradient"}
            className="h-12 text-lg w-full rounded-3xl mt-1"
          >
            {isLoading ? (
              <ButtonLoader
                text={<span className="ml-2 font-normal">Signing up...</span>}
              />
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-white/30 uppercase tracking-widest">
            By Signing in, you agree to our{" "}
            <span className="text-white/60 underline cursor-pointer">
              Terms and Conditions
            </span>
            .
          </p>
        </div>
      </GlassCard>
    </div>
  );
};

export default Signup;
