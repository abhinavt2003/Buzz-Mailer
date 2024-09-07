import React from "react";

import { Link } from "react-router-dom";
import SurveyList from "./SurveyList";
const Dashbord = () => {
  return (
    <div>
      <SurveyList />
      <div class='fixed-action-btn'>
        <Link to='/surveys/new' className='btn-floating btn-large black'>
          <i className='large material-icons'>add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashbord;
