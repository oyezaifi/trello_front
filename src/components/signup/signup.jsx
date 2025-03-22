import React, { useState } from "react";
import classes from "./signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import API from "../../utils/axiosInstance/axiosInstance";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { GoArrowUpRight } from "react-icons/go";

const Signup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const navigate = useNavigate();
  
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Check if the password matches the regex
    if (!passwordRegex.test(newPassword)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const UserData = {
      firstname,
      lastname,
      email,
      username,
      password,
    };

    API.post("/auth/signup", UserData)
      .then((result) => {
        console.log(result);
        setFirstName("");
        setLastName("");
        setEmail("");
        setUsername("");
        setPassword("");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };
  
  return (
    <div className={classes["signup-container"]}>
      <form onSubmit={handleSubmit} className={classes["auth-form"]}>
        <div className={classes.container}>
          <h1>Signup</h1>
          <span>Create an account to unlock exclusive features.</span>
          <input
            type="text"
            name="First Name"
            id="fname"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            name="Last Name"
            id="lname"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            name="Email"
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            name="Username"
            id="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div className={classes.password}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
            <p
              className={classes["password-error"]}
              id={passwordError ? "showerror" : "hide"}
            >
              {passwordError ? "Provide a valid password e.g First@123" : ""}
            </p>
            {showPassword ? (
              <IoMdEye
                className={classes["eye-icon"]}
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <IoMdEyeOff
                className={classes["eye-icon"]}
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          <button type="submit" className={classes.submitbtn}>
            Signup
          </button>
          <span className={classes.choice}>OR</span>
          <p className={classes.redirect}>
            Already have an account?
            <Link to={"/login"} className={classes["login-link"]}>
              Login
              <GoArrowUpRight className={classes["arrow-icon"]} />
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;