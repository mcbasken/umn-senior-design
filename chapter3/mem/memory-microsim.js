let addressBits = [0, 0, 0, 0]; // 4 bits => 16 addresses
let dataBits = [0, 0, 0, 0, 0, 0, 0, 0]; // 8-bit data
let memory = Array(16).fill().map(() => [0,0,0,0,0,0,0,0]); // 16x8 memory

let CE = 0;
let OE = 0;
let WE = 0;

function setup() {
  let canvas = createCanvas(1000, 800);
  canvas.parent('p5-sketch');
  textAlign(CENTER, CENTER);
  textSize(18);
}

function draw() {
  background(245);

  let yOffset = 50;  // ✅ Correct spelling now!

  textSize(28);
  fill(0);
  text("Memory System MicroSim", width/2, 30 + yOffset);

  drawAddressInputs(yOffset);
  drawDataInputs(yOffset);
  drawControlSignals(yOffset);
  drawMemoryArray(yOffset);
  drawActionButtons(yOffset);
}

function drawAddressInputs(yOffset) {
  fill(0);
  textSize(20);
  text("Address Inputs (A3 A2 A1 A0)", width/4, 60 + yOffset);

  for (let i = 0; i < 4; i++) {
    drawBit(width/4 - 75 + i*50, 100 + yOffset, addressBits[i], "A" + (3-i));
  }
}

function drawDataInputs(yOffset) {
  fill(0);
  textSize(20);
  text("Data Inputs (D7 D6 ... D0)", width*3/4, 60 + yOffset);

  for (let i = 0; i < 8; i++) {
    drawBit(width*3/4 - 175 + i*40, 100 + yOffset, dataBits[i], "D" + (7-i));
  }
}

function drawControlSignals(yOffset) {
  fill(0);
  textSize(20);
  text("Control Signals", width/2, 200 + yOffset);

  drawSignalButton(width/2 - 100, 220 + yOffset, "CE", CE);
  drawSignalButton(width/2, 220 + yOffset, "OE", OE);
  drawSignalButton(width/2 + 100, 220 + yOffset, "WE", WE);
}

function drawMemoryArray(yOffset) {
  fill(0);
  textSize(20);
  text("Memory Array", width/2, 300 + yOffset);

  textSize(16);
  for (let i = 0; i < 16; i++) {
    let y = 330 + i*20 + yOffset;
    let addr = i.toString(16).toUpperCase().padStart(1, '0');
    text("0x" + addr + ":", width/2 - 150, y);
    text(memory[i].join(""), width/2, y);
  }
}

function drawActionButtons(yOffset) {
  drawButton(width/2 - 100, 670 + yOffset, 80, 40, "Read");
  drawButton(width/2 + 20, 670 + yOffset, 80, 40, "Write");
}

function drawBit(x, y, value, label) {
  fill(value ? 'limegreen' : 'red');
  rect(x, y, 40, 40, 8);

  fill(255);
  textSize(20);
  text(value, x + 20, y + 20);

  fill(0);
  textSize(12);
  text(label, x + 20, y - 10);
}

function drawSignalButton(x, y, label, value) {
  fill(value ? 'limegreen' : 'red');
  rect(x, y, 60, 40, 8);

  fill(255);
  textSize(18);
  text(label, x + 30, y + 20);
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
  let yOffset = 50;  // Needed here too

  // Address Inputs
  for (let i = 0; i < 4; i++) {
    if (mouseX > width/4 - 75 + i*50 && mouseX < width/4 - 35 + i*50 &&
        mouseY > 100 + yOffset && mouseY < 140 + yOffset) {
      addressBits[i] = addressBits[i] ? 0 : 1;
    }
  }
  // Data Inputs
  for (let i = 0; i < 8; i++) {
    if (mouseX > width*3/4 - 175 + i*40 && mouseX < width*3/4 - 135 + i*40 &&
        mouseY > 100 + yOffset && mouseY < 140 + yOffset) {
      dataBits[i] = dataBits[i] ? 0 : 1;
    }
  }
  // Control Signals
  if (mouseX > width/2 - 100 && mouseX < width/2 - 40 &&
      mouseY > 220 + yOffset && mouseY < 260 + yOffset) {
    CE = CE ? 0 : 1;
  }
  if (mouseX > width/2 && mouseX < width/2 + 60 &&
      mouseY > 220 + yOffset && mouseY < 260 + yOffset) {
    OE = OE ? 0 : 1;
  }
  if (mouseX > width/2 + 100 && mouseX < width/2 + 160 &&
      mouseY > 220 + yOffset && mouseY < 260 + yOffset) {
    WE = WE ? 0 : 1;
  }
  // Action Buttons
  if (mouseX > width/2 - 100 && mouseX < width/2 - 20 &&
      mouseY > 670 + yOffset && mouseY < 710 + yOffset) {
    readCycle();
  }
  if (mouseX > width/2 + 20 && mouseX < width/2 + 100 &&
      mouseY > 670 + yOffset && mouseY < 710 + yOffset) {
    writeCycle();
  }
}

function readCycle() {
  if (CE && OE && !WE) {
    let addr = parseInt(addressBits.join(""), 2);
    dataBits = memory[addr].slice();
  }
}

function writeCycle() {
  if (CE && !OE && WE) {
    let addr = parseInt(addressBits.join(""), 2);
    memory[addr] = dataBits.slice();
  }
}
