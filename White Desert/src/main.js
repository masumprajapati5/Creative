import gsap from "gsap";
import "./style.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
  defaults: { ease: "linear" },
  scrollTrigger: {
    trigger: ".animation-section",
    start: "top top",
    end: "bottom -400%",
    pin: true,
    scrub: true,
  },
});

tl.to(".initial-image img", {
  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
})
  .to(
    ".initial-image-content h1",
    {
      scale: 1,
    },
    "<",
  )
  .to(".strip", {
    clipPath: "inset(0% 0% 0% 0%)",
    stagger: -0.09,
  })
  .to(
    ".image-cards-section",
    {
      xPercent: -300,
    },
    "-=0.16",
  )
  .to(
    ".final-text-reveal .imagereveal img ",
    {
      clipPath: "inset(0% 0% 0% 0%)",
    },
    "<",
  )
  .to(
    ".final-text-reveal-content",
    {
      x:  0,
    },
    "<",
  );
