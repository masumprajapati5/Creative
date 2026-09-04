import './style.css'
import barba from "@barba/core"
import gsap from "gsap"

barba.init({
  transitions: [
    {
      name: "Curtain Wipe",
      leave(data) {
        return gsap.to(".curtain .strips", {
          scaleY: 1,
          transformOrigin: "bottom",
          duration: 1.2,
          stagger: {
            each: 0.09,
            from: "random"
          },
          ease: "expo.out"
        })
      },
      after(data) {
        return gsap.to(".curtain .strips", {
          scaleY: 0,
          transformOrigin: "top",
          duration: 0.9,
          stagger: {
            each: 0.09,
            from: "random"
          },
          ease: "expo.out"
        })
      }
    }
  ]
})