let A = [0, 0, 0, 0];
let B = [0, 0, 0, 0];
let opcode = [0, 0, 0]; // 3-bit opcode
let select = [0, 0]; // For 4:1 MUX

let result = [0, 0, 0, 0];
let zero = 0;
let carryOut = 0;
let muxOut = 0;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('sim-wrapper');
  textAlign(CENTER, CENTER);
  textSize(14);

  // Create switches for inputs A and B
  for (let i = 0; i < 4; i++) {
    createSwitch(A, i, 30 + i * 40, 30, 'A');
    createSwitch(B, i, 30 + i * 40, 80, 'B');
  }

  // Create switches for opcode
  for (let i = 0; i < 3; i++) {
    createSwitch(opcode, i, 30 + i * 40, 140, 'Op');
  }

  // Create switches for multiplexer select lines
  for (let i = 0; i < 2; i++) {
    createSwitch(select, i, 250 + i * 40, 30, 'S');
  }
}

function draw() {
  background(255);

  // Determine operation
  let op = parseInt(opcode.join(''), 2);
  let aVal = parseInt(A.join(''), 2);
  let bVal = parseInt(B.join(''), 2);
  let resVal = 0;

  // ALU Ops based on opcode
  switch (op) {
    case 0: resVal = aVal & bVal; break; // AND
    case 1: resVal = aVal | bVal; break; // OR
    case 2: resVal = aVal ^ bVal; break; // XOR
    case 3: resVal = (~aVal) & 0xF; break; // NOT A
    case 4: resVal = aVal + bVal; break; // ADD
    case 5: resVal = (aVal - bVal + 16) % 16; break; // SUB (wrap-around)
    default: resVal = 0; break;
  }

  result = resVal.toString(2).padStart(4, '0').split('').map(Number);
  carryOut = op === 4 && aVal + bVal > 15 ? 1 : 0;
  zero = resVal === 0 ? 1 : 0;

  // Display ALU result
  fill(0);
  text("Result (R3 R2 R1 R0): " + result.join(' '), width / 2, 200);
  text("Zero Flag: " + zero, width / 2, 230);
  text("Carry-Out: " + carryOut, width / 2, 260);

  // 4:1 Multiplexer Logic (select between A[0]-A[3])
  let s = parseInt(select.join(''), 2);
  muxOut = A[s];

  text(`4:1 MUX Output (Y = A[S1S0] = A[${s}]): ${muxOut}`, width / 2, 300);

  // MUX visual
  for (let i = 0; i < 4; i++) {
    fill(i === s ? 'green' : 'lightgray');
    rect(50 + i * 50, 340, 40, 30);
    fill(0);
    text("A" + i + "=" + A[i], 70 + i * 50, 355);
  }

  // Output LED
  fill(muxOut ? 'green' : 'red');
  ellipse(width - 40, 350, 20, 20);
  fill(0);
  text("MUX Y", width - 40, 375);
}

function createSwitch(arr, index, x, y, label) {
  let btn = createButton(arr[index]);
  btn.position(x, y);
  btn.size(30, 30);
  btn.mousePressed(() => {
    arr[index] = arr[index] ? 0 : 1;
    btn.html(arr[index]);
  });
  let lbl = createDiv(label + index);
  lbl.position(x, y - 20);
}

