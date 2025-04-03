let inputBaseSelect;
let inputField;
let resultDiv;

function setup() {
  noCanvas();

  const container = select('#base-converter-container');

  // Select base
  const baseRow = createDiv().parent(container).style('margin-bottom', '8px');
  createSpan('Base: ').parent(baseRow);
  inputBaseSelect = createSelect();
  inputBaseSelect.parent(baseRow);
  inputBaseSelect.option('Binary', '2');
  inputBaseSelect.option('Octal', '8');
  inputBaseSelect.option('Decimal', '10');
  inputBaseSelect.option('Hexadecimal', '16');

  // Input
  const inputRow = createDiv().parent(container).style('margin-bottom', '8px');
  createSpan('Number: ').parent(inputRow);
  inputField = createInput('');
  inputField.parent(inputRow);
  inputField.input(convertInput);

  // Output
  resultDiv = createDiv('').parent(container).style('font-size', '0.9em');
}

function convertInput() {
  const input = inputField.value().trim();
  const base = int(inputBaseSelect.value());

  if (input === '') {
    resultDiv.html('');
    return;
  }

  try {
    const decimalValue = parseInt(input, base);
    if (isNaN(decimalValue)) throw new Error("Invalid input");

    resultDiv.html(`
      <strong>Decimal:</strong> ${decimalValue}<br>
      <strong>Binary:</strong> ${decimalValue.toString(2)}<br>
      <strong>Octal:</strong> ${decimalValue.toString(8)}<br>
      <strong>Hex:</strong> ${decimalValue.toString(16).toUpperCase()}
    `);
  } catch (err) {
    resultDiv.html(`<span style="color:red;">Invalid input for base ${base}</span>`);
  }
}
