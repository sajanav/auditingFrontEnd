import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import SurveyDataService from "../services/SurveyService";

const Survey = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialSurveyState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentSurvey, setCurrentSurvey] = useState(initialSurveyState);
  const [message, setMessage] = useState("");

  const getSurvey = id => {
    SurveyDataService.get(id)
      .then(response => {
        setCurrentSurvey(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getSurvey(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentSurvey({ ...currentSurvey, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentSurvey.id,
      title: currentSurvey.title,
      description: currentSurvey.description,
      published: status
    };

    SurveyDataService.update(currentSurvey.id, data)
      .then(response => {
        setCurrentSurvey({ ...currentSurvey, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateSurvey = () => {
    SurveyDataService.update(currentSurvey.id, currentSurvey)
      .then(response => {
        console.log(response.data);
        setMessage("The Survey was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteSurvey = () => {
    SurveyDataService.remove(currentSurvey.id)
      .then(response => {
        console.log(response.data);
        navigate("/surveys");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentSurvey ? (
        <div className="edit-form">
          <h4>Survey</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentSurvey.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentSurvey.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentSurvey.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentSurvey.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteSurvey}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateSurvey}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Survey...</p>
        </div>
      )}
    </div>
  );
  
};

export default Survey;