<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model;

use Illuminate\Support\Facades\DB;

class Order extends Model
{

    public function __construct()
    {
        $this->MongoDBConnection = DB::connection('mongodb');
        $this->collection_name='orders';
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

    


    // public function myOrders($email)
    // {
    //    return $result= $this->MongoDBConnection->collection($this->collection_name)->where("email", $email)->get();
        
    // }
    public function myOrders($data)
    {
     $query= $this->MongoDBConnection->collection($this->collection_name)->where("email", $data['email']);
    
     if(!empty($data['sortval'])){       
        $values=$data['sortval'];
        $result =   $query->where('name','<>', 'admin')
                            ->skip($data['skip'])
                            ->take($data['limit'])
                            ->orderBy($values[0]['colId'],$values[0]['sort'])->get();
       
                                    
         }else{
            $result=$query->skip($data['skip'])
                ->take($data['limit'])->get();
         }                                                       
    return json_encode($result);
    }
    public function myOrdersList($email)
    {
       return $result= $this->MongoDBConnection->collection($this->collection_name)->where("email", $email)->get();
        
    }
    
    // public function allOrders()
    // {
    //     $result= $this->MongoDBConnection
    //                 ->collection($this->collection_name)    
    //                 ->get();
    //         return $result;

    // }

    public function allOrdersInf($data)
    {    $result= $this->MongoDBConnection
                        ->collection($this->collection_name)    
                        ->get();
                return $result;
        // $result= $this->MongoDBConnection
        //             ->collection($this->collection_name)
        //             ->where('name','<>', 'admin')
        //             ->skip($data['startRow'])
        //             ->take($data['endRow'])    
        //             ->get();
           
        // return $result;

    }
    public function deleteOrder($id)
    {
     return $this->MongoDBConnection
                    ->collection($this->collection_name)
                    ->where("_id", $id)->delete();    
    }
}