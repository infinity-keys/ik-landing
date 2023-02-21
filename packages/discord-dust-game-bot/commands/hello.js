const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gm')
		.setDescription('Give your salutations to the Archivist'),
	async execute(interaction) {
		await interaction.reply('7 13');
	},
};
