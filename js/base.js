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

  // Clear result if input is empty
  if (input === '') {
    resultDiv.html('');
    return;
  }

  // Try converting input to decimal from selected base
  const decimalValue = parseInt(input, base);
  if (isNaN(decimalValue)) {
    resultDiv.html(`<span style="color: red;">Invalid input for base ${base}</span>`);
    return;
  }

  // Generate only the selected base's output
  let output = '';
  switch (base) {
    case 2:
      output = `<strong>Binary:</strong> ${input}<br><strong>Decimal:</strong> ${decimalValue}`;
      break;
    case 8:
      output = `<strong>Octal:</strong> ${input}<br><strong>Decimal:</strong> ${decimalValue}`;
      break;
    case 10:
      output = `<strong>Decimal:</strong> ${input}<br><strong>Binary:</strong> ${decimalValue.toString(2)}`;
      break;
    case 16:
      output = `<strong>Hexadecimal:</strong> ${input}<br><strong>Decimal:</strong> ${decimalValue}`;
      break;
  }

  resultDiv.html(output);
}
