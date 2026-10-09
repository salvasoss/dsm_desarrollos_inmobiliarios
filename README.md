# DSM Desarrollos Inmobiliarios

Sitio institucional en **React, JavaScript, HTML y SCSS**. Respeta la lógica de catálogo → tarjeta → detalle de Vicaria para venta y construcción, con la estética del boceto de DSM: blanco cálido, grafito, rojo, fotografías grandes y títulos serif. Los entregados se muestran completos en una sola página. El contacto por WhatsApp es la acción principal.

## Ver la propuesta sin instalar nada

Abrí **DSM_preview.html** con tu navegador. Incluye las cinco páginas, las fichas de venta y construcción, las imágenes y las fuentes en un solo archivo. La interfaz funciona sin conexión; los recorridos de YouTube y WhatsApp necesitan conexión. La navegación usa `#/` en esta copia de revisión. El proyecto publicado usa URLs normales.

Al abrir el HTML directamente como archivo, un recorrido asignado se abre mediante el enlace a YouTube dentro del popup. Para probar el reproductor integrado con inicio automático, usá `npm run preview` o el sitio publicado en Cloudflare Pages.

La copia HTML es una salida de revisión. Para continuar el desarrollo, editá los archivos de `src/` y regenerala después de compilar.

## Desarrollo

Requisito: Node.js **22.12 o superior**.

```bash
npm ci
npm run dev
```

Abrí la dirección que indique Vite, normalmente `http://localhost:5173`.

```bash
npm test              # Mensajes de WhatsApp y enlaces/reproductores de YouTube
npm run build         # Genera dist/
npm run preview       # Revisa la versión compilada con un servidor local
npm run preview:html  # Regenera DSM_preview.html a partir de dist/
```

## Activar WhatsApp

Copiá `.env.example` a `.env` y completá:

```dotenv
VITE_WHATSAPP_NUMBER=NUMERO_INTERNACIONAL_DE_DSM
VITE_SITE_URL=https://TU_DOMINIO
```

El número tiene que incluir código de país. Se aceptan dígitos, espacios, `+`, paréntesis, puntos y guiones; se normaliza a dígitos. Para un celular argentino, usá `549` + código de área + número, sin el `0` de área ni el `15` local. Confirmá el formato con el número real de DSM.

**El número está vacío por decisión del usuario.** Hasta configurarlo, los botones muestran la consulta lista para revisar/copiar. No se usa un destinatario inventado. Una vez configurado y recompilado, los botones abren `wa.me` con el mensaje correspondiente y el formulario abre WhatsApp con nombre, teléfono opcional, propiedad de interés y consulta. El visitante decide cuándo enviar el mensaje en WhatsApp.

Las variables `VITE_` son públicas y se incorporan al compilar. El teléfono comercial es público; no pongas secretos en ellas. Después de editar `.env`, reiniciá Vite; después de cambiar variables en Cloudflare, hacé una nueva compilación.

## Páginas

| Página | URL | Contenido |
| --- | --- | --- |
| Inicio | `/` | CTA a venta y construcción → 2 entregados → 3 en construcción → contacto |
| En venta | `/en-venta` | Última unidad destacada, materiales, ficha y coordinación de visita |
| En construcción | `/en-construccion` | Catálogo de las 3 obras y contacto para cada proyecto |
| Entregados | `/entregados` | Las 2 obras con datos, características, collage ampliable y enlace a su recorrido de YouTube |
| Contacto | `/contacto` | Contacto directo y formulario que prepara un mensaje para WhatsApp |
| Ficha de venta/construcción | `/duplex/:duplexId` | Popup automático de YouTube, galería ampliable, características, materiales cuando hay datos y WhatsApp contextual |

Ejemplo de ficha: `/duplex/docta-mza-76-lote-7`.

Las tarjetas de los entregados enlazan directamente a su proyecto dentro de `/entregados`. Las antiguas URLs de detalle de entregados redirigen a esa sección para conservar los enlaces existentes. La franja «Diseño · Materiales · Terminaciones» se eliminó del inicio.

## Estructura equivalente a Vicaria

Cada componente con estilos tiene su archivo JSX y SCSS en la misma carpeta. `App.jsx` mantiene el encabezado y el pie comunes y declara las rutas.

| Vicaria | DSM | Función |
| --- | --- | --- |
| `vicariaProducts.js` | `src/data/duplexes.js` | Datos del catálogo y búsqueda por identificador |
| `ProductListContainer` | `DuplexListContainer` | Selecciona las unidades de cada estado |
| `ProductsList` | `DuplexList` | Genera la lista de tarjetas |
| `Product` | `DuplexCard` | Enlaza a la ficha o al proyecto entregado dentro de su página, y permite consultar |
| `ItemDetailContainer` | `DuplexDetailContainer` | Obtiene la unidad usando el parámetro actual de la URL |
| `ItemDetail` | `DuplexDetail` | Presenta una ficha reutilizable para venta y construcción |
| `Main` | `pages/Main/Main` | Compone el inicio |
| — | `DeliveredProject` y `PhotoCollage` | Presentan cada obra entregada completa dentro de la misma página |
| — | `VideoTour` | Abre el recorrido al ingresar a una ficha y permite cerrarlo o volver a abrirlo |

Se reutilizan las mismas tarjetas en el inicio y los catálogos. Los datos son locales y no tienen demoras simuladas ni necesitan un backend. Vite reemplaza al compilador de CRA para facilitar el desarrollo y generar archivos estáticos.

## Cambiar obras, fotos y videos

- **Datos:** `src/data/duplexes.js`. Cada obra tiene un `id` único y un `category`: `venta`, `construccion` o `entregado`. La misma plantilla resuelve las fichas de venta y construcción; los entregados se presentan en su página común. El cambio de categoría actualiza los catálogos automáticamente.
- **Más unidades en venta:** agregá obras con `category: 'venta'` o cambiá el estado de una obra existente. La página ya presenta varias unidades y adapta el texto de última unidad cuando corresponde.
- **Fotos:** agregá archivos a `public/img/` y sus claves a `src/data/media.js`. Usá esas claves en `cover` y `gallery` de cada obra. Al reemplazar una visualización por una foto real, cambiá `illustrative` a `false` y actualizá su texto alternativo.
- **Recorridos de YouTube:** completá `youtubeTourUrl` en cada obra con el enlace a su video o lista de reproducción. Los entregados usan ese enlace como botón a YouTube; las fichas de venta y construcción lo usan en el popup automático. Ver la configuración debajo.
- **Video adicional MP4/WebM:** la ficha conserva el campo opcional `videoUrl` para un archivo propio, junto con `videoPoster` y `videoCaptions` (VTT). No se usa ese campo para enlaces de YouTube.
- **Paleta y tipografías:** `src/styles/_tokens.scss`.
- **Mensajes de WhatsApp:** `src/utils/whatsapp.js`. Las consultas sobre obras entregadas llevan el interés a los proyectos disponibles.

Las imágenes incluidas son **ilustrativas**, tomadas de la propuesta visual. Los textos, las tipologías y las especificaciones parten del boceto facilitado. Antes de publicar, reemplazá las imágenes por fotos de las obras correspondientes y confirmá características, ubicación y disponibilidad. Los nombres Tipo A/B/C y Proyecto 01/02 son editables.

## Asignar los recorridos de YouTube

Los enlaces están vacíos hasta recibir los videos reales. El popup ya se abre automáticamente en las cuatro fichas de venta y construcción, con una presentación de «Próximamente, el recorrido». Los entregados muestran el recorrido pendiente sin un enlace inventado.

1. Subí el recorrido al canal de YouTube de DSM y habilitá su reproducción en otros sitios.
2. Copiá el enlace del **video o de una lista de reproducción** a `youtubeTourUrl` de la obra en `src/data/duplexes.js`. Se aceptan enlaces normales de YouTube, `youtu.be`, Shorts y directos.
3. Si querés un video común para las fichas que todavía no tengan uno propio, completá `VITE_YOUTUBE_TOUR_URL` en `.env` o en Cloudflare Pages. El enlace propio de cada obra tiene prioridad. Los entregados conservan su enlace individual para evitar mostrar un recorrido de otra obra.
4. Reiniciá el servidor de desarrollo o volvé a compilar para aplicar la configuración.

La dirección general del canal (`youtube.com/@...` o `/channel/...`) no identifica qué video reproducir: asigná un video o una lista concreta de ese canal. No se busca automáticamente el último video subido ni se requiere una clave de API.

Con un recorrido asignado, el reproductor solicita inicio automático **sin sonido** para respetar las restricciones habituales del navegador. El visitante puede activar el sonido desde los controles. Puede cerrar el popup con la cruz, Escape, el fondo o «Seguir viendo la ficha», y volver a abrirlo desde «Ver recorrido». Al cerrar se retira el reproductor para detener la reproducción. Al ingresar a otra ficha, el popup vuelve a abrirse con el recorrido correspondiente.

Los collages de Entregados usan todas las imágenes disponibles en `gallery` y permiten ampliarlas y recorrerlas. La muestra incluye dos imágenes ilustrativas por proyecto; agregá las fotos reales en esa lista para ampliar cada collage.

## Cloudflare Pages

El proyecto genera un sitio estático. No necesita Functions ni un servidor de Node en producción.

Configuración para un repositorio en GitHub/GitLab:

| Ajuste | Valor |
| --- | --- |
| Framework | React (Vite) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | Carpeta que contiene `package.json` |
| Node | 22.12 o superior; configurá `NODE_VERSION` si hace falta |
| Variable de contacto | `VITE_WHATSAPP_NUMBER` con el número de DSM |
| Variable de dominio | `VITE_SITE_URL` con el dominio definitivo |
| Video común opcional | `VITE_YOUTUBE_TOUR_URL` con el enlace de un video o lista de YouTube |

Se incluye `public/_redirects`, que llega a `dist/_redirects`, para resolver las rutas de React al abrir o recargar una ficha directamente. No agregues un `404.html` estático al directorio de salida de esta SPA. También se incluyen encabezados básicos y caché para los assets con nombre versionado.

La carpeta `dist/` del ZIP es la compilación de muestra, **con el número de WhatsApp y los recorridos pendientes**. Para un Direct Upload definitivo, configurá el número y los videos, y generá nuevamente `dist/` con `npm run build` antes de subir esa carpeta. La copia `DSM_preview.html` no se usa como directorio de despliegue.

Documentación oficial: [build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/) y [serving Pages / SPA](https://developers.cloudflare.com/pages/configuration/serving-pages/).

## Verificación realizada

- Compilación de producción con Vite.
- 9 pruebas: 4 de mensajes/enlaces de WhatsApp y 5 de formatos de YouTube, destinos inválidos, listas y configuración del reproductor.
- Comprobación de interacción en un DOM simulado: inicio sin la franja eliminada, dos entregados completos, collages ampliables y redirección de las antiguas fichas entregadas.
- Apertura automática, cierre y reapertura del popup en la ficha de venta y las tres de construcción; cambio de obra sin conservar el video anterior.
- Pruebas con enlaces de muestra solo en memoria: reproductor de YouTube, prioridad del video de cada obra, enlace de los entregados y alternativa de reproducción en el HTML local. No se guardaron esos videos en el catálogo.
- Orden del inicio, cantidad de obras y ausencia de contenido de financiación en la implementación.
- Sintaxis del JavaScript de la copia HTML e integración de imágenes y fuentes.

**La revisión visual en un navegador real y la reproducción de los videos reales quedan pendientes.** Se comprobó la lógica del popup en un DOM simulado; las restricciones del entorno impidieron la revisión en navegador. Antes de publicar, usá `npm run preview`, recorré las páginas, probá el menú móvil, los collages y el formulario, y verificá los videos asignados y el número real de DSM.
