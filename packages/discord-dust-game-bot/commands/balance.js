const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const eco = require('../ecoDB');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('Gracefully inquire whether Archivist Nebo has the records of your page collection efforts at hand.'),
	async execute(interaction) {
		const { guild, member } = interaction;
		const balance = eco.balance.get(member.id, guild.id);
		// const username = interaction.user.username;

		const embedBalance = new EmbedBuilder()
			.setDescription(`I’m sure you’ve been working hard. Let me collect those files… According to the records you’ve located \`${balance}\` pages. Is that all? Well then.`)
			.setColor('c3b4f7');
		return interaction.reply({ embeds: [embedBalance] });
	},
};