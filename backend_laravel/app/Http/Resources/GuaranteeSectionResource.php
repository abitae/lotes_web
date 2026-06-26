<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\GuaranteeSection */
class GuaranteeSectionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'eyebrow' => $this->eyebrow,
            'heading' => $this->heading,
            'description' => $this->description,
            'backgroundImageUrl' => $this->background_image_url,
        ];
    }
}
