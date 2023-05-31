<x-mail::message>
Notification:

{{ $notification->title }} from {{ $notification->user->name }}.

{{ $notification->created_at }}



Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
