<p align="center"><img src="/public/images/icon-color-large.png" width="75"></p>

# Flagle

Flagle is a guessing game which presents the user with a country's flag, and gives them six tries to guess what country it belongs to. If an incorrect guess is given, you will receive the proximity of the correct country based on the incorrectly guessed country. Get the country correct within six tries, and you win! See how long you can keep your streak going!

Flagle was inspired by [Wordle](https://www.nytimes.com/games/wordle/index.html) and [Worldle](https://worldle.teuteuf.fr/). It was developed to help me learn Vue.js, Inertia.js, and Tailwindcss better, and is not (nor is it intended to be) perfect.

Demo available here: [https://flagledemo.herokuapp.com/](https://flagledemo.herokuapp.com/)

## Prerequisites

Flagle is built on top of [Laravel 8](https://laravel.com/) and requires PHP 7.3+, as well as a JavaScript package manager such as [npm](https://npmjs.com).

## Install

Clone this repository

```
git clone https://github.com/andydeforest/flagle && cd flagle
```
Install the PHP dependencies
```
composer install
```
Generate an application key
```
php artisan key:generate
```
Migrate & seed the database
```
php artisan migrate:refresh --seed
``` 
Install the front-end dependencies
```
npm install
```
Compile the front-end assets
```
npm run dev
```
Run the development server
```
php artisan serve
```
Voilà!

## Built With
* [Laravel 8](https://laravel.com)
* [Inertia.js](https://inertiajs.com/)
* [VueJS](https://vuejs.org/)
* [Fuse.js](https://fusejs.io/)
* [vuex-persist](https://github.com/championswimmer/vuex-persist)
* [flagpedia.net](flagpedia.net)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
