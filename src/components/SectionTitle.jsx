import { motion } from "framer-motion";

const SectionTitle = ({ 
  title, 
  className = "text-4xl mt-1 mb-2 text-center sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63]",
  initial = { opacity: 0, y: -30 },
  whileInView = { opacity: 1, y: 0 },
  transition = { duration: 0.5 }
}) => {
  return (
    <div className="flex justify-center bg-black">
      <div className="bg-transparent">
        <motion.h2
          className={className}
          initial={initial}
          whileInView={whileInView}
          transition={transition}
        >
          {title}
        </motion.h2>
      </div>
    </div>
  );
};

export default SectionTitle;
