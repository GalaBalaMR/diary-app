<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notifications = Notification::where('receiver_id', Auth::user()->id)->with("user")->get();

        return response()->json(['notifications' => $notifications]);
    }

    /**
     * Display a list of the undisplayed notification resource.
     */
    public function notDisplayed()
    {
        $notifications = Notification::where([['receiver_id', Auth::user()->id], ['displayed', 'false']])->with("user")->get();

        return response()->json(['notifications' => $notifications]);
    }

    /**
     * If was displayed, change to undisplayed.
     */
    public function changeToDisplayed()
    {
        $notifications = Notification::where([['receiver_id', Auth::user()->id], ['displayed', 'false']])->get();

        foreach( $notifications as $notif){
            $notif->displayed = 'true';
            $notif->save();
        }

        return response()->json(['notifications' => $notifications]);
    }

    /**
     * For updating chat.
     */
    // public function updateChat()
    // {
    //     $notifications = Notification::where([['receiver_id', Auth::user()->id], ['displayed', 'false']])->get();
    //     // dd($notifications);

    //     return response()->json(['notifications' => $notifications]);
    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Notification $notification)
    {
        //
    }

    /**
     * If was displayed, add false.
     */
    public function showed($id)
    {
        $notification = Notification::find($id);
        if (Auth::user()->id == $notification->receiver_id) {
            $notification->displayed = 'true';
            $notification->save();
        } else {
            return response()->json(['message' => 'Not alloved'], 403);
        }

        return response()->json(['message' => $notification]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Notification $notification)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Notification $notification)
    {
        //
    }
}
