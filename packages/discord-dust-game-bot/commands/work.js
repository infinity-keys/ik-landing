const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const eco = require('../ecoDB');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('seek')
		.setDescription('Engage in a brief search within the library stacks for lost pages.'),
	async execute(interaction) {
		const { guild, member } = interaction;
		const work = eco.rewards.getWork(member.id, guild.id);
		// const time = eco.rewards.getWork(member.id, guild.id).cooldown.pretty;

		if (!work.status) {
			const embedNoWork = new EmbedBuilder()
				.setDescription('Unfortunately, your search has not produced...ahem...results... Come back at the appropriate time to try the stacks again, perhaps you’ll feel a bit more refreshed.')
				.setColor('c3b4f7');
			return interaction.reply({ embeds: [embedNoWork] });
		}

		const embedWork = new EmbedBuilder()
			.setDescription(`It appears that your search has not been in vain. I thank you my friend. You have collected \`${work.reward} pages 📜\`. Come back in another hour to seek within the stacks once more.`)
			.setColor('c3b4f7');
		return interaction.reply({ embeds: [embedWork] });
	},
};