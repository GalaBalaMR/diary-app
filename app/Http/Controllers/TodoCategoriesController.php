<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Models\TodoCategory;
use Illuminate\Http\Request;
use App\Http\Requests\TodoCategoryStoreRequest;

class TodoCategoryCategoriesController extends Controller
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
        $todoCategories = TodoCategory::where('user_id', auth()->user()->id)->get();

        return response()->json([
            'todoCategories' => $todoCategories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TodoCategoryStoreRequest $request)
    {
        $request->validated($request->all());

        $todoCategory = TodoCategory::create([
            'title' => $request->title,
            'body' => $request->body,
            'user_id' => auth()->user()->id
        ]);

        return response()->json([
            'status' => 'ok',
            'note' => $todoCategory
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(TodoCategory $todoCategory)
    {
        return response()->json([
            'note' => $todoCategory,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TodoCategory $todoCategory)
    {
        $todoCategory->update([
            'title' => $request->title,
            'body' => $request->body,
            'user_id' => auth()->user()->id
        ]);

        return response()->json([
            'status' => 'ok',
            'note' => $todoCategory
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TodoCategory $todoCategory)
    {
        $todoCategory->delete();

        return response()->json([
            'status' => 'ok',
            'message' => 'Your todoCategories was delete...'
        ]);
    }

    public function restore($id)
    {
        $todoCategory = TodoCategory::withTrashed()->find($id);
        $helper = Helper::isUserNotAuthenticated($todoCategory);

        if ($helper !== true) {
            return $helper;
        };

        $todoCategory->restore();

        return response()->json([
            'status' => 'ok',
            'message' => 'Your todoCategories was restore...'
        ]);
    }
}
