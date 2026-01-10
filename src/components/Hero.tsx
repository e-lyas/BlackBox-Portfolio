import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

const Hero = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullName = "e-lyas";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullName.length) {
        setDisplayedText(fullName.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setShowCursor(false), 1000);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
      
      {/* Floating orbs for ambiance - hidden on small screens for performance */}
      <div className="hidden sm:block absolute top-1/4 left-1/4 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-muted/10 rounded-full blur-3xl animate-float" />
      <div className="hidden sm:block absolute bottom-1/4 right-1/4 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-muted/5 rounded-full blur-3xl animate-float animation-delay-300" />

      <div className="relative z-10 text-center max-w-4xl mx-auto w-full">
        {/* Name with typing animation */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight min-h-[1.2em]">
          <span className="inline-block hover:scale-105 transition-transform duration-300">
            {displayedText}
          </span>
          <span 
            className={`inline-block w-[2px] sm:w-[3px] h-[0.9em] bg-foreground ml-1 align-middle transition-opacity duration-100 ${
              showCursor ? "animate-pulse" : "opacity-0"
            }`}
          />
        </h1>

        {/* Title */}
        <p className="mt-3 sm:mt-4 text-lg sm:text-xl md:text-2xl text-muted-foreground font-light opacity-0 animate-fade-in-up animation-delay-100">
          Front-End Developer
        </p>

        {/* Tagline */}
        <p className="mt-5 sm:mt-8 text-base sm:text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up animation-delay-200 px-2 sm:px-0">
          Crafting beautiful, responsive web experiences with modern technologies.
          <br className="hidden md:block" />
          <span className="hidden md:inline"> </span>Turning ideas into interactive reality.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center opacity-0 animate-fade-in-up animation-delay-300 px-2 sm:px-0">
          <Button
            variant="default"
            size="lg"
            onClick={() => scrollToSection("projects")}
            className="group px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-medium w-full sm:w-auto"
          >
            View Projects
            <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection("contact")}
            className="px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-medium border-border/50 hover:bg-secondary/50 w-full sm:w-auto"
          >
            Get in Touch
          </Button>
        </div>
      </div>

      {/* Scroll indicator - animated chevrons */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in animation-delay-500">
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] sm:text-xs text-muted-foreground/50 uppercase tracking-widest mb-2">Scroll</span>
          <div className="flex flex-col items-center">
            <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
            <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground/25 animate-bounce -mt-2" style={{ animationDelay: "150ms" }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
