let flipFlops = [0, 0, 0, 0]; // 4 flip-flops
let serialInput = 0;
let mode = "SHIFT"; // SHIFT or COUNTER

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent('p5-sketch');
  textAlign(CENTER, CENTER);
  textSize(20);

  // Hook up buttons
  select("#clockButton").mousePressed(clockTick);
  select("#modeButton").mousePressed(switchMode);
}

function draw() {
  background(240);

  fill(0);
  textSize(24);
  text("Mode: " + mode, width / 2, 40);

  // Serial Input Indicator
  if (mode === "SHIFT") {
    textSize(16);
    text("Serial Input (Click to toggle):", width/2, 100);

    fill(serialInput ? 'limegreen' : 'red');
    rect(width/2 - 20, 120, 40, 40, 8);
    fill(255);
    text(serialInput, width/2, 140);
  }

  // Draw Flip-Flops
  for (let i = 0; i < flipFlops.length; i++) {
    let x = width/2 - 150 + i * 100;
    let y = 250;

    fill(flipFlops[i] ? 'limegreen' : 'red');
    rect(x, y, 80, 80, 12);

    fill(0);
    textSize(16);
    text("Q" + i, x + 40, y - 20);

    fill(255);
    textSize(24);
    text(flipFlops[i], x + 40, y + 40);
  }

  // Clock Indicator
  textSize(18);
  fill(0);
  text("Press 'Clock Tick' to advance ⏱️", width/2, height - 50);
}

function mousePressed() {
  // Toggle serial input if clicked
  if (mode === "SHIFT") {
    if (mouseX > width/2 - 20 && mouseX < width/2 + 20 &&
        mouseY > 120 && mouseY < 160) {
      serialInput = serialInput ? 0 : 1;
    }
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
