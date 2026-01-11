import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateCursorType = () => {
      const hoveredElement = document.elementFromPoint(position.x, position.y);
      if (hoveredElement) {
        const computedStyle = window.getComputedStyle(hoveredElement);
        setIsPointer(
          computedStyle.cursor === "pointer" ||
          hoveredElement.tagName === "BUTTON" ||
          hoveredElement.tagName === "A" ||
          hoveredElement.closest("button") !== null ||
          hoveredElement.closest("a") !== null
        );
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousemove", updateCursorType);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousemove", updateCursorType);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [position.x, position.y]);

  // Hide on mobile/touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Main cursor dot */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isPointer ? 0.5 : 1})`,
        }}
      >
        <div className={`w-3 h-3 rounded-full bg-foreground transition-all duration-200 ${isPointer ? "scale-150" : ""}`} />
      </div>

      {/* Cursor ring */}
      <div
        className={`fixed pointer-events-none z-[9998] transition-all duration-300 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`,
        }}
      >
        <div className={`w-8 h-8 rounded-full border border-foreground/30 transition-all duration-200 ${isPointer ? "border-foreground/50" : ""}`} />
      </div>

      {/* Hide default cursor globally */}
      <style>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
