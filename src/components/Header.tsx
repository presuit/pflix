import { Link, useMatch, useNavigate } from "react-router-dom";
import { routes } from "../App";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useViewportScroll,
} from "framer-motion";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { scrollYProgress } = useViewportScroll();
  const homeMatch = useMatch(routes.HOME);
  const movieDetailMatch = useMatch(routes.MOVIE_DETAIL);
  const tvMatch = useMatch(routes.TV);
  const scrollAnimate = useAnimation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const history = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query || query === "") return;

    const url = `${routes.SEARCH}?q=${query}`;
    history(url);
  };

  useEffect(() => {
    scrollYProgress.onChange(() => {
      if (scrollYProgress.get() > 0) {
        scrollAnimate.start({ backgroundColor: "rgba(0,0,0,1)" });
      } else {
        scrollAnimate.start({ backgroundColor: "rgba(0,0,0,0)" });
      }
    });
  }, [scrollYProgress]);

  return (
    <motion.header
      animate={scrollAnimate}
      className={`fixed top-0 left-0 w-full p-2 px-10 text-slate-200 flex justify-between items-center z-10`}
    >
      <div className="flex items-center gap-5">
        <Link to={routes.HOME}>
          <svg
            className="w-32 h-14"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-153.6 -69.1855 1331.2 415.113"
          >
            <path
              fill="#d81f26"
              d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676L44.051 119.724v151.073C28.647 272.418 14.594 274.58 0 276.742V0h41.08l56.212 157.021V0h43.511zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461V0h119.724v43.241h-76.482zm237.284-58.104h-44.862V242.15c-14.594 0-29.188 0-43.239.539V43.242h-44.862V0H463.22zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433V0h120.808v43.241h-78.375zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676V0h43.24zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242V0h-42.43zM1024 0l-54.863 131.615L1024 276.742c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75L871.576 0h46.482l28.377 72.699L976.705 0z"
            />
          </svg>
        </Link>

        <Link to={routes.HOME}>
          <section className="cursor-pointer text-lg p-3 px-10 hover:bg-slate-700 rounded-2xl transition-all duration-300 flex flex-col items-center  relative">
            <span>Movie</span>
            {(homeMatch || movieDetailMatch) && (
              <motion.div
                layoutId="header_circle"
                className="absolute bottom-0 left-0 right-0 mx-auto w-2 h-2 bg-red-500 rounded-full"
              ></motion.div>
            )}
          </section>
        </Link>
        <Link to={routes.TV}>
          <section className="cursor-pointer text-lg p-3 px-10 hover:bg-slate-700 rounded-2xl transition-all duration-300 flex flex-col items-center  relative">
            <span>TV</span>
            {tvMatch && (
              <motion.div
                layoutId="header_circle"
                className="absolute bottom-0 left-0 right-0 mx-auto w-2 h-2 bg-red-500 rounded-full"
              ></motion.div>
            )}
          </section>
        </Link>
      </div>
      <motion.div layout className="flex items-center gap-3">
        <motion.div
          layout
          onClick={() => setSearchOpen((prev) => !prev)}
          className="p-3 bg-black rounded-2xl flex justify-center items-center cursor-pointer"
        >
          <FontAwesomeIcon icon={faSearch} />
        </motion.div>
        <form onSubmit={handleSubmit}>
          <motion.input
            layout
            type="text"
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
            className={`p-1 outline-none rounded-lg px-2 text-black ${
              searchOpen ? "w-full" : "w-0 opacity-0"
            }`}
          />
        </form>
      </motion.div>
    </motion.header>
  );
};

export default Header;
