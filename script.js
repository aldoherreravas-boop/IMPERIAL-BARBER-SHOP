/**
 * IMPERIUM BARBER SHOP - Interactive Scripts
 * Slogan: "ESTILO QUE TE DEFINE" | "Estilo, calidad y confianza en cada corte."
 * WhatsApp: 916484051
 * Facebook: https://www.facebook.com/Imperialbarbersho
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==================== 1. MOBILE NAVIGATION TOGGLE ====================
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-menu a');
  const navbar = document.getElementById('navbar');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });
  }

  // Close Mobile Menu on Click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (mobileToggle) {
          const icon = mobileToggle.querySelector('i');
          if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
          }
        }
      }
    });
  });

  // Sticky Navbar & Active Section Scroll Detection
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 250;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // ==================== 5, 6. BANNER CARRUSEL SLIDER ====================
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-indicators .dot');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  let currentSlide = 0;
  let carouselInterval = null;

  function showSlide(index) {
    if (slides.length === 0) return;
    
    // Normalize index
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentSlide);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startAutoPlay() {
    stopAutoPlay();
    carouselInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoPlay() {
    if (carouselInterval) clearInterval(carouselInterval);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoPlay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoPlay();
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      startAutoPlay();
    });
  });

  // Pause carousel on hover over hero container
  const heroContainer = document.querySelector('.hero-carousel');
  if (heroContainer) {
    heroContainer.addEventListener('mouseenter', stopAutoPlay);
    heroContainer.addEventListener('mouseleave', startAutoPlay);
  }

  startAutoPlay();

  // ==================== VIDEO MODAL ====================
  const videoModal = document.getElementById('videoModal');
  const btnPlayVideo = document.getElementById('btn-play-video');
  const closeVideoModal = document.getElementById('closeVideoModal');
  const videoIframe = document.getElementById('videoIframe');

  if (btnPlayVideo && videoModal && videoIframe) {
    btnPlayVideo.addEventListener('click', (e) => {
      e.preventDefault();
      
      const isFileProtocol = window.location.protocol === 'file:';
      
      // YouTube Embeds block playback when opened directly from disk (file:// protocol).
      // If running from file://, open YouTube directly in new tab for guaranteed 100% playback.
      if (isFileProtocol) {
        showToast('Abriendo video en YouTube... 🎬');
        window.open('https://www.youtube.com/watch?v=jmgT0vpMHGU', '_blank');
      } else {
        videoIframe.src = 'https://www.youtube.com/embed/jmgT0vpMHGU?autoplay=1&rel=0';
        videoModal.classList.add('active');
      }
    });
  }

  if (closeVideoModal && videoModal && videoIframe) {
    closeVideoModal.addEventListener('click', () => {
      videoModal.classList.remove('active');
      videoIframe.src = '';
    });
  }

  // ==================== 7. SERVICE DETAIL MODAL ====================
  const serviceModal = document.getElementById('serviceModal');
  const closeServiceModal = document.getElementById('closeServiceModal');
  const modalServiceTitle = document.getElementById('modalServiceTitle');
  const modalServicePrice = document.getElementById('modalServicePrice');
  const modalServiceDesc = document.getElementById('modalServiceDesc');
  const modalBookBtn = document.getElementById('modalBookBtn');
  let selectedServiceForModal = '';

  const serviceMoreBtns = document.querySelectorAll('.service-more-btn');
  serviceMoreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.getAttribute('data-service-name') || 'Servicio';
      const price = btn.getAttribute('data-price') || 'S/ 25.00';
      const desc = btn.getAttribute('data-desc') || 'Servicio profesional de barbería.';

      selectedServiceForModal = name;
      if (modalServiceTitle) modalServiceTitle.textContent = name;
      if (modalServicePrice) modalServicePrice.textContent = price;
      if (modalServiceDesc) modalServiceDesc.textContent = desc;

      if (serviceModal) serviceModal.classList.add('active');
    });
  });

  if (closeServiceModal && serviceModal) {
    closeServiceModal.addEventListener('click', () => {
      serviceModal.classList.remove('active');
    });
  }

  if (modalBookBtn) {
    modalBookBtn.addEventListener('click', () => {
      if (serviceModal) serviceModal.classList.remove('active');

      // Pre-select service in form or open WhatsApp direct
      const serviceSelect = document.getElementById('bookingService');
      if (serviceSelect && selectedServiceForModal) {
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].text.toLowerCase().includes(selectedServiceForModal.toLowerCase())) {
            serviceSelect.selectedIndex = i;
            break;
          }
        }
      }

      const reservaSection = document.getElementById('reserva');
      if (reservaSection) {
        reservaSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Quick CTA scroll buttons
  const btnReservaNav = document.getElementById('btn-reserva-nav');
  const btnReservarAhora = document.getElementById('btn-reservar-ahora');

  [btnReservaNav, btnReservarAhora].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        const reservaSection = document.getElementById('reserva');
        if (reservaSection) {
          reservaSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  });

  // ==================== 8 & RESERVA: FORMULARIO WHATSAPP ====================
  const bookingForm = document.getElementById('bookingForm');
  const dateInput = document.getElementById('bookingDate');

  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    dateInput.value = today;
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('bookingName').value.trim();
      const phone = document.getElementById('bookingPhone').value.trim();
      const service = document.getElementById('bookingService').value;
      const barber = document.getElementById('bookingBarber').value;
      const date = document.getElementById('bookingDate').value;
      const time = document.getElementById('bookingTime').value;
      const notes = document.getElementById('bookingNotes').value.trim();

      if (!name || !date || !time) {
        showToast('Por favor completa los campos obligatorios (*).');
        return;
      }

      // Format WhatsApp Message
      let message = `💈 *NUEVA RESERVA - IMPERIUM BARBER SHOP* 💈\n\n`;
      message += `👤 *Cliente:* ${name}\n`;
      if (phone) message += `📱 *Teléfono:* ${phone}\n`;
      message += `✂️ *Servicio:* ${service}\n`;
      message += `👨‍🎨 *Barbero:* ${barber}\n`;
      message += `📅 *Fecha:* ${date}\n`;
      message += `⏰ *Hora:* ${time}\n`;
      if (notes) message += `📝 *Notas:* ${notes}\n\n`;
      message += `📍 *Dirección:* Jr. San Martín 816 / Jr. Miguel Grau 687, Bagua Grande - Amazonas\n`;
      message += `✨ *Slogan:* Estilo que te define`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappURL = `https://wa.me/51916484051?text=${encodedMessage}`;

      showToast('¡Redirigiendo a WhatsApp (916484051) para agendar! 🚀');

      setTimeout(() => {
        window.open(whatsappURL, '_blank');
      }, 1000);
    });
  }

  // ==================== 10. FORMULARIO DE SUSCRIPCIÓN ====================
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletterEmail').value.trim();
      if (email) {
        showToast('¡Gracias por suscribirte! Te enviaremos promociones exclusivas. 🎉');
        newsletterForm.reset();
      }
    });
  }

  // ==================== 16. MODAL LEGAL ====================
  const legalModal = document.getElementById('legalModal');
  const closeLegalModal = document.getElementById('closeLegalModal');
  const linkPrivacy = document.getElementById('link-privacy');
  const linkTerms = document.getElementById('link-terms');
  const legalModalTitle = document.getElementById('legalModalTitle');
  const legalModalContent = document.getElementById('legalModalContent');

  if (linkPrivacy && legalModal) {
    linkPrivacy.addEventListener('click', (e) => {
      e.preventDefault();
      legalModalTitle.textContent = 'Política de Privacidad';
      legalModalContent.innerHTML = `
        <p><strong>IMPERIUM BARBER SHOP</strong> respeta y protege la privacidad de todos los usuarios y clientes.</p><br>
        <p>1. <strong>Uso de datos:</strong> La información proporcionada al agendar citas (nombre, teléfono, fecha y hora) es utilizada exclusivamente para coordinar y confirmar la atención vía WhatsApp al número 916484051.</p><br>
        <p>2. <strong>Confidencialidad:</strong> No compartimos ni vendemos datos a terceros.</p><br>
        <p>3. <strong>Contacto:</strong> Para cualquier consulta sobre tus datos, puedes escribirnos directamente a info@imperiumbarbershop.com o a nuestro WhatsApp 916484051.</p>
      `;
      legalModal.classList.add('active');
    });
  }

  if (linkTerms && legalModal) {
    linkTerms.addEventListener('click', (e) => {
      e.preventDefault();
      legalModalTitle.textContent = 'Términos y Condiciones';
      legalModalContent.innerHTML = `
        <p>Bienvenido a <strong>IMPERIUM BARBER SHOP</strong>.</p><br>
        <p>1. <strong>Reservas:</strong> Al solicitar una cita en línea, la confirmación final se realiza a través de nuestro canal oficial de WhatsApp (916484051).</p><br>
        <p>2. <strong>Puntualidad:</strong> Recomendamos asistir 5 minutos antes de la hora programada para garantizar una experiencia cómoda y completa.</p><br>
        <p>3. <strong>Pagos:</strong> Aceptamos efectivo, VISA, Mastercard, Yape y Plin en nuestro establecimiento ubicado en Bagua Grande, Amazonas.</p>
      `;
      legalModal.classList.add('active');
    });
  }

  if (closeLegalModal && legalModal) {
    closeLegalModal.addEventListener('click', () => {
      legalModal.classList.remove('active');
    });
  }

  // Close Modals on Overlay Backdrop Click
  window.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      videoModal.classList.remove('active');
      videoIframe.src = '';
    }
    if (e.target === serviceModal) {
      serviceModal.classList.remove('active');
    }
    if (e.target === legalModal) {
      legalModal.classList.remove('active');
    }
  });

  // ==================== HELPER: TOAST NOTIFICATION ====================
  function showToast(text) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast-msg';
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

});
