import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModelSelectionbar from "./components/ModelSelectionbar";
import Chat from "./components/Chat";
import Main from "./components/Main";
import Drive from "../Drive/Drive";

const Home = () => {
  const { user } = useAuth();
  const [selectedModel, setSelectedModel] = useState("c2c");

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      return;
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="grid grid-cols-[1fr_6fr_2fr] max-lg:grid-cols-[1fr_5fr_2fr] h-screen">
      <ModelSelectionbar
        selectedModel={selectedModel}
        onSelectModel={setSelectedModel}
      />

      {selectedModel === "drive" ? (
        <Drive />
      ) : (
        <>
          <Main />

          <Chat />
        </>
      )}
    </div>
  );
};

export default Home;
