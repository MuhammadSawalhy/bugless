import transform from "./transform";
import { spawn } from "child_process";
import { Command } from "commander";

const options = {
  port: 1234,
};

const program = new Command();
program.version(process.env.PACKAGE_VERSION); // eslint-ignore no-undef


function getArgs() {
  return [`--port=${options.port}`, "./asd.js"]
}

const inspect = spawn("node", ["inspect", ...getArgs()]);

process.stdin.pipe(inspect.stdin);
inspect.stdout.pipe(transform).pipe(process.stdout);
inspect.stderr.pipe(process.stderr);

