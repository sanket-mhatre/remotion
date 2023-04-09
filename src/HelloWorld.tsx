// HelloWorld.tsx
import React from 'react';
import { Episode } from './Episode'

interface HelloWorldProps {
  audioUrl: string;
  audioDuration: number; // Add audioDuration prop
}

export const HelloWorld: React.FC<HelloWorldProps> = ({ audioUrl, audioDuration }) => {
  return <Episode audioUrl={audioUrl} audioDuration={audioDuration} />;
};