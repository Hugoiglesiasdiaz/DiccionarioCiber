---
titulo: Legislación aplicable al análisis forense
descripcion: "Chuleta de las leyes españolas y europeas que afectan a una investigación forense: derechos fundamentales, proceso, datos personales y Código Penal."
tipo: concepto
asignaturas: [normativa, forense]
etiquetas: [constitución, LEC, LECrim, RGPD, LOPDGDD, LSSI, código penal, ley 25/2007, secretos empresariales]
tema: forense/introduccion
orden: 5
actualizado: 2026-11-27
---

## Concepto

Una investigación forense toca derechos fundamentales (intimidad, secreto de las
comunicaciones) y acaba, muchas veces, en un juicio. Hay que conocer qué normas marcan
**qué se puede hacer**, **cómo se aporta la prueba** y **qué conductas son delito**.

Esta nota es un mapa para saber dónde buscar, no un resumen exhaustivo de cada ley.

## Constitución Española

| Artículo | Derecho | Por qué importa |
| --- | --- | --- |
| 9.3 y 24.1 | Seguridad jurídica y tutela judicial efectiva | Proceso con garantías; la prueba tiene que obtenerse respetándolas |
| 18.1 | Honor, intimidad y propia imagen | Revisar un equipo afecta a la intimidad de su usuario |
| 18.3 | Secreto de las comunicaciones | Correos, chats y llamadas necesitan autorización judicial |
| 18.4 | Límites al uso de la informática | Base del derecho a la protección de datos (STC 292/2000) |

Vulnerar estos derechos al obtener una prueba la convierte en
[prueba ilícita](../prueba-ilicita/).

## Leyes procesales

| Norma | Artículos | Qué regula |
| --- | --- | --- |
| **LEC** (Ley 1/2000, de Enjuiciamiento Civil) | 299 | Medios de prueba admitidos |
| | 382 y 384 | Aportación de instrumentos y documentos electrónicos |
| | 319 y 326 | Fuerza probatoria de documentos públicos y privados |
| | 335–352 | Prueba pericial (ver [Perito informático](../perito-informatico/)) |
| **LECrim** (Ley de Enjuiciamiento Criminal, 1882) | 326 | Recogida de vestigios y pruebas |
| | 588 bis y ss. | Interceptación de comunicaciones y medidas de investigación tecnológica (reforma LO 13/2015) |
| | 588 sexies a–c | Registro de dispositivos: incautar un equipo **no** autoriza a acceder a su contenido; hace falta autorización judicial, que fija el alcance y las condiciones de integridad |
| **LOPJ** (LO 6/1985) | 11.1 | Exclusión de la prueba obtenida vulnerando derechos fundamentales |
| **Circular FGE 5/2019** | — | Criterios de la Fiscalía sobre el registro de dispositivos; exige firmar las copias con un hash |

## Datos personales y comunicaciones

| Norma | Qué aporta al forense |
| --- | --- |
| **RGPD** (Reglamento UE 2016/679) | Tratar datos personales durante una investigación exige base legal, minimización y confidencialidad |
| **LOPDGDD** (LO 3/2018) | Adapta el RGPD y regula los **derechos digitales** en el trabajo (uso de dispositivos de la empresa, videovigilancia, desconexión) |
| **LSSI** (Ley 34/2002) | Servicios de la sociedad de la información y comercio electrónico |
| **Ley 25/2007** de conservación de datos | Los operadores guardan **metadatos** de las comunicaciones (quién, cuándo, cuánto, IP) durante 12 meses, nunca el contenido. Sigue vigente, pero limitada por la jurisprudencia europea |

## Propiedad intelectual y secretos empresariales

- **Ley de Propiedad Intelectual** (RDL 1/1996), arts. 100.3 y 100.5, y **Directiva
  2009/24/CE**, art. 6: permiten, con condiciones, estudiar y **descompilar** un
  programa. El TJUE (asunto C-13/20, 2021) admite descompilar sin permiso para corregir
  errores que afecten a su funcionamiento.
- **Ley 1/2019 de Secretos Empresariales**: obtener secretos de una empresa es ilícito
  (art. 2.2), salvo excepciones como descubrir una irregularidad en defensa del interés
  general o la actuación de las autoridades (art. 2.3).

## Código Penal (LO 10/1995)

Delitos que más aparecen en investigaciones informáticas:

| Delito | Artículo |
| --- | --- |
| Ciberacoso | 172 ter |
| *Child grooming* | 183 |
| Pornografía infantil | 189 |
| Descubrimiento y revelación de secretos | 197 |
| Difusión de imágenes íntimas obtenidas con consentimiento | 197.7 |
| Acceso ilícito a sistemas e interceptación de transmisiones | 197 bis |
| Calumnias e injurias | 205–210 |
| Estafa informática | 248.2 |
| Uso no autorizado de terminales (*phreaking*) | 256 |
| Daños informáticos (borrar o alterar datos) | 264 |
| Interrupción de sistemas informáticos | 264 bis |
| Fabricar o facilitar programas para cometer los anteriores | 264 ter |
| Delitos contra la propiedad intelectual | 270 y ss. |
| Falsedades documentales (el concepto de documento está en el art. 26) | 390–400 |
| Ciberterrorismo | 573 |

Además, casi cualquier delito «tradicional» puede cometerse con medios informáticos:
amenazas, coacciones, extorsión, blanqueo, incitación al odio…

> [!NOTE] Directiva 2013/40/UE
> Armoniza en la UE los delitos contra sistemas de información. España la incorporó con
> la reforma del Código Penal de 2015 (LO 1/2015).

> [!WARNING]
> El propio investigador también puede cometer estos delitos: entrar en una cuenta o un
> sistema sin autorización es el art. 197 bis, aunque sea para obtener pruebas.

## Resumen

CE art. 18 (intimidad, comunicaciones, datos) marca los límites. La LEC y la LECrim dicen
cómo se aporta la prueba y la LOPJ (art. 11.1) qué pasa si se obtiene mal. RGPD y
LOPDGDD rigen los datos personales. El Código Penal tipifica los delitos que se
investigan y los que puede cometer un investigador descuidado.
