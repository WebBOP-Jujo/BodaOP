// Script para Smooth Scrolling al hacer clic en los enlaces de navegación

document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los enlaces dentro de la navegación que empiezan con '#'
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 1. Prevenir el comportamiento por defecto del ancla (el salto brusco)
            e.preventDefault();

            // 2. Obtener el ID del objetivo (quitando el '#')
            const targetId = this.getAttribute('href').substring(1);

            // 3. Encontrar el elemento sección correspondiente a ese ID
            const targetElement = document.getElementById(targetId);

            // 4. Comprobar si el elemento existe
            if (targetElement) {
                // 5. Calcular la posición del elemento respecto al viewport
                const elementPosition = targetElement.getBoundingClientRect().top;

                // 6. Calcular la posición actual del scroll
                const offsetPosition = elementPosition + window.pageYOffset - getNavHeight();

                // 7. Hacer scroll suave a esa posición
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Función para obtener la altura de la barra de navegación (si es sticky)
    // Así el scroll no queda oculto debajo de la barra fija.
    function getNavHeight() {
        const nav = document.querySelector('nav');
        return nav ? nav.offsetHeight : 0; // Devuelve 0 si no encuentra la nav
    }

    // Opcional: Añadir clase 'active' al enlace de nav cuando se hace scroll a la sección
    // (Esto es un poco más avanzado, pero mejora la UX)
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', navHighlighter);

    function navHighlighter() {
        let scrollY = window.pageYOffset;
        const navHeight = getNavHeight();

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            // Ajustar el top para considerar la altura de la nav fija
            const sectionTop = current.offsetTop - navHeight - 50; // -50 para activar un poco antes
            let sectionId = current.getAttribute('id');

            /*
            Si la posición actual del scroll está dentro de los límites de esta sección
            (desde su inicio ajustado hasta el final de la sección)
            */
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector('nav a[href*=' + sectionId + ']').classList.add('active');
            } else {
                document.querySelector('nav a[href*=' + sectionId + ']').classList.remove('active');
            }
        });
    }
     // Añadir una clase CSS '.active' en style.css para resaltar el enlace activo, por ejemplo:
     // nav a.active { color: #A0522D; background-color: rgba(222, 184, 135, 0.3); }

}); // Fin del DOMContentLoaded