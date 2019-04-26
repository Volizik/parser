const puppeteer = require('puppeteer');
const fs = require('fs');

const options = {
  headless: false,
  ignoreHTTPSErrors: true,
  args: [
    "--no-sandbox",
    "--disable-setuid-sandbox"
  ]
};

let browser;
async function runBrowser() {
  if (!browser) {
    browser = await puppeteer.launch(options);
  }
}

async function getHTML(url) {
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'domcontentloaded'});
  await page.waitForSelector('#contact_methods .contact-a', {
    timeout: 1000
  });
  const link = await page.$('#contact_methods .contact-a');
  await link.click();
  await page.waitFor(500);

  const bodyHTML = await page.content();
  // fs.writeFile("./1.html", bodyHTML, () => {console.log('done!')});

  await page.close();
  // await browser.close();
  return bodyHTML
}

module.exports.getHTML = getHTML;
module.exports.runBrowser = runBrowser;