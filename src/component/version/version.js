const version = file => ({

    get: () => {
        try {
            return require(file)
        } catch (e) {
            return {hash: "0", name: "none"}
        }
    }

})

module.exports = version
