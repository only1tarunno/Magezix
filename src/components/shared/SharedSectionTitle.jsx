import PropTypes from "prop-types";

const SharedSectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="text-center space-y-3 mx-auto md:w-4/12">
      <p className=" text-[#ff184e] text-xl capitalize">{subHeading}</p>
      <h2 className=" text-4xl border-y-2 py-4 capitalize">{heading}</h2>
    </div>
  );
};

export default SharedSectionTitle;

SharedSectionTitle.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
};
