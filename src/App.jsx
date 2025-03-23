import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./components/Login/login";
import SignupPage from "./components/signup/signup";
// import Dashboard from "./components/Dashboard/dashboard";
// import Task from "./components/Task/task";
import BoardPage from "./components/Dashboard/BoardPage";
import Home from "./components/Home/homepage";
import DashboardPage from "./components/Home/homepage";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/* Redirect the root URL to /login */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* <Route path="/dashboard" element={<Dashboard/>} /> */}
          {/* <Route path="/task" element={<Task/>} /> */}
          <Route path="/board/:boardId" element={<BoardPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home" element={<DashboardPage />} />
<Route path="/boards" element={<DashboardPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
