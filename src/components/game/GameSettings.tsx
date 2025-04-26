
import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface GameSettingsProps {
  onBack: () => void;
}

const GameSettings: React.FC<GameSettingsProps> = ({ onBack }) => {
  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h2 className="text-xl font-pixel text-game-primary mb-6 text-center">SETTINGS</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-pixel text-game-text">MUSIC VOLUME</label>
          <Slider defaultValue={[70]} max={100} step={1} />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-pixel text-game-text">SOUND EFFECTS</label>
          <Slider defaultValue={[80]} max={100} step={1} />
        </div>
        
        <div className="pt-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-pixel text-game-text">VIBRATION</span>
            <div className="w-12 h-6 bg-game-primary rounded-full relative cursor-pointer">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
        </div>
        
        <div className="pt-8">
          <Button 
            onClick={onBack}
            variant="outline"
            className="w-full h-12 border-white text-white hover:bg-white/10 font-pixel"
          >
            BACK
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameSettings;
