import PropTypes from "prop-types";
import {
  AiOutlineTrophy,
  AiOutlineExport,
  AiOutlineDatabase,
} from "react-icons/ai";
import Tooltip from "@mui/material/Tooltip";

const Header = ({ onLogout, onTasks, onLeaderboard, userName }) => {
  return (
    <>
      <div
        style={{
          background: "dodgerblue",
          paddingLeft: "30px",
          paddingBottom: "30px",
          paddingTop: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: "30px",
          borderRadius: "2px",
          marginTop: "30px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "34px",
              color: "white",
              fontWeight: "bold",
              fontFamily: "sans-serif",
              marginBottom: "0px",
            }}
          >
            Task Tracker
          </h1>
        </div>

        <div style={{ display: "flex" }}>
          <AiOutlineDatabase
            className="hov"
            size={23}
            onClick={onTasks}
            style={{
              color: "white",
              cursor: "pointer",
              marginRight: "12px",
            }}
            title="Tasks"
          ></AiOutlineDatabase>
          <AiOutlineTrophy
            className="hov tooltiptext"
            size={23}
            onClick={onLeaderboard}
            style={{
              color: "white",
              cursor: "pointer",
              marginRight: "12px",
            }}
          ></AiOutlineTrophy>

          <AiOutlineExport
            className="hov"
            onClick={onLogout}
            size={23}
            style={{
              color: "white",
              cursor: "pointer",
              marginRight: "12px",
            }}
          ></AiOutlineExport>
          <h3 style={{ color: "white", margin: "0px" }}>{userName}</h3>
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
