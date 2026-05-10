document.addEventListener('DOMContentLoaded', function () {
	initializeApp();
});

function initializeApp() {
	if (document.getElementById('loginForm')) {
		setupLoginForm();
	}

	setupRegisterModal();

	setupForgotPasswordModal();
}

function setupLoginForm() {
	const loginForm = document.getElementById('loginForm');

	if (loginForm) {
		loginForm.addEventListener('submit', function (e) {
			e.preventDefault();
			handleLogin();
		});
	}
}

function handleLogin() {
	const email = document.getElementById('email').value.trim();
	const password = document.getElementById('password').value.trim();

	if (!email || !password) {
		s;
		showAlert(
			'error',
			'Validasi Gagal',
			'Email dan password tidak boleh kosong',
		);
		return;
	}

	if (!isValidEmail(email)) {
		showAlert(
			'error',
			'Format Email Salah',
			'Silakan masukkan email dengan format yang valid',
		);
		return;
	}

	const user = dataPengguna.find(
		(u) => u.email === email && u.password === password,
	);

	if (user) {
		localStorage.setItem('userEmail', email);

		showAlert(
			'success',
			'Login Berhasil!',
			'Anda akan dialihkan ke dashboard...',
		);
		setTimeout(() => {
			window.location.href = 'src/dashboard.html';
		}, 1500);
	} else {
		showAlert(
			'error',
			'Login Gagal',
			'Email atau password yang anda masukkan salah',
		);
		document.getElementById('password').value = '';
	}
}
function setupRegisterModal() {
	const registerBtn = document.getElementById('registerBtn');

	if (registerBtn) {
		registerBtn.addEventListener('click', handleRegister);
	}
}

function handleRegister() {
	const nim = document.getElementById('registerNIM').value.trim();
	const name = document.getElementById('registerName').value.trim();
	const email = document.getElementById('registerEmail').value.trim();
	const password = document.getElementById('registerPassword').value.trim();
	const confirmPassword = document
		.getElementById('registerConfirmPassword')
		.value.trim();

	if (!nim || !name || !email || !password || !confirmPassword) {
		showAlert('error', 'Validasi Gagal', 'Semua field harus diisi');
		return;
	}

	if (!isValidEmail(email)) {
		showAlert(
			'error',
			'Format Email Salah',
			'Silakan masukkan email dengan format yang valid',
		);
		return;
	}

	if (password.length < 6) {
		showAlert(
			'error',
			'Password Terlalu Pendek',
			'Password minimal harus 6 karakter',
		);
		return;
	}

	if (password !== confirmPassword) {
		showAlert(
			'error',
			'Password Tidak Cocok',
			'Password dan konfirmasi password tidak sesuai',
		);
		return;
	}

	// Check if email already exists
	if (dataPengguna.some((u) => u.email === email)) {
		showAlert(
			'error',
			'Email Sudah Terdaftar',
			'Email ini sudah terdaftar di sistem',
		);
		return;
	}

	dataPengguna.push({ email: email, password: password });

	showAlert(
		'success',
		'Pendaftaran Berhasil!',
		'Akun anda telah berhasil dibuat. Silakan login.',
	);

	document.getElementById('registerForm').reset();
	const modal = bootstrap.Modal.getInstance(
		document.getElementById('registerModal'),
	);
	modal.hide();
}

function setupForgotPasswordModal() {
	const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');

	if (forgotPasswordBtn) {
		forgotPasswordBtn.addEventListener('click', handleForgotPassword);
	}
}

function handleForgotPassword() {
	const email = document.getElementById('forgotEmail').value.trim();

	if (!email) {
		showAlert('error', 'Email Kosong', 'Silakan masukkan email anda');
		return;
	}

	if (!isValidEmail(email)) {
		showAlert(
			'error',
			'Format Email Salah',
			'Silakan masukkan email dengan format yang valid',
		);
		return;
	}

	if (dataPengguna.some((u) => u.email === email)) {
		showAlert(
			'success',
			'Email Terkirim!',
			'Link reset password telah dikirim ke email anda. Silakan cek email anda (demo mode)',
		);
		document.getElementById('forgotEmail').value = '';
		const modal = bootstrap.Modal.getInstance(
			document.getElementById('forgotPasswordModal'),
		);
		modal.hide();
	} else {
		showAlert(
			'error',
			'Email Tidak Ditemukan',
			'Email tidak terdaftar dalam sistem kami',
		);
	}
}

function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

function showAlert(type, title, message) {
	const alertHTML = `
        <div class="alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show" role="alert" style="position: fixed; top: 20px; right: 20px; z-index: 9999; min-width: 300px; box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);">
            <strong>${title}</strong>
            <br>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

	const alertContainer = document.createElement('div');
	alertContainer.innerHTML = alertHTML;
	document.body.appendChild(alertContainer);

	setTimeout(() => {
		const alert = alertContainer.querySelector('.alert');
		if (alert) {
			const bsAlert = new bootstrap.Alert(alert);
			bsAlert.close();
		}
		alertContainer.remove();
	}, 3000);
}

function checkUserLogin() {
	const userEmail = localStorage.getItem('userEmail');
	if (!userEmail) {
		window.location.href = 'index.html';
	}
}

function manipulateTables() {
	const tables = document.querySelectorAll('table tbody');
	tables.forEach((table) => {
		const rows = table.querySelectorAll('tr');
		rows.forEach((row, index) => {
			const firstCell = row.querySelector('td');
			if (firstCell) {
				firstCell.insertAdjacentHTML('beforebegin', `<td>${index + 1}</td>`);
			}
		});
	});
}

window.manipulateTables = manipulateTables;
window.isValidEmail = isValidEmail;
window.showAlert = showAlert;
window.checkUserLogin = checkUserLogin;
