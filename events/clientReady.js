const { Events } = require('discord.js')
const { initialize } = require('../utils/render')

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		initialize().then(() => {
			console.log('Initialized Puppeteer')
			console.log(`Ready! Logged in as ${client.user.tag}`)
		}).catch(console.error)
	},
}