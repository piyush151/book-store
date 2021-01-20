import React, { Component } from "react";
import  { Redirect, Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";

import './Login.css';

class Login extends Component {
  
  constructor(props){
    super(props)
    const token= localStorage.getItem("token")  
    let loggedIn=true
    
    
    if(token==null ){
      loggedIn=false
    }
    
    
    this.state={
      email:"",
      password:"",
      loggedIn,
      adminloggedIn:false,
       retoken:"",
      err:"",
      localemail:"",
      errEmail:"",
      errPassword:""
    }

  }
    
          emailHandler=(e)=>{
            this.setState({
              email:e.target.value
            })
          } 
          passwordHandler=(e)=>{
            this.setState({
              password:e.target.value
            })
          }
          handleBlurEmail=(e)=>{
           var email=e.target.value;
           var errEmail="";
           if(!email){
            errEmail="Required Field"
           } 
           this.setState({errEmail:errEmail})
          }

          handleBlurPassword=(e)=>{
            let password=e.target.value;

            (!password)?
            this.setState({errPassword:"Required Field"}):this.setState({errPassword:""})
          }
        
    loginHandler=(e)=>{
            e.preventDefault();
        if(this.state.email!=="" && this.state.password!==""){
            const data = {
              email: this.state.email,
             password:this.state.password,
            
          }
       fetch("http://localhost:8000/login",{
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response=> response.json()    
         )
         .then(res=> {
          return (
            
            this.setState({
              err:res.message
            })
            ,       
            (res.token!==undefined)&&(localStorage.setItem('token',res.token)),
            localStorage.setItem('email',jwt_decode(res.token).email),
            localStorage.setItem('name',jwt_decode(res.token).name),
            localStorage.setItem('address',jwt_decode(res.token).address),
           

            
              (localStorage.getItem('email')=='admin@gmail.com')?
              (this.setState({
                adminloggedIn:true,
              }))
              :(this.setState({
                loggedIn:true,
              }))
           
           )
        }   
         )
      }else{
        (!this.state.email)&&this.setState({errEmail:"Required Field" })

        (!this.state.password)&& this.setState({ errPassword:"Required Field"})
      }                                  
    }
    
   
  render() {
    
   if( this.state.adminloggedIn ){
      return <Redirect to="/admin"/>
    }

   if(this.state.loggedIn){
      return <Redirect to="/user"/>
    }
    
    return (
     <div className="container" >

        <div className="login">
        <h2 className="login-title">Login</h2>
        {(this.state.err==="Unauthorized")?<h3 style={{color:"#BB1A0A"}}>Email or password is invalid</h3>:null}
        
        <form onSubmit={this.loginHandler}>
              <label className="login-label">Email</label>
                <br/>
                  <input type="text" name='email' id="email"
                  placeholder=" Please Enter Email"
                  value={this.state.email}
                  onChange={this.emailHandler}
                  onBlur={this.handleBlurEmail}
                  
                  /><br/>
                  <span style={{marginLeft:30}}>{this.state.errEmail}</span>
                <br/><br/>
                    
                  <label className="login-label">Password</label>
                   <br/>
                <input type="password" name='password' id="password" 
                     placeholder=" Please Enter Email"
                    value={this.state.password}
                    onChange={this.passwordHandler}
                    onBlur={this.handleBlurPassword}
                    
                 /><br/>
                  <span style={{marginLeft:30}}>{this.state.errPassword}</span>
                  <br/><br/>
                  
                  <button type="submit" id="login-button" >
                    Log In  
                  </button>
                    <br/><br/>
                  
           </form>
                  <p style={{display:"inline", marginLeft:"33px"}}>Not resgistered ?</p>
                  <Link to="/signup" id="signup-link" style={{display:"inline"}}>Sign Up</Link>
         
        </div>           
      </div>    
    );
 
  }
}
export default Login;
 
