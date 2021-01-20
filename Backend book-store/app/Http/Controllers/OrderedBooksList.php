<?php

namespace App\Http\Controllers;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
use App\Models\OrderedBooks;

class  OrderBookList extends BaseController
{
    public function __construct(Request $request)
    {
        //$this->middleware('auth');
        $this->request=$request;
        $this->_dataModel=new OrderedBooks();
    }

    public function addOrderedBooks()
    {
     return $this->_dataModel->addOrderedBooks($this->request->all());   
    }
    // public function getOrders()
    // {
    //  return $this->_dataModel->getOrders();   
    // }
    
 
}

?>