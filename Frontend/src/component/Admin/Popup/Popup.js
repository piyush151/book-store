
import React from "react";
import "./Popup.css"
const Popup = props => {
  return (
    <div className="popup-box ">
      <div>
                                         
        {props.children}
      </div>
    </div>
  );
};
 
export default Popup;