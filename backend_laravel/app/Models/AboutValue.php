<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutValue extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';

    protected $table = 'about_values';

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
