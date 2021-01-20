<?php
//use Log;
namespace App\Http\Controllers;
use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Book;
use Illuminate\Support\Facades\Log;



class  BookController extends BaseController
{
    public function __construct(Request $request)
    {
       // $this->middleware('auth');
        $this->request=$request;
        $this->_dataModel=new Book();
    }

    public function add()
    {
     return $this->_dataModel->add($this->request->all());  
        
    }
    public function getBooks()
    {
        // error_log("show all books");
        // Log::info('Show all books');
     return $this->_dataModel->getBooks();   
        
    }
    public function editBook(Request $request)
    {
        return $this->_dataModel->editBook($request);
        
    }

    public function deleteBook($id)
    {
     return $this->_dataModel->deleteBook($id);   
    }
    public function categoryBooksDel($id)
    {
     return $this->_dataModel->categoryBooksDel($id);   
    }
    public function categoryInBooks(Request $request)
    {
     return $this->_dataModel->categoryInBooks($request);   
    }

    public function uploadImage(Request $request)
    {


        if ($request->hasFile('image')) {
            $filename = $request->file('image')->getClientOriginalName();
            
            $destinationPath = './upload/front_cover/';

            $image = time().$filename;
                        
            if ($request->file('image')->move($destinationPath, $image)) {
                 $book = '/upload/front_cover/'.$image;
                return json_encode($book);
             }
        } 

    }

     
    // $original_filename_arr = explode('.', $original_filename);
            // $file_ext = end($original_filename_arr);
            // $allowed_exts = array('jpg', 'jpeg', 'png');
            // if(!in_array($file_ext, $allowed_exts)){
            //  return response()->json(['status' => 'error', 'error' => 'Only Image File']);  
            // }
            // $image = time() . '.' . $file_ext;



    public function uploadOtherImages(Request $request)
    {
        
        $file_ary = array();
        $file_count  = count($request->file('images') );
        
        $a=($request->file('images'));
        $finalArray=array();
        
        for ($i=0; $i<$file_count; $i++) {
                $fileName = time().$a[$i]->getClientOriginalName();
                $destinationPath = './upload/other_images/';
              
                $finalArray[$i]['images']='/upload/other_images/'.$fileName;
                $a[$i]->move($destinationPath,$fileName);
        }
       return json_encode($finalArray); 
        
        
    } 
    

}

?>