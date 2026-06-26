<?php

namespace App\Exceptions;

use Exception;

class AppException extends Exception
{
    public function __construct(
        public readonly int $statusCode,
        string $message,
    ) {
        parent::__construct($message);
    }
}
