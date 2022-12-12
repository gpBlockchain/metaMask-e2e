import {testDAppLocators} from "../support/locators";


export class TestDApp {

    clickConnectButton() {
        cy.get(testDAppLocators.connectedButton).click();
    }
}
