import { CommandInteraction, SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
.setName('solve')
.setDescription('enter the answer to puzzle')
.addStringOption(option =>
  option.setName('passcode')
    .setDescription('the passcode for the selected puzzle')
    .setRequired(true));

export async function execute(interaction: CommandInteraction){
	// if we're not repliable then exit
	if (!interaction.isRepliable()) {
		return
	}
  const input = interaction.options.get('passcode').value	
	await interaction.reply(`${input}.`)
	
	console.log('passcode', input)
};