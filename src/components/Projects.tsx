import { useState } from "react";
import { ExternalLink, Github, Clock } from "lucide-react";
import { Badge } from "./ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type ProjectType = "All" | "Website" | "Browser Extension" | "Bot" | "API" | "In Progress";

interface Project {
  title: string;
  description: string;
  tags: string[];
  type: ProjectType;
  liveUrl?: string;
  codeUrl?: string;
  isCurrent?: boolean;
  inProgress?: boolean;
}

const projects: Project[] = [
  {
    title: "Personal Portfolio",
    description: "The portfolio you're currently viewing — built with modern technologies, smooth animations, and a clean minimal aesthetic.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    type: "Website",
    codeUrl: "https://github.com/e-lyas/BlackBox-Portfolio",
    isCurrent: true,
  },
  {
    title: "Social-Links",
    description: "A modern, interactive social links website built for creators and developers.",
    tags: ["HTML", "CSS", "JS"],
    type: "Website",
    liveUrl: "https://e-l-y-a-s-main.vercel.app",
    codeUrl: "https://github.com/e-lyas/e.l.y.a.s-main",
  },
  {
    title: "Discord PFP Fetcher",
    description: "A Cloudflare Worker that fetches your latest Discord profile picture and serves it as a dynamic image URL for use on any website.",
    tags: ["Cloudflare Workers", "JavaScript", "Discord API"],
    type: "API",
    codeUrl: "https://github.com/e-lyas/Discord-PFP-Fetcher",
  },
  {
    title: "Firefox Extension",
    description: "A productivity-focused browser extension for Firefox that streamlines browsing with quick access tools and custom utilities. Built using the WebExtensions API with a focus on performance and user experience.",
    tags: ["JavaScript", "WebExtensions API", "HTML", "CSS", "Firefox"],
    type: "Browser Extension",
    inProgress: true,
  },
  {
    title: "Discord Bot",
    description: "A feature-rich Discord bot with moderation commands, custom utilities, server management tools, and interactive features. Built with Discord.js and actively being expanded with new capabilities.",
    tags: ["Node.js", "Discord.js", "JavaScript", "REST APIs"],
    type: "Bot",
    inProgress: true,
  },
];

const filterCategories: ProjectType[] = ["All", "Website", "Browser Extension", "Bot", "API", "In Progress"];

const getProjectCount = (category: ProjectType): number => {
  if (category === "All") return projects.length;
  if (category === "In Progress") return projects.filter(p => p.inProgress).length;
  return projects.filter(p => p.type === category).length;
};

const ProjectCard = ({ project, index, parentVisible }: { project: Project; index: number; parentVisible: boolean }) => {
  return (
    <div 
      className={`group relative glass-card p-4 sm:p-6 hover-lift transition-all duration-500 ease-out ${
        parentVisible 
          ? "opacity-100 translate-y-0 scale-100" 
          : "opacity-0 translate-y-8 scale-95"
      } ${project.isCurrent ? "ring-1 ring-foreground/10" : ""}`}
      style={{ 
        transitionDelay: parentVisible ? `${index * 100 + 100}ms` : "0ms"
      }}
    >
      {/* In Progress Overlay Badge */}
      {project.inProgress && (
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-auto md:right-auto md:relative md:order-first md:mb-3 z-10">
          <Badge 
            className="flex items-center gap-1 sm:gap-1.5 bg-amber-500/90 text-white border-0 shadow-lg animate-pulse text-[10px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1"
          >
            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            In Progress
          </Badge>
        </div>
      )}
      
      <div className={`flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0 mb-3 ${project.inProgress ? 'pr-24 sm:pr-28 md:pr-0' : ''}`}>
        <h3 className="text-lg sm:text-xl font-semibold group-hover:text-foreground/80 transition-colors duration-300">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 sm:ml-4 sm:shrink-0">
          {project.isCurrent && (
            <Badge 
              variant="outline" 
              className="text-[10px] sm:text-xs border-foreground/20 text-muted-foreground"
            >
              Current
            </Badge>
          )}
          <Badge 
            variant="secondary" 
            className="text-[10px] sm:text-xs bg-primary/10 text-primary border-0"
          >
            {project.type}
          </Badge>
        </div>
      </div>
      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 group-hover:text-muted-foreground/90 transition-colors duration-300">
        {project.description}
      </p>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
        {project.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="text-[10px] sm:text-xs font-normal bg-muted/50 hover:bg-muted text-muted-foreground transition-colors duration-300 px-2 py-0.5 sm:px-2.5"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-3 sm:gap-4">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Live Demo
          </a>
        )}
        {project.codeUrl && (
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            View Code
          </a>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectType>("All");
  const [isAnimating, setIsAnimating] = useState(false);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: projectsRef, isVisible: projectsVisible } = useScrollAnimation();

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : activeFilter === "In Progress"
    ? projects.filter(project => project.inProgress)
    : projects.filter(project => project.type === activeFilter);

  const handleFilterChange = (category: ProjectType) => {
    if (category === activeFilter) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveFilter(category);
      setTimeout(() => setIsAnimating(false), 50);
    }, 200);
  };

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <div
          ref={headerRef}
          className={`text-center mb-8 sm:mb-12 transition-all duration-700 ease-out ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Selected Work</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-6 sm:mb-8 px-2">
            A collection of projects that showcase my passion for building elegant solutions.
          </p>
          
          {/* Filter Buttons with Count Badges */}
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 px-2">
            {filterCategories.map((category) => {
              const count = getProjectCount(category);
              return (
                <button
                  key={category}
                  onClick={() => handleFilterChange(category)}
                  className={`group relative px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 flex items-center gap-1.5 sm:gap-2 ${
                    activeFilter === category
                      ? "bg-foreground text-background shadow-md"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <span className="whitespace-nowrap">{category}</span>
                  <span 
                    className={`inline-flex items-center justify-center min-w-[1rem] sm:min-w-[1.25rem] h-4 sm:h-5 px-1 sm:px-1.5 text-[10px] sm:text-xs font-semibold rounded-full transition-all duration-300 ${
                      activeFilter === category
                        ? "bg-background/20 text-background"
                        : "bg-foreground/10 text-muted-foreground group-hover:bg-foreground/15"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          ref={projectsRef}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 transition-all duration-300 ${
            isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.title + index} 
              project={project} 
              index={index}
              parentVisible={projectsVisible && !isAnimating}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && !isAnimating && (
          <div className="text-center py-8 sm:py-12 text-sm sm:text-base text-muted-foreground animate-fade-in">
            No projects in this category yet.
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
