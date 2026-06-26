<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GuaranteeSection extends Model
{
    protected $table = 'guarantee_section';

    public $incrementing = false;

    protected $keyType = 'int';

    const CREATED_AT = null;

    protected $fillable = [
        'id',
        'eyebrow',
        'heading',
        'description',
        'background_image_url',
    ];
}
