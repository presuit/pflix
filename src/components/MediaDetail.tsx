import { faFilm, faLink, faPoll } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  getImgURL,
  getMovieDetail,
  IMG_SIZES,
  IMediaDetailProps,
  getTvDetail,
} from "../api";
import { routes } from "../App";
import { selectedMedia } from "../atom";

interface IMediaDetail {
  id: string;
}

const MediaDetail: React.FC<IMediaDetail> = ({ id }) => {
  const [selectedMediaState, setSelectedMediaState] =
    useRecoilState(selectedMedia);
  const history = useNavigate();
  const movieMatch = useMatch(routes.MOVIE_DETAIL);
  const tvMatch = useMatch(routes.TV_DETAIL);
  const searchMatch = useMatch(routes.SEARCH_DETAIL);
  const location = useLocation();

  const { isLoading, data } = useQuery<IMediaDetailProps>(
    [movieMatch ? "Movies" : "Tvs", id],
    selectedMediaState && selectedMediaState.category === "movie"
      ? getMovieDetail
      : getTvDetail
  );

  const handleClick = () => {
    if (movieMatch) {
      setSelectedMediaState(null);
      history(routes.HOME);
    } else if (tvMatch) {
      setSelectedMediaState(null);
      history(routes.TV);
    } else if (searchMatch) {
      setSelectedMediaState(null);
      history(`${routes.SEARCH}${location.search}`);
    } else alert("error on goback to main");
  };

  console.log(selectedMediaState);

  return (
    <section className="fixed top-0 left-0 w-full h-full z-20">
      <div
        onClick={handleClick}
        className="w-full h-full cursor-pointer bg-black bg-opacity-50"
      ></div>
      <motion.div
        layoutId={selectedMediaState ? `${selectedMediaState.id}` : undefined}
        className="absolute top-0 left-0 right-0 bottom-0 m-auto max-w-screen-md w-full h-[70vh] text-slate-200 rounded-2xl flex flex-col items-center bg-black overflow-hidden"
      >
        {isLoading ? (
          <span className="animate-spin">Loading...</span>
        ) : (
          <>
            <div
              className="w-full h-[60%] bg-cover bg-center flex flex-col justify-between items-center p-3 "
              style={{
                backgroundImage: `url(${getImgURL(
                  data?.backdrop_path || "",
                  IMG_SIZES.poster
                )})`,
              }}
            >
              <div className="w-full flex justify-between items-start">
                <div className="flex items-center gap-3 p-3">
                  <a target={"_blank"} href={data?.homepage || ""}>
                    <FontAwesomeIcon className="text-lg" icon={faLink} />
                  </a>
                </div>
                <div className="flex flex-col gap-1 items-center bg-black bg-opacity-50 rounded-2xl p-3 px-5">
                  <FontAwesomeIcon className="text-lg" icon={faPoll} />
                  <span>{data?.vote_average}/10</span>
                </div>
              </div>
              <div className="w-full flex justify-between items-end text-slate-200">
                <h1 className="text-2xl font-semibold p-5 max-w-[50%]  bg-black rounded-2xl ">
                  {data?.title || data?.name}
                </h1>
                <div className="grid grid-cols-2 gap-3 bg-black rounded-2xl p-3 max-w-[50%]  relative">
                  {data?.genres.map((g) => (
                    <span
                      key={g.id}
                      className="p-3 bg-slate-700 bg-opacity-50 rounded-2xl text-center"
                    >
                      {g.name}
                    </span>
                  ))}
                  <div className="absolute -top-5 -right-2 p-3  bg-black rounded-full flex justify-center items-center">
                    <FontAwesomeIcon className="text-xl " icon={faFilm} />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-[40%] overflow-auto p-5 border-b-2 border-amber-500  rounded-2xl">
              <p className="text-center">{data?.overview}</p>
            </div>
          </>
        )}
      </motion.div>
    </section>
  );
};

export default MediaDetail;
