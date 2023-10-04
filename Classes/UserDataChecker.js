export class UserDataChecker {
    #test;
    #userResponse;
    /**
     * @constant { object } result
     */
    #result = {
        correctUserResponse: [],
        incorrectUserResponse: []
    }
    /**
     * 
     * @param { array } test 
     * @param { array } userResponse 
     */
    constructor(test, userResponse) {
        this.#test = JSON.parse(test);
        this.#userResponse = JSON.parse(userResponse);
    }
    get test() { return this.#test }
    get userResponse() { return this.#userResponse }
    get result() { return this.#result }

    /**
     * 
     * @returns { object } 
     */
    processingTheTest() {
        this.#userResponse.forEach(res => {
            res.userResponse = res.userResponse.replace(/^\w/, el => el.toUpperCase());
            this.#test.forEach(t => {
                if(t.en === res.userResponse && t.ua === res.testRequest) {
                    this.#result.correctUserResponse.push({ en: t.en, ua: t.ua });
                }
            });
        })
        
        this.#result.incorrectUserResponse = [...this.#userResponse];
        this.removeDuplicates();
        return this.#result;
    }
    removeDuplicates() {
        this.#result.correctUserResponse.forEach(el => {
            this.#result.incorrectUserResponse = this.#result.incorrectUserResponse.filter(i => i.userResponse !== el.en);
        });
    }
    
}