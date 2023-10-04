export class RandomQuantityCreator {
    /**
     * @param {Array} array 
     * @param { number } element 
     * @param { number } min 
     * @param { number } max 
     * @returns { Array }
     */
    static randomlyGetsTheValue(array, element = 10, min = 0, max = 30){ 
        const key = [];
        for (let i = 0; i < element; i++) {
            let newNum;
            do {
                newNum = Math.floor(Math.random() * (max - min + 1)) + min; 
            } 
            while (key.includes(newNum));
            key.push(newNum)
        }
        return array.filter((el, index) =>  key.includes(index));
    };
}