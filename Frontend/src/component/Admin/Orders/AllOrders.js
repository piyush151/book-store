// import React, {Component} from 'react';
// import {  AgGridReact } from 'ag-grid-react';

// import  { Redirect, Link } from 'react-router-dom';
// import 'ag-grid-enterprise';
// import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';
// //import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';

// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

// import ButtonRenderer from './ButtonRenderer.jsx' 


// class AllOrders extends Component
// {

//     constructor(props){
//         super(props);
//         const token= localStorage.getItem("token")
//         const email= localStorage.getItem("email")
//         let loggedIn=true;
//         let adminloggedIn=true;
        
//         if(token==null ||email==null ){
//         loggedIn=false
//         }
//         if(email!='admin@gmail.com'){
//         adminloggedIn=false
//         }

//          this.state={
//             orders:[],
//             modules: [InfiniteRowModelModule],
//             loggedIn,
//             adminloggedIn,
//             columnDefs:[
//                     {
//                         headerName:"User Name",
//                         field:"name",
//                     },
//                     {
//                         headerName:"Email",
//                         field:"email",
//                     },
//                     {
//                         headerName:"Address",
//                         field:"address",
//                     },
//                     {
//                         headerName:"Books",
//                         field:"books", 
//                         minWidth:350                      
//                     },
//                     {
//                         headerName:"Quantity",
//                         field:"quantity",                       
//                     },
//                     {
//                         headerName:"Total Amount",
//                         field:"total",
//                     },
//                     {
//                         headerName: "Action",
//                         field: "_id.$oid",
//                         cellRenderer: "buttonRenderer",
//                         cellRendererParams: {
                          
//                           clicked: (field)=>{  
//                             this.delete(field);
//                             //this.getData();  
//                            },
                          
//                           }
//                         }
//              ],
//              defaultColDef: {         
//                 minWidth:250,  
//                 //filter:true,
//                //sortable:true,             
//               },
              
//               rowSelection: 'multiple',
//               rowModelType: 'infinite',
//               paginationPageSize: 8,
//               cacheOverflowSize: 2,
//               maxConcurrentDatasourceRequests: 1,
//               infiniteInitialRowCount: 100,
//               maxBlocksInCache: 5,
//               frameworkComponents: {
//                 buttonRenderer: ButtonRenderer,
//                 },
              
//          }
//     }
//     onGridReady = (params) => {
//         this.gridApi = params.api;
//         this.gridColumnApi = params.columnApi;
    
//         const httpRequest = new XMLHttpRequest();
//         const updateData = (data) => {
//           var dataSource = {
//             rowCount: null,
//             getRows: function (params) {
//               console.log('asking for ' + params.startRow + ' to ' + params.endRow);
//               setTimeout(function () {
//                 var rowsThisPage = data.slice(params.startRow, params.endRow);
//                 var lastRow = -1;
//                 if (data.length <= params.endRow) {
//                   lastRow = data.length;
//                 }
//                 params.successCallback(rowsThisPage, lastRow);
//               }, 500);
//             },
//           };
//           params.api.setDatasource(dataSource);
//         };
    
//         httpRequest.open(
//           'GET',
//           'http://localhost:8000/all-orders'
//         );
//         httpRequest.send();
//         httpRequest.onreadystatechange = () => {
//           if (httpRequest.readyState === 4 && httpRequest.status === 200) {
//             updateData(JSON.parse(httpRequest.responseText));
//           }
//         };
//       };
//     /*onGridReady=(params)=>{
//          console.log(params);
//         console.log(params.api);
//         this.serverData();
    
//         this.gridApi = params.api;
//         this.gridColumnApi = params.columnApi;
        
//         // var data = {
            
//         //     getRows: (params) => {
//         //         console.log("caaled")
//         //         //rowCount=null,
//         //       console.log(params.request)
//         //       console.log(params.startRow)
//         //       console.log(params.endRow)
//         //     // var blockSize=params.request.endRow - params.request.startRow;
//         //         //setTimeout(()=>{
//         //         const data={
//         //           startRow:0,
//         //           endRow: 5,
//         //         }
              
//         //       fetch("http://localhost:8000/all-orders", {
//         //         method: "POST",
//         //         headers: { 
//         //          'Authorization':'bearer ' +localStorage.getItem('token'),
//         //          "Content-Type": "application/json" 
//         //          },
//         //         body: JSON.stringify(data),
//         //       }).then((response) => response.json())
                
//         //       .then(  list => {
//         //           params.successCallback(list, this.getLastRowIndex(params, list));
//         //         }); 
//         //     //},500)
                
//         //   }, 
//         //   }
//         //  params.api.setDatasource(data);   

//        }*/
    
    
    
//     serverData=()=>{
//         var data = {
            
//             getRows: (params) => {
//                 console.log("caaled")
//                 //rowCount=null,
//               console.log(params.request)
//               console.log(params.startRow)
//               console.log(params.endRow)
//             // var blockSize=params.request.endRow - params.request.startRow;
//                 //setTimeout(()=>{
//                 const data={
//                   startRow:0,
//                   endRow: 5,
//                 }
              
//               fetch("http://localhost:8000/all-orders", {
//                 method: "POST",
//                 headers: { 
//                  'Authorization':'bearer ' +localStorage.getItem('token'),
//                  "Content-Type": "application/json" 
//                  },
//                 body: JSON.stringify(data),
//               }).then((response) => response.json())
                
//               .then(  list => {
//                   params.successCallback(list, this.getLastRowIndex(params, list));
//                 }); 
//             //},500)
                
//           }, 
//           }
//          this.gridApi.setDatasource(data);   

    
//     }
    
    
    
    
//      getLastRowIndex=(params, list)=>{
    
//         if (list.length <= params.endRow) {
//           return  lastRow = list.length;
//           }
//           return lastRow=-1
//         //   if (!list || list.length === 0) {
//         //     return param.request.startRow;
//         //   }
          
//         //   var currentLastRow = param.request.startRow + list.length;
      
//         //   return currentLastRow <= param.request.endRow ? currentLastRow : -1;
        
//       }
    

//    delete=(id)=>{
//     fetch(`http://localhost:8000/delete-order/${id}`,{
//         method: 'DELETE',
//         headers: {
//           'Authorization':'bearer ' +localStorage.getItem('token') 
//          },    
        
//       })
//       .then(response=>{
//           response.json();    
//          })
//        .then(data=>{
//          console.log(data)
//        })
//        this.getData();
//    }
//     // componentDidMount(){
//     //     fetch("http://localhost:8000/all-orders",{
//     //         method:"GET",
//     //         headers:{
//     //             'Authorization':'bearer ' +localStorage.getItem('token') 
//     //         }
//     //     }).then(res=>res.json())
//     //     .then(data=>{
//     //          console.log(data)
//     //         this.setState({
//     //             orders:data
//     //         })
//     //     })
//     // }
    
//     // getData=()=>{
//     //     fetch("http://localhost:8000/all-orders",{
//     //         method:"GET",
//     //         headers:{
//     //             'Authorization':'bearer ' +localStorage.getItem('token') 
//     //         }
//     //     }).then(res=>res.json())
//     //     .then(data=>{
//     //          console.log(data)
//     //         this.setState({
//     //             orders:data
//     //         })
//     //     })
//     // }

//     render(){
//         if(this.state.loggedIn===false){
//             return<Redirect to="/"/>
//           }
//           if(this.state.adminloggedIn===false){
//             return<Redirect to="/user"/>
//           }
//         return (
//             <div>
//                 <header className="head-sec">
//                     <h2 className="app-name">Book Store</h2>
//                     <h3>Welcome Admin</h3>  
//                 </header>

//         <div  className="sidebar-main">
//             <Link to='/admin' className="side-links">Home</Link>
//             <Link to='/books'className="side-links" >Manage Book</Link>
            
//             <Link to='/categories'className="side-links" >Manage Category</Link>
//             <Link to="/logout"className="side-links">Log out</Link>
//         </div>
//         <div className="main-category">
//                 <h1 className="head-category">All Orders</h1>
                     
//                 <div className="ag-theme-alpine " style={{marginLeft:20 , height:300, width:'90%' }}>
//                 <AgGridReact
//             modules={this.state.modules}
//             columnDefs={this.state.columnDefs}
//             defaultColDef={this.state.defaultColDef}
//             components={this.state.components}
//             rowBuffer={this.state.rowBuffer}
//             rowSelection={this.state.rowSelection}
//             rowModelType={this.state.rowModelType}
//             paginationPageSize={this.state.paginationPageSize}
//             cacheOverflowSize={this.state.cacheOverflowSize}
//             maxConcurrentDatasourceRequests={
//               this.state.maxConcurrentDatasourceRequests
//             }
//             infiniteInitialRowCount={this.state.infiniteInitialRowCount}
//             maxBlocksInCache={this.state.maxBlocksInCache}
//             onGridReady={this.onGridReady}
//           />
                       
//                         {/* <AgGridReact
//                             columnDefs={this.state.columnDefs}
//                             rowData={this.state.orders}
//                             frameworkComponents={this.state.frameworkComponents}
//                             paginationAutoPageSize={true} 
//                             pagination={true}  
//                             defaultColDef={this.state.defaultColDef}         
//                             >          
//                         </AgGridReact>                */}
//                 </div>
//            </div> 
//         </div>
//         );
//     }
// }
// export default AllOrders;





import React, {Component} from 'react';
import {  AgGridReact } from 'ag-grid-react';

import  { Redirect, Link } from 'react-router-dom';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import ButtonRenderer from './ButtonRenderer.jsx' 


class AllOrders extends Component
{

    constructor(props){
        super(props);
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
            orders:[],
            loggedIn,
            adminloggedIn,
            columnDefs:[
                    {
                        headerName:"User Name",
                        field:"name",
                    },
                    {
                        headerName:"Email",
                        field:"email",
                    },
                    {
                        headerName:"Address",
                        field:"address",
                    },
                    {
                        headerName:"Books",
                        field:"books", 
                        minWidth:350                      
                    },
                    {
                        headerName:"Quantity",
                        field:"quantity",                       
                    },
                    {
                        headerName:"Total Amount",
                        field:"total",
                    },
                    {
                        headerName: "Action",
                        field: "_id.$oid",
                        cellRenderer: "buttonRenderer",
                        cellRendererParams: {
                          
                          clicked: (field)=>{  
                            this.delete(field);
                            //this.getData();  
                           },
                          
                          }
                        }
             ],
             defaultColDef: {         
            //minWidth:250,  
               filter:true,
               sortable:true,             
              },
              frameworkComponents: {
                buttonRenderer: ButtonRenderer,
                },
              
         }
    }

   delete=(id)=>{
    fetch(`http://localhost:8000/delete-order/${id}`,{
        method: 'DELETE',
        headers: {
          'Authorization':'bearer ' +localStorage.getItem('token') 
         },    
        
      })
      .then(response=>{
          response.json();    
         })
       .then(data=>{
         console.log(data)
       })
       this.getData();
   }
    componentDidMount(){
        fetch("http://localhost:8000/all-orders",{
            method:"GET",
            headers:{
                'Authorization':'bearer ' +localStorage.getItem('token') 
            }
        }).then(res=>res.json())
        .then(data=>{
             console.log(data)
            this.setState({
                orders:data
            })
        })
    }
    
    getData=()=>{
        fetch("http://localhost:8000/all-orders",{
            method:"GET",
            headers:{
                'Authorization':'bearer ' +localStorage.getItem('token') 
            }
        }).then(res=>res.json())
        .then(data=>{
             console.log(data)
            this.setState({
                orders:data
            })
        })
    }

    render(){
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

        <div  className="sidebar-main">
            <Link to='/admin' className="side-links">Home</Link>
            <Link to='/books'className="side-links" >Manage Book</Link>
            
            <Link to='/categories'className="side-links" >Manage Category</Link>
            <Link to="/logout"className="side-links">Log out</Link>
        </div>
        <div className="main-category">
                <h1 className="head-category">All Orders</h1>
                     
                <div className="ag-theme-alpine " style={{marginLeft:20 , height:300, width:'90%' }}>
                        <AgGridReact
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.orders}
                            frameworkComponents={this.state.frameworkComponents}
                            paginationAutoPageSize={true} 
                            pagination={true}  
                            defaultColDef={this.state.defaultColDef}         
                            >          
                        </AgGridReact>               
                </div>
           </div> 
        </div>
        );
    }
}
export default AllOrders;
