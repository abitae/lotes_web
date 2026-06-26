<?php

namespace App\Support;

class MapWebProject
{
    private const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800';

    private const TYPE_MAP = [
        'PLAYERO' => 'Playero',
        'PLAYA' => 'Playero',
        'CAMPESTRE' => 'Campestre',
        'URBANO' => 'Urbano',
        'RESIDENCIAL' => 'Urbano',
        'INDUSTRIAL' => 'Industrial',
    ];

    /**
     * @param  array<string, mixed>  $project
     * @return array<string, mixed>
     */
    public static function toProject(array $project): array
    {
        $availableLots = (int) ($project['free_lots_count'] ?? 0);
        $totalLots = (int) ($project['total_lots'] ?? $project['lots_count'] ?? $availableLots);
        $imageUrl = self::resolveImageUrl($project);
        $maps = self::parseMapsData($project);

        return [
            'id' => (string) $project['id'],
            'title' => $project['name'],
            'location' => self::resolveLocationLabel($project),
            'region' => self::resolveRegion($project),
            'province' => ! empty($project['province']) ? trim((string) $project['province']) : null,
            'district' => ! empty($project['district']) ? trim((string) $project['district']) : null,
            'projectType' => self::mapProjectType($project),
            'surface' => 0,
            'priceSoles' => (float) ($project['precio_web'] ?? 0),
            'priceDollars' => 0,
            'status' => $availableLots <= 0 ? 'Vendido' : 'Pre-venta',
            'imageUrl' => $imageUrl,
            'coordinates' => $maps['coordinates'],
            'mapsUrl' => $maps['mapsUrl'] ?? null,
            'description' => trim((string) ($project['descripcion'] ?? '')),
            'features' => array_values(array_filter($project['blocks'] ?? [])),
            'featured' => $imageUrl !== self::PLACEHOLDER_IMAGE && $availableLots > 0,
            'totalLots' => $totalLots,
            'availableLots' => $availableLots,
            'images' => self::resolveImages($project),
        ];
    }

    /**
     * @param  array<string, mixed>  $project
     */
    private static function mapProjectType(array $project): string
    {
        $code = strtoupper((string) ($project['project_type']['code'] ?? ''));
        $name = strtolower((string) ($project['project_type']['name'] ?? ''));

        if (isset(self::TYPE_MAP[$code])) {
            return self::TYPE_MAP[$code];
        }
        if (str_contains($name, 'play') || str_contains($name, 'playa')) {
            return 'Playero';
        }
        if (str_contains($name, 'camp')) {
            return 'Campestre';
        }
        if (str_contains($name, 'indust')) {
            return 'Industrial';
        }

        return 'Urbano';
    }

    /**
     * @param  array<string, mixed>  $project
     * @return array{coordinates: array{lat: float, lng: float}, mapsUrl?: string}
     */
    private static function parseMapsData(array $project): array
    {
        $mapsUrl = trim((string) ($project['maps_url'] ?? '')) ?: null;
        $sources = array_filter([
            trim((string) ($project['location'] ?? '')),
            $mapsUrl,
        ]);

        foreach ($sources as $raw) {
            if (preg_match('/^(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)$/', $raw, $m)) {
                return [
                    'coordinates' => ['lat' => (float) $m[1], 'lng' => (float) $m[2]],
                    'mapsUrl' => $mapsUrl ?: (str_contains($raw, 'google.com/maps') ? $raw : null),
                ];
            }

            if (str_contains($raw, 'google.com/maps') || str_contains($raw, 'maps.google.com')) {
                if (preg_match('/@(-?\d+\.?\d*),(-?\d+\.?\d*)/', $raw, $m)) {
                    return [
                        'coordinates' => ['lat' => (float) $m[1], 'lng' => (float) $m[2]],
                        'mapsUrl' => $mapsUrl ?: $raw,
                    ];
                }

                return [
                    'coordinates' => ['lat' => -12, 'lng' => -77],
                    'mapsUrl' => $mapsUrl ?: $raw,
                ];
            }
        }

        return ['coordinates' => ['lat' => -12, 'lng' => -77], 'mapsUrl' => $mapsUrl];
    }

    /**
     * @param  array<string, mixed>  $project
     */
    private static function resolveLocationLabel(array $project): string
    {
        if (! empty($project['location_label'])) {
            return trim((string) $project['location_label']);
        }
        if (! empty($project['district'])) {
            return trim((string) $project['district']);
        }
        if (! empty($project['province'])) {
            return trim((string) $project['province']);
        }
        if (! empty($project['city']['name'])) {
            return trim((string) $project['city']['name']);
        }
        $location = trim((string) ($project['location'] ?? ''));
        if ($location && ! str_contains($location, 'google.com/maps')) {
            return $location;
        }

        return 'Ubicación por confirmar';
    }

    /**
     * @param  array<string, mixed>  $project
     */
    private static function resolveRegion(array $project): string
    {
        if (! empty($project['city']['department'])) {
            return trim((string) $project['city']['department']);
        }
        if (! empty($project['city']['name'])) {
            return trim((string) $project['city']['name']);
        }
        if (! empty($project['province'])) {
            return trim((string) $project['province']);
        }

        return 'Perú';
    }

    /**
     * @param  array<string, mixed>  $project
     */
    private static function resolveImageUrl(array $project): string
    {
        if (! empty($project['image_portada'])) {
            return trim((string) $project['image_portada']);
        }
        foreach ($project['images'] ?? [] as $img) {
            if (! empty($img['url'])) {
                return trim((string) $img['url']);
            }
        }

        return self::PLACEHOLDER_IMAGE;
    }

    /**
     * @param  array<string, mixed>  $project
     * @return list<array{url: string, title: string}>|null
     */
    private static function resolveImages(array $project): ?array
    {
        $gallery = [];
        foreach ($project['images'] ?? [] as $img) {
            if (! empty($img['url'])) {
                $gallery[] = [
                    'url' => trim((string) $img['url']),
                    'title' => trim((string) ($img['title'] ?? '')) ?: 'Imagen del proyecto',
                ];
            }
        }

        return $gallery !== [] ? $gallery : null;
    }
}
