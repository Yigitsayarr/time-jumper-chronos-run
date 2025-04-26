
import React from 'react';
import { useGameContext } from './GameContext';

const EnergyBar: React.FC = () => {
  const { gameState } = useGameContext();
  const { energy, maxEnergy, isTimeSlow } = gameState;
  
  // Calculate energy percentage
  const energyPercentage = (energy / maxEnergy) * 100;
  
  // Determine color based on energy level
  const getEnergyColor = () => {
    if (energyPercentage > 70) return 'bg-game-energy';
    if (energyPercentage > 30) return 'bg-game-accent';
    return 'bg-game-danger';
  };

  return (
    <div className="absolute top-4 left-4 w-48 px-1 py-1 bg-game-bg border-2 border-game-text rounded-md">
      <div className="text-xs font-pixel text-game-text mb-1">TIME ENERGY</div>
      <div className="w-full h-4 bg-game-bg border border-game-text rounded">
        <div 
          className={`h-full rounded ${getEnergyColor()} ${isTimeSlow ? 'animate-pulse-energy' : ''}`}
          style={{ width: `${energyPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default EnergyBar;
