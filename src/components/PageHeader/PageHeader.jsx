import PropTypes from "prop-types";

const PageHeader = ({ children }) => {
  return (
    <div className="py-1 px-2 mb-5 flex gap-4 justify-end">
      { children }
    </div>
  );
}


PageHeader.propTypes = {
  children: PropTypes.any
};

export default PageHeader;