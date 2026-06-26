<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Testimonial */
class TestimonialResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'role' => $this->role,
            'stars' => (int) $this->stars,
            'quote' => $this->quote,
            'projectPurchased' => $this->project_purchased,
            'avatarUrl' => $this->avatar_url,
        ];
    }
}
