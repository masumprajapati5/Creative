import { Bodies, Body, Composite, Engine, Render, Runner, World } from 'matter-js'
import './style.css'

// Engine

const engine = Engine.create()

// World

const world = World.create()

// Render

const render = Render.create({
    element: document.body,
    engine, //engine:engine // if key and value are the same, you can just write the key
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
    }
})
const box = Bodies.rectangle(350, 100, 90, 80, {
    restitution: 0.35
});

const box1 = Bodies.rectangle(400, 180, 150, 100, {
    restitution: 0.3,
    render: {
        sprite: {
        texture: 'https://i.pinimg.com/736x/1c/ff/ed/1cffeda0a1d3745c1bfc38014a42158c.jpg',
        xScale: 0.2,
        yScale: 0.2
    }
    }
});

const ball = Bodies.circle(650, 80, 100, {
    restitution: 0.9,
    render: {
        fillStyle: 'green',
        lineWidth: 5,
    }
    // frictionAir: 0.05,
});

const polygon = Bodies.polygon(700, 50, 5, 90, {
    restitution: 0.35
});

const customShape = Bodies.fromVertices(700, 120, [
    { x: 0, y: 0 },
    { x: 130, y: 0 },
    { x: 130, y: 130 },
], {
    restitution: 0.28
});

const box5 = Bodies.rectangle(500, 200, 200, 89, {
    restitution: 0.35
});

Body.setPosition(ball,{
    x:900,
    y:0
})
Body.setVelocity(ball,{
    x:5,
    y:0
})

const floor = Bodies.rectangle(window.innerWidth / 2, window.innerHeight - 50, window.innerWidth, 20, { isStatic: true });

Composite.add(engine.world, [box, floor, box1, ball, polygon, customShape, box5]);


Render.run(render);

const runner = Runner.create();

Runner.run(runner, engine)