import React, { Component } from "react";
import SurveyNew from "./SurveyNew";
import { useNavigate } from "react-router";
const SurveyNewcomp = () => {
  let navigate = useNavigate();
  return <SurveyNew navigate={navigate} />;
};
export default SurveyNewcomp;
