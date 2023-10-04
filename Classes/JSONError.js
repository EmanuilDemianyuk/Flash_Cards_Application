export class JSONError extends TypeError {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
    }
}