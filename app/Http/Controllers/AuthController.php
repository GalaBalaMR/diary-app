<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Intervention\Image\Facades\Image;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use Illuminate\Support\Facades\Storage;

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

        $pathImageThumb = '/storage/user/unknown/profile/unknown-thumbnail.jpeg';
        $pathImage = '/storage/user/unknown/profile/unknown-thumbnail.jpeg';
        
        if($request->hasFile('img')){
            $requestImg = $request->file('img');
            $requestExtension = $requestImg->getClientOriginalExtension();
            $image = Image::make($requestImg)->resize(1280, 720)->encode('jpg',80);
            $imageThumb = Image::make($requestImg)->resize(320, 240)->encode('jpg',80);
            Storage::put('public/user/profile/' . $request->name . '/' . $request->name . '-thumbnail.' . $requestExtension, $imageThumb); 
            Storage::put('public/user/profile/' . $request->name . '/' . $request->name . '.' . $requestExtension, $image); 
            $pathImageThumb = '/storage/user/' . $request->name . 'profile/' . $request->name . '-thumbnail.' . $requestExtension;
            $pathImage = '/storage/user/' . $request->name . 'profile/' . $request->name . '.' . $requestExtension;
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'description' => $request->description,
            'password' => Hash::make($request->password),
            'img' => $pathImage,
            'thumb' => $pathImageThumb,
        ]);

        Auth::loginUsingId($user->id);

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
                'status' => 'success'
            ]);
        } else {
            return response()->json(['status' => 'error']);
        }
    }
}
