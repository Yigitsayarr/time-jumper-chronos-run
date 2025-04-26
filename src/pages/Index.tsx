
import React, { useState } from 'react';
import { GameProvider } from '@/components/game/GameContext';
import GameMenu from '@/components/game/GameMenu';
import GameScreen from '@/components/game/GameScreen';
import GameSettings from '@/components/game/GameSettings';
import LevelSelect from '@/components/game/LevelSelect';
import { useGameContext } from '@/components/game/GameContext';

// Inner component to access context
const GameContainer = () => {
  const [screen, setScreen] = useState<'menu' | 'play' | 'settings' | 'levelSelect'>('menu');
  const { selectLevel } = useGameContext();
  
  const handleLevelSelect = (level: number) => {
    selectLevel(level);
    setScreen('play');
  };
  
  return (
    <div className="w-full h-full flex items-center justify-center bg-game-bg">
      <div className="w-full h-full max-w-2xl mx-auto relative overflow-hidden">
        {/* Pixel art background elements */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gray-900"></div>
        <div className="absolute -bottom-2 -left-12 w-24 h-24 rounded-full bg-game-primary opacity-20"></div>
        <div className="absolute top-12 right-12 w-32 h-32 rounded-full bg-game-accent opacity-10"></div>
        
        {/* Grid overlay for retro effect */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{ 
            backgroundSize: '20px 20px',
            backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          }}
        ></div>
        
        {/* Main content */}
        <div className="relative w-full h-full z-10">
          {screen === 'menu' && (
            <GameMenu 
              onPlay={() => setScreen('levelSelect')}
              onSettings={() => setScreen('settings')}
            />
          )}
          
          {screen === 'settings' && (
            <GameSettings onBack={() => setScreen('menu')} />
          )}
          
          {screen === 'levelSelect' && (
            <LevelSelect onSelectLevel={handleLevelSelect} />
          )}
          
          {screen === 'play' && (
            <GameScreen onBack={() => setScreen('menu')} />
          )}
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <div className="h-screen w-full flex overflow-hidden">
      <GameProvider>
        <GameContainer />
      </GameProvider>
    </div>
  );
};

export default Index;
