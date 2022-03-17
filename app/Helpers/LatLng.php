<?php

namespace App\Helpers;

class LatLng {

    public static function distance($lat1, $lng1, $lat2, $lng2) {
        $theta = $lng2 - $lng1;
        $dist = sin(deg2rad($lat2)) * sin(deg2rad($lat1)) +  cos(deg2rad($lat2)) * cos(deg2rad($lat1)) * cos(deg2rad($theta));
        $dist = acos($dist);
        $dist = rad2deg($dist);
        $miles = $dist * 60 * 1.1515;
        return $miles * 0.868976;
    }

    public static function bearing($lat1, $lng1, $lat2, $lng2) {
        $dLon = deg2rad($lng2) - deg2rad($lng1);
        $dPhi = log(tan(deg2rad($lat2) / 2 + pi() / 4) / tan(deg2rad($lat1) / 2 + pi() / 4));
        if(abs($dLon) > pi()) {
            if($dLon > 0) {
                $dLon = (2 * pi() - $dLon) * -1;
            }
            else {
                $dLon = 2 * pi() + $dLon;
            }
        }
        return (rad2deg(atan2($dLon, $dPhi)) + 360) % 360;
    }

}
