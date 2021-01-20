import  React,{Component} from 'react';
import  { Redirect, Link } from 'react-router-dom';
import './User.css'
import './ViewCart'
import ViewCart from './ViewCart';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.min.css';
import Popup from '../Admin/Popup/Popup';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';


class User extends Component{

    constructor(props){
        super(props);  
        const token= localStorage.getItem("token")
        let loggedIn=true
        if(token===null){
        loggedIn=false
        }
        
        this.state={
            loggedIn,
            books:[],
            view:false,
            viewedBook:[],
            booksFil:[],
            booksInCart:[],
            countBooks:0,
            showCart:false,
            categories:[],
            showBookfil:false,
            i:0,
            showPopup:false,
            booksLength:3,
            quantity:0,

        }
    }

    viewBook=(id)=>{
        let selectedbook=this.state.books.filter(book=> book._id.$oid==id)
        console.log(selectedbook)
        this.setState({
            viewedBook:selectedbook,
            view:true
        })
    }
    cancelView=()=>{
        this.setState({
            view:false
        })
    }

    quantityIncrease=(id)=>{
        
        let bookIndex = this.state.booksInCart.findIndex((book => book.bookid == id));
            console.log(bookIndex)
             this.state.booksInCart[bookIndex].quantity=this.state.booksInCart[bookIndex].quantity+1;
              this.setState({booksInCart:this.state.booksInCart})
           
        }
        quantityDecrease=(id)=>{
           
            let bookIndex = this.state.booksInCart.findIndex((book => book.bookid == id));
            console.log(bookIndex)
  
            if(this.state.booksInCart[bookIndex].quantity!==1){
             this.state.booksInCart[bookIndex].quantity=this.state.booksInCart[bookIndex].quantity-1;
              this.setState({booksInCart:this.state.booksInCart})
            }
        }

    addToCart=(id,title, author,price)=>{
       
        let check=this.state.booksInCart.filter(list=> list.bookid===id).length
        if(check==0){
            let book={
                    bookid:id,
                    title:title,
                    author:author,
                    price:price,
                    quantity:1,
                    }
                   
            this.setState({
                booksInCart:[...this.state.booksInCart , book],
                countBooks:this.state.countBooks+1
            })
        }else{
            store.addNotification({
                title: 'Book',
                message: 'Alreday added',
                type: 'warning',                       
                container: 'top-right',                
                animationIn: ["animate__animated animate__fadeIn"], 
                animationOut: ["animate__animated animate__fadeOut"], 
                dismiss: {
                  duration: 3000
                }
              })
        }
            
    }
    viewCart=()=>{
        this.setState({
            showCart:true
        })
    }
 componentDidMount(){
        let tempBooks;
        fetch("http://localhost:8000/show-books", {
                method:"GET",
                headers: {
                    'Authorization':'bearer ' +localStorage.getItem('token') 
                   },    
            }).then(response=> response.json())
            .then(
                (data)=>{
                     //console.log(data);
                     //tempBooks=data.slice(0,3)
                     //console.log(tempBooks)
                      this.setState({
                         books:data
                     })   
                }
            ).catch(err=>console.log("somthing went Worng"))

            
            fetch("http://localhost:8000/show-categories", {
                method:"GET",
                headers: {
                    'Authorization':'bearer ' +localStorage.getItem('token') 
                   },    
            }).then(response=> response.json())
            .then(
                (data)=>{
                     //console.log(data);
                     this.setState({
                         categories:data
                     })   
                }
            )

            console.log(tempBooks)
                this.setState({
                    books:this.state.books.slice(0,2)
                })

    }

    updateCart=(books)=>{
        this.setState({
            booksInCart:books,
            countBooks:books.length
        })
    }

    showBooks=()=>{
        this.setState({
                showCart:false,   
            })
    }

    filterBooks=(id)=>{
        let Filteredbooks=this.state.books.filter(lis=>lis.categoryId===id)
        console.log(Filteredbooks)
        this.setState({
            booksFil:Filteredbooks,
            showBookfil:true,
            booksLength:3
        })
        console.log(this.state.booksFil.length)
    }
    allBooks=()=>{
        this.setState({
            //booksFil:[],
            showBookfil:false
        })}
        back=()=>{
            this.setState({
                showCart:false,
                booksInCart:[],
                countBooks:0
            })
        }
        clearCart=()=>{
            this.setState({
                booksInCart:[],
                countBooks:0
            })
        }
    
    render(){
        console.log(this.state.booksInCart)
        if(this.state.loggedIn==false){
            return <Redirect to="/"/>
          }
          if(localStorage.getItem('email')==='admin@gmail.com'){
            return <Redirect to="/admin"/>
          }

        if(this.state.showCart){
           return <ViewCart
                        booksInCart={this.state.booksInCart}
                        countBooks={this.state.countBooks}
                        updateCart={this.updateCart}
                        showBooks={this.showBooks}
                        back={this.back}
                        clearCart={this.clearCart}
                    />
        }
        //console.log(this.state.books);
        //console.log(this.state.booksFil)
        return(
            <div>
                <header className="head-sec">
                    <h2 className="app-name">Book Store</h2>
                    <h3>Welcome {localStorage.getItem('name')}</h3>  
                </header>

                <div  className="sidebar-main-user">
                    <div className="sidebar-content">
                    
                    
                       <h3>Category</h3>
                       <ul><li className="side-cat" onClick={this.allBooks}>All</li></ul>
                       {    
                           this.state.categories.map(lis=>
                               <ul key={lis._id.$oid}>
                               <li className="side-cat" onClick={()=>this.filterBooks(lis._id.$oid)}>{lis.category}</li>
                               </ul>
                           )
                       } 
                    
                    <h3 onClick={this.viewCart} id="view-cart">View Cart({this.state.countBooks}) </h3>
                   
                    <Link to="/myorders"className="side-links">My orders</Link>
                    <Link to="/logout"className="side-links">Log out</Link>
                    </div>
                </div>
                <div className="main-user">
                        {
                            (this.state.view)?(
                                <div className="viewed-book">
                                    <div className="front-cover"><img className="details-image" width="200" height="200" alt="book" src={this.state.viewedBook[0].frontimage}/> 
                                        <br/><span className="view-images" onClick={()=>this.setState({showPopup:true})}>View all Images</span>
                                    </div>
                                    <div className="viewed-book-content">
                                    
                                     <h2 style={{color:"#EC7063"}}>Title: {this.state.viewedBook[0].title}</h2>
                                    
                                    <h4>Price: Rs.{this.state.viewedBook[0].price}</h4>
                                    <p><b>Author:</b> {this.state.viewedBook[0].author}</p>
                                    <p><b>Category:</b> {this.state.viewedBook[0].category}</p>
                                    <p  ><b>Description:</b> {this.state.viewedBook[0].description}</p>
                                    {
                                      (this.state.showPopup)?  
                                    <Popup>
                                        <div>
                                        <HighlightOffIcon className="cross-btn" onClick={()=>this.setState({showPopup:false})}></HighlightOffIcon>
                                         
                                         <div className="popup-images">
                                             
                                         {/* <button  className="close" onClick={()=>this.setState({showPopup:false})}><HighlightOffIcon/></button>      */}
                                            
                                        <img  width="300" height="300" alt="book" src={`http://localhost:8000${this.state.viewedBook[0].otherimages[this.state.i].images}`}/>
                                        <br/><br/>
                                        {
                                        (this.state.i !== this.state.viewedBook[0].otherimages.length-1)?
                                         (<button className="forward-arrow" onClick={()=>this.setState({i:this.state.i+1})}><ArrowForwardIcon/></button>):null
                                           }
                                       {(this.state.i !== 0)?(
                                        <button className="back-arrow" onClick={()=>this.setState({i:this.state.i-1})}><ArrowBackIcon/></button>):null}
                                        <br/><br/>
                                        <button  className="close" onClick={()=>this.setState({showPopup:false})}>Close</button>
                                        </div>
                                        </div>
                                        </Popup>:null}
                                   
                                    </div>
                                    
                                <button id="back" onClick={this.cancelView}>Back</button>
                                <button className="add-to-cart"  onClick={()=>this.addToCart(this.state.viewedBook[0]._id.$oid,
                                                                    this.state.viewedBook[0].title, 
                                                                    this.state.viewedBook[0].author, 
                                                                    this.state.viewedBook[0].price)}>Add to Cart</button>  
                                </div>
                            )
                         :(
                                     
                           <React.Fragment> 
                            {    
                            this.state.showBookfil?(
                            
                                this.state.booksFil.slice(0,this.state.booksLength).map(bk=>

                                <div key={bk._id.$oid} className="book-container">
                            
                                
                                <img width="170" height="170"  className="image-card" alt="book" src={bk.frontimage} />
                                    <p style={{color:"#106C80"}}> <span onClick={()=>this.viewBook(bk._id.$oid)} className="book-name">{bk.title.slice(0, 20) + (bk.title.length>20 ? "..." :"")}</span> 
                                            <br/>By: {bk.author.slice(0,15)+ (bk.author.length>15 ? "..." :"")} <br/>Price: Rs.{bk.price}
                                    </p>
                                    {
                                    (this.state.booksInCart.filter(list=> list.bookid===bk._id.$oid).length>0)?
                                    (
                                        (<div className="inp">   
                                        <AddCircleOutlineIcon style={{cursor:"pointer"}} onClick={()=>this.quantityIncrease(bk._id.$oid)}  />   
                                            <span style={{border:"1px solid black", padding:"2px", marginBottom:"2px" }} >
                                                {this.state.booksInCart[this.state.booksInCart.findIndex((book => book.bookid == bk._id.$oid))].quantity}
                                            </span>

                                        <RemoveCircleOutlineIcon style={{cursor:"pointer"}} onClick={()=>this.quantityDecrease(bk._id.$oid)} />
                                       
                                        </div>
                                       
                                        )
                                        ):(<React.Fragment>   
                                        <AddCircleOutlineIcon   className="disable-btn"  />   
                                            <span style={ { border:"1px solid black", padding:"1px" }}>
                                                {1}
                                            </span>

                                        <RemoveCircleOutlineIcon className="disable-btn"/>
                                      
                                        </React.Fragment>)   
                                  }
                                
                                
                                <button className="add-to-cart" onClick={()=>this.addToCart(bk._id.$oid,bk.title, bk.author, bk.price)}>Add to Cart</button>  
                            </div>
                            )
                            ):this.state.books.slice(0,this.state.booksLength).map(lis=>
                                
                                <div key={lis._id.$oid} className="book-container">
                                    <img width="170" height="170"  className="image-card" alt="book" src={lis.frontimage} />
                                    <p style={{color:"#106C80"}}> <span onClick={()=>this.viewBook(lis._id.$oid)} className="book-name" >{lis.title.slice(0, 20) + (lis.title.length>20 ? "..." :"")}</span> 
                                            <br/>By: {lis.author.slice(0,15) + (lis.author.length>15 ? "..." :"")} <br/>Price: Rs.{lis.price}</p>
                                   
                                    {
                                    (this.state.booksInCart.filter(list=> list.bookid===lis._id.$oid).length>0)?
                                    (
                                        (<div className="inp">   
                                        <AddCircleOutlineIcon style={{cursor:"pointer"}} onClick={()=>this.quantityIncrease(lis._id.$oid)}  />   
                                            <span style={{border:"1px solid black", padding:"2px", marginBottom:"2px" }} >
                                                {this.state.booksInCart[this.state.booksInCart.findIndex((book => book.bookid == lis._id.$oid))].quantity}
                                            </span>

                                        <RemoveCircleOutlineIcon style={{cursor:"pointer"}} onClick={()=>this.quantityDecrease(lis._id.$oid)} />
                                       
                                        </div>
                                       
                                        )
                                        ):(<React.Fragment>   
                                        <AddCircleOutlineIcon   className="disable-btn"  />   
                                            <span style={ { border:"1px solid black", padding:"1px" }}>
                                                {1}
                                            </span>

                                        <RemoveCircleOutlineIcon className="disable-btn"/>
                                      
                                        </React.Fragment>)   
                                  }
                                       <button  className="add-to-cart" onClick={()=>this.addToCart(lis._id.$oid,lis.title, lis.author, lis.price)}>Add to Cart</button>
                                      
                                </div>
                                )
                                }

                                    <br/>                                
                                   <button className="show-more-books" onClick={()=>this.setState({booksLength: this.state.booksLength + 3})}>Show More </button>
                               
                            </React.Fragment>  
                                
                        )
                        
                       }
                         
                </div>
            </div>
        );
    }

}
export default User;
