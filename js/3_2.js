let address = [0, 0, 0]; // 3-bit address
let addressButtons = [];
let romOutput = [0, 0, 0, 0];
let rom = []; // Holds 8 4-bit values

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('sim-wrapper');
  textAlign(CENTER, CENTER);
  textSize(16);

  // Initialize ROM like an `initial` block or case
  rom = [
    [0, 0, 0, 0], // 0
    [0, 0, 0, 1], // 1
    [0, 0, 1, 0], // 2
    [0, 0, 1, 1], // 3
    [0, 1, 0, 0], // 4
    [0, 1, 0, 1], // 5
    [1, 1, 1, 0], // 6 - random value for fun
    [1, 0, 1, 1]  // 7 - random value
  ];

  // Create address switches
  for (let i = 0; i < 3; i++) {
    addressButtons[i] = createButton('0');
    addressButtons[i].position(40 + i * 50, 30);
    addressButtons[i].mousePressed(() => toggleBit(address, i, addressButtons[i]));
  }

  updateOutput(); // Display initial value
}

function draw() {
  background(255);

  // Title
  textSize(18);
  fill(0);
  text("8-Word ROM (4-bit wide)", width / 2, 60);

  // Show current address
  textSize(14);
  text("Address (A2 A1 A0): " + address.join(' '), width / 2, 100);

  // Show output
  let hex = parseInt(romOutput.join(''), 2).toString(16).toUpperCase();
  text("ROM Output (D3 D2 D1 D0): " + romOutput.join(' '), width / 2, 140);
  text("Hex Output: 0x" + hex, width / 2, 170);

  // Draw "ROM cell"
  fill(240);
  stroke(0);
  rect(width / 2 - 80, 200, 160, 100, 10);
  fill(0);
  textSize(14);
  text("ROM Cell", width / 2, 225);
  text("Out: " + romOutput.join(''), width / 2, 255);
}

function toggleBit(arr, index, button) {
  arr[index] = arr[index] ? 0 : 1;
  button.html(arr[index]);
  updateOutput();
}

function updateOutput() {
  let addr = parseInt(address.join(''), 2);
  romOutput = rom[addr];

  console.log(`$display -> Addr=${address.join('')} (${addr}) => Data=${romOutput.join('')} (0x${parseInt(romOutput.join(''), 2).toString(16).toUpperCase()})`);
}
