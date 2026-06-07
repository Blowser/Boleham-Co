// ===============================
// SESIÓN ACTIVA — LÓGICA GLOBAL
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  // Leer sesión desde app.js
  const sesion = obtenerSesion();

  // Elementos del menú
  const saludo = document.getElementById("saludo-usuario");
  const btnPerfil = document.getElementById("btn-perfil");
  const btnLogin = document.getElementById("btn-login");
  const btnLogout = document.getElementById("btn-logout");

  if (sesion && sesion.activa) {

    // Mostrar saludo
    if (saludo) saludo.textContent = `Bienvenido, ${sesion.nombre} ✨`;

    // Mostrar / ocultar anchors
    if (btnPerfil) btnPerfil.style.display = "inline-block";
    if (btnLogin) btnLogin.style.display = "none";
    if (btnLogout) btnLogout.style.display = "inline-block";

    // Cerrar sesión
    if (btnLogout) {
      btnLogout.addEventListener("click", () => {
        cerrarSesion();
      });
    }

  } else {
    // Usuario NO logueado
    if (btnPerfil) btnPerfil.style.display = "none";
    if (btnLogout) btnLogout.style.display = "none";
  }
});
