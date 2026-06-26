<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    protected $table = 'site_settings';

    public $incrementing = false;

    protected $keyType = 'int';

    const CREATED_AT = null;

    protected $fillable = [
        'id',
        'logo_url',
        'favicon_url',
        'site_name',
        'site_tagline',
        'browser_title',
        'footer_tagline',
        'footer_description',
    ];
}
