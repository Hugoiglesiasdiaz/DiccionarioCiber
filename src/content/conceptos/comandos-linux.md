---
titulo: Chuleta de comandos Linux
descripcion: "Los comandos de Linux más usados, agrupados: navegación, ficheros, permisos, procesos, redirecciones, búsqueda, texto (grep, awk, sed), red, sistema, paquetes y scripts."
tipo: concepto
asignaturas: [hacking]
extras: [comandos, linux]
etiquetas: [linux, bash, terminal, chuleta, cheatsheet, grep, find, awk, sed, chmod, curl, kali]
actualizado: 2026-11-27
---

## Navegación

| Comando | Qué hace |
| --- | --- |
| `pwd` | Carpeta actual |
| `ls -la` | Listar todo, incluidos ocultos, con permisos y tamaños |
| `ls -lh` | Tamaños legibles (K, M, G) |
| `cd /ruta` · `cd ..` · `cd ~` · `cd -` | Ir a una ruta · subir un nivel · ir a tu carpeta personal · volver a la anterior |
| `tree -L 2` | Árbol de carpetas hasta 2 niveles |

## Ficheros y carpetas

```bash
mkdir -p proyecto/docs          # crear carpeta (y las intermedias)
touch notas.txt                 # crear fichero vacío (o actualizar su fecha)
cp origen.txt destino.txt       # copiar
cp -r carpeta/ copia/           # copiar una carpeta entera
mv viejo.txt nuevo.txt          # mover o renombrar
rm fichero.txt                  # borrar
rm -r carpeta/                  # borrar una carpeta y su contenido
rmdir carpeta/                  # borrar una carpeta vacía
ln -s /ruta/real enlace         # enlace simbólico
```

> [!WARNING]
> `rm` no usa papelera. `rm -rf` sobre la ruta equivocada no tiene vuelta atrás: revisa
> la ruta antes de pulsar Intro.

## Ver contenido

| Comando | Qué hace |
| --- | --- |
| `cat fichero` | Mostrar todo |
| `less fichero` | Ver paginado (`/` busca, `q` sale) |
| `head -n 10 fichero` | Primeras 10 líneas |
| `tail -n 5 fichero` | Últimas 5 líneas |
| `tail -f /var/log/syslog` | Seguir un log en tiempo real |
| `wc -l -w fichero` | Contar líneas y palabras |
| `nano fichero` | Editar en la terminal (`Ctrl+O` guarda, `Ctrl+X` sale) |
| `file fichero` | Tipo real del fichero, por su contenido |
| `strings binario` | Cadenas de texto legibles dentro de un binario |

## Permisos y propietarios

```bash
chmod 744 script.sh             # rwx propietario, r grupo, r otros
chmod +x script.sh              # dar permiso de ejecución
chmod u+w,go-w fichero          # forma simbólica
sudo chown usuario fichero      # cambiar propietario
sudo chown usuario:grupo fichero
sudo chgrp grupo fichero        # cambiar grupo
```

| Número | Permisos | | Número | Permisos |
| --- | --- | --- | --- | --- |
| 7 | `rwx` | | 3 | `-wx` |
| 6 | `rw-` | | 2 | `-w-` |
| 5 | `r-x` | | 1 | `--x` |
| 4 | `r--` | | 0 | `---` |

Los tres dígitos son **propietario, grupo y otros**: `644` es `rw-r--r--`.

> [!TIP] En pentesting
> `find / -perm -4000 -type f 2>/dev/null` lista los binarios con **SUID**, que se
> ejecutan con los permisos de su propietario: un clásico para escalar privilegios.

## Usuarios

| Comando | Qué hace |
| --- | --- |
| `whoami` · `id` | Usuario actual · su UID, GID y grupos |
| `sudo comando` · `sudo -l` | Ejecutar como root · qué puedes ejecutar con sudo |
| `su - usuario` | Cambiar de usuario |
| `sudo useradd -m usuario` · `sudo passwd usuario` | Crear usuario · cambiar su contraseña |
| `sudo usermod -aG grupo usuario` | Añadir a un grupo |
| `cat /etc/passwd` | Usuarios del sistema (`/etc/shadow` guarda los hashes) |

## Procesos

| Comando | Qué hace |
| --- | --- |
| `ps aux` | Todos los procesos |
| `top` / `htop` | Procesos en tiempo real |
| `kill 1234` · `kill -9 1234` | Terminar el proceso 1234 · forzarlo |
| `pkill nombre` | Terminar por nombre |
| `comando &` | Lanzar en segundo plano |
| `jobs` · `fg %1` · `bg %1` | Ver tareas · traer al primer plano · seguir en segundo plano |
| `Ctrl+C` · `Ctrl+Z` | Cancelar · pausar el proceso actual |
| `nohup comando &` | Seguir ejecutando aunque se cierre la terminal |

## Redirecciones y tuberías

```bash
ls > listado.txt                # salida a un fichero (lo sobrescribe)
ls >> listado.txt               # añadir al final
comando 2> errores.txt          # solo los errores
comando > todo.txt 2>&1         # salida y errores juntos
comando 2>/dev/null             # descartar los errores
cat log1.txt log2.txt > juntos.txt
comando | tee salida.txt        # ver en pantalla y guardar a la vez
grep error log.txt | wc -l      # tubería: la salida de uno es la entrada del otro
```

## Buscar

```bash
find . -name "*.log"                    # por nombre, desde la carpeta actual
find / -name "archivo.sh" 2>/dev/null   # en todo el sistema, sin errores de permisos
find . -type f -mtime -7                # modificados en los últimos 7 días
find /var -type f -size +100M           # mayores de 100 MB
find . -name "*.log" -exec grep -l "ERROR" {} +   # ejecutar un comando sobre lo encontrado
which python3                           # ruta de un comando
type -p bash
locate fichero                          # búsqueda rápida en un índice (updatedb)
```

| `grep` | Qué hace |
| --- | --- |
| `grep "texto" fichero` | Líneas que contienen el texto |
| `grep -i` | Sin distinguir mayúsculas |
| `grep -r "texto" /ruta` | En todos los ficheros de una carpeta |
| `grep -v` | Líneas que **no** lo contienen |
| `grep -n` / `-c` | Con número de línea / contar coincidencias |
| `grep -E "a\|b"` | Expresión regular extendida |
| `grep -o` | Solo la parte que coincide |

## Procesar texto

**awk**: trabaja por columnas.

```bash
awk -F, '{print $1}' datos.csv                 # primera columna, separador coma
awk -F, '{print $1, $2}' datos.csv             # dos columnas separadas por espacio
awk -F, 'NR > 1 {print $2}' datos.csv          # saltando la cabecera
awk -F, 'NR > 1 {s += $2; n++} END {print s/n}' datos.csv   # media de la columna 2
awk '{print $NF}' fichero                      # última columna
```

**sed**: sustituye y edita líneas.

```bash
sed 's/malo/bueno/g' notas.txt                 # mostrar con la sustitución
sed -i 's/malo/bueno/g' notas.txt              # aplicarla al fichero
sed -i '/^$/d' log.txt                         # borrar líneas vacías
sed -i 's/ /-/' registro.txt                   # primer espacio de cada línea por un guion
sed -i '$a\Nueva línea' registro.txt           # añadir una línea al final
sed -n '10,20p' fichero                        # mostrar solo las líneas 10 a 20
```

**Otros**:

```bash
sort fichero | uniq -c | sort -nr   # contar repeticiones, de más a menos
cut -d: -f1 /etc/passwd             # primer campo con separador ":"
tr 'a-z' 'A-Z' < fichero            # pasar a mayúsculas
diff a.txt b.txt                    # diferencias entre ficheros
```

## Red

| Comando | Qué hace |
| --- | --- |
| `ip a` | IP de todas las interfaces |
| `ip r` | Tabla de rutas (puerta de enlace) |
| `ping -c 4 8.8.8.8` | Comprobar conectividad (4 paquetes) |
| `ss -tulpn` | Puertos en escucha y qué proceso los usa |
| `curl -o pagina.html https://example.com` | Descargar con el nombre indicado |
| `curl -O https://example.com/fichero.zip` | Descargar con su nombre original |
| `curl -I https://example.com` | Solo las cabeceras HTTP |
| `wget -r -l 2 -A "*.txt" https://example.com` | Descarga recursiva ([wget](../../herramientas/wget/)) |
| `dig example.com` · `host example.com` | Consultas DNS ([dig](../../herramientas/dig/)) |
| `nc -lvnp 4444` | Escuchar en un puerto con netcat |
| `ssh usuario@host` · `scp f usuario@host:/ruta` | Conectar · copiar por SSH |

## Sistema

| Comando | Qué hace |
| --- | --- |
| `uname -a` | Kernel y arquitectura |
| `cat /etc/os-release` | Distribución y versión |
| `hostname` | Nombre del equipo |
| `free -h` | Memoria |
| `df -h` | Espacio en disco por partición |
| `du -sh carpeta` | Lo que ocupa una carpeta |
| `lsblk` | Discos y particiones |
| `uptime` | Tiempo encendido y carga |
| `history` | Comandos ejecutados |
| `sudo systemctl status\|start\|stop\|enable servicio` | Gestionar servicios |
| `sudo journalctl -u servicio` | Logs de un servicio |

## Paquetes y compresión

```bash
sudo apt update && sudo apt upgrade     # actualizar
sudo apt install paquete                # instalar
apt search texto                        # buscar paquetes
tar -czvf copia.tar.gz carpeta/         # comprimir
tar -xzvf copia.tar.gz                  # descomprimir
zip -r copia.zip carpeta/ && unzip copia.zip
```

## Scripts básicos

```bash
#!/bin/bash
# backup.sh: copia una carpeta y avisa al terminar
ORIGEN="$HOME/Documentos"
DESTINO="$HOME/Backup"

mkdir -p "$DESTINO"
cp -r "$ORIGEN" "$DESTINO"
echo "Respaldo completado"
```

```bash
#!/bin/bash
# descargar_datos.sh: descarga un CSV y se queda con la segunda columna
URL="https://example.com/datos.csv"
curl -fsSL "$URL" -o datos.csv
awk -F, 'NR > 1 {print $2}' datos.csv > salida.txt
echo "Datos guardados en salida.txt"
```

Se ejecutan con `chmod +x script.sh` y después `./script.sh`.

| Elemento | Sintaxis |
| --- | --- |
| Variable | `NOMBRE="valor"` y se usa `"$NOMBRE"` |
| Argumentos | `$1`, `$2`… · todos: `"$@"` · cuántos: `$#` |
| Resultado de un comando | `HOY=$(date +%F)` |
| Condición | `if [ -f fichero ]; then …; fi` |
| Bucle | `for f in *.txt; do echo "$f"; done` |
| Código de salida | `$?` (0 = correcto) |

## Resumen

Lo imprescindible: `ls`, `cd`, `cp`, `mv`, `rm`, `cat`, `less`, `chmod`, `ps`, `kill`,
`find`, `grep`, redirecciones (`>`, `>>`, `2>`, `|`) y `sudo`. Para tratar texto, `awk`
(columnas) y `sed` (sustituciones). Para red, `ip`, `ss`, `curl` y `dig`.
