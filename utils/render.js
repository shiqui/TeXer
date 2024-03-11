const puppeteer = require('puppeteer')
const katex = require('katex')

async function render(tex) {
	const html = katex.renderToString(String.raw`${tex}`, {
		displayMode: true,
		output: 'mathml',
		throwOnError: false,
	})
	const browser = await puppeteer.launch({ headless: 'new' })
	const page = await browser.newPage()

	await page.setViewport({
		// width: 1920,
		width: 500,
		height: 1080,
		deviceScaleFactor: 1,
	})
	await page.setContent(html)

	const clip = await page.$eval('.katex', (el) => {
		const rect = el.getBoundingClientRect()
		return {
            x: rect.left,
            y: rect.top + 5,
            width: rect.width,
            height: rect.height + 10 }
	})

	const buffer = await page.screenshot({ clip })
	await browser.close()

	return buffer
}

module.exports = { render }