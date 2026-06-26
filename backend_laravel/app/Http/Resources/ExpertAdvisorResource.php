<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\ExpertAdvisor */
class ExpertAdvisorResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'role' => $this->role,
            'bio' => $this->bio,
            'imageUrl' => $this->image_url,
            'sortOrder' => (int) $this->sort_order,
            'isActive' => (bool) $this->is_active,
        ];
    }
}
