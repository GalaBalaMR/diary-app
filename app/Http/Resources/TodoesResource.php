<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TodoesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => (string)$this->id,
            'attributes' => [
                'title' => $this->title,
                'body' => $this->body,
                'date' => date('d.m.Y H:i', strtotime($this->date)),
                'user_id' => $this->user_id,
                'created_at' => $this->created_at,
                'updated_at' => $this->updated_at,
            ],
            'relationships' => [
                'todoCategories' => $this->todoCategories->all(),
                'user' => [
                    'id' => $this->user->id,
                    'name' => $this->user->name,
                    'email' => $this->user->email,
                ]
            ]
        ];
    }
}
