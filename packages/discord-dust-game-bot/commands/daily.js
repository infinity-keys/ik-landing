const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const eco = require('../ecoDB');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('daily')
		.setDescription('Conduct a daily delve for pages within the deeper mysteries of the Infinite Library'),
	async execute(interaction) {
		const { guild, member } = interaction;
		const daily = eco.rewards.getDaily(member.id, guild.id);
		// const time = eco.rewards.getDaily(member.id, guild.id).cooldown.pretty;

		if (!daily.status) {
			const embedNoDaily = new EmbedBuilder()
				.setDescription('Oh dear, all that time...for nothing. Well, there\'s always tomorrow.  In the meantime, why don’t you take a cup of tea...elsewhere.')
				.setColor('c3b4f7');
			return interaction.reply({ embeds: [embedNoDaily] });
		}

		const embedDaily = new EmbedBuilder()
			.setThumbnail('https://res.cloudinary.com/infinity-keys/image/upload/v1676060677/discord-bot/magic_far_shot_angle_anime_style_black_person_older_person_occu_e90c7a75-60da-4076-a367-992a0a87f3f1_t0djmd.png')
			.setDescription(`Ah, one of my two favorite times of the day—when you return from a deep search of the library and bring back many pages.  Today you collected \`${daily.reward} pages 📜\`, splendid!  The other is of course, tea time. Cheers...`)
			.setColor('c3b4f7');
		return interaction.reply({ embeds: [embedDaily] });
	},
};