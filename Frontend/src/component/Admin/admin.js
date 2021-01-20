import React, { Component } from "react";
import  { Redirect, Link } from 'react-router-dom';
import './admin.css';
class Admin extends Component {

  constructor(props){
    super(props)
    const token= localStorage.getItem("token")
    const email= localStorage.getItem("email")
    let loggedIn=true;
    let adminloggedIn=true;
    
    if(token==null ||email==null ){
      loggedIn=false
    }
    if(email!='admin@gmail.com'){
      adminloggedIn=false
    }

    this.state={
      loggedIn,
      adminloggedIn,
    }
   }

      
  render() {
    if(this.state.loggedIn===false){
      return<Redirect to="/"/>
    }
    if(this.state.adminloggedIn===false){
      return<Redirect to="/user"/>
    }
    return (
        <div>
          <header className="head-sec">
                    <h2 className="app-name">Book Store</h2>
                    <h3>Welcome Admin</h3>  
                </header>       
        <div   className="sidebar-main">
            {/* <Link  to='/categories?cat=abc'   className="side-links">Manage Category</Link> */}
            <Link  to='/categories'   className="side-links">Manage Category</Link>
            <Link to='/books'className="side-links" >Manage Book</Link>
            <Link to='/allorders'className="side-links" >All Orders</Link>
            <Link to="/logout"className="side-links">Log out</Link>
        
        </div>
      
      
      </div>
    );
  }
}
export default Admin;
 