import './style.css'
import barba from "@barba/core"
import gsap from "gsap"

barba.init({
  transitions: [
    {
      name: "Curtain Wipe",
      leave(data) {
        return gsap.to(".curtain", {
          clipPath: "polygon(0% 0% , 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.2,
          ease: "expo.inOut"
        })
      },
      after(data) {
        return gsap.to(".curtain", {
          clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
          duration: 1.5,
          ease: "expo.inOut"
        })
      }
    }
  ]
})