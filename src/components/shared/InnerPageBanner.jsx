import { Link } from "react-router-dom";
import img from "../../assets/banner.jpg";
import PropTypes from "prop-types";

const InnerPageBanner = ({ title, subTitle }) => {
  return (
    <div
      className="error-banner min-h-[500px] flex  justify-center items-center bg-cover"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)),url(${img})`,
      }}
    >
      <div className=" z-30 text-center space-y-2">
        <h2 className="font-bold text-4xl lg:text-7xl text-white ">{title}</h2>
        <p className="text-white font-medium text-xl">
          <Link to="/">Home</Link> | {subTitle}
        </p>
      </div>
    </div>
  );
};

export default InnerPageBanner;
InnerPageBanner.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
};
