<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class CustomerRegister extends Notification
{
    use Queueable;

    protected $customer;
    protected $password;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($customer,$password)
    {
        $this->customer = $customer;
        $this->password = $password;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->line('Вы успешно зарегистрировались на веб-сервисе Турбо.Отчет')
                    ->line('Ваш логин: <b>'.$this->customer->email.'</b>')
                    ->line('Ваш пароль: <b>'.$this->password.'</b>')
                    ->action('Начать пользоваться', url('/'))
                    ->line('Первый месяц пользования &mdash; БЕСПЛАТНО!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
