<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Helpers\Helper;
use Illuminate\Http\Request;
use App\Http\Requests\NoteStoreRequest;

class NoteController extends Controller
{

    /**
     * Add middleware for some route
     */
    public function __construct()
    {
        $this->middleware('UserAuthenticateForAction')->only(['show', 'update', 'create', 'destroy']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notes = Note::where('user_id', auth()->user()->id)->get();

        return response()->json([
            'notes' => $notes
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(NoteStoreRequest $request)
    {
        $request->validated($request->all());

        $note = Note::create([
            'title' => $request->title,
            'body' => $request->body,
            'good' => $request->good,
            'bad' => $request->bad,
            'user_id' => auth()->user()->id
        ]);

        return response()->json([
            'status' => 'ok',
            'note' => $note
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Note $note)
    {
        return response()->json([
            'note' => $note,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Note $note)
    {
        $note->update([
            'title' => $request->title,
            'body' => $request->body,
            'good' => $request->good,
            'bad' => $request->bad,
            'user_id' => auth()->user()->id
        ]);

        return response()->json([
            'status' => 'ok',
            'note' => $note
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        $note->delete();

        return response()->json([
            'status' => 'ok',
            'message' => 'Your notes was delete...'
        ]);
    }

    public function restore($id)
    {
        $note = Note::withTrashed()->find($id);
        $helper = Helper::isUserNotAuthenticated($note);

        if ($helper !== true) {
            return $helper;
        };

        $note->restore();

        return response()->json([
            'status' => 'ok',
            'message' => 'Your notes was restore...'
        ]);
    }
}
