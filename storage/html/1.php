<?php
 /* Здесь проверяется существование переменных */
if (isset($_POST['phone'])) {$phone = $_POST['phone'];}
if (isset($_POST['name'])) {$name = $_POST['name'];}
if (isset($_POST['mail'])) {$mail = $_POST['mail'];}

/* Сюда впишите свою эл. почту */
 $address = "t.otchet@mail.ru";

/* А здесь прописывается текст сообщения, \n - перенос строки */
 $mes = "Тема:Заявка с сайта\nИмя: $name\nТелефон: $phone\nПочта: $mail\n";

/* А эта функция как раз занимается отправкой письма на указанный вами email */
$sub='Обращение на сайте'; //сабж
$email='admin@site.ru'; // от кого
 $send = mail ($address,$sub,$mes,"Content-type:text/plain; charset = utf-8\r\nFrom:$email");

ini_set('short_open_tag', 'On');
header('Refresh: 0; URL=thanks.html');
?>
