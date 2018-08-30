<!doctype html>
<html lang="{{ app()->getLocale() }}">

<head>
    <!-- Meta -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
    <!-- SEO Meta -->
    <meta name="description" content="turbo, отчетность">
    <meta name="keywords" content="">
    <!-- Favicon -->
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link href="{{ asset('css/semantic.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/home.css') }}" rel="stylesheet">
    <!-- <script>
        window.Laravel={
            csrf_token:'{{csrf_token()}}',
            isAdmin:{{ Auth::guest()?'false':(Auth::user()->isAdmin()?'true':'false') }}
        };
    </script> -->

</head>

<body class="pushable">
    <!-- Sidebar Menu -->
    <div class="ui vertical grey inverted right settings wide overlay sidebar menu">
        <a class="active item">Home</a>
        <a class="item">Work</a>
        <a class="item">Company</a>
        <a class="item">Careers</a>
        <a class="item">Login</a>
        <a class="item">Signup</a>
    </div>
    <div class="ui vertical inverted right support wide sidebar">
        <div class="ui header">
            {{ __('home.support') }}
        </div>
    </div>
    <div class="ui secondary top menu">
        <div class="item">
            <div class="ui header">
                {{ __('home.app_name') }}
            </div>
        </div>
        <!-- <a class="toc item">
            <i class="sidebar white color icon"></i>
        </a> -->
        <!-- <a class="active item" href="/">Главная</a> -->
        <!-- <a class="item">Work</a>
        <a class="item">Company</a>
        <a class="item">Careers</a> -->

        <div class="right menu">
            @auth
                <a class="ui item" id="settings">
                    <i class="ui settings icon"></i>
                    {{ __('home.settings') }}
                </a>
                <a class="ui item" id="support">
                    <i class="ui question icon"></i>
                    {{ __('home.support') }}
                </a>
            @else
                <a class="ui link item" href="{{ route('login') }}">Вход</a>
                <div class="ui item">
                    <button class="ui primary button">
                        Заказать обратный звонок
                    </button>

                </div>
            @endauth
        </div>
    </div>
    <div class="pusher">
        @yield('content')
    </div>
    <script src=" {{ asset('js/home.js') }}"></script>
</body>
</html>
