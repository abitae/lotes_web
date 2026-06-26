<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\HomeAlertModal */
class HomeAlertResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'isEnabled' => (bool) $this->is_enabled,
            'title' => $this->title,
            'description' => $this->description,
            'imageUrl' => $this->image_url,
            'videoUrl' => $this->video_url,
            'buttonText' => $this->button_text,
            'buttonLink' => $this->button_link,
            'updatedAt' => $this->updated_at?->toISOString(),
        ];
    }
}
