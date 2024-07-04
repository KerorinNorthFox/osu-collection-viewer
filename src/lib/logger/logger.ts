export enum LogLevel {
  Info,
  Error,
}

export class logger {
  static log(message: string, level: string = "LOG", color = "") {
    const timestamp = new Date().toISOString();
    console.log(`${color}[${level}]:${message}\x1b[0m -> ${timestamp}`);
  }

  static info(message: string) {
    this.log(message, "INFO", "\x1b[32m");
  }

  static error(message: string) {
    this.log(message, "ERROR", "\x1b[33m");
  }
}
