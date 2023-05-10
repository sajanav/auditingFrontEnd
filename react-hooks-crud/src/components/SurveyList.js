import React, { useState, useEffect } from "react";
import SurveyDataService from "../services/SurveyService";
import { Link } from "react-router-dom";

const SurveyList = () => {
  const [surveys, setSurvey] = useState([]);
  const [currentSurvey, setCurrentSurvey] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveSurveys();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveSurveys = () => {
    SurveyDataService.getAll()
      .then(response => {
        setSurvey(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveSurveys();
    setCurrentSurvey(null);
    setCurrentIndex(-1);
  };

  const setActiveSurvey = (survey, index) => {
    setCurrentSurvey(survey);
    setCurrentIndex(index);
  };

  const removeAllSurvey = () => {
    SurveyDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    SurveyDataService.findByTitle(searchTitle)
      .then(response => {
        setSurvey(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Survey List</h4>

        <ul className="list-group">
          {surveys &&
            surveys.map((survey, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveSurvey(survey, index)}
                key={index}
              >
                {survey.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllSurvey}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentSurvey ? (
          <div>
            <h4>Survey</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentSurvey.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentSurvey.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentSurvey.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/surveys/" + currentSurvey.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Survey...</p>
          </div>
        )}
      </div>
    </div>
    );
  
};

export default SurveyList;