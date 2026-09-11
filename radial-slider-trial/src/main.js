import gsap from "gsap";
import "./style.css";

const items = [...document.querySelectorAll(".item")];
const itemsContainer = document.querySelector(".items");

const titles = items.map((item) => item.querySelector("span").textContent);

const radius = 500;
const angleStep = 360 / items.length;

let current = 0;
let rotation = 0;
let isAnimating = false;

// Put every card around the circle.
items.forEach((item, i) => {
  const angle = i * angleStep - 90;

  gsap.set(item, {
    x: Math.cos((angle * Math.PI) / 180) * radius,
    y: Math.sin((angle * Math.PI) / 180) * radius,
    rotation: angle + 90,
  });
});

function goTo(index) {
  if (isAnimating) return;

  isAnimating = true;

  const diff = index - current;

  // Choose the shortest direction around the circle.
  let shortest = diff;

  if (diff > items.length / 2) shortest -= items.length;
  if (diff < -items.length / 2) shortest += items.length;

  current = (current + shortest + items.length) % items.length;
  rotation -= shortest * angleStep;

  gsap.to(itemsContainer, {
    rotation,
    duration: 1.5,
    ease: "elastic.out(0.5,0.2)",
    onComplete: () => {
      isAnimating = false;
    },
  });
}

function next() {
  goTo((current + 1) % items.length);
}

function prev() {
  goTo((current - 1 + items.length) % items.length);
}

document.querySelector(".next").addEventListener("click", next);
document.querySelector(".prev").addEventListener("click", prev);

items.forEach((item, i) => {
  item.addEventListener("click", () => goTo(i));
});

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") next();
  if (e.key === "ArrowLeft") prev();
});