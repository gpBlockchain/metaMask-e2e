import * as dappeteer from "@chainsafe/dappeteer";
import {RECOMMENDED_METAMASK_VERSION} from "@chainsafe/dappeteer";
import chaiAsPromised from "chai-as-promised";
import {use as chaiUse} from 'chai';
import {Sleep} from "./puppeteer.spec";
import {Page} from "playwright";


chaiUse(chaiAsPromised);


describe('light', function () {
    it('demo', async () => {

        let browser = await dappeteer.launch({
            automation: "playwright",
            browser: "chrome",
            metaMaskVersion: RECOMMENDED_METAMASK_VERSION,
            playwrightOptions: {}
        });

        let metamask = await dappeteer.setupMetaMask(browser,
            {
                // optional, else it will use a default seed
                seed: 'pioneer casual canoe gorilla embrace width fiction bounce spy exhibit another dog',
                password: 'password1234',
            });
        let testPage = await browser.newPage();
        await testPage.goto("https://godwoken-bridge-testnet-git-fork-gitofjason-fix-e2b58f-godwoken.vercel.app/#/v1/deposit/pending\n", {
                waitUntil: "networkidle",
            }
        );
        // testPage.
        let page1: Page;
        // @ts-ignore
        page1 = testPage.getSource()
        await page1.getByText("Connect").click();
        await metamask.approve();
        await page1.bringToFront()
        await page1.getByText("Change network").click()
        await metamask.acceptAddNetwork(true);
        await page1.bringToFront()
        await Sleep(1000)
        await page1.getByPlaceholder("Minimum 400 CKB").fill("1000")
        await page1.getByRole("button", {name: "Deposit"}).click()
        await metamask.sign()
        await page1.bringToFront()
        await page1.getByText("Open In Explorer").click()
    });

});
