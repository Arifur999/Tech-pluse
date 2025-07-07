import React from "react";
import { motion, useAnimationControls } from "framer-motion";
import img1 from "/img1.jpeg";
import img2 from "/img2.jpeg";
import img3 from "/img3.jpeg";
import img4 from "/img4.jpeg";
import img5 from "/img5.jpeg";
import img6 from "/img6.jpeg";

const productImages = [img1, img2, img3, img4, img5, img6];

const Hero = () => {
  const controls1 = useAnimationControls();
  const controls2 = useAnimationControls();

  // Animation start
  React.useEffect(() => {
    controls1.start({
      x: ["0%", "-100%"],
      transition: {
        repeat: Infinity,
        duration: 20,
        ease: "linear",
      },
    });
    controls2.start({
      x: ["-100%", "0%"],
      transition: {
        repeat: Infinity,
        duration: 25,
        ease: "linear",
      },
    });
  }, []);

  return (
    <div className="bg-black text-white py-16 px-4 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Left Text */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Unlock exclusive software deals and save big on{" "}
            <span className="text-green-500">lifetime access</span>
          </h1>
          <p className="text-lg text-gray-300">
            Get lifetime access to top software & tools at unbeatable prices.
          </p>
          <button className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition">
            Browse all exclusive deals
          </button>
          <div className="pt-6 text-sm text-gray-400">
            Helping 1M+ entrepreneurs since 2010
          </div>
        </div>

        {/* Right Scroll Lines */}
        {/* <div className="overflow-hidden space-y-4">
          
          <motion.div
            className="flex gap-6"
            animate={controls1}
            onHoverStart={() => controls1.stop()}
            onHoverEnd={() =>
              controls1.start({
                x: ["0%", "-100%"],
                transition: {
                  repeat: Infinity,
                  duration: 20,
                  ease: "linear",
                },
              })
            }
          >
            {[...productImages, ...productImages].map((img, idx) => (
              <motion.img
                key={idx}
                src={img}
                alt=""
                className="w-44 h-28 md:w-48 md:h-32 object-cover rounded-lg shadow-lg hover:scale-90 transition-transform duration-300"
              />
            ))}
          </motion.div>

          
          <motion.div
            className="flex gap-6"
            animate={controls2}
            onHoverStart={() => controls2.stop()}
            onHoverEnd={() =>
              controls2.start({
                x: ["-100%", "0%"],
                transition: {
                  repeat: Infinity,
                  duration: 25,
                  ease: "linear",
                },
              })
            }
          >
            {[...productImages, ...productImages].map((img, idx) => (
              <motion.img
                key={idx + 100}
                src={img}
                alt=""
                className="w-44 h-28 md:w-48 md:h-32 object-cover rounded-lg shadow-lg hover:scale-90 transition-transform duration-300"
              />
            ))}
          </motion.div>
        </div> */}
        {/* Wrapper */}
<div className="overflow-hidden space-y-4">
  {/* Mobile View - Single Line Scroll */}
  <div className="md:hidden overflow-x-auto scrollbar-hide">
    <motion.div
      className="flex gap-4 flex-nowrap"
      animate={controls1}
      onHoverStart={() => controls1.stop()}
      onHoverEnd={() =>
        controls1.start({
          x: ["0%", "-100%"],
          transition: { repeat: Infinity, duration: 20, ease: "linear" },
        })
      }
    >
      {[...productImages, ...productImages].map((img, idx) => (
        <motion.img
          key={idx}
          src={img}
          alt=""
          className="w-40 h-28 min-w-[10rem] object-cover rounded-lg shadow-md hover:scale-90 transition-transform duration-300"
        />
      ))}
    </motion.div>
  </div>

  {/* Desktop View - Two Rows */}
  <div className="hidden md:block space-y-4">
    {/* Line 1 */}
    <motion.div
      className="flex gap-6"
      animate={controls1}
      onHoverStart={() => controls1.stop()}
      onHoverEnd={() =>
        controls1.start({
          x: ["0%", "-100%"],
          transition: { repeat: Infinity, duration: 20, ease: "linear" },
        })
      }
    >
      {[...productImages, ...productImages].map((img, idx) => (
        <motion.img
          key={idx}
          src={img}
          alt=""
          className="w-44 h-28 md:w-48 md:h-32 object-cover rounded-lg shadow-lg hover:scale-90 transition-transform duration-300"
        />
      ))}
    </motion.div>

    {/* Line 2 */}
    <motion.div
      className="flex gap-6"
      animate={controls2}
      onHoverStart={() => controls2.stop()}
      onHoverEnd={() =>
        controls2.start({
          x: ["-100%", "0%"],
          transition: { repeat: Infinity, duration: 25, ease: "linear" },
        })
      }
    >
      {[...productImages, ...productImages].map((img, idx) => (
        <motion.img
          key={idx + 100}
          src={img}
          alt=""
          className="w-44 h-28 md:w-48 md:h-32 object-cover rounded-lg shadow-lg hover:scale-90 transition-transform duration-300"
        />
      ))}
    </motion.div>
  </div>
</div>

      </div>
    </div>
  );
};

export default Hero;
