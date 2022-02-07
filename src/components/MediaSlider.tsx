import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { useState } from "react";
import { IMediaDetail, SliderDirection } from "../api";
import MediaSliderItem from "./MediaSliderItem";

interface IMediaSlider {
  title: string;
  movies: IMediaDetail[];
}

const SliderVar: Variants = {
  hidden: (direction: SliderDirection) => ({
    opacity: 0,
    x: direction === "left" ? -window.outerWidth : window.outerWidth,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      type: "tween",
    },
  },
  exit: (direction: SliderDirection) => ({
    opacity: 0,
    x: direction === "left" ? window.outerWidth : -window.outerWidth,
    transition: {
      duration: 0.5,
      type: "tween",
    },
  }),
};

const MediaSlider: React.FC<IMediaSlider> = ({ movies, title }) => {
  const dataOffset = 6;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<SliderDirection>("right");
  const handleIndex = (direction: SliderDirection) => {
    const maxIndex = Math.ceil(movies.length / dataOffset);
    switch (direction) {
      case "left":
        setDirection("left");
        setIndex((prev) => (prev === 0 ? maxIndex - 1 : prev - 1));
        break;
      case "right":
        setDirection("right");
        setIndex((prev) => (prev === maxIndex - 1 ? 0 : prev + 1));
        break;
    }
  };
  return (
    <div className="w-full p-5 px-10">
      <section className="flex flex-col gap-5 overflow-hidden">
        {/* slider title */}
        <h1 className="text-5xl font-semibold w-full border-b border-slate-700 pb-1">
          {title}
        </h1>
        {/* slider wrapper */}
        <main className="w-full h-96 relative ">
          {/* slider */}
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              custom={direction}
              key={index}
              variants={SliderVar}
              initial={"hidden"}
              animate={"visible"}
              exit={"exit"}
              className="w-full h-full grid grid-cols-6 gap-5 absolute top-0 left-0"
            >
              {movies
                .slice(index * dataOffset, index * dataOffset + dataOffset)
                .map((movie) => {
                  return (
                    <MediaSliderItem
                      key={movie.id}
                      id={movie.id}
                      posterPath={movie.poster_path}
                      title={movie.title}
                      name={movie.name}
                      category={movie.name ? "tv" : "movie"}
                    />
                  );
                })}
            </motion.div>
          </AnimatePresence>
          {/* slider buttons */}
          <motion.aside
            initial={{ opacity: 0.5 }}
            whileHover={{ opacity: 1 }}
            onClick={() => handleIndex("left")}
            className="absolute top-0 left-0  h-full bg-black bg-opacity-50 p-5 flex justify-center items-center cursor-pointer"
          >
            <FontAwesomeIcon className="text-2xl" icon={faArrowLeft} />
          </motion.aside>
          <motion.aside
            initial={{ opacity: 0.5 }}
            whileHover={{ opacity: 1 }}
            onClick={() => handleIndex("right")}
            className="absolute top-0 right-0  h-full bg-black bg-opacity-50 p-5 flex justify-center items-center cursor-pointer"
          >
            <FontAwesomeIcon className="text-2xl" icon={faArrowRight} />
          </motion.aside>
        </main>
      </section>
    </div>
  );
};

export default MediaSlider;
