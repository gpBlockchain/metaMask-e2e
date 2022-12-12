import {TestDApp} from "../pages/test-dapp";
import {testDAppLocators} from "../support/locators";

describe("Demo Tests", () => {
    const testDApp = new TestDApp()
    context('Test commands', () => {

        before(() => {
            cy.visit('/');
            testDApp.clickConnectButton();
            cy.acceptMetamaskAccess().then(connected => {
                expect(connected).to.be.true;
            });
        })

        after(() => {
            cy.origin("https://google.com", () => {
                cy.visit("/");
            });
            cy.disconnectMetamaskWalletFromDapp();
        });

        it(`acceptMetamaskAccess should accept connection request to metamask`, () => {
            cy.get(testDAppLocators.networkId).contains('5');
            cy.get(testDAppLocators.chainId).contains('0x5');
            cy.get(testDAppLocators.accounts).should(
                'have.text',
                '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc',
            );
        });

    })
});
