let shapes = [];
let sparkles = [];
let loveColors = [
  "#ff4d6d", "#ff6b81", "#ff8fa3", "#ffccd5", "#ffb3c1"
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noStroke();


  for (let i = 0; i < 100; i++) {
    shapes.push(new LoveShape());
  }

 
  for (let i = 0; i < 130; i++) {
    sparkles.push(new Sparkle());
  }
}

function draw() {
  background(255, 210, 225); // soft romantic background

  
  for (let h of shapes) {
    h.move();
    h.display();
  }

 
  for (let sp of sparkles) {
    sp.move();
    sp.display();
  }

  fill(255);
  textAlign(CENTER);
  textSize(24);
  text("Emotion: Love", width / 2, height - 30);
}

class LoveShape {
  constructor() {
    this.x = random(width);
    this.y = random(height);

    this.size = random(20, 45);

    this.speedX = random(1.2, 2.9) * (random() < 0.5 ? -1 : 1);
    this.speedY = random(1.2, 2.9) * (random() < 0.5 ? -1 : 1);

    this.angle = random(360);
    this.spin = random(3, 5);

    this.color = color(random(loveColors));
    this.curveOffset = random(1000);
  }

  move() {
    this.x += this.speedX + sin(frameCount * 0.8 + this.curveOffset) * 0.6;
    this.y += this.speedY + cos(frameCount * 0.8 + this.curveOffset) * 0.6;

    let d = dist(this.x, this.y, mouseX, mouseY);
    if (d < 200) {
      this.x += (mouseX - this.x) * 0.01;
      this.y += (mouseY - this.y) * 0.01;
    }

    if (this.x < -30) this.x = width + 30;
    if (this.x > width + 30) this.x = -30;
    if (this.y < -30) this.y = height + 30;
    if (this.y > height + 30) this.y = -30;

    this.angle += this.spin;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);

    fill(this.color);
    drawHeart(0, 0, this.size);

    pop();
  }
}

class Sparkle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(width);
    this.y = random(height);

    this.size = random(2, 7);
    this.alpha = random(120, 220);

    this.riseSpeed = random(0.3, 1);
    this.swayOffset = random(1000);
    this.swayStrength = random(0.3, 1);
  }

  move() {
    this.y -= this.riseSpeed; 
    this.x += sin(frameCount * 0.8 + this.swayOffset) * this.swayStrength;
    this.alpha -= 0.3;

    if (this.y < -5 || this.alpha <= 0) {
      this.reset();
      this.y = height + random(20);
    }
  }

  display() {
    fill(255, this.alpha);
    ellipse(this.x, this.y, this.size);
  }
}


function drawHeart(x, y, size) {
  beginShape();
   vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
