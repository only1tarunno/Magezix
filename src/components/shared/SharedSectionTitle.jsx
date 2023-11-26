import PropTypes from "prop-types";

const SharedSectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="text-center space-y-3 mx-auto md:w-4/12">
      <h2 className=" text-4xl font-bold capitalize">{heading}</h2>
      <p className=" text-[#BB9CC0] text-xl capitalize">{subHeading}</p>
    </div>
  );
};

export default SharedSectionTitle;

SharedSectionTitle.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
};
