<?php

namespace App\Models;

use App\Models\TodoCategory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Todo extends Model
{
    use HasFactory;

    protected $table = "todoes";

    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function todoCategories()
    {
        return $this->belongsToMany(TodoCategory::class);
    }
}
