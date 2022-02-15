import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Button from "./Button";

const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation();

  return (
    <header className="header">
      <h1 style={{ marginLeft: "5px" }}>{title}</h1>
      {location.pathname === "/home" && (
        <Button
          className="hover:hover"
          color={showAdd ? "red" : "#42b72a"}
          text={showAdd ? "Close" : "Add"}
          onClick={onAdd}
          style={{ fontSize: "medium !important" }}
        />
      )}
    </header>
  );
};

Header.defaultProps = {
  title: "Tasks",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

// CSS in JS
// const headingStyle = {
//   color: 'red',
//   backgroundColor: 'black',
// }

export default Header;
