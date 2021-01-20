<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Support\Facades\DB;

use Jenssegers\Mongodb\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

use MongoDB\BSON\Regex;

use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Model implements AuthenticatableContract, AuthorizableContract, JWTSubject
{
    use Authenticatable, Authorizable;
    

    public function __construct()
    {
        $this->MongoDBConnection = DB::connection('mongodb');
        $this->collection_name='users';       
    }

    public function register($data)
    {
        $result=false;
        if(!empty($data)){
            $result=$this->MongoDBConnection
                        ->collection($this->collection_name)
                        ->insertGetId(
                            [
                                'name'=>$data['name'],
                                'email'=>$data['email'],
                                'password'=>app('hash')->make($data['password']),
                                'address'=>$data['address']
                            ]);
        }
        return $result;
    }

   
    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        
        return [
                'name'  =>$this->name,
                'email' => $this->email,
                'address' => $this->address    
                ];
    }
}
