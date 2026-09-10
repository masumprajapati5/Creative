import { Bodies, Body, Common, Composite, Composites, Constraint, Engine, Render, Runner, World } from 'matter-js'
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

const ball1 = Bodies.circle(300, 0, 70, { label: 'masum' });
const ball2 = Bodies.circle(400, 0, 60);
const ball3 = Bodies.circle(500, 0, 80);

Body.translate(ball1, { x: 40, y: 50 });
Body.translate(ball2, { x: 40, y: 50 });
Body.translate(ball3, { x: 40, y: 50 });

const balls = Composite.create();

Composite.add(balls, [ball1, ball2, ball3]);

// Composite.remove(balls, ball2);

const bodies = Composite.allBodies(balls);

console.log(bodies);

Composite.translate(balls, { x: 40, y: 50 });

const floor = Bodies.rectangle(window.innerWidth / 2, window.innerHeight - 50, window.innerWidth, 20, { isStatic: true });

// Composite.add(engine.world, [floor, balls]);

//rectangle stack
// const stack =  Composites.stack(500, 100, 7, 6, 10, 10, (x, y) => {
//     return Bodies.rectangle(x, y, 40,40);
// });

// circle stack
// const stack =  Composites.stack(500, 100, 7, 6, 10, 10, (x, y) => {
//     return Bodies.circle(x, y, 20);
// });

// random stack
const stack = Composites.stack(500, 100, 7, 6, 10, 10, (x, y) => {
    const size = Common.random(20, 50);

    if (Math.random() > 0.5) {
        return Bodies.circle(x, y, size / 2);
    }
    return Bodies.rectangle(x, y, size, size);
});

// pyramid stack
// const stack = Composites.pyramid(300, 100, 9, 9, 10, 10, (x, y) => {
//     return Bodies.rectangle(x, y, 50, 50);
// });

//jelly stack
// const stack = Composites.softBody(300, 100, 5, 5, 0, 0, true, 21); 

//contraint
// const constraint = Constraint.create({
//     bodyA: ball1,
//     bodyB: ball2,
//     length: 200,
//     // stiffness: 1,
//     stiffness: 0.01
// });

// const anchor = {
//     x: 500,
//     y: 60
// }

const chain = Composites.chain(stack, 0.5, 0, -0.5, 0, { stifness: 0.9, length: 2 });
// const rope = Constraint.create({
//     pointA: anchor,
//     bodyB: ball1,
//     length: 300,
//     stiffness: 0.5
// });


Composite.add(engine.world, [floor, chain]);


Render.run(render);

const runner = Runner.create();

Runner.run(runner, engine)