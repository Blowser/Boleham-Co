// ======================================================================
//  VALIDACIONES VISUALES Y VALIDACIONES FINALES
//  Archivo: validaciones.js
//  Explicado en palabras simples pa' Nacho 😎🔥
// ======================================================================



// ======================================================================
// 1) FUNCIONES GENERALES PARA MARCAR INPUTS COMO VÁLIDOS O INVÁLIDOS
// ======================================================================

// Marca el input en verde (válido)
function marcarValido(input) {
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
}

// Marca el input en rojo (inválido)
function marcarInvalido(input) {
  input.classList.remove("is-valid");
  input.classList.add("is-invalid");
}



// ======================================================================
// 2) FUNCIONES DE VALIDACIÓN VISUAL (TIEMPO REAL)
// ======================================================================

// Valida textos simples (nombre, usuario)
function validarInputTexto(input, min) {
  if (input.value.trim().length >= min) {
    marcarValido(input);
  } else {
    marcarInvalido(input);
  }
}

// Valida email usando tu función final
function validarInputEmail(input) {
  if (validarEmail(input.value.trim())) {
    marcarValido(input);
  } else {
    marcarInvalido(input);
  }
}

// Valida edad mínima (ej: 13 años)
function validarInputEdad(input, edadMinima) {
  if (validarEdadMinima(input.value, edadMinima)) {
    marcarValido(input);
  } else {
    marcarInvalido(input);
  }
}

// Valida contraseña completa (mayúscula + número + largo)
function validarInputPassword(input) {
  const valor = input.value.trim();
  const tieneMayus = /[A-Z]/.test(valor);
  const tieneNum = /[0-9]/.test(valor);
  const largoOk = valor.length >= 6 && valor.length <= 18;

  if (tieneMayus && tieneNum && largoOk) {
    marcarValido(input);
  } else {
    marcarInvalido(input);
  }
}

// Valida contraseña básica (solo largo mínimo) → para login
function validarInputPasswordBasica(input) {
  if (input.value.trim().length >= 6) {
    marcarValido(input);
  } else {
    marcarInvalido(input);
  }
}

// Valida que las contraseñas coincidan
function validarInputCoincidencia(pass1, pass2) {
  if (pass1.value.trim() === pass2.value.trim() && pass2.value.trim() !== "") {
    marcarValido(pass2);
  } else {
    marcarInvalido(pass2);
  }
}



// ======================================================================
// 3) VALIDACIÓN VISUAL EN TIEMPO REAL — LOGIN
// ======================================================================

const correoLoginInput = document.getElementById("correo-login");
const passLoginInput = document.getElementById("password-login");

if (correoLoginInput) {
  correoLoginInput.addEventListener("input", () => {
    validarInputEmail(correoLoginInput);
  });
}

if (passLoginInput) {
  passLoginInput.addEventListener("input", () => {
    validarInputPasswordBasica(passLoginInput);
  });
}



// ======================================================================
// 4) VALIDACIÓN VISUAL EN TIEMPO REAL — REGISTRO
// ======================================================================

const nombreInput = document.getElementById("nombre");
const usuarioInput = document.getElementById("usuario");
const correoInput = document.getElementById("correo");
const fechaInput = document.getElementById("fecha-nacimiento");
const passInput = document.getElementById("password");
const pass2Input = document.getElementById("password2");

if (nombreInput) {
  nombreInput.addEventListener("input", () => {
    validarInputTexto(nombreInput, 3);
  });
}

if (usuarioInput) {
  usuarioInput.addEventListener("input", () => {
    validarInputTexto(usuarioInput, 3);
  });
}

if (correoInput) {
  correoInput.addEventListener("input", () => {
    validarInputEmail(correoInput);
  });
}

if (fechaInput) {
  fechaInput.addEventListener("input", () => {
    validarInputEdad(fechaInput, 13);
  });
}

if (passInput) {
  passInput.addEventListener("input", () => {
    validarInputPassword(passInput);
  });
}

if (pass2Input) {
  pass2Input.addEventListener("input", () => {
    validarInputCoincidencia(passInput, pass2Input);
  });
}



// ======================================================================
// 5) VALIDACIÓN FINAL — LOGIN
// ======================================================================

const formLogin = document.getElementById("form-login");

if (formLogin) {
  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    const correo = correoLoginInput.value.trim();
    const pass = passLoginInput.value.trim();
    const mensaje = document.getElementById("mensaje-login");

    // Validación final de correo
    if (!validarEmail(correo)) {
      mostrarError(mensaje, "⚠ Ingresa un correo válido.");
      return;
    }

    // Validación final de contraseña
    if (pass.length < 6) {
      mostrarError(mensaje, "⚠ La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    // Buscar usuario real en localStorage
    const usuarioEncontrado = buscarUsuario(correo, pass);

    if (!usuarioEncontrado) {
      mostrarError(mensaje, "⚠ Correo o contraseña incorrectos.");
      return;
    }

    // Crear sesión real
    crearSesion(usuarioEncontrado);

    // Mensaje de éxito
    mostrarExito(mensaje, "✔ Sesión iniciada correctamente ✨");

    // Redirigir según rol
    setTimeout(() => {
      if (usuarioEncontrado.rol === "admin") {
        window.location.href = "admin.html";
      } else {
              window.location.href = "../mi-cuenta/mi-perfil.html";
      }
    }, 1000);

  });

  formLogin.addEventListener("reset", () => {
    document.getElementById("mensaje-login").textContent = "";
  });
}



// ======================================================================
// 6) VALIDACIÓN FINAL — REGISTRO
// ======================================================================

const formRegistro = document.getElementById("form-registro");

if (formRegistro) {
  formRegistro.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = nombreInput.value.trim();
    const usuario = usuarioInput.value.trim();
    const correo = correoInput.value.trim();
    const pass = passInput.value.trim();
    const pass2 = pass2Input.value.trim();
    const fecha = fechaInput.value;
    const direccion = document.getElementById("direccion")?.value.trim();
    const mensaje = document.getElementById("mensaje");

    // Validar campos vacíos (excepto dirección)
    if (!nombre || !usuario || !correo || !pass || !pass2 || !fecha) {
      mostrarError(mensaje, "⚠ Todos los campos son obligatorios excepto la dirección.");
      return;
    }

    // Email válido
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

    // Edad mínima
    if (!validarEdadMinima(fecha, 13)) {
      mostrarError(mensaje, "⚠ Debes tener al menos 13 años para registrarte.");
      return;
    }

    // Revisar duplicados
    if (correoExiste(correo)) {
      mostrarError(mensaje, "⚠ Ya existe un usuario con ese correo.");
      return;
    }

    if (usuarioExiste(usuario)) {
      mostrarError(mensaje, "⚠ Ese nombre de usuario ya está en uso.");
      return;
    }

    // Crear objeto usuario
    const nuevoUsuario = {
      nombre,
      usuario,
      correo,
      password: pass,
      rol: "normal", // todos los registrados son usuarios normales
      direccion
    };

    // Guardar en localStorage
    agregarUsuario(nuevoUsuario);

    // Crear sesión automática
    crearSesion(nuevoUsuario);

    // Mensaje de éxito
    mostrarExito(mensaje, "✔ Registro exitoso. Bienvenido a Boleham & Co ✨");

    // Redirigir después de 1 segundo
    setTimeout(() => {
            window.location.href = "../mi-cuenta/mi-perfil.html";
    }, 1000);

      });

  formRegistro.addEventListener("reset", () => {
    document.getElementById("mensaje").textContent = "";
  });
}



// ======================================================================
// 7) FUNCIONES AUXILIARES (VALIDACIONES LÓGICAS)
// ======================================================================

// Valida email con expresión regular
function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Calcula edad mínima
function validarEdadMinima(fecha, edadMinima) {
  const nacimiento = new Date(fecha);
  const hoy = new Date();

  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  return edad >= edadMinima;
}

// Muestra mensaje rojo
function mostrarError(elemento, mensaje) {
  elemento.textContent = mensaje;
  elemento.style.color = "red";
}

// Muestra mensaje verde
function mostrarExito(elemento, mensaje) {
  elemento.textContent = mensaje;
  elemento.style.color = "green";
}
