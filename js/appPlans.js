document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('.btnInscribir');

    console.log(`Botones encontrados: ${botones.length}`); // Verifica si se detectan los botones

    botones.forEach((boton, index) => {
        boton.addEventListener('click', () => {
            const card = boton.closest('.card');
            const titulo = card.querySelector('.card-title')?.textContent.trim();
            const precio = card.querySelector('p strong')?.textContent.trim();
            const beneficios = Array.from(card.querySelectorAll('ul li')).map(li => li.textContent.trim());

            if (!titulo || !precio) {
                console.warn(`No se pudo obtener la info del plan en el botón ${index}`);
                return;
            }

            const plan = {
                titulo,
                precio,
                beneficios
            };

            const carrito = JSON.parse(localStorage.getItem('carritoPlanes')) || [];
            carrito.push(plan);
            localStorage.setItem('carritoPlanes', JSON.stringify(carrito));

            console.log(`Plan agregado:`, plan);
            alert(`¡${titulo} agregado al carrito!`);
        });
    });
});