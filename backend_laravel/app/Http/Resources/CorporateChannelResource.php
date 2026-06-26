<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\CorporateChannel */
class CorporateChannelResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'channelType' => $this->channel_type,
            'label' => $this->label,
            'value' => $this->value,
            'extraInfo' => $this->extra_info,
            'sortOrder' => (int) $this->sort_order,
            'isActive' => (bool) $this->is_active,
        ];
    }
}
