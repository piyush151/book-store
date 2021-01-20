
  import React, { Component } from 'react';
  class Button extends Component {
     
  
    
       
       Data=()=>{
        this.props.clicked(this.props.value);
      }
       
      render() {
         
        return (
          
          <div>
              <button onClick={()=>this.Data()}style={{cursor: "pointer"}}> View</button> 
          </div>        
          )
      }
    }
    export default Button;
    
