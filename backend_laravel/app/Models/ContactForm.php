<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactForm extends Model
{
    public $incrementing = false;

    protected $keyType = 'string';

    protected $primaryKey = 'slug';

    protected $table = 'contact_forms';

    const CREATED_AT = null;

    protected $fillable = [
        'slug',
        'form_title',
        'form_subtitle',
        'submit_label',
        'success_title',
        'success_message',
        'default_message',
        'default_project_interest',
        'section_eyebrow',
        'section_heading',
        'section_description',
        'bullets',
    ];

    protected function casts(): array
    {
        return [
            'bullets' => 'array',
        ];
    }
}
