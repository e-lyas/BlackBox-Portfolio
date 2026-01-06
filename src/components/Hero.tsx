import { ArrowDown } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
      
      {/* Floating orbs for ambiance */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-muted/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-muted/5 rounded-full blur-3xl animate-float animation-delay-300" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Name */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight opacity-0 animate-fade-in-up">
          <span className="inline-block hover:scale-105 transition-transform duration-300">e</span>
          <span className="text-muted-foreground">-</span>
          <span className="inline-block hover:scale-105 transition-transform duration-300">lyas</span>
        </h1>

        {/* Title */}
        <p className="mt-4 text-xl md:text-2xl text-muted-foreground font-light opacity-0 animate-fade-in-up animation-delay-100">
          Front-End Developer
        </p>

        {/* Tagline */}
        <p className="mt-8 text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up animation-delay-200">
          Crafting beautiful, responsive web experiences with modern technologies.
          <br className="hidden md:block" />
          Turning ideas into interactive reality.
        </p>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in-up animation-delay-300">
          <Button
            variant="default"
            size="lg"
            onClick={() => scrollToSection("projects")}
            className="group px-8 py-6 text-base font-medium"
          >
            View Projects
            <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection("contact")}
            className="px-8 py-6 text-base font-medium border-border/50 hover:bg-secondary/50"
          >
            Get in Touch
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in animation-delay-500">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
