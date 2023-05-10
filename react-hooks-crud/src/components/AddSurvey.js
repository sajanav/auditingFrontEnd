import React, { useState } from "react";
import SurveyDataService from "../services/SurveyService";

const AddSurvey = () => {
  const initialSurveyState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [survey, setSurvey] = useState(initialSurveyState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setSurvey({ ...survey, [name]: value });
  };

  const saveSurvey = () => {
    var data = {
      title: survey.title,
      description: survey.description
    };

    SurveyDataService.create(data)
      .then(response => {
        setSurvey({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newSurvey = () => {
    setSurvey(initialSurveyState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
    {submitted ? (
      <div>
        <h4>You submitted successfully!</h4>
        <button className="btn btn-success" onClick={newSurvey}>
          Add
        </button>
      </div>
    ) : (
      <div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            required
            value={survey.title}
            onChange={handleInputChange}
            name="title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            required
            value={survey.description}
            onChange={handleInputChange}
            name="description"
          />
        </div>

        <button onClick={saveSurvey} className="btn btn-success">
          Submit
        </button>
      </div>
    )}
  </div>
  );
};

export default AddSurvey;