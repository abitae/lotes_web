<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\ContactForm */
class ContactFormResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $bullets = $this->bullets;
        if (is_string($bullets)) {
            $bullets = json_decode($bullets, true);
        }

        return [
            'slug' => $this->slug,
            'formTitle' => $this->form_title,
            'formSubtitle' => $this->form_subtitle,
            'submitLabel' => $this->submit_label,
            'successTitle' => $this->success_title,
            'successMessage' => $this->success_message,
            'defaultMessage' => $this->default_message,
            'defaultProjectInterest' => $this->default_project_interest,
            'sectionEyebrow' => $this->section_eyebrow,
            'sectionHeading' => $this->section_heading,
            'sectionDescription' => $this->section_description,
            'bullets' => $bullets,
        ];
    }
}
