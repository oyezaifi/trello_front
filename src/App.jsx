import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/Login/login";
import SignupPage from "./components/signup/signup";
// import Dashboard from "./components/Dashboard/dashboard";
// import Task from "./components/Task/task";
import DashboardPage from "./components/Home/Dashboard";
import Board from "./Board/Board";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/boards/:boardId" element={<Board />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
