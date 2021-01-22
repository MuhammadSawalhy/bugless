import Screen from './gui';
import { codeLineReg } from './format-code';
import { EventEmitter } from 'events';
import status from './status';

export default class Controller extends EventEmitter {
  //
  // inputBox; codeBox; logBox; // are assign to this, inside ./gui/
  //
  // avaliable events: data, error, new-status,
  // toggle-close-counter (when visible 1st arg = true)
  // toggle-log-box (when visible 1st arg = true)
  // splash-screen-die
  //

  constructor(cliOptions) {
    super();
    const screenOptions = {
      tabSize: 4,
      // smartCSR: true // smart change-scroll-region
      dockBorders: true,
    };
    this.options = cliOptions;
    this.status = status;
    this.screen = new Screen(this, screenOptions);
    this.on("data", this.ondata);
    this.on("error", this.onerror);
    this.on("new-status", this.onnewstatus);
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
    this.screen.updateLogBox(data, true /* is stderr */);
  }

  onnewstatus() {
    console.log("new-status");
  }

}

