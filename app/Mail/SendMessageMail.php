<?php

namespace App\Mail;

use App\Models\Notification;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Queue\SerializesModels;

class SendMessageMail extends Mailable
{
    use Queueable, SerializesModels;
    
    public $notification;

    /**
     * Create a new message instance.
     */
    public function __construct(Notification $notification)
    {
        $this->notification = $notification;
    }

    /**
     * Get the message content definition.
     */
    public function content()
    {
        return new Content(
            markdown: 'email.MessageMail',
        );
    }
}
