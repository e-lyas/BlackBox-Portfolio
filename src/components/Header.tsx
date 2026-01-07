import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    closeMobileMenu();
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const closeMobileMenu = () => {
    if (isMobileMenuOpen) {
      setIsMenuClosing(true);
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setIsMenuClosing(false);
      }, 200);
    }
  };

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    } else {
      setIsMobileMenuOpen(true);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/30"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-lg font-semibold tracking-tight hover:text-foreground/80 transition-colors group"
        >
          <span className="text-primary">e</span>
          <span className="text-muted-foreground group-hover:text-foreground transition-colors">.</span>
          <span className="text-foreground/80 group-hover:text-foreground transition-colors">lyas</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </button>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
          >
            <span className="relative w-5 h-5">
              <X className={`w-5 h-5 absolute inset-0 transition-all duration-200 ${
                isMobileMenuOpen && !isMenuClosing ? "rotate-0 opacity-100" : "rotate-90 opacity-0"
              }`} />
              <Menu className={`w-5 h-5 absolute inset-0 transition-all duration-200 ${
                isMobileMenuOpen && !isMenuClosing ? "-rotate-90 opacity-0" : "rotate-0 opacity-100"
              }`} />
            </span>
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          className={`md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/30 overflow-hidden transition-all duration-200 ease-out ${
            isMenuClosing 
              ? "opacity-0 -translate-y-2" 
              : "opacity-100 translate-y-0 animate-fade-in"
          }`}
        >
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link, index) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className={`block w-full text-left text-muted-foreground hover:text-foreground transition-all py-2 ${
                  isMenuClosing 
                    ? "opacity-0 -translate-x-4" 
                    : "opacity-100 translate-x-0"
                }`}
                style={{ 
                  transitionDelay: isMenuClosing ? `${(navLinks.length - index - 1) * 30}ms` : `${index * 50}ms`
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
