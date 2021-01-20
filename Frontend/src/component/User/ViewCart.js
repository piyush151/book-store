import  React,{Component} from 'react';
import  { Redirect, Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import './ViewCart.css'


class ViewCart extends Component{

    constructor(props){
        super(props);  

        let sum=0;
        for(let i=0; i<this.props.booksInCart.length; i++){
           sum= this.props.booksInCart[i].price * this.props.booksInCart[i].quantity + sum;

        }
        console.log(sum)
        // let total=sum;
        this.state={
            books:[],
            view:false,
            viewedBook:[],
            booksInCart:this.props.booksInCart,
            countBooks:this.props.countBooks,
            quantity:0,
            total:sum,
            orderConfirm:false
        }
        
    }

    viewBook=(id)=>{
       // alert(id);
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
    remove=(id)=>{
       
            let books=this.state.booksInCart.filter(book=>book.bookid!==id)
            this.setState({
                booksInCart:books,
                countBooks:this.state.countBooks+1  
            })
            this.props.updateCart(books)
            
        console.log(books)
        let sum=0;
        for(let i=0; i<books.length; i++){
           sum= books[i].price * books[i].quantity + sum;

        }
        console.log(sum)
        this.setState({total:sum})
    }

    componentDidMount(){
            fetch("http://localhost:8000/show-books", {
                method:"GET",
                headers: {
                    'Authorization':'bearer ' +localStorage.getItem('token') 
                   },    
            }).then(response=> response.json())
            .then(
                (data)=>{
                     //console.log(data);
                     this.setState({
                         books:data
                     })   
                }
            )
    }
    // quantityIncrease=(id)=>{
        
    // let bookIndex = this.state.booksInCart.findIndex((book => book.bookid == id));
        
    //      this.state.booksInCart[bookIndex].quantity=this.state.booksInCart[bookIndex].quantity+1;
    //       this.setState({booksInCart:this.state.booksInCart})
       
    // }
    // quantityDecrease=(id)=>{
    //     let bookIndex = this.state.booksInCart.findIndex((book => book.bookid == id));
    //     if(this.state.booksInCart[bookIndex].quantity!==1){
    //      this.state.booksInCart[bookIndex].quantity=this.state.booksInCart[bookIndex].quantity-1;
    //       this.setState({booksInCart:this.state.booksInCart})
    //     }
    // }
    totalPrice=()=>{
        let sum=0;
        for(let i=0; i<this.state.booksInCart.length; i++){
           sum= this.state.booksInCart[i].price * this.state.booksInCart[i].quantity + sum;

        }
        console.log(sum)
        this.setState({total:sum})
    }
    placeOrder=()=>{

        let booklist=this.state.booksInCart.map((lis)=>lis.title)
        let quantitylist=this.state.booksInCart.map(lis=>lis.quantity)
        console.log(booklist)
        console.log(new Date().toISOString())
        let orderNumber=Date.now();
        
        let dt=new Date();
        let datecur=`${dt.getFullYear()}-${(dt.getMonth()+1)}-${dt.getDate()}`
        if(this.state.booksInCart.length>0){
        const data={
                orderNumber:orderNumber,
                //date:new Date().toISOString(), 
                 date:datecur,   
                name:localStorage.getItem('name'),
                email:localStorage.getItem('email'),
                address:localStorage.getItem('address'),          
                books:booklist,
                quantity:quantitylist,
                total:this.state.total
            }
            fetch('http://localhost:8000/add-order',{
                method:'POST',
                headers:{
                    'Content-Type': 'applcation/json' ,
                    'Authorization':'bearer ' +localStorage.getItem('token') 
                        
                },
                body:JSON.stringify(data)
            }).then(res=>console.log(res))
            
         
        //     const dataBooks={
        //         orderNumber:orderNumber,
        //         book:
        //     }
        //     fetch('http://localhost:8000/ordered-books',{
        //         method:'POST',
        //         headers:{
        //             'Content-Type': 'applcation/json' ,
        //             'Authorization':'bearer ' +localStorage.getItem('token') 
                        
        //         },
        //         body:JSON.stringify(dataBooks)
        //     }).then(res=>console.log(res)
         
         
            this.setState({
                orderConfirm:true
            })
        
        }
    }
    clearCart=()=>{
        this.setState({
            booksInCart:[]
        })
        this.props.clearCart();
    }

    render(){

        this.state.booksInCart.map(l=>console.log(l))
       
        console.log(this.state.booksInCart);
        return(
            <div>
                 <header className="head-sec">
                    <h2 className="app-name">Book Store</h2>
                    <h3>Welcome {localStorage.getItem('name')}</h3>  
                </header>
                <div  className="sidebar-main-cart">
                    <div className="sidebar-content">
                    <h2 className="title-head">Book Store</h2>
                    <h3 className="username" >User: {localStorage.getItem('name')}</h3>
                    {   
                        (this.state.orderConfirm)?
                        <h3 style={{cursor:"pointer"}} onClick={this.props.back} className="side-links" >Home</h3>
                        :
                        <h3 style={{cursor:"pointer"}} onClick={this.props.showBooks} className="side-links" >Home </h3>
                    }       
                    <Link to="/logout"className="side-links">Log out</Link>
                    </div>
                </div>

                <div className="main-cart">
                  <h1>Cart</h1>     
                        {
                            (this.state.orderConfirm)?
                                <div>
                                 <h2 style={{color:"orange"}}>Congrats Order Placed!!</h2>
                                </div>
                            :
                            this.state.booksInCart.length>0?(<div>
                                <button id="clear-btn" onClick={this.clearCart}>Clear</button>
                                <table id="books-mycart">
                                <thead>
                                    <tr><th>Title</th>
                                    <th>Author</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    {/* <th>Manage Quantity</th> */}
                                    <th>Action</th>
                                    
                                    </tr>
                                </thead>
                                {this.state.booksInCart.map(lis=>(
                                     
                                     <tbody key={lis.bookid}>    
                                    <tr> 
                                        <td>{lis.title}</td>
                                        <td>{lis.author}</td>
                                        <td>Rs.{lis.price}</td>
                                        <td>{lis.quantity}</td>
                                        {/* <td>
                                        <AddCircleOutlineIcon style={{cursor:"pointer"}} onClick={()=>{this.quantityIncrease(lis.bookid); this.totalPrice();}}/>
                                        <RemoveCircleOutlineIcon style={{cursor:"pointer"}} onClick={()=>{this.quantityDecrease(lis.bookid); this.totalPrice();}}/>
                                        </td> */}
                                        <td> <button  id="remove" onClick={()=>this.remove(lis.bookid)}>Remove</button></td>
                                     </tr>
                                     
                                    </tbody>
                                    
                                    
                                    ))}
                                    
                                    </table>  
                                <h3 id="total">Total : Rs.{this.state.total}</h3>
                                <button id="place-order-btn" onClick={this.placeOrder}>Place Order</button>
                            </div>)        
                            :<h2>Cart is empty</h2>
                        }
                        {
                            
                        }

                </div>



            </div>
        );
    }

}
export default ViewCart;
