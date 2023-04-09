// Root.tsx
import React, { useEffect, useState } from 'react';
import { Composition } from 'remotion';
import { HelloWorld } from './HelloWorld';

const audioUrl = 'http://d3d7iaj1xyzes9.cloudfront.net/72b6ae236d09053aae20f29e284bf4baf13b8c05_0IymPVXGJe-96.mp3'; // Replace this with the URL of your audio file

const getAudioDuration = async (url: string): Promise<number> => {
  return new Promise((resolve) => {
    const audio = new Audio(url);
    audio.addEventListener('loadedmetadata', () => {
      resolve(audio.duration);
    });
  });
};

export const RemotionRoot: React.FC = () => {
  const [durationInFrames, setDurationInFrames] = useState<number | null>(null);
	const [audioDuration, setAudioDuration] = useState<number | null>(null);

	useEffect(() => {
    const fetchAudioDuration = async () => {
      const duration = await getAudioDuration(audioUrl);
      setAudioDuration(duration);
      setDurationInFrames(Math.ceil(duration * 30)); // Assuming 30fps
    };

    fetchAudioDuration();
  }, []);

  if (durationInFrames === null || audioDuration === null) {
    return <div>Loading audio duration...</div>;
  }

  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={durationInFrames}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          audioUrl,
					audioDuration,
        }}
      />
    </>
  );
};
