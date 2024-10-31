$(document).ready(function() {
    // Obtener el nombre de usuario y rol desde localStorage
    const username = localStorage.getItem('username');
    const userRole = 'Administrador'; // Puedes cambiar esto si necesitas obtener el rol de otra manera

    // Mostrar nombre de usuario y rol en el dashboard
    $('#username').text(username);
    $('#userRole').text(userRole);

    // URL del endpoint
    const url = 'https://ykyoaekhp9.execute-api.us-east-1.amazonaws.com/Stage1/VolticUsersGetFunction/';

    // Función para cargar usuarios
    function loadUsers() {
        $.ajax({
            url: url,
            type: 'GET', // Cambia a GET si solo necesitas obtener datos
            contentType: 'application/json',
            success: function(response) {
                // Verifica si la respuesta contiene usuarios
                if (response.statusCode === 200) {
                    const users = JSON.parse(response.body); // Asegúrate de que la respuesta sea JSON
                    populateTable(users);
                } else {
                    console.error("Error en la respuesta del servidor", response);
                }
            },
            error: function(xhr) {
                console.error("Error al obtener usuarios", xhr);
            }
        });
    }

    // Función para agregar los usuarios a la tabla
    function populateTable(users) {
        const userTableBody = $('#usersTableBody'); // Asegúrate de que este ID coincida con tu HTML
        userTableBody.empty(); // Limpiar la tabla antes de agregar nuevos usuarios

        if (users.length === 0) {
            userTableBody.append('<tr><td colspan="3">No hay usuarios registrados.</td></tr>');
            return;
        }

        users.forEach(user => {
            const row = `
                <tr>
                    <td>${user.Nombre_Usuario}</td>
                    <td>${user.Email}</td>
                    <td>${user.Estado}</td>
                </tr>
            `;
            userTableBody.append(row);
        });
    }

    // Cargar y mostrar los usuarios automáticamente al cargar la página
    loadUsers(); // Llama a la función para cargar los usuarios
    $('#usersSection').show(); // Muestra la sección de usuarios
});
