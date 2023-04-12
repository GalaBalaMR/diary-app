<?php

namespace App\Models;

use Carbon\Carbon;
use App\Models\TodoCategory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

class Todo extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "todoes";

    protected $guarded = ['id'];

    protected $dates = ['date', 'created_at', 'updated_at', 'deleted_at'];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function todoCategories()
    {
        return $this->belongsToMany(TodoCategory::class)->withTimestamps();
    }
}
