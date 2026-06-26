<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';

    protected $table = 'testimonials';

    const UPDATED_AT = null;

    protected $fillable = [
        'id',
        'name',
        'role',
        'stars',
        'quote',
        'project_purchased',
        'avatar_url',
    ];
}
