const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tex')
		.setDescription('Render a LsTeX expression.'),
	async execute(interaction) {
		const modal = new ModalBuilder()
			.setCustomId('texModal')
			.setTitle('Enter LaTeX Expression')

		const texInput = new TextInputBuilder()
			.setCustomId('texInput')
			.setLabel('LaTeX Expression')
			.setStyle(TextInputStyle.Paragraph)

		const firstActionRow = new ActionRowBuilder().addComponents(texInput)

		modal.addComponents(firstActionRow)
		await interaction.showModal(modal)
	},
}