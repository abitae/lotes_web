<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Banner */
class BannerResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'subtitle' => $this->subtitle,
            'buttonText' => $this->button_text,
            'imageUrl' => $this->image_url,
            'badgeText' => $this->badge_text,
            'isActive' => (bool) $this->is_active,
        ];
    }
}
