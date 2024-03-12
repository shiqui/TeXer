const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Get the invite link for TeXer.'),
	async execute(interaction) {
		await interaction.reply('https://discord.com/api/oauth2/authorize?client_id=1203565026456109106&permissions=2147518464&scope=applications.commands+bot', { ephemeral: true })
	},
}