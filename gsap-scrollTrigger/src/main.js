import "./style.css";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(
  ".image-wrapper img",
  {
    clipPath: "inset(40% 40% 40% 40%)",
    scale: 1.5,
  },
  {
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    yPercent:0,
    ease: "none",
    scrollTrigger: {
      trigger: ".image-section",
      start: "top top",
      end: "+=100%",
      markers: true,
      scrub: 1,
      pin: true
    }
  }
);