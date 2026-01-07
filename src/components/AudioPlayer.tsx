import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { Button } from "./ui/button";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Chill ambient music - using a royalty-free lofi track
  const audioSrc = "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3";

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;
      audio.loop = true;

      const handleCanPlay = () => setIsLoaded(true);
      audio.addEventListener("canplaythrough", handleCanPlay);

      return () => {
        audio.removeEventListener("canplaythrough", handleCanPlay);
      };
    }
  }, []);

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

  return (
    <>
      <audio ref={audioRef} src={audioSrc} preload="auto" />
      
      {/* Initial prompt tooltip */}
      {showPrompt && !hasInteracted && isLoaded && (
        <div className="fixed bottom-20 right-6 z-50 animate-fade-in">
          <div className="bg-card/90 backdrop-blur-xl border border-border/50 rounded-lg px-4 py-2 text-sm text-foreground shadow-lg">
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4 text-primary animate-pulse" />
              <span>Click to play ambient music</span>
            </div>
            <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-card/90" />
          </div>
        </div>
      )}
      
      <Button
        variant="ghost"
        size="icon"
        onClick={togglePlay}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-card/80 backdrop-blur-xl border border-border/50 hover:bg-secondary/50 transition-all duration-300 ${
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
    </>
  );
};

export default AudioPlayer;
