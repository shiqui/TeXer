const { SlashCommandBuilder, ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tex')
		.setDescription('Render a TeX expression.'),
	async execute(interaction) {
		const modal = new ModalBuilder()
			.setCustomId('texModal')
			.setTitle('Enter TeX Expression')

		const texInput = new TextInputBuilder()
			.setCustomId('texInput')
			.setLabel('TeX Expression')
			.setStyle(TextInputStyle.Paragraph)

		const firstActionRow = new ActionRowBuilder().addComponents(texInput)

		modal.addComponents(firstActionRow)
		await interaction.showModal(modal)
	},
}