# Pagina-Edicion-de-Credenciales-IPN

## Descripción del Proyecto

Este proyecto es una aplicación web desarrollada en React para la edición y generación de credenciales del IPN (Instituto Politécnico Nacional). Permite a los usuarios cargar imágenes, editar información y descargar las credenciales generadas.

## Características

*   **Edición de Credenciales:** Interfaz intuitiva para modificar datos de las credenciales.
*   **Carga de Imágenes:** Soporte para cargar imágenes de fondo y fotos de perfil.
*   **Generación de Credenciales:** Creación dinámica de credenciales basadas en la información proporcionada.
*   **Descarga de Credenciales:** Funcionalidad para descargar las credenciales generadas en formato de imagen.
*   **Migración a React:** Reescritura completa del proyecto de HTML, CSS y JavaScript puro a React para una mejor modularidad y mantenimiento.
*   **Descargador de Canvas Actualizado:** Implementación de un nuevo y mejorado sistema de descarga de contenido del canvas.

## Tecnologías Utilizadas

*   **Frontend:**
    *   React
    *   TypeScript
    *   HTML5
    *   CSS3

## Configuración del Proyecto

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local.

### Prerrequisitos

Asegúrate de tener Node.js y npm (Node Package Manager) instalados en tu sistema.

*   [Node.js](https://nodejs.org/es/download/) (incluye npm)

### Instalación

1.  Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/Pagina-Edicion-de-Credenciales-IPN.git
    ```
2.  Navega al directorio del proyecto:
    ```bash
    cd Pagina-Edicion-de-Credenciales-IPN/app
    ```
3.  Instala las dependencias:
    ```bash
    npm install
    ```

### Ejecución

Para iniciar la aplicación en modo de desarrollo:

```bash
npm start
```

Esto abrirá la aplicación en tu navegador predeterminado en `http://localhost:3000`.

## Estructura del Proyecto

```
.
├── public/             # Archivos estáticos y plantilla HTML
├── src/                # Código fuente de la aplicación React
│   ├── App.tsx         # Componente principal de la aplicación
│   ├── index.tsx       # Punto de entrada de la aplicación
│   ├── App.css         # Estilos globales de la aplicación
│   ├── index.css       # Estilos generales
│   └── assets/         # Recursos como imágenes
├── package.json        # Metadatos del proyecto y dependencias
├── package-lock.json   # Bloqueo de dependencias
├── README.md           # Este archivo
└── tsconfig.json       # Configuración de TypeScript
```

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor, sigue estos pasos:

1.  Haz un fork del repositorio.
2.  Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3.  Realiza tus cambios y haz commit (`git commit -m 'feat: Añade nueva característica'`).
4.  Sube tus cambios (`git push origin feature/nueva-caracteristica`).
5.  Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
