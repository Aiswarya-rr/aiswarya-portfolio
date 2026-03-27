import { FaReact } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiDocker,
  SiExpress,
  SiGit,
  SiJavascript,
} from "react-icons/si";
import { DiNodejsSmall } from "react-icons/di";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FiSettings, FiX, FiRefreshCw, FiZap, FiTarget, FiShuffle } from "react-icons/fi";

/* ---------------- SKILLS ---------------- */
const skills = [
  { icon: <SiTypescript />, name: "TypeScript", color: "bg-blue-500" },
  { icon: <SiJavascript />, name: "JavaScript", color: "bg-yellow-400 text-black" },
  { icon: <FaReact />, name: "React", color: "bg-cyan-400" },
  { icon: <SiNextdotjs />, name: "Next.js", color: "bg-gray-300 text-black" },
  { icon: <SiTailwindcss />, name: "Tailwind", color: "bg-sky-400" },
  { icon: <SiMongodb />, name: "MongoDB", color: "bg-green-500" },
  { icon: <SiDocker />, name: "Docker", color: "bg-blue-400" },
  { icon: <SiExpress />, name: "Express", color: "bg-gray-400 text-black" },
  { icon: <DiNodejsSmall />, name: "Node.js", color: "bg-green-600" },
  { icon: <SiGit />, name: "Git", color: "bg-orange-500" },
];

/* ---------------- CARD ---------------- */
const SkillCard = ({ skill, bounds, isMagnetMode, isChaosMode }) => {
  const cardRef = useRef(null);

  // ✅ Proper random positions inside container
  const initialX = Math.random() * (bounds.right || 300);
  const initialY = Math.random() * (bounds.bottom || 300);

  const handleDragEnd = () => {
    const card = cardRef.current;
    if (!card) return;

    if (isMagnetMode) {
      // Magnet mode - snap to center
      gsap.to(card, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 0.5,
        ease: "power2.inOut"
      });
    } else if (isChaosMode) {
      // Chaos mode - super bouncy
      gsap.to(card, {
        scale: 1.3,
        rotation: Math.random() * 360 - 180,
        duration: 0.2,
        repeat: 5,
        yoyo: true,
        ease: "power2.inOut"
      });
      gsap.to(card, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        delay: 1,
        ease: "bounce.out"
      });
    } else {
      // Normal mode
      gsap.to(card, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "bounce.out",
      });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      drag
      dragConstraints={bounds}
      dragElastic={isChaosMode ? 0.8 : 0.4}
      onDragEnd={handleDragEnd}
      initial={{
        x: initialX,
        y: initialY,
        scale: 0,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
        rotate: Math.random() * 20 - 10,
      }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.4 }}
      className={`absolute skill-card ${skill.color}
        rounded-2xl p-5 cursor-grab active:cursor-grabbing
        shadow-xl min-w-[150px] min-h-[150px]
        flex flex-col items-center justify-center gap-2`}
    >
      <div className="text-5xl">{skill.icon}</div>
      <p className="text-xl font-semibold text-center">{skill.name}</p>
    </motion.div>
  );
};

/* ---------------- OVERLAY MENU ---------------- */
const OverlayMenu = ({ isOpen, onClose, onShuffle, onReset, onMagnetMode, onChaosMode, isMagnetMode, isChaosMode }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Menu Content */}
          <motion.div
            className="relative bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "backOut" }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              <FiX className="text-white text-xl" />
            </button>
            
            {/* Menu Header */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Playground Controls</h3>
              <p className="text-gray-400">Customize your skills playground experience</p>
            </div>
            
            {/* Menu Options */}
            <div className="space-y-4">
              {/* Shuffle Positions */}
              <motion.button
                onClick={onShuffle}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 hover:from-purple-600/30 hover:to-pink-600/30 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiShuffle className="text-purple-400 text-xl" />
                <div className="text-left">
                  <p className="text-white font-semibold">Shuffle Skills</p>
                  <p className="text-gray-400 text-sm">Randomize all skill positions</p>
                </div>
              </motion.button>
              
              {/* Reset Positions */}
              <motion.button
                onClick={onReset}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 hover:from-blue-600/30 hover:to-cyan-600/30 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiRefreshCw className="text-blue-400 text-xl" />
                <div className="text-left">
                  <p className="text-white font-semibold">Reset Playground</p>
                  <p className="text-gray-400 text-sm">Return to initial positions</p>
                </div>
              </motion.button>
              
              {/* Magnet Mode */}
              <motion.button
                onClick={onMagnetMode}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  isMagnetMode 
                    ? 'bg-gradient-to-r from-green-600/30 to-emerald-600/30 border-green-500/50' 
                    : 'bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/30 hover:from-green-600/30 hover:to-emerald-600/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiTarget className="text-green-400 text-xl" />
                <div className="text-left">
                  <p className="text-white font-semibold">Magnet Mode</p>
                  <p className="text-gray-400 text-sm">{isMagnetMode ? 'Enabled' : 'Skills snap to center'}</p>
                </div>
              </motion.button>
              
              {/* Chaos Mode */}
              <motion.button
                onClick={onChaosMode}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                  isChaosMode 
                    ? 'bg-gradient-to-r from-red-600/30 to-orange-600/30 border-red-500/50' 
                    : 'bg-gradient-to-r from-red-600/20 to-orange-600/20 border-red-500/30 hover:from-red-600/30 hover:to-orange-600/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiZap className="text-red-400 text-xl" />
                <div className="text-left">
                  <p className="text-white font-semibold">Chaos Mode</p>
                  <p className="text-gray-400 text-sm">{isChaosMode ? 'Enabled' : 'Super bouncy physics'}</p>
                </div>
              </motion.button>
            </div>
            
            {/* Fun Stats */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Skills in playground</span>
                <span className="text-white font-semibold">{skills.length}</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-400">Current mode</span>
                <span className="text-white font-semibold">
                  {isChaosMode ? 'Chaos' : isMagnetMode ? 'Magnet' : 'Normal'}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ---------------- MAIN ---------------- */
export default function SkillsPlayground() {
  const containerRef = useRef(null);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    right: 300,
    bottom: 300,
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMagnetMode, setIsMagnetMode] = useState(false);
  const [isChaosMode, setIsChaosMode] = useState(false);
  const [skillCards, setSkillCards] = useState([]);

  // Initialize skill cards with random positions
  useEffect(() => {
    const initialCards = skills.map((skill, i) => ({
      ...skill,
      initialX: Math.random() * (bounds.right || 300),
      initialY: Math.random() * (bounds.bottom || 300),
    }));
    setSkillCards(initialCards);
  }, [bounds]);

  // Shuffle positions
  const handleShuffle = () => {
    const shuffledCards = skillCards.map(card => ({
      ...card,
      initialX: Math.random() * (bounds.right || 300),
      initialY: Math.random() * (bounds.bottom || 300),
    }));
    setSkillCards(shuffledCards);
    
    // Add visual feedback
    gsap.fromTo(".skill-card", 
      { rotation: 0, scale: 1 },
      { rotation: 360, scale: 0.8, duration: 0.5, ease: "back.in(1)" }
    );
    gsap.to(".skill-card", { rotation: 0, scale: 1, duration: 0.5, delay: 0.5, ease: "back.out(1)" });
  };

  // Reset positions
  const handleReset = () => {
    const resetCards = skills.map((skill, i) => ({
      ...skill,
      initialX: Math.random() * (bounds.right || 300),
      initialY: Math.random() * (bounds.bottom || 300),
    }));
    setSkillCards(resetCards);
    setIsMagnetMode(false);
    setIsChaosMode(false);
  };

  // Toggle magnet mode
  const handleMagnetMode = () => {
    setIsMagnetMode(!isMagnetMode);
    if (isChaosMode) setIsChaosMode(false);
  };

  // Toggle chaos mode
  const handleChaosMode = () => {
    setIsChaosMode(!isChaosMode);
    if (isMagnetMode) setIsMagnetMode(false);
  };

  useEffect(() => {
    const updateBounds = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();

        setBounds({
          left: 0,
          top: 0,
          right: rect.width - 120,
          bottom: rect.height - 120,
        });
      }
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);

    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  return (
    <section className="min-h-screen bg-black text-white overflow-hidden relative">
      
      {/* HEADER */}
      <div className="text-center pt-20 pb-10">
       <div className="shrink-0 px-6 pt-4 text-center">
                   <motion.h2
        className="text-4xl text-center sm:text-5xl font-bold bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] bg-clip-text text-transparent inline-block"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
       Game-Skills Playground
      </motion.h2>
                </div>
        <p className="text-gray-400 text-3xl mt-3">
          Drag, throw, and watch them bounce.
        </p>
      </div>

      {/* Settings Button */}
      <motion.button
        onClick={() => setMenuOpen(true)}
        className="fixed top-24 right-6 p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg hover:shadow-xl z-40"
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiSettings className="text-white text-xl" />
      </motion.button>

      {/* SKILLS AREA */}
      <div
        ref={containerRef}
        className="relative w-full h-[70vh]"
      >
        <div className="relative w-full h-full">
          {skillCards.map((skill, i) => (
            <SkillCard 
              key={`${skill.name}-${i}`} 
              skill={skill} 
              bounds={bounds}
              isMagnetMode={isMagnetMode}
              isChaosMode={isChaosMode}
            />
          ))}
        </div>
      </div>

      {/* Overlay Menu */}
      <OverlayMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onShuffle={handleShuffle}
        onReset={handleReset}
        onMagnetMode={handleMagnetMode}
        onChaosMode={handleChaosMode}
        isMagnetMode={isMagnetMode}
        isChaosMode={isChaosMode}
      />
    </section>
  );
}