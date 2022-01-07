import { FaTimes } from "react-icons/fa";
import { BsCheckLg } from "react-icons/bs";

const Task = ({ task, onDelete, onComplete }) => {
  return (
    <div className={`task ${task.status && "status"}`}>
      <h3>
        {task.name}
        <div>
          <BsCheckLg
            style={{
              color: "#42b72a",
              cursor: "pointer",
              margin: "0 20px 0 0",
            }}
            onClick={() => onComplete(task.id)}
          />

          <FaTimes
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => onDelete(task.id)}
          />
        </div>
      </h3>
      <p style={{ fontSize: "small" }}>{task.description}</p>
      <p style={{ fontSize: "small" }}>{task.duedate}</p>
    </div>
  );
};

export default Task;
