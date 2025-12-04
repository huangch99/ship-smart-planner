import React from 'react';
import { UnitSystem } from '../types';

interface BoxVisualizerProps {
  length: number;
  width: number;
  height: number;
  unitSystem: UnitSystem;
}

const BoxVisualizer: React.FC<BoxVisualizerProps> = ({ length, width, height, unitSystem }) => {
  // Normalize dimensions for display to prevent the box from being too huge or too tiny on screen
  // We want the longest side to be roughly 200px
  const maxDim = Math.max(length, width, height);
  const scale = maxDim > 0 ? 160 / maxDim : 1;

  const displayL = Math.max(length * scale, 20);
  const displayW = Math.max(width * scale, 20);
  const displayH = Math.max(height * scale, 20);

  const unitLabel = unitSystem === UnitSystem.METRIC ? 'cm' : 'in';

  const style = {
    width: `${displayL}px`,
    height: `${displayH}px`, // In CSS 3D transform logic for this specific setup, height corresponds to Y axis
    '--depth-half': `${displayW / 2}px`, // Width corresponds to Z axis depth in our setup
    '--width-half': `${displayL / 2}px`,
    '--height-half': `${displayH / 2}px`
  } as React.CSSProperties;

  return (
    <div className="w-full h-64 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center border border-slate-200 shadow-inner">
      <div className="scene">
        <div className="cube" style={style}>
          <div className="cube-face face-front" style={{ width: `${displayL}px`, height: `${displayH}px` }}>Front</div>
          <div className="cube-face face-back" style={{ width: `${displayL}px`, height: `${displayH}px` }}>Back</div>
          <div className="cube-face face-right" style={{ width: `${displayW}px`, height: `${displayH}px` }}>Right</div>
          <div className="cube-face face-left" style={{ width: `${displayW}px`, height: `${displayH}px` }}>Left</div>
          <div className="cube-face face-top" style={{ width: `${displayL}px`, height: `${displayW}px` }}>Top</div>
          <div className="cube-face face-bottom" style={{ width: `${displayL}px`, height: `${displayW}px` }}>Bottom</div>
        </div>
      </div>
    </div>
  );
};

export default BoxVisualizer;