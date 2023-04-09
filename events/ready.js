const {
    Events,
    ActivityType
} = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`rise and shine mr ${client.user.tag} (I"m very funny I know)`);
        client.user.setPresence({
            activities: [{
                name: `THE LOUDEST ZA IN SAMARKAND`,
                type: ActivityType.Streaming,
                url: "https://www.youtube.com/watch?v=GoHZl-2K1w0"
            }],
            status: "online",
        });
    },
};