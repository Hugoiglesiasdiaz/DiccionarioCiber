---
titulo: Herramientas de hacking ético por fase
descripcion: "Qué tipo de herramienta se usa en cada fase (reconocimiento, escaneo, explotación y post-explotación) y qué distribuciones las traen instaladas."
tipo: concepto
asignaturas: [hacking]
etiquetas: [herramientas, reconocimiento, escaneo, explotación, post-explotación, Kali Linux, Parrot, BlackArch, CommandoVM]
tema: hacking/introduccion
orden: 11
actualizado: 2026-11-27
---

## Por fase

| Fase | Para qué | Ejemplos |
| --- | --- | --- |
| **Descubrimiento y reconocimiento** | Reunir información del objetivo, sobre todo pasiva | [theHarvester](../../herramientas/theharvester/), [Maltego](../../herramientas/maltego/), [Shodan](../../herramientas/shodan/), [whois](../../herramientas/whois/), [dig](../../herramientas/dig/) |
| **Escaneo y monitorización** | Descubrir equipos, puertos, servicios y vulnerabilidades; analizar el tráfico | Nmap, Nessus, OpenVAS, Nikto, Wireshark |
| **Explotación** | Aprovechar las vulnerabilidades | Metasploit, Burp Suite, sqlmap |
| **Post-explotación** | Escalar privilegios, moverse lateralmente, extraer credenciales | Mimikatz, BloodHound, LinPEAS / WinPEAS |

## Distribuciones para pentesting

En lugar de instalar todo a mano se usan distribuciones que ya las incluyen:

| Distribución | Base | Notas |
| --- | --- | --- |
| **Kali Linux** | Debian | La más extendida. Versiones para ARM, nube, WSL y móviles (NetHunter) |
| **ParrotOS** | Debian | Alternativa ligera; colabora con HackTheBox |
| **BlackArch** | Arch Linux | Miles de herramientas en su repositorio |
| **CommandoVM** | Windows | Script de Mandiant que convierte un Windows en un entorno ofensivo |

> [!WARNING]
> Que una herramienta venga en Kali no la hace legal de usar contra cualquiera: solo
> contra sistemas propios o con autorización
> ([Delitos informáticos](../delitos-informaticos-codigo-penal/)).

## Resumen

Reconocimiento (OSINT), escaneo, explotación y post-explotación tienen herramientas
propias. Kali Linux es la distribución de referencia que las agrupa.
