
  import React, { Component } from 'react';
  import DeleteIcon from '@material-ui/icons/Delete';
  import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
  class ButtonRenderer extends Component {
     
  
    
      deleteData=()=>{
        this.props.clicked(this.props.value);
       }
       
       editData=()=>{
        this.props.edClicked(this.props.value);
      }
       
      render() {
         
        return (
          
          <div>
          <span id="delete" onClick={()=>this.deleteData()} style={{cursor: "pointer"}}><DeleteIcon/></span>
          <span onClick={()=>this.editData()} style={{cursor: "pointer"}}><EditTwoToneIcon/></span>  
          </div>        
          )
      }
    }
    export default ButtonRenderer;
    
