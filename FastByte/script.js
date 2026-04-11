// Inicializar EmailJS 
emailjs.init("VAhcSiMzaywQgJvZK");

// Toggle del menú móvil
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
}

// Manejo del formulario de contacto con EmailJS
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Cambiar botón a estado de envío
        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        // Enviar emails usando EmailJS
        emailjs.sendForm('service_0zveedr', 'template_vlaxhuv', this)
            .then(function(response) {
                console.log('Correo enviado exitosamente:', response);
                
                // Mostrar confirmación
                alert('¡Gracias! Tu mensaje ha sido enviado. Nos pondremos en contacto pronto.');
                
                // Limpiar formulario
                contactForm.reset();
                
                // Restaurar botón
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            })
            .catch(function(error) {
                console.error('Error al enviar:', error);
                alert('Hubo un error al enviar el mensaje. Por favor intenta de nuevo.');
                
                // Restaurar botón
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
    });
}

// Botón CTA
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        document.querySelector('#contacto').scrollIntoView({ behavior: 'smooth' });
    });
}

// Animación de contadores para estadísticas
function animateCounters() {
    const stats = document.querySelectorAll('.stat h3');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                
                // Extrae el número del texto (ej: "10,000+" -> 10000)
                const number = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/\d/g, '').replace(/,/g, '');
                
                if (!isNaN(number)) {
                    animateValue(element, 0, number, 2000, suffix);
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));
}

function animateValue(element, start, end, duration, suffix) {
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        
        // Formato con separadores de miles
        element.textContent = value.toLocaleString() + suffix;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

// Inicializar animación de contadores cuando la página carga
window.addEventListener('load', animateCounters);

// Efecto de scroll para navbar con más efectos
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.2)';
        navbar.style.padding = '0.8rem 0';
    } else {
        navbar.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.1)';
        navbar.style.padding = '1rem 0';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Animación de entrada para elementos (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `slideInUp 0.6s ease-out forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Agregar animación a tarjetas de servicios y ventajas
document.querySelectorAll('.servicio-card, .ventaja-item, .info-item').forEach(el => {
    observer.observe(el);
});

// Agregar estilos de animación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);
