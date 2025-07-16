import React from "react";
import { useEffect, useState } from "react";

const useSectionVisible = (sectionId) => {
    const [isVisible, setIsVisible] = useState(true);
  
    useEffect(() => {
      const section = document.getElementById(sectionId);
      if (!section) return;
  
      const observer = new IntersectionObserver(
        ([entry]) => setIsVisible(entry.isIntersecting),
        { threshold: 0.1 }
      );
  
      observer.observe(section);
  
      return () => {
        observer.unobserve(section);
      };
    }, [sectionId]);
  
    return isVisible;
  };
  
  export default useSectionVisible;