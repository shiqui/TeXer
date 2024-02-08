const { Events } = require('discord.js')

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		// ignore non-command interactions and non-modal submissions
		if (!(interaction.isChatInputCommand() || interaction.isModalSubmit())) return

		// handle form submission
		if (interaction.customId === 'texModal') {
			const tex = interaction.fields.getTextInputValue('texInput')
			await interaction.reply({ content: tex })
			return
		}

		// handle slash commands
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
	},
}
