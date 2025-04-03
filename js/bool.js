new p5((p) => {
  let inputField;
  let gateDiagram;

  p.setup = function () {
    const container = p.select('#boolean-diagram-container');
    inputField = p.createInput('').parent(container).style('margin-bottom', '10px');
    inputField.attribute('placeholder', 'Enter Boolean Expression (e.g., A AND B OR NOT C)');
    inputField.input(updateDiagram);

    const canvas = p.createCanvas(500, 200);
    canvas.parent(container);
    gateDiagram = new LogicDiagram();
  };

  p.draw = function () {
    p.background(255);
    gateDiagram.display(p);
  };

  function updateDiagram() {
    const expr = inputField.value();
    gateDiagram.parse(expr);
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

      for (let token of tokens) {
        if (['AND', 'OR', 'NOT'].includes(token)) {
          this.gates.push({ type: token, x: offsetX, y: offsetY });
          offsetY += 60;
        }
      }
    }

    display(p) {
      for (let g of this.gates) {
        p.push();
        p.translate(g.x, g.y);
        p.stroke(0);
        p.fill(255);
        p.rectMode(p.CENTER);
        p.rect(0, 0, 60, 40);
        p.fill(0);
        p.noStroke();
        p.textAlign(p.CENTER, p.CENTER);
        p.text(g.type, 0, 0);
        p.pop();
      }
    }
  }
}, 'boolean-diagram-container');
