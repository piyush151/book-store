import React, { Component } from "react";
import  { Redirect } from 'react-router-dom';
class Profile extends Component {

  constructor(props){
    super(props)
    
  const token= localStorage.getItem("token")
   
  fetch("http://localhost:8000/logout",{
     method: 'GET',
     headers: {
       'Authorization': 'bearer '+localStorage.getItem('token')
     },    
   })
   .then(res=> res.json())
    .then(data=>{
      console.log(data);

     }); 
     localStorage.removeItem('token')
     localStorage.removeItem('email')
     localStorage.removeItem('name')
     localStorage.removeItem('address')
    
  }
    
  render() {
    return (
      <div> 
      <Redirect to="/"/>
      </div>
    );
  }
}
export default Profile;
 