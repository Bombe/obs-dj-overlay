
const defaultConfig = {
    twitch: {
        channel: "", clientId: "", clientSecret: ""
    }
};

const readConfig = () => {
    try {
        return require("../../config.json");
    } catch {
        return defaultConfig;
    }
}

const config = readConfig();

export { config };
