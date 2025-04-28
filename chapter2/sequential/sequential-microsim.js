let flipFlops = [0, 0, 0, 0]; // 4 flip-flops
let serialInput = 0;
let mode = "SHIFT"; // SHIFT or COUNTER

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent('p5-sketch');
  textAlign(CENTER, CENTER);
  textSize(20);
}

function draw() {
  background(240);

  fill(0);
  textSize(28);
  text("Mode: " + mode, width/2, 50);

  textSize(18);
  text("Click Serial Input to Toggle (SHIFT mode)", width/2, 100);

  // Draw Serial Input Bit
  fill(serialInput ? 'limegreen' : 'red');
  rect(width/2 - 25, 130, 50, 50, 8);
  fill(255);
  textSize(24);
  text(serialInput, width/2, 155);

  // Draw Flip-Flops
  let startX = width/2 - (flipFlops.length * 90) / 2;
  for (let i = 0; i < flipFlops.length; i++) {
    fill(flipFlops[i] ? 'limegreen' : 'red');
    rect(startX + i*90, 230, 80, 80, 12);
    fill(0);
    textSize(16);
    text("Q" + i, startX + i*90 + 40, 220);
    fill(255);
    textSize(24);
    text(flipFlops[i], startX + i*90 + 40, 270);
  }

  // Draw Clock Tick Button
  drawButton(width/2 - 120, 400, 100, 50, "Clock Tick");

  // Draw Switch Mode Button
  drawButton(width/2 + 20, 400, 120, 50, "Switch Mode");
}

function drawButton(x, y, w, h, label) {
  fill(255);
  stroke(0);
  rect(x, y, w, h, 10);
  fill(0);
  noStroke();
  textSize(18);
  text(label, x + w/2, y + h/2);
}

function mousePressed() {
  // Serial Input Toggle (SHIFT mode)
  if (mode === "SHIFT") {
    if (mouseX > width/2 - 25 && mouseX < width/2 + 25 &&
        mouseY > 130 && mouseY < 180) {
      serialInput = serialInput ? 0 : 1;
    }
  }

  // Clock Tick Button Click
  if (mouseX > width/2 - 120 && mouseX < width/2 - 20 &&
      mouseY > 400 && mouseY < 450) {
    clockTick();
  }

  // Switch Mode Button Click
  if (mouseX > width/2 + 20 && mouseX < width/2 + 140 &&
      mouseY > 400 && mouseY < 450) {
    switchMode();
  }
}

function clockTick() {
  if (mode === "SHIFT") {
    // Shift register behavior
    flipFlops.unshift(serialInput); // insert serial input
    flipFlops.pop(); // remove last flip-flop
  } else if (mode === "COUNTER") {
    // Counter behavior
    let num = parseInt(flipFlops.join(""), 2);
    num = (num + 1) % 16; // 4-bit counter (0 to 15)
    let newBits = num.toString(2).padStart(4, "0").split("").map(Number);
    flipFlops = newBits;
  }
}

function switchMode() {
  mode = (mode === "SHIFT") ? "COUNTER" : "SHIFT";
}
