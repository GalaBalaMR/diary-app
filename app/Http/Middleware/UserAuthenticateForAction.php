<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserAuthenticateForAction
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $url = explode('/', $request->route()->uri);
        $model = Str::singular($url[1], 2);
        $user_id = $request->$model->user_id;

        if(auth()->user()->id === $user_id)
        {
            return $next($request);
        }
        else
        {
            return response()->json([
                'status' => 'error',
                'message' => 'You are not authorize for this action...'
            ], 403);
        }

    }
}
