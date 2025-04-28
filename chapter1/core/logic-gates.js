// Digital Design MicroSim
let mode = 0;
let modes = ["Number Systems", "Boolean Logic"];
let inputBits = [0, 0, 0, 0]; // 4-bit input
let baseLabels = ["Binary", "Octal", "Decimal", "Hex"];
let switchModeBtn;
let inputButtons = [];

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("canvas-container");
  textAlign(CENTER, CENTER);
  textSize(18);

  // Input toggle buttons
  for (let i = 0; i < 4; i++) {
    inputButtons[i] = createButton("0");
    inputButtons[i].mousePressed(() => {
      inputBits[i] = inputBits[i] ? 0 : 1;
      inputButtons[i].html(inputBits[i]);
    });
  }

  // Mode toggle button
  switchModeBtn = createButton("Switch Mode");
  switchModeBtn.position(width / 2 - 60, height - 50);
  switchModeBtn.mousePressed(() => {
    mode = (mode + 1) % modes.length;
  });
}



function draw() {
  background(245);
  fill(0);
  textSize(18);
  text(modes[mode], width / 2, 20);

  // Adjust input buttons and show/hide based on mode
  if (mode === 0) {
    for (let i = 0; i < 4; i++) {
      inputButtons[i].position(100 + i * 100, 80); // Spread all 4 buttons
      inputButtons[i].show();
    }
  } else if (mode === 1) {
    // Position only first two buttons centered
    inputButtons[0].position(width/2 - 80, 80); // A button
    inputButtons[1].position(width/2 + 20, 80); // B button
    

    inputButtons[0].show();
    inputButtons[1].show();
    inputButtons[2].hide();
    inputButtons[3].hide();

    // Draw labels "A" and "B" under the buttons
    textSize(16);
    fill(50);
    text("A", width/2 - 60, 130); 
    text("B", width/2 + 40, 130);
  }

  switch (mode) {
    case 0:
      drawNumberSystems();
      break;
    case 1:
      drawBooleanLogic();
      break;
  }
}



function drawNumberSystems() {
  let bin = inputBits.join("");
  let dec = parseInt(bin, 2);
  let oct = dec.toString(8);
  let hex = dec.toString(16).toUpperCase();

  textSize(16);
  text("Binary:    " + bin, width / 2, 140);
  text("Octal:     " + oct, width / 2, 170);
  text("Decimal:   " + dec, width / 2, 200);
  text("Hex:       0x" + hex, width / 2, 230);
}

function drawBooleanLogic() {
  let A = inputBits[0];
  let B = inputBits[1];
  let andAB = A & B;
  let orAB = A | B;
  let notA = A ^ 1;
  let xorAB = A ^ B;

  textSize(16);
  text("A AND B = " + andAB, width / 2, 160);
  text("A OR  B = " + orAB, width / 2, 190);
  text("A XOR B = " + xorAB, width / 2, 220);
  text("NOT A   = " + notA, width / 2, 250);
} 
