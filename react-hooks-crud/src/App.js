import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddSurvey from "./components/AddSurvey";
import Survey from "./components/Survey";
import SurveyList from "./components/SurveyList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
           <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/surveys"} className="nav-link">
              Surveys
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<SurveyList/>} />
          <Route path="/surveys" element={<SurveyList/>} />
          <Route path="/add" element={<AddSurvey/>} />
          <Route path="/surveys/:id" element={<Survey/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;