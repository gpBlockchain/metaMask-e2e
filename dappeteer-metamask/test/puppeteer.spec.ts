import {expect, use as chaiUse} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as dappeteer from '@chainsafe/dappeteer/dist/index';

import {Dappeteer} from "@chainsafe/dappeteer/dist/types";
import {RECOMMENDED_METAMASK_VERSION} from "@chainsafe/dappeteer/dist/index";
import {clickOnButton} from "@chainsafe/dappeteer/dist/helpers";

chaiUse(chaiAsPromised);

export let  browser, metamask: Dappeteer, testPage;

describe('puppeteer demo', () => {

    before(async () => {

        browser = await dappeteer.launch( {
            automation: "puppeteer",
            browser: "chrome",
            metaMaskVersion: RECOMMENDED_METAMASK_VERSION,
        });

        metamask = await dappeteer.setupMetaMask(browser,
            {
                // optional, else it will use a default seed
                // seed: 'pioneer casual canoe gorilla embrace width fiction bounce spy exhibit another dog',
                // password: 'password1234',
            });
        testPage = await browser.newPage();
        await testPage.goto('https://metamask.github.io/test-dapp/',{
                waitUntil: "networkidle",
            }
        );
        await clickOnButton(testPage, "Connect");
        await metamask.approve();
    });
    it("click show eth_accounts ,connected address  should display", async () => {
        await clickOnButton(testPage, "eth_accounts");
        await testPage.waitForFunction(
            () => document.getElementById("getAccountsResult").innerText !== "",
        );
        let res = await testPage.$eval("#getAccountsResult", (e) => e.innerText)
        console.log("res:",res)
        expect(res).to.be.equal("0x7e4abd63a7c8314cc28d388303472353d884f292");
        // for (let i = 0; i < 100; i++) {
        //     await testPage.waitForSelector("#getAccountsResult",{timeout: 1000})
        //     const data = await testPage.evaluate(
        //         () => (
        //             document.querySelector("#getAccountsResult") as HTMLSpanElement).innerHTML,
        //     );
        //     console.log("data:",data)
        //     await pause(1)
        //     if(data == ""){
        //         continue
        //     }
        //     expect(data).to.be.equal("0x7e4abd63a7c8314cc28d388303472353d884f292")
        //     return;
        // }

        // expect("").to.be.equal("failed ")
    })

    after(async () => {
        // close browser
        await browser.close();
    });
});
