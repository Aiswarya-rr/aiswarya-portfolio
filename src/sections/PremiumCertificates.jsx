import React, { useState, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const certificates = [
  {
    title: "Fullstack Developer Certification",
    organization: "Amazon (Coursera)",
    date: "2026",
    gradient: "from-orange-600 to-red-500",
    badge: "AWS",
    level: "Advanced"
  },
  {
    title: "AWS Academy Graduate - Cloud Foundations",
    organization: "AWS Academy",
    date: "2026",
    gradient: "from-yellow-600 to-orange-500",
    badge: "AWS",
    level: "Foundational"
  },
  {
    title: "Web Development Course",
    organization: "Udemy",
    date: "2025",
    gradient: "from-purple-600 to-pink-500",
    badge: "Udemy",
    level: "Intermediate"
  },
  {
    title: "Practical Query & Manage Databases",
    organization: "Infosys Springboard",
    date: "2025",
    gradient: "from-blue-600 to-cyan-500",
    badge: "Infosys",
    level: "Professional"
  },
  {
    title: "React.js Certification",
    organization: "Scalar",
    date: "2025",
    gradient: "from-cyan-600 to-blue-500",
    badge: "Scalar",
    level: "Advanced"
  },
  {
    title: "Mendix Rapid Developer Certification",
    organization: "Mendix",
    date: "2025",
    gradient: "from-green-600 to-teal-500",
    badge: "Mendix",
    level: "Professional"
  },
  {
    title: "Programming in Java",
    organization: "NPTEL",
    date: "2024",
    gradient: "from-red-600 to-pink-500",
    badge: "NPTEL",
    level: "Intermediate"
  },
  {
    title: "Database Management Systems",
    organization: "NPTEL",
    date: "2025",
    gradient: "from-indigo-600 to-purple-500",
    badge: "NPTEL",
    level: "Intermediate"
  }
];

const CertificateCard = ({ certificate, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative flex-shrink-0 w-80 h-[420px] perspective-1000"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Bottom Layer - Envelope */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${certificate.gradient} rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm`}
        animate={{
          y: isHovered ? -15 : 0,
          scale: isHovered ? 1.03 : 1
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
        
        {/* Envelope Content */}
        <div className="relative h-full p-6 flex flex-col justify-between text-white">
          {/* Top Section */}
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold">
                  {certificate.level}
                </span>
                <span className="px-2 py-1 bg-black/30 backdrop-blur-sm rounded-full text-xs font-semibold">
                  {certificate.badge}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 leading-tight">{certificate.title}</h3>
              <p className="text-white/90 mb-1 font-medium">{certificate.organization}</p>
              <p className="text-white/70 text-sm">{certificate.date}</p>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-white/80">
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
              <span>Verified Certificate</span>
            </div>
            
            <motion.button
              className="inline-flex items-center gap-2 px-4 py-3 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 hover:bg-white/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-medium">View Certificate</span>
              <span className="text-lg">↗</span>
            </motion.button>
          </div>
        </div>
        
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 70%)`
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-12 h-12 border-2 border-white/20 rounded-full opacity-50"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border border-white/15 rounded opacity-30"></div>
      </motion.div>
      
      {/* Top Layer - Certificate */}
      <motion.div
        className="relative bg-white rounded-2xl shadow-xl border border-gray-200 z-10 overflow-hidden"
        style={{
          width: '60%',
          height: '30%',
          top: '40%',
          left: '6%',
          zIndex: isHovered ? 1 : 2
        }}
        animate={{
          y: isHovered ? -8 : 0,
          rotateX: isHovered ? 3 : 0,
          scale: isHovered ? 0.98 : 1
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="h-full flex flex-col items-center justify-center p-6 text-center relative">
          {/* Certificate Seal */}
          <div className="w-6 h-6 bg-gradient-to-r from-red-600 to-red-800 rounded-full mb-3 shadow-lg"></div>
          
          {/* Certificate Text */}
          <h4 className="text-xl font-bold text-gray-800 mb-1">CERTIFICATE</h4>
          <p className="text-gray-600 text-sm font-medium">OF ACHIEVEMENT</p>
          
          {/* Badge */}
          <div className="absolute top-3 right-3 px-2 py-1 bg-gray-100 rounded-full">
            <span className="text-xs font-bold text-gray-700">{certificate.badge}</span>
          </div>
          
          {/* Decorative Corners */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-gray-300"></div>
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-gray-300"></div>
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-gray-300"></div>
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-gray-300"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function PremiumCertificates() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    dragFree: false
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onNavButtonClick = useCallback((index) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    const onInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
    };

    emblaApi.on('select', onSelect);
    emblaApi.on('init', onInit);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('init', onInit);
    };
  }, [emblaApi]);

  return (
    <section id="premium-certificates" className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 text-white overflow-hidden py-20">
      {/* Background Effects */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-cyan-600/20 to-blue-600/20 blur-[150px] animate-pulse' />
        <div className='absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-pink-600/20 to-purple-600/20 blur-[150px] animate-pulse delay-500' />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
         <div className="shrink-0 px-6 pt-4 text-center">
                     <motion.h2
          className="text-4xl text-center sm:text-5xl font-bold bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] bg-clip-text text-transparent inline-block"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Professional Certifications
        </motion.h2>
                  </div>
          <motion.p
            className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Industry-recognized certifications from AWS, Amazon, Udemy, Infosys, and leading platforms 
            validating expertise in cloud computing, full-stack development, database management, and enterprise technologies
          </motion.p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <motion.button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-colors"
            onClick={scrollPrev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <FaChevronLeft className="text-white text-xl" />
          </motion.button>

          <motion.button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-colors"
            onClick={scrollNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <FaChevronRight className="text-white text-xl" />
          </motion.button>

          {/* Embla Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 py-10">
              {certificates.map((certificate, index) => (
                <CertificateCard
                  key={index}
                  certificate={certificate}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {scrollSnaps.map((_, index) => (
              <motion.button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? 'w-8 bg-gradient-to-r from-cyan-400 to-pink-400'
                    : 'bg-white/30'
                }`}
                onClick={() => onNavButtonClick(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              />
            ))}
          </div>
        </div>

        {/* Certificate Counter */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-gray-500 text-sm">
            {selectedIndex + 1} / {certificates.length} Certificates
          </p>
        </motion.div>
      </div>
    </section>
  );
}
