// ======================================================================
//  recuperar.js — Lógica de recuperación de contraseña
//  Funciona junto a app.js y validaciones.js
// ======================================================================

// Inputs
const correoRecInput = document.getElementById("correo-recuperar");
const passNuevaInput = document.getElementById("password-nueva");
const passNueva2Input = document.getElementById("password-nueva2");

// Formulario
const formRecuperar = document.getElementById("form-recuperar");

// Mensaje
const mensajeRec = document.getElementById("mensaje-recuperar");



// ======================================================================
// VALIDACIONES EN TIEMPO REAL
// ======================================================================

// Validar correo
if (correoRecInput) {
  correoRecInput.addEventListener("input", () => {
    if (validarEmail(correoRecInput.value.trim())) {
      marcarValido(correoRecInput);
    } else {
      marcarInvalido(correoRecInput);
    }
  });
}

// Validar contraseña nueva
if (passNuevaInput) {
  passNuevaInput.addEventListener("input", () => {
    const valor = passNuevaInput.value.trim();
    const tieneMayus = /[A-Z]/.test(valor);
    const tieneNum = /[0-9]/.test(valor);
    const largoOk = valor.length >= 6 && valor.length <= 18;

    if (tieneMayus && tieneNum && largoOk) {
      marcarValido(passNuevaInput);
    } else {
      marcarInvalido(passNuevaInput);
    }
  });
}

// Validar coincidencia
if (passNueva2Input) {
  passNueva2Input.addEventListener("input", () => {
    validarInputCoincidencia(passNuevaInput, passNueva2Input);
  });
}



// ======================================================================
// VALIDACIÓN FINAL — RECUPERAR CONTRASEÑA
// ======================================================================

if (formRecuperar) {
  formRecuperar.addEventListener("submit", function (e) {
    e.preventDefault();

    const correo = correoRecInput.value.trim();
    const pass1 = passNuevaInput.value.trim();
    const pass2 = passNueva2Input.value.trim();

    // Validar correo
    if (!validarEmail(correo)) {
      mostrarError(mensajeRec, "⚠ Ingresa un correo válido.");
      return;
    }

    // Validar contraseña segura
    if (!/[A-Z]/.test(pass1) || !/[0-9]/.test(pass1) || pass1.length < 6 || pass1.length > 18) {
      mostrarError(mensajeRec, "⚠ La contraseña debe tener entre 6 y 18 caracteres, una mayúscula y un número.");
      return;
    }

    // Validar coincidencia
    if (pass1 !== pass2) {
      mostrarError(mensajeRec, "⚠ Las contraseñas no coinciden.");
      return;
    }

    // Buscar usuario por correo
    const usuarios = obtenerUsuarios();
    const usuarioIndex = usuarios.findIndex(u => u.correo === correo);

    if (usuarioIndex === -1) {
      mostrarError(mensajeRec, "⚠ No existe un usuario registrado con ese correo.");
      return;
    }

    // Actualizar contraseña
    usuarios[usuarioIndex].password = pass1;
    guardarUsuarios(usuarios);

    mostrarExito(mensajeRec, "✔ Contraseña actualizada con éxito ✨");

    // Redirigir al login
    setTimeout(() => {
      window.location.href = "/boleham_co/sistema-login/login.html";
    }, 1200);
  });

  // Reset
  formRecuperar.addEventListener("reset", () => {
    mensajeRec.textContent = "";
  });
}
