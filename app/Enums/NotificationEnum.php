<?php
  
namespace App\Enums;
 
enum NotificationEnum:string {
    case Message = 'message';
    case Internal = 'internal';
    case Error = 'error';
}