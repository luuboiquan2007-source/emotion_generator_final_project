let shapes = [];
let excitedColors = [
  "#ff006e", "#ffbe0b", "#3a86ff", "#ff5400", "#8338ec"
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noStroke();

  for (let i = 0; i < 120; i++) {
    shapes.push(new ExcitedShape());
  }
}

function draw() {
  background(255, 230, 180); 

  for (let s of shapes) {
    s.move();
    s.display();
  }

  fill(0);
  textAlign(CENTER);
  textSize(24);
  text("Emotion: Excited", width / 2, height - 30);
}


class ExcitedShape {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(20, 45);

    
    this.speedX = random(2, 6) * (random() < 0.5 ? -1 : 1);
    this.speedY = random(2, 6) * (random() < 0.5 ? -1 : 1);

    this.angle = random(360);
    this.spin = random(3, 6); 

    this.color = color(random(excitedColors));
    this.type = random(["circle", "rect", "triangle"]);
  }

  move() {
    // Gentle jitter for excitement
    this.x += this.speedX + random(-0.3, 0.3);
    this.y += this.speedY + random(-0.3, 0.3);

    // Soft bouncing
    if (this.x < 0 || this.x > width) {
      this.speedX *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.speedY *= -1;
    }

    // Mouse excitement boost (but subtle)
    let d = dist(this.x, this.y, mouseX, mouseY);
    if (d < 150) {
      this.x += (this.x - mouseX) * 0.03;
      this.y += (this.y - mouseY) * 0.03;
    }

    this.angle += this.spin;
  }

  display() {
    fill(this.color);
    push();
    translate(this.x, this.y);
    rotate(this.angle);

    if (this.type === "circle") {
      ellipse(0, 0, this.size);
    } 
    else if (this.type === "rect") {
      rectMode(CENTER);
      rect(0, 0, this.size, this.size);
    } 
    else if (this.type === "triangle") {
      triangle(
        -this.size / 2,  this.size / 2,
         this.size / 2,  this.size / 2,
         0,             -this.size / 2
      );
    }

    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
