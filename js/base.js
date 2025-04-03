new p5((p) => {
  let inputBaseSelect, outputBaseSelect, inputField, resultDiv;

  p.setup = function () {
    p.noCanvas();
    const container = p.select('#base-converter-container');
    container.style('font-family', 'sans-serif');

    // Input Base Selector
    const inputBaseRow = p.createDiv().parent(container).style('margin-bottom', '8px');
    inputBaseRow.style('display', 'flex').style('align-items', 'center').style('gap', '10px');
    p.createSpan('Input Base:').parent(inputBaseRow).style('font-size', '16px');
    inputBaseSelect = p.createSelect().parent(inputBaseRow);
    inputBaseSelect.option('Binary', '2');
    inputBaseSelect.option('Octal', '8');
    inputBaseSelect.option('Decimal', '10');
    inputBaseSelect.option('Hexadecimal', '16');
    inputBaseSelect.selected('16');

    // Number input
    const inputRow = p.createDiv().parent(container).style('margin-bottom', '8px');
    inputRow.style('display', 'flex').style('align-items', 'center').style('gap', '10px');
    p.createSpan('Enter Number:').parent(inputRow).style('font-size', '16px');
    inputField = p.createInput('').parent(inputRow).style('height', '30px').style('font-size', '16px');
    inputField.input(convertInput);

    // Output Base Selector
    const outputBaseRow = p.createDiv().parent(container).style('margin-bottom', '8px');
    outputBaseRow.style('display', 'flex').style('align-items', 'center').style('gap', '10px');
    p.createSpan('Output Base:').parent(outputBaseRow).style('font-size', '16px');
    outputBaseSelect = p.createSelect().parent(outputBaseRow);
    outputBaseSelect.option('Binary', '2');
    outputBaseSelect.option('Octal', '8');
    outputBaseSelect.option('Decimal', '10');
    outputBaseSelect.option('Hexadecimal', '16');
    outputBaseSelect.selected('2');
    outputBaseSelect.changed(convertInput);

    // Output
    resultDiv = p.createDiv('').parent(container).style('font-size', '0.9em');
  };

  function convertInput() {
    const input = inputField.value().trim();
    const inputBase = parseInt(inputBaseSelect.value());
    const outputBase = parseInt(outputBaseSelect.value());

    if (input === '') {
      resultDiv.html('');
      return;
    }

    const basePatterns = {
      2: /^[01]+$/,
      8: /^[0-7]+$/,
      10: /^\d+$/,
      16: /^[0-9a-fA-F]+$/,
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
      16: 'Hexadecimal',
    };

    resultDiv.html(`<strong>${labels[outputBase]}:</strong> ${result}`);
  }
}, 'base-converter-container');
