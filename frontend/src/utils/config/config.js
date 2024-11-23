
const defaultConfig = {
    twitch: {
        channel: ""
    },
    isConfigured: false,
};

const readConfig = () => {
    try {
        const storedConfig = require("../../config.json");
        return {...storedConfig, isConfigured: !!storedConfig.twitch.clientId && !!storedConfig.twitch.clientSecret && !!storedConfig.twitch.authToken};
    } catch {
        return defaultConfig;
    }
}

const config = readConfig();

export { config };
