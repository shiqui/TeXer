const { REST, Routes } = require('discord.js')
require('dotenv').config()
const fs = require('node:fs')
const path = require('node:path')

// Deploy commands to Discord
const commands = []
fs.readdirSync(path.join(__dirname, 'commands'))
	.filter(file => file.endsWith('.js'))
	.forEach(file => {
		const command = require(path.join(__dirname, 'commands', file))
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON())
		} else {
			console.log(`[WARNING] The command at ${path.join(__dirname, 'commands', file)} is missing a required "data" or "execute" property.`)
		}
	})

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`)

		const data = await rest.put(
			// Routes.applicationCommands(process.env.CLIENT_ID),
			Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
			{ body: commands },
		)

		console.log(`Successfully reloaded ${data.length} application (/) commands.`)
	} catch (error) {
		console.error(error)
	}
})()