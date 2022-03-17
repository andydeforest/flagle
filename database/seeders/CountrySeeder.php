<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Country;

class CountrySeeder extends Seeder {
    /**
     * Run the database seeds and adds country flags with obfuscated name to public directory
     *
     * @return void
     */
    public function run() {
        Country::truncate();
        $this->clearFlags();

        if(!is_dir(public_path('images/flags'))) {
            mkdir('images/flags');
        }

        // load countries
        foreach(json_decode(file_get_contents(database_path('seeders/data/countries.json'))) as $country) {
            $filename = 'images/flags/'.bin2hex(random_bytes(20)).'.png';
            $filepath = public_path($filename);
            while(file_exists($filepath)) {
                // make sure we dont duplicate file names on the very off chance we generate the same random string
                $filename = 'images/flags/'.bin2hex(random_bytes(20)).'.png';
                $filepath = public_path($filename);
            }

            // check that our static asset exists for this country
            $static_flag = database_path('seeders/data/flags/'.strtolower($country->alpha2).'.png');

            if(!file_exists($static_flag)) {
                echo 'No flag for '.$country->alpha2."\n";
                continue;
            }

            // copy it with a new name to the public directory
            if(copy($static_flag, $filepath)) {
                Country::create([
                    'name' => $country->country,
                    'latitude' => intval($country->latitude),
                    'longitude' => intval($country->longitude),
                    'flag_url' => $filename
                ]);
            }
        }
    }

    private function clearFlags($path = 'images/flags') {
        foreach(scandir(public_path($path)) as $flag) {
            if($flag == '.' || $flag == '..') {
                continue;
            }
            unlink(public_path($path.'/'.$flag));
        }
    }
}
