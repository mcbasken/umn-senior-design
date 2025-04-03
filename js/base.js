let inputBaseSelect;
let inputField;
let resultDiv;

function setup() {
  noCanvas();

  const container = select('#base-converter-container');

  // Row 1: Base selector
  const baseRow = createDiv().parent(container).style('margin-bottom', '8px');
  baseRow.style('display', 'flex');
  baseRow.style('align-items', 'center');
  baseRow.style('gap', '10px');
  createSpan('Select Input Base:').parent(baseRow).style('font-size', '16px');
  inputBaseSelect = createSelect();
  inputBaseSelect.parent(baseRow);
  inputBaseSelect.option('Binary', '2');
  inputBaseSelect.option('Octal', '8');
  inputBaseSelect.option('Decimal', '10');
  inputBaseSelect.option('Hexadecimal', '16');

  // Row 2: Number input
  const inputRow = createDiv().parent(container).style('margin-bottom', '8px');
  inputRow.style('display', 'flex');
  inputRow.style('align-items', 'center');
  inputRow.style('gap', '10px');
  createSpan('Enter Number:').parent(inputRow).style('font-size', '16px');
  inputField = createInput('');
  inputField.parent(inputRow);
  inputField.input(convertInput);
  inputField.style('height', '30px');
  inputField.style('font-size', '16px');

  // Row 3: Output
  resultDiv = createDiv('').parent(container).style('font-size', '0.9em');
}

function convertInput() {
  const input = inputField.value().trim();
  const base = int(inputBaseSelect.value());

  if (input === '') {
    resultDiv.html('');
    return;
  }

  // Validate input: make sure it only contains valid digits for the base
  const validChars = {
    2: /^[01]+$/,
    8: /^[0-7]+$/,
    10: /^[0-9]+$/,
    16: /^[0-9a-fA-F]+$/
  };

  if (!validChars[base].test(input)) {
    resultDiv.html(`<span style="color:red;">Invalid input for base ${base}</span>`);
    return;
  }

  // Now it's safe to parse
  const decimalValue = parseInt(input, base);

  resultDiv.html(`
    <strong>Decimal:</strong> ${decimalValue}<br>
    <strong>Binary:</strong> ${decimalValue.toString(2)}<br>
    <strong>Octal:</strong> ${decimalValue.toString(8)}<br>
    <strong>Hex:</strong> ${decimalValue.toString(16).toUpperCase()}
  `);
}
