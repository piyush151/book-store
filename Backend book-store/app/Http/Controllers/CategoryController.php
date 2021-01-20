<?php

namespace App\Http\Controllers;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
use App\Models\Category;

class  CategoryController extends BaseController
{
    public function __construct(Request $request)
    {
        $this->middleware('auth');
        $this->request=$request;
        $this->_dataModel=new Category();
    }

    public function add()
    {
     return $this->_dataModel->add($this->request->all());   
    }
    public function getCategories()
    {
     return $this->_dataModel->getCategories();   
    }
    public function deleteCategory($id)
    {
     return $this->_dataModel->deleteCategory($id);   
    }

    public function editCategory(Request $request)
    {
        return $this->_dataModel->editCategory($request);   
    }
}

?>