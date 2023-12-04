import { CommandInteraction, SlashCommandBuilder } from 'discord.js'

const yourArray = ['Puzzle1', 'Puzzle2', 'Puzzle3']; // Replace with your array

export const data = new SlashCommandBuilder()
.setName('list')
.setDescription('a list of all current puzzles')

export async function execute(interaction: CommandInteraction){
	// if we're not repliable then exit
	if (!interaction.isRepliable()) {
		return
	}
	await interaction.reply({
		content: `Array of puzzles logged to console!`,
		fetchReply: true,
	})
	
    // Map and log array elements
    yourArray.forEach((item, index) => {
      console.log(`Puzzle listed at ${index}: ${item}`);
    });
};