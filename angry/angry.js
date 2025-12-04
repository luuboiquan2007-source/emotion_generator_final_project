let shapes = [];
let palette;
let draggedShape = null;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  angleMode(DEGREES);

  // ANGRY color palette
  palette = { 
    bg: color(40, 0, 0),
    main: color(255, 80, 60)
  };

  for (let i = 0; i < 200; i++) {
    shapes.push(new AngryShape());
  }
}

function draw() {
  background(palette.bg);

  for (let s of shapes) {
    if (s !== draggedShape) s.move(); // freeze shape while dragging
    s.display();
  }

  fill(255);
  textAlign(CENTER);
  textSize(24);
  text("Emotion: Angry", width / 2, height - 40);
}

// --- Angry Shape Class ---
class AngryShape {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(20, 60);
    this.speed = random(3, 7);
    this.angle = random(360);

    this.color = color(
      red(palette.main) + random(-30, 30),
      green(palette.main) + random(-30, 30),
      blue(palette.main) + random(-30, 30),
      random(170, 255)
    );

    this.type = random(["circle", "rect", "triangle"]);
  }

  move() {
    // ANGRY movement: violent shaking + random bursts
    let dx = random(-5, 5) * this.speed * 0.3;
    let dy = random(-5, 5) * this.speed * 0.3;

    // if identical movement → break with jitter
    if (this.lastDX === dx && this.lastDY === dy) {
      dx += random(-2, 2);
      dy += random(-2, 2);
    }

    this.x += dx;
    this.y += dy;

    this.lastDX = dx;
    this.lastDY = dy;

    // bounce off walls (angry effect)
    if (this.x < 0) { this.x = 0; dx *= -1; }
    if (this.x > width) { this.x = width; dx *= -1; }
    if (this.y < 0) { this.y = 0; dy *= -1; }
    if (this.y > height) { this.y = height; dy *= -1; }
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

  isMouseInside() {
    return dist(mouseX, mouseY, this.x, this.y) < this.size / 2;
  }
}


// --- Mouse Interaction ---
function mousePressed() {
  for (let i = shapes.length - 1; i >= 0; i--) {
    if (shapes[i].isMouseInside()) {
      draggedShape = shapes[i];
      break;
    }
  }
}

function mouseDragged() {
  if (draggedShape) {
    draggedShape.x = mouseX;
    draggedShape.y = mouseY;
  }
}

function mouseReleased() {
  draggedShape = null;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
