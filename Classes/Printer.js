export class Printer {
    #nodeOutput;
    /**
     * @constant { number } 
     */
    #amountPage = 0;
    /**
     * @constant { string }
     */
    #stage = "reading";
    /**
     * @param { Node } nodeOutput 
     */
    /**
     * @constant { number } 
     */
    #allPage = 0;
    constructor(nodeOutput){
        this.#nodeOutput = nodeOutput;
    }
    get nodeOutput() { return this.#nodeOutput }
    get amountPage() { return this.#amountPage }
    get stage() { return this.#stage }
    get allPage() { return this.#allPage }

    /**
     * @param { number } number 
     */
    setAmountPage(number){
        this.#amountPage = number - 1;
    }

    /**
     * @param {number} maxLength 
     */
    renderStartPage(maxLength){
        this.#allPage = maxLength;
        this.#nodeOutput.insertAdjacentHTML('afterbegin', `
        <div class="mainContainer">
        <h2>Картки для вивчення англійських слів</h2>
        <p>
        Для того щоб запам'ятати якомога більше слів, та поповнити словниковий запас, ми рекомендуємо вам вивчити слова невеличкими "порціями", шляшов використання "методу карток". Ви обираєте кількість слів в наборі, які хочете опанувати. Програма відображає по одному слову із перекладом. Після того, як ви проглянули усі слова із обраного набору, программа знову продемонструє вам ці слова, але цього разу вже запропонує самостійно написати переклад для кожного із слівю По результату вам буде виставленна оцінка.
        </p>
        <div class="navigation">
        <input type="number" id="amountWords" placeholder="10" max="${maxLength}" min="1">
        <button class="LetsGo">Поїхали</button>
        </div>
        </div>`)
    }

    /**
     * @param { Promise } request 
     */
    async renderTest(request) {
        this.buildTest(await request);
    }

    /**
     * @param {Array} array 
     * @param {number} counter 
     */
    buildTest(array, counter = 0){
        let page = counter;
        this.#nodeOutput.insertAdjacentHTML('afterbegin',`
        <div class="testContainer">
            <h4>Сесія : ${page + 1} з ${array.length} слів</h4>
            <div class="textValue">
            <h3>${array[counter].en}</h3>
            <p>${array[counter].ua}</p>
            </div>
            ${this.buttonLogic(array.length, counter + 1, this.#stage)}
        </div>`)
    }

    /**
     * 
     * @param { number } arrayLength 
     * @param { number } counter 
     * @param { string } stage 
     * @returns { string } <button></button>
     */
    buttonLogic(arrayLength, counter, stage) {
        const userStage = [];
        (stage === 'reading')
        ? userStage
            .push("Наступне слово", "Наступний етап", "nextStep", "nextStage")
        : userStage 
            .push("Надіслати переклад", "Завершити", "SendTranslation", "ToComplete")
        return (arrayLength === counter)
               ? `<button data-stage="${userStage[3]}" class="nextStep nextStage">${userStage[1]}</button>`
               : `<button data-stage="${userStage[2]}" class="nextStep">${userStage[0]}</button>`
    }

    /**
     * @param {Array} array 
     * @param {number} counter 
     */
    buildTestRespond(array, counter = 0) {
        let page = counter;
        this.#nodeOutput.insertAdjacentHTML('afterbegin',`
        <div class="testContainer">
            <h4>Сесія : ${page + 1} з ${array.length} слів</h4>
            <div class="textValue">
            <h3 class="textResponse">${array[counter].ua}</h3>
            </div>
            <div class="textValue">
            <input type="text" id="userRespond" placeholder="Ваша відповідь" >
            </div>
            ${this.buttonLogic(array.length, counter + 1)}
        </div>`)
    }

    /**
     * @param { Object } resultTest 
     */
    renderLastPage(resultTest){
        const counterAll = resultTest.correctUserResponse.length + resultTest.incorrectUserResponse.length;
        const counterDone = Math.abs(counterAll - resultTest.incorrectUserResponse.length);
        this.#nodeOutput.insertAdjacentHTML('afterbegin', `
        <div class="resultBox">
            <div class="counterTrueOper">
                <h2>Результат <span class="respondTrue boost">${counterDone}</span> з ${counterAll}</h2>
            </div>
            <ul class="resList">
                ${this.buildingItems(resultTest.correctUserResponse, true)}
                ${this.buildingItems(resultTest.incorrectUserResponse, false)}
            </ul>
            <button data-ivent="Reboot" class="comebackBtn">Спробувати ще раз!</button>
        </div>`);
    }  

    /**
     * @param { array } array 
     * @param { boolean } bool 
     * @returns { string } data
     */
    buildingItems(array, bool) {
        const data = [];
        (bool === true)
        ? array.map(el => {
            data.push(`<li>
            <span class="definition">${el.ua}</span> 
            <span class="grayArrow"> - </span>
            <span class="respondTrue">${el.en}</span>
            </li>`)
        })
        : array.map(el => {
            data.push(`<li>
            <span class="definition">${el.testRequest}</span>
            <span class="grayArrow"> - </span>
            <span class="respondFalse">${el.userResponse}</span>
            </li>`)
        })
        
        return data.join("");
    } 
}