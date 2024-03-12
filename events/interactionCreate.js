const { Events, AttachmentBuilder, EmbedBuilder } = require('discord.js')
const { render } = require('../utils/render')

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isModalSubmit()) {
			await modalHandler(interaction)
		} else if (interaction.isChatInputCommand()) {
			await commandHandler(interaction)
		}
	},
}

const modalHandler = async (interaction) => {
	if (interaction.customId !== 'texModal') return
	try{
		const buffer = await render(interaction.fields.getTextInputValue('texInput'))
		const file = new AttachmentBuilder(buffer, 'tex.png')
		await interaction.reply({ files: [file] })
	} catch (error) {
		console.error(error)
	}
}

const commandHandler = async (interaction) => {
	const command = interaction.client.commands.get(interaction.commandName)

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`)
		return
	}

	try {
		await command.execute(interaction)
	} catch (error) {
		console.error(error)
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true })
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
		}
	}
}