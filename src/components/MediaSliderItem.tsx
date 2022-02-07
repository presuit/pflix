import { motion } from "framer-motion";
import { useRef } from "react";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { getImgURL, IMG_SIZES } from "../api";
import { routes } from "../App";
import { selectedMedia } from "../atom";

interface IMediaSliderItem {
  id: number;
  posterPath: string;
  title?: string;
  name?: string;
  category: "movie" | "tv";
}

const MediaSliderItem: React.FC<IMediaSliderItem> = ({
  id,
  posterPath,
  title,
  name,
  category,
}) => {
  const setSelectedMedia = useSetRecoilState(selectedMedia);
  const history = useNavigate();
  const movieMatch = useMatch(routes.HOME);
  const tvMatch = useMatch(routes.TV);
  const searchMatch = useMatch(routes.SEARCH);
  const { search } = useLocation();
  const layoutId = useRef(
    `${id}_${Date.now() + Math.floor(Math.random() * 1000)}`
  );
  const handleClick = (id: number) => {
    if (movieMatch) {
      setSelectedMedia({ id: layoutId.current, category });
      history(`/movie/${id}`);
    } else if (tvMatch) {
      setSelectedMedia({ id: layoutId.current, category });
      history(`/tv/${id}`);
    } else if (searchMatch) {
      setSelectedMedia({ id: layoutId.current, category });
      history(`/search/${id}${search}`);
    } else alert("error on media detail");
  };

  return (
    <motion.div
      layoutId={layoutId.current}
      onClick={() => handleClick(id)}
      whileHover={{ scale: 1.1 }}
      style={{
        backgroundImage: `url(${getImgURL(posterPath, IMG_SIZES.normal)})`,
      }}
      className="w-full h-full flex justify-center items-center  bg-cover bg-center cursor-pointer origin-bottom group"
    >
      <motion.h1 className="w-full p-3 bg-black text-center font-semibold">
        {title || name}
      </motion.h1>
    </motion.div>
  );
};

export default MediaSliderItem;
