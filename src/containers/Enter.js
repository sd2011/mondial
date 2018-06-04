import React from "react";
import Sign from './Sign';
import Log from './Log';
import './css/enter.css';

const Enter = props => {

return(
  <div className="sign">
    <Sign history={props.history.push}  />
    <Log />
  </div>
)
}

export default Enter;
