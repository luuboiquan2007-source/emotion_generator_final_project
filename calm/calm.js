let shapes = [];
let palette;
let draggedShape = null;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  angleMode(DEGREES);

  // CALM palette
  palette = { 
    bg: color(30, 60, 100), 
    main: color(120, 200, 255) 
  };

  for (let i = 0; i < 200; i++) {
    shapes.push(new CalmShape());
  }
}

function draw() {
  background(palette.bg);

   for (let s of shapes) {
    if (s !== draggedShape) s.move();
    s.display();
  }

  fill(255);
  textAlign(CENTER);
  textSize(24);
  text("Emotion: CALM", width / 2, height - 40);
}

// --- Calm Shape Class ---
class CalmShape {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(15, 60);
    this.speed = random(0.2, 0.7);
    this.angle = random(360);

    this.color = color(
      red(palette.main) + random(-30, 30),
      green(palette.main) + random(-30, 30),
      blue(palette.main) + random(-30, 30),
      random(120, 200)
    );

    this.type = random(["circle", "rect", "triangle"]);
  }

  move() {
    // Gentle soft vertical drift
    let dx = 0;
    let dy = sin(frameCount * 0.5 + this.angle) * 0.3 * this.speed;

    // avoid repeating identical movement
    if (this.lastDX === dx && this.lastDY === dy) {
      dy += random(-0.2, 0.2);
    }

    this.x += dx;
    this.y += dy;

    this.lastDX = dx;
    this.lastDY = dy;

    this.angle += this.speed * 0.3;

    // wrap around
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
  // Check from top: drag the shape in front
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
