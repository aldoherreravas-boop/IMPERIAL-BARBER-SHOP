/**
 * IMPERIAL BARBER SHOP - Interactive Scripts
 * Slogan: "TU MEJOR ESTILO CON NOSOTROS"
 * WhatsApp: 916484051
 * Dirección: Jr. Miguel Grau N° 687, Bagua grande - Amazonas
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
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
      if (navMenu.classList.contains('active')) {
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

  // Sticky Navbar Effect on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active Section Link Detection
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Services Filter Functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Quick Book Service Handler
  const quickBookBtns = document.querySelectorAll('.btn-quick-book');
  const serviceSelect = document.getElementById('bookingService');

  quickBookBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service');
      
      if (serviceSelect && serviceName) {
        // Find matching option
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].value.toLowerCase().includes(serviceName.toLowerCase())) {
            serviceSelect.selectedIndex = i;
            break;
          }
        }
      }

      // Scroll to booking section smoothly
      const bookingSection = document.getElementById('reserva');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // WhatsApp Form Generator
  const bookingForm = document.getElementById('bookingForm');

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
        showToast('Por favor completa los campos obligatorios (Nombre, Fecha y Hora).');
        return;
      }

      // Format WhatsApp Message
      let message = `💈 *NUEVA RESERVA - IMPERIAL BARBER SHOP* 💈\n\n`;
      message += `👤 *Cliente:* ${name}\n`;
      if (phone) message += `📱 *Teléfono:* ${phone}\n`;
      message += `✂️ *Servicio:* ${service}\n`;
      message += `👨‍🎨 *Barbero:* ${barber}\n`;
      message += `📅 *Fecha:* ${date}\n`;
      message += `⏰ *Hora:* ${time}\n`;
      if (notes) message += `📝 *Notas:* ${notes}\n\n`;
      message += `📍 *Dirección:* Jr. Miguel Grau N° 687, Bagua Grande - Amazonas\n`;
      message += `✨ *Slogan:* TU MEJOR ESTILO CON NOSOTROS`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappURL = `https://wa.me/51916484051?text=${encodedMessage}`;

      showToast('¡Redirigiendo a WhatsApp para agendar tu cita! 🚀');

      setTimeout(() => {
        window.open(whatsappURL, '_blank');
      }, 1000);
    });
  }

  // Toast Notification Helper
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

  // Set minimum date input to today
  const dateInput = document.getElementById('bookingDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }
});
