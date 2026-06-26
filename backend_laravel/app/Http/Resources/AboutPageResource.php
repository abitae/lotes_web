<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\AboutPage */
class AboutPageResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'heroEyebrow' => $this->hero_eyebrow,
            'heroHeading' => $this->hero_heading,
            'heroDescription' => $this->hero_description,
            'heroBackgroundImageUrl' => $this->hero_background_image_url,
            'missionHeading' => $this->mission_heading,
            'missionDescription' => $this->mission_description,
            'visionHeading' => $this->vision_heading,
            'visionDescription' => $this->vision_description,
            'valuesEyebrow' => $this->values_eyebrow,
            'valuesHeading' => $this->values_heading,
            'valuesDescription' => $this->values_description,
            'advisorsEyebrow' => $this->advisors_eyebrow,
            'advisorsHeading' => $this->advisors_heading,
            'advisorsDescription' => $this->advisors_description,
        ];
    }
}
