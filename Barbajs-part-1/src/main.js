import './style.css'
import barba from '@barba/core';
import gsap from "gsap";

barba.init({
    transitions: [
        {
            sync: true,
            once(data) {
                console.log('Once', data.next.url);
            },
            leave(data) {
                data.current.container.style.position = "absolute";
                // data.current.container.style.top = "0";
                // data.current.container.style.left = "0";
                // data.current.container.style.width = "100%";
                return gsap.to(data.current.container, {
                    opacity: 0,
                    duration: 1,
                    ease: "expo.out"
                })
            },
            enter(data) {
                return gsap.from(data.next.container, {
                    opacity: 0,
                    duration: 1,
                    ease: "expo.out"
                })
            }
        }
    ]
});