import ToggableBox from "./ToggableBox";

export default class CloseCounter extends ToggableBox {
  constructor(screen, boxOptions) {
    super("close-box", boxOptions);
    this.screen = screen;
    this.ctrl = screen.ctrl;
    this.max = 2; // for resetting value
    this.value = 2;
  }
}
