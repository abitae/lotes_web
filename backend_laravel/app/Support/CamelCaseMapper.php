<?php

namespace App\Support;

use App\Exceptions\AppException;

class CamelCaseMapper
{
    /**
     * @param  array<string, string>  $mapping  camelCase key => snake_case column
     * @param  list<string>  $boolFields
     * @return array<string, mixed>
     */
    public static function extract(array $body, array $mapping, array $boolFields = []): array
    {
        $data = [];

        foreach ($mapping as $camel => $snake) {
            if (array_key_exists($camel, $body)) {
                $value = $body[$camel];
                if (in_array($camel, $boolFields, true)) {
                    $value = (bool) $value;
                }
                $data[$snake] = $value;
            }
        }

        return $data;
    }

    /**
     * @param  list<string>  $fields
     */
    public static function requireFields(array $body, array $fields, string $message): void
    {
        foreach ($fields as $field) {
            if (! isset($body[$field]) || $body[$field] === '') {
                throw new AppException(400, $message);
            }
        }
    }
}
