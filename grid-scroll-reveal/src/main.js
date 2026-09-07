import gsap from "gsap"
import { ScrollTrigger } from "gsap/all";
import './style.css'
gsap.registerPlugin(ScrollTrigger)

const IMAGES = [
  "https://cdn.cosmos.so/c2980dea-b55e-4695-bbe4-d1f83e0387d5.?format=webp",
  "https://cdn.cosmos.so/516d7acb-25a7-4f1a-bdb1-28b541476d29.?format=webp",
  "https://cdn.cosmos.so/b4eeb8a4-9b57-4b94-bf0c-3d1e3d827f04?format=webp",
  "https://cdn.cosmos.so/baeaa084-ecff-46bb-b5e7-eaf0392be31a?format=webp",
  "https://cdn.cosmos.so/eb5fe73a-e4df-402d-8dc2-239bb8d986c4?format=webp",
  "https://cdn.cosmos.so/09adf103-ceae-436a-a97f-416093da9c7c?format=webp",
  "https://cdn.cosmos.so/d9e17c5d-a284-45dd-99bf-d1a5e2bcd910?format=webp",
  "https://cdn.cosmos.so/4785c741-ce17-410c-aaea-ad874a47a5b7?format=webp",
  "https://cdn.cosmos.so/d8564002-514a-458b-b093-c5a11bea6e94?format=webp",
  "https://i.pinimg.com/736x/eb/d3/0a/ebd30a1d00f6a09523c08c3a20b1be77.jpg",
  "https://i.pinimg.com/736x/64/2b/c1/642bc1cafe8a196fec5c20140ee137b4.jpg",
  "https://cdn.cosmos.so/0f029a1e-3d84-4b4a-8304-5d413c0d8595?format=webp",
  "https://cdn.cosmos.so/262ac499-da07-4a64-9bb0-cd7052c4b971?format=webp",
  "https://i.pinimg.com/736x/b6/c1/f2/b6c1f2677520a52cb27ec6ced6d8852b.jpg",
  "https://i.pinimg.com/736x/f3/c7/9a/f3c79aad22a1097df2447d8cc0f1e42e.jpg"
];

const grid = document.querySelector('.grid-section');

const tiles = [];

IMAGES.forEach((src) => {
  const tile = document.createElement("div");
  tile.classList.add("tile");

  const image = document.createElement("img");
  image.src = src;

  tile.appendChild(image);

  grid.appendChild(tile);

  tiles.push(tile);
})

gsap.set(tiles, {
  opacity: 0,
  scale: 0.86,
  y: 18
})


const tl = gsap.timeline({
  scrollTrigger: {
    trigger: grid,
    start: "top top",
    end: "bottom top",
    pin: true,
    scrub: true,
  }
})

tl.to(tiles, {
  opacity: 1,
  scale: 1,
  y: 0,
  ease: "none",
  stagger: {
    each: 0.096,
    grid: "auto",
    from: "center"
  }
})