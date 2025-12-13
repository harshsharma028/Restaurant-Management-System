const path = require('path');

const getCallerInfo = () => {
  const stack = new Error().stack.split('\n')[3];
  const stackInfo = stack.match(/\((.*):(\d+):(\d+)\)/);

  if (!stackInfo) return {};

  return {
    file: path.basename(stackInfo[1]),
    line: stackInfo[2],
  };
};

const processLogger = (message) => {
  const { file, line } = getCallerInfo();
  const time = new Date().toISOString();
  console.log(
    `[${time}] [${file}:${line}]\t\t→ ${message}`
  );
};

module.exports = processLogger;