/*

Autor: Mario Sánchez Mosquero

Curso: 2º Desarrollo de Aplicaciones Web (DAW)

Para explición más detallada del código leer Readme.md

*/


//Se recogen los datos que se utilizarán después en la funciones iniciarSesion() y registro()
var formulario = document.getElementById("iniciarSesion");
var boton = document.getElementById("cerrarSesion");
var formularioRegistro = document.getElementById("registro")
var mensaje = document.getElementById("resultadoRegistro");
var resultado = document.getElementById("resultado");

//Al cargar la página, se comprueba si se dejó la sesión iniciada, en caso afirmativo, activa el botón de cerrar sesión
window.onload = function compruebaCookie() {
    var cookie = getCookie('cookie');
    if (cookie != '') {
        formulario.style.display = 'none';
        boton.style.display = 'block';
    }
}

//Funciçon encargada de gestionar el inicio de sesión
function iniciarSesion() {

    formulario.addEventListener("submit", function (evt) {
        if (formulario.checkValidity() === false) {
            evt.preventDefault();
            return false;
        } else {
            evt.preventDefault();
            var usuario = document.getElementById("emailtlf").value;
            var password = document.getElementById("pass").value;
            var user = getCookie('usuario');
            var pass = getCookie('password');
            if (user != '' && pass != '') {
                if (usuario === user && password === pass) {
                    setCookie('cookie', 'unahora', 1);
                    formulario.style.display = 'none';
                    boton.style.display = 'block';

                } else {

                    resultado.style.display = 'block';
                    resultado.className = "error";
                    resultado.innerHTML = "Usuario o contraseña incorrectos";

                }
            } else {
                resultado.className = "warning";
                resultado.style.display = 'block';
                resultado.innerHTML = "Adevertencia: Codigo de error: 0001; Descripción: NO COOKIE;";
            }
            return false;
        }
    })
}

//Función encargada de mostrar u ocultar la contraseña según se desee
function mostrarContraseña(checkbox) {
    var password = document.getElementById("pass");
    if (checkbox.checked) {
        password.type = 'text';
    } else {
        password.type = 'password';
    }
}


//Función encargada de borrar la cookie creada en iniciarSesion() y volver a mostrar el formulario de inicio de sesión
function cerrarSesion () {
        setCookie('cookie', '', -1);
        location.reload();
}

//Función encargada de gestionar el registro del usuario
function registro() {
    formularioRegistro.addEventListener("submit", function (evt) {
        if (formularioRegistro.checkValidity() === false) {
            evt.preventDefault();
            return false;
        } else {
            evt.preventDefault();
            var usuario = document.getElementById("emtlf").value;
            var password = document.getElementById("pass2").value;
            setCookie('usuario', usuario);
            setCookie('password', password);
            mensaje.className = "success"
            mensaje.innerHTML = "Te has registrado correctamente.";
            return false;
        }
    })
}

//Función encargada de comparar las contraseñas en el formulario de registro
function confirmaPass() {
    var element = document.getElementById("pass2");
    element.addEventListener("blur", verifyPass);

    function verifyPass(input) {
        input = event.target;
        var primeraPass = document.getElementById('pass1');
        if (input.value != primeraPass.value) {
            input.setCustomValidity('Las contraseñas no coinciden');
        } else {
            input.setCustomValidity('');
        }
    }
}

//Función encargada de verificar si se ha introducido un email o un teléfono correctamente
function emailTlfValidity() {
    var element = document.getElementById("emtlf");
    element.addEventListener('blur', verifyTelefonoEmail);

    function verifyTelefonoEmail(input) {
        input = event.target;
        var resultadoEmail = input.value.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/gi);
        var resultadoTelefono = input.value.match(/^(\+34|0034|34)?[6|7|8|9][0-9]{8}$/gi);

        if (input.value == resultadoEmail || input.value == resultadoTelefono) {
            input.setCustomValidity('');
        } else {
            input.setCustomValidity('Introduce un valor correcto.');
        }
    }
}

//Función encargada de crear las cookies
function setCookie(cname, cvalue, exhours) {
    var d = new Date();
    d.setTime(d.getTime() + (exhours * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//Función encargada de recuperar una cookie pasandole el nombre de la misma
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

initCompruebaIniCookie(); //Llamada a dicha función

//Función encargada de mostrar la caja de aceptar cookies u ocultarla, dependiendo de si ya existe la cookie inicial
function initCompruebaIniCookie() {
    if (getCookie('CookieInicial') != "1") {
        document.getElementById("cajacookies").style.display = "block";
    } else {
        document.getElementById("cajacookies").style.display = "none";
    }
}

//Función encargada de crear la cookie inicial
function ponerCookie() {
    setCookie('CookieInicial', '1', 365);
    document.getElementById("cajacookies").style.display = "none";
}