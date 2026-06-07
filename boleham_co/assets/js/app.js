// ======================================================================
//  app.js — CEREBRO DE LA MINIAPP
//  Aquí manejamos:
//  - Usuarios
//  - Admin inicial
//  - Sesión activa
//  - Roles
//  - Protección de páginas
//  - localStorage + sessionStorage
// ======================================================================



// ======================================================================
// 1) CREAR ADMIN INICIAL SI NO EXISTE
// ======================================================================

// Esta función se ejecuta al cargar la app.
// Si no hay usuarios guardados, crea el admin por defecto.
function crearAdminInicial() {
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Revisamos si ya existe un admin
  const existeAdmin = usuarios.some(u => u.correo === "admin@bolehamco.cl");

  if (!existeAdmin) {
    const admin = {
      nombre: "Administrador",
      usuario: "admin",
      correo: "admin@bolehamco.cl",
      password: "Admin123*",
      rol: "admin"
    };

    usuarios.push(admin);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    console.log("✔ Admin inicial creado");
  }
}

// Ejecutamos la función al cargar el archivo
crearAdminInicial();



// ======================================================================
// 2) FUNCIONES PARA MANEJAR USUARIOS
// ======================================================================

// Obtener todos los usuarios
function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

// Guardar lista completa de usuarios
function guardarUsuarios(lista) {
  localStorage.setItem("usuarios", JSON.stringify(lista));
}

// Agregar un usuario nuevo
function agregarUsuario(nuevoUsuario) {
  const usuarios = obtenerUsuarios();

  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);
}



// ======================================================================
// 3) VERIFICAR SI UN USUARIO YA EXISTE (EVITAR DUPLICADOS)
// ======================================================================

// Verificar correo duplicado
function correoExiste(correo) {
  const usuarios = obtenerUsuarios();
  return usuarios.some(u => u.correo === correo);
}

// Verificar nombre de usuario duplicado
function usuarioExiste(usuario) {
  const usuarios = obtenerUsuarios();
  return usuarios.some(u => u.usuario === usuario);
}



// ======================================================================
// 4) INICIAR SESIÓN (sessionStorage)
// ======================================================================

// Guardar sesión activa
function crearSesion(usuario) {
  const sesion = {
    correo: usuario.correo,
    usuario: usuario.usuario,
    nombre: usuario.nombre,
    rol: usuario.rol,
    direccion: usuario.direccion || "",
    activa: true
  };

  sessionStorage.setItem("sesionActiva", JSON.stringify(sesion));
}

// Obtener sesión activa
function obtenerSesion() {
  return JSON.parse(sessionStorage.getItem("sesionActiva"));
}

// Cerrar sesión
function cerrarSesion() {
  sessionStorage.removeItem("sesionActiva");
  window.location.href = "login.html";
}



// ======================================================================
// 5) PROTEGER PÁGINAS SEGÚN ROL
// ======================================================================

// Proteger páginas que requieren sesión
function protegerPagina() {
  const sesion = obtenerSesion();

  if (!sesion || !sesion.activa) {
    alert("Debes iniciar sesión para acceder aquí.");
    window.location.href = "login.html";
  }
}

// Proteger páginas solo para ADMIN
function protegerAdmin() {
  const sesion = obtenerSesion();

  if (!sesion || sesion.rol !== "admin") {
    alert("Acceso restringido. Solo administradores.");
    window.location.href = "login.html";
  }
}

// Proteger páginas solo para USUARIO NORMAL
function protegerUsuario() {
  const sesion = obtenerSesion();

  if (!sesion || sesion.rol !== "normal") {
    alert("Acceso restringido para usuarios normales.");
    window.location.href = "login.html";
  }
}



// ======================================================================
// 6) BUSCAR USUARIO POR CORREO Y CONTRASEÑA (LOGIN REAL)
// ======================================================================

function buscarUsuario(correo, password) {
  const usuarios = obtenerUsuarios();
  return usuarios.find(u => u.correo === correo && u.password === password);
}



// ======================================================================
// 7) ACTUALIZAR DATOS DE UN USUARIO (MODIFICAR PERFIL)
// ======================================================================

function actualizarUsuario(correoOriginal, nuevosDatos) {
  const usuarios = obtenerUsuarios();

  const index = usuarios.findIndex(u => u.correo === correoOriginal);

  if (index !== -1) {
    usuarios[index] = { ...usuarios[index], ...nuevosDatos };
    guardarUsuarios(usuarios);
    return true;
  }

  return false;
}


// ======================================================================
// 8) CERRAR SESIÓN DESDE INDEX.HTML
// ======================================================================
function cerrarSesion() {
  sessionStorage.clear();
  location = "../sistema-login/login.html";
}



/*versión completa, testear luego
function cerrarSesion() {
  sessionStorage.clear();

  // Detectar si estamos dentro de /sistema-login/
  const enLoginFolder = window.location.pathname.includes("sistema-login");

  if (enLoginFolder) {
    // Si ya estamos dentro de sistema-login, redirigimos directo
    window.location.href = "login.html";
  } else {
    // Si estamos en index u otra carpeta, redirigimos con ruta completa
    window.location.href = "sistema-login/login.html";
  }
}
*/
