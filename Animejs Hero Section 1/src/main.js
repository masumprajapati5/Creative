import { createTimeline, stagger } from 'animejs'
import './style.css'

const tl = createTimeline();

tl.add(".image-div img", {
    scale: [1.6, 1],
    duration: 1000,
    ease: "outCubic"
}).add(".title-div h1 span", {
    y: { from: 500 },
    duration: 1200,
    ease: "outExpo",
    delay: stagger(200, { from: "center" })
},"<<")