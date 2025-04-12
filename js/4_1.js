let A = 0, B = 0;
let Y = 0;
let btnA, btnB;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('sim-wrapper');
  textAlign(CENTER, CENTER);
  textSize(16);

  // Input switches
  btnA = createButton('A = 0');
  btnA.position(100, 50);
  btnA.mousePressed(() => {
    A = A ? 0 : 1;
    btnA.html('A = ' + A);
    updateGate();
  });

  btnB = createButton('B = 0');
  btnB.position(200, 50);
  btnB.mousePressed(() => {
    B = B ? 0 : 1;
    btnB.html('B = ' + B);
    updateGate();
  });

  // Run the testbench automatically
  setTimeout(runTestbench, 500);
}

function draw() {
  background(255);
  fill(0);
  textSize(18);
  text("2-Input AND Gate", width / 2, 120);

  textSize(16);
  text(`A = ${A}`, 100, 180);
  text(`B = ${B}`, 300, 180);

  // Logic operation
  fill(Y ? 'green' : 'red');
  ellipse(width / 2, 220, 40);
  fill(0);
  text(`Y = A & B = ${Y}`, width / 2, 270);
}

function updateGate() {
  Y = A & B; // Verilog-style logic
  console.log(`$display -> A=${A}, B=${B}, Y=${Y}`);
}

function runTestbench() {
  console.log("Running AND gate testbench:");
  for (let a = 0; a <= 1; a++) {
    for (let b = 0; b <= 1; b++) {
      let y = a & b;
      console.log(`$display -> A=${a}, B=${b}, Y=${y}`);
    }
  }
}
