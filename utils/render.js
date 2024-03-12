const puppeteer = require('puppeteer')
const katex = require('katex')

let browser, page;

async function initialize() {
    browser = await puppeteer.launch({ headless: 'new' })
    page = await browser.newPage();
    await page.setViewport({
        width: 500,
        height: 1080,
        deviceScaleFactor: 1,
    })
}

async function render(tex) {
	const html = katex.renderToString(String.raw`${tex}`, {
		displayMode: true,
		output: 'mathml',
		throwOnError: false,
	})

    await page.setContent(
        `<!DOCTYPE html>
        <head>
            <link rel="stylesheet" href="node_modules/katex/dist/katex.min.css" integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV" crossorigin="anonymous">
        </head>
        <html>
            <body>
                ${html}
            </body>
        </html>`
    )

	const clip = await page.$eval('.katex', (el) => {
		const rect = el.getBoundingClientRect()
		return {
            x: rect.left,
            y: rect.top - 5,
            width: rect.width,
            height: rect.height + 10 }
	})

	const buffer = await page.screenshot({ path:"test.png", clip })

	return buffer
}

async function cleanup() {
    await browser.close()
}

process.on('exit', cleanup)
process.on('SIGINT', cleanup)
process.on('SIGUSR1', cleanup)
process.on('SIGUSR2', cleanup)
process.on('uncaughtException', cleanup)

module.exports = { render, initialize }