/*
 * CONFIGURACIÓN DEL SITIO
 * -----------------------
 * Aquí viven el número de WhatsApp y los mensajes que se escriben solos al
 * abrir el chat. Todos los botones de ambas páginas toman sus datos de aquí.
 *
 * Si cambias el número, revisa también el README (sección "Cambiar el número"):
 * los HTML guardan una copia de respaldo para quien navega sin JavaScript.
 */
window.SITE_CONFIG = {
  whatsapp: {
    // Formato internacional, solo dígitos: sin +, sin espacios ni guiones.
    number: '56955293073',

    // Cómo se muestra el número escrito en la página.
    display: '+56 9 5529 3073',

    // Mensaje inicial según la página (atributo data-wa-message del <body>).
    messages: {
      domicilio: 'Hola Roxana, quisiera agendar una atención de enfermería a domicilio.',
      examen: 'Hola Roxana, soy estudiante de la Universidad de Aconcagua y quisiera información sobre la preparación del examen de título.'
    }
  }
};
