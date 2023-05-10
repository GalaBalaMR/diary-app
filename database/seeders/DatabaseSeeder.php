<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Note;
use App\Models\Message;
use App\Models\Todo;
use App\Models\TodoCategory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory(10)->create();

        Message::factory(50)->create();
        Note::factory(30)->create();
        TodoCategory::factory(10)->create();
        Todo::factory(30)->create();
    }
}
