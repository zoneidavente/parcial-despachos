const formulario = document.getElementById("despachoForm");
const respuesta = document.getElementById("respuesta");

formulario.addEventListener("submit", async function(event) {

    event.preventDefault();

    const datos = {
        solicitante: document.getElementById("solicitante").value,
        correo: document.getElementById("correo").value,
        codigo_producto: document.getElementById("codigo_producto").value,
        cantidad: Number(document.getElementById("cantidad").value),
        destino: document.getElementById("destino").value,
        motivo: document.getElementById("motivo").value
    };

    console.log("Datos enviados:", datos);

    respuesta.style.display = "block";
    respuesta.innerHTML = "Enviando...";

    try {

        const resultado = await fetch(
            "https://hook.us2.make.com/4ntsfvyoflp54fkwgv3c4lin3ctaknev",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            }
        );

        console.log("Estado HTTP:", resultado.status);

        const texto = await resultado.text();

        console.log("Respuesta de Make:", texto);

try {
    const data = JSON.parse(texto);

    respuesta.innerHTML =
        "<strong>" + data.estado + "</strong><br>" +
        data.mensaje +
        (data.saldo_resultante !== undefined
            ? "<br>Saldo resultante: " + data.saldo_resultante
            : "");

} catch (error) {

    respuesta.innerHTML =
        "Respuesta recibida: " + texto;
}

    } catch (error) {

        console.error("ERROR:", error);

        respuesta.innerHTML =
            "Error: " + error.message;
    }

});