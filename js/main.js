// обробка форми та валідація

const form = document.getElementById("register-form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    const name = document.getElementById("name");
    const phone = document.getElementById("phone");
    const agree = document.getElementById("agree");

    const nameError = name.nextElementSibling;
    const phoneError = phone.nextElementSibling;
    const agreeError = document.getElementById("agree-error");

    // очистити поля помилок
    [name, phone].forEach(input => input.classList.remove("error"));
    nameError.textContent = "";
    phoneError.textContent = "";
    agreeError.textContent = "";

    // перевірка імені
    if (name.value.trim().length < 3) {
      valid = false;
      name.classList.add("error");
      nameError.textContent = "ім’я повинно містити щонайменше 3 символи";
    }

    // перевірка телефону
    const digits = phone.value.replace(/\D/g, "");
    if (digits.length < 10) {
      valid = false;
      phone.classList.add("error");
      phoneError.textContent = "введіть коректний номер телефону";
    }

    // перевірка чекбокса
    if (!agree.checked) {
      valid = false;
      agreeError.textContent = "потрібно підтвердити згоду";
    }

    // якщо є помилки — зупиняємось
    if (!valid) return;

    // модалка
    const modal = document.getElementById("modal");
    const modalMsg = document.getElementById("modal-message");

    modalMsg.innerHTML = `
      ім’я: <b>${name.value}</b><br>
      телефон: <b>${phone.value}</b>
    `;

    modal.style.display = "flex";

    // зберегти у localstorage
    localStorage.setItem("userName", name.value);
    localStorage.setItem("userPhone", phone.value);

    // очистити форму
    form.reset();
  });
}

// закриття модалки

const modal = document.getElementById("modal");
const closeBtn = document.getElementById("modal-close");

if (closeBtn) {
  closeBtn.addEventListener("click", () => modal.style.display = "none");
}

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});
