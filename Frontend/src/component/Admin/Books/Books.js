import React, {Component} from 'react';
import {  AgGridReact } from 'ag-grid-react';
import  { Redirect, Link } from 'react-router-dom';

import './Books.css';

import Popup from '../Popup/Popup';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.min.css';
import ButtonRenderer from './ButtonRenderer.jsx' 



class Books extends Component
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
            loggedIn,
            adminloggedIn,
            categories:[],
            books:[],
            title:"",
            author:"",
            price:"",
            stock:1,
            description:"",
            selectedCategory:"",
            categoryId:"",
            showAdd:false,
            showEdit:false,
            editBookId:"",
            edtitle:"",
            edauthor:"",
            edprice:"",
            eddescription:"",
            edselectedCategory:"",
            edcategoryId:"",
            edstock:"",
            edimage:null,
            edimages:[],
            image:null,
            //imgUrl:null,
            selectedImg:false,
            images:[],
            //otherImages:[],
            uploadErr:"",
            selectedImages:false,
            uploadOtherErr:"",
            errors:{
                title:"",
                author:"",
                price:"",
                description:"",
                selectedCategory:"",
                stock:""
              },
            columnDefs:[
                    {
                        headerName:"Title",
                        field:"title",
                    },
                    {
                        headerName:"Author",
                        field:"author",
                    },
                    {
                        headerName:"Price",
                        field:"price",
                    },
                    {
                        headerName:"Description",
                        field:"description",
                    },
                    {
                        headerName:"Category",
                        field:"category",
                    },
                    {
                        headerName:"Available Quantity",
                        field:"stock",
                    },
                    {
                        headerName: "Action",
                        field: "_id.$oid",
                        cellRenderer: "buttonRenderer",
                        cellStyle: { border: "none" },
                        maxWidth:200,
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
            
               filter:true,
               sortable:true,           
              },
              frameworkComponents: {
                buttonRenderer: ButtonRenderer,
                },
         }
    }
    

    categoryHandler=(e)=>{
        
        if(e.target.value!=="Select" ){
            
            console.log(e.target.value)
            let errors=this.state.errors;
         errors.selectedCategory=(e.target.value==="Select")?"Please Select":"";
        this.setState({
            selectedCategory:e.target.value,
            errors
            
        })
        const val=this.state.categories.filter(list=> list.category===e.target.value)
        this.setState({
            categoryId:val[0]._id.$oid
        })
        }
    }
    edcategoryHandler=(e)=>{
        
        if(e.target.value!=="Select" ){
            
            console.log(e.target.value)
            let errors=this.state.errors;
         errors.selectedCategory=(e.target.value==="Select")?"Please Select":"";
        this.setState({
            edselectedCategory:e.target.value,
            errors
            
        })
        const val=this.state.categories.filter(list=> list.category===e.target.value)
        this.setState({
            edcategoryId:val[0]._id.$oid
        })
        }
    }
    

    inputHandler=(e)=>{
        console.log(e.target.name)
      this.setState({  [e.target.name]: e.target.value });

      let errors = this.state.errors;
      const { name, value } = e.target;

      switch (name) {
        case 'title': 
          errors.title = 
            value.length < 1
              ? ' Required Field'
              : '';
          break;
        case 'author': 
          errors.author = 
            value.length < 1 ? 'Required Field': '';
          break;
        case 'price': 
          errors.price = 
            (value.length < 1 ? 'Required Field': '');
          break;
          case 'stock': 
          errors.stock = 
            (value.length < 1 ? 'Required Field': '' || value <= 0 ? 'quantity should be greater than 0': '' );
          break;

        default:
          break;
      }
      
       this.setState({ errors, [e.target.name]: e.target.value, });
    }
      

    descriptionHandler=(e)=>{    
        const value=e.target.value
        let errors=this.state.errors;
        errors.description= value.length<1?"Required Field":"";
        this.setState({
        errors,
        description:e.target.value,
        })    
    }
    eddescriptionHandler=(e)=>{   

        //const value=e.target.value
        //let ederrors=this.state.ederrors;
        //ederrors.eddescription= value.length<1?"Please Fill":"";
        this.setState({
            //ederrors,
            eddescription:e.target.value,
            })    
        }
setEdit=(id)=>{
    let book=this.state.books.filter(lis=>lis._id.$oid===id)
    console.log(book);
    this.setState({
            editBookId:id,
            showEdit:true,
            showAdd:false,
            selectedImg:true,
            selectedImages:true,        
            edtitle:book[0].title,
            edauthor:book[0].author,
            edprice:book[0].price,
            eddescription:book[0].description,
            edselectedCategory:book[0].category,
            edcategoryId: book[0].categoryId,
            edimage:book[0].frontimage,
            edimages:book[0].otherimages,
            edstock:book[0].stock
            
    })
}

editBook=(e)=>{
    e.preventDefault();
    if(this.state.edtitle!=="" && this.state.edauthor!=="" && this.state.edselectedCategory!==""
    && this.state.edselectedCategory!=="Select"  && this.state.edprice!=="" && this.state.eddescription!==""
    &&this.state.selectedImg && this.state.selectedImages){
    const data={
    id:this.state.editBookId,
    title:this.state.edtitle,
    author:this.state.edauthor,
    price:this.state.edprice,
    description:this.state.eddescription.trim(),
    category:this.state.edselectedCategory,
    categoryId:this.state.edcategoryId,  
    image:this.state.edimage,
    images:this.state.edimages,
    stock:this.state.edstock      
}

    fetch('http://localhost:8000/edit-book',{
        method:"PUT",
        headers:{
            'Content-Type':'application/json',
            'Authorization':'bearer ' +localStorage.getItem('token')
        },
        body:JSON.stringify(data)
    }).then( res=>{ console.log(res)})



        this.setState({
            title:"",
            author:"",
            price:"",
            description:"",
            selectedCategory:"",
            categoryId:"",
            selectedFile:"",
            showEdit:false,
            image:null,
            images:[],
            stock:1,
        })

        store.addNotification({
            title: 'Success',
            message: 'Book Updated',
            type: 'success',                       
            container: 'top-right',                
            animationIn: ["animate__animated animate__fadeIn"], 
            animationOut: ["animate__animated animate__fadeOut"], 
            dismiss: {
              duration: 3000
            }
          })
}
this.getData();


}


    addBook=(e)=>{
        e.preventDefault();
        
        
        if(this.state.title!=="" && this.state.author!=="" && this.state.selectedCategory!==""
            && this.state.selectedCategory!=="Select" && this.state.price!==""&& this.state.description!=="" 
            &&this.state.selectedImg && this.state.selectedImages  )
            {
        const data={
            title:this.state.title,
            author:this.state.author,
            price:this.state.price,
            description:this.state.description.trim(),
            stock:this.state.stock,
            category:this.state.selectedCategory,
            categoryId:this.state.categoryId,
            frontimage:this.state.image ,
            otherimages:this.state.images,       
        }
      
        fetch('http://localhost:8000/add-book',{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                'Authorization':'bearer ' +localStorage.getItem('token')
            },
            body:JSON.stringify(data)
        }).then( res=>{ console.log(res)})

        
        //const formData=new FormData();
            
        // for(var i=0; i<this.state.selectedImages.length; i++){
        //    // console.log(this.state.selectedImages[i])
        //     formData.append(images,this.state.selectedImages[i])
        // }
        // formData.append('image',this.state.selectedImg)
        //     console.log(formData)
         
        //     fetch('http://localhost:8000/upload-img',{
        //         method:'POST',
        //         body:formData
        //     }).then((res)=>{
        //         res.json().then(data=>{
        //                console.log(data) 
        //            this.setState({imgUrl:`http://localhost:8000${data.image}`})
        //         })
        //     })

        this.setState({
            title:"",
            author:"",
            price:0,
            description:"",
            selectedCategory:"",
            categoryId:"",
            showAdd:false,
            selectedImg:false,
            otherImages:[],
            selectedImages:false
        })
        store.addNotification({
            title: 'Success',
            message: 'Book Added',
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

      
    getData=()=>{
        fetch("http://localhost:8000/show-books",{
            method:"GET",
            headers:{
                'Authorization':'bearer ' +localStorage.getItem('token')
            }
        }).then(res=>res.json())
        .then(data=>{
            // console.log(data)
            this.setState({
                books:data
            })
        })
    }

    delete=(id)=>{

        fetch(`http://localhost:8000/delete-book/${id}`,{
          method: 'DELETE',
          headers:{
            'Authorization':'bearer ' +localStorage.getItem('token')
          }
          
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
        console.log(this.props)
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
        fetch("http://localhost:8000/show-books",{
            method:"GET",
            headers: {
                'Authorization':'bearer ' +localStorage.getItem('token') 
               },    
        }).then(res=>res.json())
        .then(data=>{
            this.setState({
                books:data
            })
        })

    }
    showAddForm=()=>{
        this.setState({
            showAdd:true,
            showEdit:false
            })
    }
    showCancel=()=>{
        this.setState({showAdd:false})
    }

    showEditCancel=()=>{
        this.setState({showEdit:false})
    }

    upload=(e)=>{
       
        console.log(e.target.files)
        const file=e.target.files
        this.setState({selectedImg:true})

        const imgname=(file[0].name)
        const val=imgname.split(".");
        const ext= val[val.length - 1];
        if(ext==="jpg" || ext==="jpeg" || ext==="png" )
            {
            const formData=new FormData();
            
            formData.append('image',file[0])
            console.log(formData)
        
            const {name}=e.target;
           
            fetch('http://localhost:8000/upload-img',{
                method:'POST',
                body:formData
            }).then((res)=>{
                res.json().then(data=>{
                    this.setState({[name]:`http://localhost:8000${data}`})
                    //    if(!data.error){
                    //     this.setState({imgUrl:`http://localhost:8000${data.image}`,
                    //     uploadErr:""})
                    //    }else{
                    //         this.setState({uploadErr:"Only images "})
                    //     }
                })
            })
            this.setState({uploadErr:""})
        }
        else{
           
            this.setState({
                uploadErr:"Select Only Image",
                selectedImg:false
            })
        }
    }

     uploadOtherImg=(e)=>{
        
           // console.log([e.target.name])
            const files=e.target.files
         //this.setState({ selectedImages: [...this.state.selectedImages, ...e.target.files] })
         
            let err=false;
            if(e.target.files){
                this.setState({selectedImages:true})  
            }
          
          
            const images=[];
            for (let j = 0; j < files.length; j++) {
                        images.push(files[j].name)
                }
            console.log(images)
            const ext=images.map(lis=>lis.split(".").pop()) 
                
                for(let k=0; k<ext.length; k++){
                    if(ext[k]==="jpg" || ext[k]==="png" || ext[k]==="jpeg" ){
                        this.setState({uploadOtherErr:""                    
                             })
                             console.log("good")
                    }else{
                        this.setState({uploadOtherErr:"Select Only images!!" ,
                            selectedImages:false                   
                        })
                        console.log("erro")
                        err=true;
                        break;
                    }
                }
             //console.log(ch);  

         const {name}=e.target;  
        if(!err){
          const  formData=new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append(`images[${i}]`, files[i])
                
            }
            console.log(formData)
         
            fetch('http://localhost:8000/upload-images',{
                method:'POST',
                body:formData
            }).then((res)=>{
                res.json().then(data=>{
                       console.log(data) 
                  this.setState({[name]:data})
                })
            })
            }
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
                    <Link to='/categories'className="side-links" >Manage Category</Link>
                    <Link to='/allorders'className="side-links" >All Orders</Link>
                    <Link to="/logout"className="side-links">Log out</Link>
                </div>
       
                <div className='main-books'>            
                    
                  <h1>Books</h1>   
                  {this.state.showAdd?    
                    <Popup>
                    <form onSubmit={this.addBook} className="add-book">
                    <h2 style={{textAlign:"center",color:"#101011"}}>Add Book</h2>
                        <label className="add-label" id="select-label"> Category : </label>
                        <select
                            id="select-category"
                            className="cat-input"
                            onChange={this.categoryHandler}
                            
                            value={this.state.selectedCategory}
                        >
                            <option>Select</option>
                            {this.state.categories.map((list) => (
                            <option key={list._id.$oid} >{list.category}</option>
                            ))}
                        </select>
                        {(this.state.errors.selectedCategory !=="" ) &&
                            <label className="error">{this.state.errors.selectedCategory}</label>}
        
                        <br/><br/>
                        <label className="add-label"> Title :</label>
                            <input type="text" name="title"
                                placeholder="Enter Title"    
                                className="cat-input"
                                onChange={this.inputHandler}
                               
                                //onBlur={this.handleOnBlurUsername}

                                value={this.state.title}

                            /> 
                            {(this.state.errors.title !=="" ) &&
                            <label className="error-book">{this.state.errors.title}</label>    
                            }
                        
                            <br/><br/>
                        <label className="add-label">Author :</label>
                            <input type="text" name="author"
                                placeholder="Enter author"    
                                className={false?"cat-input abc":"cat-input"}
                                onChange={this.inputHandler}
                                
                                value={this.state.author}
                            />
                            <label className="error-book">{this.state.errors.author}</label>
                           
                        <br/><br/>
                        <label className="add-label">Price :</label>
                            <input type="number" name="price"
                                placeholder="Enter price"    
                                className="cat-input"
                                onChange={this.inputHandler}
                                value={this.state.price}
                            />
                            <label className="error-book">{this.state.errors.price}</label>
                                                   <br/><br/>
                        <label className="add-label" >Description :</label>
                            <textarea   name="desciption"
                                placeholder="Enter Description"    
                                
                                onChange={this.descriptionHandler}
                                value={this.state.description}
                            />
                            {(this.state.errors.description !=="" ) &&
                            <label className="error-book">{this.state.errors.description}</label>}
                        <br/><br/>
                        <label className="add-label">Stock :</label>
                            <input type="number" name="stock"
                                placeholder="Enter Available Qunatity"    
                                className="cat-input"
                                onChange={this.inputHandler}
                                value={this.state.stock}
                            />
                            <label className="error-book">{this.state.errors.stock}</label>
                                                   <br/><br/>       

                        <label className="add-label" >Front Cover :</label>     
                        <input type="file" className="cat-input"  onChange={(e)=>this.upload(e)} name="image" /><br/>
                        
                        <span style={{color:"red", marginLeft:"45px"}}>{this.state.uploadErr}</span>
                        <br/>
                        <label className="add-label"  >Images :</label>     
                        <input  type="file" className="cat-input" multiple onChange={(e)=>this.uploadOtherImg(e)} name="images" /><br/>
                        <span style={{color:"red", marginLeft:"45px"}}>{this.state.uploadOtherErr}</span>
                        <br/><br/> 
                        <button type="submit" id="add-submit" >Submit</button>
                        <button type="button" id="show-cancel" onClick={this.showCancel}  >Cancel</button>      
                        </form>
                    </Popup>
                      :null}
                    

                     {(this.state.showEdit) ?
                       
                        <Popup>
                        <form onSubmit={this.editBook} className="edit-book" >
                        <h2 style={{textAlign:"center",color:"#101011"}}>Edit Book</h2>
                        <label className="add-label" id="select-label"> Category : </label>
                        <select
                            id="select-category"
                            className="cat-input"
                            onChange={this.edcategoryHandler}
                            value={this.state.edselectedCategory}
                            
                        >
                            <option >Select</option>
                            {this.state.categories.map((list) => (
                            <option key={list._id.$oid} >{list.category}</option>
                            ))}
                        </select>
                        
                        <br/><br/>
                        <label className="add-label"> Title :</label>
                            <input type="text" name="edtitle"
                                placeholder="Enter Title"    
                                className="cat-input"
                                onChange={this.inputHandler}
                                value={this.state.edtitle}
                                required
                            /> 
                            
                        
                            <br/><br/>
                        <label className="add-label">Author :</label>
                            <input type="text" name="edauthor"
                                placeholder="Enter author"    
                                className={false?"cat-input abc":"cat-input"}
                                onChange={this.inputHandler}
                                value={this.state.edauthor}
                                required
                            />

                           
                        <br/><br/>
                        <label className="add-label">Price :</label>
                            <input type="text" name="edprice"
                                placeholder="Enter price"    
                                className="cat-input"
                                onChange={this.inputHandler}
                                value={this.state.edprice}
                                required
                            />
                           
                        <br/><br/>
                        <label className="add-label" >Description :</label>
                            <textarea   name="eddesciption"
                                placeholder="Enter Description"    
                                
                                onChange={this.eddescriptionHandler}
                                value={this.state.eddescription}
                                required
                            />
                        <br/><br/>
                        <label className="add-label">Stock :</label>
                            <input type="number" name="edstock"
                                placeholder="Enter Available Qunatity"    
                                className="cat-input"
                                onChange={this.inputHandler}
                                value={this.state.edstock}
                            />
                            <label className="error-book">{this.state.errors.stock}</label>
                            <br/><br/>
                        <label className="add-label" >Front Cover :</label>     
                        <input  type="file" id="img"  className="cat-input" onChange={(e)=>this.upload(e)} name="edimage"  /><br/>
                        <span style={{color:"red", marginLeft:"45px"}}>{this.state.uploadErr}</span>
                        <br/>
                        <label className="add-label" >Images :</label>     
                        <input  type="file" multiple className="cat-input" onChange={(e)=>this.uploadOtherImg(e)} name="edimages"  /><br/>
                        <span style={{color:"red", marginLeft:"45px"}}>{this.state.uploadOtherErr}</span>
                        <br/><br/> 

                        <button type="submit" id="edit-submit" >Edit</button>
                        <button type="button" id="edit-cancel-btn" onClick={this.showEditCancel}  >Cancel</button>      
                        
                        </form>
                               
                    </Popup>
                    :null  } 
                                


                    <button type="button" id="add-book-btn" onClick={this.showAddForm}>Add Book</button>
                    
                    <div className="ag-theme-alpine book-grid" style={{ height:300, width:1200 }}>
                            <AgGridReact
                                columnDefs={this.state.columnDefs}
                                frameworkComponents={this.state.frameworkComponents}
                                rowData={this.state.books}
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
export default Books;