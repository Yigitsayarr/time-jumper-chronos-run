import React, { useState } from 'react';
import Level from './Level';
import GameControls from './GameControls';
import { useGameContext } from './GameContext';
import EnergyBar from './EnergyBar';

interface GameScreenProps {
  onBack: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onBack }) => {
  const { gameState, slowTime, releaseTime, startGame } = useGameContext();
  
  // Handle touch/click events for time control
  const handleTouchStart = () => {
    // If game is not active yet, start the game on first touch
    if (!gameState.isGameActive) {
      startGame();
      return;
    }
    
    // Otherwise, slow down time
    slowTime();
  };
  
  const handleTouchEnd = () => {
    // Only release time if the game is active
    if (gameState.isGameActive) {
      releaseTime();
    }
  };
  
  return (
    <div 
      className="w-full h-full relative game-container"
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Level levelNumber={gameState.currentLevel} />
      <GameControls onBack={onBack} />
      <EnergyBar />
      
      {!gameState.isGameActive && (
        <div className="absolute inset-0 bg-game-overlay flex items-center justify-center">
          <div className="text-white font-pixel text-center">
            <p className="text-xl mb-4">
              {gameState.score > 0 ? 'GAME PAUSED' : 'CLICK TO START'}
            </p>
            <p className="text-sm text-game-accent">
              {gameState.score === 0 && 'Touch and hold to slow time'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameScreen;
