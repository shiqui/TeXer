const fs = require('node:fs')
const path = require('node:path')
const { Client, Collection, GatewayIntentBits } = require('discord.js')
require('dotenv').config()


const client = new Client({ intents: [GatewayIntentBits.Guilds] })

// Register commands from ./commands/
client.commands = new Collection()
fs.readdirSync(path.join(__dirname, 'commands'))
	.filter(file => file.endsWith('.js'))
	.forEach(file => {
		const filePath = path.join(__dirname, 'commands', file)
		const command = require(filePath)
		if (!('data' in command && 'execute' in command)) {
			console.error(`Invalid command file: ${filePath}`)
			return
		}
		client.commands.set(command.data.name, command)
		console.log(`Registered ${command.data.name} from ${'commands/' + file}`)
	})

// Register event handlers from ./events/
fs.readdirSync(path.join(__dirname, 'events'))
	.filter(file => file.endsWith('.js'))
	.forEach(file => {
		const filePath = path.join(__dirname, 'events', file)
		const event = require(filePath)
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args, client))
			console.log(`Registered ${event.name} from ${'events/' + file}`)
		} else {
			client.on(event.name, (...args) => event.execute(...args, client))
			console.log(`Registered ${event.name} from ${'events/' + file}`)
		}
	})

client.login(process.env.DISCORD_TOKEN)
