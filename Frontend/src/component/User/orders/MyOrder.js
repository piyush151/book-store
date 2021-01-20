import React, {Component} from 'react';
import {  AgGridReact } from 'ag-grid-react';
import  './MyOrder.css';
import  { Redirect, Link } from 'react-router-dom';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Button from './Button.jsx';
import Booklist from './Booklist';

class MyOrder extends Component
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
            showMore:false,
            orderedListNo:null,
            columnDefs:[
                    {
                        headerName:"Order Number",
                        field:"orderNumber",
                        
                    },
                    {
                        headerName:"Date",
                        field:"date",
                        
                    },
                    {
                        headerName:"Total Amount",
                        field:"total",
                        
                    },
                    {
                        headerName: "Action",
                        field: "orderNumber",
                        cellRenderer: "viewBtn",
                        
                        cellRendererParams: {
                          
                          clicked: (field)=>{  
                             this.test(field)

                          }
                        }
                    }
                ],
             defaultColDef: {
               flex: 1,
               maxWidth: 350,
               filter:true,
               sortable:true,
               cellStyle: { border: "none" }             
              },
                rowModelType: 'serverSide',
                paginationPageSize: 5,
                cacheBlockSize: 5,
              frameworkComponents: {
                viewBtn: Button,
              },
         }
    }

    onGridReady=(params)=>{
        console.log(params);
        console.log(params.api);
        
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        console.log(this.state.gridApi);
        
        console.log(this.gridColumnApi);
        this.serverData();
    
       }
    
    
    
    serverData=()=>{
    
      var data = {
          
        getRows: (params) => {
            //let lastRow=-1;
          console.log(params.request)
          console.log(params.request.startRow + " to " + params.request.endRow);

         var blockSize=params.request.endRow - params.request.startRow;
            
            const data={
            email:localStorage.getItem('email'),
              skip: params.request.startRow,
              limit: blockSize + 1,
              sortval:params.request.sortModel,
              //filterval:params.request.filterModel
            }
          
          fetch("http://localhost:8000/my-orders", {
            method: "POST",
            headers: { 
             'Authorization':'bearer ' +localStorage.getItem('token'),
             "Content-Type": "application/json" 
             },
            body: JSON.stringify(data),
          }).then((response) => response.json())
            
          .then(  list => {
              params.successCallback(list, this.getLastRowIndex(params, list));
            });
        },
      }
      this.gridApi.setServerSideDatasource(data);
    
    }
    
    
    
    
     getLastRowIndex=(param, list)=>{
        
          if (!list || list.length === 0) {
            return param.request.startRow;
          }
          
          var currentLastRow = param.request.startRow + list.length;
      
          return currentLastRow <= param.request.endRow ? currentLastRow : -1;
        
      }
    
  

    test=(orderNo)=>{
        alert(orderNo);
        this.setState({
            orderedListNo:orderNo,
            showMore:true
        })
    }

    // componentDidMount(){
    //     fetch(`http://localhost:8000/my-orders?email=${localStorage.getItem('email')}`,{
    //         method:"GET",
    //         headers: {
    //             'Authorization':'bearer ' +localStorage.getItem('token') 
    //            },    
    //     }).then(res=>res.json())
    //     .then(data=>{
    //          console.log(data)
    //         this.setState({
    //             orders:data
    //         })
    //     })
    // }
    

    render(){
        if(this.state.loggedIn==false){
            return <Redirect to="/"/>
          }
          if(localStorage.getItem('email')==='admin@gmail.com'){
            return <Redirect to="/admin"/>
          }

          
        return (
         <div>
            {(this.state.showMore)&& <Booklist
            orderNum={this.state.orderedListNo} 
            showClose={()=>this.setState({showMore:false})}/> }

        <div  className="sidebar-main">
            <h2 className="title-head">Book Store</h2>
            <Link to="/user"className="side-links">Book Store</Link>
            <Link to="/logout"className="side-links">Log out</Link>
        </div>
        <div className="main-order">
                <h1>My Orders</h1>
                <div className="ag-theme-alpine myorder-grid" style={{ height:400, width: 1000 }}>
                        <AgGridReact
                            columnDefs={this.state.columnDefs}
                         //   rowData={this.state.orders}
                            paginationPageSize={this.state.paginationPageSize} 
                            pagination={true}  
                            defaultColDef={this.state.defaultColDef}     
                            frameworkComponents={this.state.frameworkComponents} 
                            rowModelType={this.state.rowModelType}  
                            cacheBlockSize={this.state.cacheBlockSize}
                            animateRows={true}
                            onGridReady={this.onGridReady} 
                            >          
                        </AgGridReact>               
                </div>
           </div> 
        </div>
        );
    }
}
export default MyOrder;


/*
import React, {Component} from 'react';
import {  AgGridReact } from 'ag-grid-react';
import  './MyOrder.css';
import  { Redirect, Link } from 'react-router-dom';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Button from './Button.jsx';
import Booklist from './Booklist';

class MyOrder extends Component
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
            showMore:false,
            orderedListNo:null,
            columnDefs:[
                    {
                        headerName:"Order Number",
                        field:"orderNumber",
                        
                    },
                    {
                        headerName:"Date",
                        field:"date",
                        
                    },
                    {
                        headerName:"Total Amount",
                        field:"total",
                        
                    },
                    {
                        headerName: "Action",
                        field: "orderNumber",
                        cellRenderer: "viewBtn",
                        
                        cellRendererParams: {
                          
                          clicked: (field)=>{  
                             this.test(field)

                          }
                        }
                    }
                ],
             defaultColDef: {
               flex: 1,
               maxWidth: 350,
               filter:true,
               sortable:true,
               cellStyle: { border: "none" }             
              },
                // rowModelType: 'serverSide',
                // paginationPageSize: 5,
                // cacheBlockSize: 5,
              frameworkComponents: {
                viewBtn: Button,
              },
         }
    }

  

    test=(orderNo)=>{
        console.log(orderNo);
        this.setState({
            orderedListNo:orderNo,
            showMore:true
        })
    }

    componentDidMount(){
        fetch(`http://localhost:8000/my-orders?email=${localStorage.getItem('email')}`,{
            method:"GET",
            headers: {
                'Authorization':'bearer ' +localStorage.getItem('token') 
               },    
        }).then(res=>res.json())
        .then(data=>{
             console.log(data)
            this.setState({
                orders:data
            })
        })
    }
    

    render(){
        if(this.state.loggedIn==false){
            return <Redirect to="/"/>
          }
          if(localStorage.getItem('email')==='admin@gmail.com'){
            return <Redirect to="/admin"/>
          }

          
        return (
         <div>
            {(this.state.showMore)&& <Booklist
            orderNum={this.state.orderedListNo} 
            showClose={()=>this.setState({showMore:false})}/> }

        <div  className="sidebar-main">
            <h2 className="title-head">Book Store</h2>
            <Link to="/user"className="side-links">Book Store</Link>
            <Link to="/logout"className="side-links">Log out</Link>
        </div>
        <div className="main-order">
                <h1>My Orders</h1>
                <div className="ag-theme-alpine myorder-grid" style={{ height:400, width: 1000 }}>
                        <AgGridReact
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.orders}
                            paginationAutoPageSize={true} 
                            pagination={true}  
                            defaultColDef={this.state.defaultColDef}     
                            frameworkComponents={this.state.frameworkComponents} 
                            //rowModelType={this.state.rowModelType}   
                            >          
                        </AgGridReact>               
                </div>
           </div> 
        </div>
        );
    }
}
export default MyOrder;
*/