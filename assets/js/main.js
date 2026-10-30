/*
 * Comportamiento compartido de ambas páginas.
 * Los datos (número y mensajes) se editan en config.js, no aquí.
 */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  // Enlaces de WhatsApp: todo elemento con data-wa recibe el enlace wa.me con
  // el mensaje de la página. data-wa="examen" fuerza un mensaje específico.
  const config = window.SITE_CONFIG;

  if (config && config.whatsapp) {
    const wa = config.whatsapp;
    const pageMessage = document.body.dataset.waMessage;

    const waUrl = (key) => {
      const text = wa.messages[key];
      return 'https://wa.me/' + wa.number + (text ? '?text=' + encodeURIComponent(text) : '');
    };

    document.querySelectorAll('[data-wa]').forEach((link) => {
      link.href = waUrl(link.dataset.wa || pageMessage);
    });

    document.querySelectorAll('[data-wa-number]').forEach((el) => {
      el.textContent = wa.display;
    });
  }

  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Aparición suave al hacer scroll (fade + 12 px). Se omite si la persona
  // pidió reducir el movimiento en su sistema.
  const items = document.querySelectorAll('.reveal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  // Pequeño desfase entre elementos hermanos (tarjetas, pasos) para que no
  // aparezcan todos de golpe.
  items.forEach((el) => {
    const siblings = Array.from(el.parentElement.children).filter((child) => child.classList.contains('reveal'));
    const index = siblings.indexOf(el);
    if (index > 0) el.style.setProperty('--reveal-delay', Math.min(index, 4) * 0.08 + 's');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

  items.forEach((el) => observer.observe(el));
})();
