
import React, { useEffect, useState } from 'react';
import { useGameContext } from './GameContext';

interface CharacterProps {
  position: { x: number; y: number };
  size: { width: number; height: number };
}

const Character: React.FC<CharacterProps> = ({ position, size }) => {
  const { gameState } = useGameContext();
  const [frame, setFrame] = useState(0);
  
  // Simple animation frame system
  useEffect(() => {
    let animationFrame: number;
    
    const updateFrame = () => {
      setFrame((prevFrame) => (prevFrame + 1) % 4); // 4 frame animation
      animationFrame = requestAnimationFrame(updateFrame);
    };
    
    if (gameState.isGameActive) {
      const frameRate = gameState.isTimeSlow ? 200 : 100; // Slower animation during time slow
      const intervalId = setInterval(updateFrame, frameRate);
      
      return () => {
        clearInterval(intervalId);
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [gameState.isGameActive, gameState.isTimeSlow]);

  // Choose character color based on time slow effect
  const characterColor = gameState.isTimeSlow ? 'bg-game-primary' : 'bg-game-accent';
  
  return (
    <div 
      className={`absolute ${characterColor} pixel-borders ${gameState.isTimeSlow ? 'animate-time-slow' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`, 
        width: `${size.width}px`,
        height: `${size.height}px`,
        transition: gameState.isTimeSlow ? 'all 0.1s linear' : 'none',
      }}
    >
      {/* Character face */}
      <div className="absolute bg-black w-2 h-1" style={{ top: '5px', left: '4px' }}></div>
      <div className="absolute bg-black w-2 h-1" style={{ top: '5px', right: '4px' }}></div>
      
      {/* Animated legs based on frame */}
      {frame % 2 === 0 ? (
        <>
          <div className="absolute bg-black w-2 h-2" style={{ bottom: '0', left: '2px' }}></div>
          <div className="absolute bg-black w-2 h-2" style={{ bottom: '0', right: '2px' }}></div>
        </>
      ) : (
        <>
          <div className="absolute bg-black w-2 h-4" style={{ bottom: '0', left: '3px' }}></div>
          <div className="absolute bg-black w-2 h-4" style={{ bottom: '0', right: '3px' }}></div>
        </>
      )}
    </div>
  );
};

export default Character;
