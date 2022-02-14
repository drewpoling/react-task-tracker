import { FaTimes } from "react-icons/fa";
import { BsCheckLg } from "react-icons/bs";

const Task = ({ task, onDelete, onComplete }) => {
  onDelete = Math.floor();
  return (
    <div
      style={{
        justifyContent: "space-between",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center",
        cursor: "default",
      }}
      className={`task ${task.status && "status"}`}
    >
      <div>
        <h3 style={{ margin: "0px" }}>{task.name}</h3>
        <p style={{ fontSize: "small", margin: "0px" }}>{task.description}</p>
      </div>
      <div>
        <BsCheckLg
          className="hov2"
          size={18}
          style={{
            color: "#42b72a",
            cursor: "pointer",
            margin: "auto 20px auto 0px",
          }}
          onClick={() => onComplete(task.id)}
        />

        <FaTimes
          className="hov2"
          size={18}
          style={{
            color: "red",
            cursor: "pointer",
            margin: "auto 0px auto 0px",
          }}
          onClick={() => onDelete(task.id)}
        />
      </div>
    </div>
  );
};

export default Task;
