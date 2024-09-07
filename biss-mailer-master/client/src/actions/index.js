import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS } from "./type";
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/curr");

  console.log("hdsi");
  console.log("this is reqtuen" + res);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async (dispatch) => {
  // console.log("hi i am in ");
  console.log(token);
  // const pi = await axios.post("/api/pi");
  // console.log(pi);
  // const res = await axios.post("/api/conform");
  const res = await axios.post("/api/stripe", token);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, navigate) => async (dispatch) => {
  console.log("hi in sub");
  navigate("/surveys");
  const res = await axios.post("/api/surveys", values);

  console.log(navigate);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async (dispatch) => {
  const res = await axios.get("/api/surveys");
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
