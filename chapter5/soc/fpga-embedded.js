let processors = ["ARM Cortex-M", "RISC-V", "MicroBlaze"];
let selectedProcessor = "ARM Cortex-M";
let processorDropdown, slider;
let signalPosition = 0;

let procX, procY, memX, memY, periphX, periphY, busX, busY;

function setup() {
  let canvas = createCanvas(1200, 800);
  canvas.parent('p5-sketch');
  textAlign(CENTER, CENTER);
  textSize(18);

  // Position key elements
  procX = width/2 - 300;
  procY = 250;
  memX = width/2 + 150;
  memY = 250;
  periphX = width/2 - 75;
  periphY = 450;
  busX = width/2;
  busY = 400;

  createProcessorDropdown(canvas);
  createPerformanceSlider(canvas);
}

function draw() {
  background(245);
  textSize(28);
  fill(0);
  text("FPGA Embedded SoC MicroSim", width/2, 40);

  drawSystemDiagram();
  drawRealTimeSignals();
  drawPowerPerformanceLabels();
}

function createProcessorDropdown(canvas) {
  processorDropdown = createSelect();
  processorDropdown.parent('p5-sketch');
  processorDropdown.position(canvas.position().x + width/2 - 100, canvas.position().y + 90);
  for (let p of processors) processorDropdown.option(p);
  processorDropdown.changed(() => {
    selectedProcessor = processorDropdown.value();
  });
}

function createPerformanceSlider(canvas) {
  slider = createSlider(1, 10, 5);
  slider.parent('p5-sketch');
  slider.position(canvas.position().x + width/2 - 150, canvas.position().y + height - 100);
  slider.style('width', '300px');
}

function drawSystemDiagram() {
  fill(255);
  stroke(0);
  rect(procX, procY, 150, 80, 10);         // Processor
  rect(memX, memY, 150, 80, 10);           // Memory
  rect(periphX, periphY, 150, 80, 10);     // Peripherals

  fill(0);
  noStroke();
  textSize(20);
  text(selectedProcessor, procX + 75, procY + 40);
  text("Memory", memX + 75, memY + 40);
  text("Peripherals", periphX + 75, periphY + 40);

  // Horizontal bus
  stroke('#1f77b4');
  strokeWeight(6);
  line(busX - 200, busY, busX + 200, busY);
  noStroke();
  fill(0);
  text("Bus (AXI/Avalon)", busX, busY - 20);

  // Vertical wires
  stroke('#1f77b4');
  strokeWeight(4);
  line(procX + 150, procY + 40, busX - 100, busY);      // Processor to Bus
  line(busX + 100, busY, memX, memY + 40);              // Bus to Memory
  line(busX, busY + 100, periphX + 75, periphY);        // Bus down to Peripherals
}

function drawRealTimeSignals() {
  let speed = slider.value();
  stroke('limegreen');
  strokeWeight(6);
  signalPosition += speed * 0.5;
  if (signalPosition > 400) signalPosition = 0;

  // Draw animated signal from processor to memory through bus
  let x = busX - 200 + signalPosition;
  if (x <= busX + 200) {
    point(x, busY);
  }
}

function drawPowerPerformanceLabels() {
  noStroke();
  fill(0);
  textSize(18);
  text("Power vs Performance", width/2, height - 130);
  text(`Performance Level: ${slider.value()}`, width/2, height - 60);
}
