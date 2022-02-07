import { useQuery } from "react-query";
import { getMovieLatest, getMovieTop, getMovieUpcoming, IMedia } from "../api";
import LoadingSpinner from "../components/LoadingSpinner";
import { useMatch } from "react-router-dom";
import { routes } from "../App";
import HeroScreen from "../components/HeroScreen";
import MediaSlider from "../components/MediaSlider";
import MediaDetail from "../components/MediaDetail";

const Home = () => {
  // router match
  const movieDetailMatch = useMatch(routes.MOVIE_DETAIL);
  // react-query
  const { isLoading: latestMovieLoading, data: latestMovieData } =
    useQuery<IMedia>(["Movies", "Latest"], getMovieLatest);
  const { isLoading: topMovieLoading, data: topMovieData } = useQuery<IMedia>(
    ["Movies", "TopRated"],
    getMovieTop
  );
  const { isLoading: upcomingMovieLoading, data: upcomingMovieData } =
    useQuery<IMedia>(["Movies", "Upcoming"], getMovieUpcoming);

  const loading = latestMovieLoading || topMovieLoading || upcomingMovieLoading;

  return (
    <div className=" w-full min-h-screen bg-black text-slate-200 pb-20">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <HeroScreen
            posterPath={latestMovieData?.results[0].poster_path || ""}
            title={latestMovieData?.results[0].title || ""}
            overview={latestMovieData?.results[0].overview || ""}
          />
          <section className="w-full flex flex-col gap-10">
            <MediaSlider
              title="Latest Movies"
              movies={latestMovieData?.results || []}
            />
            <MediaSlider
              title="Top Rated Movies"
              movies={topMovieData?.results || []}
            />
            <MediaSlider
              title="Upcoming Movies"
              movies={upcomingMovieData?.results || []}
            />
          </section>

          {movieDetailMatch ? (
            <MediaDetail id={movieDetailMatch.params.id || ""} />
          ) : null}
        </>
      )}
    </div>
  );
};

export default Home;
