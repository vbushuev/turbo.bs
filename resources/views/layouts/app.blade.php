<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <title>Легкая и&#160;быстрая подготовка и&#160;отправка отчетности</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="/theme/1/combined_landing_3D28747673A628E33444CA970CC00D2E.css" />
    <link rel="stylesheet" type="text/css" href="{{ asset('public/css/start.css') }}" />
    <style type="text/css">
        .separator {
            background: transparent;
            margin: 0;
            background: #eeeeee;
            height: 2px;
        }
        hr {
            width: 940px;
            margin: 70px auto;
        }
        .infoBlock-img {
            float: left;
            margin-bottom: 104px;
            margin-right: 12px;
        }
        .landing-page-layout {
            min-height: 20px;
        }
        .img-center {
            margin: 0 auto !important;
        }
    </style>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    <script type="text/javascript" src="/theme/1/light.js"></script>
</head>
<body class="m-a-0" data-kontur-counter="1529672241">
    <div id="pageWrapper" class="page-layout page-layout_landing">
        <div class="page-layout__inner">
            <div class="page-layout__header">
                <div class="stick">
                    <div class="stick__inner container row-table">
                        <div class="col-xs-10 col-height col-middle p-l-0">
                            <a style="margin: 0;height: 65px" href="/?utm_source=localhost&amp;utm_medium=referral" class="display-inline-block logo-landing">
                                <img src="/mini.png" alt="Турбо Отчет">
                            </a>
                        </div>
                        <div class="col-xs-2 col-height col-middle text-right p-r-0">
                            <a href="#" onclick="document.getElementById('logoutForm').submit()" class="text-nowrap" style="margin-right:2em;">Выход</a>
                            <form id="logoutForm" class="hide" method="post" action=" {{ route('logout') }}">{{ csrf_field() }}</form>
                        </div>
                        <div class="col-xs-2 col-height col-middle text-right p-r-0">
                            <a href="#" class="text-nowrap text-semibold js-callback-link">Заказать обратный звонок</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="page-layout__content">
                <div class="p-t-lg">
                    @yield('content')
                </div>
            </div>
            <div class="page-layout__footer">
                <div class="footer container row-table">
                    <div class="col-xs-10 col-height col-middle p-l-0">
                        <div class="footer-logo">
                            <span class="footer-logo__text hidden-xs hidden-sm">с 2018 года</span>
                        </div>
                    </div>
                    <div class="col-xs-2 col-height col-middle text-right p-r-0">
                        <a href="#" class="text-nowrap text-semibold js-callback-link">Заказать обратный звонок</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="/theme/1/lightbox.js"></script>
    <div class="hide">
        <div id="CallRequestLightboxContent" data-event-name="obratnyj-zvonok">
            <div class="lightbox-title" data-on-submit="hide">Заказать звонок</div>
            <form action="1.php" class="formz" data-event-name="otpravka-obratnogo-zvonka" method="post" id="myform" name="myform">
                <div class="js-successMessage text-center" style="line-height: 1.45;"></div>
                <div class="form-row">
                    <div class="form-input-wrap">
                        <input class="form-input" name="name" placeholder="Имя" type="text" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-input-wrap">
                        <input class="form-input js-phone" data-val="true" data-val-canonicalphone="Телефон должен состоять из 10 цифр" data-val-requiredlocalized="Заполните поле" name="phone" placeholder="Телефон" type="text" required>
                    </div>
                </div>
                <input class="js-callback-type" data-val="true" data-val-required="Заполните поле" name="CallbackOrderForm.Type" type="hidden" value="Normal" />
                <div class="form-row hide">
                    <div class="form-input-wrap">
                        <input name="Email" placeholder="Почта" type="email" value="" />
                        <input name="mail" placeholder="Почта" type="email" value="" />
                    </div>
                </div>
                <div class="hide" data-lightbox-role="bottom-panel">
                    <div class="policy">
                        Отправляя заявку, я&nbsp;соглашаюсь на&nbsp;<a href="polit.html" target="_blank">обработку персональных данных</a> и&nbsp;получение информационных сообщений от компании Турбо.Отчет.
                    </div>
                    <button type="submit" id="mylink" class="btn btn-sm btn-secondary m-r-xs" onclick="document.myform.submit();">
                        Отправить
                    </button>
                </div>
            </form>
        </div>
    </div>
    <script>
        $(function() {
            Kontur.CallbackLightbox.init('.js-callback-link', {
                lightbox: '#CallRequestLightboxContent',
                wrapperStyle: {
                    width: '430px'
                },
                lightboxClass: 'callback-lightbox'
            });
            // Kontur.CallbackLightbox.init('.js-login-link', {
            //     lightbox: '#LoginLightboxContent',
            //     wrapperStyle: {
            //         width: '430px'
            //     },
            //     lightboxClass: 'login-lightbox'
            // });
        });
    </script>
    @stack('script')
</body>
</html>
