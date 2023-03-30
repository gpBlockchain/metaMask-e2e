import * as dappeteer from "@chainsafe/dappeteer";
import {RECOMMENDED_METAMASK_VERSION} from "@chainsafe/dappeteer";
import chaiAsPromised from "chai-as-promised";
import {use as chaiUse} from 'chai';
import {Sleep} from "./puppeteer.spec";
import {Page} from "playwright";
import {browser} from "./playerwright.spec";


chaiUse(chaiAsPromised);


describe('ckb_faucet', function () {
    it('faucet', async () => {

        let browser = await dappeteer.launch({
            automation: "playwright",
            browser: "chrome",
            metaMaskVersion: RECOMMENDED_METAMASK_VERSION,
            playwrightOptions: {}
            //.... // other parameters,
            // playwrightOptions: {
            //     args: ["--accept-lang=en"],
            // },
        });

        let metamask = await dappeteer.setupMetaMask(browser,
            {
                // optional, else it will use a default seed
                seed: 'pioneer casual canoe gorilla embrace width fiction bounce spy exhibit another dog',
                password: 'password1234',
            });
        let testPage = await browser.newPage();
        await testPage.goto("https://faucet.nervos.org/", {
                waitUntil: "networkidle",
            }
        );
        // testPage.
        let page1: Page;
        // @ts-ignore
        page1 = testPage.getSource()
        await page1.getByPlaceholder("Enter your Pudge wallet address").fill("ckt1qpuljza4azfdsrwjzdpea6442yfqadqhv7yzfu5zknlmtusm45hpuqgpeawuedww4hdwa0ek4l73d4dyh50l55vnqq5qx0ea")
        await page1.getByRole("button", {name: "Claim"}).click()
        await Sleep(1000)
        await browser.close();
    });
});