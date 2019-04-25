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

async function getHTML(url) {
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'domcontentloaded'});
  const link = await page.$('#contact_methods .contact-a');
  await link.click();
  await page.waitFor(300);

  const bodyHTML = await page.content();
  // fs.writeFile("./1.html", bodyHTML, () => {console.log('done!')});

  await page.close();
  await browser.close();
  return bodyHTML
}

module.exports = getHTML;