const {
    Events
} = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`rise and shine mr ${client.user.tag} (I"m very funny I know)`);
    },
};