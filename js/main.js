// відкриття модального вікна по кліку
document.querySelectorAll('.trial-button').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('register-modal').classList.remove('hidden');
  });
});

// закриття модалки
const modal = document.getElementById('register-modal');
if (modal) {
  const closeBtn = modal.querySelector('.close-modal');

  closeBtn.addEventListener('click', () => modal.classList.add('hidden'));

  window.addEventListener('click', e => {
    if (e.target === modal) modal.classList.add('hidden');
  });
}

// валідація
const form = document.getElementById('register-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const agreeInput = document.getElementById('agree');

    const nameError = nameInput.nextElementSibling;
    const phoneError = phoneInput.nextElementSibling;
    const agreeError = document.getElementById('agree-error');

    let valid = true;

    // очищення
    nameError.textContent = '';
    phoneError.textContent = '';
    agreeError.textContent = '';
    nameInput.classList.remove('input-error');
    phoneInput.classList.remove('input-error');

    // ім'я
    if (nameInput.value.trim().length < 3) {
      valid = false;
      nameError.textContent = 'ім’я має містити не менше 3 символів';
      nameInput.classList.add('input-error');
    }

    // телефон
    const phone = phoneInput.value.trim();
    if (!/^\d{10,12}$/.test(phone)) {
      valid = false;
      phoneError.textContent = 'введіть правильний номер телефону';
      phoneInput.classList.add('input-error');
    }

    // згода
    if (!agreeInput.checked) {
      valid = false;
      agreeError.textContent = 'ви маєте погодитися з політикою';
    }

    if (!valid) return;

    // відправка у google sheets
fetch("https://script.google.com/macros/s/AKfycbxatx8jLNh8FsbPE1DOOnPAlYWqlooNhnoUVDNpxPUp7un22fn5Rl9EJNT1gSa40WzAyg/exec", {
  method: "POST",
  mode: "no-cors",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    name: nameInput.value.trim(),
    phone: phoneInput.value.trim()
  })
});


    // збереження локально
    localStorage.setItem('userName', nameInput.value.trim());
    localStorage.setItem('userPhone', phoneInput.value.trim());

    // очистка
    form.reset();

    // закриття
    modal.classList.add('hidden');

    alert('форма успішно надіслана');
  });
}







