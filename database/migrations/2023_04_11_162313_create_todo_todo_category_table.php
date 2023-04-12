<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('todo_todo_category', function (Blueprint $table) {
            $table->foreignId('todo_id')->references('id')->on('todoes')->onDelete('cascade');
            $table->foreignId('todo_category_id')->references('id')->on('todo_categories')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('todo_todo_categories');
    }
};
