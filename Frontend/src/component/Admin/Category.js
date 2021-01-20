import React, {Component} from 'react';
import {  AgGridReact } from 'ag-grid-react';
import './Category.css'
import  { Redirect, Link } from 'react-router-dom';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.min.css';


import ButtonRenderer from './ButtonRenderer.jsx' 
import Popup from './Popup/Popup';


class Category extends Component
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
            categories:[],
            edcategoryId:"",
            category:"",
            editCategory:"",
            showAdd:false,
            showEdit:false,
            errMsg:"",
            errAddMsg:"",
            loggedIn,
            adminloggedIn,
            columnDefs:[
                    {
                        headerName:"Category",
                        field:"category",
                        
                    },
                    {
                        headerName: "Action",
                        field: "_id.$oid",
                        cellRenderer: "buttonRenderer",
                        cellStyle: { border: "none" },
                        cellRendererParams: {
                          
                          clicked: (field)=>{  
                            this.delete(field);
                            this.getData();  
                           },
                          
                           edClicked:(field)=>{
                               this.setEdit(field)
                           }
            
                          }
                        }
             ],
             defaultColDef: {
            //  minWidth:200,
                flex:1,
               filter:true,
               sortable:true,             
              },
              frameworkComponents: {
                buttonRenderer: ButtonRenderer,
                },
         }
    }

    categoryHandler=(e)=>{
        this.setState({
            category:e.target.value
        })   
    }
    handleBlurCategory=(e)=>{
        var category=e.target.value;
           var errAddMsg="";
           if(!category){
            errAddMsg="Please Fill"
           } 
           this.setState({errAddMsg:errAddMsg})
    }
    handleBlurEdCategory=(e)=>{
        var category=e.target.value;
           var errMsg="";
           if(!category){
            errMsg="Please Fill"
           } 
           this.setState({errMsg:errMsg})
    }

    editCategoryHandler=(e)=>{
        this.setState({
            editCategory:e.target.value
        })   
    }
    setEdit=(id)=>{
        let cat=this.state.categories.filter(lis=>lis._id.$oid===id)
        console.log(cat[0].category);
        this.setState({
            edcategoryId:id,
            showEdit:true,
            editCategory:cat[0].category
        })
    }
    editCategory=(e)=>{
        e.preventDefault();
        console.log(this.state.edcategoryId)
        if(this.state.editCategory!=="" && this.state.editCategory!==""){
       let data={
            id:this.state.edcategoryId,
            category:this.state.editCategory
        }
        console.log(data);
        fetch('http://localhost:8000/edit-category',{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
                'Authorization':'bearer ' +localStorage.getItem('token') 
            },
            body:JSON.stringify(data)
        }).then( res=>{ console.log(res)})
        
        fetch('http://localhost:8000/edit-catbooks',{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
                'Authorization':'bearer ' +localStorage.getItem('token') 
            },
            body:JSON.stringify(data)
        }).then( res=>{ console.log(res)})
        
        this.setState({
            editCategory:"",
            showEdit:false
        })

        store.addNotification({
            title: 'Success',
            message: 'Category Updated',
            type: 'success',                       
            container: 'top-right',                
            animationIn: ["animate__animated animate__fadeIn"], 
            animationOut: ["animate__animated animate__fadeOut"], 
            dismiss: {
              duration: 3000
            }
          })

        this.getData();
        }
    }

    addCategory=(e)=>{
        e.preventDefault();
        console.log(this.state.category);
        if(this.state.category!==""){
        fetch('http://localhost:8000/add-category',{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                'Authorization':'bearer ' +localStorage.getItem('token') 
                   
            },
            body:JSON.stringify({category:this.state.category})
        }).then(response=> response.json())
        .then( res=>{this.setState({categories:res})})
       
        
        this.setState({
            category:"",
            showAdd:false
        })
        store.addNotification({
            title: 'Success',
            message: 'Category Added',
            type: 'success',                       
            container: 'top-right',                
            animationIn: ["animate__animated animate__fadeIn"], 
            animationOut: ["animate__animated animate__fadeOut"], 
            dismiss: {
              duration: 3000
            }
          })

       // this.getData();
        }
    }


    getData=()=>{
        fetch("http://localhost:8000/show-categories",{
            method:"GET",
            headers: {
                'Authorization':'bearer ' +localStorage.getItem('token') 
               },    
        }).then(res=>res.json())
        .then(data=>{
            this.setState({
                categories:data
            })
        })
    }
    delete=(id)=>{

        fetch(`http://localhost:8000/delete-category/${id}`,{
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
    
        fetch(`http://localhost:8000/delete-catbooksdel/${id}`,{
          method: 'DELETE',
          headers: {
            'Authorization':'bearer ' +localStorage.getItem('token') 
           },    
          
        })
         .then(data=>{
           console.log(data)
         }) 
     }

    componentDidMount(){
        console.log(this.props)

        //const query=new URLSearchParams(this.props.location.search);
        //console.log(query.get("cat"))
        
        fetch("http://localhost:8000/show-categories",{
            method:"GET",
            headers: {
                'Authorization':'bearer ' +localStorage.getItem('token') 
               },    
        }).then(res=>res.json())
        .then(data=>{
             console.log(data)
            this.setState({
                categories:data
            })
        })
    }
    
    
    
    cancelEdit=()=>{
        this.setState({showEdit:false})
    }

    render(){
        console.log(this.state.categories)
        if(this.state.loggedIn===false){
            return<Redirect to="/"/>
          }
          if(this.state.adminloggedIn===false){
            return<Redirect to="/user"/>
          }
        return (
         <React.Fragment>
             <header className="head-sec">
                    <h2 className="app-name">Book Store</h2>
                    <h3>Welcome Admin</h3>  
                </header>
        <div  className="sidebar-main">
           
            <Link to='/admin' className="side-links">Home</Link>
            <Link to='/books'className="side-links" >Manage Book</Link>
            <Link to='/allorders'className="side-links" >All Orders</Link>
            <Link to="/logout"className="side-links">Log out</Link>
        </div>
        <div className="main-category">
                <h1 className="head-category">Manage Category</h1>
            <button id="add-cat-btn" onClick={()=>this.setState({showAdd:true})}> Add Category</button>
           {(this.state.showEdit)&&
            <Popup>
            <div className="edit-cat-sec">
                <form onSubmit={this.editCategory}>
                <h2 style={{textAlign:"center",color:"#101011"}}>Edit Category</h2>

                <label id="title-label" style={{color:"grey"}}>Category :</label>
                    <input type="text" 
                        placeholder="Enter Category"    
                        id="cat-input"
                        onChange={this.editCategoryHandler}
                        onBlur={this.handleBlurEdCategory}
                        value={this.state.editCategory}
                    />{this.state.errMsg}
                    <br/><br/>
                <button type="submit" className="submit-title">Edit</button>
                <button type="button" onClick={this.cancelEdit}  className="submit-title">Cancel</button>
                </form>

            </div>
            </Popup>
            }
            {
            (this.state.showAdd)&&
             <Popup>
                <div className="add-cat-sec">
                <form onSubmit={this.addCategory}>
                <h2 style={{textAlign:"center",color:"#101011"}}>Add Category</h2>

                <label id="title-label" style={{color:"grey"}}>Category :</label>
                    <input type="text" 
                        placeholder="Enter Category"    
                        id="cat-input"
                        onChange={this.categoryHandler}
                        onBlur={this.handleBlurCategory}
                        value={this.state.category}
                    />{this.state.errAddMsg}
                   <br/><br/>
                <button type="submit" className="submit-title">Add</button>
                <button type="buttton" className="submit-title" onClick={()=>this.setState({showAdd:false})}>Cancel</button>
                </form>

                </div>
            </Popup>
            }          
                <div className="ag-theme-alpine catgrid" style={{ height:300, width:510 }}>
                        <AgGridReact
                            columnDefs={this.state.columnDefs}
                            frameworkComponents={this.state.frameworkComponents}
                            rowData={this.state.categories}
                            paginationAutoPageSize={true} 
                            pagination={true}  
                            defaultColDef={this.state.defaultColDef}         
                        >          
                        </AgGridReact>               
                </div>
           </div> 
        </React.Fragment>
        );
    }
}
export default Category;