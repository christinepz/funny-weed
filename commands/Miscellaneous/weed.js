const {
    SlashCommandBuilder
} = require('discord.js');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('weed')
        .setDescription('check it out'),
    async execute(interaction) {
        await interaction.reply(`I WILL FUCKING MURDER YOU ${interaction.user.username}!!!`);
    },
};