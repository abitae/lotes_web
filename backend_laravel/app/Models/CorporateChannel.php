<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CorporateChannel extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';

    protected $table = 'corporate_channels';

    const UPDATED_AT = null;

    protected $fillable = [
        'id',
        'channel_type',
        'label',
        'value',
        'extra_info',
        'sort_order',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }
}
