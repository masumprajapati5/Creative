// Image Trail Effect
function dist(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}
const zone = document.querySelector("[data-trail-zone]");
const layer = document.getElementById("trail-layer");

const images = [
  "https://plus.unsplash.com/premium_vector-1697729804286-7dd6c1a04597?q=80&w=770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_vector-1697729782149-e53d522cb596?q=80&w=668&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_vector-1697729780111-058eea198643?q=80&w=724&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_vector-1711987848637-85c1dfa3f85a?q=80&w=898&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_vector-1697729819852-08b193c4f063?q=80&w=770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_vector-1702386499779-d217708afa9f?q=80&w=823&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_vector-1697729849330-ef5db47d3246?q=80&w=1407&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/vector-1749649358210-595f91916948?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

// pre-create a fixed pool of elements and reuse them —
// cheaper than creating a new <img> on every mousemove
const POOL_SIZE = 8;
const pool = [];
for (let i = 0; i < POOL_SIZE; i++) {
  const el = document.createElement("div");
  el.className = "trail-item";
  const img = document.createElement("img");
  img.src = images[i % images.length];
  el.appendChild(img);
  layer.appendChild(el);
  pool.push(el);
}

let poolIndex = 0;
let lastX = null,
  lastY = null;
let inside = false;

zone.addEventListener("mouseenter", () => {
  inside = true;
});
zone.addEventListener("mouseleave", () => {
  inside = false;
  lastX = null;
  lastY = null;
});

window.addEventListener("mousemove", (e) => {
  if (!inside) return;
  if (lastX === null) {
    lastX = e.clientX;
    lastY = e.clientY;
  }

  // only spawn once the cursor has moved far enough — keeps the trail spaced out
  if (dist(e.clientX, e.clientY, lastX, lastY) < 70) return;
  lastX = e.clientX;
  lastY = e.clientY;

  const el = pool[poolIndex % POOL_SIZE];
  poolIndex++;
  const rot = (Math.random() * 16 - 8).toFixed(1);

  el.classList.remove("show");
  el.style.transition = "none";
  el.style.transform = `translate3d(${e.clientX - 75}px, ${e.clientY - 95}px, 0) scale(.6) rotate(${rot}deg)`;
  void el.offsetWidth; // force reflow so the transition restarts cleanly

  el.style.transition = "";
  requestAnimationFrame(() => {
    el.classList.add("show");
    el.style.transform = `translate3d(${e.clientX - 75}px, ${e.clientY - 95}px, 0) scale(1) rotate(${rot}deg)`;
  });

  clearTimeout(el._hideTimer);
  el._hideTimer = setTimeout(() => {
    el.classList.remove("show");
    el.style.transform += " scale(0.9)";
  }, 820);
});