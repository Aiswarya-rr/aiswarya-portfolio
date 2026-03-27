import { useState } from "react";
import { motion } from "framer-motion";

/* ---------------- DATA ---------------- */
const data = [
  {
    title: "Fullstack Developer Certification",
    issuer: "Amazon (Coursera)",
    date: "2024",
    color: "from-orange-500 to-red-600",
    badge: "AWS",
  },
  {
    title: "AWS Academy Graduate - Cloud Foundations",
    issuer: "AWS Academy",
    date: "2024",
    color: "from-yellow-500 to-orange-600",
    badge: "AWS",
  },
  {
    title: "Web Development Course",
    issuer: "Udemy",
    date: "2024",
    color: "from-purple-500 to-pink-600",
    badge: "Udemy",
  },
  {
    title: "Practical Query & Manage Databases",
    issuer: "Infosys Springboard",
    date: "2024",
    color: "from-blue-500 to-cyan-600",
    badge: "Infosys",
  },
  {
    title: "React.js Certification",
    issuer: "Scalar",
    date: "2024",
    color: "from-cyan-500 to-blue-600",
    badge: "Scalar",
  },
  {
    title: "Mendix Rapid Developer Certification",
    issuer: "Mendix",
    date: "2024",
    color: "from-green-500 to-teal-600",
    badge: "Mendix",
  },
  {
    title: "Programming in Java",
    issuer: "NPTEL",
    date: "2024",
    color: "from-red-500 to-pink-600",
    badge: "NPTEL",
  },
  {
    title: "Database Management Systems",
    issuer: "NPTEL",
    date: "2024",
    color: "from-indigo-500 to-purple-600",
    badge: "NPTEL",
  },
];

/* ---------------- CARD ---------------- */
const CertificateCard = ({ cert, isActive, onHover }) => {
  return (
    <motion.div
      onMouseEnter={onHover}
      className="relative w-[280px] h-[380px] cursor-pointer"
      animate={{
        scale: isActive ? 1.15 : 0.75,
        opacity: isActive ? 1 : 0.4,
        y: isActive ? -20 : 20,
        zIndex: isActive ? 10 : 1,
        filter: isActive ? "blur(0px)" : "blur(2px)",
      }}
      transition={{ duration: 0.4 }}
    >
      {/* TOP CERTIFICATE */}
      <div className="absolute top-0 w-full h-[65%] bg-white rounded-lg shadow-xl flex flex-col items-center justify-center text-center p-4">
        <div className="w-6 h-6 bg-gradient-to-r from-red-600 to-red-800 rounded-full mb-3 shadow-lg"></div>
        <h2 className="text-black font-bold text-lg">CERTIFICATE</h2>
        <p className="text-gray-500 text-sm font-medium">OF ACHIEVEMENT</p>
        
        {/* Badge */}
        <div className="absolute top-3 right-3 px-2 py-1 bg-black/10 rounded-full">
          <span className="text-xs font-bold text-black/70">{cert.badge}</span>
        </div>
      </div>

      {/* BOTTOM ENVELOPE */}
      <div
        className={`absolute bottom-0 w-full h-[60%] bg-gradient-to-r ${cert.color} text-white p-4 flex flex-col justify-end rounded-xl`}
        style={{
          clipPath: "ellipse(120% 100% at 50% 100%)",
        }}
      >
        <h3 className="text-center font-semibold text-sm mb-2 leading-tight">
          {cert.title}
        </h3>

        <p className="text-xs text-center opacity-90 mb-3">
          {cert.issuer} • {cert.date}
        </p>

        <button className="mt-3 mx-auto px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all transform hover:scale-105 border border-white/30">
          <span className="text-sm font-medium">View Certificate ↗</span>
        </button>
      </div>
    </motion.div>
  );
};

/* ---------------- MAIN ---------------- */
export default function Certificates() {
  const [active, setActive] = useState(1);

  return (
    <section id="certificates" className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col items-center justify-center px-4 py-20">

      {/* HEADER */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-center">
          <span className="text-white">Professional </span>
          <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Certifications
          </span>
        </h1>

        <p className="text-gray-400 text-lg text-center max-w-2xl mx-auto">
          Industry-recognized certifications from leading platforms showcasing expertise in cloud, web development, and enterprise technologies
        </p>
      </motion.div>

      {/* CARDS CONTAINER */}
      <div className="relative flex items-center justify-center gap-[-60px] flex-wrap max-w-6xl mx-auto">
        {data.map((cert, i) => (
          <CertificateCard
            key={i}
            cert={cert}
            isActive={i === active}
            onHover={() => setActive(i)}
          />
        ))}
      </div>

      {/* CERTIFICATION COUNT */}
      <motion.div 
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full inline-block">
          <p className="text-sm text-gray-300">
            <span className="text-cyan-400 font-bold">{data.length}</span> Professional Certifications
          </p>
        </div>
      </motion.div>
    </section>
  );
}