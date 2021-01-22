import blessed from 'blessed';
import CodeBox from './CodeBox';
import StatusBar from './StatusBar';
import LogBox from './LogBox';
import SplashScreen from './SplashScreen';
import CloseCounter from './CloseCounter';

// this class is contructed inside ../controller
// NOTE: experimentally, key events will be emmited 
// for the focued element, then propagate to the other elements
export default class Screen extends blessed.Screen {

  constructor(ctrl, options={}) {

    super(options);

    const { theme } = ctrl.options;

    const statusBarOptions = {
      top: '100%-1',
      height: 1,
      border: {
        type: "line",
      },
      style: theme === 'default' ? undefined : theme.statusBar.style 
    };

    const codeBoxOptions = {
      height: '100%-1',
      border: {
        type: "line",
      },
      style: theme === 'default' ? undefined : theme.codeBox.style,
    };

    const logBoxOptions = {
      height: '80%',
      width: '80%',
      top: 'center',
      left: 'center',
      type: 'overlay',
      hidden: true,
      border: {
        type: "line",
      },
      style: theme === 'default' ? undefined : theme.logBox.style,
    };

    const closeCounterOptions = {
      width: 'shrink',
      height: 'shrink',
      type: 'overlay',
      top: 'center',
      left: 'center',
      align: 'center',
      valign: 'middle',
      hidden: true,
      shadow: true,
      tags: true,
      border: {
        type: 'line',
        fg: 'white',
      },
    };

    this.ctrl = ctrl; // instance of ../controller
    this.showSplashScreen = false;

    this.statusBar = new StatusBar(this, statusBarOptions);
    this.codeBox = new CodeBox(this, codeBoxOptions);
    this.logBox = new LogBox(this, logBoxOptions);
    this.logBoxVisible = false;
    this.closeCounter = new CloseCounter(this, closeCounterOptions);

    // add main events and other events
    this.addEvents();
  
    if (this.showSplashScreen)
      this.splashScreen = new SplashScreen(screen);
    else
      this.firstRender();

  }

  // ----------------------
  //    binding events     
  // ----------------------

  addEvents() {
    // show the close-counter or exit 0
    this.key('C-c', this._key_Cc = function() {
      // close after some number of trials
      this.closeCounter.value--;
      if (!this.closeCounter.value) {
        this.ctrl.emit("exit", 0);
        process.exit(0);
      } else {
        let value = this.closeCounter.value;
        console.log('\u0007'); // beepSound = '\u0007';
        this.closeCounter.setContent(`Please press <C-c> again: {blink}{bold}{red-fg}${value}{/}`);
        this.closeCounter.show();
      }
    });
    // hide the close counter, and reset it
    this.key(['q', 'escape'], this._key_escape = function() {
      if (this.closeCounter.visible) {
        // reset it to the max val to start counting again when C-c pressed
        this.closeCounter.value = this.closeCounter.max;
        this.closeCounter.hide();
      }
    });
    // toggle the log box
    this.key("C-l", this._key_Cl = function(){
      this.logBox.toggle();
    });
  }

  // ----------------------------------
  //        some helper methods
  // ----------------------------------

  updateLogBox(data, isStdErr) {

  }

  updateCodeBox(data) {

  }

  // ----------------------------------
  //     elements general helpers
  // ----------------------------------

  appedChilds() {
    this.append(this.statusBar);
    this.append(this.codeBox);
    this.append(this.logBox);
    this.append(this.closeCounter); // it is hidden by default
    this.codeBox.focus();
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

