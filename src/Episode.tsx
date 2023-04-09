import { AbsoluteFill, Audio, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { TextContainer } from './TextContainer';
import { Word } from './Word';
import { MainBackground } from './MainBackground';
import { TextBackground } from './TextBackground';
import axios from 'axios';
import { useState, useEffect } from 'react';
import FormData from 'form-data';

interface EpisodesProps {
  audioUrl: string;
  audioDuration: number;
}

interface WordData {
  start: number;
  end: number;
  word: string;
}

export const Episode: React.FC<EpisodesProps> = ({ audioUrl, audioDuration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const translateY = interpolate(frame, [0, 120], [0, 200]);

  const [sentence, setSentence] = useState("");
  const [wordsData, setWordsData] = useState<WordData[]>([]);


  useEffect(() => {
    const fetchSentence = async () => {
      const API_KEY = "";
      const remoteAudioUrl = audioUrl;
    
      // Download the remote audio file as an ArrayBuffer
      const audioResponse = await axios.get(remoteAudioUrl, {
        responseType: "arraybuffer",
      });
    
      // Convert the ArrayBuffer to a File
      const audioFile = new File([audioResponse.data], "openai.mp3", { type: "audio/mpeg" });
    
      const formData = new FormData();
      formData.append("file", audioFile);
      formData.append("model", "whisper-1");
    
      const response = await axios.post(
        "https://api.openai.com/v1/audio/transcriptions",
        formData,
        {
          headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    
      // Assuming the response contains the sentence in 'response.data.transcription'
      console.log(response.data);
      
      setSentence(response.data.text);
      setWordsData(response.data.words);
    };

    fetchSentence();
  }, []);

  const words = sentence.split(" ");
  const estimatedWordDuration = audioDuration / words.length;


  const getHighlightedWordIndex = (frame: number) => {
    const currentTime = frame / fps;
  
    if (words.length > 0) {
      const estimatedWordIndex = Math.floor(currentTime / estimatedWordDuration);
      return estimatedWordIndex;
    }
  
    return -1;
  };
   

  const highlightedWordIndex = getHighlightedWordIndex(frame);

  return (
    <AbsoluteFill
      style={{
        background: "grey",
        padding: 54,
      }}
    >
      <Audio src={audioUrl} />
      <MainBackground>
        <TextBackground translateY={translateY}>
          {sentence && (
            <TextContainer>
              {words.map((word, index) => (
                <Word
                  key={index}
                  index={index}
                  highlightedWordIndex={highlightedWordIndex}
             
                >
                  {word}
                </Word>
              ))}
            </TextContainer>
          )}
        </TextBackground>
      </MainBackground>
    </AbsoluteFill>
  );
}; 

