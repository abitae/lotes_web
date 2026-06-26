<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'admins';

    public $timestamps = false;

    protected $fillable = [
        'email',
        'password_hash',
    ];

    protected $hidden = [
        'password_hash',
    ];

    public function getAuthPassword(): string
    {
        return $this->password_hash;
    }
}
