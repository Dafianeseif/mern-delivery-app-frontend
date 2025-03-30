import  { useState, useEffect } from "react";
import scouterImg from "../assets/scotter.jpg"; // Vérifie que l'image est bien là

const ScouterLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 2; // 🔥 Augmente plus vite
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 200); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      {/* Conteneur du loader */}
      <div className="relative w-1/2 bg-white p-4 rounded-xl ">
        {/* Image du scooter qui avance */}
        <img
          src={scouterImg}
          alt="Loading..."
          className="absolute top-1/2 transform -translate-y-1/2 size-20 transition-all duration-100"
          style={{ left: `${progress}%` }}
        />

        {/* Barre de progression */}
        <div className="w-full h-2 bg-white rounded-full mt-8 overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScouterLoader;
