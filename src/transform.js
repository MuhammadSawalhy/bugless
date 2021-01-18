import highlight from "cli-highlight";
import formatCode, { codeLineReg } from './format-code';
import { Transform } from "stream";

function hl(code) {
  return highlight(code, { language: "js", ignoreIllegals: true });
}

export default new Transform({
  transform(chunk, encoding, callback) {
    let c = chunk.toString();
    if (!codeLineReg.test(c)) { callback(); return }
    c = formatCode(c);
    this.push(hl(c));
    callback();
  },
});
