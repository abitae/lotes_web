<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';

    protected $table = 'inquiries';

    const UPDATED_AT = null;

    protected $fillable = [
        'id',
        'full_name',
        'phone',
        'email',
        'project_interest',
        'message',
        'status',
        'notes',
    ];
}
