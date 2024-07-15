import puppeteer from 'puppeteer';

/*
Portal cfm

- get elements for classname = card-group
- elements for array [...elements]
- elements.innerText -> array

*/

const crm = 12345;

(async () => {
  
  const browser = await puppeteer.launch(); //headless: false para abrir a pagina
  const page = await browser.newPage();


  await page.goto(`https://portal.cfm.org.br/busca-medicos`, { waitUntil: 'domcontentloaded' });


  await page.setViewport({width: 1080, height: 1024});

  await page.screenshot({
    path: 'screenshot.jpg'
  });

  await page.waitForSelector('[name = "crm"]');


  let a = await page.evaluate(() => {

    let crm = document.querySelector('[name = "crm"]')
    let name = document.querySelector('[name = "nome"]')
    let btn = document.querySelector('.btnPesquisar')

    crm.value = 123
    btn.click()
    btn.scrollIntoView()

    return crm.placeholder

  })

  console.log(a)

  await page.screenshot({
    path: 'screenshot2.jpg'
  });

  await page.waitForSelector('.card-body')

  let data = await page.evaluate(() => {
    let htmllist = document.querySelectorAll('.card-body')
    let templist = [...htmllist]
    let list = []

    templist.map(e => list.push(e.innerText.split("\n")))

    return list
  })

  console.log(data)

})();