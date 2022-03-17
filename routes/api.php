<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Country;
use App\Helpers\LatLng;

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

Route::post('country', function(Request $request) {
    $reset_flag = false;
    $country = Country::whereNotIn('id', $request->avoid !== null ? $request->avoid : [])->get()->shuffle()->first();
    if(!$country) {
        // we dont have any countries left to filter by, reset
        $country = Country::get()->shuffle()->first();
        $reset_flag = true;
    }
    return [
        'reset_flag' => $reset_flag,
        'country_id' => $country->id,
        'flag_url' => $country->flag_url,
        'country_list' => Country::get(['name'])->pluck('name')
    ];
});

Route::post('guess', function(Request $request) {
    $answer = Country::findOrFail($request->answer);
    $guess = Country::where('name', $request->guess)->firstOrFail();
    if($answer->id === $guess->id) {
        return [
            'guess' => $request->guess,
            'status' => true,
            'bearing' => 0,
            'distance' => 0,
            'percent' => 100,
            'country' => $answer
        ];
    } else {
        $distance = LatLng::distance($guess->latitude, $guess->longitude, $answer->latitude, $answer->longitude);
        $bearing = LatLng::bearing($guess->latitude, $guess->longitude, $answer->latitude, $answer->longitude);
        $percent = (1 - ($distance / 21600)) * 100;
        return [
            'guess' => $request->guess,
            'status' => false,
            'distance' => $distance,
            'percent' => $percent,
            'bearing' => $bearing,
            'country' => intval($request->attempt) === 6 ? $answer : null
        ];
    }

});
