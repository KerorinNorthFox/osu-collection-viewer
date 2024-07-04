export class logger {
  static log(message: string, level: string = "LOG", color: number = 0) {
    const timestamp = new Date().toISOString();
    console.log(`\x1b[${color}m[${level}] :${message}\x1b[0m -> ${timestamp}`);
  }

  static info(message: string) {
    this.log(message, "INFO", 32);
  }

  static api(message: string, method: string) {
    this.log(message, method, 34);
  }

  static apiError(message: string, method: string) {
    this.log(message, method, 33);
  }

  static error(message: string) {
    this.log(message, "ERROR", 33);
  }
}
