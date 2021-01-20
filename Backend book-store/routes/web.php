<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});


  
$router->post('register', 'AuthController@register');
$router->post('login', 'AuthController@login');
$router->get('logout', 'AuthController@logout');

$router->post('/add-category', 'CategoryController@add');

$router->get('/show-categories', 'CategoryController@getCategories');

$router->delete('/delete-category/{id}', 'CategoryController@deleteCategory');
$router->delete('/delete-catbooksdel/{id}', 'BookController@categoryBooksDel');
$router->put('/edit-category', 'CategoryController@editCategory');

$router->put('/edit-catbooks', 'BookController@categoryInBooks');
$router->delete('/delete-book/{id}', 'BookController@deletebook');
$router->put('/edit-book', 'BookController@editBook');
$router->post('/add-book', 'BookController@add');
$router->get('/show-books', 'BookController@getBooks');

$router->post('/add-order', 'OrderController@add');
//$router->get('/my-orders', 'OrderController@myOrders');
$router->post('/my-orders', 'OrderController@myOrders');
$router->get('/my-orders-bklist', 'OrderController@myOrdersList');

// $router->get('/all-orders', 'OrderController@allOrders');
$router->get('/all-orders', 'OrderController@allOrdersInf');


$router->delete('/delete-order/{id}', 'OrderController@deleteOrder');
    

$router->post('/upload-img', 'BookController@uploadImage');
$router->post('/upload-images', 'BookController@uploadOtherImages');

$router->post('/ordered-books', 'OrderedBooks@addOrderedBooks');
