<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreMessageRequest;
use App\Models\User;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $messages = Message::where('user_id', auth()->user()->id)->orWhere('receiver_id', auth()->user()->id)->get();
        $idssend = $messages->pluck('user_id')->toArray();
        $idsrec = $messages->pluck('receiver_id')->toArray();
        $ids = array_merge($idssend, $idsrec);
        $idsClear = array_values(array_unique(array_diff($ids, array(auth()->user()->id))));

        $chats = array();
        foreach ($idsClear as $id) {
            $groupMessagesSend = $messages->where('user_id', $id);
            $groupMessagesRec = $messages->where('receiver_id', $id);
            $groupMessages = $groupMessagesSend->merge($groupMessagesRec);
            $user = User::find($id);
            $groupMessages->put('user', $user);

            $chats[] = $groupMessages;
        }


        // $messagesSend = Message::where('user_id', auth()->user()->id)->get();
        // $messagesReceive = Message::Where('receiver_id', auth()->user()->id)->get();

        return response()->json([
            // 'send' => $messagesSend,
            // 'receive' => $messagesReceive,
            'message' => $chats
        ]);
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
