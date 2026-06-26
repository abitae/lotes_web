<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Banner;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        if (Admin::query()->count() === 0) {
            Admin::query()->create([
                'email' => env('ADMIN_EMAIL', 'admin@lotes.pe'),
                'password_hash' => Hash::make(env('ADMIN_PASSWORD', 'admin123')),
            ]);
            $this->command?->info('Admin inicial creado.');
        }

        if (Banner::query()->count() === 0) {
            $this->call(CmsContentSeeder::class);
        } else {
            $this->command?->info('La base ya tiene datos CMS; seed omitido.');
        }
    }
}
