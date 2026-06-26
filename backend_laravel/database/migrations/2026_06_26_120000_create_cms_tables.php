<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private const CMS_TABLES = [
        'home_alert_modal',
        'expert_advisors',
        'about_values',
        'about_page',
        'faqs',
        'corporate_channels',
        'contact_forms',
        'guarantee_items',
        'guarantee_section',
        'site_settings',
        'admins',
        'inquiries',
        'testimonials',
        'banners',
    ];

    public function up(): void
    {
        $sql = file_get_contents(database_path('schema/cms_tables.sql'));

        if ($sql === false) {
            throw new RuntimeException('No se encontró database/schema/cms_tables.sql');
        }

        DB::unprepared($sql);
    }

    public function down(): void
    {
        Schema::disableForeignKeyConstraints();

        foreach (self::CMS_TABLES as $table) {
            Schema::dropIfExists($table);
        }

        Schema::enableForeignKeyConstraints();
    }
};
