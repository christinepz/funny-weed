const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");
const db = require("quick.db");

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("replog")
        .setDescription("Checks your or a specific user's rep log.")
        .addBooleanOption(option =>
            option
                .setName("valid")
                .setDescription("+rep or nah?")
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option
                .setName("index")
                .setDescription("The plus or minus rep index (1 is always the first one)")
                .setRequired(true)
        )
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("If you want to check someone else's log.")
        ),
    async execute(interaction) {
        let user = interaction.options.getUser("user") || interaction.user;
        let index = interaction.options.getInteger("index") - 1;
        let stats = db.fetch(`stats_${user.id}`);

        const embed = new EmbedBuilder();

        if (interaction.options.getBoolean("valid")) {
            if (!stats.plus[index]) return interaction.reply("No +rep log was found on that index.");
                embed
                    .setAuthor({ name: `${user.tag} (from: ${stats.plus[index][1]})`, iconURL: user.avatarURL({ size: 128 }) })
                    .addFields(
                        { name: "Reason:", value: `${stats.plus[index][0]}` },
                        { name: "Timestamp:", value: `${stats.plus[index][2]}` },
                    )
                    .setColor("Green");
        } else {
            if (!stats.plus[index]) return interaction.reply("No -rep log was found on that index.");
                embed
                    .setAuthor({ name: `${user.tag} (from: ${stats.minus[index][1]})`, iconURL: user.avatarURL({ size: 128 }) })
                    .addFields(
                        { name: "Reason:", value: `${stats.minus[index][0]}` },
                        { name: "Timestamp:", value: `${stats.minus[index][2]}` },
                    )
                    .setColor("Red");
        }
        await interaction.reply({ embeds: [embed] });
    },
};