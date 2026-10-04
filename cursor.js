// Original code from: https://www.snazzyspace.com/tumblr/mouse-sparkles.php. 
// Modernised as had 9+ errors. 

const colour = "#0021f3";
const sparkles = 50;

const particles = [];

let mouseX = 0;
let mouseY = 0;

// Create the sparkle elements
function createSparkle() {
  const sparkle = document.createElement("div");

  sparkle.style.position = "fixed";
  sparkle.style.width = "5px";
  sparkle.style.height = "5px";
  sparkle.style.backgroundColor = colour;
  sparkle.style.pointerEvents = "none";
  sparkle.style.zIndex = "9999";
  sparkle.style.transform = "translate(-50%, -50%)";

  document.body.appendChild(sparkle);

  return sparkle;
}

// Create all our sparkles
for (let i = 0; i < sparkles; i++) {
  particles.push({
    element: createSparkle(),

    x: 0,
    y: 0,

    velocityX: 0,
    velocityY: 0,

    life: 0
  });

  particles[i].element.style.visibility = "hidden";
}

// Keep track of the mouse
document.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;

  // Find an unused sparkle
  const particle = particles.find((p) => p.life <= 0);

  if (particle) {
    particle.x = mouseX;
    particle.y = mouseY;

    particle.velocityX = (Math.random() - 0.5) * 2;
    particle.velocityY = Math.random() * 2 + 1;

    particle.life = 50;

    particle.element.style.visibility = "visible";
  }
});

// Animate the sparkles
function animate() {
  particles.forEach((particle) => {
    if (particle.life > 0) {
      particle.life--;

      particle.x += particle.velocityX;
      particle.y += particle.velocityY;

      particle.velocityY += 0.03;

      particle.element.style.left = `${particle.x}px`;
      particle.element.style.top = `${particle.y}px`;

      // Make the sparkle smaller as it disappears
      const size = Math.max(particle.life / 10, 1);

      particle.element.style.width = `${size}px`;
      particle.element.style.height = `${size}px`;

      particle.element.style.opacity = particle.life / 50;

      // Hide it when its life is over
      if (particle.life <= 0) {
        particle.element.style.visibility = "hidden";
      }
    }
  });

  requestAnimationFrame(animate);
}

// Starts the animation
animate();

// Plays a ding when hovering over any of the nav boxes
const navBoxes = document.querySelectorAll ('#nav-box > div');

const hoverSound = new Audio('sounds/ding_1.mp3'); hoverSound.volume = 0.25;

navBoxes.forEach(box => {
    box.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0;
        hoverSound.play();
    });
});