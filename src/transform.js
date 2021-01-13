import highlight from "cli-highlight";
import { Transform } from "stream";

const clReg = /^(>\s|\s{2})(\d+)\s(.*?)$/gm;

function hl(code) {
  return highlight(code, { language: "js", ignoreIllegals: true });
}

function trim(log) {
  let codeLines = [];
  log.replace(clReg, (match, prefix, ln, line) => {
    prefix = prefix + ln + " ";
    codeLines.push(prefix + line);
  });
  return codeLines.join("\n") + "\n";
}

export default new Transform({
  transform(chunk, encoding, callback) {
    let c = chunk.toString();
    if (!clReg.test(c)) 
      this.push(c);
    c = trim(c);
    this.push(hl(c));
    callback();
  },
});
