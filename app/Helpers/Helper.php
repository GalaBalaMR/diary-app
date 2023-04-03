<?php

namespace App\Helpers;

use App\Models\Employees;
use Illuminate\Support\Facades\Auth;

class Helper
{

    public static function isUserLogged()
    {
        if (!Auth::check()) {
            return response()->json(['status' => 'error', 'message' => 'You are not logged in'], 403);
        }
    }

    public static function isUserNotAuthenticated(object $model)
    {
        if (Auth::user()->id !== $model->user_id) {
            return response()->json(['status' => 'error', 'message' => 'You are not authorized for this action'], 403);
        }
    }
}
