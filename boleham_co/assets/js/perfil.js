// ======================================================================
// perfil.js — Mostrar datos del usuario logueado y proteger la página
// Funciona junto a app.js
// ======================================================================

// 1) PROTEGER LA PÁGINA
// Solo usuarios logueados pueden entrar
protegerPagina();

// Opcional: si NO quieres que el admin entre aquí
const sesion = obtenerSesion();
if (sesion.rol === "admin") {
  window.location.href = "admin.html";
}



// ======================================================================
// 2) MOSTRAR DATOS DEL USUARIO EN EL PERFIL
// ======================================================================

// Elementos del DOM
const perfilNombre = document.getElementById("perfil-nombre");
const perfilUsuario = document.getElementById("perfil-usuario");
const perfilCorreo = document.getElementById("perfil-correo");
const perfilDireccion = document.getElementById("perfil-direccion");
const perfilRol = document.getElementById("perfil-rol");

// Rellenar datos
if (sesion) {
  perfilNombre.textContent = sesion.nombre;
  perfilUsuario.textContent = sesion.usuario;
  perfilCorreo.textContent = sesion.correo;
  perfilDireccion.textContent = sesion.direccion || "No registrada";
  perfilRol.textContent = sesion.rol === "consulta" ? "Usuario normal" : "Administrador";
}



// ======================================================================
// 3) CERRAR SESIÓN
// ======================================================================

const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");

btnCerrarSesion.addEventListener("click", () => {
  cerrarSesion(); // viene desde app.js
});
