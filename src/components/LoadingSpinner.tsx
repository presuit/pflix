import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoadingSpinner = () => {
  return (
    <div className="w-full h-full flex justify-center items-center  p-10">
      <FontAwesomeIcon
        className="text-slate-200 text-5xl animate-spin"
        icon={faCircleNotch}
      />
    </div>
  );
};

export default LoadingSpinner;
