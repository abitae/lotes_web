<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutPage extends Model
{
    protected $table = 'about_page';

    public $incrementing = false;

    protected $keyType = 'int';

    const CREATED_AT = null;

    protected $fillable = [
        'id',
        'hero_eyebrow',
        'hero_heading',
        'hero_description',
        'hero_background_image_url',
        'mission_heading',
        'mission_description',
        'vision_heading',
        'vision_description',
        'values_eyebrow',
        'values_heading',
        'values_description',
        'advisors_eyebrow',
        'advisors_heading',
        'advisors_description',
    ];
}
