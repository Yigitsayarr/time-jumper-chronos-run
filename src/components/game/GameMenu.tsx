
import React from 'react';
import { Button } from '@/components/ui/button';

interface GameMenuProps {
  onPlay: () => void;
  onSettings: () => void;
}

const GameMenu: React.FC<GameMenuProps> = ({ onPlay, onSettings }) => {
  return (
    <div className="w-full max-w-md mx-auto p-6 flex flex-col items-center">
      <h1 className="text-4xl font-pixel text-game-primary mb-2 animate-float">TIME JUMPER</h1>
      <div className="text-lg font-pixel text-game-accent mb-12">CHRONOS RUN</div>
      
      <div className="flex flex-col gap-4 w-48">
        <Button 
          onClick={onPlay} 
          className="h-12 bg-game-primary hover:bg-game-primary/80 font-pixel"
        >
          PLAY
        </Button>
        <Button 
          onClick={onSettings} 
          variant="outline"
          className="h-12 border-game-accent text-game-accent hover:bg-game-accent/10 font-pixel"
        >
          SETTINGS
        </Button>
      </div>
      
      <div className="mt-16 text-game-text text-xs font-pixel opacity-70">
        <p>TAP AND HOLD TO SLOW TIME</p>
        <p className="mt-1">RELEASE TO RETURN TO NORMAL</p>
      </div>
    </div>
  );
};

export default GameMenu;
