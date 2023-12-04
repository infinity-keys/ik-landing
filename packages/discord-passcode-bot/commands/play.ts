import { CommandInteraction, SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
.setName('play')
.setDescription('select a puzzle')
.addStringOption(option =>
  option.setName('puzzle')
    .setDescription('list of puzzles')
    .setRequired(true)
    .addChoices(
      { name: 'Puzzle A', value: 'play_a' },
      { name: 'Puzzle B', value: 'play_b' },
      { name: 'Puzzle C', value: 'play_c' },
    ));

export async function execute(interaction: CommandInteraction){
	// if we're not repliable then exit
	if (!interaction.isRepliable()) {
		return
	}
	await interaction.reply({
		content: `let's play!`,
		fetchReply: true,
	})
	console.log('play puzzle', interaction.options.get('puzzle').value)
};