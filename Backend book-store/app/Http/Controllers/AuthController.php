<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\User;

class AuthController extends Controller
{
    public function __construct(Request $request)
    {
        $this->request=$request;
        $this->_dataModel=new User();
            
    }
    
    public function register()
    {   
        $this->validate($this->request, [
            'email' => 'email|unique:users' 
        ]);
         return $this->_dataModel->register($this->request->all());
            
    }
    
    public function login(Request $request)
    { 
      
        $credentials = $request->only(['email', 'password']);

        if (! $token = Auth::attempt($credentials)) {
            return response()->json(['message' => 'Unauthorized'], 401);
            
        }
        
        return $this->respondWithToken($token);
     }   

    public function logout () 
    {
        Auth::logout();
        return response()->json(['message' => 'Successfully logged out']);
        }
}