<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\AppException;
use App\Http\Controllers\Controller;
use App\Http\Resources\ContactFormResource;
use App\Models\ContactForm;
use App\Support\CamelCaseMapper;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactFormController extends Controller
{
    public function index(): JsonResponse
    {
        $forms = ContactForm::query()->orderBy('slug')->get();

        return response()->json(ContactFormResource::collection($forms));
    }

    public function update(Request $request, string $slug): JsonResponse
    {
        $form = ContactForm::query()->find($slug);
        if (! $form) {
            throw new AppException(404, 'Formulario no encontrado');
        }

        $body = $request->all();
        $data = CamelCaseMapper::extract($body, [
            'formTitle' => 'form_title',
            'formSubtitle' => 'form_subtitle',
            'submitLabel' => 'submit_label',
            'successTitle' => 'success_title',
            'successMessage' => 'success_message',
            'defaultMessage' => 'default_message',
            'defaultProjectInterest' => 'default_project_interest',
            'sectionEyebrow' => 'section_eyebrow',
            'sectionHeading' => 'section_heading',
            'sectionDescription' => 'section_description',
        ]);

        if (array_key_exists('bullets', $body)) {
            $data['bullets'] = $body['bullets'] ? $body['bullets'] : null;
        }

        if ($data === []) {
            throw new AppException(400, 'No hay campos para actualizar');
        }

        $form->update($data);

        return response()->json(new ContactFormResource($form->fresh()));
    }
}
