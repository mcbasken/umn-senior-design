let inputBaseSelect;
let inputField;
let resultDiv;

function setup() {
  createCanvas(600, 200);
  textSize(16);

  createElement('label', 'Select Input Base:').position(10, 10);
  inputBaseSelect = createSelect();
  inputBaseSelect.position(160, 10);
  inputBaseSelect.option('Binary (base 2)', '2');
  inputBaseSelect.option('Octal (base 8)', '8');
  inputBaseSelect.option('Decimal (base 10)', '10');
  inputBaseSelect.option('Hexadecimal (base 16)', '16');

  createElement('label', 'Enter Number:').position(10, 50);
  inputField = createInput('');
  inputField.position(160, 50);
  inputField.size(200);
  inputField.input(convertInput);

  resultDiv = createDiv('').position(10, 90);
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
    decimalValue = parseInt(input, base);
    if (isNaN(decimalValue)) throw new Error("Invalid input");

    const bin = decimalValue.toString(2);
    const oct = decimalValue.toString(8);
    const dec = decimalValue.toString(10);
    const hex = decimalValue.toString(16).toUpperCase();

    resultDiv.html(`
      <strong>Decimal:</strong> ${dec}<br>
      <strong>Binary:</strong> ${bin}<br>
      <strong>Octal:</strong> ${oct}<br>
      <strong>Hexadecimal:</strong> ${hex}
    `);
  } catch (err) {
    resultDiv.html('<span style="color: red;">Invalid input for base ' + base + '</span>');
  }
}
