<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <title>@yield('title')</title>
    <link rel="stylesheet" href="{{ asset('assets/css/style.css') }}">
    @yield('style')
</head>
<body>
    @include('layouts._partials.header')
    <div class="contenido">
        @yield('content')
    </div>

    <footer id="contacto">
        @include('layouts._partials.footer')
    </footer>
    <script src="{{ asset('assets/js/script.js') }}"></script>
</body>
</html>
