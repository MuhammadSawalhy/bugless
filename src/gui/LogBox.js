import blessed from 'blessed';

export default function setCodeBox(grid) {

  const options = {};
  let component = grid.set(8, 0, 3, 12, blessed.box, options);

  component.log = function () {
    
  };

  // args: rowStart, columnStart, rowSpan, columnSpan, createObj: Function, options
  return component;

}
