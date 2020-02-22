Abrir archivo index.html en la raíz del folder para ver el formulario

Formulario de inicio de sesión:

	<form action="#" method="POST" id="iniciarSesion">
      		<fieldset>
        	<legend>Iniciar Sesión</legend>
        	<label for="emailtlf">Email o Teléfono</label> <br>
          		<input type="text" name="emailtlf" id="emailtlf"  required><br>
        	<label for="pass">Contraseña</label><br>
          		<input type="password" name="pass" id="pass" placeholder="********" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" required><br><br>
          		Mostrar Contraseña<input type="checkbox"id="mostrar" onclick="mostrarContraseña(this)"><br><br>
        		<input type="submit" value="Aceptar" id="aceptar" onclick="iniciarSesion()">
        			<div id="resultado"></div>
      		</fieldset>
    	</form>
	
	Los input emailtlf y pass están marcados como required.
	El input pass tiene su propio pattern de contraseña, para verificar que cumple con los requisitos
	El div resultado aparece mostrando diferentes mensajes según sea preciso.
	El boton aceptar llama a la función de iniciarSesion() en el código js al darle click

Boton de cerrar sesion:

	<button class="cerrar-sesion" id="cerrarSesion" onclick="cerrarSesion()">Cerrar sesion</button>

	Aparece tras iniciar sesión.
	Llama a la funcion cerrarSesion() al darle click.

Formulario de registro:

	<form action="#" id="registro">
      		<fieldset>
          	<legend>Registro</legend>
          	<label for="nombre">Nombre*</label><br>
            		<input type="text" name="nombre" id="nombre" pattern="[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}" required><br>
         	 <label for="apellido">Apellido*</label><br>
            		<input type="text" name="apellido" id="apellido" pattern="[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}" required><br>
          	<label for="emtlf">Email o Teléfono*</label><br>
            		<input type="text" name="emtlf" id="emtlf" onkeyup="emailTlfValidity()" required><br>
         	 <label for="pass1">Contraseña*</label><br>
            		<input type="password" name="pass1" id="pass1" placeholder="********" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" required><br>
          	<label for="pass2">Confirma contraseña*</label><br>
            		<input type="password" name="pass2" id="pass2" onkeyup="confirmaPass()" placeholder="********" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" required><br>
          	<label for="fechanac">Fecha de nacimiento</label><br>
            		<input type="date" name="fechanac" id="fechanac"><br><br>
          			<div id="resultadoRegistro"></div><br><br>
          		<input type="submit" value="Registrarse" id="registrarse" onclick="registro()">
      		</fieldset>
    	</form>

	Todos los input exceptuando fechanac están marcados como required
	Nombre, apellido, pass1 y pass2 tienen sus propios pattern para verificar que la información introducida es válida
	El campo emtlf llama a la función emailTlfValidity().
	El campo pass2 llama la función confirmaPass().
	El div resultadoRegistro aparece mostrando el mensaje de registro correcto cuando todo ha ido bien.
	El boton registrarse llama a la función registro() al darle click.

Cuadro de texto de aviso de cookies:

	<div id="cajacookies" style="display: block;">
    		<div class="inner">
    			<p><button onclick="ponerCookie()" class="pull-right"><i class="fa fa-times"></i> Aceptar y cerrar éste mensaje</button>
    			Éste sitio web usa cookies, si permanece aquí acepta su uso.
    			Puede leer más sobre el uso de cookies en nuestra <a href="http://politicadecookies.com">política de privacidad</a>.
    			</p>
  		</div>
	</div>

	Muestra en pantalla el aviso de que el sitio usa cookies.
	El boton de aceptar y cerrar este mensaje llama a la función ponerCookie(). 

JavaScript:

	var formulario = document.getElementById("iniciarSesion");
	var boton = document.getElementById("cerrarSesion");
	var formularioRegistro = document.getElementById("registro")
	var mensaje = document.getElementById("resultadoRegistro");
	var resultado = document.getElementById("resultado");
	
	Se crean las variables que contienen la información del formulario de inicio de sesion y de registro,
	del boton de cerrar sesion y de los div que mostrarán los mensajes necesarios, para su posterior uso.

Función compruebaCookie():

	window.onload = function compruebaCookie() {
    		var cookie = getCookie('cookie');
    		if (cookie != '') {
        		formulario.style.display = 'none';
       			boton.style.display = 'block';
    		}
	}

	Se la llama automáticamente al cargar la página.
	Recoge la cookie llamada 'cookie' en una variable a la que se llama con el mismo nombre,
	despues comprueba si dicha cookie está vacia, en caso de no estarlo, significa que se dejó la sesión iniciada anteriormente,
	por lo que hace desaparecer el formulario de inicio de sesión y muetra el botón de cerrar sesión.

Funcion iniciarSesion():

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

	Si el formulario es válido, recoge los datos introducidos y los guarda en las variables usuario y password.
	Acto seguido, compara dichas variables con las variables user y pass, que contienen el usuario y la contraseña guardados en la cookie.
	Si la comparacion es satisfactoria, se muestra el boton de cerrar sesión y desaparece el formulario. 
	Si no es válida la información introducida, muetra un mensaje de error en el div.
	Si no existe ninguna cookie, muestra un mensaje de aviso.

Función mostrarConstraseña(checkbox):

	function mostrarContraseña(checkbox) {
    		var password = document.getElementById("pass");
    		if (checkbox.checked) {
        		password.type = 'text';
    		} else {
        		password.type = 'password';
    		}		
	}

	Se le pasa la variable checkbox del formulario de inicio de sesion.
	Recoge la información contenida en el input pass.
	Si el checkbox está checked, cambia el tipo de dato del input pass a texto.
	En caso contrario, cambia el tipo de dato del input pass a password.

Función registro():

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

	Si el formulario es válido, recoge emtlf y pass2 en las variables usuario y password.
	Acto seguido, crea la cookie con el contenido de las variables previamente recogidas.
	Muestra el mensaje de registro correcto.

Función confirmaPass():

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

	Recoge la pass2 en la variable element.
	Acto seguido, comprueba que se ha quitado el foco del input pass2 y llama a la función verifyPass pasándole element.
	Dicha funcion recoge pass1 en la variable primeraPass.
	Compara input, que contiene pass2, con primeraPass.
	En caso de no ser iguales, muestra el mensaje de error.
	En caso de ser iguales, todo funciona correctamente.

Funcion emailTlfValidity():

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
            			nput.setCustomValidity('Introduce un valor correcto.');
        		}
    		}
	}

	Recoge el campo emtlf en la variable element.
	Comprueba que se ha quitado el foco del input emtlf y llama la función verifyTelefonoEmail pasándole element.
	Comprueba la validez de la información recogida pasándole dos patterns, si pasa satisfactoriamente uno de los dos, todo va bien.

Funcion setCookie():

	function setCookie(cname, cvalue, exhours) {
    		var d = new Date();
    		d.setTime(d.getTime() + (exhours * 60 * 60 * 1000));
    		var expires = "expires=" + d.toGMTString();
    		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	Crea una cookie con los valores cname, cvalue, exhours que se le han pasado desde otra función.

Función getCookie(cname):
		
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

	Devuelve la información de la cookie pedida destre otra función.

Función initCompruebaIniCookie():

	function initCompruebaIniCookie() {
    		if (getCookie('CookieInicial') != "1") {
        		document.getElementById("cajacookies").style.display = "block";
    		} else {
        		document.getElementById("cajacookies").style.display = "none";
    		}
	}

	Al cargar la página, siempre comprueba si existe la cookie inicial.
	En caso de existir, hace desaparecer el div de aviso de cookies.
	En caso de no existir, muestra el aviso.

Función ponerCookie():

	function ponerCookie() {
    		setCookie('CookieInicial', '1', 365);
    		document.getElementById("cajacookies").style.display = "none";
	}

	Crea la cookie inicial con el nombre CookieInicial.
	Hace desaparecer el div de aviso de cookies.

