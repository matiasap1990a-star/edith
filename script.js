// ===== Año dinámico =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Menú móvil =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => { 
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
  navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Resaltar sección activa en el nav =====
const sections = document.querySelectorAll('main section[id]');
const navAnchors = document.querySelectorAll('.nav-link[data-link]');

const spy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => spy.observe(s));

// ===== Revelado al hacer scroll =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));


// ===== Funcionalidad de las flechas del Carousel =====
document.querySelectorAll('.carousel-container').forEach(container => {
  const carousel = container.querySelector('.pricing-carousel, .reviews-carousel');
  const prevBtn = container.querySelector('.prev-btn');
  const nextBtn = container.querySelector('.next-btn');

  if (carousel && prevBtn && nextBtn) {
    const scrollAmount = 360; 

    // Función para mostrar u ocultar flechas dependiendo de la posición del scroll
    const updateButtonVisibility = () => {
      // Si estamos pegados a la izquierda (con un margen de error de 5px)
      if (carousel.scrollLeft <= 5) {
        prevBtn.classList.add('hidden');
      } else {
        prevBtn.classList.remove('hidden');
      }

      // Si llegamos al final de la derecha
      if (Math.ceil(carousel.scrollLeft + carousel.clientWidth) >= carousel.scrollWidth - 5) {
        nextBtn.classList.add('hidden');
      } else {
        nextBtn.classList.remove('hidden');
      }
    };

    // Al hacer click, movemos el carrusel
    prevBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Escuchamos el evento de scroll y cuando la ventana cambia de tamaño
    carousel.addEventListener('scroll', updateButtonVisibility);
    window.addEventListener('resize', updateButtonVisibility);

    // Revisión inicial apenas carga la página para ocultar la flecha izquierda
    updateButtonVisibility();
  }
});
