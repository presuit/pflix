import { useQuery } from "react-query";
import { useLocation, useMatch } from "react-router-dom";
import { getMovieSearch, getTvSearch, IMedia } from "../api";
import MediaDetail from "../components/MediaDetail";
import MediaSlider from "../components/MediaSlider";

const Search = () => {
  const location = useLocation();
  const queries = new URLSearchParams(location.search);
  const searchDetailMatch = useMatch("/search/:id");
  const query = queries.get("q");

  const { isLoading: movieLoading, data: movieData } = useQuery<IMedia>(
    ["Search", "Movie", query],
    getMovieSearch
  );
  const { isLoading: tvLoading, data: tvData } = useQuery<IMedia>(
    ["Search", "TV", query],
    getTvSearch
  );

  console.log(query);

  const loading = movieLoading || tvLoading;

  return (
    <div className=" w-full min-h-screen bg-black text-slate-200 pb-20 pt-20">
      {loading ? (
        <span className="text-2xl animate-spin">Loading...</span>
      ) : (
        <>
          <div className="flex flex-col w-full gap-10">
            <MediaSlider
              title="Movie Results"
              movies={movieData?.results || []}
            />
            <MediaSlider title="Tv Results" movies={tvData?.results || []} />
          </div>

          {searchDetailMatch ? (
            <MediaDetail id={searchDetailMatch.params.id || ""} />
          ) : null}
        </>
      )}
    </div>
  );
};

export default Search;
