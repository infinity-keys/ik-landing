const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const { options } = require('../ecoDB');
const eco = require('../ecoDB');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('Politely request that Archivist Nebo retrieve the records of The Society’s top archival researchers.'),
	async execute(interaction) {
		const { guild } = interaction;
		const leaderboard = eco.balance.leaderboard(guild.id, options);
		const username = interaction.user.username;
		// const name = interaction.member.guild.name;

		if (!leaderboard.length) {
			const embedNoLeader = new EmbedBuilder()
				.setDescription(`${username}, there are no users on the leaderboard`)
				.setColor('c3b4f7');
			return interaction.reply({ embeds: [embedNoLeader] });
		}

		const embedLeader = new EmbedBuilder()
			.setTitle('Records? Yes of course.')
			.setDescription(`${leaderboard
				.map((lb, index) => `${index + 1} - <@${lb.userID}> - **${lb.money}** coins`)
				.join('\n')}`)
			.setColor('c3b4f7');
		return interaction.reply({ embeds: [embedLeader] });
	},
};