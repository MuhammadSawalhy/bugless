import ToggableBox from "./ToggableBox";

export default class CodeBox extends ToggableBox {
  constructor(screen, boxOptions){
    super('log-box', boxOptions);
    this.screen = screen;
    this.ctrl = screen.ctrl;
    // args: rowStart, columnStart, rowSpan, columnSpan, createObj: Function, options
  }
}
