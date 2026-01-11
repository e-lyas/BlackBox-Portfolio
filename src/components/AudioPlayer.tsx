import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [showVolume, setShowVolume] = useState(false);
  const [volume, setVolume] = useState(30);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Chill lofi background music
  const audioSrc = "/audio/lofi-beat-chill-7373.mp3";

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume / 100;
      audio.loop = true;

      const handleCanPlay = () => setIsLoaded(true);
      audio.addEventListener("canplaythrough", handleCanPlay);

      return () => {
        audio.removeEventListener("canplaythrough", handleCanPlay);
      };
    }
  }, []);

  // Update volume when slider changes
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume / 100;
    }
  }, [volume]);

  // Hide prompt after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      setHasInteracted(true);
      setShowPrompt(false);
      
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(() => {
          // Autoplay might be blocked
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  return (
    <>
      <audio ref={audioRef} src={audioSrc} preload="auto" />
      
      {/* Initial prompt tooltip */}
      {showPrompt && !hasInteracted && isLoaded && (
        <div className="fixed bottom-20 right-6 z-50 animate-fade-in">
          <div className="bg-card/90 backdrop-blur-xl border border-border/50 rounded-lg px-4 py-2 text-sm text-foreground shadow-lg">
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-primary animate-pulse" />
              <span>Click to play music</span>
            </div>
            <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-card/90" />
          </div>
        </div>
      )}

      {/* Container for hover group - keeps slider visible when moving mouse */}
      <div 
        className="fixed bottom-6 right-6 z-50"
        onMouseEnter={() => setShowVolume(true)}
        onMouseLeave={() => setShowVolume(false)}
      >
        {/* Volume slider popup */}
        {showVolume && isPlaying && (
          <div className="absolute bottom-14 right-0 mb-2 animate-fade-in">
            <div className="bg-card/90 backdrop-blur-xl border border-border/50 rounded-lg px-4 py-3 shadow-lg">
              <div className="flex items-center gap-3">
                <VolumeX className="w-4 h-4 text-muted-foreground" />
                <Slider
                  value={[volume]}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                  className="w-24"
                />
                <Volume2 className="w-4 h-4 text-foreground" />
              </div>
              <div className="text-xs text-muted-foreground text-center mt-1">{volume}%</div>
              <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-card/90" />
            </div>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlay}
          className={`w-12 h-12 rounded-full bg-card/80 backdrop-blur-xl border border-border/50 hover:bg-secondary/50 transition-all duration-300 ${
            isLoaded ? "opacity-100" : "opacity-50"
          } ${!hasInteracted && isLoaded ? "animate-pulse" : ""}`}
          aria-label={isPlaying ? "Mute audio" : "Play audio"}
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-foreground" />
          ) : (
            <VolumeX className="w-5 h-5 text-muted-foreground" />
          )}
          
          {/* Animated rings when playing */}
          {isPlaying && (
            <>
              <span className="absolute inset-0 rounded-full border border-foreground/20 animate-ping" />
              <span className="absolute inset-0 rounded-full border border-foreground/10 animate-ping animation-delay-200" />
            </>
          )}
        </Button>
      </div>
    </>
  );
};

export default AudioPlayer;