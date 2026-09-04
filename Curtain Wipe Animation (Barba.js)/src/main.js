import './style.css'
import barba from "@barba/core"
import gsap from "gsap"

barba.init({
  transitions: [
    {
      name: "Curtain Wipe",
      leave(data) {
        return gsap.to(".curtain", {
          scaleY: 1,
          transformOrigin: "bottom",
          duration: 1.2,
          stagger: 0.096,
          ease: "expo.out"
        })
      },
      after(data) {
        return gsap.to(".curtain", {
          scaleY: 0,
          transformOrigin: "top",
          duration: 0.9,
          stagger: -0.096,
          ease: "expo.out"
        })
      }
    }
  ]
})