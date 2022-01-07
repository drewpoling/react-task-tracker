import React, { useState } from "react";
import Axios from "axios";
import "../App.css";
import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  let navigate = useNavigate();
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
    });
  };

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      Axios.get("http://localhost:3001/login").then((response) => {
        if (response.data.loggedIn === true) {
          setLoginStatus(response.data.user[0].username);
          navigate("/home");
          console.log(response);
        }
      });
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].username);
      }
    });
  };

  return (
    <div className="">
      <div className="container" style={{ padding: "0px 150px" }}>
        <div className="row" style={{ padding: "75px 0px 150px 0px" }}>
          <div
            className="col-5"
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
              <img
                src="sim-oo11-01.svg"
                style={{ width: "200px", height: "auto" }}
                alt="img path not correct"
              />
              <h2
                style={{
                  textAlign: "center",
                  fontWeight: "normal",
                  margin: "15px 0px 20px 0px",
                }}
              >
                Track your project progress individually or with teams on Sim.
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
                type="text"
                placeholder="Email"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <input
                type="text"
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
                  margin: "30px auto 10px auto",
                }}
                onClick={login}
              >
                Login
              </button>
              <a style={{ marginBottom: "20px" }} href="/forgotpassword">
                Forgot password?
              </a>
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
              <p style={{ fontSize: "small", margin: "10px 0px" }}>
                Take a video <a href="/video">tour</a> to learn more
              </p>
            </div>
          </div>
        </div>

        <h1>{loginStatus}</h1>
      </div>
      <div className="modal fade " id="myModal" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
              <h1 className="modal-title">Sign up</h1>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label for="exampleInputEmail1"></label>
                  <input
                    type="text"
                    className="test"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Email or username"
                    onChange={(e) => {
                      setUsernameReg(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1"></label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    onChange={(e) => {
                      setPasswordReg(e.target.value);
                    }}
                  />
                </div>
                <div className="form-check"></div>
                <button
                  type="submit"
                  className="login-button"
                  data-toggle="modal"
                  data-target="#myModal"
                  onClick={register}
                >
                  Sign up
                </button>
              </form>{" "}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
