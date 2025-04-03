let inputBaseSelect;
let outputBaseSelect;
let inputField;
let resultDiv;

function setup() {
  noCanvas();

  const container = select('#base-converter-container');

  // Row 1: Input base selector
  const inputBaseRow = createDiv().parent(container).style('margin-bottom', '8px');
  inputBaseRow.style('display', 'flex');
  inputBaseRow.style('align-items', 'center');
  inputBaseRow.style('gap', '10px');
  createSpan('Input Base:').parent(inputBaseRow).style('font-size', '16px');
  inputBaseSelect = createSelect();
  inputBaseSelect.parent(inputBaseRow);
  inputBaseSelect.option('Binary', '2');
  inputBaseSelect.option('Octal', '8');
  inputBaseSelect.option('Decimal', '10');
  inputBaseSelect.option('Hexadecimal', '16');
  inputBaseSelect.selected('16'); // Default: Hex

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

  // Row 3: Output base selector
  const outputBaseRow = createDiv().parent(container).style('margin-bottom', '8px');
  outputBaseRow.style('display', 'flex');
  outputBaseRow.style('align-items', 'center');
  outputBaseRow.style('gap', '10px');
  createSpan('Output Base:').parent(outputBaseRow).style('font-size', '16px');
  outputBaseSelect = createSelect();
  outputBaseSelect.parent(outputBaseRow);
  outputBaseSelect.option('Binary', '2');
  outputBaseSelect.option('Octal', '8');
  outputBaseSelect.option('Decimal', '10');
  outputBaseSelect.option('Hexadecimal', '16');
  outputBaseSelect.selected('2'); // Default: Binary
  outputBaseSelect.changed(convertInput);

  // Row 4: Output
  resultDiv = createDiv('').parent(container).style('font-size', '0.9em');
}

function convertInput() {
  const input = inputField.value().trim();
  const inputBase = parseInt(inputBaseSelect.value());
  const outputBase = parseInt(outputBaseSelect.value());

  if (input === '') {
    resultDiv.html('');
    return;
  }

  // Validate input for selected input base
  const basePatterns = {
    2: /^[01]+$/,
    8: /^[0-7]+$/,
    10: /^\d+$/,
    16: /^[0-9a-fA-F]+$/
  };
  const pattern = basePatterns[inputBase];

  if (!pattern.test(input)) {
    resultDiv.html(`<span style="color: red;">Invalid input for base ${inputBase}</span>`);
    return;
  }

  const decimalValue = parseInt(input, inputBase);
  let result = decimalValue.toString(outputBase);
  if (outputBase === 16) result = result.toUpperCase();

  const labels = {
    2: 'Binary',
    8: 'Octal',
    10: 'Decimal',
    16: 'Hexadecimal'
  };

  resultDiv.html(`<strong>${labels[outputBase]}:</strong> ${result}`);
}
