<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class CustomerNewPassword extends Notification
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
                    ->subject('Изменение пароля.Турбо-Отчет')
                    ->line('Вам установлен новый парольдля доступа в Турбо.Отчет')
                    ->line('Ваш логин: '.$this->customer->email)
                    ->line('Ваш пароль: <b>'.$this->password.'</b>')
                    ->action('Турбо.отчет', url('/login'));
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
