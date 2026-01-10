import { Badge } from "./ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Briefcase, Calendar } from "lucide-react";

const profilePhoto = "https://icy-silence-30a0.dream66black.workers.dev/";

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Vite",
  "REST APIs",
  "Firefox Extensions",
  "Discord Bots",
  "Git",
];

const experiences = [
  { 
    year: "2025 – Present", 
    role: "Multidisciplinary Development", 
    company: "Full-Stack Focus",
    description: "Expanding toward full-stack capability: building web apps, bots, APIs, and Firefox extensions. Emphasis on reliable implementations, reusable patterns, and rapid prototyping to turn ideas into production-ready tools."
  },
  { 
    year: "2024 – 2025", 
    role: "Project-driven Growth", 
    company: "Independent Development",
    description: "Moved from tutorials to independent projects. Focused on polished front-end interfaces and practical Node.js usage. Integrated external APIs and improved code organization, accessibility, and responsive behaviour across devices."
  },
  { 
    year: "2023 – 2024", 
    role: "Foundations", 
    company: "Self-Study",
    description: "Began learning web development through self-study (YouTube, documentation, targeted search). Mastered the core building blocks: HTML, CSS, JavaScript. Built small, functional projects to practice DOM manipulation, event handling, and responsive layout."
  },
];

const About = () => {
  const { ref: photoRef, isVisible: photoVisible } = useScrollAnimation();
  const { ref: bioRef, isVisible: bioVisible } = useScrollAnimation();
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation();
  const { ref: experienceRef, isVisible: experienceVisible } = useScrollAnimation();

  return (
    <section id="about" className="section-padding bg-secondary/20">
      <div className="max-w-4xl mx-auto px-2 sm:px-0">
        <div className="text-center">
          {/* Photo */}
          <div
            ref={photoRef}
            className={`relative inline-block mb-6 sm:mb-8 transition-all duration-700 ease-out ${
              photoVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
            }`}
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-muted to-secondary p-1">
              <img
                src={profilePhoto}
                alt="E - Front-End Developer"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-foreground/5 animate-glow" />
          </div>

          {/* Bio */}
          <div
            ref={bioRef}
            className={`transition-all duration-700 delay-100 ease-out ${
              bioVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">About Me</h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto px-2 sm:px-4">
              I'm a self-taught developer focused on full-stack development. 
              Starting from HTML, CSS, and JavaScript, I've evolved into building 
              web apps, bots, APIs, and browser extensions. I care about clean code, 
              solid architecture, and transforming ideas into functional, production-ready tools.
            </p>
          </div>

          {/* Skills */}
          <div
            ref={skillsRef}
            className={`mb-12 sm:mb-16 transition-all duration-700 delay-200 ease-out ${
              skillsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground mb-4 sm:mb-6">
              Technologies & Tools
            </h3>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
              {skills.map((skill, index) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-normal border-border/50 bg-background/50 hover:bg-secondary/50 hover:border-border transition-all duration-300"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div
            ref={experienceRef}
            className={`max-w-2xl mx-auto transition-all duration-700 delay-300 ease-out ${
              experienceVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <h3 className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground mb-6 sm:mb-8">
              Experience
            </h3>
            <div className="grid gap-3 sm:gap-4">
              {experiences.map((item, index) => (
                <ExperienceCard 
                  key={index} 
                  item={item} 
                  index={index}
                  parentVisible={experienceVisible}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ExperienceItem {
  year: string;
  role: string;
  company: string;
  description: string;
}

const ExperienceCard = ({ 
  item, 
  index, 
  parentVisible 
}: { 
  item: ExperienceItem; 
  index: number;
  parentVisible: boolean;
}) => {
  return (
    <div
      className={`experience-card group cursor-default transition-all duration-500 ease-out ${
        parentVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-6"
      }`}
      style={{ 
        transitionDelay: parentVisible ? `${index * 100 + 100}ms` : "0ms"
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
        {/* Timeline indicator */}
        <div className="flex items-center gap-2 sm:gap-3 sm:w-36 shrink-0">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-muted-foreground/40 group-hover:bg-foreground/60 transition-colors duration-300" />
          <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs text-muted-foreground/70 group-hover:text-muted-foreground transition-colors duration-300">
            <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span>{item.year}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-left">
          <div className="flex items-start gap-1.5 sm:gap-2 mb-1">
            <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground/50 mt-0.5 group-hover:text-muted-foreground transition-colors duration-300 shrink-0" />
            <div>
              <h4 className="experience-role font-medium text-sm sm:text-base text-foreground/90 transition-colors duration-300">
                {item.role}
              </h4>
              <p className="experience-company text-xs sm:text-sm text-muted-foreground/70 transition-colors duration-300">
                {item.company}
              </p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground/60 mt-2 pl-5 sm:pl-6 group-hover:text-muted-foreground/80 transition-colors duration-300 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
