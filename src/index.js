import getOptions from './options';
import Controller from './controller';
import { spawn } from 'child_process';

let options = getOptions();
if (!options) process.exit(2); // errors are streamed inside getOptions

function getArgs() {
  return [`--port=${options.port}`, options.file];
}

const inspect = spawn('node', ['inspect', ...getArgs()]);
const ctrl = new Controller();
const screen = ctrl.screen;

// we don't need buffers, we need utf8 string
inspect.stdout.setEncoding('utf8');
inspect.stderr.setEncoding('utf8');

// get the stdout of the inspect spawn
inspect.stdout.on("data", (data)=>{
  ctrl.emit("data", data);
});

// if something is streamed from stderr
inspect.stderr.on("data", (data)=>{
  ctrl.emit("error", data, true /* is stderr */);
});

// render the screen.
screen.title = "Debugging: " + options.file;
// render the whole scene
// screen.splashScreenThenRender();

