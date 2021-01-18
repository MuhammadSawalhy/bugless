import blessed from 'blessed';

export default function setCodeBox(grid) {
  const options = {
    valign: "middle",
  };
  // args: rowStart, columnStart, rowSpan, columnSpan, createObj: Function, options
  const input = grid.set(10, 0, 2, 12, blessed.input, options);
  input.on("submit", function(){
    console.log(arguments);
    // , "❯ ", ''
  });
  return input; 
}
