// ======================================================================
// modificar-perfil.js — Editar datos del usuario logueado
// Funciona junto a app.js y validaciones.js
// ======================================================================

// 1) PROTEGER LA PÁGINA
protegerPagina();

// Obtener sesión actual
const sesion = obtenerSesion();



// ======================================================================
// 2) CAPTURAR ELEMENTOS DEL DOM
// ======================================================================

const inputNombre = document.getElementById("mod-nombre");
const inputUsuario = document.getElementById("mod-usuario");
const inputCorreo = document.getElementById("mod-correo");
const inputDireccion = document.getElementById("mod-direccion");

const formModificar = document.getElementById("form-modificar");
const mensajeModificar = document.getElementById("mensaje-modificar");



// ======================================================================
// 3) PRECARGAR DATOS DEL USUARIO EN EL FORMULARIO
// ======================================================================

if (sesion) {
  inputNombre.value = sesion.nombre;
  inputUsuario.value = sesion.usuario;
  inputCorreo.value = sesion.correo;
  inputDireccion.value = sesion.direccion || "";
}



// ======================================================================
// 4) VALIDACIONES EN TIEMPO REAL
// ======================================================================

inputNombre.addEventListener("input", () => validarInputTexto(inputNombre, 3));
inputUsuario.addEventListener("input", () => validarInputTexto(inputUsuario, 3));
inputCorreo.addEventListener("input", () => validarInputEmail(inputCorreo));
inputDireccion.addEventListener("input", () => {
  if (inputDireccion.value.trim().length >= 3) {
    marcarValido(inputDireccion);
  } else {
    marcarInvalido(inputDireccion);
  }
});



// ======================================================================
// 5) VALIDACIÓN FINAL Y ACTUALIZACIÓN DE DATOS
// ======================================================================

formModificar.addEventListener("submit", function (e) {
  e.preventDefault();

  const nuevoNombre = inputNombre.value.trim();
  const nuevoUsuario = inputUsuario.value.trim();
  const nuevoCorreo = inputCorreo.value.trim();
  const nuevaDireccion = inputDireccion.value.trim();

  // Validar campos vacíos
  if (!nuevoNombre || !nuevoUsuario || !nuevoCorreo) {
    mostrarError(mensajeModificar, "⚠ Todos los campos obligatorios deben estar completos.");
    return;
  }

  // Validar correo
  if (!validarEmail(nuevoCorreo)) {
    mostrarError(mensajeModificar, "⚠ Ingresa un correo válido.");
    return;
  }

  // Evitar duplicados (solo si el usuario cambió el dato)
  const usuarios = obtenerUsuarios();

  // Verificar correo duplicado
  if (nuevoCorreo !== sesion.correo && usuarios.some(u => u.correo === nuevoCorreo)) {
    mostrarError(mensajeModificar, "⚠ Ya existe un usuario con ese correo.");
    return;
  }

  // Verificar usuario duplicado
  if (nuevoUsuario !== sesion.usuario && usuarios.some(u => u.usuario === nuevoUsuario)) {
    mostrarError(mensajeModificar, "⚠ Ese nombre de usuario ya está en uso.");
    return;
  }

  // Crear objeto con los nuevos datos
  const nuevosDatos = {
    nombre: nuevoNombre,
    usuario: nuevoUsuario,
    correo: nuevoCorreo,
    direccion: nuevaDireccion
  };

  // Actualizar en localStorage
  const actualizado = actualizarUsuario(sesion.correo, nuevosDatos);

  if (!actualizado) {
    mostrarError(mensajeModificar, "⚠ Ocurrió un error al actualizar los datos.");
    return;
  }

  // Actualizar sesión activa
  crearSesion({
    ...sesion,
    ...nuevosDatos
  });

  mostrarExito(mensajeModificar, "✔ Datos actualizados con éxito ✨");

  // Redirigir al perfil
  setTimeout(() => {
    window.location.href = "mi-perfil.html";
  }, 1200);
});



// ======================================================================
// 6) RESET DEL FORMULARIO
// ======================================================================

formModificar.addEventListener("reset", () => {
  mensajeModificar.textContent = "";
});
