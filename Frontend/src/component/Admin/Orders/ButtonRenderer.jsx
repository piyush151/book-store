
  import React, { Component } from 'react';
  import DeleteIcon from '@material-ui/icons/Delete';
  class ButtonRenderer extends Component {
     
  
    
      deleteData=()=>{
        this.props.clicked(this.props.value);
       }
       
       
       
      render() {
         
        return (
          
          <div>
          <span id="delete" onClick={()=>this.deleteData()} style={{cursor: "pointer"}}><DeleteIcon/></span>
          </div>        
          )
      }
    }
    export default ButtonRenderer;
    
