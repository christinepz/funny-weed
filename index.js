// Discord.js stuff (yawn)
const {
    Client,
    Collection,
    GatewayIntentBits,
} = require("discord.js");

// Config stuff
const {
    token
} = require("./scary_file.json");

// FS IS NOW A PART OF NODE?
const fs = require("node:fs");
const path = require("node:path");

// Initialize client (wow powerful computer words!!!)
const client = new Client({
    intents: [GatewayIntentBits.Guilds],
    ws: {
        properties: {
            browser: "Discord iOS"
        }
    },
});

// Initializing Collections
client.commands = new Collection();
client.cooldowns = new Collection();

// Commands Handler
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

// Check the Commands folder for any subfolders (subfolders are categories and the files inside them are the actual commands)
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ("data" in command && "execute" in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

// Events Handler
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Self Explanatory
client.login(token);