// 🎉 Confetti Effect
function createConfetti() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDuration = 2 + Math.random() * 3 + 's';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;

    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
}

setInterval(createConfetti, 200);

// 🎈 Floating Balloons
function createBalloon() {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    balloon.style.left = Math.random() * 100 + 'vw';
    balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 75%)`;

    document.body.appendChild(balloon);
    setTimeout(() => balloon.remove(), 8000);
}

setInterval(createBalloon, 1000);

// 💬 Popup Personal Message
window.onload = function () {
    setTimeout(() => {
        alert("🎂 Dear Liz, wishing you a birthday filled with joy, love, and unforgettable moments! – With love 💕");
    }, 2000);
};
function updateLiveCountdown(targetDate) {
  const countdownElement = document.getElementById("liveCountdown");

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      countdownElement.textContent = "🎉 It's Liz's Birthday!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    countdownElement.textContent = `Countdown to Birthday: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  update(); // initial run
  setInterval(update, 1000);
}

// Set Liz's birthday (example: June 28, 2025 at 12:00 PM)
const lizBirthday = new Date("June 28, 2025 12:00:00").getTime();
updateLiveCountdown(lizBirthday);

const interval = setInterval(updateCountdown, 1000);
// 🎉 Confetti
function createConfetti() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDuration = 2 + Math.random() * 3 + 's';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;

    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
}
setInterval(createConfetti, 200);

// 🎈 Balloons
function createBalloon() {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    balloon.style.left = Math.random() * 100 + 'vw';
    balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 75%)`;

    document.body.appendChild(balloon);
    setTimeout(() => balloon.remove(), 8000);
}
setInterval(createBalloon, 1000);

// ⏳ Countdown & Modal
let countdownValue = 5;
const countdownElement = document.getElementById('countdown');
const modal = document.getElementById('birthdayModal');
const closeModal = document.getElementById('closeModal');

const countdownInterval = setInterval(() => {
    countdownValue--;
    countdownElement.textContent = countdownValue;

    if (countdownValue <= 0) {
        clearInterval(countdownInterval);
        document.querySelector('.countdown-container').style.display = 'none';
        modal.style.display = 'flex';
    }
}, 1000);

// 💬 Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});
// 🎉 Birthday Countdown
const birthdayDate = new Date("2025-06-28T00:00:00");
// === FIREWORKS ENGINE ===
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
let fireworks = [];
let particles = [];
let isRunning = false;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function Firework(x, y) {
    this.x = canvas.width / 2;
    this.y = canvas.height;
    this.targetX = x;
    this.targetY = y;
    this.speed = 3;
    this.angle = Math.atan2(y - this.y, x - this.x);
    this.distance = Math.hypot(this.targetX - this.x, this.targetY - this.y);
    this.traveled = 0;
    this.boomed = false;
}

Firework.prototype.update = function () {
    const vx = Math.cos(this.angle) * this.speed;
    const vy = Math.sin(this.angle) * this.speed;
    this.x += vx;
    this.y += vy;
    this.traveled += Math.hypot(vx, vy);
    if (this.traveled >= this.distance) {
        this.boomed = true;
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle(this.targetX, this.targetY));
        }
    }
};

Firework.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
};

function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 2;
    this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
    this.angle = Math.random() * 2 * Math.PI;
    this.speed = random(1, 6);
    this.life = 60;
    this.opacity = 1;
}

Particle.prototype.update = function () {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + 1;
    this.life--;
    this.opacity = this.life / 60;
};

Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.fill();
    ctx.globalAlpha = 1;
};

function animateFireworks() {
    if (!isRunning) return;

    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    fireworks.forEach((f, i) => {
        f.update();
        f.draw();
        if (f.boomed) fireworks.splice(i, 1);
    });

    particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.life <= 0) particles.splice(i, 1);
    });

    if (isRunning) requestAnimationFrame(animateFireworks);
}

function launchFirework() {
    const x = random(100, canvas.width - 100);
    const y = random(100, canvas.height / 2);
    fireworks.push(new Firework(x, y));
}

function startFireworks(duration = 5000) {
    canvas.style.display = 'block';
    isRunning = true;
    animateFireworks();
    const interval = setInterval(launchFirework, 300);

    setTimeout(() => {
        clearInterval(interval);
        isRunning = false;
        setTimeout(() => canvas.style.display = 'none', 3000);
    }, duration);
}
// Start fireworks on button click
document.getElementById('openModal').addEventListener('click', () => {
    startFireworks();
});
// Removed duplicate countdownElement declaration to avoid redeclaration error