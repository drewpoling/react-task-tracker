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

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [compTasks, setCompTasks] = useState([]);
  const [compHrs, setCompHrs] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);

      const compTasksFromServer = await fetchCompTasksForEachMonth();
      setCompTasks(compTasksFromServer);

      const compHrsFromServer = await fetchCompHrsForEachMonth();
      setCompHrs(compHrsFromServer);
    };
    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    const tasksInProgress = data.filter((task) => task.status !== true);
    return tasksInProgress;
  };

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  //reduces tasks completed from each month into new array

  const fetchCompTasksForEachMonth = async () => {
    try {
      const res = await fetch("http://localhost:5000/tasks");
      const data = await res.json();

      if (data) {
        const compTasksFromServer = data.reduce(
          (tasksArray, task) => {
            tasksArray[task.month - 1] += 1;
            return tasksArray;
          },
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        );
        setCompTasks(compTasksFromServer);
        return compTasksFromServer;
      }
      return [];
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCompHrsForEachMonth = async () => {
    try {
      const res = await fetch("http://localhost:5000/tasks");
      const data = await res.json();

      if (data) {
        const compHrsFromServer = data.reduce(
          (tasksArray, task) => {
            tasksArray[task.month - 1] += +task.hrs;
            return tasksArray;
          },
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        );
        setCompHrs(compHrsFromServer);
        return compHrsFromServer;
      }
      return [];
    } catch (err) {
      console.log(err);
    }
  };

  // (async () => {
  //   console.log(await fetchCompTasksForEachMonth());
  // })();

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

  const toggleStatus = async (id) => {
    let today = new Date();
    let month = today.getMonth() + 1;

    const taskToToggle = await fetchTask(id);
    let hrs = prompt("Please enter the amount of hrs used for this task.");
    if (isNaN(hrs)) {
      alert("Must input numbers");
      return null;
    } else {
      const compTask = {
        ...taskToToggle,
        status: !taskToToggle.status,
        month: month,
        hrs: hrs,
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
      fetchCompHrsForEachMonth();
      fetchCompTasksForEachMonth();
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
                      <ProgressChart task={compTasks} />
                    </div>
                    <div className="widget-container">
                      <BillableChart hrs={compHrs} />
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
