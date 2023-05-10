import http from "../http-common";

const getAll = () => {
  return http.get("/surveys");
};

const get = id => {
  return http.get(`/surveys/${id}`);
};

const create = data => {
  return http.post("/surveys", data);
};

const update = (id, data) => {
  return http.put(`/surveys/${id}`, data);
};

const remove = id => {
  return http.delete(`/surveys/${id}`);
};

const removeAll = () => {
  return http.delete(`/surveys`);
};

const findByTitle = title => {
  return http.get(`/surveys?title=${title}`);
};

const SurveyService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default SurveyService;