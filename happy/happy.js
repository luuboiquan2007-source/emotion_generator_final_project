let shapes = [];
let confetti = [];
let palette;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  angleMode(DEGREES);

  palette = { 
    bg: color(255, 245, 200), 
    main: color(255, 180, 0) 
  };


  for (let i = 0; i < 200; i++) {
    shapes.push(new HappyShape());
  }

  for (let i = 0; i < 40; i++) {
    confetti.push(new ConfettiPiece());
  }
}

function draw() {
  background(palette.bg);

 
  for (let s of shapes) {
    s.move();
    s.display();
  }


  for (let c of confetti) {
    c.move();
    c.display();
  }

  if (random(1) < 0.02) {
    for (let i = 0; i < 10; i++) {
      confetti.push(new ConfettiPiece(random(width), random(height)));
    }
  }

  fill(255);
  textAlign(CENTER);
  textSize(24);
  text("Emotion: HAPPY", width / 2, height - 40);
}

class HappyShape {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(10, 60);
    this.speed = random(0.5, 2);
    this.angle = random(360);

    this.color = color(
      red(palette.main) + random(-40, 40),
      green(palette.main) + random(-40, 40),
      blue(palette.main) + random(-40, 40),
      random(120, 220)
    );

    this.type = random(["circle", "rect", "triangle"]);
  }

  move() {
    let dx = sin(this.angle) * random(1.5, 2.5);
    let dy = cos(this.angle) * random(1.5, 2.5);

    if (this.lastDX === dx && this.lastDY === dy) {
      dx += random(-0.5, 0.5);
      dy += random(-0.5, 0.5);
    }

    this.x += dx;
    this.y += dy;

    this.lastDX = dx;
    this.lastDY = dy;

    this.angle += this.speed;

    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;
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
         -this.size / 2,  
         this.size / 2,
         this.size / 2,  
         this.size / 2,
         0,            
         -this.size / 2
      );
    }
    pop();
  }
}

class ConfettiPiece {
  constructor(x, y) {
    this.x = x || random(width);
    this.y = y || random(height);
    this.size = random(4, 9);
    this.angle = random(360);

    this.xSpeed = random(-1.5, 1.5);
    this.ySpeed = random(0.5, 2);

   this.color = color(
  random([255, 255, 200, 200, 180]),
  random([180, 200, 255, 150]),
  random([200, 255, 230, 180]),
  random(150, 220)
);
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.angle += random(-3, 3);

    // reset when falling off screen
    if (this.y > height + 20) {
      this.y = -10;
      this.x = random(width);
    }
  }

  display() {
    fill(this.color);
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    rectMode(CENTER);
    rect(0, 0, this.size, this.size / 2); 
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
