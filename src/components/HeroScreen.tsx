import { getImgURL, IMG_SIZES } from "../api";

interface IHeroScreen {
  posterPath: string;
  title?: string;
  name?: string;
  overview: string;
}

const HeroScreen: React.FC<IHeroScreen> = ({
  overview,
  posterPath,
  title,
  name,
}) => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0), rgba(0,0,0.5)), url(${getImgURL(
          posterPath,
          IMG_SIZES.poster
        )})`,
      }}
      className="w-full h-[90vh] bg-cover bg-center flex justify-start items-end p-10"
    >
      <div className="w-1/2 flex flex-col items-centerx gap-5">
        <h1 className="w-full text-7xl font-semibold">{title || name}</h1>
        <p className="xl:text-lg">{overview}</p>
      </div>
    </div>
  );
};

export default HeroScreen;
