
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface GameState {
  currentLevel: number;
  maxLevel: number;
  energy: number;
  maxEnergy: number;
  isTimeSlow: boolean;
  isGameActive: boolean;
  score: number;
}

interface GameContextType {
  gameState: GameState;
  startGame: () => void;
  pauseGame: () => void;
  resetGame: () => void;
  selectLevel: (level: number) => void;
  slowTime: () => void;
  releaseTime: () => void;
  addEnergy: (amount: number) => void;
  useEnergy: (amount: number) => boolean;
}

const initialGameState: GameState = {
  currentLevel: 1,
  maxLevel: 5,
  energy: 100,
  maxEnergy: 100,
  isTimeSlow: false,
  isGameActive: false,
  score: 0,
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [energyDrainInterval, setEnergyDrainInterval] = useState<number | null>(null);

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (energyDrainInterval) {
        clearInterval(energyDrainInterval);
      }
    };
  }, [energyDrainInterval]);

  const startGame = () => {
    setGameState((prev) => ({
      ...prev,
      isGameActive: true,
    }));
  };

  const pauseGame = () => {
    setGameState((prev) => ({
      ...prev,
      isGameActive: false,
    }));
    if (energyDrainInterval) {
      clearInterval(energyDrainInterval);
      setEnergyDrainInterval(null);
    }
  };

  const resetGame = () => {
    setGameState(initialGameState);
    if (energyDrainInterval) {
      clearInterval(energyDrainInterval);
      setEnergyDrainInterval(null);
    }
  };

  const selectLevel = (level: number) => {
    if (level <= gameState.maxLevel) {
      setGameState((prev) => ({
        ...prev,
        currentLevel: level,
        energy: prev.maxEnergy, // Reset energy when selecting a level
        isGameActive: false,
        score: 0,
      }));
    }
  };

  const slowTime = () => {
    if (gameState.energy > 0 && gameState.isGameActive) {
      setGameState((prev) => ({
        ...prev,
        isTimeSlow: true,
      }));
      
      // Start draining energy while time is slowed
      if (!energyDrainInterval) {
        const interval = window.setInterval(() => {
          setGameState((prev) => {
            const newEnergy = Math.max(0, prev.energy - 1);
            
            // If energy is depleted, release time slow
            if (newEnergy === 0) {
              clearInterval(interval);
              setEnergyDrainInterval(null);
              return {
                ...prev,
                energy: newEnergy,
                isTimeSlow: false,
              };
            }
            
            return {
              ...prev,
              energy: newEnergy,
            };
          });
        }, 100); // Drain 1 energy every 100ms
        
        setEnergyDrainInterval(interval);
      }
    }
  };

  const releaseTime = () => {
    setGameState((prev) => ({
      ...prev,
      isTimeSlow: false,
    }));
    
    if (energyDrainInterval) {
      clearInterval(energyDrainInterval);
      setEnergyDrainInterval(null);
    }
  };

  const addEnergy = (amount: number) => {
    setGameState((prev) => ({
      ...prev,
      energy: Math.min(prev.energy + amount, prev.maxEnergy),
    }));
  };

  const useEnergy = (amount: number): boolean => {
    if (gameState.energy >= amount) {
      setGameState((prev) => ({
        ...prev,
        energy: prev.energy - amount,
      }));
      return true;
    }
    return false;
  };

  const value = {
    gameState,
    startGame,
    pauseGame,
    resetGame,
    selectLevel,
    slowTime,
    releaseTime,
    addEnergy,
    useEnergy,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
};
