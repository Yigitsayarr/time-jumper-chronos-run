
import React, { useState, useEffect } from 'react';
import Character from './Character';
import Obstacle from './Obstacle';
import EnergyBar from './EnergyBar';
import { useGameContext } from './GameContext';

interface LevelProps {
  levelNumber: number;
}

const Level: React.FC<LevelProps> = ({ levelNumber }) => {
  const { gameState, pauseGame } = useGameContext();
  const [characterPosition, setCharacterPosition] = useState({ x: 50, y: 200 });
  const [obstacles, setObstacles] = useState<Array<{
    id: number;
    position: { x: number; y: number };
    size: { width: number; height: number };
    type: 'spike' | 'laser' | 'moving';
    speed?: number;
  }>>([]);
  
  // Set up level obstacles based on level number
  useEffect(() => {
    const levelObstacles = [];
    
    // Basic level layout
    switch(levelNumber) {
      case 1:
        // Level 1: Simple obstacles to introduce mechanics
        levelObstacles.push(
          { id: 1, position: { x: 200, y: 230 }, size: { width: 40, height: 20 }, type: 'spike' },
          { id: 2, position: { x: 350, y: 150 }, size: { width: 20, height: 100 }, type: 'laser' },
          { id: 3, position: { x: 500, y: 230 }, size: { width: 60, height: 20 }, type: 'moving', speed: 1 }
        );
        break;
      case 2:
        // Level 2: More challenging obstacles
        levelObstacles.push(
          { id: 1, position: { x: 180, y: 230 }, size: { width: 40, height: 20 }, type: 'spike' },
          { id: 2, position: { x: 300, y: 150 }, size: { width: 20, height: 100 }, type: 'laser' },
          { id: 3, position: { x: 400, y: 230 }, size: { width: 60, height: 20 }, type: 'moving', speed: 2 },
          { id: 4, position: { x: 550, y: 200 }, size: { width: 30, height: 50 }, type: 'moving', speed: 1.5 }
        );
        break;
      default:
        // Default level with some basic obstacles
        levelObstacles.push(
          { id: 1, position: { x: 200, y: 230 }, size: { width: 40, height: 20 }, type: 'spike' },
          { id: 2, position: { x: 350, y: 200 }, size: { width: 20, height: 50 }, type: 'laser' }
        );
    }
    
    setObstacles(levelObstacles);
  }, [levelNumber]);

  // Auto-scroll character to the right
  useEffect(() => {
    let animationId: number;
    
    const moveCharacter = () => {
      if (gameState.isGameActive) {
        setCharacterPosition((prev) => {
          // Calculate new position based on time slow effect
          const moveSpeed = gameState.isTimeSlow ? 1 : 3; // Move slower during time slow
          return { ...prev, x: prev.x + moveSpeed };
        });
        
        animationId = requestAnimationFrame(moveCharacter);
      }
    };
    
    if (gameState.isGameActive) {
      animationId = requestAnimationFrame(moveCharacter);
    }
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [gameState.isGameActive, gameState.isTimeSlow]);

  // Collision detection
  useEffect(() => {
    const characterRect = {
      left: characterPosition.x,
      right: characterPosition.x + 20, // Character width
      top: characterPosition.y,
      bottom: characterPosition.y + 30, // Character height
    };
    
    // Check for collisions with obstacles
    const collision = obstacles.some(obstacle => {
      const obstacleRect = {
        left: obstacle.position.x,
        right: obstacle.position.x + obstacle.size.width,
        top: obstacle.position.y,
        bottom: obstacle.position.y + obstacle.size.height,
      };
      
      return (
        characterRect.right > obstacleRect.left &&
        characterRect.left < obstacleRect.right &&
        characterRect.bottom > obstacleRect.top &&
        characterRect.top < obstacleRect.bottom
      );
    });
    
    // Handle collision
    if (collision && gameState.isGameActive) {
      pauseGame();
      // Show game over message
      alert("You crashed! Try again with better timing.");
    }
    
    // Check if character reached the end of the level (700px)
    if (characterPosition.x > 700 && gameState.isGameActive) {
      pauseGame();
      // Show level complete message
      alert("Level Complete! Well done!");
    }
  }, [characterPosition, obstacles, gameState.isGameActive, pauseGame]);

  return (
    <div 
      className="relative w-full h-full overflow-hidden bg-game-bg"
      style={{ 
        backgroundSize: '40px 40px',
        backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)',
      }}
    >
      {/* Game level elements */}
      <div className="absolute inset-0">
        {/* Platform/Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gray-800 border-t-2 border-game-primary"></div>
        
        {/* End flag */}
        <div className="absolute bottom-10 right-20 w-8 h-40">
          <div className="w-2 h-40 bg-white"></div>
          <div className="w-12 h-8 bg-game-accent absolute top-0 -left-1"></div>
        </div>
        
        {/* Character */}
        <Character position={characterPosition} size={{ width: 20, height: 30 }} />
        
        {/* Obstacles */}
        {obstacles.map((obstacle) => (
          <Obstacle 
            key={obstacle.id}
            position={obstacle.position}
            size={obstacle.size}
            type={obstacle.type}
            speed={obstacle.speed}
          />
        ))}
        
        {/* Time slow effect overlay */}
        {gameState.isTimeSlow && (
          <div className="absolute inset-0 bg-game-primary bg-opacity-10 pointer-events-none"></div>
        )}
        
        {/* Energy bar */}
        <EnergyBar />
        
        {/* Level indicator */}
        <div className="absolute top-4 right-4 px-4 py-2 bg-game-bg border-2 border-game-text rounded-md">
          <div className="text-sm font-pixel text-game-primary">LEVEL {levelNumber}</div>
        </div>
      </div>
    </div>
  );
};

export default Level;
