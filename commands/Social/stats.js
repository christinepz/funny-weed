const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");
const db = require("quick.db");

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("stats")
        .setDescription("Checks a user's or your stats.")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("If you want to check someone else's stats.")
        ),
    async execute(interaction) {
        let user = interaction.options.getUser("user") || interaction.user;
        let plus = db.fetch(`stats_${user.id}.plusCount`) || "0";
        let minus = db.fetch(`stats_${user.id}.minusCount`) || "0";
        let total = parseInt(plus) - parseInt(minus);

        const embed = new EmbedBuilder()
            .setAuthor({ name: user.tag, iconURL: user.avatarURL({size: 128}) })
            .setDescription(`Total Rep: ${total}`)
            .addFields({ name: "👍", value: `${plus}`, inline: true}, { name: "👎", value: `${minus}`, inline: true})
            .setColor("Blurple")
            .setTimestamp()
            .setFooter({ text: `Requested by ${interaction.user.tag}` });

        await interaction.reply({ embeds: [embed] });
    },
};