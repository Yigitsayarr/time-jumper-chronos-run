
import React from 'react';
import { useGameContext } from './GameContext';

interface ObstacleProps {
  position: { x: number; y: number };
  size: { width: number; height: number };
  type: 'spike' | 'laser' | 'moving';
  speed?: number;
}

const Obstacle: React.FC<ObstacleProps> = ({ position, size, type, speed = 1 }) => {
  const { gameState } = useGameContext();
  
  // Apply different styles based on obstacle type
  const getObstacleStyle = () => {
    switch (type) {
      case 'spike':
        return 'bg-game-danger';
      case 'laser':
        return 'bg-game-primary animate-pulse-energy';
      case 'moving':
        return 'bg-game-accent';
      default:
        return 'bg-gray-500';
    }
  };

  // Calculate motion style 
  const getMotionStyle = () => {
    if (type === 'moving') {
      const slowFactor = gameState.isTimeSlow ? 0.3 : 1; // Slow down by 70% when time is slowed
      return {
        animation: `moveObstacle ${5 / (speed * slowFactor)}s infinite alternate linear`,
        transition: 'all 0.2s',
      };
    }
    return {};
  };

  return (
    <div
      className={`absolute pixel-borders ${getObstacleStyle()}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        transition: gameState.isTimeSlow ? 'all 0.3s' : 'none',
        ...getMotionStyle(),
      }}
    >
      {/* Spike pattern for spike obstacles */}
      {type === 'spike' && (
        <div className="w-full h-2 flex justify-between absolute -top-2">
          {Array.from({ length: Math.floor(size.width / 4) }).map((_, i) => (
            <div 
              key={i} 
              className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent border-b-game-danger"
            ></div>
          ))}
        </div>
      )}
      
      {/* Laser effect */}
      {type === 'laser' && (
        <div className="absolute inset-0 bg-game-primary opacity-50 animate-pulse"></div>
      )}
    </div>
  );
};

export default Obstacle;
