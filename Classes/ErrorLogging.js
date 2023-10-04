import { JSONError } from "./JSONError.js";

export class ErrorLogging  extends JSONError{
    /**
    * Checks if the argument is a JSON string.
    * @param {string} json - The JSON string to validate.
    * @returns {string} - Returns the given JSON string.
    * @throws {JSONError} - If the argument is not a valid JSON string.
    */
    static checkErrorJson(json, type) {
        if (typeof json !== 'string' || type === "full") {
          throw new JSONError('Invalid JSON string or format!');
        }
        if(type === "full"){
            try {
                JSON.parse(json);
            } catch (error) {
                throw new JSONError('Invalid JSON string or format!');
            }
        }
        return json;
      }
}