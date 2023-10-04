export class LocalStorageExplorer {
    /**
     * @param { string } key 
     * @param { string } json  
     * @returns { string }
     */
    static async setJsonData(key, json) {
        const response = JSON.stringify(await json);
        window.localStorage.setItem(key, response);
        return json;
    }
    static setArrayResponseData(key, userResponse, testRequest, data) {
        const userData = {
            userResponse: userResponse,
            testRequest: testRequest
        };
        if(data === null) { 
            data = [] 
        }else {
           data = JSON.parse(data)
        }
        data.push(userData);
        
        window.localStorage.setItem(key, JSON.stringify(data));
    }
    /** 
     * @param { string } key 
     * @param { string } status 
     */
    static setPeriod(key, status) {
        window.localStorage.setItem(key, status);
    }
    /** 
     * @param { string } key 
     * @returns { string }
     */
    static getPeriod(key) {
        return window.localStorage.getItem(key);
    }
    /**
     * @param { string } key 
     */
    static removePeriod(key = undefined) {
        (key === undefined)
        ? window.localStorage.clear()  
        : window.localStorage.removeItem(key)
    }
}