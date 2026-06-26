<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExpertAdvisor extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';

    protected $table = 'expert_advisors';

    const UPDATED_AT = null;

    protected $fillable = [
        'id',
        'name',
        'role',
        'bio',
        'image_url',
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
