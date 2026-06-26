<?php

namespace App\Support;

class BcryptjsPassword
{
    /**
     * Verifica contraseñas hasheadas con bcryptjs (prefijo $2b$) o bcrypt PHP ($2y$).
     */
    public static function verify(string $password, string $hash): bool
    {
        if (str_starts_with($hash, '$2b$')) {
            $hash = '$2y$'.substr($hash, 4);
        }

        return password_verify($password, $hash);
    }
}
