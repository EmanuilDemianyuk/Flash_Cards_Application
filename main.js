
import { RequestManager } from "./Classes/RequestManager.js"
import { JsonOperationManager } from "./Classes/JsonOperationManager.js";
import { RandomQuantityCreator } from "./Classes/RandomQuantityCreator.js";
import { Printer } from "./Classes/Printer.js";
import { Remover } from "./Classes/Remover.js";
import { ErrorLogging } from "./Classes/ErrorLogging.js";
import { LocalStorageExplorer } from "./Classes/LocalStorageExplorer.js";
import { UserDataChecker } from "./Classes/UserDataChecker.js";
import { jsonAddress } from "./Constants/jsonDirectory.js"
import { localKeyJson, 
         localKeyStatus,
         localKeyResponse } from "./Constants/KeysPeriod.js";
import { lvl__Start, 
         lvl__Reading, 
         lvl__Respond, 
         lvl__Finished } from "./Constants/PeriodConstants.js";

// Client code  

document.addEventListener('DOMContentLoaded', async e => {
    let counterReading = 0;
    let counterWriting = 0;

    try{
        const printerManager = new Printer(
            document.querySelector('div.main'));
        printerManager.renderStartPage(29);
        
        LocalStorageExplorer.removePeriod()
        LocalStorageExplorer.setPeriod(localKeyStatus, lvl__Start);

        document.querySelector('div.main').addEventListener('click', e => {
            const testContainer = document.querySelector('div.testContainer');
            try {    
                if(e.target.classList.value === 'LetsGo'){
                    const userAmount = +document.getElementById('amountWords').value;
                    const amountPage = (userAmount <= 0
                                       || userAmount > printerManager.allPage) 
                                       ? 10 
                                       : userAmount

                    Remover.removeHTMLElement(document.querySelector('div.mainContainer'));

                    LocalStorageExplorer.removePeriod(lvl__Start)
                    LocalStorageExplorer.setPeriod(localKeyStatus, lvl__Reading);
                    
                    printerManager.setAmountPage(amountPage);
                    printerManager.renderTest(LocalStorageExplorer.setJsonData(localKeyJson, 
                                        RequestManager.requestOperation(
                                        ErrorLogging.checkErrorJson(jsonAddress, "onlyString"), 
                                        amountPage,  
                                        RandomQuantityCreator.randomlyGetsTheValue)));
                }
                if(e.target.dataset.stage === 'nextStep'  
                   && counterReading < printerManager.amountPage) {
                    ++counterReading;
                    Remover.removeHTMLElement(testContainer)
                    printerManager.buildTest(
                        JsonOperationManager.getJsonParse(
                            LocalStorageExplorer.getPeriod(localKeyJson)), 
                            counterReading
                        )
                }
                if(e.target.dataset.stage === 'nextStage') {
                    LocalStorageExplorer.setPeriod(localKeyStatus, lvl__Respond)
                    Remover.removeHTMLElement(testContainer)
                    printerManager.buildTestRespond(
                        JsonOperationManager.getJsonParse(
                            LocalStorageExplorer.getPeriod(localKeyJson)), 
                            counterWriting
                        )
                }
                if(e.target.dataset.stage === "SendTranslation") {
                    ++ counterWriting;
                    LocalStorageExplorer.setArrayResponseData(
                        localKeyResponse,
                        document.getElementById('userRespond').value || 'undefined',
                        document.querySelector('h3.textResponse').textContent,
                        LocalStorageExplorer.getPeriod(localKeyResponse)
                    )

                    Remover.removeHTMLElement(testContainer)
                    printerManager.buildTestRespond(
                        JsonOperationManager.getJsonParse(
                            LocalStorageExplorer.getPeriod(localKeyJson)), 
                            counterWriting
                    )
                }
                if(e.target.dataset.stage === "ToComplete"){
                    LocalStorageExplorer.setArrayResponseData(
                        localKeyResponse,
                        document.getElementById('userRespond').value || 'undefined',
                        document.querySelector('h3.textResponse').textContent,
                        LocalStorageExplorer.getPeriod(localKeyResponse)
                    )
                    LocalStorageExplorer.setPeriod(localKeyStatus, lvl__Finished);
                    Remover.removeHTMLElement(testContainer);
            
                    printerManager.renderLastPage(
                        new UserDataChecker(
                            LocalStorageExplorer.getPeriod(localKeyJson),
                            LocalStorageExplorer.getPeriod(localKeyResponse)
                        )
                        .processingTheTest()
                    )
                }
                if(e.target.dataset.ivent === "Reboot") {
                    LocalStorageExplorer.removePeriod();
                    location.href = location.href;
                }
            }
            catch(e){
                console.log(e.name);
                console.log(e.message);
            }
        });
    }
    catch(e){
        console.group();
            console.log(e.name);
            console.log(e.message);
        console.groupEnd();
    }

})