import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";
import Login from "./components/Login";
import ProgressChart from "./components/ProgressChart";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import BillableChart from "./components/BillableChart";
import HomeHeader from "./components/HomeHeader";

export const fetchCompTasksForEachMonth = async () => {
  const res = await fetch("http://localhost:5000/tasks");
  const data = await res.json();
  const compTasksForEachMonth = {
    janCompTasks: data.filter(
      (task) => task.status !== false && task.month === 1
    ),
    febCompTasks: data.filter(
      (task) => task.status !== false && task.month === 2
    ),
    marCompTasks: data.filter(
      (task) => task.status !== false && task.month === 3
    ),
    aprCompTasks: data.filter(
      (task) => task.status !== false && task.month === 4
    ),
    mayCompTasks: data.filter(
      (task) => task.status !== false && task.month === 5
    ),
    junCompTasks: data.filter(
      (task) => task.status !== false && task.month === 6
    ),
    julCompTasks: data.filter(
      (task) => task.status !== false && task.month === 7
    ),
    augCompTasks: data.filter(
      (task) => task.status !== false && task.month === 8
    ),
    sepCompTasks: data.filter(
      (task) => task.status !== false && task.month === 9
    ),
    octCompTasks: data.filter(
      (task) => task.status !== false && task.month === 10
    ),
    novCompTasks: data.filter(
      (task) => task.status !== false && task.month === 11
    ),
    decCompTasks: data.filter(
      (task) => task.status !== false && task.month === 12
    ),
  };
  console.log(compTasksForEachMonth.febCompTasks.length);
  console.log(compTasksForEachMonth.janCompTasks.length);

  return compTasksForEachMonth;
};

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    fetchCompTasksForEachMonth();
    const tasksInProgress = data.filter((task) => task.status !== true);
    return tasksInProgress;
  };

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  //filters completed tasks into new array depending on when they were finished

  const fetchCompTasksForEachMonth = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    const compTasksForEachMonth = {
      janCompTasks: data.filter(
        (task) => task.status !== false && task.month === 1
      ),
      febCompTasks: data.filter(
        (task) => task.status !== false && task.month === 2
      ),
      marCompTasks: data.filter(
        (task) => task.status !== false && task.month === 3
      ),
      aprCompTasks: data.filter(
        (task) => task.status !== false && task.month === 4
      ),
      mayCompTasks: data.filter(
        (task) => task.status !== false && task.month === 5
      ),
      junCompTasks: data.filter(
        (task) => task.status !== false && task.month === 6
      ),
      julCompTasks: data.filter(
        (task) => task.status !== false && task.month === 7
      ),
      augCompTasks: data.filter(
        (task) => task.status !== false && task.month === 8
      ),
      sepCompTasks: data.filter(
        (task) => task.status !== false && task.month === 9
      ),
      octCompTasks: data.filter(
        (task) => task.status !== false && task.month === 10
      ),
      novCompTasks: data.filter(
        (task) => task.status !== false && task.month === 11
      ),
      decCompTasks: data.filter(
        (task) => task.status !== false && task.month === 12
      ),
    };
    //return compTasksForEachMonth;
    return [10, 6, 8, 9, 5, 3];
  };

  const task = async () => await fetchCompTasksForEachMonth();
  console.log(task);
  // const compTasksForEachMonth = async () => await fetchCompTasksForEachMonth();
  // console.log(compTasksForEachMonth);
  // const janCompTasks = compTasksForEachMonth.janCompTasks.length;
  // Add Task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTasks([...tasks, data]);

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  };

  // Delete Task
  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert("Error Deleting This Task");
  };

  const completeTaskTest = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, status: !taskToToggle.status };

    const res = await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: data.status } : task
      )
    );
  };

  const toggleStatus = async (id) => {
    let today = new Date();
    let month = today.getMonth() + 1;

    const taskToToggle = await fetchTask(id);
    const compTask = {
      ...taskToToggle,
      status: !taskToToggle.status,
      month: month,
    };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(compTask),
    });
    const data = await res.json();

    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert("Error Completing This Task");

    let person = prompt("Please enter the amount of hrs used for this task.");
    let text;
    if (person == null || person == "") {
      text = "User cancelled the prompt.";
    } else {
      text = "Hello " + person + "! How are you today?";
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        ;
        <Route
          path="/home"
          element={
            <>
              <div className="container" style={{ padding: "0px 75px" }}>
                <HomeHeader />
                <div className="row gx-5">
                  <div className="col-7">
                    <div className="widget-container">
                      <Header
                        onAdd={() => setShowAddTask(!showAddTask)}
                        showAdd={showAddTask}
                      />
                      {showAddTask && <AddTask onAdd={addTask} />}
                      {tasks.length > 0 ? (
                        <Tasks
                          tasks={tasks}
                          onDelete={deleteTask}
                          onComplete={toggleStatus}
                        />
                      ) : (
                        "No Tasks To Show"
                      )}
                    </div>
                  </div>

                  <div className="col-5">
                    <div className="widget-container">
                      <ProgressChart task={[]} />
                    </div>
                    <div className="widget-container">
                      <BillableChart />
                    </div>
                  </div>
                </div>
              </div>
            </>
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
