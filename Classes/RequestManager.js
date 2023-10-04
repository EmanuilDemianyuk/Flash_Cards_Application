export class RequestManager {
    /**
     * 
     * @param { string } jsonObj 
     * @param { number } amount 
     * @param { function } randomeFunc 
     * @returns { Promise }
     */
    static async requestOperation(jsonObj, amount, randomeFunc) {
        const response = await fetch(jsonObj)
        .then(responses => responses.json())
        .then(responses => randomeFunc(responses, amount));
        return await response;
    }
}