import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <Link style={{ padding: "5px" }} to="/about">
        About
      </Link>
      <Link style={{ padding: "5px" }} to="/about">
        Privacy
      </Link>
      <Link style={{ padding: "5px" }} to="/about">
        Terms
      </Link>
      <Link style={{ padding: "5px" }} to="/about">
        Tour
      </Link>
      <Link style={{ padding: "5px" }} to="/about">
        Top Accounts
      </Link>
      <Link style={{ padding: "5px" }} to="/about">
        Help
      </Link>
      <Link style={{ padding: "5px" }} to="/about">
        Contact
      </Link>
      <p style={{ padding: "10px" }}>
        Sim -- The "Somehow I Manage" Task Tracker &copy; 2022
      </p>
    </footer>
  );
};

export default Footer;
