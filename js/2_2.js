let counter = [0, 0, 0, 0]; // Q3 Q2 Q1 Q0
let clockButton, resetButton;
let clk = 0;
let rst = 1; // Active low
let countValue = 0;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('sim-wrapper');
  textAlign(CENTER, CENTER);
  textSize(16);

  // Clock button
  clockButton = createButton('Clock ↑');
  clockButton.position(140, 300);
  clockButton.mousePressed(clockTick);

  // Reset button (active low)
  resetButton = createButton('Reset (active-low)');
  resetButton.position(140, 340);
  resetButton.mousePressed(() => {
    rst = 0;
    resetCounter();
    setTimeout(() => {
      rst = 1;
    }, 300); // Simulate momentary active-low
  });
}

function draw() {
  background(255);

  // Draw title
  fill(0);
  textSize(18);
  text("4-Bit Synchronous Up-Counter", width / 2, 40);

  // Draw D Flip-Flop outputs (Q3 Q2 Q1 Q0)
  textSize(16);
  text("Counter Output (Q3 Q2 Q1 Q0)", width / 2, 90);
  text(counter.join(' '), width / 2, 120);

  // Draw LED-style indicators
  for (let i = 0; i < 4; i++) {
    fill(counter[i] ? 'green' : 'red');
    ellipse(100 + i * 50, 160, 30);
    fill(0);
    text(`Q${3 - i}`, 100 + i * 50, 200);
  }

  // Show binary and decimal
  textSize(14);
  text(`Binary: ${counter.join('')}`, width / 2, 240);
  text(`Decimal: ${countValue}`, width / 2, 270);
}

function clockTick() {
  if (rst === 0) {
    resetCounter();
    return;
  }

  countValue = (countValue + 1) % 16;
  counter = countValue.toString(2).padStart(4, '0').split('').map(Number);

  console.log(`$display -> Clock tick | Q = ${counter.join('')} | Decimal = ${countValue}`);
}

function resetCounter() {
  countValue = 0;
  counter = [0, 0, 0, 0];
  console.log(`$display -> Reset active! Q = 0000`);
}

