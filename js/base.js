let inputBaseSelect;
let inputField;
let resultDiv;

function setup() {
  noCanvas(); // Not drawing anything on canvas now
  const container = select('#base-converter-container');

  // Input base selector
  createElement('label', 'Select Input Base:')
    .parent(container)
    .style('margin-right', '10px');
  
  inputBaseSelect = createSelect().parent(container);
  inputBaseSelect.option('Binary (base 2)', '2');
  inputBaseSelect.option('Octal (base 8)', '8');
  inputBaseSelect.option('Decimal (base 10)', '10');
  inputBaseSelect.option('Hexadecimal (base 16)', '16');

  createElement('br').parent(container); // Line break for layout
  createElement('br').parent(container);

  // Input field
  createElement('label', 'Enter Number:')
    .parent(container)
    .style('font-size', '10px');
  
  inputField = createInput('');
  inputField.parent(container);
  inputField.size(200);
  inputField.input(convertInput);

  createElement('br').parent(container); // another line break
  createElement('br').parent(container);

  // Output display
  resultDiv = createDiv('').parent(container).style('font-size', '14px');
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
