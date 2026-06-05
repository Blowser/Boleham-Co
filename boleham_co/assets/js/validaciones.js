// ===============================
// VALIDACIÓN LOGIN
// ===============================

const formLogin = document.getElementById("form-login");

if (formLogin) {
  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    const correo = document.getElementById("correo-login").value.trim();
    const pass = document.getElementById("password-login").value.trim();
    const mensaje = document.getElementById("mensaje-login");

    if (!validarEmail(correo)) {
      mostrarError(mensaje, "⚠ Ingresa un correo válido.");
      return;
    }

    if (pass.length < 6) {
      mostrarError(mensaje, "⚠ La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    mostrarExito(mensaje, "✔ Sesión iniciada correctamente.");
  });

  formLogin.addEventListener("reset", () => {
    document.getElementById("mensaje-login").textContent = "";
  });
}



// ===============================
// VALIDACIÓN REGISTRO
// ===============================

const formRegistro = document.getElementById("form-registro");

if (formRegistro) {
  formRegistro.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const usuario = document.getElementById("usuario")?.value.trim();
    const correo = document.getElementById("correo").value.trim();
    const pass = document.getElementById("password").value.trim();
    const pass2 = document.getElementById("password2").value.trim();
    const fecha = document.getElementById("fecha-nacimiento")?.value;
    const direccion = document.getElementById("direccion")?.value.trim();
    const mensaje = document.getElementById("mensaje");

    // Validar campos vacíos (excepto dirección)
    if (!nombre || !usuario || !correo || !pass || !pass2 || !fecha) {
      mostrarError(mensaje, "⚠ Todos los campos son obligatorios excepto la dirección.");
      return;
    }

    // Validar email
    if (!validarEmail(correo)) {
      mostrarError(mensaje, "⚠ Ingresa un correo válido.");
      return;
    }

    // Contraseñas iguales
    if (pass !== pass2) {
      mostrarError(mensaje, "⚠ Las contraseñas no coinciden.");
      return;
    }

    // Contraseña segura
    if (!/[A-Z]/.test(pass) || !/[0-9]/.test(pass)) {
      mostrarError(mensaje, "⚠ La contraseña debe tener al menos una mayúscula y un número.");
      return;
    }

    // Largo de contraseña
    if (pass.length < 6 || pass.length > 18) {
      mostrarError(mensaje, "⚠ La contraseña debe tener entre 6 y 18 caracteres.");
      return;
    }

    // Validar edad mínima (13 años)
    if (!validarEdadMinima(fecha, 13)) {
      mostrarError(mensaje, "⚠ Debes tener al menos 13 años para registrarte.");
      return;
    }

    mostrarExito(mensaje, "✔ Registro exitoso. Bienvenido a Boleham & Co ✨");
  });

  formRegistro.addEventListener("reset", () => {
    document.getElementById("mensaje").textContent = "";
  });
}



// ===============================
// FUNCIONES AUXILIARES
// ===============================

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarEdadMinima(fecha, edadMinima) {
  const nacimiento = new Date(fecha);
  const hoy = new Date();

  const edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    return edad - 1 >= edadMinima;
  }

  return edad >= edadMinima;
}

function mostrarError(elemento, mensaje) {
  elemento.textContent = mensaje;
  elemento.style.color = "red";
}

function mostrarExito(elemento, mensaje) {
  elemento.textContent = mensaje;
  elemento.style.color = "green";
}
