<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Todo;
use App\Helpers\Helper;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use App\Http\Resources\TodoesResource;
use App\Http\Requests\TodoStoreRequest;

class TodoController extends Controller
{
    /**
     * Add middleware for some route
     */
    // public function __construct()
    // {
    //     $this->middleware('UserAuthenticateForAction')->only(['show', 'update', 'create', 'destroy']);
    // }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get the current date
        $currentDate = Carbon::now();

        // Get yesterday's date
        $yesterdayDate = Carbon::yesterday();

        // Calculate the start and end dates for the next week
        $nextWeekStartDate = $currentDate->copy()->startOfWeek()->addWeek(1);
        $nextWeekEndDate = $nextWeekStartDate->copy()->endOfWeek();

        // Calculate the start date for the last 7 days
        $lastSevenDaysStartDate = $yesterdayDate->copy()->subDays(6);

        // Create a CarbonPeriod for the next week
        $nextWeekPeriod = CarbonPeriod::create($currentDate, $nextWeekEndDate);


        // Create a CarbonPeriod for the last 7 days
        $lastSevenDaysPeriod = CarbonPeriod::create($lastSevenDaysStartDate, $yesterdayDate);

        
        $nextWeekDates = [];
        foreach ($nextWeekPeriod as $date) {
            $nextWeekDates[] = $date->format('Y-m-d');
        }

        
        // Convert the CarbonPeriod to an array of formatted date strings
        $lastSevenDaysDates = [];
        foreach ($lastSevenDaysPeriod as $date) {
            $lastSevenDaysDates[] = $date->format('Y-m-d');
        }
        
        $allDays = array_merge($lastSevenDaysDates, $nextWeekDates);
        
        $nowFormat = $currentDate->format('Y-m-d');

        foreach($allDays as $key => $day){
            if($day === $nowFormat){
                $allDays[$key] = ["date" => $day, "todo" => [], "day" => Carbon::createFromDate($day)->dayOfWeek, "now" => "true"];
            }else{
                $allDays[$key] = ["date" => $day, "todo" => [], "day" => Carbon::createFromDate($day)->dayOfWeek, "now" => "false"];
            }
        }

        $todoes = Todo::where('user_id', 11)->get();

        foreach($todoes as $todo){
            foreach($allDays as $key => $day){
                if($todo->date === $day['date']){
                    $allDays[$key]['todo'][] = $todo;
                }
            }
        }

        return response()->json([
            'todoes' => $allDays
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TodoStoreRequest $request)
    {
        $request->validated($request->all());

        if ($request->has('todo_categories')) {
            $todoCategories = $request->todo_categories;
        }

        $todo = Todo::create([
            'title' => $request->title,
            'body' => $request->body,
            'date' => $request->date,
            'time' => $request->time,
            'user_id' => auth()->user()->id
        ]);

        if (isset($todoCategories)) {
            $todo->todoCategories()->attach($todoCategories);
        }

        return response()->json([
            'status' => 'ok',
            'todo' => $todo
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        return new TodoesResource($todo);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo)
    {
        if ($request->has('todo_categories')) {
            $todoCategories = $request->todo_categories;
        }

        $todo->update([
            'title' => $request->title,
            'body' => $request->body,
            'date' => $request->date,
            'time' => $request->time,
            'user_id' => auth()->user()->id
        ]);

        if (isset($todoCategories)) {
            $todo->todoCategories()->detach();
            $todo->todoCategories()->attach($todoCategories);
        }

        return response()->json([
            'status' => 'ok',
            'todo' => $todo
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
