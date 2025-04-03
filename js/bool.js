let inputField;
let gateDiagram;

function setup() {
  const canvas = createCanvas(400, 150);
  canvas.parent('boolean-diagram-container');
  background(240);
  fill(0);
  textSize(20);
  text("✅ It works!", 10, 50);
}


function draw() {
  clear();
  gateDiagram.display();
}

function updateDiagram() {
  const expr = inputField.value();
  gateDiagram.parse(expr);
  redraw();
}

class LogicDiagram {
  constructor() {
    this.gates = [];
  }

  parse(expr) {
    this.gates = [];

    const cleaned = expr.replace(/\s+/g, '').toUpperCase();
    const tokens = cleaned.match(/[A-Z]+|AND|OR|NOT|\(|\)/g);
    if (!tokens) return;

    let offsetX = 100;
    let offsetY = 100;

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      if (token === 'AND' || token === 'OR' || token === 'NOT') {
        this.gates.push({
          type: token,
          x: offsetX,
          y: offsetY,
        });
        offsetY += 60;
      }
    }
  }

  display() {
    for (let g of this.gates) {
      push();
      translate(g.x, g.y);
      stroke(0);
      fill(255);
      rectMode(CENTER);
      rect(0, 0, 60, 40);
      fill(0);
      noStroke();
      textAlign(CENTER, CENTER);
      text(g.type, 0, 0);
      pop();
    }
  }
}
