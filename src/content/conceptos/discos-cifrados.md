---
titulo: Discos cifrados
descripcion: "Qué pasa al adquirir un disco con BitLocker, LUKS o VeraCrypt, el papel del TPM y las vías para obtener la clave."
tipo: concepto
asignaturas: [forense]
etiquetas: [cifrado, BitLocker, LUKS, VeraCrypt, FileVault, TPM, clave de recuperación]
tema: forense/adquisicion
orden: 8
actualizado: 2026-11-27
---

## Concepto

Muchos discos están **cifrados**: BitLocker en Windows, LUKS en Linux, FileVault en
macOS o contenedores VeraCrypt (heredero de TrueCrypt). El cifrado puede apoyarse en el
chip **TPM** del equipo, que guarda la clave y la entrega al arrancar si el sistema no
ha sido modificado.

**La clonación funciona igual**, pero sin la clave la copia es ilegible: solo se ven
datos aleatorios.

## Antes de apagar

Si el equipo está **encendido y el volumen desbloqueado**, apagarlo puede hacer que se
pierda el acceso para siempre. Conviene:

1. Comprobar si hay cifrado (en Windows, `manage-bde -status`).
2. Si lo hay, valorar una [adquisición en vivo](../adquisicion-en-frio-y-en-vivo/):
   - [Volcar la RAM](../volcado-de-memoria/), donde puede estar la clave.
   - Adquirir el **volumen ya descifrado** mientras está montado.

## Vías para obtener la clave

| Vía | Ejemplo |
| --- | --- |
| Que la faciliten | El titular, la empresa o el administrador (autorización mediante) |
| Clave de recuperación guardada | BitLocker: cuenta Microsoft del usuario, Active Directory o Entra ID de la empresa |
| Memoria RAM | Extraer la clave de un volcado hecho con el volumen desbloqueado |
| Fuerza bruta o diccionario | Sobre la contraseña, no sobre la clave: solo viable si es débil |
| Ataques al hardware | Interceptar la comunicación con el chip TPM (*sniffing*) en ciertos equipos |

> [!WARNING]
> Acceder a un volumen cifrado necesita que la **autorización lo cubra expresamente**.
> Abrirlo sin ella puede convertir lo que contiene en
> [prueba ilícita](../prueba-ilicita/).

## Resumen

Un disco cifrado se clona igual, pero hay que conseguir la clave. Lo más eficaz es
detectarlo **antes de apagar** y adquirir en vivo: RAM y volumen descifrado. Después
quedan la clave de recuperación, la fuerza bruta o ataques al hardware.
