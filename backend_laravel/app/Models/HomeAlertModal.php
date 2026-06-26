<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeAlertModal extends Model
{
    protected $table = 'home_alert_modal';

    public $incrementing = false;

    protected $keyType = 'int';

    const CREATED_AT = null;

    protected $fillable = [
        'id',
        'is_enabled',
        'title',
        'description',
        'image_url',
        'video_url',
        'button_text',
        'button_link',
    ];

    protected function casts(): array
    {
        return [
            'is_enabled' => 'boolean',
        ];
    }
}
