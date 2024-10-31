$(document).ready(function() {
    $('#loginForm').on('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

        const username = $('#username').val().trim();
        const password = $('#password').val().trim();
        const url = 'https://ykyoaekhp9.execute-api.us-east-1.amazonaws.com/Stage1/login/'; // URL de tu API

        if (username === '' || password === '') {
            swal("Error", "Por favor, completa todos los campos.", "error");
            return;
        }

        // Construye el objeto en el formato requerido
        const userJsonObject = {
            body: JSON.stringify({
                Nombre_Usuario: username,
                Contrasena: password
            })
        };

        // Realiza la solicitud POST al servidor
        $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(userJsonObject), // Envía el objeto en el formato correcto
            success: function(response) {
                // Verifica el statusCode
                if (response.statusCode === 200) {
                    // Almacenar el nombre de usuario y rol en localStorage
                    localStorage.setItem('username', username);
                    localStorage.setItem('userRole', response.role || "Usuario"); // Cambia esto según cómo obtengas el rol

                    // Redirigir a la página deseada
                    window.location.href = "dashboard.html"; // Cambia esto a la página que deseas redirigir
                } else {
                    // Si el statusCode no es 200, muestra un mensaje de error
                    const errorBody = JSON.parse(response.body);
                    swal("Error", errorBody.message || "Error desconocido", "error");
                }
            },
            error: function(xhr, status, error) {
                // Muestra un mensaje de error si no se puede conectar a la base de datos
                if (xhr.status === 0) {
                    swal("Error de Conexión", "No se pudo conectar a la base de datos. Por favor, intenta más tarde.", "error");
                } else {
                    swal("Error", 'Error en el inicio de sesión: ' + (xhr.responseJSON ? xhr.responseJSON.message : "Error desconocido"), "error");
                }
            }
        });
    });
});
