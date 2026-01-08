import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "./ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type ProjectType = "All" | "Website" | "Bot" | "In Progress";

interface Project {
  title: string;
  description: string;
  tags: string[];
  type: ProjectType;
  liveUrl?: string;
  codeUrl?: string;
  isCurrent?: boolean;
}

const projects: Project[] = [
  {
    title: "Personal Portfolio",
    description: "The portfolio you're currently viewing — built with modern technologies, smooth animations, and a clean minimal aesthetic.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    type: "Website",
    codeUrl: "https://github.com/e-lyas/Portfolio",
    isCurrent: true,
  },
  {
    title: "E.L.Y.A.S",
    description: "A personal project showcasing modern front-end development techniques with clean design and smooth interactions.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    type: "Website",
    liveUrl: "https://e-l-y-a-s-main.vercel.app",
    codeUrl: "https://github.com/e-lyas/e.l.y.a.s-main",
  },
  {
    title: "Coming Soon",
    description: "A new project is currently in development. Stay tuned for updates on this exciting upcoming work.",
    tags: ["In Progress"],
    type: "In Progress",
  },
  {
    title: "Coming Soon",
    description: "Another project is on the way. Check back later to see what's being built.",
    tags: ["In Progress"],
    type: "In Progress",
  },
];

const filterCategories: ProjectType[] = ["All", "Website", "Bot", "In Progress"];

const ProjectCard = ({ project, index, parentVisible }: { project: Project; index: number; parentVisible: boolean }) => {
  return (
    <div 
      className={`group glass-card p-6 hover-lift transition-all duration-500 ease-out ${
        parentVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-8"
      } ${project.isCurrent ? "ring-1 ring-foreground/10" : ""}`}
      style={{ 
        transitionDelay: parentVisible ? `${index * 100 + 100}ms` : "0ms"
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-semibold group-hover:text-foreground/80 transition-colors duration-300">
          {project.title}
        </h3>
        <div className="flex gap-2">
          {project.isCurrent && (
            <Badge 
              variant="outline" 
              className="text-xs border-foreground/20 text-muted-foreground"
            >
              Current
            </Badge>
          )}
          <Badge 
            variant="secondary" 
            className="text-xs bg-primary/10 text-primary border-0"
          >
            {project.type}
          </Badge>
        </div>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4 group-hover:text-muted-foreground/90 transition-colors duration-300">
        {project.description}
      </p>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="text-xs font-normal bg-muted/50 hover:bg-muted text-muted-foreground transition-colors duration-300"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-4">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </a>
        )}
        {project.codeUrl && (
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <Github className="w-4 h-4" />
            View Code
          </a>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectType>("All");
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: projectsRef, isVisible: projectsVisible } = useScrollAnimation();

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.type === activeFilter);

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <div
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-700 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Selected Work</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            A collection of projects that showcase my passion for building elegant solutions.
          </p>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2">
            {filterCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeFilter === category
                    ? "bg-foreground text-background shadow-md"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.title + index} 
              project={project} 
              index={index}
              parentVisible={projectsVisible}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No projects in this category yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
