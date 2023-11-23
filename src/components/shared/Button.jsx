import PropTypes from "prop-types";
const Button = ({ text }) => {
  return (
    <>
      <button className="btn bg-[#ff184e] border-[#ff184e] rounded  hover:bg-[#4c5161] hover:border-[#4c5161] text-white font-medium uppercase">
        {text}
      </button>
    </>
  );
};

export default Button;

Button.propTypes = {
  text: PropTypes.string,
};
