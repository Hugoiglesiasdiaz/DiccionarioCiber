---
titulo: Aprender hacking ético (CTF, certificaciones y bug bounty)
descripcion: "Dónde practicar legalmente (CTF y máquinas vulnerables), qué certificaciones existen, cómo funcionan los programas de bug bounty y el fichero security.txt."
tipo: concepto
asignaturas: [hacking]
etiquetas: [CTF, capture the flag, HackTheBox, TryHackMe, VulnHub, OSCP, eJPT, CEH, bug bounty, security.txt, writeup]
tema: hacking/introduccion
orden: 12
actualizado: 2026-11-27
---

## CTF (*Capture The Flag*)

Retos legales, diseñados para ser atacados. Al resolverlos se obtiene una *flag* (una
cadena de texto que lo demuestra). Después es habitual publicar un **writeup** explicando
la solución.

| Formato | Cómo es |
| --- | --- |
| **Retos** (estilo *Jeopardy*) | Ejercicios sueltos por categorías: web, criptografía, esteganografía, forense, *reversing*, explotación (*pwn*) |
| **Máquinas** (*boxes*) | Un sistema vulnerable en caja negra, con una *flag* de usuario y otra de administrador |
| **Redes / labs** | Varias máquinas que simulan una empresa; hay que pivotar entre ellas |
| **Ataque y defensa** | Equipos que atacan los sistemas de los demás mientras defienden los suyos |

## Dónde practicar

| Plataforma | Notas |
| --- | --- |
| **TryHackMe** | Aprendizaje guiado por *rooms*; la más didáctica para empezar |
| **HackTheBox** | Máquinas por dificultad, academia y certificaciones propias |
| **VulnHub** / **HackMyVM** | Máquinas virtuales para descargar y atacar en local |
| **PicoCTF** | Retos para estudiantes |
| **Atenea** (CCN-CERT) y **Academia Hacker** (INCIBE) | Plataformas españolas con retos y formación |
| **CTFtime** | Calendario y clasificaciones de competiciones CTF |

## Certificaciones

| Certificación | Nivel |
| --- | --- |
| **eJPT** | Inicial: primer paso en pentesting |
| **CompTIA Pentest+** | Intermedio; cubre todas las fases de un pentest |
| **CEH** (EC-Council) | Muy conocida; tradicionalmente criticada por ser poco práctica |
| **eCPPT**, **PNPT**, **HTB CPTS** | Intermedio-avanzado, con examen práctico |
| **OSCP** (OffSec) | La más valorada en pentesting; examen práctico exigente |

## Bug bounty

Programas en los que una empresa **paga por reportar vulnerabilidades** de sus sistemas,
dentro de unas reglas. Se gestionan en plataformas como HackerOne, Bugcrowd o Intigriti
(europea).

Muchas webs publican cómo reportar fallos en el fichero **`security.txt`** (RFC 9116), en
la ruta `/.well-known/security.txt`:

```text
Contact: mailto:security@example.com
Policy: https://example.com/politica-de-divulgacion
Encryption: https://example.com/pgp.txt
```

> [!TIP]
> Fuera de un programa de bug bounty o un contrato, no hay autorización para probar nada.
> Respeta siempre el alcance de cada programa.

## Resumen

Se practica con CTF y máquinas vulnerables (TryHackMe, HackTheBox, VulnHub), se
acredita con certificaciones (eJPT para empezar, OSCP como referencia) y se puede ganar
dinero de forma legal con bug bounty.
