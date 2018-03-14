<?php 
	namespace PHPMailer\PHPMailer;
	include 'Exception.php';
	include 'OAuth.php';
	include 'PHPMailer.php';
	include 'POP3.php';
	include 'SMTP.php';

		$mail = new PHPMailer;
		//будем отравлять письмо через СМТП сервер
		$mail->isSMTP();
		//хост
		$mail->Host = 'smtp.yandex.ru';
		//требует ли СМТП сервер авторизацию/идентификацию
		$mail->SMTPAuth = true;
		// логин от вашей почты
		$mail->Username = 'servermessagesgpoint@yandex.ru';
		// пароль от почтового ящика
		$mail->Password = 'smtp_server_jpoint_smtp';
		//указываем способ шифромания сервера
		$mail->SMTPSecure = 'ssl';
		//указываем порт СМТП сервера
		$mail->Port = '465';
		 
		//указываем кодировку для письма
		$mail->CharSet = 'UTF-8';
		//информация от кого отправлено письмо
		$mail->From = 'servermessagesgpoint@yandex.ru';
		//название сообщения
		$mail->FromName = 'Купиунты.рф';
		//На какой адрес будет отправлено письмо
		$mail->addAddress('tochkasever@yandex.ru');
		 
		$mail->isHTML(true);	