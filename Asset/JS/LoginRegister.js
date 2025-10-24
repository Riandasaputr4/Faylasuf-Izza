// Ambil elemen tombol (jika ada)
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");

// Cek status login
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedInUser) {
  // Kalau user sudah login → sembunyikan tombol login/register
  if (loginBtn) loginBtn.style.display = "none";
  if (registerBtn) registerBtn.style.display = "none";
  if (logoutBtn) logoutBtn.style.display = "inline-block";
} else {
  // Kalau belum login → tampilkan login/register, sembunyikan logout
  if (loginBtn) loginBtn.style.display = "inline-block";
  if (registerBtn) registerBtn.style.display = "inline-block";
  if (logoutBtn) logoutBtn.style.display = "none";
}

// Fungsi register
function register() {
  const fullname = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim().toLowerCase();
  const password = document.getElementById("registerPassword").value;
  const confirm = document.getElementById("registerConfirm").value;

  // --- Validasi dasar ---
  if (!fullname || !email || !password || !confirm) {
    alert("Semua kolom wajib diisi!");
    return;
  }

  // --- Validasi email sederhana ---
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Format email tidak valid!");
    return;
  }

  // --- Validasi password ---
  if (password.length < 6) {
    alert("Password minimal 6 karakter!");
    return;
  }

  if (password !== confirm) {
    alert("Password dan konfirmasi password tidak sama!");
    return;
  }

  // --- Ambil daftar user dari localStorage ---
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // --- Cek apakah email sudah digunakan ---
  const exist = users.find(u => u.email === email);
  if (exist) {
    alert("Email sudah terdaftar!");
    return;
  }

  // --- Simpan user baru ---
  users.push({ fullname, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registrasi berhasil! Silakan login.");

  // --- Redirect ke halaman login ---
  setTimeout(() => {
    if (window.location.protocol === "file:") {
      // jika dijalankan langsung dari file explorer
      window.open("login.html", "_self");
    } else {
      // jika dijalankan dari Live Server / hosting
      window.location.href = "login.html";
    }
  }, 300);
}


// Fungsi login
function login() {
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value;

  // Ambil data user dari localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    // Simpan user yang sedang login
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    // Tambahkan notifikasi sementara
    alert(`Selamat datang, ${user.fullname}!`);

    // Tunggu sebentar biar alert selesai, lalu pindah
    setTimeout(() => {
      // Redirect ke halaman beranda
      if (window.location.protocol === "file:") {
        // Jika dijalankan dari file langsung (bukan server)
        window.open("index.html", "_self");
      } else {
        // Kalau dari Live Server / hosting
        window.location.href = "index.html";
      }
    }, 300);
  } else {
    alert("Email atau password salah!");
  }
}


// Logout
function logout() {
  localStorage.removeItem("loggedInUser");
  alert("Berhasil logout!");
  window.location.reload();
}


 // Popup hanya muncul di halaman beranda
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user && !sessionStorage.getItem("popupShown")) {
      document.getElementById("welcomeText").textContent = `Selamat datang, ${user.fullname}! 🎉`;
      document.getElementById("welcomePopup").style.display = "flex";
      sessionStorage.setItem("popupShown", "true"); // agar popup tidak muncul terus setiap refresh
    }

    function closePopup() {
      document.getElementById("welcomePopup").style.display = "none";
    }