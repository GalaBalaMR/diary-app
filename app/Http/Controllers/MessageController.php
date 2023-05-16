<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreMessageRequest;
use App\Models\User;

use function GuzzleHttp\Promise\all;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $messages = Message::where('user_id', auth()->user()->id)->orWhere('receiver_id', auth()->user()->id)->orderBy('created_at', 'DESC')->get();
        
        $idssend = $messages->pluck('user_id')->toArray();
        $idsrec = $messages->pluck('receiver_id')->toArray();
        $ids = array_merge($idssend, $idsrec);
        $idsClear = array_values(array_unique(array_diff($ids, array(auth()->user()->id))));

        $chats = array();
        foreach ($idsClear as $id) {
            $groupMessagesSend = $messages->where('user_id', $id);
            $groupMessagesRec = $messages->where('receiver_id', $id);

            $groupMessages = $groupMessagesSend->merge($groupMessagesRec)->sortByDesc('created_at');
            
            $groupMessages->map(function ($message, $key) {
                $message->created_diff = $message->created_at->diffForHumans();
                return $message;
            });//add created_diff to collection for readable date

            $resetIdMessages = $groupMessages->reverse()->values();//reset id after previous line of sort by
            $user = User::find($id);

            $chats[] = ['chats' => $resetIdMessages, 'user' => $user];
        }

        // dd($chats);

        return response()->json([
            'message' => $chats
        ]);
    }


    public function newMessage() 
    {
        $authId = auth()->user()->id;
        // $oldUser = Message::where('user_id', $authId)->orWhere('receiver_id', $authId)->pluck('user_id', 'receiver_id')->toArray();
        $users_id = Message::where('user_id', $authId)->pluck('receiver_id')->toArray();
        $receiver_id = Message::where('receiver_id', $authId)->pluck('user_id')->toArray();
        $oldUser = array_unique(array_merge($users_id, $receiver_id));

        // add auth id for removing it in diff(easiest way)
        $oldUser[] = $authId;

        $allUsers = User::all()->pluck('id')->toArray();

        
        $noConnectedUserId = array_diff($allUsers, $oldUser);//compare and set new array
        $noConnectedUserId = array_values($noConnectedUserId);//reset key
        
        // dd([$allUsers, $oldUser, $noConnectedUserId]) ;
        $users = User::findMany($noConnectedUserId);

        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMessageRequest $request)
    {
        $request->validated($request->all());

        $message = Message::create([
            'body' => $request->body,
            'user_id' => auth()->user()->id,
            'receiver_id' => $request->receiver_id,
        ]);

        return response()->json([
            'status' => 'ok',
            'message' => 'Your message was send...',
            'item' => $message,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        return response()->json([
            'item' => $message,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        $helper = Helper::isUserNotAuthenticated($message);

        if ($helper !== true) {
            return $helper;
        };

        $message->delete();

        return response()->json([
            'status' => 'ok',
            'message' => 'Your message was deleted...'
        ]);
    }
}
