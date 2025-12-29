import GalaxyBackground from "./components/ui/galaxy-background";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingSpinner from "./components/ui/loading-spinner";
import { Toaster } from "@/components/ui/sonner";

const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Signup = lazy(() => import("./pages/Auth/Signup"));
const SignupIndividual = lazy(() => import("./pages/Auth/SignupIndividual"));
const Profile = lazy(() => import("./pages/Profile/Profile"));

const App = () => {
  return (
    <>
      <GalaxyBackground />

      <Suspense fallback={<LoadingSpinner />}>
        <Router>
          <Toaster richColors />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup-individual" element={<SignupIndividual />} />

            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </Suspense>
    </>
  );
};

export default App;
