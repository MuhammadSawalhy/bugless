import blessed from 'blessed';

export default class ToggableBox extends blessed.Box {

  constructor(name, options) {
    super(options);
    this.name = name;
  }

  show() {
    let { visible, value } = this;
    if (!visible) {
      this.ctrl.emit("toggle-" + this.name, true);
      this.screen.saveFocus();
      this.focus();
      super.show();
    }
    this.screen.render();
  }

  hide() {
    this.ctrl.emit("toggle-" + this.name, false);
    super.hide();
    this.screen.restoreFocus();
    this.screen.render();
  }

  toggle () {
    this.visible ? this.hide() : this.show();
  }

}

