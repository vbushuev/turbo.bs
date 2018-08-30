let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */


mix.react('resources/assets/js/app.js', 'public/js');

mix.stylus('resources/assets/stylus/react.styl', 'public/css');

mix.stylus('resources/assets/page/start.styl', 'public/css')
    .js('resources/assets/page/start.js','public/js')
    .stylus('resources/assets/home/home.styl', 'public/css')
    .js('resources/assets/home/home.js','public/js')
    .copy('resources/assets/semantic/semantic.min.css', 'public/css/semantic.min.css')
    .copy('resources/assets/fonts/segoeuil-webfont.woff', 'public/fonts/segoeuil-webfont.woff')
    .copy('resources/assets/semantic/themes', 'public/css/themes');
