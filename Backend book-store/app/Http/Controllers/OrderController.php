<?php

namespace App\Http\Controllers;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
use App\Models\Order;

class  OrderController extends BaseController
{
    public function __construct(Request $request)
    {
        $this->middleware('auth');
        $this->request=$request;
        $this->_dataModel=new Order();
    }

    public function add()
    {
     return $this->_dataModel->add($this->request->all());   
    }
    public function getOrders()
    {
     return $this->_dataModel->getOrders();   
    }
    // public function myOrders()
    // {
    //      return $result=$this->_dataModel->myOrders($this->request->input("email"));    
    // }

    public function myOrders()
    {
         return $result=$this->_dataModel->myOrders($this->request->all());    
    }
    public function myOrdersList()
    {
         return $result=$this->_dataModel->myOrdersList($this->request->input('email'));    
    }


    // public function allOrders()
    // {
    //      return $result=$this->_dataModel->allOrders();    
    // }

    public function allOrdersInf()
    {
         return $result=$this->_dataModel->allOrdersInf($this->request->all());    
    }
    
    public function deleteOrder($id)
    {
     return $this->_dataModel->deleteOrder($id);   
    }
}

?>