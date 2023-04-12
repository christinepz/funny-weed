const {
    SlashCommandBuilder
} = require("discord.js");

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("weed")
        .setDescription("check it out")
        .addStringOption(option =>
            option
                .setName("death")
                .setDescription("The way I will end your crap life.")
                .setRequired(true)
                .addChoices({ name: "Meow", value: "meow meow" }, { name: "Murder", value: "MURDER" }, { name: "Kill", value: "KILL" })),
    async execute(interaction) {
        await interaction.reply(`I WILL FUCKING ${interaction.options.getString("death")} YOU ${interaction.user.username.toUpperCase()}!!!`);
    },
};