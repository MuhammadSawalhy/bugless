import blessed from 'blessed';

export default function setCodeBox(grid) {

  const options = {};

  // args: rowStart, columnStart, rowSpan, columnSpan, createObj: Function, options
  return grid.set(0, 0, 8, 12, blessed.box, options);

}
