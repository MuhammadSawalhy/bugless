import blessed from 'blessed';
import CodeBox from './CodeBox';
import StatusBar from './StatusBar';
import LogBox from './LogBox';
import Grid from './Grid';
import getSplashScreen from './SplashScreen';

let showSplashScreen = false;

// this class is contructed inside ../controller
export default class Screen extends blessed.Widgets.Screen {

  constructor(ctrl) {

    super({
      tabSize: 4,
      // smartCSR: true // smart change-scroll-region
      dockBorders: true,
    });

    this.ctrl = ctrl; // instance of ../controller
    this.showSplashScreen = true;
    this.statusBar = new StatusBar(this);
    this.codeBox = new CodeBox(this);
    this.logBox = new LogBox(this);
    this.grid = new Grid({ rows: 12, cols: 12, screen });

    this.closeCounter = {
      max: 2, // for resetting value
      value: 2,
      visible: false,
      elm: blessed.box({
        align: 'center',
        valign: 'middle',
        hide: true,
        border: {
          type: 'line',
          fg: 'blue',
          bg: 'white'
        },
      })
    }

    if (showSplashScreen)
      getSplashScreen(screen);
    else
      screen.splashScreenThenRender();

  }

  // ----------------------
  //    binding events     
  // ----------------------

  addEvents() {

    this.key('C-c', function() {
      // close after some number of trials
      this.closeCounter.value--;
      if (!this.closeCounter.value)
        this.ctrl.emit("exit", 0);
      else
        this.showCloseCounter();
    });

    this.key('escape', function() {
      if (this.closeCounter.visible)
        this.hideCloseCounter();
    });

  }

  // ----------------------
  //    close counter
  // ----------------------

  showCloseCounter() {
    let { visible, value, elm } = this.closeCounter;
    if (!visible) {
      this.ctrl.emit("close-counter", true);
      this.closeCounter.visible = true;
      this.removeEvents();
      elm.show();
    }
    elm.setContent(`Please press <C-c> again: {blink}{bold}{fg-red}${value}{/}`);
    this.render();
  }

  hideCloseCounter() {
    this.ctrl.emit("close-counter", false);
    this.closeCounter.elm.hide();
    this.closeCounter.visible = false;
    this.closeCounter.value = this.closeCounter.max;
    this.addEvents();
    this.render();
  }

  // ----------------------------------
  //     elements general helpers
  // ----------------------------------

  appedChilds() {
    this.append(this.statusBar);
    this.append(this.codeBox);
    this.append(this.logBox);
    this.append(this.closeCounter); // it is hidden by default
  }

  // ----------------------------------
  //             Rendering
  // ----------------------------------

  firstRender() {
    if (this.showSplashScreen) {
      screen.append(this.splashScreen);
      setTimeout(()=>{
        this.appedChilds();
        this.splashScreen.destroy();
        return this.render();
      }, 2000);
    } else
      this.appedChilds();
    return this.render();
  }

}

