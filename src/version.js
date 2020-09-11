const {exec} = require("child_process")
const fs = require("fs")

exec("git rev-parse HEAD", (error, hash, stderr) => {
    exec("git describe HEAD", (error, name, stderr) => {
        fs.writeFileSync("version.json", JSON.stringify({hash: hash.trim(), name: name.trim()}))
    })
})
