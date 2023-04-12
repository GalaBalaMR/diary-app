<?php

namespace App\Models;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TodoCategory extends Model
{
    use HasFactory;

    protected $table = "todo_categories";
    
    protected $guarded = ['id'];

    public function todoes()
    {
        return $this->belongsToMany(Todo::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }


}
