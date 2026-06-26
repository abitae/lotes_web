<?php

namespace Database\Seeders;

use App\Models\AboutPage;
use App\Models\Banner;
use App\Models\ContactForm;
use App\Models\CorporateChannel;
use App\Models\Faq;
use App\Models\GuaranteeItem;
use App\Models\GuaranteeSection;
use App\Models\HomeAlertModal;
use App\Models\Inquiry;
use App\Models\SiteSetting;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CmsContentSeeder extends Seeder
{
    public function run(): void
    {
        if (SiteSetting::query()->count() === 0) {
            SiteSetting::query()->create([
                'id' => 1,
                'site_name' => 'Lotes en Remate',
                'site_tagline' => 'Inversión.pe',
                'browser_title' => 'Lotes en Remate | Inversión Segura en Terrenos',
                'footer_tagline' => 'Inversión Segura',
                'footer_description' => 'La plataforma líder en el Perú para la adquisición, inversión y adjudicación de terrenos.',
            ]);
        }

        if (GuaranteeSection::query()->count() === 0) {
            GuaranteeSection::query()->create([
                'id' => 1,
                'eyebrow' => 'Garantías de Compra',
                'heading' => '¿Por qué somos la mejor opción de inversión?',
                'description' => 'Respaldamos su depósito bancario a través de procesos registrales sólidos.',
                'background_image_url' => 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600',
            ]);
        }

        if (GuaranteeItem::query()->count() === 0) {
            GuaranteeItem::query()->create([
                'id' => (string) Str::uuid(),
                'icon' => 'ShieldCheck',
                'title' => '100% Inscritos en SUNARP',
                'description' => 'Todas las propiedades constan con partidas registrales independientes.',
                'sort_order' => 0,
                'is_active' => true,
            ]);
        }

        if (ContactForm::query()->count() === 0) {
            ContactForm::query()->create([
                'slug' => 'contact_consulta',
                'form_title' => 'Formulario de Consulta Directa',
                'form_subtitle' => 'Su mensaje será redirigido al asesor especializado.',
                'submit_label' => 'Enviar Consulta al CRM',
                'success_title' => '¡Datos Registrados con Éxito!',
                'success_message' => 'Un especialista te contactará de inmediato.',
                'default_message' => 'Hola, deseo ponerme en contacto con un asesor.',
                'default_project_interest' => 'Contacto General',
            ]);
        }

        if (CorporateChannel::query()->count() === 0) {
            CorporateChannel::query()->create([
                'id' => (string) Str::uuid(),
                'channel_type' => 'email',
                'label' => 'Canal de Ventas Legal:',
                'value' => 'informes@lotesenremate.pe',
                'sort_order' => 0,
                'is_active' => true,
            ]);
        }

        if (Faq::query()->count() === 0) {
            Faq::query()->create([
                'id' => (string) Str::uuid(),
                'question' => '¿Todos los lotes tienen título de propiedad?',
                'answer' => 'Sí, ofrecemos lotes independizados con partida registral en SUNARP.',
                'sort_order' => 0,
                'is_active' => true,
            ]);
        }

        if (AboutPage::query()->count() === 0) {
            AboutPage::query()->create([
                'id' => 1,
                'hero_eyebrow' => 'Nosotros',
                'hero_heading' => 'Lotes en Remate',
                'hero_description' => 'Inversión segura en terrenos.',
                'hero_background_image_url' => 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600',
                'mission_heading' => 'Misión',
                'mission_description' => 'Conectar familias con oportunidades de inversión.',
                'vision_heading' => 'Visión',
                'vision_description' => 'Ser líderes en remates inmobiliarios.',
                'values_eyebrow' => 'Valores',
                'values_heading' => 'Nuestros valores',
                'values_description' => 'Transparencia y seguridad.',
                'advisors_eyebrow' => 'Asesores',
                'advisors_heading' => 'Equipo experto',
                'advisors_description' => 'Profesionales a su servicio.',
            ]);
        }

        if (HomeAlertModal::query()->count() === 0) {
            HomeAlertModal::query()->create([
                'id' => 1,
                'is_enabled' => false,
                'title' => '',
                'description' => '',
            ]);
        }

        if (Banner::query()->count() === 0) {
            Banner::query()->create([
                'id' => 'banner-1',
                'title' => 'Invierta en el Futuro del Perú con Seguridad',
                'subtitle' => 'Lotes de campo, playa y urbanos inscritos en SUNARP.',
                'button_text' => 'Ver Catálogo de Proyectos',
                'image_url' => 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600',
                'badge_text' => 'Gran Liquidación de Pre-venta',
                'is_active' => true,
            ]);
        }

        if (Testimonial::query()->count() === 0) {
            Testimonial::query()->create([
                'id' => 'test-1',
                'name' => 'Ricardo Seminario',
                'role' => 'Emprendedor Comercial',
                'stars' => 5,
                'quote' => 'Excelente oportunidad de inversión.',
                'project_purchased' => 'Eco-Lomas de Chilca',
                'avatar_url' => 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
            ]);
        }

        if (Inquiry::query()->count() === 0) {
            Inquiry::query()->create([
                'id' => 'inq-1',
                'full_name' => 'Juan de Dios Alarcón',
                'phone' => '987654321',
                'email' => 'j.alarcon@gmail.com',
                'project_interest' => 'Eco-Lomas de Chilca',
                'message' => 'Interesado en adquirir lotes.',
                'status' => 'Pendiente',
            ]);
        }
    }
}
