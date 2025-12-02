import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Key, Mail } from "lucide-react";
import ButtonLoader from "@/components/ui/button-loader";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast.warning("Please enter email and password");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setUser({
        email,
      });
      sessionStorage.setItem("user", JSON.stringify({ email }));
      setIsLoading(false);
      toast.success("Login successfull");
      navigate("/");
    }, 3000);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <GlassCard className="flex flex-col items-center justify-center p-8">
        <div className="flex flex-col items-center mb-8 text-center  gradient-heading">
          <h2 className="text-3xl font-bold mb-2">Sign In to Get Started</h2>
          <p className="text-white/60 text-sm max-w-xs">
            Please enter your unique credentials to access the platform.
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-white/80 uppercase tracking-wider ml-2">
              Enter Email
            </label>
            <div className="flex flex-col gap-2">
              <Input
                icon={<Mail size={18} />}
                type="text"
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
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-white/60 underline cursor-pointer"
              >
                Sign Up
              </Link>
            </p>
          </div>

          <Button
            disabled={isLoading}
            variant={"gradient"}
            className="h-12 text-lg mt-1 w-full rounded-3xl"
          >
            {isLoading ? (
              <ButtonLoader
                text={<span className="ml-2 font-normal">Signing In...</span>}
              />
            ) : (
              "Sign In"
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

export default Login;
