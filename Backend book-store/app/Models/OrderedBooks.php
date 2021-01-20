<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

use Illuminate\Support\Facades\DB;

class OrderedBooks extends Model
{
    
    public function __construct()
    {
        $this->MongoDBConnection = DB::connection('mongodb');
        $this->collection_name='orderedBooks';
    }

    public function addOrderedBooks($data)
    {
     
     $result=false;
        
        if(!empty($data)){
            $result=$this->MongoDBConnection
                        ->collection($this->collection_name)
                        ->insertGetId($data);
        }
        return $result;
    }

    


    // public function myOrders($email)
    // {
    //    return $result= $this->MongoDBConnection->collection($this->collection_name)->where("email", $email)->get();
        
    // }

}