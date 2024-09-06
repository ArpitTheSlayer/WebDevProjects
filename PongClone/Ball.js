const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.0001;

export default class Ball {
  constructor(ball) {
    this.ball = ball;
    this.reset();
  }

  get x() {
    return parseFloat(getComputedStyle(this.ball).getPropertyValue("--x"));
  }

  set x(value) {
    this.ball.style.setProperty("--x", value);
  }

  get y() {
    return parseFloat(getComputedStyle(this.ball).getPropertyValue("--y"));
  }

  set y(value) {
    this.ball.style.setProperty("--y", value);
  }

  reset() {
    this.x = 50;
    this.y = 50;
    this.direction = { x: 0 };
    while (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >= 0.9
    ) {
      const angle = randomNumberBetween(0, 2 * Math.PI);
      this.direction = { x: Math.cos(angle), y: Math.sin(angle) };
    }
    this.velocity = INITIAL_VELOCITY;
  }

  rect() {
    return this.ball.getBoundingClientRect();
  }

  update(delta, rects) {
    this.x += this.direction.x * this.velocity * delta;
    this.y += this.direction.y * this.velocity * delta;
    this.velocity += VELOCITY_INCREASE;

    const rect = this.rect();

    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this.direction.y *= -1;
    }
    if (rects.some((r) => hasCollided(r, rect))) {
      this.direction.x *= -1;
    }
  }
}

function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function hasCollided(paddle, ball) {
  return (
    paddle.left <= ball.right &&
    paddle.right >= ball.left &&
    paddle.top <= ball.bottom &&
    paddle.bottom >= ball.top
  );
}
