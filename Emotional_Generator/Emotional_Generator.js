let emotion;
let palette;
let shapes = [];
let confetti = [];
let sparkles = [];
let previousEmotion = null;

let excitedColors = ["#ff006e", "#ffbe0b", "#3a86ff", "#ff5400", "#8338ec"];
let loveColors = ["#ff4d6d", "#ff6b81", "#ff8fa3", "#ffccd5", "#ffb3c1"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noStroke();
  pickNewEmotion();
}

function draw() {
  background(palette.bg);

  for (let s of shapes) {
    s.move();
    s.display();
  }

  if (emotion === "love") {
    for (let sp of sparkles) {
      sp.move();
      sp.display();
    }
  }

  if (emotion === "happy") {
    for (let c of confetti) {
      c.move();
      c.display();
    }

    if (random(1) < 0.02) {
      for (let i = 0; i < 10; i++) {
        confetti.push(new ConfettiPiece(random(width), random(height)));
      }
    }
  }

  fill(255);
  textAlign(CENTER);
  textSize(24);
  text("Emotion: " + emotion, width / 2, height - 40);
  textSize(14);
  text("Click to change emotion", width / 2, height - 20);
}

function pickNewEmotion() {
    let options = ["calm", "happy", "sad", "angry", "excited", "love"];
  let newEmotion = random(options);
  while (newEmotion === previousEmotion) {
    newEmotion = random(options);
  }

  emotion = newEmotion;
  previousEmotion = newEmotion;
  palette = getPalette(emotion);

  shapes = [];
  confetti = [];
  sparkles = [];

  for (let i = 0; i < 200; i++) {
    if (emotion === "excited") shapes.push(new ExcitedShape());
    else if (emotion === "love") shapes.push(new LoveShape());
    else if (emotion === "happy") shapes.push(new HappyShape());
    else shapes.push(new Shape());
  }

  if (emotion === "love") {
    for (let i = 0; i < 130; i++) sparkles.push(new Sparkle());
  }

  if (emotion === "happy") {
    for (let i = 0; i < 40; i++) confetti.push(new ConfettiPiece());
  }
}

function getPalette(mood) {
  if (mood === "calm") return { bg: color(30, 60, 100), main: color(120, 200, 255) };
  if (mood === "happy") return { bg: color(255, 245, 200), main: color(255, 180, 0) };
  if (mood === "sad") return { bg: color(20, 30, 70), main: color(100, 150, 255) };
  if (mood === "angry") return { bg: color(40, 0, 0), main: color(255, 80, 60) };
  if (mood === "excited") return { bg: color(255, 230, 180), main: color(255, 100, 255) };
  if (mood === "love") return { bg: color(255, 210, 225), main: color(255, 50, 120) };
}

class Shape {
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
    this.type = emotion === "love" ? "heart" : random(["circle", "rect", "triangle"]);
  }

  move() {
    let dx = 0;
    let dy = 0;

    if (emotion === "calm") dx = 0, dy = sin(frameCount * 0.5) * 0.3;
    else if (emotion === "happy") dx = sin(this.angle) * random(1.5, 2.5), dy = cos(this.angle) * random(1.5, 2.5);
    else if (emotion === "sad") dx = 0, dy = this.speed * random(0.3, 0.5);
    else if (emotion === "angry") dx = random(-5,5), dy = random(-5,5);
    else if (emotion === "love") dx = sin(this.angle*0.5)*random(1,2), dy = cos(this.angle*0.5)*random(1,2);

    if (this.lastDX === dx && this.lastDY === dy) dx += random(-0.5,0.5), dy += random(-0.5,0.5);

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
    translate(this.x,this.y);
    rotate(this.angle);

    if (this.type==="heart") drawHeart(0,0,this.size);
    else if(this.type==="circle") ellipse(0,0,this.size);
    else if(this.type==="rect") rectMode(CENTER), rect(0,0,this.size,this.size);
    else if(this.type==="triangle") triangle(-this.size/2,this.size/2,this.size/2,this.size/2,0,-this.size/2);

    pop();
  }
}

function drawHeart(x,y,size){
  beginShape();
 vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}

class HappyShape extends Shape {
  constructor() { super(); }
}

class ConfettiPiece {
  constructor(x,y){
    this.x = x||random(width);
    this.y = y||random(height);
    this.size = random(4,9);
    this.angle = random(360);
    this.xSpeed = random(-1.5,1.5);
    this.ySpeed = random(0.5,2);
    this.color = color(random([255,255,200,200,180]), random([180,200,255,150]), random([200,255,230,180]), random(150,220));
  }

  move(){
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.angle += random(-3,3);
    if(this.y>height+20) this.y=-10,this.x=random(width);
  }

  display(){
    fill(this.color);
    push();
    translate(this.x,this.y);
    rotate(this.angle);
    rectMode(CENTER);
    rect(0,0,this.size,this.size/2);
    pop();
  }
}

class ExcitedShape {
  constructor(){
    this.x=random(width);
    this.y=random(height);
    this.baseSize=random(20,45);
    this.size=this.baseSize;
    this.speedX=random(2,6)*(random()<0.5?-1:1);
    this.speedY=random(2,6)*(random()<0.5?-1:1);
    this.angle=random(360);
    this.spin=random(3,6);
    this.color=color(random(excitedColors));
    this.type=random(["circle","rect","triangle"]);
  }
  move(){
    this.x+=this.speedX+random(-0.5,0.5);
    this.y+=this.speedY+random(-0.5,0.5);
    if(this.x<0||this.x>width) this.speedX*=-1;
    if(this.y<0||this.y>height) this.speedY*=-1;
    let d=dist(this.x,this.y,mouseX,mouseY);
    if(d<150){ this.x+=(this.x-mouseX)*0.05; this.y+=(this.y-mouseY)*0.05; }
    this.angle+=this.spin;
    this.size=this.baseSize+sin(frameCount*5+this.x+this.y)*5;
  }
  display(){
    fill(red(this.color),green(this.color),blue(this.color),random(150,255));
    push();
    translate(this.x,this.y);
    rotate(this.angle);
    if(this.type==="circle") ellipse(0,0,this.size);
    else if(this.type==="rect") rectMode(CENTER),rect(0,0,this.size,this.size);
    else if(this.type==="triangle") triangle(-this.size/2,this.size/2,this.size/2,this.size/2,0,-this.size/2);
    pop();
  }
}

class LoveShape {
  constructor(){
    this.x=random(width);
    this.y=random(height);
    this.size=random(20,45);
    this.speedX=random(1.2,2.9)*(random()<0.5?-1:1);
    this.speedY=random(1.2,2.9)*(random()<0.5?-1:1);
    this.angle=random(360);
    this.spin=random(3,5);
    this.color=color(random(loveColors));
    this.curveOffset=random(1000);
  }
  move(){
    this.x+=this.speedX+sin(frameCount*0.8+this.curveOffset)*0.6;
    this.y+=this.speedY+cos(frameCount*0.8+this.curveOffset)*0.6;
    let d=dist(this.x,this.y,mouseX,mouseY);
    if(d<200){ this.x+=(mouseX-this.x)*0.01; this.y+=(mouseY-this.y)*0.01; }
    if(this.x<-30) this.x=width+30; if(this.x>width+30) this.x=-30;
    if(this.y<-30) this.y=height+30; if(this.y>height+30) this.y=-30;
    this.angle+=this.spin;
  }
  display(){ push(); translate(this.x,this.y); rotate(this.angle); fill(this.color); drawHeart(0,0,this.size); pop(); }
}

class Sparkle {
  constructor(){ this.reset(); }
  reset(){ this.x=random(width); this.y=random(height); this.size=random(2,7); this.alpha=random(120,220); this.riseSpeed=random(0.3,1); this.swayOffset=random(1000); this.swayStrength=random(0.3,1); }
  move(){ this.y-=this.riseSpeed; this.x+=sin(frameCount*0.8+this.swayOffset)*this.swayStrength; this.alpha-=0.3; if(this.y<-5||this.alpha<=0){ this.reset(); this.y=height+random(20);} }
  display(){ fill(255,this.alpha); ellipse(this.x,this.y,this.size); }
}

function mousePressed(){ pickNewEmotion(); }
function windowResized(){ resizeCanvas(windowWidth, windowHeight); }
