import fs from 'fs';
import path from 'path';
import themes from './themes';
import { Command } from 'commander';

const program = new Command();
program.version(process.env.PACKAGE_VERSION); // eslint-ignore no-undef

program.option('-p, --port <port>',
               'port to be used for `node --inspect --port=xxxx`', 1234);

program.option('-t, --theme <theme>',
               'one of `--list-themes`', 'default');

program.option('--list-themes',
               'list themes, isn\'t it?');

program.parse(process.argv);

function validateOptions(errors) {
  if (isNaN(program.port))
    errors.push(`invalid port: "${program.port}"`);

  if (program.args.length === 0) errors.push(`no file provided`);
  if (program.args.length > 1) errors.push(`more than file are provided`);
}

function listThemes() {
  for(let t in themes) {
    console.log(t.name);
  }
}

export default function getOptions() {
  let errors = [];
  validateOptions(errors);

  if(program.listThemes) {
    listThemes();
    process.exit(0);
  } 

  // if there is errors, tream them to the stderr
  if (errors.length) {
    while (errors.length) {
      let e = errors.shift();
      process.stderr.write("[options error] " + e + '\n');
    }
    return null;
  }

  let file = path.resolve(program.args[0]);
  // check if the file really exists or not
  if (!fs.existsSync(file)) {
    process.stderr.write(`[options error] file doesn't exist: ${program.args[0]}\n`);
    return null;
  }

  const options = {
    port: parseInt(program.port),
    file: file,
    theme: program.theme
  };

  return options;
}
