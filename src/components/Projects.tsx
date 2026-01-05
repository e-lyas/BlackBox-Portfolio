import { ExternalLink, Github } from "lucide-react";
import { Badge } from "./ui/badge";

interface Project {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  codeUrl?: string;
}

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "A modern shopping experience with real-time inventory, secure payments, and seamless checkout flow.",
    tags: ["React", "Node.js", "Stripe", "PostgreSQL"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Task Management App",
    description: "Collaborative project management tool with drag-and-drop boards, team chat, and analytics.",
    tags: ["TypeScript", "Next.js", "Prisma", "Tailwind"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Weather Dashboard",
    description: "Beautiful weather visualization with 7-day forecasts, interactive maps, and location search.",
    tags: ["React", "D3.js", "OpenWeather API"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "Portfolio Generator",
    description: "CLI tool that scaffolds beautiful portfolio websites from a simple configuration file.",
    tags: ["Node.js", "CLI", "Handlebars"],
    codeUrl: "#",
  },
  {
    title: "Real-time Chat App",
    description: "End-to-end encrypted messaging with file sharing, voice notes, and group conversations.",
    tags: ["Socket.io", "React", "MongoDB", "WebRTC"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    title: "AI Image Generator",
    description: "Generate stunning artwork using machine learning with style transfer and prompt engineering.",
    tags: ["Python", "TensorFlow", "React", "FastAPI"],
    liveUrl: "#",
    codeUrl: "#",
  },
];

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="group glass-card p-6 hover-lift">
      <h3 className="text-xl font-semibold mb-3 group-hover:text-foreground/90 transition-colors">
        {project.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {project.description}
      </p>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="text-xs font-normal bg-muted/50 hover:bg-muted text-muted-foreground"
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Live Demo
          </a>
        )}
        {project.codeUrl && (
          <a
            href={project.codeUrl}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
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
  return (
    <section id="projects" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Selected Work</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A collection of projects that showcase my passion for building elegant solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
