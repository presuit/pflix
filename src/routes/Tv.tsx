import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import {
  getTvAiringToday,
  getTvLatest,
  getTvPopular,
  getTvTopRated,
  IMedia,
} from "../api";
import { routes } from "../App";
import HeroScreen from "../components/HeroScreen";
import LoadingSpinner from "../components/LoadingSpinner";
import MediaDetail from "../components/MediaDetail";
import MediaSlider from "../components/MediaSlider";

const Tv = () => {
  // router match
  const tvDetailMatch = useMatch(routes.TV_DETAIL);
  // react-query
  const { isLoading: latestLoading, data: latestData } = useQuery<IMedia>(
    ["Latest"],
    getTvLatest
  );

  const { isLoading: airingTodayLoading, data: airingTodayData } =
    useQuery<IMedia>(["AiringToday"], getTvAiringToday);

  const { isLoading: popularLoading, data: popularData } = useQuery<IMedia>(
    ["Popular"],
    getTvPopular
  );

  const { isLoading: topRatedLoading, data: topRatedData } = useQuery<IMedia>(
    ["TopRated"],
    getTvTopRated
  );

  const loading =
    latestLoading || airingTodayLoading || popularLoading || topRatedLoading;

  return (
    <div className=" w-full min-h-screen bg-black text-slate-200 pb-20">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <HeroScreen
            posterPath={latestData?.results[0].poster_path || ""}
            title={latestData?.results[0].title || ""}
            name={latestData?.results[0].name || ""}
            overview={latestData?.results[0].overview || ""}
          />
          <section className="w-full flex flex-col gap-10">
            <MediaSlider
              title="Latest TV Shows"
              movies={latestData?.results || []}
            />
            <MediaSlider
              title="Airing Today TV Shows"
              movies={airingTodayData?.results || []}
            />
            <MediaSlider
              title="Popular TV Shows"
              movies={popularData?.results || []}
            />
            <MediaSlider
              title="Top Rated TV Shows"
              movies={topRatedData?.results || []}
            />
          </section>
          {tvDetailMatch ? (
            <MediaDetail id={tvDetailMatch.params.id || ""} />
          ) : null}
        </>
      )}
    </div>
  );
};

export default Tv;
