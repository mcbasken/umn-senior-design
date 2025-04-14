// Memory Microsim: SRAM, DRAM, ROM, Flash - 400x400 Canvas
let mode = 0;
let modes = ["SRAM vs DRAM", "ROM vs Flash", "Memory Addressing"];

let switchBtn;
let address = 0;
let memory = Array(16).fill(0).map((_, i) => i % 16);
let dataLine = 0;
let isWrite = false;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("canvas-container");
  textAlign(CENTER, CENTER);
  textSize(14);

  // Mode switcher
  switchBtn = createButton("Switch Mode");
  switchBtn.position((width - 100) / 2, 360);
  switchBtn.size(100, 25);
  switchBtn.mousePressed(() => {
    mode = (mode + 1) % modes.length;
    address = 0;
    isWrite = false;
  });

  createP("Use UP/DOWN arrows to change address. Press 'W' to toggle write mode and LEFT/RIGHT to change data.")
    .style("font-size", "12px").position(10, 380);
}

function draw() {
  background(250);
  textSize(16);
  text(modes[mode], width / 2, 30);
  textSize(14);

  switch (mode) {
    case 0: drawSRAMvsDRAM(); break;
    case 1: drawROMvsFlash(); break;
    case 2: drawMemoryAddressing(); break;
  }
}

function drawSRAMvsDRAM() {
  textAlign(CENTER);
  fill("lightblue");
  rect(80, 100, 100, 60);
  fill("black");
  text("SRAM", 130, 120);
  text("Flip-flop\nNo Refresh", 130, 145);

  fill("lightgreen");
  rect(220, 100, 100, 60);
  fill("black");
  text("DRAM", 270, 120);
  text("Capacitor\nNeeds Refresh", 270, 145);

  text("SRAM = Fast, Costly, Low Density", width / 2, 220);
  text("DRAM = Slower, Cheap, High Density", width / 2, 240);
}

function drawROMvsFlash() {
  textAlign(CENTER);
  fill("orange");
  rect(80, 100, 100, 60);
  fill("black");
  text("ROM", 130, 120);
  text("Read Only\nFirmware", 130, 145);

  fill("yellow");
  rect(220, 100, 100, 60);
  fill("black");
  text("Flash", 270, 120);
  text("Block Erase\nUSB, SSD", 270, 145);

  text("ROM = Fixed Data", width / 2, 220);
  text("Flash = Reprogrammable", width / 2, 240);
}

function drawMemoryAddressing() {
  text(`Address (A): ${address}`, width / 2, 80);
  text(`Data at Address: ${memory[address]}`, width / 2, 110);
  text(`Write Mode: ${isWrite ? "ON" : "OFF"}` , width / 2, 140);

  textAlign(LEFT);
  for (let i = 0; i < memory.length; i++) {
    let y = 180 + i * 12;
    if (i < 16 && y < 340) {
      fill(i === address ? "red" : "black");
      text(`Addr ${i.toString(2).padStart(4, '0')} : ${memory[i]}`, 100, y);
    }
  }

  textAlign(CENTER);
  text("Example: 4-bit Address Bus = 16 Words", width / 2, 360);
}

function keyPressed() {
  if (mode !== 2) return;
  if (keyCode === UP_ARROW) address = (address + 1) % 16;
  if (keyCode === DOWN_ARROW) address = (address + 15) % 16;
  if (keyCode === LEFT_ARROW && isWrite) memory[address] = (memory[address] + 15) % 16;
  if (keyCode === RIGHT_ARROW && isWrite) memory[address] = (memory[address] + 1) % 16;
  if (key === 'w' || key === 'W') isWrite = !isWrite;
}
