
import React from 'react';
import { useGameContext } from './GameContext';
import { Button } from '@/components/ui/button';

interface GameControlsProps {
  onBack: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({ onBack }) => {
  const { gameState, startGame, pauseGame, resetGame } = useGameContext();
  
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
      {!gameState.isGameActive ? (
        <>
          <Button 
            onClick={startGame}
            className="bg-game-primary hover:bg-game-primary/80 text-white font-pixel text-xs"
          >
            {gameState.score > 0 ? 'RESUME' : 'START'}
          </Button>
          <Button 
            onClick={resetGame}
            variant="outline"
            className="border-game-primary text-game-primary font-pixel text-xs"
          >
            RESET
          </Button>
        </>
      ) : (
        <Button 
          onClick={pauseGame}
          variant="outline"
          className="border-game-primary text-game-primary font-pixel text-xs"
        >
          PAUSE
        </Button>
      )}
      
      <Button 
        onClick={onBack}
        variant="outline"
        className="border-white text-white font-pixel text-xs"
      >
        BACK
      </Button>
    </div>
  );
};

export default GameControls;
