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
    <link href="{{ asset('css/start.css') }}" rel="stylesheet">
    <!-- <script>
        window.Laravel={
            csrf_token:'{{csrf_token()}}',
            isAdmin:{{ Auth::guest()?'false':(Auth::user()->isAdmin()?'true':'false') }}
        };
    </script> -->

</head>

<body class="pushable">

    <!-- Following Menu -->
    <div class="ui large top fixed menu transition hidden">
        <div class="ui container">
            <a class="active item" href="/">Главная</a>
            <div class="right menu">
                @auth
                    <a class="ui basic inverted button" href="{{ url('/home') }}">Личный кабинет</a>
                @else
                    <a class="ui item basic button" href="{{ route('login') }}">Вход</a>
                    <a class="item basic blue button">
                            Заказать обратный звонок
                    </a>
                @endauth
            </div>
        </div>
    </div>

    <!-- Sidebar Menu -->
    <div class="ui vertical inverted sidebar menu left">
        <a class="active item">Home</a>
        <a class="item">Work</a>
        <a class="item">Company</a>
        <a class="item">Careers</a>
        <a class="item">Login</a>
        <a class="item">Signup</a>
    </div>


    <!-- Page Contents -->
    <div class="pusher">
        <div class="ui vertical inverted center aligned segement start-header">
            <div class="ui container">
                <div class="ui secondary large menu">
                    <!-- <a class="toc item">
                        <i class="sidebar white color icon"></i>
                    </a> -->
                    <!-- <a class="active item" href="/">Главная</a> -->
                    <!-- <a class="item">Work</a>
                    <a class="item">Company</a>
                    <a class="item">Careers</a> -->

                    <div class="right menu">
                        @auth
                            <a class="ui item link" href="{{ url('/home') }}">Личный кабинет</a>
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
            </div>
        </div>
        <div class="ui text middle center aligned container start">
            <h1 class="ui header">Хотите создавать и отправлять бухгалтерскую отчетность?</h1>
        </div>
        <div class="second-start">
            <div class="ui container">
                <div class="ui stackable grid">
                    <div class="column left aligned ten wide">
                        <h2>Попробуйте веб-сервис Турбо.Отчет &mdash; первый месяц бесплатно!</h2>
                        <p>Вся отчетность формируется автоматически на основании введенных Вами данных</p>
                        <p>А еще удобный и простой сервис позволяет расчитывать зарплату, начислять больничные и отпускные, вести бухгалтерский учет, формировать и оплачивать налоги и сборы</p>

                    </div>
                    <div class="column center aligned six wide register">
                        <h2>Начните бесплатный 30-дневный период</h2>
                        <form class="ui form" method="POST" action="{{ route('register') }}">
                            {{ csrf_field() }}
                            <div class="field @if($errors->has('email')) error @endif" style="text-align: left">
                                <div class="ui left icon input">
                                    <i class="ui mail icon"></i>
                                    <input type="email" name="email" required placeholder="Ваша электронная почта" value="{{ old('email') }}"/>
                                </div>
                                @if($errors->has('email'))
                                    <div class="ui pointing red label">{{ $errors->first('email') }}</div>
                                @endif
                            </div>
                            <div class="field">
                                <div class="ui left icon input">
                                    <i class="ui phone icon"></i>
                                    <input type="phone" name="phone" required placeholder="Мобильный телефон" value="{{ old('email') }}" />
                                </div>
                            </div>
                            <div class="field center aligned">
                                <button type="submit" class="ui large primary icon button">Начать пользоваться <i class="right arrow icon"></i></button>
                            </div>
                        </form>
                        <div class="ui center aligned text">
                            Используя сервис, Вы соглашаетесь соблюдать правила <a>Лицензионного договора</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="ui vertical stripe segment">
            <div class="ui middle aligned stackable grid container">
                <div class="row">
                    <div class="eight wide column">
                        <h3 class="ui header">We Help Companies and Companions</h3>
                        <p>We can give your company superpowers to do things that they never thought possible. Let us delight your customers and empower your needs...through pure data analytics.</p>
                        <h3 class="ui header">We Make Bananas That Can Dance</h3>
                        <p>Yes that's right, you thought it was the stuff of dreams, but even bananas can be bioengineered.</p>
                    </div>
                    <div class="six wide right floated column">
                        <img src="/images/white-image.png" class="ui large bordered rounded image">
                    </div>
                </div>
                <div class="row">
                    <div class="center aligned column">
                        <a class="ui huge button">Check Them Out</a>
                    </div>
                </div>
            </div>
        </div>


        <div class="ui vertical stripe quote segment">
            <div class="ui equal width stackable internally celled grid">
                <div class="center aligned row">
                    <div class="column">
                        <h3>"What a Company"</h3>
                        <p>That is what they all say about us</p>
                    </div>
                    <div class="column">
                        <h3>"I shouldn't have gone with their competitor."</h3>
                        <p>
                            <img src="/images/nan.jpg" class="ui avatar image"> <b>Nan</b> Chief Fun Officer Acme Toys
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="ui vertical stripe segment">
            <div class="ui text container">
                <h3 class="ui header">Breaking The Grid, Grabs Your Attention</h3>
                <p>Instead of focusing on content creation and hard work, we have learned how to master the art of doing nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic and worth your attention.</p>
                <a class="ui large button">Read More</a>
                <h4 class="ui horizontal header divider">
        <a href="#">Case Studies</a>
      </h4>
                <h3 class="ui header">Did We Tell You About Our Bananas?</h3>
                <p>Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but its really true. It took years of gene splicing and combinatory DNA research, but our bananas can really dance.</p>
                <a class="ui large button">I'm Still Quite Interested</a>
            </div>
        </div>


        <div class="ui inverted vertical footer segment">
            <div class="ui container">
                <div class="ui stackable inverted divided equal height stackable grid">
                    <div class="three wide column">
                        <h4 class="ui inverted header">About</h4>
                        <div class="ui inverted link list">
                            <a href="#" class="item">Sitemap</a>
                            <a href="#" class="item">Contact Us</a>
                            <a href="#" class="item">Religious Ceremonies</a>
                            <a href="#" class="item">Gazebo Plans</a>
                        </div>
                    </div>
                    <div class="three wide column">
                        <h4 class="ui inverted header">Services</h4>
                        <div class="ui inverted link list">
                            <a href="#" class="item">Banana Pre-Order</a>
                            <a href="#" class="item">DNA FAQ</a>
                            <a href="#" class="item">How To Access</a>
                            <a href="#" class="item">Favorite X-Men</a>
                        </div>
                    </div>
                    <div class="seven wide column">
                        <h4 class="ui inverted header">Footer Header</h4>
                        <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src=" {{ asset('js/start.js') }}"></script>
</body>

</html>
