import { Badge } from "./ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const profilePhoto = "https://cdn.discordapp.com/avatars/993573969082986638/880181fe0f8b4f9480fefc27489bb5a1.png?size=1024";

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
            className={`relative inline-block mb-8 transition-all duration-700 ${
              photoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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
            className={`transition-all duration-700 delay-100 ${
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
            className={`mb-12 transition-all duration-700 delay-200 ${
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
                  className="px-4 py-2 text-sm font-normal border-border/50 bg-background/50 hover:bg-secondary/50 transition-colors"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div
            ref={experienceRef}
            className={`max-w-md mx-auto transition-all duration-700 delay-300 ${
              experienceVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-8">
              Experience
            </h3>
            <div className="space-y-6">
              {[
                { year: "2023 - Now", role: "Front-End Developer", company: "Freelance" },
                { year: "2022 - 2023", role: "Junior Front-End Developer", company: "Web Studio" },
                { year: "2021 - 2022", role: "Web Development Intern", company: "Tech Startup" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative flex items-center gap-6"
                  style={{ transitionDelay: `${(index + skills.length) * 50}ms` }}
                >
                  {/* Dot and line */}
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-muted-foreground/50" />
                    {index < 2 && (
                      <div className="w-px h-12 bg-border/50 -mb-6" />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="text-left flex-1">
                    <p className="text-xs text-muted-foreground mb-1">{item.year}</p>
                    <p className="font-medium">{item.role}</p>
                    <p className="text-sm text-muted-foreground">{item.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
