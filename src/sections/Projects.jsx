

import React from "react"; 
import { motion, useScroll, AnimatePresence } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
// motion: for animating elements
// useScroll: to track scroll position
// AnimatePresence: to animate components when mounting/unmounting

// Importing project images (desktop & mobile versions)
import img1 from "../assets/img1.JPG";
import img2 from "../assets/img2.JPG";
import img7 from "../assets/img7.png";
import img4 from "../assets/img4.png";
import img6 from "../assets/img6.png";
import photo1 from "../assets/photo1.JPG";
import photo2 from "../assets/photo2.PNG";
import photo3 from "../assets/photo3.png";

const MH3 = motion.h3; 
// Shortcut for <motion.h3> for easier typing

// 🔹 Custom Hook: Detects if screen size matches "mobile"
const useIsMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
    // Checks if the screen width is <= 639px (mobile breakpoint)
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query); // Media query list
    const handler = (e) => setIsMobile(e.matches); // Update state when query changes
    mql.addEventListener?.("change", handler) || mql.addListener(handler); 
    // Add correct event listener (modern OR fallback)

    setIsMobile(mql.matches); // Initialize with current screen size
    return () =>
      mql.removeEventListener?.("change", handler) || mql.removeListener(handler); 
    // Cleanup event listener
  }, [query]);

  return isMobile; 
};

export default function Projects() {
  const isMobile = useIsMobile(); 
  // Detect if the user is on a mobile screen

  // 🔹 List of project objects (dynamic images based on screen size)
  const projects = React.useMemo(
    () => [
      {
        title: "College Printing Hub",
        link: "https://project-tawny-nu-50.vercel.app/",
        github: "https://github.com/Aiswarya-rr/project",
        bgColor: "#b5b1b7",
        image: isMobile ? photo1 : img4, // Mobile vs desktop image
        description: "A comprehensive printing management system for college students and faculty. Features include document upload, printing queue management, cost calculation, and order tracking with real-time status updates.",
        techStack: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS", "JWT Authentication"],
        features: [
          "Document upload & preview",
          "Real-time printing queue management",
          "Automated cost calculation",
          "Order tracking system",
          "User authentication & profiles",
          "Mobile-responsive design"
        ]
      },
      {
        title: "Expense Tracker",
        link: "https://expense-tracker-beige-five-86.vercel.app/",
        github: "https://github.com/Aiswarya-rr/expense-tracker",
        bgColor: "#340d4d",
        image: isMobile ? photo2 : img6,
        description: "Personal finance management application that helps users track daily expenses, categorize spending, set budgets, and visualize financial patterns through interactive charts and analytics.",
        techStack: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS", "JWT Authentication"],
        features: [
          "Daily expense tracking",
          "Sp categorization system",
          "Budget setting & alerts",
          "Interactive financial charts",
          "Monthly/yearly reports",
          "Data export functionality"
        ]
      },
      {
        title: "An Integrated Medical Platform",
        link: "",
        github: "https://github.com/aiswarya-r/medical-platform",
        bgColor: "rgba(0, 50, 4, 0.34)",
        image: isMobile ? photo3 : img7,
        description: "Comprehensive healthcare management system connecting patients, doctors, and medical facilities. Features appointment scheduling, electronic health records, prescription management, and telemedicine capabilities.",
        techStack: ["supabase", "Typescript", "Nextjs", "Tailwind CSS"],
        features: [
          "Appointment scheduling system",
          "Electronic health records",
          "Prescription management",
          "Telemedicine video calls",
          "Patient-doctor messaging",
          "Medical document storage"
        ]
      },
    ],
    [isMobile] 
    // Memoize to prevent recalculating unless screen size changes
  );

  const sceneRef = React.useRef(null); 
  // Reference to the whole projects section (used for scroll tracking)

  const { scrollYProgress } = useScroll({
    target: sceneRef, 
    offset: ["start start", "end end"], 
    // Scroll progress is 0 when section top hits viewport top and 1 at the end
  });

  const thresholds = projects.map((_, i) => (i + 1) / projects.length); 
  // Array of thresholds to switch between projects as user scrolls
  const [activeIndex, setActiveIndex] = React.useState(0); 
  // Keeps track of which project is currently active

  // 🔹 Update activeIndex as user scrolls
  React.useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      const idx = thresholds.findIndex((t) => v <= t); 
      // Find the first threshold that is greater than or equal to scroll progress
      setActiveIndex(idx === -1 ? thresholds.length - 1 : idx); 
      // If not found, show the last project
    });
    return () => unsubscribe(); 
    // Cleanup scroll listener
  }, [scrollYProgress, thresholds]);

  const activeProject = projects[activeIndex]; 
  // Currently displayed project

  return (
    <section
      id="projects"
      ref={sceneRef} 
      className="relative text-white"
      style={{
        height: `${100 * projects.length}vh`, 
        // Section height = 100vh per project (makes scroll-based transitions work) 
        backgroundColor: activeProject.bgColor, 
        // Background changes color based on active project
        transition: "background-color 400ms ease",
      }}
    >
      {/* Sticky container keeps content fixed while scrolling */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        
        {/* Section Title */}
    <div className="flex justify-center">
 
     <div className="bg-transparent">
     <motion.h2
  className="text-4xl mt-10 text-center sm:text-5xl font-bold bg-clip-text text-transparent "
  initial={{ opacity: 0, y: -30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  My Skills
</motion.h2>
</div>
</div>

        {/* Main Project Display Area */}
        <div className={`relative w-full flex-1 flex items-center justify-center ${isMobile ? "-mt-4" : ""}`}>
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                activeIndex === idx ? "opacity-100 z-20" : "opacity-0 z-0 sm:z-10"
              }`}
              style={{ width: "85%", maxWidth: "1200px" }}
            >
              {/* Animate project title when switching */}
              <AnimatePresence mode="wait">
                {activeIndex === idx && (
                  <MH3
                    key={project.title}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`block text-center text-[clamp(2rem,6vw,5rem)] text-white/95 sm:absolute sm:-top-21 sm:left-[35%] lg:left-[-5%] lg:-top-40 sm:mb-0 font-bangers italic font-semibold ${
                      isMobile ? "-mt-25" : ""
                    }`}
                    style={{ zIndex: 5, textAlign: isMobile ? "center" : "left" }}
                  >
                    {project.title}
                  </MH3>
                )}
              </AnimatePresence>

              {/* Project Content Container */}
              <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-2 gap-8'} items-center`}>
                
                {/* Left Side - Project Image */}
                <div
                  className={`relative overflow-hidden bg-black/20 shadow-2xl md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] ${
                    isMobile ? "rounded-lg" : "rounded-xl"
                  } h-[50vh] sm:h-[55vh]`}
                  style={{ zIndex: 10, transition: "box-shadow 250ms ease" }}
                >
                  {/* Project Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain object-center drop-shadow-xl md:drop-shadow-2xl"
                    style={{
                      position: "relative",
                      zIndex: 10,
                      filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.65))",
                      transition: "filter 200ms ease",
                    }}
                    loading="lazy"
                  />
                  {/* Subtle gradient overlay for better readability */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      zIndex: 11,
                      background: "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 40%)",
                    }}
                  />
                </div>

                {/* Right Side - Project Content */}
                <div className={`space-y-6 ${isMobile ? 'px-4' : ''}`}>
                  
                  {/* Project Description */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h4 className="text-2xl font-semibold text-white mb-4">About this project</h4>
                    <p className="text-gray-300 leading-relaxed text-lg sm:text-xl">
                      {project.description}
                    </p>
                  </motion.div>

                  {/* Tech Stack */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <h4 className="text-2xl font-semibold text-white mb-4">Tech Stack</h4>
                    <div className="flex flex-wrap gap-3">
                      {project.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-base text-gray-200 hover:bg-white/20 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Key Features */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                  >
                    <h4 className="text-2xl font-semibold text-white mb-4">Key Features</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-2 text-gray-300"
                        >
                          <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></div>
                          <span className="text-xl">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className={`flex gap-4 ${isMobile ? 'justify-center' : ''}`}
                  >
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-4 text-lg font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all transform hover:scale-105"
                        aria-label={`View ${project.title}`}
                      >
                        View Project
                      </a>
                    )}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-8 py-4 text-lg font-semibold rounded-lg border border-gray-600 text-white hover:bg-gray-800 transition-all transform hover:scale-105"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      GitHub
                    </a>
                  </motion.div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
