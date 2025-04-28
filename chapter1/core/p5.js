function setup() {
  let canvas = createCanvas(400, 300);
  canvas.parent('p5-sketch');
  textAlign(CENTER, CENTER);
  textSize(18);
}

function draw() {
  background(240);
  
  fill(0);
  text("Logic Gate Demo", width/2, 30);

  fill(100);
  rect(50, 100, 80, 50); // Input A
  rect(50, 180, 80, 50); // Input B
  rect(270, 140, 80, 50); // Output

  fill(255);
  text("A", 90, 125);
  text("B", 90, 205);
  text("A AND B", 310, 165);

  // Draw connecting lines
  stroke(0);
  line(130, 125, 270, 165); // A -> Output
  line(130, 205, 270, 165); // B -> Output
}
