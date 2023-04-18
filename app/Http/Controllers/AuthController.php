<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;

class AuthController extends Controller
{
    use HttpResponses;

    public function login(LoginUserRequest $request)
    {
        $request->validated($request->all());

        if( !Auth::attempt(['email' => $request->email, 'password' => $request->password]))
        {
            return $this->error('', 'Credentials do not match!', '401');
        }

        $user = User::where('email', $request->email)->first();

        return $this->success([
            'user' => $user,
        ]);
    }

    public function register(StoreUserRequest $request)
    {
        $request->validated($request->all());

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'description' => $request->description,
            'password' => Hash::make($request->password)
        ]);

        return $this->success([
            'user' => $user,
        ]);
    }

    public function logout()
    {
        Auth::logout();

        return $this->success([
            'message' => 'You have successfully been logged out...'
        ]);
    }

    public function getUser()
    {
        if (Auth::user()) {   // Check is user logged in
            return response()->json([
                'user' => Auth::user(),
            ]);
        } else {
            return $this->error('', 'User is not logged.', '401');
        }
    }
}
