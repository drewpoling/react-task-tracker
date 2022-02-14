import { useState, useEffect, useCallback } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";
import Login from "./components/Login";
import ProgressChart from "./components/ProgressChart";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import BillableChart from "./components/BillableChart";
import HomeHeader from "./components/HomeHeader";
import Scores from "./components/Scores";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [compTasks, setCompTasks] = useState([]);
  const [compHrs, setCompHrs] = useState([]);
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const [userName, setUsername] = useState();

  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5000/tasks");
      const data = await res.json();
      setAllTasks(data);
      const tasksInProgress = data.filter(
        (task) => task.status !== true && task.userId === userId
      );
      return tasksInProgress;
    } catch (err) {
      console.log(err);
    }
  }, [userId]);

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
  }, [userId, setUserId, fetchTasks, userName, setUsername, navigate]);

  // Fetch Tasks

  // Fetch Task
  const fetchTask = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/tasks/${id}`);
      const data = await res.json();

      return data;
    } catch (err) {
      console.log(err);
    }
  };

  //logout, deletes cookie and jwt token
  const onLogout = () => {
    return new Promise((res) => {
      localStorage.removeItem("token");
      document.cookie =
        "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/");
      res();
    });
  };

  const onLeaderboard = () => {
    return new Promise((res) => {
      navigate("/leaderboard");
      res();
    });
  };

  const onTasks = () => {
    return new Promise((res) => {
      navigate("/home");
      res();
    });
  };

  //renames any instances of wrong naming convention in data properties
  function rename() {
    const tasks = allTasks.map(function (obj) {
      if (obj.userName) {
        obj.username = obj.userName;
        delete obj.userName;
      }
      return obj;
    });
    return tasks;
  }

  rename();
  //filters users
  const filterUser = (userName) => {
    //filters user score
    let u = allTasks.filter(
      (task) =>
        task.username &&
        task.hrs > 0 &&
        task.status === true &&
        task.username === userName &&
        task.hrs !== null
    );

    //converts hours string to number
    const hrsArray = u.map((task) => parseFloat(task.hrs));

    //calculates total user score and makes obj with username & score
    const totalUserScore = () => {
      const ptFactor1 = 0.1;
      const ptFactor2 = 10;
      const value = hrsArray.map((task) =>
        Math.floor(ptFactor2 / (ptFactor1 * task))
      );
      const score = value.reduce((partial_sum, a) => partial_sum + a, 0);
      const userPoints = { username: userName, score: score };
      return userPoints;
    };
    const total = totalUserScore();
    return total;
  };

  //maps through userTasksArray and grabs all scores for each user
  const allScores = () => {
    const allUserScores = allTasks.map((userTasks) => {
      const userName = userTasks.username;
      return filterUser(userName);
    });

    return allUserScores;
  };

  const allUserScores = allScores();

  //filters out duplicates and puts leftovers into highscores array
  const highScores = allUserScores.reduce((acc, current) => {
    const x = acc.find(
      (item) =>
        item.username === current.username && item.userName === current.userName
    );
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  //sorts the highScores from highest to lowest
  const rank = () => {
    const sorted = highScores.sort((a, b) => b.score - a.score);
    //adds the rank property to highscores
    for (var i = 0; i < sorted.length; i++) {
      sorted[i].rank = i + 1;
    }
    return sorted;
  };

  //filter out 0s

  const scores = rank();

  const fetchCompTasksForEachMonth = async () => {
    try {
      const res = await fetch("http://localhost:5000/tasks");
      const data = await res.json();

      const userData = data.filter((task) => task.userId === userId);
      if (userData) {
        const compTasksFromServer = userData.reduce(
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

      const userData = data.filter((task) => task.userId === userId);
      if (userData) {
        const compHrsFromServer = userData.reduce(
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

  // Add Task
  const addTask = async (task) => {
    try {
      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await res.json();

      setTasks([...tasks, data]);
    } catch (err) {
      console.log(err);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });
      //We should control the response status to decide if we will change the state or not.
      res.status === 200
        ? setTasks(tasks.filter((task) => task.id !== id))
        : alert("Error Deleting This Task");
    } catch (err) {
      console.log(err);
    }
  };

  const onLogin = (userId, userName) => {
    setUserId(userId);
    setUsername(userName);
  };

  //toggles task status to done, pushes hrs and month into task object, and seeds graph data
  const toggleStatus = async (id) => {
    try {
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
        res.status === 200
          ? setTasks(tasks.filter((task) => task.id !== id))
          : alert("Error Completing This Task");
        fetchCompHrsForEachMonth();
        fetchCompTasksForEachMonth();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const RequireAuth = ({ children }) => {
    const token = localStorage.getItem("token");
    return token !== null ? children : <Navigate to="/" replace />;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Login onLogin={onLogin} />} />
        ;
        <Route
          path="/home"
          element={
            <RequireAuth>
              <div className="container">
                <div className="col-xl-10 col-12" style={{ margin: "auto" }}>
                  <HomeHeader
                    userName={userName}
                    onTasks={onTasks}
                    onLeaderboard={onLeaderboard}
                    onLogout={onLogout}
                  ></HomeHeader>
                  <div className="row gx-5">
                    <div className="col-xl-7 col">
                      <div className="widget-container">
                        <Header
                          onAdd={() => setShowAddTask(!showAddTask)}
                          showAdd={showAddTask}
                        />
                        {showAddTask && (
                          <AddTask
                            userId={userId}
                            userName={userName}
                            onAdd={addTask}
                          />
                        )}
                        {tasks.length > 0 ? (
                          <Tasks
                            tasks={tasks}
                            onDelete={deleteTask}
                            onComplete={toggleStatus}
                          />
                        ) : (
                          <p style={{ fontSize: "medium" }}>
                            No Tasks Currently
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-xl-5 col">
                      <div className="widget2-container">
                        <ProgressChart task={compTasks} />
                      </div>
                      <div className="widget3-container">
                        <BillableChart hrs={compHrs} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RequireAuth>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <RequireAuth>
              <div className="container">
                <div className="col-xl-10 col-12" style={{ margin: "auto" }}>
                  <HomeHeader
                    userName={userName}
                    onTasks={onTasks}
                    onLeaderboard={onLeaderboard}
                    onLogout={onLogout}
                  ></HomeHeader>
                  <Scores scores={scores} />
                </div>
              </div>
            </RequireAuth>
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
};

export default App;
