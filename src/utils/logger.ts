/* eslint-disable @typescript-eslint/no-unused-vars */
const Logger = {
  info: (className: string, message: string): void => {
    console.log(`${FgWhite}${getDate()} ${FgGreen}LOG ${FgYellow}[${className}] ${FgGreen}${message}${Reset}`);
  },
  warn: (className: string, message: string): void => {
    console.warn(`${FgWhite}${getDate()} ${FgCyan}LOG ${FgYellow}[${className}] ${FgCyan}${message}${Reset}`);
  },
  error: (className: string, message: string): void => {
    console.error(`${FgWhite}${getDate()} ${FgRed}LOG ${FgYellow}[${className}] ${FgRed}${message}${Reset}`);
  },
  reducer: (messagePS: string, messageA: string, messageNS: string): void => {
    console.log(`${FgWhite}${getDate()} ${FgBlack}LOG ${FgYellow}[Previous State] ${FgBlack}${messagePS}${Reset}`);
    console.log(`${FgWhite}${getDate()} ${FgMagenta}LOG ${FgYellow}[Action] ${FgMagenta}${messageA}${Reset}`);
    console.log(`${FgWhite}${getDate()} ${FgBlue}LOG ${FgYellow}[Next State] ${FgBlue}${messageNS}${Reset}`);
  },
};

export default Logger;

function getDate(): string {
  const date = new Date(Date.now());
  const month = date.toLocaleString('default', { month: 'short' });
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);

  return `[${day}-${month}-${date.getFullYear()}_${hours}:${minutes}:${seconds}]`;
}

const Reset = '\x1b[0m';
const Bright = '\x1b[1m';
const Dim = '\x1b[2m';
const Underscore = '\x1b[4m';
const Blink = '\x1b[5m';
const Reverse = '\x1b[7m';
const Hidden = '\x1b[8m';

const FgBlack = '\x1b[30m';
const FgRed = '\x1b[31m';
const FgGreen = '\x1b[32m';
const FgYellow = '\x1b[33m';
const FgBlue = '\x1b[34m';
const FgMagenta = '\x1b[35m';
const FgCyan = '\x1b[36m';
const FgWhite = '\x1b[37m';

const BgBlack = '\x1b[40m';
const BgRed = '\x1b[41m';
const BgGreen = '\x1b[42m';
const BgYellow = '\x1b[43m';
const BgBlue = '\x1b[44m';
const BgMagenta = '\x1b[45m';
const BgCyan = '\x1b[46m';
const BgWhite = '\x1b[47m';
