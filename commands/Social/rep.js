const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");
const db = require("quick.db");

module.exports = {
    cooldown: 60,
    data: new SlashCommandBuilder()
        .setName("rep")
        .setDescription("Gives a +rep or -rep to someone.")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("User to +/- rep.")
                .setRequired(true)
        )
        .addBooleanOption(option =>
            option
                .setName("valid")
                .setDescription("+rep or nah?")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("Why are you giving this person a +/- rep?")
                .setRequired(true)
        ),
    async execute(interaction) {
        let user = interaction.options.getUser("user");

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${user.tag}`, iconURL: user.avatarURL({ size: 128 }) })
            .addFields(
                { name: "Reason:", value: `${interaction.options.getString("reason")}` },
            )
            .setTimestamp();

        let stats = db.fetch(`stats_${user.id}`);

        if (stats == null) db.set(`stats_${user.id}`, {});

        let date = Date.now();
        date = new Date(date).toString();

        if (interaction.options.getBoolean("valid")) {
            embed
                .setColor("Green")
                .setDescription(`👍 from ${interaction.user.tag}`);
            db.push(`stats_${user.id}.plus`, [`${interaction.options.getString("reason")}`, `${interaction.user.id}`, `${date}`]);
            db.add(`stats_${user.id}.plusCount`, 1)
        } else {
            embed
                .setColor("Red")
                .setDescription(`👎 from ${interaction.user.tag}`);
            db.push(`stats_${user.id}.minus`, [`${interaction.options.getString("reason")}`, `${interaction.user.id}`, `${date}`]);
            db.add(`stats_${user.id}.minusCount`, 1)
        }

        await interaction.reply({ embeds: [embed] });
    },
};