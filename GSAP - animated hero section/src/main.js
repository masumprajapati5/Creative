import './style.css'
import { gsap } from "gsap";

const obj = {
  value: 0
}

const counter = document.querySelector(".loader-count h2");

gsap.to(obj, {
  value: 100,
  duration: 1.3,
  ease: "none",
  onUpdate: () => {
    counter.textContent = `${Math.round(obj.value)}%`
  },
  onComplete: () => {
    gsap.to(counter, {
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      onComplete: () => {
        tl.play()
      }
    })
  }
})

gsap.set([".heading h1", ".sub-heading p", ".hero-content button"], {
  yPercent: 110,
  opacity: 0
})

const tl = gsap.timeline({ paused: true });

tl.to(".loader", {
  yPercent: 100,
  duration: 1.2,
  ease: "expo.out"
}).from(".hero-bg img", {
  scale: 1.5,
  duration: 1.23,
  ease: "expo.out"
}, "-=1.1").to(".heading h1", {
  yPercent: 0,
  opacity: 1,
  duration: 1.1,
  ease: "power3.out"
}, "-=0.9").to(".sub-heading p", {
  yPercent: 0,
  opacity: 1,
  duration: 1.1,
  ease: "power3.out"
}, "-=0.5").to(".hero-content button", {
  yPercent: 0,
  opacity: 1,
  duration: 1.1,
  ease: "power3.out"
}, "-=0.3").from(".scroll", {
  y:10,
  // opacity: 0,
  duration: 0.5,
  ease: "none",
  repeat:-1,
  yoyo:true
})