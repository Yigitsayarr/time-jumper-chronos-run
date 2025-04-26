
import React from 'react';
import { useGameContext } from './GameContext';

interface LevelSelectProps {
  onSelectLevel: (level: number) => void;
}

const LevelSelect: React.FC<LevelSelectProps> = ({ onSelectLevel }) => {
  const { gameState } = useGameContext();
  
  const levels = Array.from({ length: gameState.maxLevel }, (_, i) => i + 1);
  
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-xl font-pixel text-game-primary mb-6 text-center">SELECT LEVEL</h2>
      
      <div className="grid grid-cols-3 gap-4">
        {levels.map((level) => {
          const isLocked = level > gameState.maxLevel;
          
          return (
            <button
              key={level}
              className={`
                aspect-square flex items-center justify-center
                font-pixel text-xl border-2 
                ${isLocked 
                  ? 'bg-gray-800 border-gray-700 text-gray-600 cursor-not-allowed'
                  : 'bg-game-bg border-game-primary text-game-text hover:bg-game-primary hover:text-white transition-colors'
                }
              `}
              onClick={() => !isLocked && onSelectLevel(level)}
              disabled={isLocked}
            >
              {isLocked ? <span className="text-2xl">🔒</span> : level}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LevelSelect;
