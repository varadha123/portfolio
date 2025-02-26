document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = "translateY(20px)";
    });
    
    const fadeInSection = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight * 0.8; // Trigger animation earlier
            if (sectionTop < triggerPoint) {
                section.style.opacity = 1;
                section.style.transform = "translateY(0)";
                section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
            }
        });
    };
    
    let scrollTimeout;
    window.addEventListener("scroll", () => {
        if (!scrollTimeout) {
            window.requestAnimationFrame(() => {
                fadeInSection();
                scrollTimeout = null;
            });
        }
        scrollTimeout = true;
    });
    window.addEventListener("resize", fadeInSection);
    fadeInSection();

    const projects = document.querySelectorAll(".project");
    projects.forEach(project => {
        project.style.transition = "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out";
        
        const handleInteraction = (e) => {
            const rect = project.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const tiltX = (y - centerY) / 20;
            const tiltY = (centerX - x) / 20;

            if (e.type === "mouseover" || e.type === "mousemove") {
                project.style.transform = `scale(1.05) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
                project.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
            } else {
                project.style.transform = "scale(1) rotateX(0) rotateY(0)";
                project.style.boxShadow = "none";
            }
        };

        project.addEventListener("mouseover", handleInteraction);
        project.addEventListener("mousemove", handleInteraction);
        project.addEventListener("mouseout", handleInteraction);
        project.addEventListener("touchstart", handleInteraction, { passive: true });
        project.addEventListener("touchend", handleInteraction);
    });
});
  // Experience section animations
  const experienceSection = document.getElementById('experience');
  const experienceItems = experienceSection.querySelectorAll('li');
  
  // Add initial styles
  experienceSection.style.opacity = '0';
  experienceSection.style.transform = 'translateY(50px)';
  experienceItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-20px)';
      item.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
  });
  // Function to check if element is in viewport
  const isInViewport = (element) => {
      const rect = element.getBoundingClientRect();
      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
  };
  
  // Animate experience section when in viewport
  const animateExperience = () => {
      if (isInViewport(experienceSection)) {
          experienceSection.style.opacity = '1';
          experienceSection.style.transform = 'translateY(0)';
          experienceSection.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
  
          // Animate list items with delay
          experienceItems.forEach((item, index) => {
              setTimeout(() => {
                  item.style.opacity = '1';
                  item.style.transform = 'translateX(0)';
              }, 200 * (index + 1));
          });
  
          // Add hover effect to list items
          experienceItems.forEach(item => {
              item.addEventListener('mouseenter', () => {
                  item.style.transform = 'scale(1.02) translateX(10px)';
                  item.style.color = '#007bff';
              });
  
              item.addEventListener('mouseleave', () => {
                  item.style.transform = 'scale(1) translateX(0)';
                  item.style.color = '';
              });
          });
  
          // Remove scroll listener once animation is triggered
          window.removeEventListener('scroll', animateExperience);
      }
  };
  
  // Add scroll event listener
  window.addEventListener('scroll', animateExperience);
  // Initial check
  animateExperience();
  