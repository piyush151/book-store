<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

use Illuminate\Support\Facades\DB;

class Category extends Model
{
    public function __construct()
    {
        $this->MongoDBConnection = DB::connection('mongodb');
        $this->collection_name='categories';
    }

    public function add($data)
    {
        $result=false;
        
        if(!empty($data)){
            $result=$this->MongoDBConnection
                        ->collection($this->collection_name)
                        ->insertGetId($data);
        }
        return Category::all();
    }

    public function getCategories()
    {
        $result= $this->MongoDBConnection
                    ->collection($this->collection_name)    
                    ->get();
            return json_encode($result);
    }

    public function deleteCategory($id)
    {
     return $this->MongoDBConnection
                    ->collection($this->collection_name)
                    ->where("_id", $id)->delete();    
    }

    public function editCategory($request)
    {
        $id=$request->input("id");
        $category=$request->input("category");
        return Category::where('_id',$id)
                        ->update(["category"=>$category]);
    }

}