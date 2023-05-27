import colors from "colors";
import ora from "ora";
const spinner = ora("Initializing...\n").start();
const log = console.log.bind(console);
declare global {
  interface Console {
    load: (text: string) => unknown;
    succeed: (text: string) => unknown;
    fail: (text: string) => unknown;
    warning: (text: string) => unknown;
  }
}
const custom = () => {
  console.load = (text) => {
    console.clear();
    spinner.start(colors.cyan(text));
  };
  console.succeed = (text) => {
    console.clear();
    spinner.succeed(colors.green(text));
  };
  console.fail = (text) => {
    console.clear();
    spinner.fail(colors.red(text));
  };
  console.warning = (text) => {
    console.clear();
    spinner.warn(colors.yellow(text));
  };
  console.log = (...args: any[]) => {
    console.clear();
    log(...args);
  };
};
custom();
