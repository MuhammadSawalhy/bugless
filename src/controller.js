import Screen from './gui';
import { codeLineReg } from './format-code';
import { EventEmitter } from 'events';

export default class Controller extends EventEmitter {
  // inputBox; codeBox; logBox; // are assign to this, inside ./gui/

  constructor() {
    super();
    this.screen = new Screen(this);
    this.on("data", this.ondata);
    this.on("error", this.onerror);
    this.on("close-counter", this.onclosecounter);
  }

  ondata(data) {
    if (data[0] === '<') {
      this.screen.updateLogBox(data);
      return;
    }
    if (codeLineReg.test(data)) 
      this.screen.updateCodeBox(data);
  }

  onerror(data, isInspectStderr) {
    if (isInspectStderr) data = `inspecting error: ` + data;
    process.stderr.write(data);
  }

  onclosecounter(visible){
    if (visible)
      this.screen.removeEvents();
    else 
      this.screen.addEvents();
  }

}

