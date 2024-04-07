import React from "react";
import Home from "./pages/Home";
import SignUpPage from "./pages/signup";
import LoginPage from "./pages/Login";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Findsalaries from "./pages/Findsalaries";
import Jobinfo from "./pages/Jobinfo";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/findsalaries" element={<Findsalaries />} />
        <Route path="/job" element={<Jobinfo />} />
      </Routes>
    </Router>
  );
};

export default App;
