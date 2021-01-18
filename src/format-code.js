// trim the default stdout of `node inspect`

export const codeLineReg = /^(>\s|\s{2})(\d+)\s(.*?)$/gm;

export default function trim(log) {
  let codeLines = [];
  log.replace(codeLineReg, (match, prefix, ln, line) => {
    prefix = prefix + ln + " ";
    codeLines.push(prefix + line);
  });
  return codeLines.join("\n") + "\n";
}

