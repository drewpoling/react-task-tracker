import PropTypes from "prop-types";
import Button from "./Button";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  AiOutlineRobot,
  AiOutlineTrophy,
  AiOutlineSetting,
  AiOutlineAlert,
  AiOutlineExport,
} from "react-icons/ai";

const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation();
  return (
    <>
      <div
        style={{
          background: "dodgerblue",
          paddingLeft: "30px",
          paddingBottom: "0px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: "30px",
          borderRadius: "2px",
          marginTop: "30px",
        }}
      >
        <div>
          <img
            src="Untitled-1-01.svg"
            style={{ width: "100px", height: "100px" }}
            alt="img path not correct"
          />
        </div>

        <div>
          <AiOutlineTrophy
            size={23}
            style={{
              color: "white",
              cursor: "pointer",
              marginTop: "20px",
              marginRight: "12px",
            }}
          ></AiOutlineTrophy>
          <AiOutlineAlert
            size={23}
            style={{
              color: "white",
              cursor: "pointer",
              marginTop: "20px",
              marginRight: "12px",
            }}
          ></AiOutlineAlert>
          <AiOutlineSetting
            size={23}
            style={{
              color: "white",
              cursor: "pointer",
              marginTop: "20px",
              marginRight: "12px",
            }}
          ></AiOutlineSetting>
          <AiOutlineRobot
            size={23}
            style={{
              color: "white",
              cursor: "pointer",
              marginTop: "20px",
              marginRight: "12px",
            }}
          ></AiOutlineRobot>
          <AiOutlineExport
            size={23}
            style={{
              color: "white",
              cursor: "pointer",
              marginTop: "20px",
              marginRight: "12px",
            }}
          ></AiOutlineExport>
        </div>
      </div>
    </>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
