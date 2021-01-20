<?php
namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

use Illuminate\Support\Facades\DB;

class Book extends Model
{
    public function __construct()
    {
        $this->MongoDBConnection = DB::connection('mongodb');
        $this->collection_name='books';
    }

    public function add($data)
    {
        $result=false;
        
        if(!empty($data)){
            $result=$this->MongoDBConnection
                        ->collection($this->collection_name)
                        ->insertGetId($data);
        }
        return $result;
    }

    public function getBooks()
    {
        
       
        $result= $this->MongoDBConnection
                    ->collection($this->collection_name)    
                    ->get();
            return $result;
    }


    public function editBook($request)
    {
        $id=$request->input("id");
        $title=$request->input("title");
        $author=$request->input("author");
        $price=$request->input("price");
        $description=$request->input("description");
        $stock=$request->input('stock');
        $category=$request->input("category");
        $categoryId=$request->input("categoryId");
        $image=$request->input("image");
        $images=$request->input("images");
        
        return Book::where("_id",$id)
                    ->update(["title"=>$title,
                             "author"=>$author,
                             "price"=>$price,
                             "description"=>$description,
                             "stock"=>$stock,
                             "category"=>$category,
                             "categoryId"=>$categoryId,
                             "frontimage"=>$image,
                             "otherimages"=>$images
                           ]);
    }


    public function deleteBook($id)
    {
     return $this->MongoDBConnection
                    ->collection($this->collection_name)
                    ->where("_id", $id)->delete();   
                
    }

    public function categoryBooksDel($id)
    {
     return $this->MongoDBConnection
                    ->collection($this->collection_name)
                    ->where("categoryId", $id)->delete();    
    }
    
    public function categoryInBooks($request)
    {
        $id=$request->input("id");
        $category=$request->input("category");
     return Book::where("categoryId", $id)
                ->update(["category"=>$category]);
    }
}