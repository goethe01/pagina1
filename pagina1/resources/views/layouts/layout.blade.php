<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <title>TechPeripherals | Tienda de Teclados, Ratones y más</title>
    <link rel="stylesheet" href="{{ asset('assets/css/style.css') }}">
</head>
<body>
    <div class="page-wrapper">
        <!-- HEADER con navegación y carrito -->
        <header>
            <div class="container header-flex">
                <div class="logo">
                    <i class="fas fa-keyboard"></i>
                    <h1>Tech<span>Peripherals</span></h1>
                </div>
                <nav>
                    <ul>
                        <li><a href="#">Inicio</a></li>
                        <li><a href="#productos">Productos</a></li>
                        <li><a href="#ofertas">Ofertas</a></li>
                        <li><a href="#contacto">Contacto</a></li>
                    </ul>
                </nav>
                <div class="cart-icon">
                    <i class="fas fa-shopping-cart"></i>
                    <span id="cart-count" class="cart-count">0</span>
                </div>
            </div>
        </header>

        <!-- SECCIÓN HERO -->
        <section class="hero">
            <div class="container hero-content">
                <h2>Equípate con lo mejor</h2>
                <p>Teclados mecánicos, ratones gaming, pads y más. Envío rápido y garantía.</p>
                <a href="#productos" class="btn-primary">Ver colección <i class="fas fa-arrow-right"></i></a>
            </div>
        </section>

        <!-- PRODUCTOS -->
        <section id="productos" class="products-section">
            <div class="container">
                <div class="section-title">
                    <h2>🔥 Productos Destacados</h2>
                    <p>Los periféricos que aman los gamers y profesionales</p>
                </div>
                <div class="products-grid" id="products-grid">
                    <!-- Los productos se cargarán dinámicamente con JS -->
                </div>
            </div>
        </section>

        <!-- BANNER DE OFERTA -->
        <section id="ofertas" class="offer-banner">
            <div class="container offer-content">
                <div class="offer-text">
                    <span>🔥 OFERTA FLASH</span>
                    <h3>15% OFF en compras mayores a $50</h3>
                    <p>Usa el código: <strong>TECH15</strong> al finalizar tu pedido.</p>
                </div>
                <i class="fas fa-tags"></i>
            </div>
        </section>

        <!-- CARRITO LATERAL (OCULTO POR DEFECTO) -->
        <div class="cart-sidebar" id="cart-sidebar">
            <div class="cart-header">
                <h3><i class="fas fa-shopping-bag"></i> Mi Carrito</h3>
                <button id="close-cart" class="close-cart"><i class="fas fa-times"></i></button>
            </div>
            <div class="cart-items" id="cart-items">
                <p class="empty-cart-msg">🛒 Tu carrito está vacío</p>
            </div>
            <div class="cart-footer">
                <div class="cart-total">
                    <span>Total:</span>
                    <span id="cart-total-price">$0.00</span>
                </div>
                <button class="btn-checkout" id="checkout-btn">Finalizar Compra</button>
            </div>
        </div>
        <div class="overlay" id="overlay"></div>

        <!-- FOOTER -->
        <footer id="contacto">
            <div class="container footer-grid">
                <div class="footer-col">
                    <h4>TechPeripherals</h4>
                    <p>Los mejores periféricos para tu setup, con envíos a toda la región.</p>
                    <div class="social-icons">
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                    </div>
                </div>
                <div class="footer-col">
                    <h4>Enlaces rápidos</h4>
                    <ul>
                        <li><a href="#">Sobre nosotros</a></li>
                        <li><a href="#">Política de cambios</a></li>
                        <li><a href="#">Preguntas frecuentes</a></li>
                        <li><a href="#">Soporte técnico</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Contacto</h4>
                    <p><i class="fas fa-envelope"></i> ventas@techperipherals.com</p>
                    <p><i class="fas fa-phone-alt"></i> +54 11 2345-6789</p>
                    <p><i class="fas fa-map-marker-alt"></i> Av. Tecnología 123, CDMX</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 TechPeripherals - Todos los derechos reservados</p>
            </div>
        </footer>
    </div>

    <script src="{{ asset('assets/js/script.js') }}"></script>
</body>
</html>