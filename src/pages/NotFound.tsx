
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-game-bg">
      <div className="text-center p-6">
        <h1 className="text-4xl font-pixel text-game-primary mb-4 animate-float">404</h1>
        <p className="text-xl font-pixel text-game-text mb-8">TIME PORTAL NOT FOUND</p>
        <Button asChild className="bg-game-accent hover:bg-game-accent/80 font-pixel">
          <a href="/">RETURN TO PRESENT</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
