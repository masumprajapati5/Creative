import './style.css'

const canvas = document.getElementById('trailCanvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resize();

window.addEventListener('resize', resize);

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.radius = (Math.random()) * 6 + 4;

    this.life = 1;

    this.decay = Math.random() * 0.002 + 0.002; // [0.02,0.04]

    this.hue = Math.random() * 60 + 180;

    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = (Math.random() - 0.5) * 1.5;
  }

  update() {
    this.life -= this.decay;
    this.radius *= 0.96;
    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx) {
    ctx.beginPath();

    ctx.arc(this.x, this.y, Math.max(this.radius, 0), 0, Math.PI * 2);

    ctx.fillStyle = `hsla(${this.hue},100%,65%,${this.life})`;

    ctx.shadowColor = `hsla(${this.hue},100%,65%,${this.life})`;
    ctx.shadowBlur = 13;

    ctx.fill()
  }
}


let particles = [];

function spawnAt(x, y) {
  for (let i = 0; i < 3; i++) {
    particles.push(new Particle(x, y))
  }
}

window.addEventListener('mousemove', (e) => spawnAt(e.clientX, e.clientY))

window.addEventListener('touchmove', (e) => {
  const t = e.touches[0];
  if (t) spawnAt(t.clientX, t.clientY);
}, { passive: true })

const animate = () => {

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];

    p.update();
    p.draw(ctx);

    if (p.life <= 0 || p.radius <= 0.2) {
      particles.splice(i, 1);
    }
  }

  requestAnimationFrame(animate)
}

animate();