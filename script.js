// Shade catalog — edit this list to add, remove, or rename polishes.
const shades = [
  { name: "Cherry Bomb",   color: "#b3124a", finish: "creme",   price: 14 },
  { name: "Ballet Slipper", color: "#f2c4c8", finish: "creme",  price: 14 },
  { name: "Velvet Plum",   color: "#5a1f4a", finish: "creme",   price: 14 },
  { name: "Midnight Sky",  color: "#1f2a4d", finish: "shimmer", price: 16 },
  { name: "Rose Gold",     color: "#c98b7a", finish: "shimmer", price: 16 },
  { name: "Sage Garden",   color: "#8fa58a", finish: "creme",   price: 14 },
  { name: "Disco Night",   color: "#3b2a5c", finish: "glitter", price: 18 },
  { name: "Champagne Pop", color: "#d9bf8c", finish: "glitter", price: 18 },
  { name: "Coral Crush",   color: "#f2735a", finish: "creme",   price: 14 },
  { name: "Ocean Pearl",   color: "#5fa3b0", finish: "shimmer", price: 16 },
  { name: "Black Velvet",  color: "#1a1a1a", finish: "glitter", price: 18 },
  { name: "Lilac Haze",    color: "#b9a3d6", finish: "creme",   price: 14 },
];

const grid = document.getElementById("shade-grid");
const bagCount = document.getElementById("bag-count");
const toast = document.getElementById("toast");
let bag = 0;
let toastTimer;

function renderShades(filter = "all") {
  const list = filter === "all" ? shades : shades.filter(s => s.finish === filter);
  grid.innerHTML = list.map(s => `
    <article class="shade-card">
      <div class="swatch ${s.finish}" style="--c:${s.color}"></div>
      <h3>${s.name}</h3>
      <span class="finish">${s.finish === "creme" ? "Crème" : s.finish}</span>
      <div class="card-foot">
        <span class="price">$${s.price}</span>
        <button class="add-btn" data-name="${s.name}">Add to bag</button>
      </div>
    </article>
  `).join("");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

// Filters
document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderShades(btn.dataset.filter);
  });
});

// Add to bag
grid.addEventListener("click", e => {
  const btn = e.target.closest(".add-btn");
  if (!btn) return;
  bag++;
  bagCount.textContent = bag;
  showToast(`${btn.dataset.name} added to your bag`);
});

// Mobile menu
const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
links.addEventListener("click", e => {
  if (e.target.tagName === "A") {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", false);
  }
});

// Newsletter (front-end only — not connected to an email service yet)
document.getElementById("signup-form").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("email");
  document.getElementById("signup-msg").textContent =
    `Thanks! We'll keep ${email.value} posted on new shades.`;
  email.value = "";
});

document.getElementById("year").textContent = new Date().getFullYear();
renderShades();
