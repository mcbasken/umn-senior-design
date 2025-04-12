let states = ['GREEN', 'YELLOW', 'RED'];
let currentState = 0; // Start at GREEN
let timerButton;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('sim-wrapper');
  textAlign(CENTER, CENTER);
  textSize(16);

  // Timer Expired button
  timerButton = createButton('timer_expired ↑');
  timerButton.position(140, 330);
  timerButton.mousePressed(() => {
    transitionState();
  });

  console.log(`$display -> INIT STATE: ${states[currentState]}`);
}

function draw() {
  background(255);

  // Title
  fill(0);
  textSize(18);
  text("Traffic Light FSM (Moore)", width / 2, 40);

  // State indicator
  textSize(16);
  text(`Current State: ${states[currentState]}`, width / 2, 80);

  // Draw traffic lights (vertical stack)
  drawLight(width / 2, 140, 'red', currentState === 2);
  drawLight(width / 2, 200, 'yellow', currentState === 1);
  drawLight(width / 2, 260, 'green', currentState === 0);
}

function drawLight(x, y, colorName, isOn) {
  fill(isOn ? colorName : '#ddd');
  stroke(0);
  ellipse(x, y, 50);
  fill(0);
  textSize(12);
  text(colorName.toUpperCase(), x, y + 35);
}

function transitionState() {
  currentState = (currentState + 1) % 3;
  console.log(`$display -> timer_expired: transition to ${states[currentState]}`);
}
