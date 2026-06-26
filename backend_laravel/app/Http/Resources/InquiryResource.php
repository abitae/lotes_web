<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Inquiry */
class InquiryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'fullName' => $this->full_name,
            'phone' => $this->phone,
            'email' => $this->email,
            'projectInterest' => $this->project_interest,
            'message' => $this->message,
            'status' => $this->status,
            'createdAt' => $this->created_at?->toISOString(),
            'notes' => $this->notes,
        ];
    }
}
