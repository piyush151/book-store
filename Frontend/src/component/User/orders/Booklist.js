import React, {Component} from 'react';
import {  AgGridReact } from 'ag-grid-react';

import  { Redirect, Link } from 'react-router-dom';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
//import Button from './Button.jsx'
import Popup from '../../Admin/Popup/Popup'

class Booklist extends Component
{

    constructor(props){
         super(props);
         const token= localStorage.getItem("token")
        let loggedIn=true
        if(token===null){
        loggedIn=false
        }
        
         this.state={
            loggedIn,
            orders:[],
            columnDefs:[
                    {
                        headerName:"Books",
                        field:"book",
                        cellRendererParams: {
                            clicked: (field)=>{  
                                console.log(field);
                            }
                        }
                    },
                    {
                        headerName:"Quantity",
                        field:"quantity",
                        
                    },
                    
                   
                ],
             defaultColDef: {
               flex: 1,
               maxWidth: 350,
               filter:true,
               sortable:true,
               cellStyle: { border: "none" }             
              },
              
         }
    }

  

    
     

    componentDidMount(){
        fetch(`http://localhost:8000/my-orders-bklist?email=${localStorage.getItem('email')}`,{
            method:"GET",
            headers: {
                'Authorization':'bearer ' +localStorage.getItem('token') 
               },    
        }).then(res=>res.json())
        .then(data=>{
            let temp=[];  
        const v1= data.filter(lis=>lis.orderNumber==this.props.orderNum)[0].books
        const v2= data.filter(lis=>lis.orderNumber==this.props.orderNum)[0].quantity
        for(let i=0; i<v1.length; i++){
            temp.push({book:v1[i], quantity:v2[i]})
        }
        console.log(temp)
            this.setState({
                orders:[...temp]
            })
        })
    }
    

    render(){

       
        
        console.log(this.state.orders)
        if(this.state.loggedIn==false){
            return <Redirect to="/"/>
          }
          if(localStorage.getItem('email')==='admin@gmail.com'){
            return <Redirect to="/admin"/>
          }
        return (
            <div>
                
                <Popup>
                <button onClick={this.props.showClose}>Close</button>
                <div className="ag-theme-alpine myorder-grid" style={{ height:400, width: 1000 }}>
                        <AgGridReact
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.orders}
                            paginationAutoPageSize={true} 
                            pagination={true}  
                            defaultColDef={this.state.defaultColDef}     
                            >          
                        </AgGridReact>               
                </div>
                </Popup>
           </div> 
   
        );
    }
}
export default Booklist;