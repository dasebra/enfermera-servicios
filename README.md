# Roxana Salas · Landings de enfermería

Dos páginas independientes para Roxana Salas, enfermera - docente. Las dos comparten identidad visual, pero cada una tiene su propio público y su propio mensaje de WhatsApp.

| Página | Archivo | Ruta publicada | Público |
| --- | --- | --- | --- |
| Enfermería a domicilio | `index.html` | `/` | Familias y adultos mayores de Los Andes y San Felipe |
| Preparación del examen de título | `examen-de-titulo.html` | `/examen-de-titulo` | Estudiantes de la Universidad de Aconcagua, sede San Felipe |

Es un sitio estático: HTML, CSS y JavaScript, sin framework, sin backend y sin formularios. Todo el contacto es por WhatsApp, así que la página no recoge datos de nadie.

## Estructura

```
index.html                  Landing 1: enfermería a domicilio
examen-de-titulo.html       Landing 2: preparación del examen de título
assets/
  css/styles.css            Estilos compartidos. Colores y tipografías en :root
  js/config.js              Número de WhatsApp y mensajes (editar aquí)
  js/main.js                Arma los enlaces de WhatsApp y la aparición al hacer scroll
  fonts/                    Montserrat (títulos y texto), alojada en el sitio
  img/                      Foto de muestra, imágenes para redes sociales e íconos
referencias/                Capturas de referencias visuales (no se enlazan desde el sitio)
licencias/                  Licencias de las fuentes y los íconos
vercel.json                 URLs sin ".html" en Vercel
.nojekyll                   Le indica a GitHub Pages que publique los archivos tal cual
```

## Ver el sitio en tu computador

Puedes hacer doble clic en `index.html`. Para verlo igual que en internet, levanta un servidor local desde la carpeta del proyecto:

```bash
python3 -m http.server 8000
```

Luego abre http://localhost:8000 en el navegador.

## Antes de publicar: datos pendientes

Todo lo que Roxana no ha confirmado está marcado con el texto **por confirmar**, a veces como `[por confirmar]` y a veces como `[por confirmar con Roxana]`. En la página se ve como una etiqueta con borde punteado, a propósito, para que nadie publique sin revisar.

Para encontrarlos todos, busca `por confirmar` en el proyecto (en VS Code: Ctrl+Shift+F o Cmd+Shift+F), o desde la terminal:

```bash
grep -rn "por confirmar" --include=*.html .
```

Pendientes a la fecha:

- **Ambas páginas:** dominio final, fotos de Roxana y el texto de "Sobre mí".
- **Enfermería a domicilio:** precios, días y horarios, años de experiencia, número de registro en la Superintendencia de Salud, si se necesita receta médica y reseñas.
- **Examen de título:** el contenido de "Qué incluye la preparación" (es un borrador), carreras incluidas, duración, horarios y precios de las sesiones, y la frase "Servicio independiente, sin vínculo oficial con la Universidad de Aconcagua".

Cuando tengas un dato, reemplaza la etiqueta completa. Por ejemplo, esto:

```html
<span class="tbd">[por confirmar]</span>
```

pasa a ser solo el texto confirmado. Si un dato no se va a publicar, borra la línea o la pregunta completa.

## Cambiar textos

Los textos están directamente en `index.html` y `examen-de-titulo.html`. Cada sección tiene un comentario con su nombre (por ejemplo `<!-- 3. Servicios -->`), así que basta con buscarlo y editar el texto entre las etiquetas.

Recuerda las reglas de redacción del brief: tuteo, frases cortas, sin tecnicismos, sin promesas médicas ni garantías de resultado, y nunca prometer que alguien va a aprobar el examen.

Si cambias el título o la descripción de una página, actualiza también las etiquetas `<title>`, `<meta name="description">` y `og:` del `<head>`, que es lo que se ve en Google y al compartir el enlace.

## Cambiar colores y tipografías

Todo está en el bloque `:root` al inicio de `assets/css/styles.css`:

```css
--navy: #12284c;        /* color de marca */
--sky: #dcebf7;         /* celeste suave: franjas y círculos */
--sky-accent: #8ec5e8;  /* celeste vivo: solo líneas y subrayados */
--ink: #1b2a41;         /* texto */
--whatsapp: #25d366;    /* botón flotante */
--font-title: "Montserrat", ...;
--font-body: "Montserrat", ...;
```

Si cambias un color, revisa que el texto siga teniendo buen contraste (mínimo AA) con https://webaim.org/resources/contrastchecker/.

Para cambiar de tipografía, reemplaza el archivo `.woff2` de `assets/fonts/`, actualiza el bloque `@font-face` del CSS y la línea `<link rel="preload">` del `<head>` de cada página.

## Cambiar el número o los mensajes de WhatsApp

1. Edita `assets/js/config.js`:

   ```js
   number: '56955293073',          // solo dígitos, con código de país, sin +
   display: '+56 9 5529 3073',     // como se lee en pantalla
   messages: {
     domicilio: 'Hola Roxana, quisiera agendar ...',
     examen: 'Hola Roxana, soy estudiante ...'
   }
   ```

   Con eso, todos los botones y el número escrito en ambas páginas usan los datos nuevos.

2. Los HTML guardan una copia de respaldo de los enlaces, para quien navega sin JavaScript, y el teléfono de los datos estructurados para Google. Para dejarlos iguales, usa buscar y reemplazar en todo el proyecto:
   - `56955293073` por el número nuevo en formato de enlace.
   - `+56 9 5529 3073` por el número nuevo tal como se lee.

Cada página elige su mensaje con el atributo `data-wa-message` de la etiqueta `<body>` (`domicilio` o `examen`). Cualquier enlace con el atributo `data-wa` se convierte en un enlace de WhatsApp.

## Cambiar las fotos

Hoy las páginas muestran una ilustración de muestra (`assets/img/roxana-placeholder.svg`). Para poner las fotos reales:

1. Convierte cada foto a WebP en https://squoosh.app. Para el hero, unos 800 × 960 px y **menos de 150 KB**. Para "Sobre mí", el mismo formato.
2. Guárdalas en `assets/img/`, por ejemplo `roxana-hero.webp` y `roxana-sobre-mi.webp`.
3. En cada HTML, busca `roxana-placeholder.svg` y cambia el `src`. Ajusta el `alt` para describir la foto (por ejemplo, "Roxana Salas, enfermera, sonriendo en una visita a domicilio").
4. La foto del hero **no** lleva `loading="lazy"`. La de "Sobre mí", sí.

Usa fotos cálidas: manos, cuidado, hogar. Nada de agujas en primer plano ni imágenes clínicas fuertes.

Las imágenes para redes sociales (`assets/img/og-enfermeria.jpg` y `og-examen.jpg`, de 1200 × 630 px) se pueden reemplazar por otras del mismo tamaño y con el mismo nombre.

## Publicar el sitio

Antes de publicar en el dominio definitivo, reemplaza `https://example.com` por el dominio real en ambos HTML: está en `canonical`, `og:url`, `og:image` y en el bloque de datos estructurados (`application/ld+json`). Sin ese cambio, la imagen no aparece al compartir el enlace por WhatsApp o Facebook.

No hay paso de compilación: se publica la carpeta tal cual.

### Netlify

1. Entra a https://app.netlify.com y elige **Add new site → Import an existing project**.
2. Conecta el repositorio de GitHub.
3. Deja **Build command** vacío y **Publish directory** en `.` (la raíz).
4. Publica. Netlify sirve `examen-de-titulo.html` también como `/examen-de-titulo`.

Para probar sin conectar GitHub, también puedes arrastrar la carpeta del proyecto a https://app.netlify.com/drop.

### Vercel

1. Entra a https://vercel.com/new e importa el repositorio.
2. En **Framework Preset** elige **Other**. Deja vacíos los comandos de build y el directorio de salida.
3. Publica. El archivo `vercel.json` ya activa las URLs sin `.html`.

### GitHub Pages

1. En el repositorio, ve a **Settings → Pages**.
2. En **Source**, elige **Deploy from a branch**, la rama principal y la carpeta `/ (root)`.
3. Guarda. El sitio queda en `https://<usuario>.github.io/<repositorio>/` en uno o dos minutos.
4. Para usar un dominio propio, escríbelo en **Custom domain** y sigue las instrucciones de DNS.

### Después de publicar

- Prueba los botones en un teléfono: deben abrir WhatsApp con el mensaje ya escrito.
- Revisa cómo se ve el enlace al compartirlo con https://developers.facebook.com/tools/debug/.
- Mide el rendimiento con https://pagespeed.web.dev (la meta es 90 o más en móvil).

## Privacidad y analítica

El sitio no usa cookies ni herramientas de seguimiento, y las fuentes se sirven desde el propio sitio, sin Google Fonts. El pie de página lo dice explícitamente.

Si más adelante se agrega analítica, usa una herramienta liviana y sin cookies (por ejemplo, Plausible o GoatCounter) y **actualiza la frase de privacidad del pie** en ambas páginas.

## Accesibilidad

- Un solo `h1` por página y jerarquía de títulos ordenada.
- Contraste AA en todos los textos. Zonas táctiles de 44 px o más.
- Foco visible al navegar con teclado y enlace "Saltar al contenido".
- Textos alternativos en todas las imágenes. Los íconos decorativos están ocultos para lectores de pantalla.
- La aparición al hacer scroll se desactiva si el sistema pide reducir el movimiento.
- Las preguntas frecuentes usan `<details>`, que funciona con teclado y lector de pantalla sin JavaScript.

El botón flotante usa el verde oficial de WhatsApp con el ícono blanco, como pide el brief. Esa combinación tiene menos contraste que el resto del sitio, pero se reconoce por su forma y tiene una etiqueta para lectores de pantalla ("Escribir a Roxana por WhatsApp").

## Referencias visuales

La carpeta `referencias/` es para guardar capturas del pin de Pinterest y de enfermeratecuida.cl. Ver `referencias/README.md`.

## Créditos

- Tipografía [Montserrat](https://github.com/JulietaUla/Montserrat), licencia SIL Open Font License 1.1.
- Íconos de [Lucide](https://lucide.dev), licencia ISC.
- Ícono de WhatsApp de [Simple Icons](https://simpleicons.org), CC0. WhatsApp es una marca de Meta; se usa solo para identificar el canal de contacto.

Los textos de las licencias están en `licencias/`.
