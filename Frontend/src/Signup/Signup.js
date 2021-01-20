import React, { Component } from "react";
import  { Link } from 'react-router-dom';
import validator from 'validator';
 import './Signup.css';
class Signup extends Component {
  // constructor(){
  //   super();
    
  //   this.sf=React.createRef();
  // }

    state={       
      name:"",
      email:"",
      password:"",
      address:"",
      success:false,
      err:"",
      passwordError:"",
      emailError:"",
      addressError:"",
      usernameError:"",
     
    }
    nameHandler=(e)=>{
      this.setState({
        name:e.target.value
      })
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
    addressHandler=(e)=>{
      this.setState({
        address:e.target.value
      })
    }

    addHandler=(e)=>{
      e.preventDefault();
      if(this.state.name==""){
        this.setState({usernameError:"Please Fill"})
      }
      else if(!validator.isEmail(this.state.email)){
        this.setState({emailError:"Email is Invalid"})

      }else if(this.state.password==""){
        this.setState({passwordError:"Please Fill"})
      
      }else if(this.state.password.length<6){
        this.setState({passwordError:"Passwrd Length will be atlest 6"})
        
      }else if(this.state.address==""){
        this.setState({addressError:"Please Fill"})
      }
      else{      
      const data = {
        name: this.state.name,
        email: this.state.email,
       password:this.state.password,
       address:this.state.address
      
      }
  
      fetch("http://localhost:8000/register",{
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response=> response.json()    
      )
       .then(response=>{  
         console.log(response.email)
         this.setState({
          err:response.email[0]
        })
        
    });
    
    this.setState({success:true})
  }

      
    }

    componentDidMount(){
      
      this.sf.focus();
    }

  render() {
      console.log(this.state.err)
      if(this.state.err!==""){
        return<h2>{ this.state.err}</h2>
      }
    return (
      <div >
       { (this.state.success)?
          <div>
          <h2>Resgistered Successfully!!</h2>
          <Link to="/" id="login-link-aft">Log In</Link>
          </div>
       :<div>
       <div className="signup">
        <h2 className="signup-title">Signup</h2>
       <h3 id="error">{ this.state.msg}</h3>
        <form onSubmit={this.addHandler}>

              <label className="signup-label"><b>User Name </b>  </label>
                <br/>                 
                  <input type="text" name='name' className="signup-input"
                  placeholder="Enter Name"
                  value={this.state.name}
                  onChange={this.nameHandler} 

                 />
                  <br/>
                  {(this.state.usernameError !=="" ) &&
                      <label className="error">{this.state.usernameError}</label>}
                  <br/><br/>
                 
                <label className="signup-label"><b>Email </b>  </label>
                <br/>
                  <input type="text" name='email' className="signup-input"
                  placeholder="Enter Email"
                  value={this.state.email}
                  onChange={this.emailHandler}
                  
                  /><br/>
                  {(this.state.emailError !=="" ) &&
                      <label className="error">{this.state.emailError}</label>}
               <br/><br/>
               <label className="signup-label"><b>Password </b>  </label>
                <br/>
                  <input type="password" name='password' className="signup-input"
                  placeholder="Enter password"
                    value={this.state.password}
                    onChange={this.passwordHandler}
                    
                 /><br/>
                 {(this.state.passwordError !=="" ) &&
                      <label className="error">{this.state.passwordError}</label>}
                <br/><br/>
                <label className="signup-label"><b>Address </b>  </label>
                <br/>
                  <textarea name='address' 
                  className="signup-textarea"
                  placeholder="Enter Address"
                  value={this.state.address}
                  onChange={this.addressHandler}

                  /><br/>
                  {(this.state.addressError !=="" ) &&
                      <label className="error">{this.state.addressError}</label>}
               <br/><br/>
                
                <button type="submit" id="signup-button" >
                    Sign Up  
                </button>
                <br/><br/>
        </form>
        Already resgistered ?
              <Link to="/" id="login-link">Log In</Link>
        </div>
          </div>
          }
      </div>
    );
  }
}
export default Signup;
 