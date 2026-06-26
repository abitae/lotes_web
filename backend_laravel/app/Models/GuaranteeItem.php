<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GuaranteeItem extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';

    protected $table = 'guarantee_items';

    const UPDATED_AT = null;

    protected $fillable = [
        'id',
        'icon',
        'title',
        'description',
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
