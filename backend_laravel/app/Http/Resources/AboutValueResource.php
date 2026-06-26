<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\AboutValue */
class AboutValueResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'icon' => $this->icon,
            'title' => $this->title,
            'description' => $this->description,
            'sortOrder' => (int) $this->sort_order,
            'isActive' => (bool) $this->is_active,
        ];
    }
}
