// Данные меню
const items = [
  { name: "Эспрессо",   desc: "Классический, 30 мл",        price: 90,  type: "coffee" },
  { name: "Капучино",   desc: "Эспрессо и молочная пенка",  price: 140, type: "coffee" },
  { name: "Флэт уайт",  desc: "Двойной эспрессо, молоко",   price: 160, type: "coffee" },
  { name: "Раф",        desc: "Сливки и ванильный сахар",   price: 180, type: "coffee" },
  { name: "Круассан",   desc: "С маслом, свежий",           price: 110, type: "sweet" },
  { name: "Чизкейк",    desc: "Нью-йоркский, кусочек",      price: 190, type: "sweet" },
  { name: "Брауни",     desc: "Шоколадный, с орехами",      price: 130, type: "sweet" },
];

const list = document.getElementById("menuList");

function renderMenu(filter = "all") {
  list.innerHTML = "";
  items
    .filter(i => filter === "all" || i.type === filter)
    .forEach(i => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div><strong>${i.name}</strong><small>${i.desc}</small></div>
        <span class="price">${i.price} ₴</span>`;
      list.appendChild(li);
    });
}
renderMenu();

// Фильтры меню
document.getElementById("filters").addEventListener("click", e => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
  btn.classList.add("active");
  renderMenu(btn.dataset.filter);
});

// Мобильное меню
const nav = document.getElementById("nav");
document.getElementById("burger").addEventListener("click", () => nav.classList.toggle("open"));
nav.addEventListener("click", e => { if (e.target.tagName === "A") nav.classList.remove("open"); });

// Тёмная тема (запоминаем выбор)
const themeBtn = document.getElementById("theme");
function applyTheme(dark) {
  document.body.classList.toggle("dark", dark);
  themeBtn.textContent = dark ? "☀️" : "🌙";
}
let saved = null;
try { saved = localStorage.getItem("dark"); } catch (e) {}
applyTheme(saved === "1");
themeBtn.addEventListener("click", () => {
  const dark = !document.body.classList.contains("dark");
  applyTheme(dark);
  try { localStorage.setItem("dark", dark ? "1" : "0"); } catch (e) {}
});

// Форма (без сервера — только проверка и сообщение)
const form = document.getElementById("form");
const status = document.getElementById("status");
form.addEventListener("submit", e => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const msg = form.msg.value.trim();
  status.className = "status";
  if (!name || !msg || !/^\S+@\S+\.\S+$/.test(email)) {
    status.textContent = "Заполните все поля и проверьте email.";
    status.classList.add("err");
    return;
  }
  status.textContent = `Спасибо, ${name}! Сообщение «отправлено» (это учебная форма).`;
  status.classList.add("ok");
  form.reset();
});

// Год в футере
document.getElementById("year").textContent = new Date().getFullYear();
