import React, { Component } from "react";

import { Route,  Switch } from 'react-router-dom';

import Category from './component/Admin/Category';
import Books from './component/Admin/Books/Books';
import User from './component/User/User';
import Admin from './component/Admin/admin';
import MyOrders from './component/User/orders/MyOrder';
import AllOrders from './component/Admin/orders/AllOrders';
import Signup from './Signup/Signup';
import Login from "./Login/Login";
import Logout from "./logout";
class Links extends Component {
  

        
  render() {
       
    
   return ( 
   <div >
                     
    <Switch> 
        <Route exact path="/" component={Login}  /> 
        <Route path='/admin'   component={Admin}/>
        <Route path='/categories' component={Category} />  
        <Route path='/books' component={Books} />  
        <Route path='/user' component={User} />
        <Route path='/myorders' component={MyOrders} />
        <Route path='/allorders' component={AllOrders} />
        <Route path="/signup" component={Signup} /> 
        <Route path='/logout'   component={Logout}/> 
              
    </Switch>
        
    </div>
     );
    }
}
export default Links;
 