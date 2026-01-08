import { Badge } from "./ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Briefcase, Calendar } from "lucide-react";

const profilePhoto = "https://icy-silence-30a0.dream66black.workers.dev/";

const skills = [
  "React",
  "TypeScript",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Next.js",
  "Vite",
  "Framer Motion",
  "Git",
];

const experiences = [
  { 
    year: "2023 - Present", 
    role: "Front-End Developer", 
    company: "Freelance",
    description: "Building modern web applications with React and TypeScript"
  },
  { 
    year: "2022 - 2023", 
    role: "Junior Front-End Developer", 
    company: "Web Studio",
    description: "Developed responsive interfaces and collaborated on client projects"
  },
  { 
    year: "2021 - 2022", 
    role: "Web Development Intern", 
    company: "Tech Startup",
    description: "Learned modern development practices and contributed to team projects"
  },
];

const About = () => {
  const { ref: photoRef, isVisible: photoVisible } = useScrollAnimation();
  const { ref: bioRef, isVisible: bioVisible } = useScrollAnimation();
  const { ref: skillsRef, isVisible: skillsVisible } = useScrollAnimation();
  const { ref: experienceRef, isVisible: experienceVisible } = useScrollAnimation();

  return (
    <section id="about" className="section-padding bg-secondary/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          {/* Photo */}
          <div
            ref={photoRef}
            className={`relative inline-block mb-8 transition-all duration-700 ease-out ${
              photoVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
            }`}
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-muted to-secondary p-1">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              I'm a passionate Front-End Developer dedicated to creating beautiful, 
              responsive, and user-friendly web experiences. I specialize in modern 
              JavaScript frameworks and love bringing designs to life with clean, 
              efficient code. When I'm not coding, you'll find me exploring new 
              technologies and pushing creative boundaries.
            </p>
          </div>

          {/* Skills */}
          <div
            ref={skillsRef}
            className={`mb-16 transition-all duration-700 delay-200 ease-out ${
              skillsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-6">
              Technologies & Tools
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, index) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="px-4 py-2 text-sm font-normal border-border/50 bg-background/50 hover:bg-secondary/50 hover:border-border transition-all duration-300"
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
            <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-8">
              Experience
            </h3>
            <div className="grid gap-4">
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
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* Timeline indicator */}
        <div className="flex items-center gap-3 sm:w-36 shrink-0">
          <div className="w-2 h-2 rounded-full bg-muted-foreground/40 group-hover:bg-foreground/60 transition-colors duration-300" />
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/70 group-hover:text-muted-foreground transition-colors duration-300">
            <Calendar className="w-3 h-3" />
            <span>{item.year}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 text-left">
          <div className="flex items-start gap-2 mb-1">
            <Briefcase className="w-4 h-4 text-muted-foreground/50 mt-0.5 group-hover:text-muted-foreground transition-colors duration-300" />
            <div>
              <h4 className="experience-role font-medium text-foreground/90 transition-colors duration-300">
                {item.role}
              </h4>
              <p className="experience-company text-sm text-muted-foreground/70 transition-colors duration-300">
                {item.company}
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground/60 mt-2 pl-6 group-hover:text-muted-foreground/80 transition-colors duration-300">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
