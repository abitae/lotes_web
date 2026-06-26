<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';

    protected $table = 'faqs';

    const UPDATED_AT = null;

    protected $fillable = [
        'id',
        'question',
        'answer',
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
