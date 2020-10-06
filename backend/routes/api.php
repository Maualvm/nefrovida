<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BeneficiariosController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/jornadas', 'App\Http\Controllers\JornadaController@all');
Route::get('/jornadas/{id}', 'App\Http\Controllers\JornadaController@search');
Route::post('/jornadas', 'App\Http\Controllers\JornadaController@insert');
Route::delete('/jornadas/{id}', 'App\Http\Controllers\JornadaController@delete');


Route::get('/escolaridades', 'App\Http\Controllers\EscolaridadesController@all');

//todas las rutas de beneficiarios
Route::resource('beneficiarios', BeneficiariosController::class);
Route::post('/beneficiarios/insert', 'App\Http\Controllers\BeneficiariosController@insert');

