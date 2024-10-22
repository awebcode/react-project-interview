import PropTypes from "prop-types";

const Title = ({ title, className = "", level = "h2", ...props }) => {
  // Create a variable for the title element based on the 'level' prop
  const TitleTag = level;

  return (
    <TitleTag className={`text-3xl text-gray-700 md:text-4xl p-4 leading-8 tracking-wide font-sans  font-bold ${className}`} {...props}>
      {title}
    </TitleTag>
  );
};

// Define prop types for validation
Title.propTypes = {
  title: PropTypes.string.isRequired, // title is required and must be a string
  className: PropTypes.string,
  level: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]), // allows different heading levels
};

// Define default props
Title.defaultProps = {
  className: "",
  level: "h2", // default heading level is h2
};

export default Title;
