<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\SiteSetting */
class SiteSettingsResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'logoUrl' => $this->logo_url,
            'faviconUrl' => $this->favicon_url,
            'siteName' => $this->site_name,
            'siteTagline' => $this->site_tagline,
            'browserTitle' => $this->browser_title,
            'footerTagline' => $this->footer_tagline,
            'footerDescription' => $this->footer_description,
        ];
    }
}
