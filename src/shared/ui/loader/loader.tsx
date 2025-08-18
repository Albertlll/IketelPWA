import {motion, type Variants}  from "motion/react";

const circleVariants : Variants= {
  bounce: (i: number) => ({
    y: ["20%", "-20%", "20%"],
    transition: {
      y: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay: i * 0.2,
      },
    },
  }),
};

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 bg-secondary rounded-full mx-1"
          custom={i}
          variants={circleVariants}
          animate="bounce"
        />
      ))}
    </div>
  );
};

export default Loader;
