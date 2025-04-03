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
  const outputBase = parseInt(inputBaseSelect.value());

  if (input === '') {
    resultDiv.html('');
    return;
  }

  // Validate hex input
  const isValidHex = /^[0-9a-fA-F]+$/.test(input);
  if (!isValidHex) {
    resultDiv.html(`<span style="color: red;">Invalid hexadecimal input</span>`);
    return;
  }

  // Convert from hex to decimal, then to selected base
  const decimalValue = parseInt(input, 16);
  let converted;

  switch (outputBase) {
    case 2:
      converted = decimalValue.toString(2);
      resultDiv.html(`<strong>Binary:</strong> ${converted}`);
      break;
    case 8:
      converted = decimalValue.toString(8);
      resultDiv.html(`<strong>Octal:</strong> ${converted}`);
      break;
    case 10:
      converted = decimalValue.toString(10);
      resultDiv.html(`<strong>Decimal:</strong> ${converted}`);
      break;
    case 16:
      converted = decimalValue.toString(16).toUpperCase();
      resultDiv.html(`<strong>Hexadecimal:</strong> ${converted}`);
      break;
    default:
      resultDiv.html('Unsupported base');
  }
}
