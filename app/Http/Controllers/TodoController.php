<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Helpers\Helper;
use Illuminate\Http\Request;
use App\Http\Requests\TodoStoreRequest;

class TodoController extends Controller
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
        $todoes = Todo::where('user_id', auth()->user()->id)->with('todoCategories')->get();

        return response()->json([
            'todoes' => $todoes
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TodoStoreRequest $request)
    {
        $request->validated($request->all());

        $todo = Todo::create([
            'title' => $request->title,
            'body' => $request->body,
            'todocategory_id' => $request->todocategory_id,
            'user_id' => auth()->user()->id
        ]);

        return response()->json([
            'status' => 'ok',
            'note' => $todo
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        return response()->json([
            'note' => $todo,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo)
    {
        $todo->update([
            'title' => $request->title,
            'body' => $request->body,
            'todocategory_id' => $request->todocategory_id,
            'user_id' => auth()->user()->id
        ]);

        return response()->json([
            'status' => 'ok',
            'note' => $todo
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();

        return response()->json([
            'status' => 'ok',
            'message' => 'Your todoes was delete...'
        ]);
    }

    public function restore($id)
    {
        $todo = Todo::withTrashed()->find($id);
        $helper = Helper::isUserNotAuthenticated($todo);

        if ($helper !== true) {
            return $helper;
        };

        $todo->restore();

        return response()->json([
            'status' => 'ok',
            'message' => 'Your todoes was restore...'
        ]);
    }
}
