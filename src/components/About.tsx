import { Badge } from "./ui/badge";

const skills = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "PostgreSQL",
  "AWS",
  "Docker",
  "GraphQL",
  "Figma",
  "Git",
];

const About = () => {
  return (
    <section id="about" className="section-padding bg-secondary/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          {/* Photo */}
          <div className="relative inline-block mb-8">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-muted to-secondary p-1">
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-4xl font-bold text-muted-foreground">
                JD
              </div>
            </div>
            <div className="absolute inset-0 rounded-full bg-foreground/5 animate-glow" />
          </div>

          {/* Bio */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
            I'm a developer with 5+ years of experience building web applications 
            that people love to use. I believe in writing clean, maintainable code 
            and creating intuitive user experiences. When I'm not coding, you'll find 
            me exploring new technologies, contributing to open source, or enjoying 
            a good cup of coffee.
          </p>

          {/* Skills */}
          <div className="mb-12">
            <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-6">
              Technologies & Tools
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, index) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="px-4 py-2 text-sm font-normal border-border/50 bg-background/50 hover:bg-secondary/50 transition-colors opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="max-w-md mx-auto">
            <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-8">
              Experience
            </h3>
            <div className="space-y-6">
              {[
                { year: "2023 - Now", role: "Senior Developer", company: "Tech Corp" },
                { year: "2020 - 2023", role: "Full Stack Developer", company: "StartupX" },
                { year: "2018 - 2020", role: "Frontend Developer", company: "Agency Y" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative flex items-center gap-6 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${(index + skills.length) * 50}ms` }}
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
