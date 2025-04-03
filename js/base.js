let inputBaseSelect;
let inputField;
let resultDiv;

function setup() {
  let container = select('#base-converter-container');
  let canvas = createCanvas(600, 100).parent(container);
  canvas.style('position', 'relative');
  textSize(16);

  createElement('label', 'Select Input Base:')
    .parent(container)
    .position(10, 10)
    .style('font-size', '14px');
  inputBaseSelect = createSelect().parent(container);
  inputBaseSelect.position(160, 10);
  inputBaseSelect.option('Binary (base 2)', '2');
  inputBaseSelect.option('Octal (base 8)', '8');
  inputBaseSelect.option('Decimal (base 10)', '10');
  inputBaseSelect.option('Hexadecimal (base 16)', '16');

  createElement('label', '  Enter Number:')
    .parent(container)
    .position(10, 40)
    .style('font-size', '14px');
  
  inputField = createInput('');
  inputField.position(160, 40);
  inputField.size(200);
  inputField.parent(container);
  inputField.input(convertInput);

  resultDiv = createDiv('').parent(container);
}

function convertInput() {
  const input = inputField.value().trim();
  const base = int(inputBaseSelect.value());

  let decimalValue;
  try {
    if (input === '') {
      resultDiv.html('');
      return;
    }
     const decimalValue = parseInt(input, base);
    if (isNaN(decimalValue)) throw new Error("Invalid input");

    let result = '';
    switch (base) {
      case 2:
        result = `<strong>Binary:</strong> ${input}<br><strong>Decimal:</strong> ${decimalValue}`;
        break;
      case 8:
        result = `<strong>Octal:</strong> ${input}<br><strong>Decimal:</strong> ${decimalValue}`;
        break;
      case 10:
        result = `<strong>Decimal:</strong> ${input}`;
        break;
      case 16:
        result = `<strong>Hexadecimal:</strong> ${input.toUpperCase()}<br><strong>Decimal:</strong> ${decimalValue}`;
        break;
    }

    resultDiv.html(result);
  } catch (err) {
    resultDiv.html(`<span style="color: red;">Invalid input for base ${base}</span>`);
  }
}
