import { useState } from "react";

const AddTask = ({ onAdd, userId, userName }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      alert("Please add a task name.");
      return;
    }

    onAdd({ name, description, userId, userName });

    setName("");
    setDescription("");
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form">
        <input
          style={{ border: "1px solid silver", borderRadius: "2px" }}
          type="text"
          placeholder="Task Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form">
        <input
          style={{ border: "1px solid silver", borderRadius: "2px" }}
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <input
        type="submit"
        value="Save Task"
        className="btn btn-block"
        style={{
          backgroundColor: "#42b72a",
          fontSize: "medium",
          color: "white",
        }}
      />

      <hr />
    </form>
  );
};

export default AddTask;
