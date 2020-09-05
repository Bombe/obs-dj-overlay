const net = require("net")

const listenForOggComments = (port, listener) => {4

    net.createServer(socket => {
        const headerLines = []
        const dataBuffer = Buffer.alloc(65536)
        let dataBufferIndex = 0
        let headerComplete = false

        socket.on("data", data => {
            const copied = data.copy(dataBuffer, dataBufferIndex)
            dataBufferIndex += copied
            if (headerComplete) {
                console.log(`got ${data.length}.`)
                dataBufferIndex = 0
            } else {
                let offset
                while ((offset = dataBuffer.indexOf(linebreak)) !== -1) {
                    const headerLine = dataBuffer.slice(0, offset)
                    console.log("header: >" + headerLine + "<")
                    if (headerLine.length === 0) {
                        console.log("header complete.")
                        headerComplete = true
                        socket.write("HTTP/1.0 200 OK\n\n")
                        listener.onHeader(headerLines)
                    } else {
                        headerLines.push(headerLine)
                    }
                    dataBuffer.copy(dataBuffer, 0, offset + 2)
                    dataBufferIndex -= offset + 2
                }
            }
        })
    }).listen(port)

}

const linebreak = Buffer.from([13, 10])

module.exports = listenForOggComments
