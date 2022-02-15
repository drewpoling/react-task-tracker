import React, { useState } from "react";
import Axios from "axios";
import "../App.css";
import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import { GrFormClose } from "react-icons/gr";

export default function Login({ onLogin }) {
  let navigate = useNavigate();
  const [usernameReg, setUsernameReg] = useState("");
  const [nameReg, setNameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState(0);

  Axios.defaults.withCredentials = true;

  const register = () => {
    try {
      Axios.post("http://localhost:3001/register", {
        username: usernameReg,
        name: nameReg,
        password: passwordReg,
      }).then((response) => {
        console.log("register response = " + response);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const userAuthenticated = () => {
    Axios.get("http://localhost:3001/isUserAuth", {
      headers: { "x-access-token": localStorage.getItem("token") },
    }).then((response) => {
      console.log("userAuthenticated response = " + response);
    });
  };

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      Axios.get("http://localhost:3001/login").then((response) => {
        if (response.data.loggedIn === true) {
          userAuthenticated();
          navigate("/home");
          console.log(response);
          const userId = response.data.user[0].id;
          const userName = response.data.user[0].name;
          onLogin(userId, userName);
        } else {
          navigate("/");
        }
      });
      if (!response.data.auth) {
        setLoginStatus(false);
      } else {
        localStorage.setItem("token", response.data.token);
        setLoginStatus(true);
      }
    });
  };

  function Error() {
    return (
      <h2 style={{ color: "red", fontWeight: "500", paddingTop: "5px" }}>
        Incorrect information
      </h2>
    );
  }

  return (
    <div>
      <div className="container">
        <div className="col-11" style={{ margin: "auto" }}>
          <div className="row" style={{ padding: "125px 0px 150px 0px" }}>
            <div
              className="col-xl-5 col"
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "auto",
              }}
            >
              <div
                className="login-container"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h1
                  style={{
                    color: "dodgerblue",
                    fontSize: "36px",
                    fontWeight: "bold",
                    fontFamily: "serif !important",
                    textAlign: "center",
                  }}
                >
                  Task Tracker
                </h1>
                <h2
                  style={{
                    textAlign: "center",
                    fontWeight: "normal",
                    margin: "15px 0px 20px 0px",
                  }}
                >
                  Track project progress individually or with teams on Task
                  Tracker.
                </h2>

                <hr />

                <input
                  style={{
                    border: "1px solid silver",
                    borderRadius: "2px",
                    width: "100%",
                    display: "block",
                    marginTop: "20px",
                    paddingLeft: "10px",
                    fontSize: "medium",
                  }}
                  type="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <input
                  type="password"
                  style={{
                    border: "1px solid silver",
                    width: "100%",
                    display: "block",
                    borderRadius: "2px",
                    paddingLeft: "10px",
                    marginTop: "5px",
                    fontSize: "medium",
                  }}
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <button
                  className="btn btn-block"
                  style={{
                    fontSize: "medium",
                    color: "white",

                    backgroundColor: "dodgerblue",
                    margin: "30px auto 20px auto",
                  }}
                  onClick={login}
                >
                  Login
                </button>
                {loginStatus === false ? <Error /> : null}

                <hr />

                <button
                  type="submit"
                  className="btn btn-block"
                  style={{
                    backgroundColor: "#42b72a",
                    fontSize: "medium",
                    color: "white",
                    marginTop: "20px",
                    marginBottom: "0px",
                  }}
                  data-toggle="modal"
                  data-target="#myModal"
                >
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {
        //modal
      }
      <div className="modal fade" id="myModal" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content" style={{ padding: "20px" }}>
            <div
              className="modal-header"
              style={{ border: "none", paddingLeft: "25px" }}
            >
              <h1
                className="modal-title"
                style={{
                  color: "dodgerblue",
                  fontSize: "36px",
                  fontWeight: "bold",
                  fontFamily: "serif !important",
                  textAlign: "center",
                  marginLeft: "auto",
                }}
              >
                Sign up
              </h1>

              <button
                type="button"
                style={{ padding: "0px" }}
                className="close"
                data-dismiss="modal"
              >
                <GrFormClose size={30} />
              </button>
            </div>
            <div className="modal-body">
              <hr />

              <form>
                <div className="">
                  <input
                    type="email"
                    style={{
                      border: "1px solid silver",
                      width: "100%",
                      display: "block",
                      borderRadius: "2px",
                      paddingLeft: "10px",
                      marginTop: "30px",
                      fontSize: "medium",
                    }}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Email"
                    onChange={(e) => {
                      setUsernameReg(e.target.value);
                    }}
                  />
                  <input
                    type="text"
                    maxlength="3"
                    style={{
                      border: "1px solid silver",
                      width: "100%",
                      display: "block",
                      borderRadius: "2px",
                      paddingLeft: "10px",
                      marginTop: "5px",
                      fontSize: "medium",
                    }}
                    id="exampleInputName1"
                    placeholder="Username"
                    onChange={(e) => {
                      setNameReg(e.target.value);
                    }}
                  />
                  <input
                    type="password"
                    style={{
                      border: "1px solid silver",
                      width: "100%",
                      display: "block",
                      borderRadius: "2px",
                      paddingLeft: "10px",
                      marginTop: "5px",
                      fontSize: "medium",
                    }}
                    id="exampleInputPassword1"
                    placeholder="Password"
                    onChange={(e) => {
                      setPasswordReg(e.target.value);
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-block"
                  style={{
                    backgroundColor: "#42b72a",
                    fontSize: "medium",
                    color: "white",
                    marginTop: "30px",
                    marginBottom: "10px",
                    border: "none",
                  }}
                  data-toggle="modal"
                  data-target="#myModal"
                  onClick={register}
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
