<?php

return [
    'base_url' => rtrim(env('WEB_API_BASE_URL', 'https://api.ejemplo.com'), '/'),
    'tipo_web' => env('WEB_API_TIPO_WEB', 'lotesenremate.pe'),
    'timeout_ms' => (int) env('WEB_API_TIMEOUT_MS', 15000),
];
